/**
 * BESTAUTO — event tracking for GA4 + Yandex Metrika + Meta Pixel
 *
 * Events fired into all 3 platforms via send():
 *   phone_call_299        — click tel: link containing 299
 *   phone_call_199        — click tel: link containing 199
 *   whatsapp_click_299    — click wa.me link containing 299
 *   whatsapp_click_199    — click wa.me link containing 199
 *   maps_click_politkovskaya — click Google Maps link (Politkovskaya)
 *   maps_click_guramishvili  — click Google Maps link (Guramishvili)
 *   booking_cta_click     — click any CTA button
 *   form_submit           — generic form submit (GA/YM only — FB skipped to avoid duplicating Lead)
 *   lead_submitted        — confirmed lead via window.baTrackLead(server OK)
 *   lead_fallback_whatsapp — lead fell back to WhatsApp (server failed)
 *   view_prices           — page view on /prices (fired by GA custom event)
 *
 * Meta Pixel mapping (sent to BOTH initialised pixels: 2082195352165865 + 1250999350496996):
 *   phone_call_*    -> Contact         {method: 'phone',    studio}
 *   whatsapp_click_* -> Contact         {method: 'whatsapp', studio}
 *   maps_click_*    -> FindLocation    {studio}
 *   booking_cta_click -> InitiateCheckout {source: 'cta'}
 *   lead_submitted  -> Lead            {studio, service}
 *   lead_fallback_whatsapp -> Lead     {studio, service, fallback: 'whatsapp'}
 */
(function () {
  'use strict';

  var GA_ID = 'G-C088QPT7KV';
  var YM_ID = 93539783;

  // GA event name -> [FB Standard Event, extra FB params]
  var FB_STANDARD_MAP = {
    phone_call_299:           ['Contact',          { method: 'phone',    studio: 'guramishvili' }],
    phone_call_199:           ['Contact',          { method: 'phone',    studio: 'saburtalo' }],
    whatsapp_click_299:       ['Contact',          { method: 'whatsapp', studio: 'guramishvili' }],
    whatsapp_click_199:       ['Contact',          { method: 'whatsapp', studio: 'saburtalo' }],
    maps_click_politkovskaya: ['FindLocation',     { studio: 'saburtalo' }],
    maps_click_guramishvili:  ['FindLocation',     { studio: 'guramishvili' }],
    booking_cta_click:        ['InitiateCheckout', { source: 'cta' }],
    lead_submitted:           ['Lead',             {}],
    lead_fallback_whatsapp:   ['Lead',             { fallback: 'whatsapp' }]
  };

  // All three analytics scripts are interaction-gated for PageSpeed (gtag/GTM via
  // head-analytics gate ~15s fallback; fbq + ym via external-analytics gate ~20s
  // + 3s inner). Until the first scroll/click/touch/keydown they are undefined,
  // so the FIRST click on tel:/wa.me/CTA would silently drop. Each provider has
  // its own pending queue; a shared poll flushes whichever became available.

  function makeQueue(isReady, drain) {
    var pending = [];
    return {
      send: function (args) {
        if (isReady()) {
          try { drain(args); } catch (e) {}
        } else {
          pending.push(args);
        }
      },
      flush: function () {
        if (!isReady()) return false;
        while (pending.length) {
          try { drain(pending.shift()); } catch (e) {}
        }
        return true;
      }
    };
  }

  var gaQueue  = makeQueue(function () { return typeof gtag === 'function'; },
                           function (a) { gtag.apply(null, a); });
  var ymQueue  = makeQueue(function () { return typeof ym === 'function'; },
                           function (a) { ym.apply(null, a); });
  var fbqQueue = makeQueue(function () { return typeof fbq === 'function'; },
                           function (a) { fbq.apply(null, a); });

  function sendGA(eventName, params) {
    gaQueue.send(['event', eventName, params || {}]);
  }

  function sendYM(goalName) {
    ymQueue.send([YM_ID, 'reachGoal', goalName]);
  }

  // event_id is generated per call and shared between fbq (eventID) and CAPI
  // so Meta deduplicates browser-side and server-side delivery of the same event.
  function generateEventId() {
    if (window.crypto && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'e' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  }

  function getCookie(name) {
    var m = document.cookie.match('(?:^|; )' + name.replace(/[-.]/g, '\\$&') + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : null;
  }

  // Single fbq('track', ...) fan-outs to all initialised pixels, so both
  // 2082195352165865 and 1250999350496996 receive the event.
  // Pass eventID as 4th arg so Meta dedupes with the CAPI delivery.
  function sendFB(eventName, params, eventId) {
    var mapped = FB_STANDARD_MAP[eventName];
    if (!mapped) return null;
    var extra = mapped[1];
    var payload = {};
    var k;
    for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) payload[k] = extra[k];
    if (params) for (k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    payload.source_event = eventName;
    fbqQueue.send(['track', mapped[0], payload, { eventID: eventId }]);
    return mapped[0];
  }

  // Server-side Conversions API — fires in parallel with browser Pixel.
  // Survives adblockers, iOS Safari ITP, and the FIRST-click race where
  // fbq hasn't yet loaded (interaction-gated).
  // keepalive:true lets the request complete even if the page is unloading
  // (tel:/wa.me native handler navigates away immediately).
  function sendCAPI(fbStandardEvent, params, eventId, eventTime) {
    if (!fbStandardEvent || typeof fetch !== 'function') return;
    var body = {
      event_name: fbStandardEvent,
      event_id: eventId,
      event_time: eventTime,
      event_source_url: location.href,
      custom_data: params || {}
    };
    var fbp = getCookie('_fbp');
    var fbc = getCookie('_fbc');
    if (fbp) body.fbp = fbp;
    if (fbc) body.fbc = fbc;
    try {
      fetch('/api/capi', {
        method: 'POST',
        keepalive: true,
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }).catch(function () {});
    } catch (e) {}
  }

  // Poll every 250ms; clear interval once all three providers have flushed,
  // or after 25s (covers gate fallbacks: head 15s + ym/fbq 20s + 3s inner).
  var pollStart = Date.now();
  var pollTimer = setInterval(function () {
    var gaReady  = gaQueue.flush();
    var ymReady  = ymQueue.flush();
    var fbqReady = fbqQueue.flush();
    if ((gaReady && ymReady && fbqReady) || Date.now() - pollStart > 25000) {
      clearInterval(pollTimer);
    }
  }, 250);

  function send(eventName, params) {
    sendGA(eventName, params);
    sendYM(eventName);
    var eventId = generateEventId();
    var eventTime = Math.floor(Date.now() / 1000);
    var fbStandardEvent = sendFB(eventName, params, eventId);
    sendCAPI(fbStandardEvent, params, eventId, eventTime);
  }

  document.addEventListener('click', function (e) {
    // --- Phone calls ---
    var telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      var phone = telLink.getAttribute('href');
      var evt = phone.indexOf('299') !== -1 ? 'phone_call_299' : 'phone_call_199';
      send(evt, { link_url: phone });
      // Don't block — let the browser handle tel: natively (0ms INP).
      // Analytics fires async; preventDefault + 500ms setTimeout is not needed.
      return;
    }

    // --- WhatsApp ---
    var waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
      var waHref = waLink.getAttribute('href');
      var waEvt = waHref.indexOf('299') !== -1 ? 'whatsapp_click_299' : 'whatsapp_click_199';
      send(waEvt, { link_url: waHref });
      return;
    }

    // --- Google Maps ---
    var mapsLink = e.target.closest('a[href*="maps.app.goo.gl"]');
    if (mapsLink) {
      var mapsHref = mapsLink.getAttribute('href');
      if (mapsHref.indexOf('g8eLgcEB9vrVNvsY7') !== -1) {
        send('maps_click_politkovskaya', { link_url: mapsHref });
      } else if (mapsHref.indexOf('9VfCTRyXAEigrErM6') !== -1) {
        send('maps_click_guramishvili', { link_url: mapsHref });
      }
      return;
    }

    // --- Booking CTA buttons ---
    var ctaBtn = e.target.closest('a[href*="#contact"], a[href*="#booking"], [data-elem-type="button"]');
    if (ctaBtn) {
      var ctaText = (ctaBtn.textContent || '').trim();
      if (ctaText.indexOf('\u10D3\u10D0\u10EF\u10D0\u10D5\u10E8\u10DC\u10D4\u10D7') !== -1) {
        send('booking_cta_click', { button_text: ctaText });
      }
    }
  });

  // --- Form submit via WhatsApp ---
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (form && form.tagName === 'FORM') {
      send('form_submit', { form_action: form.action || 'unknown' });
    }
  });

  // --- Lead form submission tracking ---
  window.baTrackLead = function (studio, service, serverOk) {
    if (serverOk) {
      send('lead_submitted', { studio: studio, service: service });
    } else {
      send('lead_fallback_whatsapp', { studio: studio, service: service });
    }
  };
})();

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

  function sendGA(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    }
  }

  function sendYM(goalName) {
    if (typeof ym === 'function') {
      ym(YM_ID, 'reachGoal', goalName);
    }
  }

  // Single fbq('track', ...) fan-outs to all initialised pixels, so both
  // 2082195352165865 and 1250999350496996 receive the event.
  // FB Pixel script is interaction-gated (defer 20s) so fbq is undefined
  // until first user interaction. Queue events locally and flush them once
  // fbq loads — preserves the FIRST click on tel:/wa.me/CTA which often
  // also IS the interaction that triggers the gate.
  var fbqPending = [];

  function callFbq(args) {
    try { fbq.apply(null, args); } catch (e) {}
  }

  function flushFbqPending() {
    if (typeof fbq !== 'function') return false;
    while (fbqPending.length) callFbq(fbqPending.shift());
    return true;
  }

  function sendFB(eventName, params) {
    var mapped = FB_STANDARD_MAP[eventName];
    if (!mapped) return;
    var extra = mapped[1];
    var payload = {};
    var k;
    for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) payload[k] = extra[k];
    if (params) for (k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    payload.source_event = eventName;
    var args = ['track', mapped[0], payload];
    if (typeof fbq === 'function') {
      callFbq(args);
    } else {
      fbqPending.push(args);
    }
  }

  // Poll until fbq loads (after interaction gate ~3s post first interaction),
  // then drain the buffered events and stop polling. Cap at 25s to avoid
  // perpetual interval if the user never interacts (Lighthouse, bots).
  var fbqPollStart = Date.now();
  var fbqPoll = setInterval(function () {
    if (flushFbqPending() || Date.now() - fbqPollStart > 25000) {
      clearInterval(fbqPoll);
    }
  }, 250);

  function send(eventName, params) {
    sendGA(eventName, params);
    sendYM(eventName);
    sendFB(eventName, params);
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

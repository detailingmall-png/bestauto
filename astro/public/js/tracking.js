/**
 * BESTAUTO — event tracking for GA4 + Yandex Metrika
 *
 * Events:
 *   phone_call_299        — click tel: link containing 299
 *   phone_call_199        — click tel: link containing 199
 *   whatsapp_click_299    — click wa.me link containing 299
 *   whatsapp_click_199    — click wa.me link containing 199
 *   maps_click_politkovskaya — click Google Maps link (Politkovskaya)
 *   maps_click_guramishvili  — click Google Maps link (Guramishvili)
 *   booking_cta_click     — click any CTA button
 *   view_prices           — page view on /prices (fired by GA custom event)
 */
(function () {
  'use strict';

  var GA_ID = 'G-C088QPT7KV';
  var YM_ID = 93539783;

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

  function send(eventName, params) {
    sendGA(eventName, params);
    sendYM(eventName);
  }

  document.addEventListener('click', function (e) {
    // --- Phone calls ---
    var telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      e.preventDefault();
      var phone = telLink.getAttribute('href');
      var evt = phone.indexOf('299') !== -1 ? 'phone_call_299' : 'phone_call_199';
      send(evt, { link_url: phone });
      setTimeout(function () { window.location.href = phone; }, 500);
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
})();

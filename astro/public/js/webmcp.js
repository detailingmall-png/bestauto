/**
 * BESTAUTO WebMCP bootstrap.
 *
 * Exposes a small tool surface to agentic browsers that implement the
 * WebMCP API (`navigator.modelContext.provideContext`) so AI agents can
 * discover what BESTAUTO services exist, find studio info, and submit a
 * booking lead. In browsers without WebMCP, this file is a no-op (~0 bytes
 * of runtime cost beyond the initial fetch).
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 */
(function () {
  'use strict';

  var mc =
    typeof navigator !== 'undefined' && navigator && navigator.modelContext;
  if (!mc || typeof mc.provideContext !== 'function') return;

  var SERVICES = [
    { slug: 'polishing',            min_gel: 690,  name_en: 'Car Polishing' },
    { slug: 'ceramiccoating',       min_gel: 500,  name_en: 'Ceramic Coating' },
    { slug: 'ppf-shield-wrapping',  min_gel: 2500, name_en: 'PPF Paint Protection Film' },
    { slug: 'vinyl-wrapping',       min_gel: 300,  name_en: 'Color Change Vinyl Wrap' },
    { slug: 'interior-cleaning',    min_gel: 400,  name_en: 'Interior Cleaning' },
    { slug: 'carwash',              min_gel: 40,   name_en: 'Premium Car Wash' },
    { slug: 'auto-glass-tinting',   min_gel: 130,  name_en: 'Window Tinting' },
    { slug: 'windshield-repair',    min_gel: 60,   name_en: 'Windshield Repair' },
    { slug: 'car-soundproofing',    min_gel: 600,  name_en: 'Car Soundproofing' },
    { slug: 'computer-diagnostics', min_gel: 50,   name_en: 'Computer Diagnostics' }
  ];

  var STUDIOS = [
    {
      slug: 'guramishvili',
      name_en: 'BESTAUTO Guramishvili',
      address_en: 'Guramishvili Ave. 78, Gldani district, Tbilisi, Georgia',
      phone: '+995550000299',
      whatsapp: 'https://wa.me/995550000299',
      hours_en: 'Mon-Sat 10:00-20:00',
      maps: 'https://maps.app.goo.gl/WBLHgeikidvdjsew7'
    },
    {
      slug: 'saburtalo',
      name_en: 'BESTAUTO Saburtalo',
      address_en: 'Anna Politkovskaya St. 51, Saburtalo district, Tbilisi, Georgia',
      phone: '+995550000199',
      whatsapp: 'https://wa.me/995550000199',
      hours_en: 'Mon-Sat 10:00-20:00',
      maps: 'https://maps.app.goo.gl/2vyDX1rNExQY4VER7'
    }
  ];

  function urlFor(slug, lang) {
    var prefix = lang === 'ru' ? '/ru/' : lang === 'en' ? '/en/' : '/';
    return 'https://bestauto.ge' + prefix + slug;
  }

  var tools = [
    {
      name: 'bestauto_list_services',
      description:
        'List BESTAUTO detailing services with starting price in GEL and URLs to the service page.',
      inputSchema: {
        type: 'object',
        properties: {
          lang: {
            type: 'string',
            enum: ['ka', 'ru', 'en'],
            default: 'en',
            description: 'Language of the returned service page URLs.'
          }
        }
      },
      execute: function (input) {
        var lang = (input && input.lang) || 'en';
        return {
          currency: 'GEL',
          services: SERVICES.map(function (s) {
            return {
              slug: s.slug,
              name: s.name_en,
              min_price_gel: s.min_gel,
              url: urlFor(s.slug, lang)
            };
          })
        };
      }
    },
    {
      name: 'bestauto_get_studio_info',
      description:
        'Return address, phone, hours, and Google Maps link for one or both BESTAUTO studios in Tbilisi.',
      inputSchema: {
        type: 'object',
        properties: {
          studio: {
            type: 'string',
            enum: ['guramishvili', 'saburtalo', 'all'],
            default: 'all'
          }
        }
      },
      execute: function (input) {
        var pick = (input && input.studio) || 'all';
        var list =
          pick === 'all'
            ? STUDIOS
            : STUDIOS.filter(function (s) { return s.slug === pick; });
        return { studios: list };
      }
    },
    {
      name: 'bestauto_submit_booking',
      description:
        'Submit a booking/contact request to a BESTAUTO studio. User consent required before calling this tool.',
      inputSchema: {
        type: 'object',
        required: ['studio', 'service', 'phone'],
        properties: {
          studio: { type: 'string', enum: ['guramishvili', 'saburtalo'] },
          service: { type: 'string', minLength: 1, maxLength: 200 },
          phone: {
            type: 'string',
            pattern: '^\\+\\d{7,15}$',
            description: 'E.164: plus sign followed by 7-15 digits'
          },
          car: { type: 'string', maxLength: 200 },
          lang: { type: 'string', enum: ['ka', 'ru', 'en'] }
        }
      },
      execute: function (input) {
        return fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studio: input.studio,
            service: input.service,
            phone: input.phone,
            car: input.car || '',
            lang: input.lang || 'en',
            page: typeof location !== 'undefined' ? location.href : ''
          })
        }).then(function (res) {
          return res.json().then(function (body) {
            return { http_status: res.status, response: body };
          });
        });
      }
    }
  ];

  try {
    mc.provideContext({ tools: tools });
  } catch (e) {
    // Swallow: WebMCP shape may differ across early implementations.
  }
})();

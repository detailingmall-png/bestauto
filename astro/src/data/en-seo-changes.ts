/**
 * EN SEO text changes for service pages.
 * Each entry maps a base slug to its meta, hero, benefits, trust,
 * SEO block, and content block changes.
 * Mirrors the structure of ka-seo-changes.ts (KA is the reference).
 */

import { buildContentBlock, buildBrandsBlock, reviewsSubtitle } from '../lib/seo-blocks';
import type { PageSeoConfig } from '../lib/seo-blocks';

export const EN_SEO_PAGES: Readonly<Record<string, PageSeoConfig>> = {

  /* ====== HOMEPAGE ====== */
  '': {
    meta: {
      title: 'Car Detailing in Tbilisi — PPF, Polishing, Ceramic | BESTAUTO',
      description: 'BESTAUTO — premium car detailing studio in Tbilisi. PPF film wrapping, color change wrap, polishing, ceramic coating, window tinting, interior detailing, and 2 locations in Tbilisi.',
    },
    textReplacements: [
      // Hero subtitle
      { from: 'Professional car care and protection: PPF paint protection film, color wrap, polishing with ceramic coating, window tinting and glass repair, interior detailing.', to: 'Professional car care and protection: PPF film wrapping, color change wrap, polishing, ceramic coating, window tinting, windshield repair, and interior detailing.' },
      // Benefits heading
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO in Tbilisi' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1
      { from: '5 Years of Detailing Experience', to: '5+ Years of Hands-On Experience' },
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Daily hands-on practice and professional service on vehicles of various makes and models' },
      // Trust card: item 2 desc
      { from: 'Guramishvili 78 and Anna Politkovskaya 51 — choose a convenient location', to: 'In Guramishvili and Saburtalo — choose the nearest location' },
      // Trust card: item 3
      { from: '2,000 Satisfied Clients', to: '4.9★ Rating and Hundreds of Real Reviews' },
      { from: 'Hundreds of reviews, 4.9★ rating on Google', to: 'Top-rated on Google with real client experiences across various services' },
      // Trust card: item 4
      { from: '10-Year Film Warranty', to: 'Certified Materials and Warranty' },
      { from: 'We cover peeling, yellowing, and material defects', to: 'We use only trusted brands and offer warranty on specific services' },
      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div>${reviewsSubtitle('Real client experiences from Google — PPF, polishing, ceramic coating, interior cleaning, tinting and other services')}</div>` },
    ],
    seoBlock: '',
  },

  /* ====== POLISHING ====== */
  'polishing': {
    meta: {
      title: 'Car Polishing in Tbilisi — from 690 ₾ | BESTAUTO',
      description: 'Car polishing in Tbilisi — body, headlights, windshield and interior details. Shine restoration, scratch reduction and well-maintained look at BESTAUTO.',
    },
    textReplacements: [
      // Hero H1
      { from: 'Car Polishing in Tbilisi', to: 'Car Polishing in Tbilisi | Body, Headlights and Glass' },
      // Hero subtitle
      { from: 'We provide a wide range of polishing services: paint correction, optics polishing, windshield polishing, interior elements polishing in Tbilisi', to: 'Body, headlight, windshield and interior polishing — we restore your car\u2019s shine, cleaner look and well-maintained appearance' },
      // Benefits heading
      { from: 'Benefits of car polishing', to: 'Key Benefits of Car Polishing' },
      // Benefits items
      { from: 'Look of a new car', to: 'Fresher, well-maintained appearance' },
      { from: 'Water-repellent properties upgrade', to: 'Fewer water marks and stains' },
      { from: 'Dirt-repellent properties enhancement', to: 'Smoother surface finish' },
      { from: 'Paint fading and corrosion reduction', to: 'Better preservation of visual condition' },
      { from: 'Increase in the resale value of the car', to: 'Stronger first impression when selling' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Polishing' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Professional polishing of hundreds of cars — from light to restorative' },
      // Trust card: item 2 desc
      { from: 'Guramishvili 78 and Anna Politkovskaya 51 — choose a convenient location', to: 'In Guramishvili and Saburtalo — choose the nearest location' },
      // Trust card: item 3
      { from: '2,000 Satisfied Clients', to: '4.9★ Rating and Hundreds of Real Reviews' },
      { from: 'Hundreds of reviews, 4.9★ rating on Google', to: 'Top-rated on Google with real client experiences across various services' },
      // Trust card: item 4
      { from: '10-Year Film Warranty', to: 'Certified Materials and Warranty' },
      { from: 'We cover peeling, yellowing, and material defects', to: 'We use only trusted brands and offer warranty on specific services' },
      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with polishing — body, headlight and windshield polishing, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [],
    stepsBlock: {
      heading: 'Car Polishing Process',
      steps: [
        { title: 'Body Inspection', description: 'We assess the paint condition, scratches, scuffs and wash marks.' },
        { title: 'Deep Wash', description: 'We thoroughly clean the body from dirt, tar and various contaminants.' },
        { title: 'Surface Preparation', description: 'We dry the car and protect plastic, rubber and delicate elements.' },
        { title: 'Polishing System Selection', description: 'We choose compounds and pads based on coating type and body condition.' },
        { title: 'Restorative Polishing', description: 'We remove fine scratches, swirl marks, haze and wear traces.' },
        { title: 'Finish Polishing', description: 'We give the coating deep gloss, clean reflection and vivid color.' },
        { title: 'Result Inspection', description: 'Under special lighting we check the body and perfect the result.' },
        { title: 'Surface Protection', description: 'If needed, we apply a protective coating to preserve the shine longer.' },
      ],
    },
  },

  /* ====== CERAMIC COATING ====== */
  'ceramiccoating': {
    meta: {
      title: 'Ceramic Coating for Cars in Tbilisi — from 600 ₾ | BESTAUTO',
      description: 'Car ceramic coating in Tbilisi — ceramic coating for body, glass and interior. Deep gloss, hydrophobic effect, easier maintenance and professional preparation at BESTAUTO.',
    },
    textReplacements: [
      // Hero H1
      { from: 'Ceramic Coating for Cars in Tbilisi', to: 'Ceramic Coating in Tbilisi — Body, Glass and Interior' },
      // Hero subtitle
      { from: 'We provide services for applying a ceramic coating to the car\'s body, alloy wheels, windows, and interior, preserving the appearance of a vehicle for up to 3 years in Tbilisi', to: 'We apply ceramic coating to body, glass and interior — more gloss, hydrophobic effect, easier maintenance and a well-maintained look in everyday use.' },
      // Benefits heading
      { from: 'Advantages of ceramic coating ', to: 'Key Benefits of Ceramic Coating' },
      // Benefits items
      { from: 'Protection against external influence', to: 'Extra protection from environmental factors' },
      { from: 'Scratch resistance', to: 'Reduced visibility of surface defects' },
      { from: 'Enhanced gloss', to: 'Deep gloss and a more polished look' },
      { from: 'Less dirt accumulation', to: 'Hydrophobic effect and easier maintenance' },
      { from: 'Long-lasting effects', to: 'Long-lasting effect with proper care' },
      { from: 'Reduction of oxidation and corrosion', to: 'Reduced environmental impact on surfaces' },
      // Service types heading
      { from: 'Types of ceramic coating services', to: 'Types of Ceramic Coatings' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Ceramic Coating' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Ceramic treatment of hundreds of vehicles of various makes' },
      // Trust card: item 4 (PPF warranty → ceramic preparation)
      { from: '10-Year Film Warranty', to: 'Proper Preparation — Quality Result' },
      { from: 'We cover peeling, yellowing, and material defects', to: 'Polishing and surface preparation before coating application' },
      // Price labels
      { from: 'Car body ceramic coating', to: 'Body Ceramic Coating' },
      { from: 'Glass ceramic coating', to: 'Glass Ceramic Coating / Anti-Rain' },
      { from: 'Interior ceramic coating', to: 'Interior Ceramic Coating' },
      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with ceramic coating — coating application and body protection, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [],
    stepsBlock: {
      heading: 'Ceramic Coating Application Process',
      steps: [
        { title: 'Inspection and Diagnostics', description: 'We assess the body condition and determine the required scope of preparation.' },
        { title: 'Deep Body Cleaning', description: 'We remove all contaminants that could affect coating quality.' },
        { title: 'Paint Preparation', description: 'We clean, degrease and, if needed, polish the body before applying ceramic coating.' },
        { title: 'Ceramic Compound Application', description: 'We evenly distribute the ceramic coating across the prepared surface.' },
        { title: 'Coating Curing', description: 'We ensure proper curing time for reliable adhesion of the compound.' },
        { title: 'Result Inspection', description: 'We check coating uniformity, gloss depth and the final visual effect.' },
        { title: 'Post-Procedure Recommendations', description: 'We provide clear instructions to help the result last as long as possible.' },
      ],
    },
  },

  /* ====== PPF ====== */
  'ppf-shield-wrapping': {
    meta: {
      title: 'PPF Paint Protection Film in Tbilisi — 10-Year Warranty | BESTAUTO',
      description: 'PPF paint protection film wrapping in Tbilisi — clear, matte, satin finish. Self-healing, hood protection, full or partial coverage, 10-year warranty at BESTAUTO.',
    },
    textReplacements: [
      // Hero H1
      { from: 'PPF Paint Protection Film in Tbilisi', to: 'PPF Paint Protection Film Wrapping in Tbilisi' },
      // Hero subtitle
      { from: "We provide services for applying protective polyurethane film on vehicles in Tbilisi, to protect them against damages, and scratches, and preserve the car's exterior appearance.", to: '10-Year Warranty · LLumar, Quantum, LuxArmor Films · 2,000+ Wrapped Vehicles · Clear PPF · Matte PPF · Satin PPF' },
      // Benefits heading
      { from: 'Benefits of PPF for vehicles', to: 'Benefits of PPF Paint Protection Film' },
      // Benefits items (4 of 5, matching KA pattern)
      { from: 'Damage protection', to: 'Protection from chips, scratches and chemical damage' },
      { from: 'Longevity', to: 'Long-lasting protection' },
      { from: 'Self-healing properties', to: 'Self-healing technology' },
      { from: 'Transparency and invisibility on the car body', to: 'Clear protection or chosen finish on the body' },
      // Price heading
      { from: 'Prices for PPF wrapping', to: 'PPF Paint Protection Film Prices in Tbilisi' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for PPF' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Full and partial PPF wrapping of hundreds of vehicles' },
      // Add 2 items to PPF prices (after last existing row)
      { from: '<span class="ba-price-name">Windshield wrapping</span><span class="ba-price-value">from 1100 Gel</span></div>', to: '<span class="ba-price-name">Windshield wrapping</span><span class="ba-price-value">from 1100 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Interior elements PPF wrapping</span><span class="ba-price-value">from 800 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Fender PPF wrapping</span><span class="ba-price-value">from 600 Gel</span></div>' },

      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div>${reviewsSubtitle('Client experiences with PPF — protective film wrapping and hood protection, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [
      buildContentBlock({
        heading: 'PPF Wrapping — Finish Options',
        text: '',
        items: [
          { title: 'Glossy Clear PPF', desc: 'The classic option — body protection while preserving the original look' },
          { title: 'Matte Clear PPF', desc: 'Matte effect + protection without changing the color' },
          { title: 'Satin PPF', desc: 'Soft sheen + protective properties in one film' },
        ],
        footer: 'If your goal is a color change rather than just protection, check our <a href="/en/vinyl-wrapping" style="color:var(--ba-color-accent);">color change page</a>.',
      }),
    ],
  },

  /* ====== VINYL WRAPPING (COLOR CHANGE) ====== */
  'vinyl-wrapping': {
    meta: {
      title: 'Car Color Change with Film in Tbilisi — Color PPF and Vinyl, Prices | BESTAUTO',
      description: 'Car color change with film in Tbilisi — color PPF premium solution, vinyl affordable alternative. Prices, full or partial wrap, anti-chrome and free inspection at BESTAUTO.',
    },
    textReplacements: [
      // Hero H1
      { from: 'Color Vinyl Polyurethane Protective Film in Tbilisi', to: 'Car Color Change in Tbilisi — Color PPF and Vinyl' },
      // Hero subtitle
      { from: '10-year warranty \u00b7 Quantum, LuxArmor films \u00b7 2000+ protected cars', to: 'Color PPF — our top recommendation for maximum protection and visual effect. We also offer vinyl color change if preferred.' },
      // Compare block heading
      { from: 'Color Protective Film vs Vinyl Wrap', to: 'Car Color Change — Color PPF vs Vinyl' },
      // Benefits heading
      { from: 'Benefits of Color Protective Film', to: 'Why Clients Choose Color Change at BESTAUTO' },
      // Film types heading
      { from: 'Films We Use', to: 'Films We Use for Color Change' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Color Change' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of vehicles of all makes and models', to: 'Color change with color PPF and vinyl on vehicles of various makes' },
      // Add 2 items to vinyl/color change prices (after last existing row)
      { from: '<span class="ba-price-name">Anti-chrome (wrapping chrome elements with black film)</span><span class="ba-price-value">from 300 Gel</span></div>', to: '<span class="ba-price-name">Anti-chrome (wrapping chrome elements with black film)</span><span class="ba-price-value">from 300 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Full car vinyl wrapping</span><span class="ba-price-value">from 6900 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Black polyurethane roof wrapping</span><span class="ba-price-value">from 800 Gel</span></div>' },

      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with color change — color PPF and vinyl wrapping, as well as other services')}</div>` },
    ],
    seoBlock: '',
  },

  /* ====== TINTING ====== */
  'auto-glass-tinting': {
    meta: {
      title: 'Car Window Tinting in Tbilisi — Athermal and Ceramic Film | BESTAUTO',
      description: 'Car window tinting in Tbilisi — athermal and ceramic film, comfort, UV protection and privacy. Professional tinting at BESTAUTO.',
    },
    textReplacements: [
      // Hero subtitle
      { from: 'We provide car window tinting services in Tbilisi, protecting the interior from heat and the passengers from harmful UV rays.', to: 'We tint car windows with athermal and ceramic film — less heat, more comfort, UV protection and a more refined look.' },
      // Benefits heading
      { from: 'Benefits of car window tinting', to: 'Key Benefits of Car Window Tinting' },
      // Benefits items
      { from: 'Sun protection', to: 'Sun and heat protection' },
      { from: 'Comfort and power saving', to: 'Comfort in everyday use' },
      { from: 'Interior protection', to: 'Interior protection from fading' },
      { from: 'Privacy and safety', to: 'Privacy and added safety' },
      { from: 'Enhanced appearance', to: 'Visual effect and a more refined look' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Tinting' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Professional tinting of hundreds of vehicles of various makes' },
      // Trust card: item 4 (PPF warranty → tinting films)
      { from: '10-Year Film Warranty', to: 'Athermal and Ceramic Films' },
      { from: 'We cover peeling, yellowing, and material defects', to: 'We use only quality films with UV protection and durability' },
      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with tinting — window tinting and glass darkening, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [
      buildContentBlock({
        heading: 'Car Window Tinting — Film Options',
        text: '',
        items: [
          { title: 'Athermal Film', desc: 'Especially effective for reducing heat, a more comfortable interior' },
          { title: 'Ceramic Film', desc: 'Premium quality, comfort and long-lasting results in one product' },
          { title: 'Tinting Percentages', desc: 'Darkness level is chosen based on visual and practical requirements' },
        ],
      }),
    ],
    stepsBlock: {
      heading: 'Window Tinting Process',
      steps: [
        { title: 'Vehicle Inspection', description: 'We assess the condition of windows and select the best solution for your car.' },
        { title: 'Surface Preparation', description: 'We thoroughly clean the windows and prepare the surface for film installation.' },
        { title: 'Precision Cutting and Shaping', description: 'We prepare the film to match the window shape for the most precise and clean fit.' },
        { title: 'Professional Installation', description: 'We install the film without bubbles, wrinkles or gaps.' },
        { title: 'Quality Control', description: 'We inspect the result and perfect every detail.' },
        { title: 'Post-Installation Care Tips', description: 'We provide clear guidance on caring for your tinted windows in the first days.' },
      ],
    },
    brandsBlock: {
      heading: 'Window Tinting in Tbilisi — Tinting Film Selection',
      cards: [
        { name: 'LLumar', subtitle: 'Premium Class', description: 'LLumar tinting film stands out for its high quality, clean look and comfort in everyday use. Various tinting options available. 10-year warranty.' },
        { name: 'LuxArmor', subtitle: 'Nano-Ceramic', description: 'LuxArmor nano-ceramic tinting film effectively protects from heat, reduces sun discomfort and improves cabin comfort. Various options available. 10-year warranty.' },
      ],
      footer: 'We\'ll select the optimal tinting film for your car based on visual preferences, comfort and budget',
    },
  },

  /* ====== INTERIOR CLEANING ====== */
  'interior-cleaning': {
    meta: {
      title: 'Car Interior Cleaning in Tbilisi — from 400 ₾ | BESTAUTO',
      description: 'Car interior cleaning in Tbilisi — deep cleaning of seats, ceiling, floor and trunk. Saburtalo and Gldani. Price from 400 ₾, interior detailing at BESTAUTO.',
    },
    textReplacements: [
      // Hero subtitle
      { from: 'We offer gentle car interior cleaning services when all surfaces inside your car are deeply cleaned. We use innovative and safe chemical products that effectively remove stains, dirt, and odors in Tbilisi', to: 'Deep interior cleaning — professional cleaning of seats, ceiling, floor, plastic and trunk with stain and odor removal.' },
      // Benefits heading
      { from: 'Benefits of car interior cleaning', to: 'Key Benefits of Car Interior Cleaning' },
      // Benefits items
      { from: "Restoration of the car's look", to: 'Deep cleaning and visual refresh of the interior' },
      { from: 'Protection and preservation of your car', to: 'Better preservation of interior materials' },
      { from: 'Increased comfort and hygiene', to: 'Comfort, hygiene and fewer allergens' },
      { from: 'Enhanced car value', to: 'Stronger impression when selling' },
      // Difference block heading
      { from: 'The difference between detailing and cleaning', to: 'How Interior Detailing Differs from Regular Cleaning' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Interior Cleaning' },
      { from: "You'll love the result", to: '' },
      // Remove "hand detailing wash" from service prices
      { from: '<div class="ba-price-row"><span class="ba-price-name">Hand detailing car wash</span><span class="ba-price-value">from 40 Gel</span></div>', to: '' },

      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with interior cleaning — deep cleaning of seats, ceiling, floor and trunk, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [],
    stepsBlock: {
      heading: 'Car Interior Cleaning Process',
      steps: [
        { title: 'Interior Inspection', description: 'We assess the condition of upholstery, plastic, ceiling and the degree of soiling.' },
        { title: 'Dry Interior Cleaning', description: 'We remove dust, sand and small debris from all areas of the vehicle.' },
        { title: 'Safe Chemical Selection', description: 'We choose compounds for fabric, leather, plastic and delicate elements.' },
        { title: 'Deep Surface Cleaning', description: 'We clean seats, floor covering, door panels, ceiling and trunk.' },
        { title: 'Tough Stain Removal', description: 'We remove stains, wear marks and deeply embedded dirt.' },
        { title: 'Plastic and Detail Cleaning', description: 'We clean panels, buttons, air vents and hard-to-reach areas.' },
        { title: 'Interior Drying', description: 'After cleaning, we thoroughly dry all surfaces.' },
        { title: 'Final Inspection', description: 'Before handover, we check cleanliness and quality of the work performed.' },
      ],
    },
  },

  /* ====== SOUNDPROOFING ====== */
  'car-soundproofing': {
    meta: {
      title: 'Car Soundproofing in Tbilisi — from 600 ₾ | BESTAUTO',
      description: 'Car soundproofing and vibration dampening in Tbilisi — doors, floor, trunk and wheel arches. More comfort, less noise and professional installation at BESTAUTO.',
    },
    textReplacements: [
      // Hero subtitle
      { from: 'We provide services for both complex and localized car soundproofing (doors, trunk, floor).', to: 'Full and partial car soundproofing — doors, floor, trunk, wheel arches and other areas for more comfort and less noise.' },
      // Benefits heading
      { from: 'Advantages of car soundproofing', to: 'Key Benefits of Car Soundproofing' },
      // Benefits items
      { from: 'Comfort', to: 'More cabin comfort' },
      { from: 'Improved sound quality', to: 'Better sound quality inside the cabin' },
      { from: 'Improved air conditioning', to: 'Quieter and more comfortable daily driving' },
      { from: 'Privacy and confidentiality', to: 'More cabin privacy' },
      { from: 'Protection from harmful noise', to: 'Less fatigue on long drives' },
      { from: 'Increased car value', to: 'A more premium driving experience' },
      // Price heading
      { from: 'Car soundproofing prices', to: 'Car Soundproofing Prices in Tbilisi' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Soundproofing' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Full and partial soundproofing of hundreds of vehicles' },
      // Trust card: item 4
      { from: '10-Year Film Warranty', to: 'Professional Materials' },
      { from: 'We cover peeling, yellowing, and material defects', to: 'We use specialized vibration and sound dampening materials' },
      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with soundproofing — door, floor and trunk treatment, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [],
    stepsBlock: {
      heading: 'Car Soundproofing Process',
      steps: [
        { title: 'Vehicle Inspection', description: 'We identify the areas where most noise enters the cabin.' },
        { title: 'Interior Disassembly', description: 'We carefully remove interior panels to access the metal surfaces.' },
        { title: 'Surface Preparation', description: 'We clean and degrease work areas before applying materials.' },
        { title: 'Vibration Damping Layer', description: 'We apply the first layer to reduce vibration and road rumble.' },
        { title: 'Sound Insulation Layer', description: 'We add materials that reduce street noise and sounds from wheel arches.' },
        { title: 'Main Area Treatment', description: 'We insulate doors, floor, trunk, wheel arches and other noisy sections.' },
        { title: 'Interior Reassembly', description: 'We carefully return all elements to their places without damage.' },
        { title: 'Final Inspection', description: 'We check assembly quality and the overall result of the work performed.' },
      ],
    },
  },

  /* ====== WINDSHIELD REPAIR ====== */
  'windshield-repair': {
    meta: {
      title: 'Windshield Repair in Tbilisi — Chips and Cracks | BESTAUTO',
      description: 'Windshield repair in Tbilisi — chip and crack repair, quick service, original glass preservation and lower costs at BESTAUTO.',
    },
    textReplacements: [
      // Benefits heading (from-string matches inline slug.astro output, not Tilda original)
      { from: 'Advantages of auto glass restoration', to: 'Key Benefits of Windshield Repair' },
      // Benefits items
      { from: 'Cost cut', to: 'Lower costs' },
      { from: 'Quick fix', to: 'Quick service' },
      // Price heading (from-string matches inline slug.astro output)
      { from: 'Prices for chip & crack repair, glass grinding', to: 'Windshield Repair Prices' },
      // Examples heading
      { from: 'Examples of glass chip repair', to: 'Completed Repair Examples' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Windshield Repair' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Hundreds of successful windshield repairs across various damage types' },
      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with windshield repair — chip and crack repair, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [
      buildContentBlock({
        heading: 'Chip and Crack Repair — When Is It Worth Repairing',
        text: '',
        items: [
          { title: 'When Repair Is Possible', desc: 'The chip or crack is within a repairable size and is not in a critical zone' },
          { title: 'When Replacement Is Better', desc: 'The damage is too large, complex in shape or obstructs visibility' },
          { title: 'Why You Shouldn\'t Delay', desc: 'Timely repair reduces the risk of crack spreading and saves on full replacement' },
        ],
      }),
    ],
    stepsBlock: {
      heading: 'Windshield Repair Process',
      steps: [
        { title: 'Damage Diagnostics', description: 'We determine the type, depth and location of the chip or crack.' },
        { title: 'Glass Preparation', description: 'We thoroughly clean the repair area from dust, moisture and contaminants.' },
        { title: 'Localized Drilling', description: 'If needed, we carefully drill to stop the crack from spreading.' },
        { title: 'Repair Zone Preparation', description: 'We create the right conditions for precise and reliable glass restoration.' },
        { title: 'Polymer Filling', description: 'We fill the damaged area with clear polymer to restore the glass structure.' },
        { title: 'UV Curing', description: 'We fix the material with a UV lamp for a long-lasting result.' },
        { title: 'Finish Treatment', description: 'We smooth the surface and minimize the visibility of repair marks.' },
        { title: 'Quality Control', description: 'We check transparency, precision of the work and the final glass appearance.' },
        { title: 'Post-Repair Recommendations', description: 'We provide tips on glass care after the procedure is complete.' },
      ],
    },
  },

  /* ====== CARWASH ====== */
  'carwash': {
    meta: {
      title: 'Car Wash in Tbilisi — Detailing Wash from 40 ₾ | BESTAUTO',
      description: 'Car wash in Tbilisi — 2-phase and 3-phase detailing wash, safe care for PPF and ceramic, professional chemicals and 2 locations.',
    },
    textReplacements: [
      // Hero H1
      { from: 'Premium Car Wash in Tbilisi', to: 'Car Wash in Tbilisi' },
      // Hero subtitle
      { from: '<strong>Our gentle detailing car wash is a safe, meticulous, premium-quality hand wash for your vehicle.</strong>', to: '2-phase and 3-phase detailing wash — a safe process, professional chemicals and the most careful treatment for your car.' },
      // Benefits heading
      { from: 'Detailing Car Wash Benefits', to: 'Key Benefits of Detailing Car Wash' },
      // Process heading
      { from: 'Detailing Car Wash Steps', to: 'How a Detailing Car Wash Works' },
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Car Wash' },
      { from: "You'll love the result", to: '' },
      // Add engine wash item (after 3-phase SUV row)
      { from: '<span class="ba-price-name">Hand Detailing Car Wash, 3-Phase (SUV)</span><span class="ba-price-value">59 Gel</span></div>', to: '<span class="ba-price-name">Hand Detailing Car Wash, 3-Phase (SUV)</span><span class="ba-price-value">59 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Engine wash</span><span class="ba-price-value">80 Gel</span></div>' },

      // Reviews subtitle
      { from: 'Real Reviews from Our Clients</span></div> </div> </div>', to: `Real Reviews from Our Clients</span></div> </div> ${reviewsSubtitle('Client experiences with car wash — safe car wash in Saburtalo and Gldani, as well as other services')}</div>` },
    ],
    seoBlock: '',
    contentBlocks: [],
  },

  /* ====== COMPUTER DIAGNOSTICS ====== */
  'computer-diagnostics': {
    meta: {
      title: 'Car Computer Diagnostics in Tbilisi | BESTAUTO',
      description: 'Car computer diagnostics in Tbilisi — error code reading, system checks and transparent assessment at BESTAUTO.',
    },
    textReplacements: [
      // Trust block
      { from: 'Why Choose Our Detailing Center?', to: 'Why Clients Choose BESTAUTO for Diagnostics' },
      { from: "You'll love the result", to: '' },
      // Trust card: item 1 desc
      { from: 'Professional wrapping of hundreds of cars of different makes and models', to: 'Computer diagnostics of hundreds of vehicles of various makes' },
      // Trust card: item 4
      { from: '10-Year Film Warranty', to: 'Transparent Assessment' },
      { from: 'We cover peeling, yellowing, and material defects', to: 'We\'ll clearly tell you what the problem is and what needs to be fixed' },
      // Reviews subtitle
      { from: 'Real reviews from our clients</span></div></div> </div> </div>', to: `Real reviews from our clients</span></div></div> </div> ${reviewsSubtitle('Client experiences with diagnostics — computer checks and error code reading, as well as other services')}</div>` },
    ],
    seoBlock: '',
  },

  /* ====== PRICES ====== */
  'prices': {
    meta: {
      title: 'Prices — Car Detailing Services in Tbilisi | BESTAUTO',
      description: 'BESTAUTO prices in Tbilisi — PPF, polishing, ceramic coating, interior cleaning, tinting, car wash and other services.',
    },
    textReplacements: [
      // Section headings
      { from: 'Color Protective Film Pricing', to: 'Color Change Prices — Color PPF and Vinyl' },
      { from: 'Windshield chip &amp; crack repair prices', to: 'Windshield Repair Prices' },
      { from: 'Detailing dry cleaning &amp; car wash prices', to: 'Car Interior Cleaning Prices' },
      // Remove "hand detailing wash" from cleaning section
      { from: '<div class="ba-price-row"><span class="ba-price-name">Hand detailing car wash</span><span class="ba-price-value">from 40 Gel</span></div>', to: '' },
      // Add 2 items to PPF section (after last existing row)
      { from: '<span class="ba-price-name">Windshield wrapping</span><span class="ba-price-value">from 1100 Gel</span></div>', to: '<span class="ba-price-name">Windshield wrapping</span><span class="ba-price-value">from 1100 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Interior elements PPF wrapping</span><span class="ba-price-value">from 800 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Fender PPF wrapping</span><span class="ba-price-value">from 600 Gel</span></div>' },
      // Add 2 items to vinyl/color change section (after last existing row)
      { from: '<span class="ba-price-name">Anti-chrome (wrapping chrome elements with black film)</span><span class="ba-price-value">from 300 Gel</span></div>', to: '<span class="ba-price-name">Anti-chrome (wrapping chrome elements with black film)</span><span class="ba-price-value">from 300 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Full car vinyl wrapping</span><span class="ba-price-value">from 6900 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Black polyurethane roof wrapping</span><span class="ba-price-value">from 800 Gel</span></div>' },
      // Inject carwash prices section before soundproofing (sanity-s7)
      { from: '<div id="sanity-s7"', to: '<div id="sanity-carwash" class="r t-rec" style="padding-top:48px;padding-bottom:0;background-color:#000000;" data-record-type="681" data-bg-color="#000000"><div class="t-container"><div class="ba-price-section"><h2 class="ba-price-heading"><a href="/en/carwash" class="ba-price-heading-link">Car Wash Prices</a></h2><div class="ba-price-list"><div class="ba-price-row"><span class="ba-price-name">Hand Detailing Car Wash, 2-Phase (Sedan)</span><span class="ba-price-value">40 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Hand Detailing Car Wash, 2-Phase (SUV)</span><span class="ba-price-value">45 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Hand Detailing Car Wash, 3-Phase (Sedan)</span><span class="ba-price-value">55 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Hand Detailing Car Wash, 3-Phase (SUV)</span><span class="ba-price-value">59 Gel</span></div><div class="ba-price-row"><span class="ba-price-name">Engine wash</span><span class="ba-price-value">80 Gel</span></div></div></div></div></div>\n<div id="sanity-s7"' },
    ],
    seoBlock: '',
  },
};

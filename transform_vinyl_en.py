#!/usr/bin/env python3
"""
Transform the EN vinyl wrapping page HTML into a color PPF wrapping page.
Reads page37329658body.html, applies text replacements & structural changes,
writes back to the same file.
"""

FILE = "/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site/astro/public/files/page37329658body.html"


def main() -> None:
    with open(FILE, "r", encoding="utf-8") as f:
        html = f.read()

    original_len = len(html)

    # =========================================================================
    # 1. HERO (rec603097579) — title, description, button
    # =========================================================================

    # Title
    html = html.replace(
        "Vinyl Car Wrapping in Tbilisi",
        'Color <s style="opacity:0.5">Vinyl</s> Polyurethane Protective Film in Tbilisi',
    )

    # Description
    html = html.replace(
        "We provide services for wrapping cars with vinyl film in Tbilisi. It helps to change the car\u2019s appearance quickly and cost-effectively as well as protect it without painting it.",
        '<span style="font-weight: 500;">10-Year Warranty \u00b7 Quantum, LuxArmor Films \u00b7 2000+ Protected Vehicles</span>',
    )

    # Button text — target specifically the hero button via rec603097579 context
    html = html.replace(
        'href="#contacts"><span class="t-btnflex__text">Book a visit</span> <style>#rec603097579',
        'href="#contacts"><span class="t-btnflex__text">Book a Free Inspection</span> <style>#rec603097579',
    )

    # =========================================================================
    # 2. INSERT COMPARISON TABLE after hero (rec603097579)
    # =========================================================================

    comparison_html = """<div id="rec-color-vs-vinyl" class="r t-rec" style="padding-top:90px;padding-bottom:45px;background-color:#000000;" data-record-type="33" data-bg-color="#000000">
<div class="t017"><div class="t-container t-align_left"><div class="t-col t-col_10 t-prefix_1">
<h2 class="t017__title t-title t-title_xxs" field="title"><div style="font-size:40px;" data-customstyle="yes"><p style="text-align:center;"><span style="color:rgb(228,201,126);">Color Protective Film vs Vinyl Wrap</span></p></div></h2>
</div></div></div>
</div>

<div id="rec-comparison-table" class="r t-rec" style="padding-top:30px;padding-bottom:60px;background-color:#000000;" data-record-type="131" data-bg-color="#000000">
<div class="t123"><div class="t-container"><div class="t-col t-col_8 t-prefix_2">
<table class="ba-compare-table">
<thead>
<tr><th></th><th class="ba-compare-old">Vinyl Wrap</th><th class="ba-compare-new">Color Protective (PPF)</th></tr>
</thead>
<tbody>
<tr><td>Thickness</td><td>75\u2013100 \u00b5m</td><td>175\u2013230 \u00b5m (2\u20133\u00d7 thicker)</td></tr>
<tr><td>Rock chip protection</td><td>Weak</td><td>Strong \u2014 absorbs impacts</td></tr>
<tr><td>Self-healing</td><td>No</td><td>Yes \u2014 from sun or warm water</td></tr>
<tr><td>Service life</td><td>3\u20135 years</td><td>7\u201310 years</td></tr>
<tr><td>Warranty</td><td>1\u20133 years</td><td>Up to 10 years</td></tr>
<tr><td>UV resistance</td><td>Fades & cracks</td><td>No yellowing or clouding</td></tr>
<tr><td>Surface quality</td><td>\u201cOrange peel\u201d texture</td><td>Factory paint finish</td></tr>
<tr><td>Removal</td><td>Leaves adhesive residue</td><td>Removes cleanly</td></tr>
<tr><td>Hydrophobic coating</td><td>No</td><td>Built-in</td></tr>
</tbody>
</table>
<p class="ba-compare-note">Over 10 years, vinyl wrap needs replacing 2\u20133 times. Color protective film is a single investment that protects and transforms.</p>
</div></div></div>
<style>
#rec-comparison-table .ba-compare-table{width:100%;border-collapse:collapse;color:#fff;}
#rec-comparison-table .ba-compare-table th,
#rec-comparison-table .ba-compare-table td{padding:12px 16px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.1);font-size:15px;line-height:1.4;}
#rec-comparison-table .ba-compare-table thead th{font-weight:600;font-size:16px;padding-bottom:16px;}
#rec-comparison-table .ba-compare-old{color:rgba(255,255,255,0.5);}
#rec-comparison-table .ba-compare-new{color:#e4c97e;font-weight:500;}
#rec-comparison-table .ba-compare-table td:first-child{color:rgba(255,255,255,0.7);font-weight:500;}
#rec-comparison-table .ba-compare-note{color:rgba(255,255,255,0.7);font-size:15px;margin-top:24px;text-align:center;line-height:1.5;}
@media screen and (max-width:640px){
#rec-comparison-table .ba-compare-table th,
#rec-comparison-table .ba-compare-table td{padding:8px 10px;font-size:13px;}
#rec-comparison-table .ba-compare-table thead th{font-size:14px;}
}
</style>
</div>
"""

    # Insert before the advantages section (rec603097581)
    marker = '<div id="rec603097581"'
    html = html.replace(marker, comparison_html + marker, 1)

    # =========================================================================
    # 3. ADVANTAGES (rec603097581) — title + 5 items
    # =========================================================================

    # Section title
    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">Benefits of wrapping a car with vinyl film</span>',
        '<span style="color: rgb(228, 201, 126);">Benefits of Color Protective Film</span>',
    )

    # Item 1
    html = html.replace(
        'field="li_title__1476889049104">Damage protection</div>',
        'field="li_title__1476889049104">Protection + Color Change</div>',
    )
    html = html.replace(
        "field=\"li_descr__1476889049104\">Vinyl film is protective to scratches, stones, insects, and other external factors. It serves as a barrier, safeguarding the original paintwork from abrasions and chips.</div>",
        'field="li_descr__1476889049104">Two in one: changes your car\u2019s color while protecting the body from chips, scratches, and gravel. 175\u2013230 \u00b5m thick \u2014 2\u20133 times thicker than vinyl.</div>',
    )

    # Item 2
    html = html.replace(
        'field="li_title__1476889075209">Enhancement of outside appearance</div>',
        'field="li_title__1476889075209">Self-Healing Scratches</div>',
    )
    html = html.replace(
        "field=\"li_descr__1476889075209\">Vinyl film offers a wide range of colors, shades, and textures, allowing car owners to change the outside appearance of their vehicles. This provides the opportunity to create a unique and individual style, setting the car apart from others on the road.</div>",
        'field="li_descr__1476889075209">Minor parking lot scratches disappear on their own \u2014 from sunlight or warm water. On vinyl wrap, they stay forever.</div>',
    )

    # Item 3
    html = html.replace(
        'field="li_title__1476889079427">Preservation of original coating</div>',
        'field="li_title__1476889079427">7\u201310 Years of Service</div>',
    )
    html = html.replace(
        "field=\"li_descr__1476889079427\">The application of vinyl film helps maintain the original paintwork of the car in good condition. It acts as a barrier against external factors such as UV rays, bird droppings, and salt solutions, which can cause fading, oxidation, and degradation of the coating.</div>",
        'field="li_descr__1476889079427">2\u20133 times longer than vinyl wrap. No yellowing, no clouding, no cracking. Warranty up to 10 years.</div>',
    )

    # Item 4
    html = html.replace(
        'field="li_title__1476889085397">Best value for money</div>',
        'field="li_title__1476889085397">Factory Paint Finish</div>',
    )
    html = html.replace(
        "field=\"li_descr__1476889085397\">Compared to repainting a vehicle, vinyl wrapping offers a more affordable solution for changing its appearance and protecting the body. Additionally, the film is durable and easy to maintain, resulting in cutting costs on future maintenance and repair expenses.</div>",
        'field="li_descr__1476889085397">No \u201corange peel\u201d texture like vinyl. Deep gloss, invisible seams. Looks better than the original paint.</div>',
    )

    # Item 5
    html = html.replace(
        'field="li_title__1684923648673">Usability for branding and advertising</div>',
        'field="li_title__1684923648673">Preserves Vehicle Value</div>',
    )
    html = html.replace(
        "field=\"li_descr__1684923648673\">Vinyl film allows for the creation of vibrant and eye-catching designs, logos, and messages that can be applied to the car's body or other surfaces. It is also easy to wrap and offers the flexibility of temporary usage, enabling effortless design changes and advertising updates.</div>",
        'field="li_descr__1684923648673">Factory paint under the film stays perfect. Your car is worth more at resale. Film removes cleanly with no residue.</div>',
    )

    # =========================================================================
    # 4. PRICES — title (rec603097586) + content (rec603097587)
    # =========================================================================

    # Price section title
    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">Prices for vinyl wrapping </span>',
        '<span style="color: rgb(228, 201, 126);">Color Protective Film Pricing</span>',
    )

    # Price row 1: change title and price
    html = html.replace(
        'field="li_title__1493292137724">Partial wrapping, logo coating</div>',
        'field="li_title__1493292137724">Full Color Change with Protective Film</div>',
    )
    html = html.replace(
        'field="li_title2__1493292137724">from 400 <br />Gel</div>',
        'field="li_title2__1493292137724">from 9000 <br />Gel</div>',
    )

    # Price row 2: antichrome — keep as is (already correct)

    # Price row 3: remove entirely
    row3_start = html.find(
        '<div class="t681__row t-row" style="margin-bottom:40px;"> '
        '<div class="t-col t-col_3 t-prefix_2"> '
        '<div class="t681__title t-heading t-heading_sm" field="li_title__1685870296564">'
    )
    if row3_start != -1:
        row3_end_marker = "from 6500 Gel</div> </div> </div> </div> </div>"
        row3_end = html.find(row3_end_marker, row3_start)
        if row3_end != -1:
            row3_end += len(row3_end_marker)
            html = html[:row3_start] + html[row3_end:]

    # =========================================================================
    # 5. FAQ (rec603097589) — replace all 7 accordion items with 9 new ones
    # =========================================================================

    # FAQ 1
    html = html.replace(
        'field="li_title__1684935263985">What is a vinyl film for cars?</span>',
        'field="li_title__1684935263985">How much does a color change with protective film cost?</span>',
    )
    html = html.replace(
        'field="li_descr__1684935263985">Vinyl film is a special material applied to the car\'s body to alter its appearance or for advertising purposes. It is available in various colors, textures, and finishes.</div>',
        'field="li_descr__1684935263985">Full color change \u2014 from 9,000 GEL. Anti-chrome \u2014 from 300 GEL. The exact price depends on your vehicle\u2019s make and model.</div>',
    )

    # FAQ 2
    html = html.replace(
        'field="li_title__1480611048442">How long does vinyl film remain on a car?</span>',
        'field="li_title__1480611048442">What films do you use?</span>',
    )
    html = html.replace(
        'field="li_descr__1480611048442"><p style="text-align: left;">The durability of a vinyl film depends on its quality, usage conditions, and proper maintenance. Typically, it serves from 3 up to 7 years, but there are more long-lasting options available.</p></div>',
        'field="li_descr__1480611048442">Quantum and LuxArmor \u2014 certified polyurethane films with self-healing technology. We\u2019ll help you choose the best option for your budget.</div>',
    )

    # FAQ 3
    html = html.replace(
        'field="li_title__1684923311907"><p style="text-align: left;">Can a vinyl film be removed from a car?</p></span>',
        'field="li_title__1684923311907">Is there a warranty?</span>',
    )
    html = html.replace(
        "field=\"li_descr__1684923311907\">Yes, vinyl film can be removed from the car's body. When removed correctly, it should not leave any adhesive residue or damage to the original paint. However, it is recommended to entrust the removal to professionals.</div>",
        'field="li_descr__1684923311907">Yes. Warranty on film and workmanship \u2014 up to 10 years. We cover peeling, yellowing, and material defects.</div>',
    )

    # FAQ 4
    html = html.replace(
        'field="li_title__1480611044356">What is the cost of coating a car with vinyl film?</span>',
        'field="li_title__1480611044356">How long does the color protective film last?</span>',
    )
    html = html.replace(
        "field=\"li_descr__1480611044356\">The cost of wrapping a vehicle with vinyl film depends on several factors, such as the auto's size, the design's complexity, the chosen film, and the labor required for installation. Please get in touch with us to get a job evaluation.</div>",
        'field="li_descr__1480611044356">7\u201310 years under normal conditions. The film doesn\u2019t yellow, cloud, or lose its shine. That\u2019s 2\u20133 times longer than vinyl wrap.</div>',
    )

    # FAQ 5
    html = html.replace(
        'field="li_title__1684957372053"><p style="text-align: left;">Can a vinyl film be applied to surfaces with irregularities or protrusions?</p></span>',
        'field="li_title__1684957372053">How long does the installation take?</span>',
    )
    html = html.replace(
        "field=\"li_descr__1684957372053\">Vinyl film can be applied to surfaces with some irregularities or protrusions, but smoother and flatter surfaces yield better results. In the case of complex surfaces or protrusions, more meticulous installation may be required.</div>",
        'field="li_descr__1684957372053">Full color change \u2014 3\u20135 business days. Anti-chrome \u2014 1\u20132 days. The exact timeline depends on the body complexity.</div>',
    )

    # FAQ 6
    html = html.replace(
        'field="li_title__1685511552186">Can logos or lettering be applied to vinyl film?</span>',
        'field="li_title__1685511552186">Can the film be removed later?</span>',
    )
    html = html.replace(
        "field=\"li_descr__1685511552186\">Yes, logos, lettering, and other graphical elements can be applied to vinyl film. The possibilities for branding and advertising on vinyl film are extensive, and professional installers can assist with creating and applying the desired design.</div>",
        'field="li_descr__1685511552186">Yes, without damaging the paint. Unlike vinyl, polyurethane film comes off in large sheets with no adhesive residue.</div>',
    )

    # FAQ 7
    html = html.replace(
        'field="li_title__1685208483786"><p style="text-align: left;">Is it possible to install vinyl film alone, or is professional help required?</p></span>',
        'field="li_title__1685208483786">How is color PPF better than vinyl wrap?</span>',
    )
    html = html.replace(
        "field=\"li_descr__1685208483786\">Installing vinyl film requires a certain level of experience and skills. It is recommended to rely on professionals with certain experience in vinyl film installation and necessary equipment for precise and meticulous work for best results and to avoid mistakes.</div>",
        'field="li_descr__1685208483786">2\u20133 times thicker \u2014 real protection against rock chips. Self-healing scratches. Lasts 7\u201310 years instead of 3\u20135. No yellowing or cracking. Removes cleanly. Looks like factory paint, not a \u201cwrap\u201d.</div>',
    )

    # Add 2 more FAQ items (8 and 9) — insert before the t585__border div
    faq8_html = """ <div class="t-col t-col_8 t-prefix_2"> <div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> <div class="t585__wrapper"> <div class="t585__header " style="border-top: 1px solid #eee;"> <button type="button"
class="t585__trigger-button"
aria-controls="accordion8_603097589"
aria-expanded="false"> <span class="t585__title t-name t-name_xl" field="li_title__faq8">What is self-healing?</span> <span class="t585__icon"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#000000"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #e4c97e"></span> </span> <span class="t585__icon t585__icon-hover"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#222222"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #eee;"></span> </span> </button> </div> <div class="t585__content"
id="accordion8_603097589"
hidden > <div class="t585__textwrapper"> <div class="t585__text t-descr t-descr_xs" field="li_descr__faq8">The top layer of polyurethane film can \u201crepair\u201d minor scratches when exposed to heat \u2014 from sunlight, warm water, or a heat gun.</div> </div> </div> </div> </div> </div>"""

    faq9_html = """ <div class="t-col t-col_8 t-prefix_2"> <div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> <div class="t585__wrapper"> <div class="t585__header " style="border-top: 1px solid #eee;"> <button type="button"
class="t585__trigger-button"
aria-controls="accordion9_603097589"
aria-expanded="false"> <span class="t585__title t-name t-name_xl" field="li_title__faq9">Will the film damage the paint?</span> <span class="t585__icon"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#000000"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #e4c97e"></span> </span> <span class="t585__icon t585__icon-hover"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#222222"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #eee;"></span> </span> </button> </div> <div class="t585__content"
id="accordion9_603097589"
hidden > <div class="t585__textwrapper"> <div class="t585__text t-descr t-descr_xs" field="li_descr__faq9">No. Quality polyurethane film removes cleanly and protects the clear coat from chips and scratches. Factory paint under the film stays in the same condition as the day it was applied.</div> </div> </div> </div> </div> </div>"""

    # Insert before the t585__border div in rec603097589
    border_marker = '<div class="t585__border" style="height: 1px; background-color: #eee;"></div> </div> </div> </div> <script>t_onReady(function() {t_onFuncLoad(\'t585_init\',function() {t585_init(\'603097589\');})'
    border_pos = html.find(border_marker)
    if border_pos != -1:
        html = html[:border_pos] + faq8_html + faq9_html + " " + html[border_pos:]

    # =========================================================================
    # 6. Update JSON-LD FAQ schema
    # =========================================================================

    old_schema = """{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What is a vinyl film for cars?","acceptedAnswer":{"@type":"Answer","text":"Vinyl film is a special material applied to the car's body to alter its appearance or for advertising purposes. It is available in various colors, textures, and finishes."}},
{"@type":"Question","name":"How long does vinyl film remain on a car?","acceptedAnswer":{"@type":"Answer","text":"The durability of a vinyl film depends on its quality, usage conditions, and proper maintenance. Typically, it serves from 3 up to 7 years, but there are more long-lasting options available."}},
{"@type":"Question","name":"Can a vinyl film be removed from a car?","acceptedAnswer":{"@type":"Answer","text":"Yes, vinyl film can be removed from the car's body. When removed correctly, it should not leave any adhesive residue or damage to the original paint. However, it is recommended to entrust the removal to professionals."}},
{"@type":"Question","name":"What is the cost of coating a car with vinyl film?","acceptedAnswer":{"@type":"Answer","text":"The cost of wrapping a vehicle with vinyl film depends on several factors, such as the auto's size, the design's complexity, the chosen film, and the labor required for installation. Please get in touch with us to get a job evaluation."}},
{"@type":"Question","name":"Can a vinyl film be applied to surfaces with irregularities or protrusions?","acceptedAnswer":{"@type":"Answer","text":"Vinyl film can be applied to surfaces with some irregularities or protrusions, but smoother and flatter surfaces yield better results. In the case of complex surfaces or protrusions, more meticulous installation may be required."}},
{"@type":"Question","name":"Can logos or lettering be applied to vinyl film?","acceptedAnswer":{"@type":"Answer","text":"Yes, logos, lettering, and other graphical elements can be applied to vinyl film. The possibilities for branding and advertising on vinyl film are extensive, and professional installers can assist with creating and applying the desired design."}},
{"@type":"Question","name":"Is it possible to install vinyl film alone, or is professional help required?","acceptedAnswer":{"@type":"Answer","text":"Installing vinyl film requires a certain level of experience and skills. It is recommended to rely on professionals with certain experience in vinyl film installation and necessary equipment for precise and meticulous work for best results and to avoid mistakes."}}
]}"""

    new_schema = """{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How much does a color change with protective film cost?","acceptedAnswer":{"@type":"Answer","text":"Full color change — from 9,000 GEL. Anti-chrome — from 300 GEL. The exact price depends on your vehicle's make and model."}},
{"@type":"Question","name":"What films do you use?","acceptedAnswer":{"@type":"Answer","text":"Quantum and LuxArmor — certified polyurethane films with self-healing technology. We'll help you choose the best option for your budget."}},
{"@type":"Question","name":"Is there a warranty?","acceptedAnswer":{"@type":"Answer","text":"Yes. Warranty on film and workmanship — up to 10 years. We cover peeling, yellowing, and material defects."}},
{"@type":"Question","name":"How long does the color protective film last?","acceptedAnswer":{"@type":"Answer","text":"7–10 years under normal conditions. The film doesn't yellow, cloud, or lose its shine. That's 2–3 times longer than vinyl wrap."}},
{"@type":"Question","name":"How long does the installation take?","acceptedAnswer":{"@type":"Answer","text":"Full color change — 3–5 business days. Anti-chrome — 1–2 days. The exact timeline depends on the body complexity."}},
{"@type":"Question","name":"Can the film be removed later?","acceptedAnswer":{"@type":"Answer","text":"Yes, without damaging the paint. Unlike vinyl, polyurethane film comes off in large sheets with no adhesive residue."}},
{"@type":"Question","name":"How is color PPF better than vinyl wrap?","acceptedAnswer":{"@type":"Answer","text":"2–3 times thicker — real protection against rock chips. Self-healing scratches. Lasts 7–10 years instead of 3–5. No yellowing or cracking. Removes cleanly. Looks like factory paint, not a 'wrap'."}},
{"@type":"Question","name":"What is self-healing?","acceptedAnswer":{"@type":"Answer","text":"The top layer of polyurethane film can 'repair' minor scratches when exposed to heat — from sunlight, warm water, or a heat gun."}},
{"@type":"Question","name":"Will the film damage the paint?","acceptedAnswer":{"@type":"Answer","text":"No. Quality polyurethane film removes cleanly and protects the clear coat from chips and scratches. Factory paint under the film stays in the same condition as the day it was applied."}}
]}"""

    html = html.replace(old_schema, new_schema)

    # =========================================================================
    # 7. "Related services" title — update
    # =========================================================================

    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">Services ordered along with vinyl coating</span>',
        '<span style="color: rgb(228, 201, 126);">Services ordered along with vinyl coating</span>',
    )

    # =========================================================================
    # DONE — write back
    # =========================================================================

    with open(FILE, "w", encoding="utf-8") as f:
        f.write(html)

    new_len = len(html)
    print(f"Done. Original: {original_len} chars, New: {new_len} chars, Delta: {new_len - original_len:+d}")


if __name__ == "__main__":
    main()

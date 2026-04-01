#!/usr/bin/env python3
"""
Transform the KA (Georgian) vinyl wrapping page HTML into a color PPF wrapping page.
Reads page37334532body.html, applies text replacements & structural changes,
writes back to the same file.
"""

import sys

FILE = "/Users/fedorzubrickij/bestauto-site/astro/public/files/page37334532body.html"


def main():
    with open(FILE, "r", encoding="utf-8") as f:
        html = f.read()

    original_len = len(html)

    # =========================================================================
    # 1. HERO (rec603170631) — title, description, button
    # =========================================================================

    # Title
    html = html.replace(
        'ვინილით შეფუთვა თბილისში',
        'ფერადი <s style="opacity:0.5">ვინილის</s> პოლიურეთანის დამცავი ფირი თბილისში',
    )

    # Description
    html = html.replace(
        '<p style="text-align: center;">თბილისში ვახორციელებთ მანქანის შეფუთვის მომსახურებას ვინილის ფირით, რაც საშუალებას გაძლევთ სწრაფად და იაფად შეცვალოთ მანქანის იერსახე, შეღებვის გარეშე და დაიცვათ იგი.</p>',
        '<span style="font-weight: 500;">10 წლიანი გარანტია \u00b7 Quantum, LuxArmor ფირები \u00b7 2000-ზე მეტი დაფარული ავტომობილი</span>',
    )

    # Button text — target the hero button specifically via rec603170631 context
    html = html.replace(
        'href="#contacts"><span class="t-btnflex__text">ონლაინ დაჯავშნა</span> <style>#rec603170631',
        'href="#contacts"><span class="t-btnflex__text">დაჯავშნეთ უფასო შემოწმება</span> <style>#rec603170631',
    )

    # =========================================================================
    # 2. INSERT COMPARISON TABLE after hero (rec603170631)
    # =========================================================================

    comparison_html = """<div id="rec-color-vs-vinyl" class="r t-rec" style="padding-top:90px;padding-bottom:45px;background-color:#000000;" data-record-type="33" data-bg-color="#000000">
<div class="t017"><div class="t-container t-align_left"><div class="t-col t-col_10 t-prefix_1">
<h2 class="t017__title t-title t-title_xxs" field="title"><div style="font-size:40px;" data-customstyle="yes"><p style="text-align:center;"><span style="color:rgb(228,201,126);">\u10e4\u10d4\u10e0\u10d0\u10d3\u10d8 \u10d3\u10d0\u10db\u10ea\u10d0\u10d5\u10d8 \u10e4\u10d8\u10e0\u10d8 vs \u10d5\u10d8\u10dc\u10d8\u10da\u10d8\u10e1 \u10e4\u10d8\u10e0\u10d8</span></p></div></h2>
</div></div></div>
</div>

<div id="rec-comparison-table" class="r t-rec" style="padding-top:30px;padding-bottom:60px;background-color:#000000;" data-record-type="131" data-bg-color="#000000">
<div class="t123"><div class="t-container"><div class="t-col t-col_8 t-prefix_2">
<table class="ba-compare-table">
<thead>
<tr><th></th><th class="ba-compare-old">\u10d5\u10d8\u10dc\u10d8\u10da\u10d8\u10e1 \u10e4\u10d8\u10e0\u10d8</th><th class="ba-compare-new">\u10e4\u10d4\u10e0\u10d0\u10d3\u10d8 \u10d3\u10d0\u10db\u10ea\u10d0\u10d5\u10d8 (PPF)</th></tr>
</thead>
<tbody>
<tr><td>\u10e1\u10d8\u10e1\u10e5\u10d4</td><td>75\u2013100 \u10db\u10d9\u10db</td><td>175\u2013230 \u10db\u10d9\u10db (2\u20133\u00d7 \u10e1\u10e5\u10d4\u10da\u10d8)</td></tr>
<tr><td>\u10e9\u10d8\u10de\u10d4\u10d1\u10d8\u10e1\u10d2\u10d0\u10dc \u10d3\u10d0\u10ea\u10d5\u10d0</td><td>\u10e1\u10e3\u10e1\u10e2\u10d8</td><td>\u10eb\u10da\u10d8\u10d4\u10e0\u10d8 \u2014 \u10e8\u10d7\u10d0\u10dc\u10d7\u10e5\u10d0\u10d5\u10e1 \u10d3\u10d0\u10e0\u10e2\u10e7\u10db\u10d4\u10d1\u10e1</td></tr>
<tr><td>\u10d7\u10d5\u10d8\u10d7\u10d0\u10e6\u10d3\u10d2\u10d4\u10dc\u10d0</td><td>\u10d0\u10e0\u10d0</td><td>\u10d3\u10d8\u10d0\u10ee \u2014 \u10db\u10d6\u10d8\u10e1\u10d2\u10d0\u10dc \u10d0\u10dc \u10ec\u10e7\u10da\u10d8\u10e1\u10d2\u10d0\u10dc</td></tr>
<tr><td>\u10db\u10dd\u10db\u10e1\u10d0\u10ee\u10e3\u10e0\u10d4\u10d1\u10d8\u10e1 \u10d5\u10d0\u10d3\u10d0</td><td>3\u20135 \u10ec\u10d4\u10da\u10d8</td><td>7\u201310 \u10ec\u10d4\u10da\u10d8</td></tr>
<tr><td>\u10d2\u10d0\u10e0\u10d0\u10dc\u10e2\u10d8\u10d0</td><td>1\u20133 \u10ec\u10d4\u10da\u10d8</td><td>10 \u10ec\u10da\u10d0\u10db\u10d3\u10d4</td></tr>
<tr><td>UV-\u10db\u10d3\u10d2\u10e0\u10d0\u10d3\u10dd\u10d1\u10d0</td><td>\u10e4\u10d4\u10e0\u10d8 \u10d4\u10ea\u10d5\u10da\u10d4\u10d1\u10d0</td><td>\u10d0\u10e0 \u10e7\u10d5\u10d8\u10d7\u10da\u10d3\u10d4\u10d1\u10d0, \u10d0\u10e0 \u10d1\u10e3\u10dc\u10d3\u10d3\u10d4\u10d1\u10d0</td></tr>
<tr><td>\u10d6\u10d4\u10d3\u10d0\u10de\u10d8\u10e0\u10d8</td><td>\u00ab\u10e4\u10dd\u10e0\u10d7\u10dd\u10ee\u10da\u10d8\u10e1 \u10d9\u10d0\u10dc\u10d8\u00bb</td><td>\u10e0\u10dd\u10d2\u10dd\u10e0\u10ea \u10e5\u10d0\u10e0\u10ee\u10dc\u10e3\u10da\u10d8 \u10e1\u10d0\u10e6\u10d4\u10d1\u10d0\u10d5\u10d8</td></tr>
<tr><td>\u10db\u10dd\u10ee\u10e1\u10dc\u10d0</td><td>\u10e2\u10dd\u10d5\u10d4\u10d1\u10e1 \u10ec\u10d4\u10d1\u10dd\u10e1</td><td>\u10d8\u10ee\u10e1\u10dc\u10d4\u10d1\u10d0 \u10e1\u10e3\u10e4\u10d7\u10d0\u10d3</td></tr>
<tr><td>\u10f0\u10d8\u10d3\u10e0\u10dd\u10e4\u10dd\u10d1\u10d8\u10e3\u10e0\u10dd\u10d1\u10d0</td><td>\u10d0\u10e0\u10d0</td><td>\u10e9\u10d0\u10e8\u10d4\u10dc\u10d4\u10d1\u10e3\u10da\u10d8</td></tr>
</tbody>
</table>
<p class="ba-compare-note">10 \u10ec\u10da\u10d8\u10e1 \u10d2\u10d0\u10dc\u10db\u10d0\u10d5\u10da\u10dd\u10d1\u10d0\u10e8\u10d8 \u10d5\u10d8\u10dc\u10d8\u10da\u10d8\u10e1 \u10e4\u10d8\u10e0\u10d8 2\u20133-\u10ef\u10d4\u10e0 \u10e3\u10dc\u10d3\u10d0 \u10e8\u10d4\u10d8\u10ea\u10d5\u10d0\u10da\u10dd\u10e1. \u10e4\u10d4\u10e0\u10d0\u10d3\u10d8 \u10d3\u10d0\u10db\u10ea\u10d0\u10d5\u10d8 \u10e4\u10d8\u10e0\u10d8 \u2014 \u10d4\u10e0\u10d7\u10d8 \u10d8\u10dc\u10d5\u10d4\u10e1\u10e2\u10d8\u10ea\u10d8\u10d0, \u10e0\u10dd\u10db\u10d4\u10da\u10d8\u10ea \u10d8\u10ea\u10d0\u10d5\u10e1 \u10d3\u10d0 \u10d0\u10da\u10d0\u10db\u10d0\u10d6\u10d4\u10d1\u10e1.</p>
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

    # Insert after the hero — find the start of rec603170633 (advantages section)
    marker = '<div id="rec603170633"'
    html = html.replace(marker, comparison_html + marker, 1)

    # =========================================================================
    # 3. ADVANTAGES (rec603170633) — title + 5 items
    # =========================================================================

    # Section title
    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">ვინილის ფირით შეფუთვის უპირატესობები</span>',
        '<span style="color: rgb(228, 201, 126);">ფერადი დამცავი ფირის უპირატესობები</span>',
    )

    # Item 1
    html = html.replace(
        'field="li_title__1476889049104"><p style="text-align: left;">დაზიანებისგან დაცვა</p></h3>',
        'field="li_title__1476889049104">დაცვა + ფერის შეცვლა</h3>',
    )
    html = html.replace(
        'field="li_descr__1476889049104">ვინილის ფირს აქვს დამცავი თვისებები, რაც ხელს უწყობს მანქანის კორპუსის დაცვას ნაკაწრებისგან, ქვებისგან, მწერებისგან და სხვა გარე ფაქტორებისგან. ის ემსახურება როგორც ბარიერს, რომელიც იცავს ორიგინალურ საღებავს ნაკაწრებისა და ნამსხვრევებისგან.<br /><br /></div>',
        'field="li_descr__1476889049104">ორი ერთში: ცვლის ავტომობილის ფერს და ერთდროულად იცავს ძარას ჩიპებისგან, ნაკაწრებისგან და ხრეშისგან. სისქე 175\u2013230 მკმ \u2014 2\u20133-ჯერ სქელი ვინილზე.</div>',
    )

    # Item 2
    html = html.replace(
        'field="li_title__1476889075209"><p style="text-align: left;">გარეგნობის ცვლილება</p></h3>',
        'field="li_title__1476889075209">ნაკაწრების თვითაღდგენა</h3>',
    )
    html = html.replace(
        'field="li_descr__1476889075209">ვინილის შეფუთვა გთავაზობთ ფერების, ფერებში და ტექსტურების ფართო არჩევანს, რაც საშუალებას აძლევს ავტომობილების მფლობელებს შეცვალონ თავიანთი მანქანის იერსახე. ეს შესაძლებელს ხდის შექმნას უნიკალური და ინდივიდუალური სტილი, რომელიც განასხვავებს მანქანას სხვათაგან გზაზე.</div>',
        'field="li_descr__1476889075209">წვრილი ნაკაწრები პარკინგზე თავისთავად ქრება \u2014 მზის სითბოსგან ან თბილი წყლისგან. ვინილის ფირზე ისინი სამუდამოდ რჩება.</div>',
    )

    # Item 3
    html = html.replace(
        'field="li_title__1476889079427"><p style="text-align: left;"><strong>ორიგინალი საფარის შენარჩუნების გაუმჯობესება</strong></p></h3>',
        'field="li_title__1476889079427">7\u201310 წელი მომსახურება</h3>',
    )
    html = html.replace(
        'field="li_descr__1476889079427">ვინილის ფირის გამოყენება საშუალებას გაძლევთ შეინახოთ მანქანის ორიგინალური საღებავი კარგ მდგომარეობაში. ის მოქმედებს, როგორც ბარიერი გარემო ფაქტორების წინააღმდეგ, როგორიცაა ულტრაიისფერი გამოსხივება, ფრინველის ფეკალიების და მარილიანი ხსნარები, რამაც შეიძლება გამოიწვიოს გაფერმკრთალება, დაჟანგვა და საღებავის დეგრადაცია.</div>',
        'field="li_descr__1476889079427">2\u20133-ჯერ მეტი ვინილის ფირზე. არ ყვითლდება, არ ბუნდდება, არ სკდება. გარანტია 10 წლამდე.</div>',
    )

    # Item 4
    html = html.replace(
        'field="li_title__1476889085397"><p style="text-align: left;"><strong>ოპტიმალური შერწყმა ხარისხის ფასთან</strong></p></h3>',
        'field="li_title__1476889085397">როგორც ქარხნული საღებავი</h3>',
    )
    html = html.replace(
        'field="li_descr__1476889085397">მანქანის შეღებვასთან შედარებით, ვინილის შეფუთვამ შეიძლება შესთავაზოს უფრო ხელმისაწვდომი ვარიაცია გარეგნობის შესაცვლელად . გარდა ამისა, ფირი ასევე გამძლეა და ადვილად შესანახია, რაც დაზოგავს სამომავლოდ მოვლისა და შეკეთების ხარჯებს.</div>',
        'field="li_descr__1476889085397">არ აქვს \u00abფორთოხლის კანის\u00bb ეფექტი, როგორც ვინილს. ღრმა ბრწყინვალება, უხილავი ნაკერები.</div>',
    )

    # Item 5
    html = html.replace(
        'field="li_title__1684923648673"><p style="text-align: left;"><strong>შეიძლება გამოყენებულ იქნას ბრენდინგისა და რეკლამისთვის</strong></p></h3>',
        'field="li_title__1684923648673">ავტომობილის ღირებულების შენარჩუნება</h3>',
    )
    html = html.replace(
        'field="li_descr__1684923648673">ვინილის ფირი საშუალებას გაძლევთ შექმნათ ნათელი და მიმზიდველი დიზაინი, ლოგოები და შეტყობინებები, რომლებიც შეიძლება გამოყენებულ იქნას მანქანის ძარაზე ან სხვა ზედაპირებზე. მას ასევე აქვს ინსტალაციის სიმარტივე და დროებითი გამოყენება, რაც აადვილებს რეკლამების ხელახალი დიზაინის და განახლებას.</div>',
        'field="li_descr__1684923648673">ქარხნული საღებავი ფირის ქვეშ იდეალურ მდგომარეობაშია. გაყიდვისას ავტომობილი მეტი ღირს. ფირი იხსნება სუფთად, კვალის გარეშე.</div>',
    )

    # =========================================================================
    # 4. PRICES — title (rec603170638) + content (rec618606759)
    # =========================================================================

    # Price section title
    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">ვინილის შეფუთვის ფასები</span>',
        '<span style="color: rgb(228, 201, 126);">ფერადი დამცავი ფირით ფერის შეცვლის ფასები</span>',
    )

    # Price row 1: change title and price
    html = html.replace(
        'field="li_title__1493292137724">ნაწილობრივი შეფუთვა, ლოგოტიპის დაკვრა</div>',
        'field="li_title__1493292137724">სრული ფერის შეცვლა დამცავი ფირით</div>',
    )
    html = html.replace(
        'field="li_title2__1493292137724">400 &gt; ₾</div>',
        'field="li_title2__1493292137724">9000 &gt; ₾</div>',
    )

    # Price row 2: antichrome — leave unchanged

    # Price row 3: remove entirely
    row3_start = html.find('field="li_title__1685870296564">მანქანის სრული შეფუთვა</div>')
    if row3_start != -1:
        # Go back to the start of this row div
        row3_div_start = html.rfind('<div class="t681__row t-row"', 0, row3_start)
        if row3_div_start != -1:
            # Find the end — look for the price closing and the row's closing divs
            row3_end_marker = '3500 &gt; ₾</div> </div> </div> </div> </div>'
            row3_end = html.find(row3_end_marker, row3_start)
            if row3_end != -1:
                row3_end += len(row3_end_marker)
                html = html[:row3_div_start] + html[row3_end:]

    # =========================================================================
    # 5. FAQ (rec603170641) — replace all 6 accordion items with 9 new ones
    # =========================================================================

    # FAQ 1: field li_title__1684935263985
    html = html.replace(
        'field="li_title__1684935263985">რას ნიშნავს მანქანის შეფუთვა ვინილით ?</span>',
        'field="li_title__1684935263985">რა ღირს ფერის შეცვლა დამცავი ფირით?</span>',
    )
    html = html.replace(
        'field="li_descr__1684935263985">ვინილის ფირი არის სპეციალური მასალა, რომელიც გამოიყენება მანქანის ძარაზე მისი გარეგნობის შესაცვლელად ან სარეკლამო მიზნებისთვის. ის ხელმისაწვდომია სხვადასხვა ფერებში, ტექსტურებში და დასრულებებში.</div>',
        'field="li_descr__1684935263985">სრული ფერის შეცვლა \u2014 9000 GEL-დან. ანტიქრომი \u2014 300 GEL-დან. ზუსტი ფასი დამოკიდებულია ავტომობილის მარკასა და მოდელზე.</div>',
    )

    # FAQ 2: field li_title__1480611048442
    html = html.replace(
        'field="li_title__1480611048442">რამდენ ხანს გაძლებს ვინილის ფირი მანქანაზე?</span>',
        'field="li_title__1480611048442">რა ფირებს იყენებთ?</span>',
    )
    html = html.replace(
        'field="li_descr__1480611048442"><p style="text-align: left;">ვინილის ფირის ხანგრძლივობა დამოკიდებულია მის ხარისხზე, სამუშაო პირობებზე და სათანადო მოვლაზე. ჩვეულებრივ 3-დან 7 წლამდე გრძელდება, მაგრამ არის უფრო გამძლე ვარიანტებიც.</p></div>',
        'field="li_descr__1480611048442">Quantum და LuxArmor \u2014 სერტიფიცირებული პოლიურეთანის ფირები თვითაღდგენის ეფექტით. შევარჩევთ ოპტიმალურ ვარიანტს თქვენი ბიუჯეტის მიხედვით.</div>',
    )

    # FAQ 3: field li_title__1480611044356
    html = html.replace(
        'field="li_title__1480611044356">შესაძლებელია თუ არა ვინილის საფარის მოხსნა?</span>',
        'field="li_title__1480611044356">არის თუ არა გარანტია?</span>',
    )
    html = html.replace(
        'field="li_descr__1480611044356">დიახ, ვინილის ფირის მოხსნა შესაძლებელია მანქანის კორპუსიდან. სწორად მოხსნის შემთხვევაში, არ უნდა დარჩეს წებოვანი ნარჩენები და არ დაზიანდეს ორიგინალური საღებავი. თუმცა, უმჯობესია ფირის მოცილება პროფესიონალებს მიანდოთ.</div>',
        'field="li_descr__1480611044356">დიახ. გარანტია ფირზე და სამუშაოზე \u2014 10 წლამდე. ვფარავთ აქერცვლას, გაყვითლებას და მასალის დეფექტებს.</div>',
    )

    # FAQ 4: field li_title__1684957372053
    html = html.replace(
        'field="li_title__1684957372053"><p style="text-align: left;">რა ღირს მანქანაზე ვინილის ფირის დაყენება?</p></span>',
        'field="li_title__1684957372053">რამდენ ხანს ძლებს ფერადი დამცავი ფირი?</span>',
    )
    html = html.replace(
        'field="li_descr__1684957372053">ვინილის ფირის დაყენების ღირებულება დამოკიდებულია რამდენიმე ფაქტორზე, როგორიცაა ავტომობილის ზომა, დიზაინის სირთულე, არჩეული ფირი და სამონტაჟო სამუშაო. გთხოვთ დაგვიკავშირდეთ კონკრეტული შეთავაზებისთვის.</div>',
        'field="li_descr__1684957372053">7\u201310 წელი ნორმალური ექსპლუატაციისას. ფირი არ ყვითლდება, არ ბუნდდება და ინარჩუნებს ბრწყინვალებას. ეს 2\u20133-ჯერ მეტია ვინილის ფირზე.</div>',
    )

    # FAQ 5: field li_title__1685511552186
    html = html.replace(
        'field="li_title__1685511552186"><p style="text-align: left;">შესაძლებელია თუ არა ვინილის ფირზე ლოგოს ან წარწერის გაკეთება?</p></span>',
        'field="li_title__1685511552186">რამდენ ხანს გრძელდება დაფარვა?</span>',
    )
    html = html.replace(
        'field="li_descr__1685511552186">დიახ, ლოგოები, წარწერები და სხვა გრაფიკული ელემენტები შეიძლება გამოყენებულ იქნას ვინილის ფირზე. ვინილის ფირზე ლოგოს და რეკლამირების შესაძლებლობები ძალიან ფართოა და პროფესიონალი ინსტალატორები დაგეხმარებათ სასურველი დიზაინის შექმნასა და გამოყენებაში.</div>',
        'field="li_descr__1685511552186">სრული ფერის შეცვლა \u2014 3\u20135 სამუშაო დღე. ანტიქრომი \u2014 1\u20132 დღე. ზუსტი ვადა დამოკიდებულია ძარას სირთულეზე.</div>',
    )

    # FAQ 6: field li_title__1685208483786
    html = html.replace(
        'field="li_title__1685208483786"><p style="text-align: left;">შეგიძლიათ ვინილის ფირი თავად გადააკრათ თუ გჭირდებათ პროფესიონალი?</p></span>',
        'field="li_title__1685208483786">შესაძლებელია ფირის მოხსნა?</span>',
    )
    html = html.replace(
        'field="li_descr__1685208483786">ვინილის ფირის დაყენება მოითხოვს გარკვეულ გამოცდილებას და უნარებს. საუკეთესო შედეგებისა და შეცდომების პრევენციისთვის, რეკომენდირებულია გამოიძახოთ პროფესიონალები, რომლებიც გამოცდილი არიან ვინილის დამონტაჟებაში და აქვთ შესაბამისი აღჭურვილობა რათა ზუსტად იმუშაონ.</div>',
        'field="li_descr__1685208483786">დიახ, საღებავის დაზიანების გარეშე. ვინილისგან განსხვავებით, პოლიურეთანის ფირი იხსნება დიდი ნაჭრებით, წებოვანი კვალის გარეშე.</div>',
    )

    # Add 3 more FAQ items (7, 8, 9) — insert before the t585__border div
    faq7_html = """ <div class="t-col t-col_8 t-prefix_2"> <div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> <div class="t585__wrapper"> <div class="t585__header " style="border-top: 1px solid #eee;"> <button type="button"
class="t585__trigger-button"
aria-controls="accordion7_603170641"
aria-expanded="false"> <span class="t585__title t-name t-name_xl" field="li_title__faq7">\u10e0\u10d8\u10d7 \u10d0\u10e0\u10d8\u10e1 \u10e4\u10d4\u10e0\u10d0\u10d3\u10d8 PPF \u10e3\u10d9\u10d4\u10d7\u10d4\u10e1\u10d8 \u10d5\u10d8\u10dc\u10d8\u10da\u10d8\u10e1 \u10e4\u10d8\u10e0\u10d6\u10d4?</span> <span class="t585__icon"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#000000"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #e4c97e"></span> </span> <span class="t585__icon t585__icon-hover"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#222222"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #eee;"></span> </span> </button> </div> <div class="t585__content"
id="accordion7_603170641"
hidden > <div class="t585__textwrapper"> <div class="t585__text t-descr t-descr_xs" field="li_descr__faq7">2\u20133-\u10ef\u10d4\u10e0 \u10e1\u10e5\u10d4\u10da\u10d8 \u2014 \u10e0\u10d4\u10d0\u10da\u10e3\u10e0\u10d8 \u10d3\u10d0\u10ea\u10d5\u10d0 \u10e9\u10d8\u10de\u10d4\u10d1\u10d8\u10e1\u10d2\u10d0\u10dc. \u10dc\u10d0\u10d9\u10d0\u10ec\u10e0\u10d4\u10d1\u10d8\u10e1 \u10d7\u10d5\u10d8\u10d7\u10d0\u10e6\u10d3\u10d2\u10d4\u10dc\u10d0. \u10eb\u10da\u10d4\u10d1\u10e1 7\u201310 \u10ec\u10d4\u10da\u10d8 3\u20135-\u10d8\u10e1 \u10dc\u10d0\u10ea\u10d5\u10da\u10d0\u10d3. \u10d0\u10e0 \u10e7\u10d5\u10d8\u10d7\u10da\u10d3\u10d4\u10d1\u10d0, \u10d0\u10e0 \u10e1\u10d9\u10d3\u10d4\u10d1\u10d0. \u10d8\u10ee\u10e1\u10dc\u10d4\u10d1\u10d0 \u10e1\u10e3\u10e4\u10d7\u10d0\u10d3. \u10d2\u10d0\u10db\u10dd\u10d8\u10e7\u10e3\u10e0\u10d4\u10d1\u10d0 \u10e0\u10dd\u10d2\u10dd\u10e0\u10ea \u10e5\u10d0\u10e0\u10ee\u10dc\u10e3\u10da\u10d8 \u10e1\u10d0\u10e6\u10d4\u10d1\u10d0\u10d5\u10d8.</div> </div> </div> </div> </div> </div>"""

    faq8_html = """ <div class="t-col t-col_8 t-prefix_2"> <div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> <div class="t585__wrapper"> <div class="t585__header " style="border-top: 1px solid #eee;"> <button type="button"
class="t585__trigger-button"
aria-controls="accordion8_603170641"
aria-expanded="false"> <span class="t585__title t-name t-name_xl" field="li_title__faq8">\u10e0\u10d0 \u10d0\u10e0\u10d8\u10e1 \u10d7\u10d5\u10d8\u10d7\u10d0\u10e6\u10d3\u10d2\u10d4\u10dc\u10d0?</span> <span class="t585__icon"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#000000"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #e4c97e"></span> </span> <span class="t585__icon t585__icon-hover"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#222222"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #eee;"></span> </span> </button> </div> <div class="t585__content"
id="accordion8_603170641"
hidden > <div class="t585__textwrapper"> <div class="t585__text t-descr t-descr_xs" field="li_descr__faq8">\u10de\u10dd\u10da\u10d8\u10e3\u10e0\u10d4\u10d7\u10d0\u10dc\u10d8\u10e1 \u10e4\u10d8\u10e0\u10d8\u10e1 \u10d6\u10d4\u10d3\u10d0 \u10e4\u10d4\u10dc\u10d0\u10e1 \u10e8\u10d4\u10e3\u10eb\u10da\u10d8\u10d0 \u10ec\u10d5\u10e0\u10d8\u10da\u10d8 \u10dc\u10d0\u10d9\u10d0\u10ec\u10e0\u10d4\u10d1\u10d8\u10e1 \u00ab\u10e8\u10d4\u10d9\u10d4\u10d7\u10d4\u10d1\u10d0\u00bb \u10e1\u10d8\u10d7\u10d1\u10dd\u10e1 \u10d6\u10d4\u10db\u10dd\u10e5\u10db\u10d4\u10d3\u10d4\u10d1\u10d8\u10d7 \u2014 \u10db\u10d6\u10d8\u10e1 \u10e1\u10ee\u10d8\u10d5\u10d4\u10d1\u10d8\u10d7, \u10d7\u10d1\u10d8\u10da\u10d8 \u10ec\u10e7\u10da\u10d8\u10d7 \u10d0\u10dc \u10d7\u10d4\u10e0\u10db\u10dd\u10de\u10d8\u10e1\u10e2\u10dd\u10da\u10d4\u10e2\u10d8\u10d7.</div> </div> </div> </div> </div> </div>"""

    faq9_html = """ <div class="t-col t-col_8 t-prefix_2"> <div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> <div class="t585__wrapper"> <div class="t585__header " style="border-top: 1px solid #eee;"> <button type="button"
class="t585__trigger-button"
aria-controls="accordion9_603170641"
aria-expanded="false"> <span class="t585__title t-name t-name_xl" field="li_title__faq9">\u10d3\u10d0\u10d0\u10d6\u10d8\u10d0\u10dc\u10d4\u10d1\u10e1 \u10d7\u10e3 \u10d0\u10e0\u10d0 \u10e4\u10d8\u10e0\u10d8 \u10e1\u10d0\u10e6\u10d4\u10d1\u10d0\u10d5\u10e1?</span> <span class="t585__icon"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#000000"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #e4c97e"></span> </span> <span class="t585__icon t585__icon-hover"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#222222"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #eee;"></span> </span> </button> </div> <div class="t585__content"
id="accordion9_603170641"
hidden > <div class="t585__textwrapper"> <div class="t585__text t-descr t-descr_xs" field="li_descr__faq9">\u10d0\u10e0\u10d0. \u10ee\u10d0\u10e0\u10d8\u10e1\u10ee\u10d8\u10d0\u10dc\u10d8 \u10de\u10dd\u10da\u10d8\u10e3\u10e0\u10d4\u10d7\u10d0\u10dc\u10d8\u10e1 \u10e4\u10d8\u10e0\u10d8 \u10d8\u10ee\u10e1\u10dc\u10d4\u10d1\u10d0 \u10e1\u10e3\u10e4\u10d7\u10d0\u10d3 \u10d3\u10d0 \u10d8\u10ea\u10d0\u10d5\u10e1 \u10da\u10d0\u10e5-\u10e1\u10d0\u10e6\u10d4\u10d1\u10d0\u10d5\u10e1 \u10e9\u10d8\u10de\u10d4\u10d1\u10d8\u10e1\u10d0 \u10d3\u10d0 \u10dc\u10d0\u10d9\u10d0\u10ec\u10e0\u10d4\u10d1\u10d8\u10e1\u10d2\u10d0\u10dc. \u10e5\u10d0\u10e0\u10ee\u10dc\u10e3\u10da\u10d8 \u10e1\u10d0\u10e6\u10d4\u10d1\u10d0\u10d5\u10d8 \u10e4\u10d8\u10e0\u10d8\u10e1 \u10e5\u10d5\u10d4\u10e8 \u10d8\u10db\u10d0\u10d5\u10d4 \u10db\u10d3\u10d2\u10dd\u10db\u10d0\u10e0\u10d4\u10dd\u10d1\u10d0\u10e8\u10d8\u10d0, \u10e0\u10dd\u10d2\u10dd\u10e0\u10ea \u10d3\u10d0\u10e4\u10d0\u10e0\u10d5\u10d8\u10e1 \u10d3\u10e6\u10d4\u10e1.</div> </div> </div> </div> </div> </div>"""

    # Insert before the t585__border div in rec603170641
    border_marker = '<div class="t585__border" style="height: 1px; background-color: #eee;"></div> </div> </div> </div> <script>t_onReady(function() {t_onFuncLoad(\'t585_init\',function() {t585_init(\'603170641\');})'
    border_pos = html.find(border_marker)
    if border_pos != -1:
        html = html[:border_pos] + faq7_html + faq8_html + faq9_html + " " + html[border_pos:]

    # =========================================================================
    # 6. "Related services" section title — update vinyl reference
    # =========================================================================
    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">შეუკვეთეთ ვინილის შეფუთვასთან ერთად</span>',
        '<span style="color: rgb(228, 201, 126);">შეუკვეთეთ ფერის შეცვლასთან ერთად</span>',
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

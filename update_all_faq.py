#!/usr/bin/env python3
"""
Batch update FAQ sections across all 10 service pages × 3 languages.
Replaces t585 accordion content and FAQPage JSON-LD schema.
"""
import re
import json
import os

BASE = os.path.join(os.path.dirname(__file__), 'tilda-export', 'project6825691')

# ─── SVG icon template (identical across all pages) ───
ICON_SVG = (
    '<span class="t585__icon"> <span class="t585__lines"> '
    '<svg role="presentation" focusable="false" width="24px" height="24px" '
    'viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" '
    'xmlns:xlink="http://www.w3.org/1999/xlink"> '
    '<g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> '
    '<g transform="translate(1.000000, 1.000000)" stroke="#000000"> '
    '<path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> '
    '</g> </g> </svg> </span> '
    '<span class="t585__circle" style="background-color: #e4c97e"></span> </span> '
    '<span class="t585__icon t585__icon-hover"> <span class="t585__lines"> '
    '<svg role="presentation" focusable="false" width="24px" height="24px" '
    'viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" '
    'xmlns:xlink="http://www.w3.org/1999/xlink"> '
    '<g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> '
    '<g transform="translate(1.000000, 1.000000)" stroke="#222222"> '
    '<path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> '
    '</g> </g> </svg> </span> '
    '<span class="t585__circle" style="background-color: #eee;"></span> </span>'
)


def build_accordion_item(question, answer, idx, rec_id, field_id, is_last=False):
    """Build a single t585 accordion item HTML."""
    border = (' <div class="t585__border" style="height: 1px; background-color: #eee;"></div>'
              if is_last else '')
    return (
        f'<div class="t-col t-col_8 t-prefix_2"> '
        f'<div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> '
        f'<div class="t585__wrapper"> '
        f'<div class="t585__header " style="border-top: 1px solid #eee;"> '
        f'<button type="button" class="t585__trigger-button" '
        f'aria-controls="accordion{idx}_{rec_id}" aria-expanded="false"> '
        f'<span class="t585__title t-name t-name_xl" field="li_title__{field_id}">'
        f'<strong>{question}</strong></span> '
        f'{ICON_SVG} '
        f'</button> </div> '
        f'<div class="t585__content" id="accordion{idx}_{rec_id}" hidden > '
        f'<div class="t585__textwrapper"> '
        f'<div class="t585__text t-descr t-descr_xs" field="li_descr__{field_id}">'
        f'{answer}</div> </div> </div> </div>{border} </div> </div>'
    )


def build_t585_block(rec_id, items):
    """Build the complete t585 block with all accordion items."""
    accordions = []
    total = len(items)
    for i, (q, a) in enumerate(items, 1):
        field_id = f'faq_{rec_id}_{i}'
        accordions.append(build_accordion_item(q, a, i, rec_id, field_id, is_last=(i == total)))

    inner = ' '.join(accordions)
    return (
        f'<div id="rec{rec_id}" class="r t-rec t-rec_pt_75 t-rec_pb_90" '
        f'style="padding-top:75px;padding-bottom:90px;background-color:#000000; " '
        f'data-animationappear="off" data-record-type="585" data-bg-color="#000000"> '
        f'<!-- T585 --> <div class="t585"> <div class="t-container"> '
        f'{inner} '
        f'</div> </div> '
        f'<script>t_onReady(function() {{t_onFuncLoad(\'t585_init\',function() '
        f'{{t585_init(\'{rec_id}\');}});}});</script> '
        f'<style> #rec{rec_id} .t585__title{{color:#ffffff;}}#rec{rec_id} .t585__text{{color:#ffffff;}}</style> </div>'
    )


def build_schema(items):
    """Build FAQPage JSON-LD schema."""
    questions = []
    for q, a in items:
        # Strip HTML tags for schema
        clean_a = re.sub(r'<[^>]+>', ' ', a)
        clean_a = re.sub(r'\s+', ' ', clean_a).strip()
        clean_q = re.sub(r'<[^>]+>', '', q).strip()
        questions.append({
            "@type": "Question",
            "name": clean_q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": clean_a
            }
        })
    schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions
    }
    return json.dumps(schema, ensure_ascii=False)


def replace_t585(html, rec_id, new_block):
    """Replace the existing t585 block identified by rec_id."""
    marker = f'id="rec{rec_id}"'
    idx = html.find(marker)
    if idx < 0:
        print(f"  WARNING: rec{rec_id} not found!")
        return html
    # Find the start of this div
    div_start = html.rfind('<div ', 0, idx)
    # Find the next top-level rec div after this block
    after = html[idx:]
    # Look for the next <div id="rec that starts a new record
    next_rec = re.search(r'</div>\s*<div id="rec\d+', after)
    if next_rec:
        block_end = idx + next_rec.start() + after[next_rec.start():].index('<div id="rec')
    else:
        print(f"  WARNING: Could not find end of rec{rec_id}")
        return html
    return html[:div_start] + new_block + ' ' + html[block_end:]


def replace_schema(html, new_schema_json):
    """Replace existing FAQPage schema or return html unchanged if not found."""
    pattern = r'<script type="application/ld\+json">\s*\{[^<]*"FAQPage"[^<]*\}\s*</script>'
    match = re.search(pattern, html)
    if match:
        new_tag = f'<script type="application/ld+json">\n{new_schema_json}\n</script>'
        return html[:match.start()] + new_tag + html[match.end():]
    return html


def add_schema_before_faq_heading(html, heading_rec_id, new_schema_json):
    """Add schema in a nominify block before the FAQ heading."""
    marker = f'id="rec{heading_rec_id}"'
    idx = html.find(marker)
    if idx < 0:
        return html
    div_start = html.rfind('<div ', 0, idx)
    schema_block = (
        f'<div id="rec_schema_{heading_rec_id}" class="r t-rec" '
        f'style="background-color:#000000; " data-animationappear="off" '
        f'data-record-type="131" data-bg-color="#000000"> '
        f'<!-- T123 --> <div class="t123"> <div class="t-container_100 "> '
        f'<div class="t-width t-width_100 "> <!-- nominify begin --> '
        f'<script type="application/ld+json">\n{new_schema_json}\n</script> '
        f'<!-- nominify end --> </div> </div> </div> </div> '
    )
    return html[:div_start] + schema_block + html[div_start:]


def process_page(filepath, rec_id, heading_rec_id, items):
    """Process a single page: replace FAQ content and schema."""
    path = os.path.join(BASE, filepath)
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Replace t585 block
    new_block = build_t585_block(rec_id, items)
    html = replace_t585(html, rec_id, new_block)

    # 2. Replace or add schema
    schema_json = build_schema(items)
    if '"FAQPage"' in html:
        html = replace_schema(html, schema_json)
    else:
        html = add_schema_before_faq_heading(html, heading_rec_id, schema_json)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  Updated {filepath}")


# ═══════════════════════════════════════════════════════════
# FAQ DATA: 10 services × 3 languages
# ═══════════════════════════════════════════════════════════

# ──────────────────────────────────────────────────────────
# 1. POLISHING
# ──────────────────────────────────────────────────────────
POLISHING_RU = [
    ("Сколько стоит полировка автомобиля?",
     "Полировка кузова — от 590 Gel, полировка + керамическое покрытие — от 990 Gel. "
     "Также делаем полировку фар (от 150 Gel), стекла (от 250 Gel) и элементов салона (от 200 Gel). "
     "Точная стоимость зависит от размера автомобиля и состояния ЛКП. "
     "Напишите нам в WhatsApp, пришлите фото — и мы рассчитаем точную стоимость."),

    ("Есть ли гарантия на полировку?",
     "Да. Мы даем 14 дней гарантии на результат полировки. "
     "За 5 лет работы менее 1% гарантийных случаев — мы уверены в качестве своей работы."),

    ("Сколько времени занимает полировка?",
     "Легкая полировка занимает 3–4 часа, восстановительная — 6–8 часов, "
     "многоэтапная (для запущенного состояния) — до 2 дней. "
     "Точные сроки зависят от размера автомобиля и состояния ЛКП."),

    ("Как часто нужно полировать автомобиль?",
     "Рекомендуем полировать раз в год для поддержания блеска. "
     "Если после полировки нанести керамическое покрытие — эффект сохранится на 3 года. "
     "А с защитной пленкой PPF полировка может не понадобиться до 10 лет. "
     "Спросите нас о комплексных пакетах — это выгоднее."),

    ("Почему стоит полировать именно у вас?",
     "Более 5 лет опыта, профессиональное оборудование Rupes, материалы Koch Chemie из Германии. "
     "Два удобных адреса в Тбилиси. Более 2000 довольных клиентов. "
     "Мы замеряем толщину ЛКП перед работой и показываем результат при специальном освещении."),

    ("Полировка не повредит краску?",
     "Нет. Мы обязательно замеряем толщину лакокрасочного покрытия перед началом работы. "
     "При профессиональной полировке снимается всего 1–3 микрона из 80–120 микрон запаса. "
     "Это абсолютно безопасно и не влияет на защитные свойства ЛКП."),

    ("Нужно ли мыть машину перед полировкой?",
     "Нет, привозите автомобиль как есть. Тщательная мойка и подготовка кузова входят в стоимость полировки. "
     "Мы сами подготовим поверхность для идеального результата."),

    ("Что такое полировка автомобиля?",
     "Полировка — это процесс удаления мелких царапин, потертостей и других дефектов "
     "с лакокрасочного покрытия кузова, оптики или стекол. "
     "Она восстанавливает блеск и глубину цвета, и автомобиль снова выглядит как новый."),
]

POLISHING_EN = [
    ("How much does car polishing cost?",
     "Paint correction starts from 590 Gel, polishing + ceramic coating from 990 Gel. "
     "We also offer headlight polishing (from 150 Gel), windshield polishing (from 250 Gel) and interior elements (from 200 Gel). "
     "The exact price depends on car size and paint condition. "
     "Send us photos on WhatsApp and we'll calculate the exact price."),

    ("Is there a warranty on polishing?",
     "Yes. We offer a 14-day warranty on polishing results. "
     "Over 5 years of work, less than 1% of warranty cases — we are confident in our quality."),

    ("How long does polishing take?",
     "Light polishing takes 3–4 hours, paint correction 6–8 hours, "
     "multi-stage correction (for heavily damaged paint) up to 2 days. "
     "Exact timing depends on car size and paint condition."),

    ("How often should I polish my car?",
     "We recommend polishing once a year to maintain the shine. "
     "If you apply ceramic coating after polishing, the effect lasts up to 3 years. "
     "With PPF protection film, polishing may not be needed for up to 10 years. "
     "Ask us about package deals — they offer better value."),

    ("Why choose your polishing service?",
     "Over 5 years of experience, professional Rupes equipment, Koch Chemie materials from Germany. "
     "Two convenient locations in Tbilisi. Over 2000 satisfied clients. "
     "We measure paint thickness before work and show the result under special lighting."),

    ("Will polishing damage the paint?",
     "No. We always measure paint thickness before starting. "
     "Professional polishing removes only 1–3 microns out of 80–120 microns of available clearcoat. "
     "This is completely safe and does not affect the protective properties of the paint."),

    ("Do I need to wash my car before polishing?",
     "No, bring your car as is. Thorough washing and surface preparation are included in the polishing price. "
     "We handle all the prep work for a perfect result."),

    ("What is car polishing?",
     "Polishing is the process of removing minor scratches, swirl marks, and other defects "
     "from the car body, headlights, or windshield coating. "
     "It restores shine and color depth, making your car look brand new again."),
]

POLISHING_KA = [
    ("რა ღირს ავტომობილის პოლირება?",
     "კუზოვის პოლირება — 590 Gel-დან, პოლირება + კერამიკული საფარი — 990 Gel-დან. "
     "ასევე ვაკეთებთ ფარების პოლირებას (150 Gel-დან), მინის (250 Gel-დან) და სალონის ელემენტების (200 Gel-დან). "
     "ზუსტი ფასი დამოკიდებულია ავტომობილის ზომასა და საღებავის მდგომარეობაზე. "
     "მოგვწერეთ WhatsApp-ზე, გამოგვიგზავნეთ ფოტო — და ჩვენ გამოვთვლით ზუსტ ფასს."),

    ("არის თუ არა გარანტია პოლირებაზე?",
     "დიახ. ვაძლევთ 14-დღიან გარანტიას პოლირების შედეგზე. "
     "5 წლიანი მუშაობის განმავლობაში საგარანტიო შემთხვევები 1%-ზე ნაკლებია — ჩვენი ხარისხის ერთგულები ვართ."),

    ("რამდენ ხანს გრძელდება პოლირება?",
     "მსუბუქი პოლირება 3–4 საათს იღებს, აღმდგენი — 6–8 საათს, "
     "მრავალეტაპიანი (მძიმე მდგომარეობისთვის) — 2 დღემდე. "
     "ზუსტი ვადა დამოკიდებულია ავტომობილის ზომასა და საღებავის მდგომარეობაზე."),

    ("რამდენად ხშირად სჭირდება პოლირება ავტომობილს?",
     "გირჩევთ პოლირებას წელიწადში ერთხელ ბზინვარების შესანარჩუნებლად. "
     "თუ პოლირების შემდეგ კერამიკულ საფარს დაიტანთ — ეფექტი 3 წლამდე შენარჩუნდება. "
     "PPF დამცავი ფირით კი პოლირება შეიძლება 10 წელი არ დაგჭირდეთ. "
     "გვკითხეთ კომპლექსური პაკეტების შესახებ — ეს უფრო მომგებიანია."),

    ("რატომ უნდა აირჩიოთ ჩვენი პოლირების სერვისი?",
     "5 წელზე მეტი გამოცდილება, პროფესიონალური Rupes აღჭურვილობა, Koch Chemie მასალები გერმანიიდან. "
     "ორი მოსახერხებელი მისამართი თბილისში. 2000-ზე მეტი კმაყოფილი მომხმარებელი. "
     "მუშაობის დაწყებამდე ვზომავთ საღებავის სისქეს და შედეგს სპეციალურ განათებაში ვაჩვენებთ."),

    ("პოლირება ხომ არ დააზიანებს საღებავს?",
     "არა. ჩვენ ყოველთვის ვზომავთ საღებავის სისქეს მუშაობის დაწყებამდე. "
     "პროფესიონალური პოლირებით მხოლოდ 1–3 მიკრონი იხსნება 80–120 მიკრონი მარაგიდან. "
     "ეს სრულიად უსაფრთხოა და არ მოქმედებს საღებავის დამცავ თვისებებზე."),

    ("საჭიროა თუ არა მანქანის გარეცხვა პოლირებამდე?",
     "არა, მოიყვანეთ ავტომობილი ისე, როგორც არის. საფუძვლიანი რეცხვა და ზედაპირის მომზადება შედის პოლირების ფასში. "
     "ჩვენ თვითონ მოვამზადებთ ზედაპირს იდეალური შედეგისთვის."),

    ("რა არის ავტომობილის პოლირება?",
     "პოლირება არის წვრილი ნაკაწრების, გახეხილობისა და სხვა დეფექტების მოცილების პროცესი "
     "კუზოვის, ფარების ან მინის საფარიდან. "
     "იგი აღადგენს ბზინვარებას და ფერის სიღრმეს, ავტომობილი ისევ ახალივით გამოიყურება."),
]

# ──────────────────────────────────────────────────────────
# 2. CERAMIC COATING
# ──────────────────────────────────────────────────────────
CERAMIC_RU = [
    ("Сколько стоит керамическое покрытие?",
     "Керамическое покрытие всего авто — от 600 Gel. "
     "Также делаем антидождь на стекла (от 150 Gel) и керамическое покрытие салона (от 300 Gel). "
     "Точная стоимость зависит от класса автомобиля и количества слоев. "
     "Напишите нам в WhatsApp для точного расчета."),

    ("На сколько хватает керамического покрытия?",
     "Керамика на кузове держится до 3 лет, на стеклах и в салоне — до 1 года. "
     "Мы даем гарантию на покрытие и бесплатно обновим при потере гидрофобности в гарантийный период."),

    ("Зачем наносить керамику, если можно просто мыть?",
     "Керамическое покрытие — это не только блеск. Оно защищает от ультрафиолета, мелких царапин, "
     "птичьего помета и реагентов. Мойка становится в 2 раза быстрее — грязь просто скатывается. "
     "Это инвестиция в сохранение внешнего вида и стоимости автомобиля."),

    ("Нужно ли готовить машину перед нанесением?",
     "Привозите как есть — мы сами всё подготовим. "
     "Подготовка (мойка, деконтаминация, полировка) — это 80% результата, "
     "и мы уделяем ей максимум внимания. Именно поэтому результат держится так долго."),

    ("Как будет выглядеть автомобиль после нанесения?",
     'Покрытие дает глубокий "мокрый" блеск и выраженную гидрофобность — '
     "вода собирается в капли и скатывается с поверхности. "
     "Напишите нам в WhatsApp — покажем фото и видео реальных примеров."),

    ("Как понять, что пора обновить керамику?",
     "Есть 3 признака: вода перестает собираться в капли, появляются разводы после мойки, "
     "блеск потускнел. Приезжайте на бесплатный осмотр — мы проверим состояние покрытия "
     "и подскажем, нужно ли обновление."),

    ("Можно ли нанести керамику самостоятельно?",
     "Технически можно, но результат будет в 3–5 раз слабее. "
     "Без профессиональной подготовки поверхности, контроля температуры и влажности, "
     "а также инфракрасной сушки покрытие не наберет нужную прочность "
     "и продержится несколько месяцев вместо лет."),

    ("Что такое керамическое покрытие?",
     "Это жидкий состав на основе диоксида кремния (SiO2), который после нанесения "
     "образует прозрачный защитный слой на поверхности автомобиля. "
     "Керамика защищает от UV-лучей, царапин, химии и держится до 3 лет."),
]

CERAMIC_EN = [
    ("How much does ceramic coating cost?",
     "Full car ceramic coating starts from 600 Gel. "
     "We also offer rain repellent for glass (from 150 Gel) and interior ceramic coating (from 300 Gel). "
     "The exact price depends on vehicle class and number of layers. "
     "Message us on WhatsApp for an exact quote."),

    ("How long does ceramic coating last?",
     "Ceramic coating on the body lasts up to 3 years, on glass and interior up to 1 year. "
     "We provide a warranty on the coating and will refresh it free of charge if hydrophobicity is lost during the warranty period."),

    ("Why apply ceramic coating if I can just wash my car?",
     "Ceramic coating is not just about shine. It protects against UV, minor scratches, "
     "bird droppings, and chemicals. Washing becomes 2x faster — dirt simply slides off. "
     "It's an investment in preserving your car's appearance and value."),

    ("Do I need to prepare my car before application?",
     "Bring it as is — we handle all preparation. "
     "Prep work (washing, decontamination, polishing) accounts for 80% of the result, "
     "and we give it maximum attention. That's why our results last so long."),

    ("What will my car look like after application?",
     'The coating gives a deep "wet look" shine and strong hydrophobicity — '
     "water beads up and rolls off the surface. "
     "Message us on WhatsApp — we'll show you photos and videos of real examples."),

    ("How do I know when to refresh the ceramic coating?",
     "There are 3 signs: water stops beading, streaks appear after washing, "
     "and the shine has dulled. Come in for a free inspection — we'll check the coating condition "
     "and advise whether a refresh is needed."),

    ("Can I apply ceramic coating myself?",
     "Technically yes, but the result will be 3–5 times weaker. "
     "Without professional surface preparation, temperature and humidity control, "
     "and infrared curing, the coating won't reach proper hardness "
     "and will last a few months instead of years."),

    ("What is ceramic coating?",
     "It's a liquid compound based on silicon dioxide (SiO2) that forms "
     "a transparent protective layer on the car surface after application. "
     "Ceramic coating protects against UV, scratches, chemicals, and lasts up to 3 years."),
]

CERAMIC_KA = [
    ("რა ღირს კერამიკული საფარი?",
     "მთლიანი ავტომობილის კერამიკული საფარი — 600 Gel-დან. "
     "ასევე ვაკეთებთ ანტიწვიმას მინებზე (150 Gel-დან) და სალონის კერამიკულ საფარს (300 Gel-დან). "
     "ზუსტი ფასი დამოკიდებულია ავტომობილის კლასსა და ფენების რაოდენობაზე. "
     "მოგვწერეთ WhatsApp-ზე ზუსტი გათვლისთვის."),

    ("რამდენ ხანს ძლებს კერამიკული საფარი?",
     "კუზოვზე კერამიკა 3 წლამდე ძლებს, მინებსა და სალონში — 1 წლამდე. "
     "ვაძლევთ გარანტიას საფარზე და უფასოდ განვაახლებთ ჰიდროფობიურობის დაკარგვის შემთხვევაში."),

    ("რატომ უნდა დავიტანო კერამიკა, თუ უბრალოდ შემიძლია გავრეცხო?",
     "კერამიკული საფარი მხოლოდ ბზინვარება არ არის. ის იცავს ულტრაიისფერი სხივებისგან, "
     "წვრილი ნაკაწრებისგან, ფრინველის ნარჩენებისა და ქიმიკატებისგან. "
     "რეცხვა 2-ჯერ უფრო სწრაფი ხდება — ჭუჭყი უბრალოდ სრიალებს. "
     "ეს ინვესტიციაა ავტომობილის გარეგნობისა და ღირებულების შენარჩუნებაში."),

    ("საჭიროა თუ არა მანქანის მომზადება დატანამდე?",
     "მოიყვანეთ ისე, როგორც არის — ჩვენ თვითონ მოვამზადებთ ყველაფერს. "
     "მომზადება (რეცხვა, დეკონტამინაცია, პოლირება) შედეგის 80%-ია, "
     "და ჩვენ მაქსიმალურ ყურადღებას ვუთმობთ. სწორედ ამიტომ გვძლებს შედეგი ასე დიდხანს."),

    ("როგორ გამოიყურება ავტომობილი დატანის შემდეგ?",
     'საფარი იძლევა ღრმა \u201Eსველ\u201C ბზინვარებას და გამოხატულ ჰიდროფობიურობას — '
     "წყალი წვეთებად გროვდება და ზედაპირიდან სრიალებს. "
     "მოგვწერეთ WhatsApp-ზე — გაჩვენებთ ნამდვილი მაგალითების ფოტოებსა და ვიდეოებს."),

    ("როგორ გავიგო, რომ კერამიკის განახლების დროა?",
     "3 ნიშანია: წყალი აღარ გროვდება წვეთებად, რეცხვის შემდეგ ლაქები ჩნდება, "
     "ბზინვარება ქრება. მობრძანდით უფასო შემოწმებაზე — შევამოწმებთ საფარის მდგომარეობას "
     "და გირჩევთ, საჭიროა თუ არა განახლება."),

    ("შემიძლია თუ არა კერამიკის თვითონ დატანა?",
     "ტექნიკურად შესაძლებელია, მაგრამ შედეგი 3–5-ჯერ სუსტი იქნება. "
     "პროფესიონალური ზედაპირის მომზადების, ტემპერატურისა და ტენიანობის კონტროლის "
     "და ინფრაწითელი გამოშრობის გარეშე საფარი საჭირო სიმტკიცეს ვერ მიაღწევს "
     "და წლების ნაცვლად რამდენიმე თვე გაძლებს."),

    ("რა არის კერამიკული საფარი?",
     "ეს არის სილიციუმის დიოქსიდზე (SiO2) დაფუძნებული თხევადი შემადგენლობა, "
     "რომელიც დატანის შემდეგ ავტომობილის ზედაპირზე გამჭვირვალე დამცავ ფენას ქმნის. "
     "კერამიკა იცავს UV-სხივებისგან, ნაკაწრებისგან, ქიმიკატებისგან და 3 წლამდე ძლებს."),
]

# ──────────────────────────────────────────────────────────
# 3. INTERIOR CLEANING
# ──────────────────────────────────────────────────────────
INTERIOR_CLEANING_RU = [
    ("Сколько стоит химчистка салона?",
     "Химчистка при легком загрязнении — от 400 Gel, при среднем — от 500 Gel, при сильном — от 550 Gel. "
     "Также делаем ручную детейлинг-мойку (от 40 Gel) и устранение запахов озоном (от 50 Gel). "
     "Пришлите фото салона в WhatsApp — и мы назовем точную стоимость."),

    ("Есть ли гарантия на химчистку?",
     "Да, 7 дней гарантии на доработку. Если вас что-то не устроит — приезжайте, доработаем бесплатно. "
     "За 5 лет работы менее 2% гарантийных случаев."),

    ("Сколько времени занимает химчистка?",
     "Качественная химчистка делается от 1 до 3 дней. "
     "Базовая занимает 4–5 часов, полная — 6–8 часов. "
     "С полной сушкой лучше оставить автомобиль на ночь."),

    ("Уберете ли запах сигарет или животных?",
     "Да. Используем озонатор и профессиональные энзимные составы, "
     "которые разрушают молекулы запаха, а не маскируют его. "
     "В 95% случаев полностью убираем запах за один сеанс."),

    ("Какую химию используете? Безопасна ли она?",
     "Работаем с Koch Chemie, Grass, используем аппарат Tornador. "
     "Все составы гипоаллергенны, безопасны для детей и животных. "
     "Не оставляют резких запахов после обработки."),

    ("Нужно ли что-то сделать перед приездом?",
     "Просто уберите личные вещи из салона. Мыть машину не нужно — "
     "мы всё сделаем сами в процессе подготовки."),

    ("Когда можно пользоваться автомобилем после химчистки?",
     "После базовой химчистки — через 4–6 часов. После полной — лучше подождать до полного высыхания, "
     "обычно это занимает от 1 до 3 дней в зависимости от влажности и типа материалов."),

    ("Можно ли вывести старые пятна?",
     "Кофе, кровь, жир — да, в 90% случаев убираем полностью. "
     "Если пятно очень старое или специфическое — честно предупредим заранее. "
     "Лучше не тянуть: чем свежее пятно, тем выше шанс полного удаления."),

    ("Чем детейлинг-химчистка отличается от обычной мойки?",
     "На обычной мойке чистят поверхностно за 30 минут. Детейлинг-химчистка — это глубокая обработка "
     "каждого сантиметра салона: сиденья, потолок, пластик, ковры. "
     "Удаляем бактерии, аллергены, запахи. Результат — как новый салон."),
]

INTERIOR_CLEANING_EN = [
    ("How much does interior cleaning cost?",
     "Light contamination cleaning starts from 400 Gel, medium from 500 Gel, heavy from 550 Gel. "
     "We also offer hand detailing wash (from 40 Gel) and ozone odor removal (from 50 Gel). "
     "Send us photos on WhatsApp and we'll give you an exact quote."),

    ("Is there a warranty on interior cleaning?",
     "Yes, 7-day warranty for touch-ups. If anything doesn't meet your expectations — come back, we'll fix it free. "
     "Less than 2% warranty cases over 5 years of work."),

    ("How long does interior cleaning take?",
     "Quality interior cleaning takes 1 to 3 days. "
     "Basic cleaning takes 4–5 hours, full cleaning 6–8 hours. "
     "For complete drying, it's best to leave the car overnight."),

    ("Can you remove cigarette or pet odors?",
     "Yes. We use an ozone generator and professional enzyme-based products "
     "that break down odor molecules rather than masking them. "
     "In 95% of cases, we completely eliminate the odor in a single session."),

    ("What chemicals do you use? Are they safe?",
     "We work with Koch Chemie, Grass, and use Tornador equipment. "
     "All products are hypoallergenic, safe for children and pets. "
     "They leave no harsh odors after treatment."),

    ("Do I need to do anything before bringing my car?",
     "Just remove your personal belongings from the cabin. No need to wash the car — "
     "we handle everything during preparation."),

    ("When can I use my car after cleaning?",
     "After basic cleaning — in 4–6 hours. After full cleaning — it's better to wait for complete drying, "
     "which usually takes 1 to 3 days depending on humidity and material type."),

    ("Can you remove old stains?",
     "Coffee, blood, grease — yes, we remove them completely in 90% of cases. "
     "If a stain is very old or specific, we'll honestly let you know in advance. "
     "Don't wait: the fresher the stain, the higher the chance of complete removal."),

    ("How is detailing different from a regular car wash?",
     "A regular wash cleans the surface in 30 minutes. Detailing is deep treatment "
     "of every inch of the cabin: seats, headliner, plastic, carpets. "
     "We remove bacteria, allergens, and odors. The result is like a brand-new interior."),
]

INTERIOR_CLEANING_KA = [
    ("რა ღირს სალონის ქიმწმენდა?",
     "ქიმწმენდა მსუბუქი დაბინძურებისას — 400 Gel-დან, საშუალო — 500 Gel-დან, ძლიერი — 550 Gel-დან. "
     "ასევე ვაკეთებთ ხელით დეტეილინგ-რეცხვას (40 Gel-დან) და ოზონით სუნის მოცილებას (50 Gel-დან). "
     "გამოგვიგზავნეთ სალონის ფოტო WhatsApp-ზე — და გეტყვით ზუსტ ფასს."),

    ("არის თუ არა გარანტია ქიმწმენდაზე?",
     "დიახ, 7-დღიანი გარანტია დახვეწაზე. თუ რამე არ მოგეწონებათ — მობრძანდით, უფასოდ გავასწორებთ. "
     "5 წლიანი მუშაობის განმავლობაში საგარანტიო შემთხვევები 2%-ზე ნაკლებია."),

    ("რამდენ ხანს გრძელდება ქიმწმენდა?",
     "ხარისხიანი ქიმწმენდა 1-დან 3 დღემდე გრძელდება. "
     "ბაზისური 4–5 საათს იღებს, სრული — 6–8 საათს. "
     "სრული გამოშრობისთვის სჯობს ავტომობილი ღამით დატოვოთ."),

    ("მოაშორებთ თუ არა სიგარეტის ან ცხოველების სუნს?",
     "დიახ. ვიყენებთ ოზონატორს და პროფესიონალურ ენზიმურ საშუალებებს, "
     "რომლებიც სუნის მოლეკულებს შლიან და არა ნიღბავენ. "
     "შემთხვევების 95%-ში სუნს სრულად ვაშორებთ ერთი სეანსით."),

    ("რა ქიმიას იყენებთ? უსაფრთხოა?",
     "ვმუშაობთ Koch Chemie, Grass-ით, ვიყენებთ Tornador აპარატს. "
     "ყველა საშუალება ჰიპოალერგიულია, უსაფრთხოა ბავშვებისა და ცხოველებისთვის. "
     "დამუშავების შემდეგ მძაფრ სუნს არ ტოვებს."),

    ("რაიმე უნდა გავაკეთო მოყვანამდე?",
     "უბრალოდ ამოიღეთ პირადი ნივთები სალონიდან. მანქანის გარეცხვა არ არის საჭირო — "
     "ყველაფერს ჩვენ გავაკეთებთ მომზადების პროცესში."),

    ("როდის შემიძლია ავტომობილის გამოყენება ქიმწმენდის შემდეგ?",
     "ბაზისური ქიმწმენდის შემდეგ — 4–6 საათში. სრულის შემდეგ — სჯობს დაელოდოთ სრულ გამოშრობას, "
     "ჩვეულებრივ 1-დან 3 დღემდე ტენიანობისა და მასალის ტიპის მიხედვით."),

    ("შესაძლებელია თუ არა ძველი ლაქების მოცილება?",
     "ყავა, სისხლი, ცხიმი — დიახ, შემთხვევების 90%-ში სრულად ვაშორებთ. "
     "თუ ლაქა ძალიან ძველია ან სპეციფიკურია — წინასწარ გულახდილად გეტყვით. "
     "ნუ დააყოვნებთ: რაც უფრო ახალია ლაქა, მით მეტია სრული მოცილების შანსი."),

    ("რით განსხვავდება დეტეილინგ-ქიმწმენდა ჩვეულებრივი რეცხვისგან?",
     "ჩვეულებრივ რეცხვაზე ზედაპირს 30 წუთში ასუფთავებენ. დეტეილინგ-ქიმწმენდა არის "
     "სალონის ყოველი სანტიმეტრის ღრმა დამუშავება: სავარძლები, ჭერი, პლასტმასა, ხალიჩები. "
     "ვაშორებთ ბაქტერიებს, ალერგენებს, სუნებს. შედეგი — როგორც ახალი სალონი."),
]

# ──────────────────────────────────────────────────────────
# 4. INTERIOR RESTORATION
# ──────────────────────────────────────────────────────────
INTERIOR_RESTORATION_RU = [
    ("Сколько стоит реставрация салона?",
     "Реставрация руля — от 280 Gel, сиденья — от 230 Gel, подлокотника — от 190 Gel. "
     "Полировка элементов салона — от 200 Gel, ремонт пластика — от 200 Gel. "
     "Пришлите фото повреждения в WhatsApp — назовем точную стоимость."),

    ("Будет ли заметен ремонт?",
     "В 90% случаев — нет. Мы подбираем цвет и текстуру с точностью до оттенка. "
     "Покажем фото до/после аналогичных работ, чтобы вы оценили качество."),

    ("Есть ли гарантия?",
     "Да. Руль — 1 год, кожаные элементы — 6 месяцев, пластик — 6 месяцев. "
     "При нормальной эксплуатации результат держится значительно дольше гарантийного срока."),

    ("Сколько времени занимает реставрация?",
     "Локальный ремонт (царапина, прожог) — 2–4 часа. "
     "Перетяжка руля — 2–3 дня. Комплексная реставрация салона — 3–5 дней."),

    ("Какие повреждения можете восстановить?",
     "Царапины, потертости, прожоги сигаретой, разрывы, дыры, "
     "выцветший цвет, поврежденная кожа и пластик. "
     "Если повреждение слишком серьезное — честно скажем и предложим альтернативу."),

    ("Можно ли перетянуть руль под свой вкус?",
     "Да. Выбирайте цвет кожи, тип (наппа, перфорированная, экокожа), "
     "цвет строчки и её стиль. Выполняем за 2–3 дня. "
     "Покажем образцы материалов перед началом работы."),

    ("Какие материалы используете для руля?",
     "Натуральная кожа наппа, перфорированная кожа, экокожа премиум-класса. "
     "Все материалы износостойкие и приятные на ощупь. "
     "Подбираем под оригинал или по вашему вкусу."),

    ("Какие материалы используете для сидений?",
     "Натуральная кожа, экокожа, ткань, алькантара. "
     "Можем восстановить оригинальную обивку или полностью перетянуть в новый материал."),

    ("Какие пластиковые элементы можно восстановить?",
     "Торпедо, дверные карты, центральную консоль, подлокотники, рулевую колонку. "
     "Убираем царапины, восстанавливаем текстуру и цвет. "
     "При серьезных повреждениях можем покрасить или обтянуть."),
]

INTERIOR_RESTORATION_EN = [
    ("How much does interior restoration cost?",
     "Steering wheel restoration — from 280 Gel, seat — from 230 Gel, armrest — from 190 Gel. "
     "Interior elements polishing — from 200 Gel, plastic repair — from 200 Gel. "
     "Send us a photo of the damage on WhatsApp — we'll give you an exact quote."),

    ("Will the repair be noticeable?",
     "In 90% of cases — no. We match color and texture precisely to the original shade. "
     "We'll show you before/after photos of similar work so you can judge the quality."),

    ("Is there a warranty?",
     "Yes. Steering wheel — 1 year, leather elements — 6 months, plastic — 6 months. "
     "With normal use, the result lasts much longer than the warranty period."),

    ("How long does restoration take?",
     "Local repair (scratch, burn) — 2–4 hours. "
     "Steering wheel rewrap — 2–3 days. Full interior restoration — 3–5 days."),

    ("What types of damage can you repair?",
     "Scratches, scuffs, cigarette burns, tears, holes, "
     "faded color, damaged leather and plastic. "
     "If the damage is too severe, we'll be honest and suggest alternatives."),

    ("Can I customize my steering wheel?",
     "Yes. Choose leather color, type (nappa, perforated, eco-leather), "
     "stitching color and style. Completed in 2–3 days. "
     "We'll show you material samples before starting."),

    ("What materials do you use for steering wheels?",
     "Natural nappa leather, perforated leather, premium eco-leather. "
     "All materials are durable and pleasant to touch. "
     "We match the original or customize to your preference."),

    ("What materials do you use for seats?",
     "Natural leather, eco-leather, fabric, alcantara. "
     "We can restore the original upholstery or fully rewrap in a new material."),

    ("Which plastic elements can be restored?",
     "Dashboard, door panels, center console, armrests, steering column. "
     "We remove scratches, restore texture and color. "
     "For severe damage, we can paint or wrap the elements."),
]

INTERIOR_RESTORATION_KA = [
    ("რა ღირს სალონის რესტავრაცია?",
     "საჭის რესტავრაცია — 280 Gel-დან, სავარძლის — 230 Gel-დან, სახელურის — 190 Gel-დან. "
     "სალონის ელემენტების პოლირება — 200 Gel-დან, პლასტმასის რემონტი — 200 Gel-დან. "
     "გამოგვიგზავნეთ დაზიანების ფოტო WhatsApp-ზე — გეტყვით ზუსტ ფასს."),

    ("შესამჩნევი იქნება რემონტი?",
     "შემთხვევების 90%-ში — არა. ფერსა და ტექსტურას ზუსტად ვარჩევთ ორიგინალის შესაბამისად. "
     "გაჩვენებთ ანალოგიური სამუშაოების ფოტოებს მანამდე/მერე."),

    ("არის თუ არა გარანტია?",
     "დიახ. საჭე — 1 წელი, ტყავის ელემენტები — 6 თვე, პლასტმასა — 6 თვე. "
     "ნორმალური ექსპლუატაციისას შედეგი საგარანტიო ვადაზე გაცილებით მეტს ძლებს."),

    ("რამდენ ხანს გრძელდება რესტავრაცია?",
     "ლოკალური რემონტი (ნაკაწრი, დამწვრობა) — 2–4 საათი. "
     "საჭის გადაკვრა — 2–3 დღე. სალონის კომპლექსური რესტავრაცია — 3–5 დღე."),

    ("რა ტიპის დაზიანებებს აღადგენთ?",
     "ნაკაწრები, გახეხილობა, სიგარეტის დამწვრობა, გახევა, ხვრელები, "
     "გაფერმკრთალებული ფერი, დაზიანებული ტყავი და პლასტმასა. "
     "თუ დაზიანება ძალიან სერიოზულია — გულახდილად გეტყვით და ალტერნატივას შემოგთავაზებთ."),

    ("შესაძლებელია საჭის გადაკვრა ჩემი გემოვნებით?",
     "დიახ. აირჩიეთ ტყავის ფერი, ტიპი (ნაპა, პერფორირებული, ეკოტყავი), "
     "ნაკერის ფერი და სტილი. სრულდება 2–3 დღეში. "
     "მუშაობის დაწყებამდე მასალების ნიმუშებს გაჩვენებთ."),

    ("რა მასალებს იყენებთ საჭისთვის?",
     "ნატურალური ნაპა ტყავი, პერფორირებული ტყავი, პრემიუმ ეკოტყავი. "
     "ყველა მასალა მტკიცეა და სასიამოვნო შეხებით. "
     "ვარჩევთ ორიგინალის მიხედვით ან თქვენი სურვილით."),

    ("რა მასალებს იყენებთ სავარძლებისთვის?",
     "ნატურალური ტყავი, ეკოტყავი, ქსოვილი, ალკანტარა. "
     "შეგვიძლია ორიგინალური გარსაცმის აღდგენა ან ახალ მასალაში სრულად გადაკვრა."),

    ("რომელი პლასტმასის ელემენტების აღდგენა შეიძლება?",
     "ტორპედო, კარის პანელები, ცენტრალური კონსოლი, სახელურები, საჭის სვეტი. "
     "ვაშორებთ ნაკაწრებს, ვაღვდგენთ ტექსტურასა და ფერს. "
     "სერიოზული დაზიანებების დროს შეგვიძლია შეღებვა ან გადაკვრა."),
]

# ──────────────────────────────────────────────────────────
# 5. PAINTLESS DENT REPAIR (PDR)
# ──────────────────────────────────────────────────────────
PDR_RU = [
    ("Сколько стоит удаление вмятины?",
     "Удаление вмятины на одном элементе — от 250 Gel. "
     "Удаление вмятин от града — от 1800 Gel. "
     "Точная цена зависит от размера, расположения и количества вмятин. "
     "Пришлите фото в WhatsApp — оценим бесплатно."),

    ("Будет ли видно место ремонта?",
     "В 95% случаев — нет. Мы проверяем результат при специальном освещении. "
     "Если PDR не подходит для вашего случая — скажем честно и предложим альтернативу."),

    ("Есть ли гарантия?",
     "Да, пожизненная гарантия на работу. "
     "Правильно удаленная вмятина не возвращается — метал принимает исходную форму навсегда."),

    ("Сколько времени занимает удаление?",
     "Мелкая вмятина — 30–60 минут. Несколько вмятин — 2–4 часа. "
     "Градовые повреждения — 1–2 дня. Точные сроки зависят от сложности."),

    ("Какие вмятины можно убрать без покраски?",
     "Любые вмятины без заломов и повреждения лакокрасочного покрытия. "
     "НЕ подходит: острые заломы, повреждения на ребрах жесткости, "
     "вмятины с трещинами краски. В этих случаях нужен кузовной ремонт."),

    ("Почему PDR лучше рихтовки?",
     "PDR сохраняет заводское лакокрасочное покрытие — это важно для стоимости авто. "
     "В 2–3 раза дешевле классической рихтовки с покраской. "
     "Выполняется за часы, а не за дни. Не нужна подменная машина."),

    ("Как проходит процесс PDR?",
     "Осмотр повреждений при специальном освещении. Получение доступа к обратной стороне панели. "
     "Выдавливание вмятины специальными рычагами или клеевая технология (для сложных мест). "
     "Финальная проверка при освещении."),

    ("Нужно ли записываться заранее?",
     "Желательно за 1–2 дня. Мелкие вмятины иногда можем принять в день обращения. "
     "Напишите в WhatsApp — подскажем ближайшее свободное время."),

    ("Что такое PDR?",
     "PDR (Paintless Dent Repair) — технология удаления вмятин без повреждения заводской краски. "
     "Мастер выдавливает вмятину изнутри специальными инструментами, "
     "возвращая металлу оригинальную форму."),
]

PDR_EN = [
    ("How much does dent removal cost?",
     "Single panel dent removal starts from 250 Gel. "
     "Hail damage repair starts from 1800 Gel. "
     "The exact price depends on size, location, and number of dents. "
     "Send a photo on WhatsApp — we'll estimate for free."),

    ("Will the repair spot be visible?",
     "In 95% of cases — no. We verify the result under specialized lighting. "
     "If PDR isn't suitable for your case, we'll be honest and suggest an alternative."),

    ("Is there a warranty?",
     "Yes, lifetime warranty on our work. "
     "A properly removed dent doesn't come back — the metal takes its original shape permanently."),

    ("How long does dent removal take?",
     "Small dent — 30–60 minutes. Multiple dents — 2–4 hours. "
     "Hail damage — 1–2 days. Exact timing depends on complexity."),

    ("What dents can be removed without painting?",
     "Any dents without sharp creases or paint damage. "
     "NOT suitable: sharp creases, damage on body lines, "
     "dents with cracked paint. These cases require traditional body repair."),

    ("Why is PDR better than traditional repair?",
     "PDR preserves the factory paint — important for your car's value. "
     "2–3 times cheaper than traditional repair with repainting. "
     "Done in hours, not days. No need for a rental car."),

    ("How does the PDR process work?",
     "Inspection of damage under specialized lighting. Gaining access to the back of the panel. "
     "Pushing out the dent with special rods or glue pull technique (for hard-to-reach areas). "
     "Final inspection under lighting."),

    ("Do I need to book in advance?",
     "Preferably 1–2 days ahead. Small dents can sometimes be handled same day. "
     "Message us on WhatsApp — we'll suggest the nearest available slot."),

    ("What is PDR?",
     "PDR (Paintless Dent Repair) is a technology for removing dents without damaging factory paint. "
     "A specialist pushes the dent out from the inside using special tools, "
     "returning the metal to its original shape."),
]

PDR_KA = [
    ("რა ღირს ჩაზნექილობის მოცილება?",
     "ერთ ელემენტზე ჩაზნექილობის მოცილება — 250 Gel-დან. "
     "სეტყვის დაზიანების შეკეთება — 1800 Gel-დან. "
     "ზუსტი ფასი დამოკიდებულია ზომაზე, მდებარეობასა და რაოდენობაზე. "
     "გამოგვიგზავნეთ ფოტო WhatsApp-ზე — უფასოდ შევაფასებთ."),

    ("შესამჩნევი იქნება რემონტის ადგილი?",
     "შემთხვევების 95%-ში — არა. შედეგს სპეციალურ განათებაში ვამოწმებთ. "
     "თუ PDR თქვენს შემთხვევას არ შეეფერება — გულახდილად გეტყვით და ალტერნატივას შემოგთავაზებთ."),

    ("არის თუ არა გარანტია?",
     "დიახ, უვადო გარანტია სამუშაოზე. "
     "სწორად მოცილებული ჩაზნექილობა არ ბრუნდება — ლითონი სამუდამოდ იღებს თავდაპირველ ფორმას."),

    ("რამდენ ხანს გრძელდება ჩაზნექილობის მოცილება?",
     "მცირე ჩაზნექილობა — 30–60 წუთი. რამდენიმე ჩაზნექილობა — 2–4 საათი. "
     "სეტყვის დაზიანება — 1–2 დღე. ზუსტი ვადა სირთულეზეა დამოკიდებული."),

    ("რომელი ჩაზნექილობების მოცილება შეიძლება უშეღებავად?",
     "ნებისმიერი ჩაზნექილობა მკვეთრი ნაოჭებისა და საღებავის დაზიანების გარეშე. "
     "არ ვარგა: მკვეთრი ნაოჭები, დაზიანებები სიმტკიცის წიბოებზე, "
     "ბზარიანი საღებავით ჩაზნექილობები. ასეთ შემთხვევებში საჭიროა ტრადიციული კუზოვის რემონტი."),

    ("რატომ არის PDR უკეთესი ტრადიციულ რემონტზე?",
     "PDR ინარჩუნებს ქარხნულ საღებავს — ეს მნიშვნელოვანია ავტომობილის ღირებულებისთვის. "
     "2–3-ჯერ იაფია ვიდრე ტრადიციული რემონტი შეღებვით. "
     "სრულდება საათებში და არა დღეებში. არ გჭირდებათ შემცვლელი მანქანა."),

    ("როგორ მიმდინარეობს PDR პროცესი?",
     "დაზიანების შემოწმება სპეციალურ განათებაში. პანელის უკანა მხარეზე წვდომა. "
     "ჩაზნექილობის ამოწნეხვა სპეციალური ბერკეტებით ან წებოვანი ტექნოლოგიით (რთულ ადგილებში). "
     "საბოლოო შემოწმება განათებაში."),

    ("საჭიროა თუ არა წინასწარ ჩაწერა?",
     "სასურველია 1–2 დღით ადრე. მცირე ჩაზნექილობები ზოგჯერ იმავე დღეს შეგვიძლია. "
     "მოგვწერეთ WhatsApp-ზე — გირჩევთ უახლოეს თავისუფალ დროს."),

    ("რა არის PDR?",
     "PDR (Paintless Dent Repair) — ჩაზნექილობების მოცილების ტექნოლოგია ქარხნული საღებავის დაზიანების გარეშე. "
     "ოსტატი ჩაზნექილობას შიგნიდან ამოწნეხს სპეციალური ინსტრუმენტებით, "
     "ლითონს თავდაპირველ ფორმას უბრუნებს."),
]

# ──────────────────────────────────────────────────────────
# 6. WINDSHIELD REPAIR
# ──────────────────────────────────────────────────────────
WINDSHIELD_RU = [
    ("Сколько стоит ремонт скола?",
     "Скол до 1 см — от 60 Gel, скол 1–2 см — от 80 Gel. "
     "Трещина до 15 см — от 95 Gel, трещина 15–30 см — от 140 Gel. "
     "В 5–10 раз дешевле замены стекла. Пришлите фото в WhatsApp — оценим бесплатно."),

    ("Какие повреждения можно отремонтировать?",
     "Сколы до 25 мм, трещины до 15 см. Чем свежее повреждение — тем лучше результат. "
     "Если в скол уже попала грязь — результат может быть хуже, но ремонт всё равно остановит распространение."),

    ("Есть ли гарантия?",
     "Да, 1 год гарантии на то, что трещина не пойдет дальше. "
     "Полимер, который мы используем, по прочности сопоставим со стеклом."),

    ("Надолго ли хватает ремонта?",
     "На весь срок службы стекла. Качественный полимер после УФ-отверждения "
     "набирает прочность, равную самому стеклу. Ремонт не нужно повторять."),

    ("Сколько времени занимает ремонт?",
     "Скол — 20–30 минут, трещина — 30–60 минут. "
     "Уехать можно сразу после ремонта."),

    ("Когда ремонтировать, а когда менять стекло?",
     "Ремонт: сколы до 25 мм, трещины до 15 см, не на краю стекла. "
     "Замена: трещина от края до края, повреждения в зоне камер/датчиков, "
     "множественные сколы. Подскажем честно, что лучше в вашем случае."),

    ("Будет ли видно место ремонта?",
     "Прозрачность восстанавливается на 90–95%. Мелкая точка может остаться, "
     "но она не мешает обзору и не заметна на расстоянии."),

    ("Нужно ли записываться?",
     "Ремонт сколов — быстрая услуга, часто можем принять в тот же день. "
     "Напишите в WhatsApp — подскажем ближайшее свободное время."),

    ("Как работает ремонт сколов?",
     "Очищаем скол от грязи, вводим специальный полимер под давлением, "
     "отверждаем ультрафиолетом, полируем место ремонта. "
     "Полимер заполняет трещину и восстанавливает прочность стекла."),
]

WINDSHIELD_EN = [
    ("How much does chip repair cost?",
     "Chip up to 1 cm — from 60 Gel, chip 1–2 cm — from 80 Gel. "
     "Crack up to 15 cm — from 95 Gel, crack 15–30 cm — from 140 Gel. "
     "5–10 times cheaper than windshield replacement. Send a photo on WhatsApp — we'll estimate for free."),

    ("What types of damage can be repaired?",
     "Chips up to 25 mm, cracks up to 15 cm. The fresher the damage, the better the result. "
     "If dirt has already entered the chip, the result may be slightly worse, but repair will still stop it from spreading."),

    ("Is there a warranty?",
     "Yes, 1-year warranty that the crack won't spread further. "
     "The polymer we use is comparable in strength to glass itself."),

    ("How long does the repair last?",
     "For the entire lifespan of the windshield. Quality polymer after UV curing "
     "reaches the strength of glass itself. No need to repeat the repair."),

    ("How long does the repair take?",
     "Chip — 20–30 minutes, crack — 30–60 minutes. "
     "You can drive away immediately after repair."),

    ("When to repair and when to replace?",
     "Repair: chips up to 25 mm, cracks up to 15 cm, not on the glass edge. "
     "Replace: edge-to-edge crack, damage in camera/sensor areas, "
     "multiple chips. We'll honestly advise what's best in your case."),

    ("Will the repair spot be visible?",
     "Transparency is restored to 90–95%. A tiny dot may remain, "
     "but it doesn't obstruct visibility and isn't noticeable from a distance."),

    ("Do I need to book in advance?",
     "Chip repair is a quick service — we can often handle it same day. "
     "Message us on WhatsApp — we'll suggest the nearest available slot."),

    ("How does chip repair work?",
     "We clean the chip, inject special polymer under pressure, "
     "cure it with ultraviolet light, then polish the repair area. "
     "The polymer fills the crack and restores the glass strength."),
]

WINDSHIELD_KA = [
    ("რა ღირს ჩიპის შეკეთება?",
     "ჩიპი 1 სმ-მდე — 60 Gel-დან, ჩიპი 1–2 სმ — 80 Gel-დან. "
     "ბზარი 15 სმ-მდე — 95 Gel-დან, ბზარი 15–30 სმ — 140 Gel-დან. "
     "5–10-ჯერ იაფია ვიდრე მინის შეცვლა. გამოგვიგზავნეთ ფოტო WhatsApp-ზე — უფასოდ შევაფასებთ."),

    ("რა ტიპის დაზიანებების შეკეთება შეიძლება?",
     "ჩიპები 25 მმ-მდე, ბზარები 15 სმ-მდე. რაც უფრო ახალია დაზიანება, მით უკეთესი შედეგი. "
     "თუ ჩიპში ჭუჭყი უკვე მოხვდა — შედეგი შეიძლება ცოტა უარესი იყოს, მაგრამ შეკეთება მაინც შეაჩერებს გავრცელებას."),

    ("არის თუ არა გარანტია?",
     "დიახ, 1-წლიანი გარანტია იმაზე, რომ ბზარი შემდეგ არ გაგრძელდება. "
     "პოლიმერი, რომელსაც ვიყენებთ, სიმტკიცით მინას უტოლდება."),

    ("რამდენ ხანს ძლებს შეკეთება?",
     "მინის მთელი ვადის განმავლობაში. ხარისხიანი პოლიმერი UV-გამოშრობის შემდეგ "
     "მინის ტოლ სიმტკიცეს აღწევს. შეკეთების გამეორება არ არის საჭირო."),

    ("რამდენ ხანს გრძელდება შეკეთება?",
     "ჩიპი — 20–30 წუთი, ბზარი — 30–60 წუთი. "
     "შეკეთებისთანავე შეგიძლიათ წახვიდეთ."),

    ("როდის უნდა შეკეთება და როდის შეცვლა?",
     "შეკეთება: ჩიპები 25 მმ-მდე, ბზარები 15 სმ-მდე, არა მინის კიდეზე. "
     "შეცვლა: ბზარი კიდიდან კიდემდე, დაზიანება კამერების/სენსორების ზონაში, "
     "მრავალი ჩიპი. გულახდილად გირჩევთ, რა არის საუკეთესო თქვენს შემთხვევაში."),

    ("შესამჩნევი იქნება შეკეთების ადგილი?",
     "გამჭვირვალობა 90–95%-ით აღდგება. პატარა წერტილი შეიძლება დარჩეს, "
     "მაგრამ ხილვადობას არ აფერხებს და მანძილიდან არ შეიმჩნევა."),

    ("საჭიროა თუ არა წინასწარ ჩაწერა?",
     "ჩიპის შეკეთება სწრაფი მომსახურებაა — ხშირად იმავე დღეს შეგვიძლია. "
     "მოგვწერეთ WhatsApp-ზე — გირჩევთ უახლოეს თავისუფალ დროს."),

    ("როგორ მუშაობს ჩიპის შეკეთება?",
     "ვასუფთავებთ ჩიპს, წნევით შეგვაქვს სპეციალური პოლიმერი, "
     "ულტრაიისფერით ვამაგრებთ, შემდეგ ვაპოლირებთ. "
     "პოლიმერი ბზარს ავსებს და მინის სიმტკიცეს აღადგენს."),
]

# ──────────────────────────────────────────────────────────
# 7. VINYL WRAPPING
# ──────────────────────────────────────────────────────────
VINYL_RU = [
    ("Сколько стоит оклейка винилом?",
     "Антихром (оклеивание хром-элементов) — от 300 Gel, частичная оклейка или логотип — от 400 Gel. "
     "Полная оклейка автомобиля — от 6500 Gel. "
     "Напишите в WhatsApp — рассчитаем стоимость для вашего автомобиля."),

    ("Какие пленки используете?",
     "3M, Oracal, Hexis, KPMF — проверенные мировые бренды. "
     "Доступны варианты: глянец, мат, сатин, хром, карбон, "
     "перламутр и другие текстуры. Покажем образцы перед началом работы."),

    ("Есть ли гарантия?",
     "Да. Гарантия на работу — 1 год, на пленку — по гарантии производителя (до 3–5 лет). "
     "При правильном уходе пленка служит значительно дольше."),

    ("На сколько хватает винила?",
     "3–5 лет при нормальной эксплуатации. Темные цвета служат дольше. "
     "Стоянка под солнцем сокращает срок. Гаражное хранение продлевает."),

    ("Сколько времени занимает оклейка?",
     "Отдельный элемент — 2–4 часа. Полная оклейка кузова — 3–5 дней. "
     "Сложные цвета и текстуры могут потребовать больше времени."),

    ("Можно ли снять пленку потом?",
     "Да, без повреждения краски. Профессиональные пленки снимаются чисто. "
     "Под пленкой краска сохраняется как новая — это дополнительная защита ЛКП."),

    ("Ляжет ли пленка на сложные поверхности?",
     "Да, профессиональные пленки хорошо тянутся и ложатся на рельеф, молдинги, "
     "изгибы. На поврежденные поверхности — сначала подготовка (шпаклевка, грунт)."),

    ("Можно ли оклеить самостоятельно?",
     "Мелкие элементы (зеркала, ручки) — можно попробовать. "
     "Крупные панели — пузыри, заломы, кривые стыки. Переделка обойдется дороже. "
     "Профессиональная оклейка экономит время и нервы."),

    ("Повредит ли пленка краску?",
     "Нет. Качественная пленка снимается чисто и даже защищает ЛКП от сколов и царапин. "
     "Единственное ограничение: не клеить на свежую краску (выждать минимум 30 дней)."),
]

VINYL_EN = [
    ("How much does vinyl wrapping cost?",
     "Anti-chrome (chrome elements wrapping) — from 300 Gel, partial wrap or logo — from 400 Gel. "
     "Full body wrap — from 6500 Gel. "
     "Message us on WhatsApp — we'll calculate the price for your car."),

    ("What films do you use?",
     "3M, Oracal, Hexis, KPMF — trusted global brands. "
     "Options available: gloss, matte, satin, chrome, carbon, "
     "pearl, and other textures. We'll show you samples before starting."),

    ("Is there a warranty?",
     "Yes. Warranty on work — 1 year, on film — per manufacturer warranty (up to 3–5 years). "
     "With proper care, the film lasts significantly longer."),

    ("How long does vinyl last?",
     "3–5 years with normal use. Darker colors last longer. "
     "Parking in direct sunlight shortens lifespan. Garage storage extends it."),

    ("How long does wrapping take?",
     "Single element — 2–4 hours. Full body wrap — 3–5 days. "
     "Complex colors and textures may require more time."),

    ("Can the film be removed later?",
     "Yes, without damaging the paint. Professional films come off cleanly. "
     "Paint underneath stays like new — it's additional paint protection."),

    ("Will the film stick to complex surfaces?",
     "Yes, professional films stretch well and conform to contours, moldings, "
     "and curves. Damaged surfaces need preparation first (filler, primer)."),

    ("Can I wrap my car myself?",
     "Small elements (mirrors, handles) — you can try. "
     "Large panels — bubbles, creases, uneven seams. Redo will cost more. "
     "Professional wrapping saves time and hassle."),

    ("Will the film damage my paint?",
     "No. Quality film comes off cleanly and even protects paint from chips and scratches. "
     "Only limitation: don't apply on fresh paint (wait at least 30 days)."),
]

VINYL_KA = [
    ("რა ღირს ვინილით დაფარვა?",
     "ანტიქრომი (ქრომ-ელემენტების დაფარვა) — 300 Gel-დან, ნაწილობრივი დაფარვა ან ლოგო — 400 Gel-დან. "
     "კუზოვის სრული დაფარვა — 6500 Gel-დან. "
     "მოგვწერეთ WhatsApp-ზე — გამოვთვლით ფასს თქვენი ავტომობილისთვის."),

    ("რა ფირებს იყენებთ?",
     "3M, Oracal, Hexis, KPMF — სანდო მსოფლიო ბრენდები. "
     "ხელმისაწვდომია: გლოსი, მატი, სატინი, ქრომი, კარბონი, "
     "მარგალიტი და სხვა ტექსტურები. მუშაობის დაწყებამდე ნიმუშებს გაჩვენებთ."),

    ("არის თუ არა გარანტია?",
     "დიახ. გარანტია სამუშაოზე — 1 წელი, ფირზე — მწარმოებლის გარანტიით (3–5 წლამდე). "
     "სწორი მოვლით ფირი გაცილებით მეტს ძლებს."),

    ("რამდენ ხანს ძლებს ვინილი?",
     "3–5 წელი ნორმალური ექსპლუატაციისას. მუქი ფერები უფრო მეტს ძლებს. "
     "მზეზე დგომა ამცირებს ვადას. ავტოფარეხში შენახვა ახანგრძლივებს."),

    ("რამდენ ხანს გრძელდება დაფარვა?",
     "ცალკეული ელემენტი — 2–4 საათი. კუზოვის სრული დაფარვა — 3–5 დღე. "
     "რთული ფერები და ტექსტურები შეიძლება მეტ დროს მოითხოვდეს."),

    ("შესაძლებელია თუ არა ფირის შემდეგ მოხსნა?",
     "დიახ, საღებავის დაზიანების გარეშე. პროფესიონალური ფირები სუფთად იხსნება. "
     "ფირის ქვეშ საღებავი ახალივით რჩება — ეს დამატებითი დაცვაა."),

    ("დაეწყობა ფირი რთულ ზედაპირებს?",
     "დიახ, პროფესიონალური ფირები კარგად იჭიმება და რელიეფს, მოლდინგებს, "
     "მოსახვევებს ეწყობა. დაზიანებულ ზედაპირებს ჯერ მომზადება სჭირდებათ."),

    ("შემიძლია თუ არა თვითონ დაფარვა?",
     "მცირე ელემენტები (სარკეები, სახელურები) — შეგიძლიათ სცადოთ. "
     "დიდი პანელები — ბუშტუკები, ნაოჭები, არათანაბარი ნაკერები. გადაკეთება უფრო ძვირი დაჯდება. "
     "პროფესიონალური დაფარვა დროსა და ნერვებს ზოგავს."),

    ("ფირი ხომ არ დააზიანებს საღებავს?",
     "არა. ხარისხიანი ფირი სუფთად იხსნება და საღებავს ჩიპებისა და ნაკაწრებისგანაც კი იცავს. "
     "ერთადერთი შეზღუდვა: არ დააკაროთ ახალ საღებავზე (მინიმუმ 30 დღე დაელოდეთ)."),
]

# ──────────────────────────────────────────────────────────
# 8. AUTO GLASS TINTING
# ──────────────────────────────────────────────────────────
TINTING_RU = [
    ("Сколько стоит тонировка?",
     "Тонировка боковых стекол (задних или передних) — от 130 Gel, заднее стекло — от 160 Gel, "
     "лобовое стекло — от 290 Gel. Атермальная тонировка стоит дороже. "
     "Напишите в WhatsApp — рассчитаем точную стоимость для вашего автомобиля."),

    ("Какую пленку используете?",
     "LLumar — мы официальный дилер. Гарантия от производителя до 5 лет. "
     "Не используем дешевые китайские аналоги, которые выгорают за полгода."),

    ("Есть ли гарантия?",
     "Да. Гарантия на работу — 1 год, на пленку LLumar — до 5 лет от производителя. "
     "При нормальной эксплуатации пленка служит значительно дольше."),

    ("Легальна ли тонировка в Грузии?",
     "Да. Передние боковые — не менее 60% пропускания света, задние — не менее 75%, "
     "заднее стекло — без ограничений. Мы подберем пленку строго в рамках закона."),

    ("Сколько времени занимает тонировка?",
     "2–4 часа в зависимости от количества стекол. "
     "Важно: не опускайте стекла 3 дня после установки, чтобы пленка полностью приклеилась."),

    ("Зачем тонировать стекла?",
     "Блокирует 99% ультрафиолета, снижает нагрев салона на 60%, "
     "обеспечивает приватность. В условиях Тбилиси — это необходимость, а не роскошь."),

    ("Что такое атермальная тонировка?",
     "Атермальная пленка отражает до 60% тепла, оставаясь почти прозрачной. "
     "Идеальна для лобового и передних стекол. Кондиционер работает эффективнее, "
     "расход топлива на охлаждение снижается."),

    ("Можно ли затонировать самостоятельно?",
     "Пузыри, пыль под пленкой, кривые края — типичные проблемы самостоятельной тонировки. "
     "Переклейка обойдется дороже. Профессиональная установка занимает 2–4 часа "
     "и результат гарантирован."),
]

TINTING_EN = [
    ("How much does window tinting cost?",
     "Side windows (rear or front) — from 130 Gel, rear windshield — from 160 Gel, "
     "front windshield — from 290 Gel. Ceramic (athermal) tinting costs more. "
     "Message us on WhatsApp — we'll calculate the exact price for your car."),

    ("What film do you use?",
     "LLumar — we are an official dealer. Manufacturer warranty up to 5 years. "
     "We don't use cheap Chinese alternatives that fade in six months."),

    ("Is there a warranty?",
     "Yes. Warranty on work — 1 year, on LLumar film — up to 5 years from the manufacturer. "
     "With normal use, the film lasts significantly longer."),

    ("Is window tinting legal in Georgia?",
     "Yes. Front side windows must allow at least 60% light, rear at least 75%, "
     "rear windshield has no restrictions. We select film strictly within the law."),

    ("How long does tinting take?",
     "2–4 hours depending on the number of windows. "
     "Important: don't lower windows for 3 days after installation to let the film fully adhere."),

    ("Why tint your windows?",
     "Blocks 99% of UV rays, reduces cabin heat by 60%, "
     "provides privacy. In Tbilisi's climate, it's a necessity, not a luxury."),

    ("What is ceramic (athermal) tinting?",
     "Ceramic film reflects up to 60% of heat while remaining nearly transparent. "
     "Ideal for windshield and front windows. Air conditioning works more efficiently, "
     "fuel consumption for cooling decreases."),

    ("Can I tint my windows myself?",
     "Bubbles, dust under the film, crooked edges — typical problems of DIY tinting. "
     "Re-doing it will cost more. Professional installation takes 2–4 hours "
     "and the result is guaranteed."),
]

TINTING_KA = [
    ("რა ღირს მინების ტონირება?",
     "გვერდითა მინები (უკანა ან წინა) — 130 Gel-დან, უკანა მინა — 160 Gel-დან, "
     "საქარე მინა — 290 Gel-დან. ათერმული ტონირება უფრო ძვირია. "
     "მოგვწერეთ WhatsApp-ზე — გამოვთვლით ზუსტ ფასს თქვენი ავტომობილისთვის."),

    ("რა ფირს იყენებთ?",
     "LLumar — ჩვენ ოფიციალური დილერი ვართ. მწარმოებლის გარანტია 5 წლამდე. "
     "არ ვიყენებთ იაფ ჩინურ ანალოგებს, რომლებიც ნახევარ წელში ფერმკრთალდება."),

    ("არის თუ არა გარანტია?",
     "დიახ. სამუშაოზე გარანტია — 1 წელი, LLumar ფირზე — მწარმოებლისგან 5 წლამდე. "
     "ნორმალური ექსპლუატაციისას ფირი გაცილებით მეტს ძლებს."),

    ("კანონიერია თუ არა ტონირება საქართველოში?",
     "დიახ. წინა გვერდითა მინები — მინიმუმ 60% სინათლის გატარება, უკანა — მინიმუმ 75%, "
     "უკანა მინა — შეზღუდვის გარეშე. ფირს მკაცრად კანონის ფარგლებში ვარჩევთ."),

    ("რამდენ ხანს გრძელდება ტონირება?",
     "2–4 საათი მინების რაოდენობის მიხედვით. "
     "მნიშვნელოვანი: დაყენებიდან 3 დღე არ ჩამოუშვათ მინები, რათა ფირი სრულად მოეწყოს."),

    ("რატომ უნდა ტონირება მინებისა?",
     "ბლოკავს ულტრაიისფერის 99%-ს, ამცირებს სალონის გახურებას 60%-ით, "
     "უზრუნველყოფს კონფიდენციალურობას. თბილისის კლიმატში ეს აუცილებლობაა და არა ფუფუნება."),

    ("რა არის ათერმული ტონირება?",
     "ათერმული ფირი სითბოს 60%-მდე ასხივებს თითქმის გამჭვირვალე რჩება. "
     "იდეალურია საქარე და წინა მინებისთვის. კონდიციონერი უფრო ეფექტურად მუშაობს, "
     "საწვავის ხარჯი გაგრილებაზე მცირდება."),

    ("შემიძლია თუ არა მინების თვითონ ტონირება?",
     "ბუშტუკები, მტვერი ფირის ქვეშ, მრუდე კიდეები — თვითტონირების ტიპიური პრობლემებია. "
     "გადაკეთება უფრო ძვირი დაჯდება. პროფესიონალური დაყენება 2–4 საათს იღებს "
     "და შედეგი გარანტირებულია."),
]

# ──────────────────────────────────────────────────────────
# 9. CAR SOUNDPROOFING
# ──────────────────────────────────────────────────────────
SOUND_RU = [
    ("Сколько стоит шумоизоляция?",
     "Шумоизоляция дверей — от 900 Gel, пола — от 1000 Gel, багажника — от 600 Gel, "
     "колесных арок — от 600 Gel. Полная шумоизоляция автомобиля — от 2100 Gel. "
     "Напишите в WhatsApp для расчета стоимости."),

    ("Есть ли гарантия?",
     "Да, 2 года гарантии на работу. Материалы служат весь срок эксплуатации автомобиля. "
     "За всё время работы ни одного гарантийного случая."),

    ("Насколько тише станет в салоне?",
     "Снижение шума на 30–50% (3–8 дБ). Разница ощущается сразу — "
     "особенно на трассе и по грунтовым дорогам. Аудиосистема зазвучит значительно лучше."),

    ("Сколько времени занимает установка?",
     "Двери — 1 день, пол — 1–2 дня, полная шумоизоляция — 3–5 дней. "
     "Сложность зависит от модели автомобиля."),

    ("Какие зоны можно шумоизолировать?",
     "Двери, пол, потолок, арки, моторный щит, багажник. "
     "Двери + пол дают 70% эффекта за 40% стоимости полной шумоизоляции — "
     "это оптимальный вариант для большинства автомобилей."),

    ("Какие материалы используете?",
     "STP, Шумoff, Comfort Mat — ведущие бренды. "
     "Все материалы сертифицированы, не имеют запаха, "
     "не впитывают влагу и не вызывают коррозию."),

    ("Как проходит установка?",
     "Полная разборка обрабатываемых зон, обезжиривание. "
     "Укладка 2+ слоев: виброизоляция + шумоизоляция. Сборка с проверкой всех креплений. "
     "Предоставляем фотоотчет о каждом этапе."),

    ("Можно ли сделать шумоизоляцию самостоятельно?",
     "Двери — теоретически можно, но нужен опыт разборки. "
     "Пол и потолок — не рекомендуем: электрика, подушки безопасности, риск скрипов при сборке. "
     "Ошибки в сборке приведут к посторонним звукам."),

    ("Что такое шумоизоляция автомобиля?",
     "Это установка специальных материалов (вибро- и шумопоглощающих) "
     "на кузовные панели автомобиля. Снижает дорожный шум, вибрации, "
     "улучшает комфорт и качество звука аудиосистемы."),
]

SOUND_EN = [
    ("How much does soundproofing cost?",
     "Door soundproofing — from 900 Gel, floor — from 1000 Gel, trunk — from 600 Gel, "
     "wheel arches — from 600 Gel. Full car soundproofing — from 2100 Gel. "
     "Message us on WhatsApp for a price quote."),

    ("Is there a warranty?",
     "Yes, 2-year warranty on workmanship. Materials last the entire life of the car. "
     "In all our years of work, not a single warranty case."),

    ("How much quieter will the cabin be?",
     "Noise reduction of 30–50% (3–8 dB). The difference is noticeable immediately — "
     "especially on highways and gravel roads. Your audio system will sound much better too."),

    ("How long does installation take?",
     "Doors — 1 day, floor — 1–2 days, full soundproofing — 3–5 days. "
     "Complexity depends on the car model."),

    ("What areas can be soundproofed?",
     "Doors, floor, roof, wheel arches, firewall, trunk. "
     "Doors + floor provide 70% of the effect for 40% of the full soundproofing cost — "
     "the optimal choice for most cars."),

    ("What materials do you use?",
     "STP, Shumoff, Comfort Mat — leading brands. "
     "All materials are certified, odorless, "
     "moisture-resistant, and non-corrosive."),

    ("How does the installation process work?",
     "Complete disassembly of treated areas, degreasing. "
     "Laying 2+ layers: vibration damping + sound insulation. Reassembly with fastener checks. "
     "We provide a photo report of every stage."),

    ("Can I do soundproofing myself?",
     "Doors — theoretically possible, but requires disassembly experience. "
     "Floor and roof — not recommended: wiring, airbags, risk of rattles during reassembly. "
     "Assembly mistakes will lead to unwanted noises."),

    ("What is car soundproofing?",
     "It's the installation of special materials (vibration-dampening and sound-absorbing) "
     "on the car's body panels. Reduces road noise, vibrations, "
     "improves comfort and audio system sound quality."),
]

SOUND_KA = [
    ("რა ღირს ხმაურის იზოლაცია?",
     "კარების ხმაურიზოლაცია — 900 Gel-დან, იატაკის — 1000 Gel-დან, საბარგულის — 600 Gel-დან, "
     "თაღების — 600 Gel-დან. ავტომობილის სრული ხმაურიზოლაცია — 2100 Gel-დან. "
     "მოგვწერეთ WhatsApp-ზე ფასის გათვლისთვის."),

    ("არის თუ არა გარანტია?",
     "დიახ, 2-წლიანი გარანტია სამუშაოზე. მასალები ავტომობილის მთელი ვადის განმავლობაში ძლებს. "
     "მუშაობის მთელი პერიოდის განმავლობაში არცერთი საგარანტიო შემთხვევა."),

    ("რამდენად ჩუმად გახდება სალონში?",
     "ხმაურის შემცირება 30–50%-ით (3–8 დბ). სხვაობა მაშინვე იგრძნობა — "
     "განსაკუთრებით ავტობანზე და გრუნტის გზებზე. აუდიოსისტემაც გაცილებით უკეთ ჟღერს."),

    ("რამდენ ხანს გრძელდება მონტაჟი?",
     "კარები — 1 დღე, იატაკი — 1–2 დღე, სრული ხმაურიზოლაცია — 3–5 დღე. "
     "სირთულე ავტომობილის მოდელზეა დამოკიდებული."),

    ("რომელი ზონების ხმაურიზოლაცია შეიძლება?",
     "კარები, იატაკი, ჭერი, თაღები, ძრავის ფარი, საბარგული. "
     "კარები + იატაკი ეფექტის 70%-ს იძლევა სრული ხმაურიზოლაციის ღირებულების 40%-ად — "
     "ეს ოპტიმალური ვარიანტია უმეტესი ავტომობილებისთვის."),

    ("რა მასალებს იყენებთ?",
     "STP, Shumoff, Comfort Mat — წამყვანი ბრენდები. "
     "ყველა მასალა სერტიფიცირებულია, უსუნოა, "
     "არ შთანთქავს ტენს და არ იწვევს კოროზიას."),

    ("როგორ მიმდინარეობს მონტაჟი?",
     "დამუშავებული ზონების სრული დაშლა, ცხიმის მოცილება. "
     "2+ ფენის დაგება: ვიბრო-იზოლაცია + ხმაურ-იზოლაცია. აწყობა სამაგრების შემოწმებით. "
     "ყოველი ეტაპის ფოტოანგარიშს გაწვდით."),

    ("შემიძლია თუ არა ხმაურიზოლაციის თვითონ გაკეთება?",
     "კარები — თეორიულად შესაძლებელია, მაგრამ დაშლის გამოცდილება სჭირდება. "
     "იატაკი და ჭერი — არ გირჩევთ: ელექტროგაყვანილობა, ბალიშები, აწყობისას ხმაურის რისკი. "
     "აწყობის შეცდომები არასასურველ ხმაურებს გამოიწვევს."),

    ("რა არის ავტომობილის ხმაურის იზოლაცია?",
     "ეს არის სპეციალური მასალების (ვიბრო- და ხმაურშთამნთქმელი) "
     "დაყენება ავტომობილის კუზოვის პანელებზე. ამცირებს გზის ხმაურს, ვიბრაციას, "
     "აუმჯობესებს კომფორტს და აუდიოსისტემის ხმის ხარისხს."),
]

# ──────────────────────────────────────────────────────────
# 10. COMPUTER DIAGNOSTICS
# ──────────────────────────────────────────────────────────
DIAG_RU = [
    ("Сколько стоит компьютерная диагностика?",
     "Полная диагностика — от 50 Gel, программирование ключа — от 200 Gel. "
     "Напишите в WhatsApp для уточнения стоимости."),

    ("Что если найдутся проблемы?",
     "Вы получите подробный отчет с описанием каждой ошибки, фото и рекомендациями. "
     "Мы расставляем приоритеты: что критично, что может подождать. "
     "Решение о ремонте всегда за вами."),

    ("Сколько времени занимает диагностика?",
     "Базовая — 30–40 минут, расширенная — 1–1.5 часа. "
     "Результат получаете сразу по окончании."),

    ("Какие автомобили диагностируете?",
     "Все марки и модели. Мультимарочные сканеры + дилерское ПО для популярных брендов. "
     "Электромобили и гибриды — тоже."),

    ("Когда нужна компьютерная диагностика?",
     "Загорелся Check Engine, перед покупкой б/у авто, после ДТП, "
     "потеря мощности, повышенный расход топлива. "
     "Для профилактики рекомендуем раз в год."),

    ("Можете ли сбросить ошибки?",
     "Да, но только после выяснения причины. Простой сброс без устранения причины бессмысленен — "
     "ошибка вернется. Мы всегда объясняем, что вызвало ошибку и нужен ли ремонт."),

    ("Делаете ли проверку перед покупкой?",
     "Да, это одна из наших ключевых услуг. Проверяем все системы, пробег (скрученный или нет), "
     "историю ошибок, состояние АКБ, работу двигателя и трансмиссии. "
     "Полный отчет — честная картина состояния автомобиля."),

    ("Можно ли сделать диагностику самостоятельно?",
     "OBD2-сканер за 30–50 Gel показывает базовые ошибки двигателя. "
     "Но он не видит 80% систем: подушки безопасности, АБС, трансмиссию, климат-контроль. "
     "Профессиональная диагностика охватывает все системы автомобиля."),
]

DIAG_EN = [
    ("How much does computer diagnostics cost?",
     "Full diagnostics — from 50 Gel, key programming — from 200 Gel. "
     "Message us on WhatsApp for pricing details."),

    ("What if problems are found?",
     "You'll receive a detailed report with each error described, photos, and recommendations. "
     "We prioritize issues: what's critical, what can wait. "
     "The decision to repair is always yours."),

    ("How long does diagnostics take?",
     "Basic — 30–40 minutes, extended — 1–1.5 hours. "
     "You get results immediately upon completion."),

    ("What cars do you diagnose?",
     "All makes and models. Multi-brand scanners plus dealer software for popular brands. "
     "Electric vehicles and hybrids included."),

    ("When do you need computer diagnostics?",
     "Check Engine light on, before buying a used car, after an accident, "
     "power loss, increased fuel consumption. "
     "For prevention, we recommend once a year."),

    ("Can you clear error codes?",
     "Yes, but only after identifying the cause. Simply clearing codes without fixing the issue is pointless — "
     "the error will return. We always explain what caused the error and whether repair is needed."),

    ("Do you offer pre-purchase inspections?",
     "Yes, it's one of our key services. We check all systems, mileage (rolled back or not), "
     "error history, battery condition, engine and transmission performance. "
     "Full report — an honest picture of the car's condition."),

    ("Can I run diagnostics myself?",
     "An OBD2 scanner for 30–50 Gel shows basic engine errors. "
     "But it misses 80% of systems: airbags, ABS, transmission, climate control. "
     "Professional diagnostics covers all vehicle systems."),
]

DIAG_KA = [
    ("რა ღირს კომპიუტერული დიაგნოსტიკა?",
     "სრული დიაგნოსტიკა — 50 Gel-დან, გასაღების დაპროგრამება — 200 Gel-დან. "
     "მოგვწერეთ WhatsApp-ზე ფასის დასაზუსტებლად."),

    ("რა მოხდება, თუ პრობლემები აღმოჩნდება?",
     "მიიღებთ დეტალურ ანგარიშს ყოველი შეცდომის აღწერით, ფოტოებითა და რეკომენდაციებით. "
     "პრიორიტეტებს ვადგენთ: რა არის კრიტიკული, რა შეიძლება დაელოდოს. "
     "რემონტის გადაწყვეტილება ყოველთვის თქვენია."),

    ("რამდენ ხანს გრძელდება დიაგნოსტიკა?",
     "ბაზისური — 30–40 წუთი, გაფართოებული — 1–1.5 საათი. "
     "შედეგს დასრულებისთანავე მიიღებთ."),

    ("რა ავტომობილებს ამოწმებთ?",
     "ყველა მარკასა და მოდელს. მულტიმარკიანი სკანერები + დილერის პროგრამული უზრუნველყოფა პოპულარული ბრენდებისთვის. "
     "ელექტრომობილები და ჰიბრიდები — ასევე."),

    ("როდის არის საჭირო კომპიუტერული დიაგნოსტიკა?",
     "Check Engine ანთია, მეორადი ავტო ყიდვამდე, ავარიის შემდეგ, "
     "სიმძლავრის დაკარგვა, საწვავის გაზრდილი ხარჯი. "
     "პროფილაქტიკისთვის გირჩევთ წელიწადში ერთხელ."),

    ("შეგიძლიათ შეცდომების წაშლა?",
     "დიახ, მაგრამ მხოლოდ მიზეზის გარკვევის შემდეგ. კოდების უბრალოდ წაშლა მიზეზის აღმოფხვრის გარეშე აზრს მოკლებულია — "
     "შეცდომა დაბრუნდება. ყოველთვის ავხსნით, რამ გამოიწვია შეცდომა და საჭიროა თუ არა რემონტი."),

    ("აკეთებთ თუ არა ყიდვამდე შემოწმებას?",
     "დიახ, ეს ერთ-ერთი ჩვენი მთავარი მომსახურებაა. ვამოწმებთ ყველა სისტემას, გარბენს (დატრიალებულია თუ არა), "
     "შეცდომების ისტორიას, აკუმულატორის მდგომარეობას, ძრავისა და ტრანსმისიის მუშაობას. "
     "სრული ანგარიში — ავტომობილის მდგომარეობის გულახდილი სურათი."),

    ("შემიძლია თუ არა დიაგნოსტიკის თვითონ გაკეთება?",
     "OBD2-სკანერი 30–50 Gel-ად ძრავის ბაზისურ შეცდომებს აჩვენებს. "
     "მაგრამ სისტემების 80%-ს ვერ ხედავს: ბალიშები, ABS, ტრანსმისია, კლიმატ-კონტროლი. "
     "პროფესიონალური დიაგნოსტიკა ავტომობილის ყველა სისტემას მოიცავს."),
]

# ═══════════════════════════════════════════════════════════
# PAGE CONFIGURATION: file, t585 rec ID, heading rec ID
# ═══════════════════════════════════════════════════════════
PAGES = [
    # 1. Polishing
    {'file': 'page36909398.html', 'rec': '596230523', 'heading': '596230522', 'items': POLISHING_RU},
    {'file': 'page36963983.html', 'rec': '597103985', 'heading': '597103984', 'items': POLISHING_EN},
    {'file': 'page37069117.html', 'rec': '598873526', 'heading': '598873525', 'items': POLISHING_KA},
    # 2. Ceramic coating
    {'file': 'page36860233.html', 'rec': '595379635', 'heading': '595379634', 'items': CERAMIC_RU},
    {'file': 'page36963967.html', 'rec': '597103693', 'heading': '597103692', 'items': CERAMIC_EN},
    {'file': 'page37069115.html', 'rec': '598873441', 'heading': '598873440', 'items': CERAMIC_KA},
    # 3. Interior cleaning
    {'file': 'page36940808.html', 'rec': '713431686', 'heading': '713431685', 'items': INTERIOR_CLEANING_RU},
    {'file': 'page36963977.html', 'rec': '597103832', 'heading': '597103831', 'items': INTERIOR_CLEANING_EN},
    {'file': 'page37069123.html', 'rec': '598873695', 'heading': '598873694', 'items': INTERIOR_CLEANING_KA},
    # 4. Interior restoration
    {'file': 'page36918868.html', 'rec': '596381185', 'heading': '596381184', 'items': INTERIOR_RESTORATION_RU},
    {'file': 'page36963981.html', 'rec': '597103932', 'heading': '597103931', 'items': INTERIOR_RESTORATION_EN},
    {'file': 'page37069119.html', 'rec': '598873597', 'heading': '598873596', 'items': INTERIOR_RESTORATION_KA},
    # 5. Paintless dent repair
    {'file': 'page37217237.html', 'rec': '601297049', 'heading': '601297048', 'items': PDR_RU},
    {'file': 'page37355650.html', 'rec': '603498101', 'heading': '603498100', 'items': PDR_EN},
    {'file': 'page37387217.html', 'rec': '604008183', 'heading': '604008182', 'items': PDR_KA},
    # 6. Windshield repair
    {'file': 'page36976392.html', 'rec': '597296962', 'heading': '597296961', 'items': WINDSHIELD_RU},
    {'file': 'page37043952.html', 'rec': '598440249', 'heading': '598440248', 'items': WINDSHIELD_EN},
    {'file': 'page37069127.html', 'rec': '598873770', 'heading': '598873769', 'items': WINDSHIELD_KA},
    # 7. Vinyl wrapping
    {'file': 'page37146793.html', 'rec': '600149207', 'heading': '600149206', 'items': VINYL_RU},
    {'file': 'page37329658.html', 'rec': '603097589', 'heading': '603097588', 'items': VINYL_EN},
    {'file': 'page37334532.html', 'rec': '603170641', 'heading': '603170640', 'items': VINYL_KA},
    # 8. Auto glass tinting
    {'file': 'page37185964.html', 'rec': '600789047', 'heading': '600789046', 'items': TINTING_RU},
    {'file': 'page37355656.html', 'rec': '603498247', 'heading': '603498246', 'items': TINTING_EN},
    {'file': 'page37387198.html', 'rec': '604007930', 'heading': '604007929', 'items': TINTING_KA},
    # 9. Car soundproofing
    {'file': 'page37185977.html', 'rec': '600789279', 'heading': '600789278', 'items': SOUND_RU},
    {'file': 'page37355654.html', 'rec': '603498162', 'heading': '603498161', 'items': SOUND_EN},
    {'file': 'page37387205.html', 'rec': '604008005', 'heading': '604008004', 'items': SOUND_KA},
    # 10. Computer diagnostics
    {'file': 'page37767785.html', 'rec': '610181651', 'heading': '610181650', 'items': DIAG_RU},
    {'file': 'page38015949.html', 'rec': '614236053', 'heading': '614236052', 'items': DIAG_EN},
    {'file': 'page38016286.html', 'rec': '614240646', 'heading': '614240645', 'items': DIAG_KA},
]


def main():
    print("=== FAQ Batch Update ===\n")

    # First, verify heading rec IDs exist (they should be heading_id = rec_id - 1)
    # If not found, we'll search for the actual heading
    for page in PAGES:
        filepath = os.path.join(BASE, page['file'])
        if not os.path.exists(filepath):
            print(f"  MISSING: {page['file']}")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()

        # Verify heading rec ID
        heading_marker = f'id="rec{page["heading"]}"'
        if heading_marker not in html:
            # Try to find the heading rec by looking for the t017 before the t585
            t585_marker = f'id="rec{page["rec"]}"'
            t585_idx = html.find(t585_marker)
            if t585_idx >= 0:
                # Look backwards for the nearest rec with data-record-type="33"
                before = html[:t585_idx]
                # Find last rec33 before t585
                matches = list(re.finditer(r'id="rec(\d+)"[^>]*data-record-type="33"', before))
                if not matches:
                    matches = list(re.finditer(r'data-record-type="33"[^>]*id="rec(\d+)"', before))
                if matches:
                    actual_heading_id = matches[-1].group(1)
                    print(f"  {page['file']}: heading rec corrected {page['heading']} -> {actual_heading_id}")
                    page['heading'] = actual_heading_id
                else:
                    print(f"  {page['file']}: WARNING - no heading rec found before t585")
            else:
                print(f"  {page['file']}: WARNING - t585 rec{page['rec']} not found!")

    print()

    for page in PAGES:
        filepath = os.path.join(BASE, page['file'])
        if not os.path.exists(filepath):
            continue
        process_page(page['file'], page['rec'], page['heading'], page['items'])

    print("\n=== Done! ===")


if __name__ == '__main__':
    main()

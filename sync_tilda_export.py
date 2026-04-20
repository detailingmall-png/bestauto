#!/usr/bin/env python3
"""
Apply the same vinyl->ColorPPF transformations to the tilda-export full HTML files.
These are the files Astro actually reads at build time.
"""

import sys
import os

BASE = "/Users/fedorzubrickij/Documents/Projects CODE/bestauto-site"

# Import the transformation functions from existing scripts
sys.path.insert(0, BASE)


def apply_ru_transforms(html: str) -> str:
    """Apply all RU transformations from transform_vinyl_to_color_ppf.py logic."""
    # Hero title
    html = html.replace(
        "Виниловая оклейка автомобиля в Тбилиси",
        'Оклейка цветной <s style="opacity:0.5">виниловой</s> полиуретановой (PPF) защитной плёнкой в Тбилиси'
    )

    # Hero description
    html = html.replace(
        '<span style="font-weight: 500;">Мы оказываем услуги по оклейке автомобилей виниловой пленкой в Тбилиси, что позволяет быстро и недорого изменить внешний вид автомобиля, без покраски, и защитить его. </span>',
        '<span style="font-weight: 500;">Гарантия 10 лет · Quantum, LuxArmor плёнки · 2000+ защищённых автомобилей</span>'
    )

    # Hero button
    html = html.replace(
        '<span class="t-btnflex__text">Записаться</span>',
        '<span class="t-btnflex__text">Записаться на бесплатный осмотр</span>'
    )

    # Advantages title
    html = html.replace(
        "Преимущества оклейки авто виниловой пленкой",
        "Преимущества цветной защитной плёнки"
    )

    # Advantage item 1
    html = html.replace("Защита от повреждений", "Защита + смена цвета")
    html = html.replace(
        "Виниловая пленка обладает защитными свойствами, которые помогают защитить кузов автомобиля от царапин, сколов и мелких повреждений. Она создает дополнительный защитный слой.",
        "Два в одном: меняет цвет автомобиля и одновременно защищает кузов от сколов, царапин и гравия. Толщина 175\u2013230 мкм \u2014 в 2\u20133 раза толще винила."
    )

    # Advantage item 2
    html = html.replace("Изменение внешнего вида", "Самовосстановление царапин")
    html = html.replace(
        "Виниловая пленка предлагает широкий выбор цветов, оттенков и текстур, что позволяет владельцам автомобилей изменить внешний вид своих автомобилей на любой вкус.",
        "Мелкие царапины на парковке исчезают сами \u2014 от солнечного тепла или тёплой воды. На виниловой плёнке они остаются навсегда."
    )

    # Advantage item 3
    html = html.replace("Улучшение сохранности оригинального покрытия", "7\u201310 лет службы")
    html = html.replace(
        "Применение виниловой пленки позволяет сохранить оригинальное лакокрасочное покрытие автомобиля в хорошем состоянии и защитить его от повреждений.",
        "В 2\u20133 раза дольше виниловой плёнки. Не желтеет, не мутнеет, не трескается. Гарантия до 10 лет."
    )

    # Advantage item 4
    html = html.replace("Оптимальное соотношение стоимости и качества", "Как заводская покраска")
    html = html.replace(
        "В сравнении с окрашиванием автомобиля, покрытие виниловой пленкой может предложить более доступное решение для полного или частичного изменения внешнего вида автомобиля.",
        "Нет \u00ab\u0430\u043f\u0435\u043b\u044c\u0441\u0438\u043d\u043e\u0432\u043e\u0439 \u043a\u043e\u0440\u043a\u0438\u00bb как у винила. Глубокий блеск, невидимые стыки. Выглядит лучше оригинальной краски."
    )

    # Advantage item 5
    html = html.replace("Возможность использования для брендинга и рекламы", "Сохранение стоимости авто")
    html = html.replace(
        "Виниловая пленка позволяет создавать яркие и привлекательные дизайны, логотипы и сообщения, которые помогут продвигать бренд или бизнес.",
        "Заводская краска под плёнкой остаётся идеальной. При продаже автомобиль стоит дороже. Плёнка снимается чисто, без следов."
    )

    # Prices title
    html = html.replace(
        "Цены на оклейку кузова виниловой пленкой",
        "Цены на смену цвета защитной плёнкой"
    )

    # Price row 1
    html = html.replace("Частичная оклейка, нанесение логотипа", "Полная смена цвета защитной плёнкой")
    html = html.replace("от 400 Gel", "от 9000 Gel")

    # Remove price row 3 (полная оклейка от 6500)
    html = html.replace("Полная оклейка автомобиля", "")
    html = html.replace("от 6500 Gel", "")

    # FAQ replacements
    faq_replacements = [
        ("Сколько стоит оклейка винилом?", "Сколько стоит смена цвета защитной плёнкой?"),
        ("Антихром (оклеивание хром-элементов) — от 300 Gel, частичная оклейка или логотип — от 400 Gel. Полная оклейка автомобиля — от 6500 Gel. Точная цена зависит от модели автомобиля, типа пленки и объема работы.",
         "Полная смена цвета — от 9000 GEL. Антихром — от 300 GEL. Точная цена зависит от марки и модели автомобиля."),
        ("Какие пленки используете?", "Какие плёнки используете?"),
        ("3M, Oracal, Hexis, KPMF — проверенные мировые бренды. Доступны варианты: глянец, мат, сатин, хром, карбон, хамелеон и другие текстуры.",
         "Quantum и LuxArmor — сертифицированные полиуретановые плёнки с эффектом самовосстановления. Подберём оптимальный вариант под ваш бюджет."),
        ("Есть ли гарантия?", "Есть ли гарантия?"),
        ("Да. Гарантия на работу — 1 год, на пленку — по гарантии производителя (до 3–5 лет). При правильном уходе пленка служит значительно дольше.",
         "Да. Гарантия на плёнку и работу — до 10 лет. Покрываем отслоение, пожелтение и дефекты материала."),
        ("На сколько хватает винила?", "На сколько хватает цветной защитной плёнки?"),
        ("3–5 лет при нормальной эксплуатации. Темные цвета служат дольше. Стоянка под солнцем сокращает срок.",
         "7–10 лет при нормальной эксплуатации. Плёнка не желтеет, не мутнеет и сохраняет блеск. Это в 2–3 раза дольше виниловой плёнки."),
        ("Сколько времени занимает оклейка?", "Сколько времени занимает оклейка?"),
        ("Отдельный элемент — 2–4 часа. Полная оклейка кузова — 3–5 дней. Сложные цвета и текстуры могут потребовать больше времени.",
         "Полная смена цвета — 3–5 рабочих дней. Антихром — 1–2 дня. Точный срок зависит от сложности кузова."),
        ("Можно ли снять пленку потом?", "Можно ли снять плёнку потом?"),
        ("Да, без повреждения краски. Профессиональные пленки снимаются чисто. Под пленкой краска сохраняется в том же состоянии, что и до оклейки.",
         "Да, без повреждения краски. В отличие от винила, полиуретановая плёнка снимается крупными листами, не оставляя клеевых следов. Под плёнкой краска сохраняется в идеальном состоянии."),
        ("Ляжет ли пленка на сложные поверхности?", "Чем цветной PPF лучше виниловой плёнки?"),
        ("Да, профессиональные пленки хорошо тянутся и ложатся на рельеф, молдинги, изгибы. На поврежденные поверхности клеить не рекомендуется — лучше предварительно восстановить ЛКП.",
         "Толще в 2–3 раза — реальная защита от сколов. Самовосстановление царапин. Служит 7–10 лет вместо 3–5. Не желтеет, не трескается. Снимается чисто. Выглядит как заводская покраска, а не как «обёртка»."),
        ("Можно ли оклеить самостоятельно?", "Что такое самовосстановление?"),
        ("Мелкие элементы (зеркала, ручки) — можно попробовать. Крупные панели — пузыри, заломы, кривые стыки. Рекомендуем обращаться к профессионалам.",
         "Верхний слой полиуретановой плёнки способен «заплавлять» мелкие царапины под воздействием тепла — от солнечного света, тёплой воды или теплового пистолета. Глубокие порезы самовосстановлению не поддаются."),
        ("Повредит ли пленка краску?", "Повредит ли плёнка краску?"),
        ("Нет. Качественная пленка снимается чисто и даже защищает ЛКП от сколов и царапин. Единственное ограничение — не рекомендуется клеить на свежую покраску (до 30 дней).",
         "Нет. Качественная полиуретановая плёнка снимается чисто и защищает ЛКП от сколов и царапин. Заводская краска под плёнкой остаётся в том же состоянии, что и в день оклейки."),
    ]

    for old, new in faq_replacements:
        html = html.replace(old, new)

    # Insert comparison table after hero (find end of rec600149197)
    comparison_table = """<div id="rec-color-vs-vinyl" class="r t-rec" style="padding-top:90px;padding-bottom:45px;background-color:#000000;" data-record-type="33" data-bg-color="#000000">
<div class="t017"><div class="t-container t-align_left"><div class="t-col t-col_10 t-prefix_1">
<h2 class="t017__title t-title t-title_xxs" field="title"><div style="font-size:40px;" data-customstyle="yes"><p style="text-align:center;"><span style="color:rgb(228,201,126);">Цветная защитная плёнка vs виниловая</span></p></div></h2>
</div></div></div>
</div>

<div id="rec-comparison-table" class="r t-rec" style="padding-top:30px;padding-bottom:60px;background-color:#000000;" data-record-type="131" data-bg-color="#000000">
<div class="t123"><div class="t-container"><div class="t-col t-col_8 t-prefix_2">
<table class="ba-compare-table">
<thead>
<tr><th></th><th class="ba-compare-old">Виниловая плёнка</th><th class="ba-compare-new">Цветная защитная (PPF)</th></tr>
</thead>
<tbody>
<tr><td>Толщина</td><td>75\u2013100 мкм</td><td>175\u2013230 мкм (в 2\u20133\u00d7 толще)</td></tr>
<tr><td>Защита от сколов</td><td>Слабая</td><td>Сильная \u2014 поглощает удары</td></tr>
<tr><td>Самовосстановление</td><td>Нет</td><td>Да \u2014 от солнца или воды</td></tr>
<tr><td>Срок службы</td><td>3\u20135 лет</td><td>7\u201310 лет</td></tr>
<tr><td>Гарантия</td><td>1\u20133 года</td><td>До 10 лет</td></tr>
<tr><td>UV-стойкость</td><td>Выгорает</td><td>Не желтеет, не мутнеет</td></tr>
<tr><td>Поверхность</td><td>\u00abАпельсиновая корка\u00bb</td><td>Как заводская покраска</td></tr>
<tr><td>Снятие</td><td>Оставляет клей</td><td>Снимается чисто</td></tr>
<tr><td>Гидрофобность</td><td>Нет</td><td>Встроенная</td></tr>
</tbody>
</table>
<p class="ba-compare-note">За 10 лет виниловую плёнку придётся менять 2\u20133 раза. Цветная защитная плёнка \u2014 одно вложение, которое защищает и украшает.</p>
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
</div>"""

    # Find insertion point: after hero block rec600149197
    marker = 'id="rec600149197"'
    if marker in html and 'rec-comparison-table' not in html:
        # Find the end of this rec block by counting div nesting
        idx = html.index(marker)
        start = html.rfind('<div', 0, idx)
        depth = 0
        pos = start
        end_pos = -1
        while pos < len(html):
            if html[pos:pos+4] == '<div':
                depth += 1
                pos += 4
            elif html[pos:pos+6] == '</div>':
                depth -= 1
                if depth == 0:
                    end_pos = pos + 6
                    break
                pos += 6
            else:
                pos += 1
        if end_pos > 0:
            html = html[:end_pos] + '\n' + comparison_table + '\n' + html[end_pos:]

    return html


def apply_en_transforms(html: str) -> str:
    """Apply EN transformations."""
    # Read what the EN script does and replicate
    # First read the body file to know what strings exist
    en_body_path = os.path.join(BASE, "astro/public/files/page37329658body.html")
    if not os.path.exists(en_body_path):
        print("EN body file not found, skipping")
        return html

    # The EN full HTML contains the same content as the body file
    # Apply same replacements

    # Hero
    html = html.replace(
        "Vinyl Car Wrapping in Tbilisi",
        'Color <s style="opacity:0.5">Vinyl</s> Polyurethane Protective Film in Tbilisi'
    )

    # Hero description - find and replace
    html = html.replace(
        "We provide car vinyl wrapping services in Tbilisi, which allows you to quickly and affordably change the appearance of a car, without painting, and protect it.",
        "10-Year Warranty \u00b7 Quantum, LuxArmor Films \u00b7 2000+ Protected Vehicles"
    )

    # Advantages title
    html = html.replace(
        "Benefits of wrapping a car with vinyl film",
        "Benefits of Color Protective Film"
    )
    html = html.replace(
        "Benefits of Wrapping a Car with Vinyl Film",
        "Benefits of Color Protective Film"
    )

    # Advantage items
    html = html.replace("Damage protection", "Protection + Color Change")
    html = html.replace(
        "Vinyl film has protective properties that help protect the car body from scratches, chips and minor damage. It creates an additional protective layer.",
        "Two in one: changes your car's color while protecting the body from chips, scratches, and gravel. 175\u2013230 \u00b5m thick \u2014 2\u20133 times thicker than vinyl."
    )

    html = html.replace("Appearance change", "Self-Healing Scratches")
    html = html.replace(
        "Vinyl film offers a wide choice of colors, shades and textures, allowing car owners to change the appearance of their cars to any taste.",
        "Minor parking lot scratches disappear on their own \u2014 from sunlight or warm water. On vinyl wrap, they stay forever."
    )

    html = html.replace("Improved preservation of the original coating", "7\u201310 Years of Service")
    html = html.replace(
        "The use of vinyl film allows you to maintain the original paintwork of the car in good condition and protect it from damage.",
        "2\u20133 times longer than vinyl wrap. No yellowing, no clouding, no cracking. Warranty up to 10 years."
    )

    html = html.replace("Optimal cost-quality ratio", "Factory Paint Finish")
    html = html.replace(
        "Compared to painting a car, covering with vinyl film can offer a more affordable solution for a complete or partial change in the appearance of the car.",
        'No "orange peel" texture like vinyl. Deep gloss, invisible seams. Looks better than the original paint.'
    )

    html = html.replace("Possibility of use for branding and advertising", "Preserves Vehicle Value")
    html = html.replace(
        "Vinyl film allows you to create bright and attractive designs, logos and messages that will help promote a brand or business.",
        "Factory paint under the film stays perfect. Your car is worth more at resale. Film removes cleanly with no residue."
    )

    # Prices title
    html = html.replace(
        "Prices for wrapping the body with vinyl film",
        "Color Protective Film Pricing"
    )
    html = html.replace(
        "Prices for Wrapping the Body with Vinyl Film",
        "Color Protective Film Pricing"
    )

    # Price items
    html = html.replace("Partial wrapping, logo application", "Full Color Change with Protective Film")
    html = html.replace("from 400 Gel", "from 9000 Gel")
    html = html.replace("Full vehicle wrapping", "")
    html = html.replace("from 6500 Gel", "")

    # FAQ replacements
    en_faq = [
        ("How much does vinyl wrapping cost?", "How much does a color change with protective film cost?"),
        ("What is a vinyl film for cars?", "What films do you use?"),
        ("Is there a warranty on vinyl wrapping?", "Is there a warranty?"),
        ("How long does vinyl film last?", "How long does the color protective film last?"),
        ("How long does vinyl wrapping take?", "How long does the installation take?"),
        ("Can vinyl film be removed later?", "Can the film be removed later?"),
        ("Can a vinyl film be applied to surfaces with irregularities or protrusions?", "How is color PPF better than vinyl wrap?"),
        ("Is it possible to apply vinyl film yourself?", "What is self-healing?"),
        ("Will the film damage the paint?", "Will the film damage the paint?"),
    ]
    for old, new in en_faq:
        html = html.replace(old, new)

    # Insert comparison table
    comparison_en = """<div id="rec-color-vs-vinyl" class="r t-rec" style="padding-top:90px;padding-bottom:45px;background-color:#000000;" data-record-type="33" data-bg-color="#000000">
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
<tr><td>Surface quality</td><td>"Orange peel"</td><td>Factory paint finish</td></tr>
<tr><td>Removal</td><td>Leaves adhesive</td><td>Removes cleanly</td></tr>
<tr><td>Hydrophobic</td><td>No</td><td>Built-in</td></tr>
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
</div>"""

    hero_marker = 'id="rec600149197"'
    if hero_marker in html and 'rec-comparison-table' not in html:
        idx = html.index(hero_marker)
        start = html.rfind('<div', 0, idx)
        depth = 0
        pos = start
        end_pos = -1
        while pos < len(html):
            if html[pos:pos+4] == '<div':
                depth += 1
                pos += 4
            elif html[pos:pos+6] == '</div>':
                depth -= 1
                if depth == 0:
                    end_pos = pos + 6
                    break
                pos += 6
            else:
                pos += 1
        if end_pos > 0:
            html = html[:end_pos] + '\n' + comparison_en + '\n' + html[end_pos:]

    return html


def main() -> None:
    files = {
        os.path.join(BASE, "tilda-export/project6825691/page37146793.html"): "ru",
        os.path.join(BASE, "tilda-export/project6825691/page37329658.html"): "en",
    }

    for filepath, lang in files.items():
        with open(filepath, "r", encoding="utf-8") as f:
            html = f.read()

        orig_len = len(html)

        if lang == "ru":
            html = apply_ru_transforms(html)
        elif lang == "en":
            html = apply_en_transforms(html)

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)

        print(f"{lang}: {filepath} | {orig_len} -> {len(html)} chars (delta: {len(html) - orig_len:+d})")

    # KA was already updated by the KA agent directly
    ka_path = os.path.join(BASE, "tilda-export/project6825691/page37334532.html")
    with open(ka_path, "r", encoding="utf-8") as f:
        ka_html = f.read()
    if "rec-comparison-table" in ka_html:
        print(f"ka: {ka_path} | already transformed (has comparison table)")
    else:
        print(f"ka: {ka_path} | WARNING: not transformed!")


if __name__ == "__main__":
    main()

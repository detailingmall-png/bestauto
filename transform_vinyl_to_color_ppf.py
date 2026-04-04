#!/usr/bin/env python3
"""
Transform the vinyl wrapping page HTML into a color PPF wrapping page.
Reads page37146793body.html, applies text replacements & structural changes,
writes back to the same file.
"""

import sys

FILE = "/Users/fedorzubrickij/bestauto-site/astro/public/files/page37146793body.html"


def main():
    with open(FILE, "r", encoding="utf-8") as f:
        html = f.read()

    original_len = len(html)

    # =========================================================================
    # 1. HERO (rec600149197) — title, description, button
    # =========================================================================

    # Title
    html = html.replace(
        'Виниловая оклейка автомобиля в Тбилиси',
        'Оклейка цветной <s style="opacity:0.5">виниловой</s> полиуретановой (PPF) защитной плёнкой в Тбилиси',
    )

    # Description
    html = html.replace(
        '<span style="font-weight: 500;">Мы оказываем услуги по оклейке автомобилей виниловой пленкой в Тбилиси, что позволяет быстро и недорого изменить внешний вид автомобиля, без покраски, и защитить его.</span>',
        '<span style="font-weight: 500;">Гарантия 10 лет · Quantum, LuxArmor плёнки · 2000+ защищённых автомобилей</span>',
    )

    # Button text (only in the hero — match via rec600149197 context)
    # The button is: <span class="t-btnflex__text">Записаться</span> inside rec600149197
    # There are multiple "Записаться" on the page (header nav), so target specifically
    # by the surrounding style block unique to rec600149197
    html = html.replace(
        'href="#contacts"><span class="t-btnflex__text">Записаться</span> <style>#rec600149197',
        'href="#contacts"><span class="t-btnflex__text">Записаться на бесплатный осмотр</span> <style>#rec600149197',
    )

    # =========================================================================
    # 2. INSERT COMPARISON TABLE after hero (rec600149197)
    # =========================================================================

    comparison_html = """<div id="rec-color-vs-vinyl" class="r t-rec" style="padding-top:90px;padding-bottom:45px;background-color:#000000;" data-record-type="33" data-bg-color="#000000">
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
</div>
"""

    # Insert after the closing of rec600149197 — find the start of rec600149199
    marker = '<div id="rec600149199"'
    html = html.replace(marker, comparison_html + marker, 1)

    # =========================================================================
    # 3. ADVANTAGES (rec600149199) — title + 5 items
    # =========================================================================

    # Section title
    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">Преимущества оклейки авто виниловой пленкой </span>',
        '<span style="color: rgb(228, 201, 126);">Преимущества цветной защитной плёнки</span>',
    )

    # Item 1
    html = html.replace(
        'field="li_title__1476889049104">Защита от повреждений</div>',
        'field="li_title__1476889049104">Защита + смена цвета</div>',
    )
    html = html.replace(
        'field="li_descr__1476889049104">Виниловая пленка обладает защитными свойствами, которые помогают защитить кузов автомобиля от царапин, камней, насекомых и других внешних факторов. Она служит барьером, предохраняющим оригинальное лакокрасочное покрытие от потертостей и сколов.</div>',
        'field="li_descr__1476889049104">Два в одном: меняет цвет автомобиля и одновременно защищает кузов от сколов, царапин и гравия. Толщина 175\u2013230 мкм \u2014 в 2\u20133 раза толще винила.</div>',
    )

    # Item 2
    html = html.replace(
        'field="li_title__1476889075209">Изменение внешнего вида</div>',
        'field="li_title__1476889075209">Самовосстановление царапин</div>',
    )
    html = html.replace(
        'field="li_descr__1476889075209">Виниловая пленка предлагает широкий выбор цветов, оттенков и текстур, что позволяет владельцам автомобилей изменять внешний вид своего транспортного средства. Это дает возможность создать уникальный и индивидуальный стиль, отличающий автомобиль от других на дороге.</div>',
        'field="li_descr__1476889075209">Мелкие царапины на парковке исчезают сами \u2014 от солнечного тепла или тёплой воды. На виниловой плёнке они остаются навсегда.</div>',
    )

    # Item 3
    html = html.replace(
        'field="li_title__1476889079427">Улучшение сохранности оригинального покрытия</div>',
        'field="li_title__1476889079427">7\u201310 лет службы</div>',
    )
    html = html.replace(
        'field="li_descr__1476889079427">Применение виниловой пленки позволяет сохранить оригинальное лакокрасочное покрытие автомобиля в хорошем состоянии. Оно служит барьером от воздействия внешних факторов, таких как ультрафиолетовое излучение, птичий помет и солевые растворы, которые могут привести к выцветанию, окислению и деградации покрытия.</div>',
        'field="li_descr__1476889079427">В 2\u20133 раза дольше виниловой плёнки. Не желтеет, не мутнеет, не трескается. Гарантия до 10 лет.</div>',
    )

    # Item 4
    html = html.replace(
        'field="li_title__1476889085397">Оптимальное соотношение стоимости и качества</div>',
        'field="li_title__1476889085397">Как заводская покраска</div>',
    )
    html = html.replace(
        'field="li_descr__1476889085397">В сравнении с окрашиванием автомобиля, покрытие виниловой пленкой может предложить более доступное решение для изменения внешнего вида и защиты кузова. Кроме того, пленка также обладает долговечностью и легкостью в уходе, что позволяет сэкономить на будущих расходах на обслуживание и ремонт.</div>',
        'field="li_descr__1476889085397">Нет \u00abапельсиновой корки\u00bb как у винила. Глубокий блеск, невидимые стыки. Выглядит лучше оригинальной краски.</div>',
    )

    # Item 5
    html = html.replace(
        'field="li_title__1684923648673">Возможность использования для брендинга и рекламы</div>',
        'field="li_title__1684923648673">Сохранение стоимости авто</div>',
    )
    html = html.replace(
        'field="li_descr__1684923648673">Виниловая пленка позволяет создавать яркие и привлекательные дизайны, логотипы и сообщения, которые могут быть нанесены на кузов автомобиля или другие поверхности. Она также обладает легкостью установки и возможностью временного использования, что позволяет легко изменять дизайн и обновлять рекламу. </div>',
        'field="li_descr__1684923648673">Заводская краска под плёнкой остаётся идеальной. При продаже автомобиль стоит дороже. Плёнка снимается чисто, без следов.</div>',
    )

    # =========================================================================
    # 4. PRICES — title (rec600149204) + content (rec618602253)
    # =========================================================================

    # Price section title
    html = html.replace(
        '<span style="color: rgb(228, 201, 126);">Цены на оклейку кузова виниловой пленкой </span>',
        '<span style="color: rgb(228, 201, 126);">Цены на смену цвета защитной плёнкой</span>',
    )

    # Price row 1: change title and price
    html = html.replace(
        'field="li_title__1493292137724">Частичная оклейка, нанесение логотипа</div>',
        'field="li_title__1493292137724">Полная смена цвета защитной плёнкой</div>',
    )
    html = html.replace(
        'field="li_title2__1493292137724">от 400 <br />Gel</div>',
        'field="li_title2__1493292137724">от 9000 <br />Gel</div>',
    )

    # Price row 2: update antichrome text slightly (em dash in "хром-элементов")
    html = html.replace(
        'field="li_title__1493289544768">Антихром (оклеивание хром элементов черной пленкой) </div>',
        'field="li_title__1493289544768">Антихром (оклеивание хром-элементов чёрной плёнкой)</div>',
    )

    # Price row 3: remove entirely
    # Find the third t681__row containing field "li_title__1685870296564"
    row3_start = html.find('<div class="t681__row t-row" style="margin-bottom:40px;"> <div class="t-col t-col_3 t-prefix_2"> <div class="t681__title t-heading t-heading_sm" field="li_title__1685870296564">')
    if row3_start != -1:
        # Find the end of this row — it ends with </div> </div> </div>
        # The row structure: <div class="t681__row ..."> ... </div> </div> </div>
        # We need to find the closing </div> that matches the row div
        # Look for the next t681__row or the closing </div> </div> of the container
        row3_end_marker = 'от 6500 Gel</div> </div> </div> </div> </div>'
        row3_end = html.find(row3_end_marker, row3_start)
        if row3_end != -1:
            row3_end += len(row3_end_marker)
            # Remove the entire row including leading whitespace
            html = html[:row3_start] + html[row3_end:]

    # =========================================================================
    # 5. FAQ (rec600149207) — replace all 7 accordion items with 9 new ones
    # =========================================================================

    # Strategy: replace the entire FAQ accordion content block.
    # Find the t585 div inside rec600149207 and replace its inner accordion items.

    # Replace each FAQ Q&A by targeting field IDs

    # FAQ 1: accordion1 — "Что такое виниловая пленка для автомобилей?"
    html = html.replace(
        'field="li_title__1684935263985">Что такое виниловая пленка для автомобилей?</span>',
        'field="li_title__1684935263985">Сколько стоит смена цвета защитной плёнкой?</span>',
    )
    html = html.replace(
        'field="li_descr__1684935263985">Виниловая пленка - это специальный материал, который наносится на кузов автомобиля для изменения его внешнего вида или рекламных целей. Она доступна в различных цветах, текстурах и отделках.<br /><br /></div>',
        'field="li_descr__1684935263985">Полная смена цвета \u2014 от 9000 GEL. Антихром \u2014 от 300 GEL. Точная цена зависит от марки и модели автомобиля.</div>',
    )

    # FAQ 2: accordion2 — "Как долго продержится виниловая пленка на автомобиле?"
    html = html.replace(
        'field="li_title__1480611048442">Как долго продержится виниловая пленка на автомобиле?</span>',
        'field="li_title__1480611048442">Какие плёнки используете?</span>',
    )
    html = html.replace(
        'field="li_descr__1480611048442"><p style="text-align: left;">Длительность службы виниловой пленки зависит от ее качества, эксплуатационных условий и правильного ухода. Обычно она служит от 3 до 7 лет, но существуют также более долговечные варианты.</p></div>',
        'field="li_descr__1480611048442">Quantum и LuxArmor \u2014 сертифицированные полиуретановые плёнки с эффектом самовосстановления. Подберём оптимальный вариант под ваш бюджет.</div>',
    )

    # FAQ 3: accordion3 — "Можно ли удалить виниловую пленку с автомобиля?"
    html = html.replace(
        'field="li_title__1684923311907"><p style="text-align: left;">Можно ли удалить виниловую пленку с автомобиля?</p></span>',
        'field="li_title__1684923311907">Есть ли гарантия?</span>',
    )
    html = html.replace(
        'field="li_descr__1684923311907">Да, виниловую пленку можно удалить с кузова автомобиля. При правильном удалении она не должна оставлять остатков клея или повреждать оригинальную краску. Однако, лучше доверить удаление пленки профессионалам.<br /><br /></div>',
        'field="li_descr__1684923311907">Да. Гарантия на плёнку и работу \u2014 до 10 лет. Покрываем отслоение, пожелтение и дефекты материала.</div>',
    )

    # FAQ 4: accordion4 — "Какова стоимость установки виниловой пленки на автомобиль?"
    html = html.replace(
        'field="li_title__1480611044356">Какова стоимость установки виниловой пленки на автомобиль?</span>',
        'field="li_title__1480611044356">На сколько хватает цветной защитной плёнки?</span>',
    )
    html = html.replace(
        'field="li_descr__1480611044356">Стоимость установки виниловой пленки зависит от нескольких факторов, таких как размер кузова, сложность дизайна, выбранная пленка и трудозатраты на установку. Обратитесь к нам, чтобы получить конкретную оценку работ.</div>',
        'field="li_descr__1480611044356">7\u201310 лет при нормальной эксплуатации. Плёнка не желтеет, не мутнеет и сохраняет блеск. Это в 2\u20133 раза дольше виниловой плёнки.</div>',
    )

    # FAQ 5: accordion5 — "Можно ли наложить виниловую пленку на поверхности..."
    html = html.replace(
        'field="li_title__1684957372053"><p style="text-align: left;">Можно ли наложить виниловую пленку на поверхности, имеющие неровности или выступы?</p></span>',
        'field="li_title__1684957372053">Сколько времени занимает оклейка?</span>',
    )
    html = html.replace(
        'field="li_descr__1684957372053">Виниловая пленка может быть установлена на поверхности с некоторыми неровностями или выступами, но чем более плоская и гладкая поверхность, тем лучше результат. В случае сложных поверхностей или выступов, может потребоваться более тщательная установка.</div>',
        'field="li_descr__1684957372053">Полная смена цвета \u2014 3\u20135 рабочих дней. Антихром \u2014 1\u20132 дня. Точный срок зависит от сложности кузова.</div>',
    )

    # FAQ 6: accordion6 — "Можно ли на виниловую пленку нанести логотипы или надписи?"
    html = html.replace(
        'field="li_title__1685511552186">Можно ли на виниловую пленку нанести логотипы или надписи?</span>',
        'field="li_title__1685511552186">Можно ли снять плёнку потом?</span>',
    )
    html = html.replace(
        'field="li_descr__1685511552186">Да, на виниловую пленку можно нанести логотипы, надписи и другие графические элементы. Возможности для брендирования и рекламы на виниловой пленке очень широки, и профессиональные установщики могут помочь с созданием и нанесением нужного дизайна.<br /><br /></div>',
        'field="li_descr__1685511552186">Да, без повреждения краски. В отличие от винила, полиуретановая плёнка снимается крупными листами, не оставляя клеевых следов. Под плёнкой краска сохраняется в идеальном состоянии.</div>',
    )

    # FAQ 7: accordion7 — "Можно ли установить виниловую пленку самостоятельно..."
    html = html.replace(
        'field="li_title__1685208483786"><p style="text-align: left;">Можно ли установить виниловую пленку самостоятельно или нужен профессионал?</p></span>',
        'field="li_title__1685208483786">Чем цветной PPF лучше виниловой плёнки?</span>',
    )
    html = html.replace(
        'field="li_descr__1685208483786">Установка виниловой пленки требует определенного опыта и навыков. Для достижения лучших результатов и предотвращения ошибок рекомендуется обратиться к профессионалам, которые имеют опыт установки виниловой пленки и оборудование для точной и аккуратной работы.</div>',
        'field="li_descr__1685208483786">Толще в 2\u20133 раза \u2014 реальная защита от сколов. Самовосстановление царапин. Служит 7\u201310 лет вместо 3\u20135. Не желтеет, не трескается. Снимается чисто. Выглядит как заводская покраска, а не как \u00abобёртка\u00bb.</div>',
    )

    # Add 2 more FAQ items (8 and 9) — insert before the closing border div
    # The user wants 9 FAQ items total. We have 7 slots. Add 2 more accordion items
    # before the t585__border div.

    faq8_html = """ <div class="t-col t-col_8 t-prefix_2"> <div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> <div class="t585__wrapper"> <div class="t585__header " style="border-top: 1px solid #eee;"> <button type="button"
class="t585__trigger-button"
aria-controls="accordion8_600149207"
aria-expanded="false"> <span class="t585__title t-name t-name_xl" field="li_title__faq8">Что такое самовосстановление?</span> <span class="t585__icon"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#000000"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #e4c97e"></span> </span> <span class="t585__icon t585__icon-hover"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#222222"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #eee;"></span> </span> </button> </div> <div class="t585__content"
id="accordion8_600149207"
hidden > <div class="t585__textwrapper"> <div class="t585__text t-descr t-descr_xs" field="li_descr__faq8">Верхний слой полиуретановой плёнки способен \u00abзаплавлять\u00bb мелкие царапины под воздействием тепла \u2014 от солнечного света, тёплой воды или теплового пистолета. Глубокие порезы самовосстановлению не поддаются.</div> </div> </div> </div> </div> </div>"""

    faq9_html = """ <div class="t-col t-col_8 t-prefix_2"> <div class="t585__accordion" data-accordion="false" data-scroll-to-expanded="false"> <div class="t585__wrapper"> <div class="t585__header " style="border-top: 1px solid #eee;"> <button type="button"
class="t585__trigger-button"
aria-controls="accordion9_600149207"
aria-expanded="false"> <span class="t585__title t-name t-name_xl" field="li_title__faq9">Повредит ли плёнка краску?</span> <span class="t585__icon"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#000000"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #e4c97e"></span> </span> <span class="t585__icon t585__icon-hover"> <span class="t585__lines"> <svg role="presentation" focusable="false" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1px" fill="none" fill-rule="evenodd" stroke-linecap="square"> <g transform="translate(1.000000, 1.000000)" stroke="#222222"> <path d="M0,11 L22,11"></path> <path d="M11,0 L11,22"></path> </g> </g> </svg> </span> <span class="t585__circle" style="background-color: #eee;"></span> </span> </button> </div> <div class="t585__content"
id="accordion9_600149207"
hidden > <div class="t585__textwrapper"> <div class="t585__text t-descr t-descr_xs" field="li_descr__faq9">Нет. Качественная полиуретановая плёнка снимается чисто и защищает ЛКП от сколов и царапин. Заводская краска под плёнкой остаётся в том же состоянии, что и в день оклейки.</div> </div> </div> </div> </div> </div>"""

    # Insert before the t585__border div in rec600149207
    border_marker = '<div class="t585__border" style="height: 1px; background-color: #eee;"></div> </div> </div> </div> <script>t_onReady(function() {t_onFuncLoad(\'t585_init\',function() {t585_init(\'600149207\');})'
    border_pos = html.find(border_marker)
    if border_pos != -1:
        html = html[:border_pos] + faq8_html + faq9_html + " " + html[border_pos:]

    # =========================================================================
    # DONE — write back
    # =========================================================================

    with open(FILE, "w", encoding="utf-8") as f:
        f.write(html)

    new_len = len(html)
    print(f"Done. Original: {original_len} chars, New: {new_len} chars, Delta: {new_len - original_len:+d}")


if __name__ == "__main__":
    main()

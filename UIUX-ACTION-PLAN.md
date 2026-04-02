# Plan izmenenij UI/UX dlya bestauto.ge

> Sostavlen na osnove dokazatelnogo issledovaniya (NNGroup, Baymard, WebAIM, Google Research, WCAG 2.1)
> Polnyj audit: ~/bestauto-audit-recommendations.md
> Issledovanie: ~/ui-ux-research.md

---

## Faza 1 -- Bystrye pobedy (1-2 dnya)

10 zadach, vse CSS/HTML pravki nizkoj slozhnosti.

| # | Zadacha | Chto sdelat | Fajly |
|---|---------|-------------|-------|
| C2 | H1 obrezaetsya na mobilnom 375px | Umenshit font-size H1 dlya mobilnogo ili pereformulirovat tekst. Dobavit `overflow-wrap: break-word` | Tilda export CSS / hero block |
| C3 | Touch target burgera 28x20px -> 48x48px | Uvelichit padding knopki do 48x48, ikonka mozhet ostat 28px | CSS dlya .t-menuburger |
| H2 | Polya formy bez label-for | Dobavit `id` na kazhdyj input, `for` na kazhdyj label | whatsapp-blocks.ts (ba-contacts HTML) |
| H3 | 6 pustyh ssylok | Dobavit `aria-label` na kazhduju pustuju ssylku | HTML extractors / navigation blocks |
| H4 | Net fokus-indikatora | Dobavit `.t-menuburger:focus-visible { outline: 2px solid #e4c97e; }` | Custom CSS |
| H5 | Lejbly formy 11px -> 13px | Izmenit `font-size: 11px` na `font-size: 13px` v stile `#ba-contacts .ba-field label` | whatsapp-blocks.ts CSS |
| M1 | H1 na desktope 28px -> 36-42px | Uvelichit font-size cherez CSS media query (>980px) | Hero block CSS |
| M2 | Dublirovanyj H1 (2 sht) | Ostavit odin H1, vtoroj sdelat H2 ili aria-hidden | Hero block HTML |
| M7 | Line-height H1: 1.25 -> 1.35 | Ustanovit `line-height: 1.35` na H1 | Hero block CSS |
| M8 | Polya formy 43px -> 48px | Uvelichit padding dlya dostizheniya vysoty 48px | whatsapp-blocks.ts CSS |

---

## Faza 2 -- Srednie zadachi (3-5 dnej)

4 zadachi, trebuet izmenenia struktury.

| # | Zadacha | Chto sdelat | Fajly |
|---|---------|-------------|-------|
| **C1** | **Zamenit burger na vidimoe menyu (desktop)** | Pri shirine >980px pokazyvat gorizontalnoe tekst menyu: Uslugi \| Ceny \| Kontakty \| Blog \| [Zapisatsya]. Burger tolko na mobilnom | TildaPageLayout.astro, html-extractor.ts, custom CSS |
| H1 | Dobavit hlebnye kroshki na stranicy uslug | Format: Glavnaya > Uslugi > Polirovka. Razmestit ryadom s H1. BreadcrumbList schema uzhe est | [...slug].astro, novyj komponent breadcrumbs |
| M4 | Dobavit skip-ssylku | `<a href="#main-content" class="skip-link">Perejti k soderzhimomu</a>` pered navigaciej | TildaPageLayout.astro |
| L1 | aria-current="page" na aktivnyh ssylkah | Dobavit atribut v navigaciyu na osnove tekuschego slug | html-extractor.ts ili navigation block |

---

## Faza 3 -- Kontent i UX uluchsheniya (1-2 nedeli)

5 zadach, trebuet novogo kontenta.

| # | Zadacha | Chto sdelat | Fajly |
|---|---------|-------------|-------|
| M3 | Uprostit put k forme zapisi | Variant A: sticky CTA otkryvaet modalnoe okno s formoj. Variant B: forma vidna srazu (bez akkordiona) | whatsapp-blocks.ts, custom JS |
| M5 | Sekciya "Kak eto rabotaet" | 4 shaga: Zapis > Osmotr > Rabota > Rezultat. Dobavit na glavnuyu i stranicy uslug | Novyj blok HTML/CSS, kontentnyj tekst na 3 yazykah |
| M6 | Sertifikaty i kvalifikaciya | Sekciya s logotipami brendov (Xpel, Gyeon, Koch) i/ili foto sertifikatov | Novyj blok, izobrazheniya logotipov |
| L2 | Centralnoe vyravnivanie -> levoe | Dlya blokov s 2+ strokami teksta: `text-align: left` | CSS pravki v opisatelnyh sekciyah |
| L4 | Alternativnyj sposob zapisi | Dobavit Telegram ili click-to-call pryanmo iz formy | whatsapp-blocks.ts, kontaktnaja forma |

---

## Faza 4 -- Dolgosrochnye

| # | Zadacha | Chto sdelat |
|---|---------|-------------|
| L3 | Videootzyvy klientov | Snyat 2-3 korotkih videootzyva (30-60 sek), dobavit na glavnuyu. +80% k konversii po issledovaniyu |

---

## Chto uzhe horosho (NE trogat)

1. Sticky CTA na mobilnom -- "Zapisatsya na besplatnyj osmotr"
2. WhatsApp-knopka 56x56px v nizhnem pravom uglu
3. Forma zapisi 3 polya (usluga, telefon, model)
4. 100% alt-tegov na izobrazheniyah (49/49)
5. Ceny "ot X lari" na kartochkah uslug
6. Google otzyvy (vidzhet)
7. Kontrast: belyj na chernom (21:1), chernyj na zolotom (10:1)
8. Proizvoditelnost: Astro SSG + lazy loading + HLS video
9. Shrift TildaSans edinstvenyj
10. SEO: hreflang, canonical, structured data, Open Graph

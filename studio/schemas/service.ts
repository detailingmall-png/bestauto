import {defineType, defineField} from 'sanity'

/**
 * Service document — 12 main service pages.
 * Each service has multilingual content and pricing.
 */
export default defineType({
  name: 'service',
  title: 'Услуга',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Например: polishing, ceramiccoating, ppf-shield-wrapping',
      options: {source: 'nameRu'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Порядок в меню',
      type: 'number',
    }),
    // Multilingual names
    defineField({name: 'nameKa', title: 'Название (КА)', type: 'string', group: 'content'}),
    defineField({name: 'nameRu', title: 'Название (РУ)', type: 'string', group: 'content'}),
    defineField({name: 'nameEn', title: 'Название (EN)', type: 'string', group: 'content'}),
    // Short description
    defineField({name: 'descriptionKa', title: 'Краткое описание (КА)', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'descriptionRu', title: 'Краткое описание (РУ)', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'descriptionEn', title: 'Краткое описание (EN)', type: 'text', rows: 3, group: 'content'}),
    // Homepage card fields
    defineField({name: 'homepageTaglineKa', title: 'Тэглайн главной (КА)', type: 'string', group: 'homepage', description: 'Одна строка выгоды для карточки на главной'}),
    defineField({name: 'homepageTaglineRu', title: 'Тэглайн главной (РУ)', type: 'string', group: 'homepage'}),
    defineField({name: 'homepageTaglineEn', title: 'Тэглайн главной (EN)', type: 'string', group: 'homepage'}),
    defineField({name: 'homepageTier', title: 'Тир на главной', type: 'number', group: 'homepage', description: '1 = крупная карточка (PPF, Керамика), 2 = компактная', initialValue: 2}),
    defineField({name: 'homepageImage', title: 'Фото для главной', type: 'image', group: 'homepage', options: {hotspot: true}}),
    defineField({name: 'showOnHomepage', title: 'Показывать на главной', type: 'boolean', group: 'homepage', initialValue: true}),
    // Pricing
    defineField({
      name: 'pricing',
      title: 'Цены',
      type: 'array',
      group: 'pricing',
      of: [
        {
          type: 'object',
          name: 'priceItem',
          fields: [
            defineField({name: 'nameKa', title: 'Позиция (КА)', type: 'string'}),
            defineField({name: 'nameRu', title: 'Позиция (РУ)', type: 'string'}),
            defineField({name: 'nameEn', title: 'Позиция (EN)', type: 'string'}),
            defineField({name: 'price', title: 'Цена (GEL)', type: 'string', description: 'Например: от 150, 150-400'}),
            defineField({name: 'isPromo', title: 'Акция', type: 'boolean', initialValue: false}),
          ],
          preview: {select: {title: 'nameRu', subtitle: 'price'}},
        },
      ],
    }),
    // Benefits
    defineField({
      name: 'benefits',
      title: 'Преимущества',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'benefit',
          fields: [
            defineField({name: 'titleKa', title: 'Заголовок (КА)', type: 'string'}),
            defineField({name: 'titleRu', title: 'Заголовок (РУ)', type: 'string'}),
            defineField({name: 'titleEn', title: 'Заголовок (EN)', type: 'string'}),
            defineField({name: 'descKa', title: 'Описание (КА)', type: 'text', rows: 2}),
            defineField({name: 'descRu', title: 'Описание (РУ)', type: 'text', rows: 2}),
            defineField({name: 'descEn', title: 'Описание (EN)', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'titleRu'}},
        },
      ],
    }),
    // FAQ
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'questionKa', title: 'Вопрос (КА)', type: 'string'}),
            defineField({name: 'questionRu', title: 'Вопрос (РУ)', type: 'string'}),
            defineField({name: 'questionEn', title: 'Вопрос (EN)', type: 'string'}),
            defineField({name: 'answerKa', title: 'Ответ (КА)', type: 'text', rows: 3}),
            defineField({name: 'answerRu', title: 'Ответ (РУ)', type: 'text', rows: 3}),
            defineField({name: 'answerEn', title: 'Ответ (EN)', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'questionRu'}},
        },
      ],
    }),
    // SEO
    defineField({name: 'seoTitleKa', title: 'SEO Title (КА)', type: 'string', group: 'seo'}),
    defineField({name: 'seoTitleRu', title: 'SEO Title (РУ)', type: 'string', group: 'seo'}),
    defineField({name: 'seoTitleEn', title: 'SEO Title (EN)', type: 'string', group: 'seo'}),
    defineField({name: 'seoDescriptionKa', title: 'Meta Description (КА)', type: 'text', rows: 2, group: 'seo'}),
    defineField({name: 'seoDescriptionRu', title: 'Meta Description (РУ)', type: 'text', rows: 2, group: 'seo'}),
    defineField({name: 'seoDescriptionEn', title: 'Meta Description (EN)', type: 'text', rows: 2, group: 'seo'}),
    // Gallery images
    defineField({
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      group: 'gallery',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  groups: [
    {name: 'content', title: 'Контент'},
    {name: 'homepage', title: 'Главная'},
    {name: 'pricing', title: 'Цены'},
    {name: 'faq', title: 'FAQ'},
    {name: 'gallery', title: 'Галерея'},
    {name: 'seo', title: 'SEO'},
  ],
  preview: {
    select: {title: 'nameRu', subtitle: 'slug.current'},
  },
})

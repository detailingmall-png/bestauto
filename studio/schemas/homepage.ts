import {defineType, defineField} from 'sanity'

/**
 * Singleton: homepage content.
 * Hero section, stats, promo blocks.
 */
export default defineType({
  name: 'homepage',
  title: 'Главная страница',
  type: 'document',
  fields: [
    // Hero section
    defineField({
      name: 'heroTitleKa',
      title: 'Заголовок Hero (КА)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleRu',
      title: 'Заголовок Hero (РУ)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitleEn',
      title: 'Заголовок Hero (EN)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitleKa',
      title: 'Подзаголовок Hero (КА)',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitleRu',
      title: 'Подзаголовок Hero (РУ)',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtitleEn',
      title: 'Подзаголовок Hero (EN)',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Изображение Hero',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
    }),
    // Stats
    defineField({
      name: 'stats',
      title: 'Статистика',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({name: 'value', title: 'Значение', type: 'string'}),
            defineField({name: 'labelKa', title: 'Подпись (КА)', type: 'string'}),
            defineField({name: 'labelRu', title: 'Подпись (РУ)', type: 'string'}),
            defineField({name: 'labelEn', title: 'Подпись (EN)', type: 'string'}),
          ],
          preview: {select: {title: 'value', subtitle: 'labelRu'}},
        },
      ],
    }),
    // Promo banner
    defineField({
      name: 'promoTitleKa',
      title: 'Промо заголовок (КА)',
      type: 'string',
      group: 'promo',
    }),
    defineField({
      name: 'promoTitleRu',
      title: 'Промо заголовок (РУ)',
      type: 'string',
      group: 'promo',
    }),
    defineField({
      name: 'promoTitleEn',
      title: 'Промо заголовок (EN)',
      type: 'string',
      group: 'promo',
    }),
    defineField({
      name: 'promoDescriptionKa',
      title: 'Промо описание (КА)',
      type: 'text',
      group: 'promo',
    }),
    defineField({
      name: 'promoDescriptionRu',
      title: 'Промо описание (РУ)',
      type: 'text',
      group: 'promo',
    }),
    defineField({
      name: 'promoDescriptionEn',
      title: 'Промо описание (EN)',
      type: 'text',
      group: 'promo',
    }),
  ],
  groups: [
    {name: 'hero', title: 'Hero секция'},
    {name: 'stats', title: 'Статистика'},
    {name: 'promo', title: 'Промо'},
  ],
})

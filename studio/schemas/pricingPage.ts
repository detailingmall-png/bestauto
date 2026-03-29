import {defineType, defineField} from 'sanity'

/**
 * Singleton: the full pricing page content.
 * Sections contain price line items editable by the owner.
 */
export default defineType({
  name: 'pricingPage',
  title: 'Страница цен',
  type: 'document',
  fields: [
    defineField({name: 'titleRu', title: 'Заголовок (РУ)', type: 'string'}),
    defineField({name: 'titleKa', title: 'Заголовок (КА)', type: 'string'}),
    defineField({name: 'titleEn', title: 'Заголовок (EN)', type: 'string'}),
    defineField({
      name: 'sections',
      title: 'Разделы цен',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'priceSection',
          title: 'Раздел',
          fields: [
            defineField({name: 'titleRu', title: 'Заголовок раздела (РУ)', type: 'string'}),
            defineField({name: 'titleKa', title: 'Заголовок раздела (КА)', type: 'string'}),
            defineField({name: 'titleEn', title: 'Заголовок раздела (EN)', type: 'string'}),
            defineField({
              name: 'items',
              title: 'Позиции',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'priceItem',
                  title: 'Позиция',
                  fields: [
                    defineField({name: 'nameRu', title: 'Название (РУ)', type: 'string'}),
                    defineField({name: 'nameKa', title: 'Название (КА)', type: 'string'}),
                    defineField({name: 'nameEn', title: 'Название (EN)', type: 'string'}),
                    defineField({
                      name: 'price',
                      title: 'Цена (одна для всех языков)',
                      type: 'string',
                      description: 'Например: от 590 Gel',
                    }),
                    defineField({
                      name: 'isPromo',
                      title: 'Акционная цена',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {title: 'nameRu', subtitle: 'price'},
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {title: 'titleRu'},
          },
        },
      ],
    }),
    defineField({name: 'seoTitleKa', title: 'SEO Title (КА)', type: 'string'}),
    defineField({name: 'seoTitleRu', title: 'SEO Title (РУ)', type: 'string'}),
    defineField({name: 'seoTitleEn', title: 'SEO Title (EN)', type: 'string'}),
    defineField({name: 'seoDescriptionKa', title: 'Meta Description (КА)', type: 'text', rows: 2}),
    defineField({name: 'seoDescriptionRu', title: 'Meta Description (РУ)', type: 'text', rows: 2}),
    defineField({name: 'seoDescriptionEn', title: 'Meta Description (EN)', type: 'text', rows: 2}),
  ],
})

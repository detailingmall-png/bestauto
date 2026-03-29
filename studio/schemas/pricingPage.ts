import {defineType, defineField} from 'sanity'

/**
 * Singleton: pricing page meta content.
 * The actual prices live in service.pricing fields.
 */
export default defineType({
  name: 'pricingPage',
  title: 'Страница цен',
  type: 'document',
  fields: [
    defineField({name: 'heroTitleKa', title: 'Заголовок (КА)', type: 'string'}),
    defineField({name: 'heroTitleRu', title: 'Заголовок (РУ)', type: 'string'}),
    defineField({name: 'heroTitleEn', title: 'Заголовок (EN)', type: 'string'}),
    defineField({name: 'seoTitleKa', title: 'SEO Title (КА)', type: 'string'}),
    defineField({name: 'seoTitleRu', title: 'SEO Title (РУ)', type: 'string'}),
    defineField({name: 'seoTitleEn', title: 'SEO Title (EN)', type: 'string'}),
    defineField({name: 'seoDescriptionKa', title: 'Meta Description (КА)', type: 'text', rows: 2}),
    defineField({name: 'seoDescriptionRu', title: 'Meta Description (РУ)', type: 'text', rows: 2}),
    defineField({name: 'seoDescriptionEn', title: 'Meta Description (EN)', type: 'text', rows: 2}),
  ],
})

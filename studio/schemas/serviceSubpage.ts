import {defineType, defineField} from 'sanity'

/**
 * Service subpage — 38 informational subpages under each service.
 * Example: /polishing/headlight-polishing
 */
export default defineType({
  name: 'serviceSubpage',
  title: 'Подстраница услуги',
  type: 'document',
  fields: [
    defineField({
      name: 'service',
      title: 'Услуга',
      type: 'reference',
      to: [{type: 'service'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug (полный путь)',
      type: 'slug',
      description: 'Например: polishing/headlight-polishing',
      options: {source: 'titleRu'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'titleKa', title: 'Заголовок (КА)', type: 'string', group: 'content'}),
    defineField({name: 'titleRu', title: 'Заголовок (РУ)', type: 'string', group: 'content'}),
    defineField({name: 'titleEn', title: 'Заголовок (EN)', type: 'string', group: 'content'}),
    defineField({name: 'contentKa', title: 'Контент (КА)', type: 'text', rows: 8, group: 'content'}),
    defineField({name: 'contentRu', title: 'Контент (РУ)', type: 'text', rows: 8, group: 'content'}),
    defineField({name: 'contentEn', title: 'Контент (EN)', type: 'text', rows: 8, group: 'content'}),
    defineField({name: 'seoTitleKa', title: 'SEO Title (КА)', type: 'string', group: 'seo'}),
    defineField({name: 'seoTitleRu', title: 'SEO Title (РУ)', type: 'string', group: 'seo'}),
    defineField({name: 'seoTitleEn', title: 'SEO Title (EN)', type: 'string', group: 'seo'}),
    defineField({name: 'seoDescriptionKa', title: 'Meta Description (КА)', type: 'text', rows: 2, group: 'seo'}),
    defineField({name: 'seoDescriptionRu', title: 'Meta Description (РУ)', type: 'text', rows: 2, group: 'seo'}),
    defineField({name: 'seoDescriptionEn', title: 'Meta Description (EN)', type: 'text', rows: 2, group: 'seo'}),
  ],
  groups: [
    {name: 'content', title: 'Контент'},
    {name: 'seo', title: 'SEO'},
  ],
  preview: {
    select: {title: 'titleRu', subtitle: 'slug.current'},
  },
})

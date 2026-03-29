import {defineType, defineField} from 'sanity'

/**
 * Blog post — 15 articles + standalone pages.
 */
export default defineType({
  name: 'blogPost',
  title: 'Статья блога',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'Например: blog/car-detailing-guide или how-to-choose-detailing-studio',
      options: {source: 'titleRu'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          {title: 'Блог', value: 'blog'},
          {title: 'Статья', value: 'article'},
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публикации',
      type: 'date',
    }),
    // Titles
    defineField({name: 'titleKa', title: 'Заголовок (КА)', type: 'string', group: 'content'}),
    defineField({name: 'titleRu', title: 'Заголовок (РУ)', type: 'string', group: 'content'}),
    defineField({name: 'titleEn', title: 'Заголовок (EN)', type: 'string', group: 'content'}),
    // Content (portable text)
    defineField({
      name: 'bodyKa',
      title: 'Текст (КА)',
      type: 'array',
      group: 'content',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'bodyRu',
      title: 'Текст (РУ)',
      type: 'array',
      group: 'content',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'bodyEn',
      title: 'Текст (EN)',
      type: 'array',
      group: 'content',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
    }),
    // Cover image
    defineField({
      name: 'coverImage',
      title: 'Обложка',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),
    // SEO
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

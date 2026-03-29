import {defineType, defineField} from 'sanity'

/**
 * Singleton: global site settings.
 * Editable content: phones, addresses, hours, socials.
 */
export default defineType({
  name: 'siteSettings',
  title: 'Настройки сайта',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Название сайта',
      type: 'string',
      initialValue: 'BESTAUTO',
    }),
    defineField({
      name: 'studios',
      title: 'Студии',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'studio',
          fields: [
            defineField({name: 'id', title: 'ID', type: 'slug', options: {source: 'nameRu'}}),
            defineField({
              name: 'nameKa',
              title: 'Название (КА)',
              type: 'string',
            }),
            defineField({
              name: 'nameRu',
              title: 'Название (РУ)',
              type: 'string',
            }),
            defineField({
              name: 'nameEn',
              title: 'Название (EN)',
              type: 'string',
            }),
            defineField({
              name: 'addressKa',
              title: 'Адрес (КА)',
              type: 'string',
            }),
            defineField({
              name: 'addressRu',
              title: 'Адрес (РУ)',
              type: 'string',
            }),
            defineField({
              name: 'addressEn',
              title: 'Адрес (EN)',
              type: 'string',
            }),
            defineField({
              name: 'phone',
              title: 'Телефон',
              type: 'string',
              description: 'Формат: +99555000XXXX',
            }),
            defineField({
              name: 'whatsapp',
              title: 'WhatsApp ссылка',
              type: 'url',
            }),
            defineField({
              name: 'googleMapsUrl',
              title: 'Google Maps ссылка',
              type: 'url',
            }),
            defineField({
              name: 'hoursKa',
              title: 'Часы работы (КА)',
              type: 'string',
            }),
            defineField({
              name: 'hoursRu',
              title: 'Часы работы (РУ)',
              type: 'string',
            }),
            defineField({
              name: 'hoursEn',
              title: 'Часы работы (EN)',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'nameRu'},
          },
        },
      ],
    }),
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'socialTikTok',
      title: 'TikTok URL',
      type: 'url',
    }),
    defineField({
      name: 'ga4Id',
      title: 'Google Analytics 4 ID',
      type: 'string',
      description: 'Например: G-C088QPT7KV',
      readOnly: true,
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {title: 'siteName'},
  },
})

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Get project ID and dataset from environment variables
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'bestauto',
  title: 'BESTAUTO CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('BESTAUTO')
          .items([
            S.listItem()
              .title('Настройки сайта')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Главная страница')
              .child(S.document().schemaType('homepage').documentId('homepage')),
            S.listItem()
              .title('Страница цен')
              .child(S.document().schemaType('pricingPage').documentId('pricingPage')),
            S.divider(),
            S.documentTypeListItem('service').title('Услуги'),
            S.documentTypeListItem('blogPost').title('Блог'),
            S.divider(),
            S.documentTypeListItem('serviceSubpage').title('Подстраницы услуг'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

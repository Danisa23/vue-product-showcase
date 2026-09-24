import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'techDark',
    themes: {
      techDark: {
        dark: true,
        colors: {
          background: '#050914',
          surface: '#0A1220',
          'surface-variant': '#0E1A2C',
          primary: '#3B8DFF',
          secondary: '#55E7FF',
          accent: '#6C63FF',
          success: '#48D6A8',
          warning: '#FFC96A',
          error: '#FF6B7D',
          info: '#67A9FF',
          'on-background': '#F5F9FF',
          'on-surface': '#F0F6FF'
        }
      },
      techLight: {
        dark: false,
        colors: {
          background: '#F4F7FB',
          surface: '#FFFFFF',
          'surface-variant': '#EEF3F8',
          primary: '#216FE8',
          secondary: '#0C7898',
          accent: '#6158E8',
          success: '#16835F',
          warning: '#B7750A',
          error: '#C43E54',
          info: '#2368C7',
          'on-background': '#0D1A2B',
          'on-surface': '#0E1D30'
        }
      }
    }
  },
  defaults: {
    VBtn: { rounded: 'lg', elevation: 0 },
    VCard: { rounded: 'xl', elevation: 0 },
    VTextField: { variant: 'outlined', density: 'comfortable', hideDetails: true },
    VSelect: { variant: 'outlined', density: 'comfortable', hideDetails: true },
    VChip: { rounded: 'lg' }
  }
})

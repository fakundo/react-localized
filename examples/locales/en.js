import format from 'date-fns/format'
import { createLocale } from 'react-localized-core'

export default createLocale(null, {
  formatDate: format,
  formats: {
    date: 'MMMM d, yyyy',
  },
})

import formatDate from 'date-fns/format'
import { createLocale } from 'react-localized'

export default createLocale(null, {
  formatDate,
  formats: {
    date: 'MMMM d, yyyy',
  },
})

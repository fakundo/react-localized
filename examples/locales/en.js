import format from 'date-fns/format'
import { createLocale } from '../../src'

export default createLocale(null, {
  formatDate: format,
  formats: {
    time: 'HH:mm',
    date: 'MM/dd/yyyy',
    dateTime: 'MM/dd/yyyy HH:mm',
    humanizedDate: 'MMMM d, yyyy',
  }
})

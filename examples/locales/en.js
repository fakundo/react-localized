import format from 'date-fns/format'
import { createLocale } from '../../src'

export default createLocale(null, {
  formatDate: format,
  formats: {
    time: 'HH:mm',
    date: 'MM/DD/YYYY',
    dateTime: 'MM/DD/YYYY HH:mm',
    humanizedDate: 'MMMM D, YYYY',
  }
})

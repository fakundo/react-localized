import format from 'date-fns/format'
import { createLocaleData } from '../../src'

export default createLocaleData(null, {
  formatDate: format,
  formats: {
    time: 'HH:mm',
    date: 'MM/DD/YYYY',
    dateTime: 'MM/DD/YYYY HH:mm',
    humanizedDate: 'MMMM D, YYYY',
  }
})

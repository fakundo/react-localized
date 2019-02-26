import format from 'date-fns/format'
import locale from 'date-fns/locale/ru'
import messages from './ru.po'
import { createLocale } from '../../src'

export default createLocale(messages, {
  formatDate: (date, formatStr) => format(date, formatStr, { locale }),
  formats: {
    time: 'HH:mm',
    date: 'DD.MM.YYYY',
    dateTime: 'DD.MM.YYYY HH:mm',
    humanizedDate: 'DD MMMM YYYY',
  }
})

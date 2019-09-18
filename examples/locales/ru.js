import format from 'date-fns/format'
import locale from 'date-fns/locale/ru'
import messages from './ru.po'
import { createLocale } from '../../src'

export default createLocale(messages, {
  formatDate: (date, formatStr) => format(date, formatStr, { locale }),
  formats: {
    time: 'HH:mm',
    date: 'dd.MM.yyyy',
    dateTime: 'dd.MM.yyyy HH:mm',
    humanizedDate: 'dd MMMM yyyy',
  }
})

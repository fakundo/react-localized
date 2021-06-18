import formatDate from 'date-fns/format'
import locale from 'date-fns/locale/ru'
import { createLocale } from 'react-localized'
import messages from './ru.po'

export default createLocale(messages, {
  formatDate: (date, formatStr) => formatDate(date, formatStr, { locale }),
  formats: {
    date: 'dd MMMM yyyy',
  },
})

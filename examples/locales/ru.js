import format from 'date-fns/format'
import locale from 'date-fns/locale/ru'
import { createLocale } from 'react-localized-core'
import messages from './ru.po'

export default createLocale(messages, {
  formatDate: (date, formatStr) => format(date, formatStr, { locale }),
  formats: {
    date: 'dd MMMM yyyy',
  },
})

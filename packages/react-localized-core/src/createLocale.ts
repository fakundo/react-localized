import { LocaleData, LocaleDataExtra, LocaleDataMessages } from './types'

export default (messages?: LocaleDataMessages, extra?: LocaleDataExtra): LocaleData => ({
  messages, extra,
})

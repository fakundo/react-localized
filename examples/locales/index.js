import englishData from './en'

export default {
  en: englishData,
  ru: () => import('./ru').then(data => data.default),
}

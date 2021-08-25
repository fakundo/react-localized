import en from './en'

const Locales = {
  en,
  ru: () => import('./ru').then((data) => data.default),
}

export default Locales

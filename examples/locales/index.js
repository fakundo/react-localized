import en from './en'
// import ru from './ru'

export default {
  en,
  // ru,
  ru: () => import('./ru').then((data) => data.default),
}

export type LocaleDataMessages = {
  [key: string]: any
  headers?: object
  translations?: object
} | null

export type LocaleDataExtra = object | null

export type LocaleData = {
  messages?: LocaleDataMessages
  extra?: LocaleDataExtra
}

export enum GettextFunctions {
  GETTEXT = 'gettext',
  PGETTEXT = 'pgettext',
  NGETTEXT = 'ngettext',
  NPGETTEXT = 'npgettext',
}

export type AliasObject = {
  [key in GettextFunctions]?: string
}

export type Alias = string | AliasObject

export type GetPluralForm = (n: number) => number

export type LocalizedContext = {
  Provider: object
}

export type Gettext = {
  (text: string): string
  (inputs: TemplateStringsArray, ...values: any[]): string
}

export type Pgettext = {
  (ctx: string, text: string): string
  (ctx: string):
    (inputs: TemplateStringsArray, ...values: any[]) =>
      string
}

export type Ngettext = {
  (text: string, textPlural: string, n: number): string
  (inputs: TemplateStringsArray, ...values: any[]):
    (inputsPlural: TemplateStringsArray, ...valuesPlural: any[]) =>
      (n: number) =>
        string
}

export type Npgettext = {
  (ctx: string, text: string, textPlural: string, n: number): string
  (ctx: string):
    (inputs: TemplateStringsArray, ...values: any[]) =>
      (inputsPlural: TemplateStringsArray, ...valuesPlural: any[]) =>
        (n: number) =>
          string
}

export type LocalizedContextValue = {
  [key: string]: any
  [key: number]: any
  locale: string
  [GettextFunctions.GETTEXT]: Gettext
  [GettextFunctions.PGETTEXT]: Pgettext
  [GettextFunctions.NGETTEXT]: Ngettext
  [GettextFunctions.NPGETTEXT]: Npgettext
}

export interface CreateLocalizedContextOptions {
  createContext: any, // @todo
}

export interface CreateUseLocalesOptions {
  localizedContext: LocalizedContext
  useContext: any, // @todo
}

export interface CreateWithLocalesOptions {
  useLocales: () => LocalizedContextValue
  createElement: any // @todo
  forwardRef: any // @todo
}

export interface CreateLocalizedProviderOptions {
  localizedContext: LocalizedContext
  createElement: any // @todo
  useEffect: any // @todo
  useState: any // @todo
  useMemo: any // @todo
}

export interface LocalizedProviderProps {
  children: (state: LocalizedProviderState) => any // @todo
  locales?: { [key: string]: LocaleData | (() => Promise<LocaleData>) }
  selected?: string
  alias?: Alias
}

export interface LocalizedProviderState {
  localeReady: boolean
}

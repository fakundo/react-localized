import { GettextExtractor, JsExtractors } from 'gettext-extractor'
import templateExtractors from './templateExtractors'

const GETTEXT = 'gettext'
const NGETTEXT = 'ngettext'
const PGETTEXT = 'pgettext'
const NPGETTEXT = 'npgettext'

const compact = (array) => (
  array.filter((item) => !!item)
)

export default (source, derivedAlias) => {
  const extractor = new GettextExtractor()

  const alias = typeof derivedAlias === 'string'
    ? { [GETTEXT]: derivedAlias }
    : derivedAlias

  const gettext = compact([GETTEXT, alias?.[GETTEXT]])
  const pgettext = compact([PGETTEXT, alias?.[PGETTEXT]])
  const ngettext = compact([NGETTEXT, alias?.[NGETTEXT]])
  const npgettext = compact([NPGETTEXT, alias?.[NPGETTEXT]])

  extractor
    .createJsParser([
      templateExtractors({
        gettext, pgettext, ngettext, npgettext,
      }),
      JsExtractors.callExpression(gettext, {
        arguments: { text: 0 },
      }),
      JsExtractors.callExpression(ngettext, {
        arguments: { text: 0, textPlural: 1 },
      }),
      JsExtractors.callExpression(pgettext, {
        arguments: { context: 0, text: 1 },
      }),
      JsExtractors.callExpression(npgettext, {
        arguments: { context: 0, text: 1, textPlural: 2 },
      }),
    ])
    .parseFilesGlob(source)

  return extractor
}

import { GettextExtractor, JsExtractors } from 'gettext-extractor'

const extractor = new GettextExtractor()

export default (source) => {
  extractor
    .createJsParser([
      JsExtractors.callExpression('gettext', {
        arguments: {
          text: 0,
        },
      }),
      JsExtractors.callExpression('ngettext', {
        arguments: {
          text: 0,
          textPlural: 1,
        },
      }),
      JsExtractors.callExpression('pgettext', {
        arguments: {
          context: 0,
          text: 1,
        },
      }),
      JsExtractors.callExpression('npgettext', {
        arguments: {
          context: 0,
          text: 1,
          textPlural: 2,
        },
      }),
    ])
    .parseFilesGlob(source)

  return extractor
}

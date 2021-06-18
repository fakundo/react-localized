import * as ts from 'typescript'

const EXPRESSION_REPLACER = '${}'
const UNDEFINED_CONTEXT = 'undefined'

const getTextFromTemplate = (template) => {
  switch (template.kind) {
    case ts.SyntaxKind.FirstTemplateToken: {
      return template.text
    }
    case ts.SyntaxKind.TemplateExpression: {
      const chunks = [template.head.text]
      template.templateSpans.forEach((span) => {
        chunks.push(span.literal.text)
      })
      return chunks.join(EXPRESSION_REPLACER)
    }
    default:
      return ''
  }
}

const getContextFromArguments = (args) => (
  args[0]?.text || UNDEFINED_CONTEXT
)

const addGettext = (node, addMessage) => {
  addMessage({
    text: getTextFromTemplate(node.template),
  })
}

const addPgettext = (node, addMessage) => {
  if (node.parent?.kind === ts.SyntaxKind.TaggedTemplateExpression) {
    addMessage({
      text: getTextFromTemplate(node.parent.template),
      context: getContextFromArguments(node.arguments),
    })
  }
}

const addNgettext = (node, addMessage) => {
  if (
    node.parent?.kind === ts.SyntaxKind.TaggedTemplateExpression
    && node.parent.parent?.kind === ts.SyntaxKind.CallExpression
  ) {
    addMessage({
      text: getTextFromTemplate(node.template),
      textPlural: getTextFromTemplate(node.parent.template),
    })
  }
}

const addNpgettext = (node, addMessage) => {
  if (
    node.parent?.kind === ts.SyntaxKind.TaggedTemplateExpression
    && node.parent.parent?.kind === ts.SyntaxKind.TaggedTemplateExpression
  ) {
    addMessage({
      context: getContextFromArguments(node.arguments),
      text: getTextFromTemplate(node.parent.template),
      textPlural: getTextFromTemplate(node.parent.parent.template),
    })
  }
}

export default ({ gettext, pgettext, ngettext, npgettext }) => (
  (node, sourceFile, addMessage) => {
    switch (node.kind) {
      case ts.SyntaxKind.CallExpression:
        switch (true) {
          case pgettext.includes(node.expression.text):
            addPgettext(node, addMessage)
            break
          case npgettext.includes(node.expression.text):
            addNpgettext(node, addMessage)
            break
        }
        break
      case ts.SyntaxKind.TaggedTemplateExpression:
        switch (true) {
          case gettext.includes(node.tag.text):
            addGettext(node, addMessage)
            break
          case ngettext.includes(node.tag.text):
            addNgettext(node, addMessage)
            break
        }
        break
    }
  }
)

// @ts-ignore
import { Component } from 'lib'
import { withLocales } from 'react-localized'

interface Props {
  pgettext: (ctx: string, text: string) => string
  npgettext: (ctx: string, text: string, textPlural: string, n: number) => string
  formats: { date: string }
  formatDate: (date: Date, format: string) => string
}

// eslint-disable-next-line
class DecoratedClassComponent extends Component<Props> {
  render() {
    // @ts-ignore
    const { pgettext, npgettext, formats, formatDate } = this.props
    return (
      <>
        <p>{formatDate(new Date(), formats.date)}</p>
        <p>{pgettext('Context', 'Text with context')}</p>
        <p>2 {npgettext('Context', 'table', 'tables', 2)}</p>
      </>
    )
  }
}

export default withLocales()(DecoratedClassComponent)

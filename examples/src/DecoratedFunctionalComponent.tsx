import { withLocales } from 'react-localized'

const DecoratedFunctionalComponent = ({ ngettext }) => (
  <>
    <p>1 {ngettext('apple', 'apples', 1)}</p>
    <p>2 {ngettext('apple', 'apples', 2)}</p>
    <p>5 {ngettext('apple', 'apples', 5)}</p>
  </>
)

export default withLocales()(DecoratedFunctionalComponent)

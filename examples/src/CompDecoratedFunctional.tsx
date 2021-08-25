import { withLocales } from 'react-localized'

const CompDecoratedFunctional = ({ ngettext }) => (
  <>
    <p>1 {ngettext('apple', 'apples', 1)}</p>
    <p>2 {ngettext('apple', 'apples', 2)}</p>
    <p>5 {ngettext('apple', 'apples', 5)}</p>
  </>
)

const CompDecoratedFunctionalWithLocales = withLocales<{}>()(CompDecoratedFunctional)

export default CompDecoratedFunctionalWithLocales

import { useLocales } from 'react-localized'

const CompHook = () => {
  const { gettext } = useLocales()
  return (
    <>
      <p>{gettext('Hello, World!')}</p>
    </>
  )
}

export default CompHook

export default ({ createElement, forwardRef, useLocales }) => () => (component) => (
  forwardRef((ownProps, ref) => {
    const localeProps = useLocales()
    return createElement(component, { ...ownProps, ...localeProps, ref })
  })
)

export function Button({ children, variant = 'secondary', className = '', ...props }) {
  const hasWidthClass = /(^|\s)(w-|min-w-|max-w-)[^\s]+/.test(className)
  const baseClasses = `h-10 flex ${hasWidthClass ? 'w-auto' : 'w-full'} justify-center rounded-md px-3 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`

  const variants = {
    primary: 'bg-azulBase text-white hover:bg-azulBaseHover focus-visible:outline-azulBase',
    secondary: 'bg-whiteBase text-azulBase hover:bg-whiteBaseHover hover:outline hover:outline-2 hover:outline-whiteBaseHover',
  }

  const mergedClassName = `${baseClasses} ${variants[variant]} ${className}`.trim()

  return (
    <button {...props} className={mergedClassName}>
      {children}
    </button>
  )
}

export default Button;
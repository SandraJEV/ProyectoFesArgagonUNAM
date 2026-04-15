export function Button({ children, variant = 'secondary', ...props }) {
  const baseClasses = 'h-10 flex w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const variants = {
    primary: 'bg-azulBase text-white hover:bg-azulBaseHover focus-visible:outline-azulBase',
    secondary: 'bg-whiteBase text-azulBase hover:bg-whiteBaseHover hover:outline hover:outline-2 hover:outline-whiteBaseHover',
  }

  const className = `${baseClasses} ${variants[variant]}`

  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
}

export default Button;
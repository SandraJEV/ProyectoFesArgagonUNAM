export function Button({ children, ...props }) {
  return (
    <button
       className="h-10 flex w-full justify-center rounded-md bg-azulBase px-3 py-2.5 text-sm font-semibold text-white shadow-sm 
      hover:bg-azulBaseHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azulBase"
    >

      {children}
    </ button>


      );
}

      export default Button;
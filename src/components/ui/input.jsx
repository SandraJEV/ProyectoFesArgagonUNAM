export function Input(props) {
  return (
    <input
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline 
      outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 
      focus:-outline-offset-2 focus:outline-azulBase sm:text-sm/6"
      {...props}
    />

  );
}

export default Input;
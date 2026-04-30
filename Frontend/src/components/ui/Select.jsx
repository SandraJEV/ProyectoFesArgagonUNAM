'use client'
import { useState, useEffect } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import "./../../styles/tooltip.css";

export function Select({ options = [], selected, onChange }) {
  const [selectedOption, setSelectedOption] = useState(
    selected ?? { id: null, name: 'Seleccionar' }
  );

  useEffect(() => {
    setSelectedOption(selected ?? { id: null, name: 'Seleccionar' });
  }, [selected]);

  return (
    <Listbox
      value={selectedOption}
      onChange={(value) => {
        setSelectedOption(value)
        onChange?.(value)
      }}
    >
      <div className="relative">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md
                                bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 
                                outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-azulBase sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {selectedOption?.imagen && (
              <img alt="" src={selectedOption.imagen} className="size-5 shrink-0 rounded-full" />
            )}
            <span
              className={`block truncate ${selectedOption?.imagen ? 'ml-1' : ''}`}
              title={selectedOption?.name}  // tooltip nativo opcional
            >
              {selectedOption?.name || 'Seleccionar'}
            </span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute left-0 z-50 mt-1 max-h-56 w-max min-w-[14rem] max-w-[32rem] 
                     overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 
                     focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition 
                     data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              disabled={option.id === -1}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 
                         data-[focus]:bg-azulBase data-[focus]:text-white data-[focus]:outline-none"
            >
              <div className="flex items-center">
                {option.imagen && (
                  <img alt="" src={option.imagen} className="size-5 shrink-0 rounded-full" />
                )}
                <span
                  className="ml-3 block font-normal whitespace-nowrap group-data-[selected]:font-semibold"
                  title={option.name}  // tooltip nativo opcional
                >
                  {option.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-azulBase group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}

export default Select;

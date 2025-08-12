import { IncidentsList } from './IncidentsList'
import { IncidentsFilters } from './IncidentsFilters'
import Loading from './../ui/loading'
import Found from './../../assets/images/noFind.png'

'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export function IncidentsView() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);




    return (
        <div className="w-full max-w-[90rem] mx-auto mt-8 bg-white rounded-xl shadow-lg px-4 sm:px-6 md:px-10 lg:px-16 py-10 min-h-[10rem] space-y-6">

            <div>


                <main className="mx-auto w-full px-4 ">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Incidencias</h1>

                        <div className="flex items-center">


                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <div className="hidden lg:block">
                                <IncidentsFilters onResults={setResults} setIsLoading={setIsLoading}></IncidentsFilters>
                            </div>

                            {/* Incidents grid */}
                            <div className="lg:col-span-3 flex items-center justify-center">
                                {isLoading && <Loading />}
                                {!isLoading && results?.data?.length > 0 && <IncidentsList data={results} />}
                                {!isLoading && results?.data?.length === 0 && (
                                    <div className="text-center space-y-4">
                                        <img src={Found} alt="Sin resultados" className="w-32 mx-auto" />
                                        <p className="text-gray-500 text-sm">No se encontraron resultados con los criterios de busqueda.</p>
                                    </div>
                                )}
                                {!isLoading && hasError && (
                                    <p className="text-red-500 text-sm"> Ocurrió un error al buscar incidencias.</p>
                                )}

                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}


export default IncidentsView;
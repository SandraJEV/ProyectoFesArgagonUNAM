import { useState } from 'react'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button"
import DynamicForm from "../../components/ui/FormDinamico"
import api from '../../services/api'
import logo  from "../../assets/images/UNAM-FES-Aragon.png" 

function Login() {

  return (
     <>
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pb-10">
        <img
          src={logo}
          alt="Logo FES Aragón"
          className="absolute top-10 left-24 h-20 w-auto h-15"
        />
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg px-8 py-10 min-h-[34rem]">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Inicia sesión
          </h2>
          <img
            alt="User Icon"
            src="https://www.jmautos.cl/wp-content/themes/car-manager/images/not-login-icon.png"
            className="mx-auto my-6 h-14 w-15"
          />
          <DynamicForm formId={1} onSubmit={(data) => console.log('Formulario listo:', data)} />

         
        </div>
      </div>
    </>

  )
}

export default Login

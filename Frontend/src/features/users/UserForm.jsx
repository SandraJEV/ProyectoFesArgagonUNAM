import { useEffect, useState } from 'react'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button"
import { Select } from "../../components/ui/Select";
import { FormMensajes } from "../../components/ui/FormMensajes"
import DynamicForm from "../../components/ui/FormDinamico"
import api from '../../services/api'
import logo from "../../assets/images/UNAM-FES-Aragon.png"

function UserForm() {


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
            Registrar Usuario
          </h2>
          <DynamicForm
            formId={2}
            onSubmit={async (data) => {
              try {
                const response = await api.post('/User/create', data)
                console.log('Usuario registrado exitosamente:', response.data)
                // Aquí podrías redirigir o mostrar un mensaje de éxito
              } catch (error) {
                console.error('Error al registrar usuario:', error)
              }
            }}
          />
        </div>
      </div>
    </>

  )
}

export default UserForm

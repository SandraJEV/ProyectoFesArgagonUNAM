import { useState } from 'react'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button"
import { Select } from "../../components/ui/Select";
import { FormMensajes } from "../../components/ui/FormMensajes"
import logo  from "../../assets/images/UNAM-FES-Aragon.png" 

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
          <form className="space-y-6">
            <div>
              <Label htmlFor="Name">Nombre(s)</Label>
              <Input
                id="Name"
                name="Name"
                type="text"
                required
                autoComplete="Name"
                placeholder="Nombre"
              />
            </div>

            <div>
              <Label htmlFor="LastName">Apellidos</Label>
              <Input
                id="LastName"
                name="LastName"
                type="text"
                required
                autoComplete="LastName"
                placeholder="Apellidos"
              />
            </div>

            <div>
              <Label htmlFor="Area">Área</Label>
              <Select id="Area"></Select>
            </div>

            <div>
              <Label htmlFor="Puesto">Puesto</Label>
              <Select id="Puesto"></Select>
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="Contraseña"
                type="password"
                required
                autoComplete="current-password"
                placeholder="*********"
              />
              <FormMensajes />
            </div>
            <div>
              <Label htmlFor="passwordAgain">Confirma tu contraseña</Label>
              <Input
                id="passwordAgain"
                name="passwordAgain"
                type="passwordAgain"
                required
                autoComplete="current-passwordAgain"
                placeholder="*********"
              />
              <FormMensajes />
            </div>

            <div>
              <Button type="submit">
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default UserForm

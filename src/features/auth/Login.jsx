import { useState } from 'react'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button"
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

          <form className="space-y-6">
            <div>
              <Label htmlFor="Usuario">Usuario</Label>
              <Input
                id="Usuario"
                name="Usuario"
                type="text"
                required
                autoComplete="Usuario"
                placeholder="Usuario"
              />
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
              <div className="mt-1 text-sm">
                <a
                  href="#"
                  className="font-semibold text-gray-500 hover:text-gray-400"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full bg-[#1D5D94] hover:bg-[#4188C5]">
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

export default Login

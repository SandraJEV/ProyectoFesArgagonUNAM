import { useEffect, useState } from 'react'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button"
import { Select } from "../../components/ui/Select";
import { FormMensajes } from "../../components/ui/FormMensajes"
import { DynamicForm } from "../../components/ui/FormDinamico"
import api from '../../services/api'
import logo from "../../assets/images/UNAM-FES-Aragon.png"

function UserForm() {

  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState(null)

  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(null)

  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');


  useEffect(() => {
    const controller = new AbortController()

    api.get('/Area', { signal: controller.signal })
      .then(res => {
        setAreas(res.data)
        console.log('Area ', res.data);

      })
      .catch(error => {
        if (error.name !== 'CanceledError') {
          console.error("Error al cargar áreas:", error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    api.get('/Role', { signal: controller.signal })
      .then(res => {
        console.log('Roles:', res.data)
        setRoles(res.data)
        setSelectedRole(res.data[0])
      })
      .catch(error => {
        if (error.name !== 'CanceledError') {
          console.error("Error al cargar roles:", error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [])


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
          <DynamicForm formId={2} onSubmit={(data) => console.log('Formulario listo:', data)} />
        </div>
      </div>
    </>

  )
}

export default UserForm

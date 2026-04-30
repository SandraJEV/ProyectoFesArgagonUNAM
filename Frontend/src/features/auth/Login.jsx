import { useState } from 'react'
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button"
import DynamicForm from "../../components/ui/FormDinamico"
import api from '../../services/api'
import logo  from "../../assets/images/UNAM-FES-Aragon.png" 
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../services/authService";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    console.log("Login data:", formData);

    const result = await loginRequest({
      email: formData.email,
      password: formData.password
    });

    if (result.resultCode === 0) {
      // guardar sesión
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      // redirigir
      navigate("/dashboard");
      console.log('Result login',result);
      
    } else {
      setErrorMsg(result.resultMessage);
    }
  };

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
          <DynamicForm formId={2} onSubmit={handleLogin} formError={errorMsg} />
         
        </div>
      </div>
    </>

  )
}

export default Login

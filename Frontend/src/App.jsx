import { useState, useEffect } from 'react'
import './index.css';
import Login from "./features/auth/Login";
import UserForm from "./features/users/UserForm";
import RequestForm from './features/requests/RequestForm';
import { Header } from "./layout/Header"



function App() {
  

  return (
    <div className='min-h-screen items-center justify-center bg-background'> 

      <Header />
      <RequestForm/>
      
    </div>
    // <UserForm />
    // <Login></Login>

  )
}

export default App

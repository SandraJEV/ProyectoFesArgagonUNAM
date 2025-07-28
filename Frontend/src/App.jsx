import { useState, useEffect } from 'react'
import './index.css';
import Login from "./features/auth/Login";
import UserForm from "./features/users/UserForm";
import RequestForm from './features/requests/RequestForm';
import { Header } from "./layout/Header"
import { IncidentsView } from './components/Incidents/IncidentsView'


function App() {


  return (
    <div className='min-h-screen items-center justify-center bg-background'>

      <Header />
      {/* <div className="w-[90%] max-w-screen-xl mt-8 mx-auto bg-white rounded-xl shadow-lg px-4 md:px-10 py-10 min-h-[10rem] space-y-6">
      </div> */}


      <IncidentsView></IncidentsView>
      {/* <RequestForm/> */}

    </div>
    // <UserForm />
    // <Login></Login>

  )
}

export default App

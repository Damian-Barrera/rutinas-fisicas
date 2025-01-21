import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import RutinasDiarias from '../components/RutinasDiarias'
import Ejercicios from '../components/Ejercicios'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'



const Rutas = () => {

  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      setUsuario(user);

      if(user && window.location.pathname === '/login'){
        navigate('/ejercicios')
      }if(user && window.location.pathname === '/register'){
        navigate('/ejercicios')
      } 

    });
  
    return () => unsubscribe();
  }, [navigate]);

  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/register' element={<Register />} ></Route>/
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/rutinas-diarias' element= {<RutinasDiarias/>} ></Route>
        <Route path='/ejercicios' element={usuario ? <Ejercicios /> : <Navigate to='/' />} ></Route>
        <Route path='/*' element={<Navigate to='/' />} ></Route>
      </Routes>
    </>
  )
}

export default Rutas

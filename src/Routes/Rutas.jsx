import { Routes, Route,Navigate } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import Ejercicios from '../components/Ejercicios'

const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/register' element={<Register/>} ></Route>/
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/ejercicios' element={<Ejercicios/>} ></Route>
        <Route path='/*' element= {<Navigate to='/'/>} ></Route>
      </Routes>
    </>
  )
}

export default Rutas

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from '../components/Home'
import Register from '../components/Register'
import Login from '../components/Login'
import RutinasDiarias from '../components/RutinasDiarias'
import Ejercicios from '../components/Ejercicios'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'
import Loader from '../utils/Loader'


// const Rutas = () => {

//   const [usuario, setUsuario] = useState(null)
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {

//       setUsuario(user);

//       if(user && window.location.pathname === '/login'){
//         navigate('/ejercicios')
//       }if(user && window.location.pathname === '/register'){
//         navigate('/ejercicios')
//       } 

//     });

//     return () => unsubscribe();
//   }, [navigate]);


//   return (
//     <>
//       <Routes>
//         <Route path='/' element={<Home />} ></Route>
//         <Route path='/register' element={<Register />} ></Route>/
//         <Route path='/login' element={<Login />} ></Route>
//         <Route path='/rutinas-diarias' element= {<RutinasDiarias/>} ></Route>
//         <Route path='/ejercicios' element={usuario ? <Ejercicios /> : <Navigate to='/' />} ></Route>
//         <Route path='/*' element={<Navigate to='/' />} ></Route>
//       </Routes>
//     </>
//   )
// }

// export default Rutas


const Rutas = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setLoading(false); // Cambiar el estado cuando la autenticación se verifica

      if (user && window.location.pathname === '/login') {
        navigate('/ejercicios');
      }
      if (user && window.location.pathname === '/register') {
        navigate('/ejercicios');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Mostrar una pantalla de carga mientras se verifica el estado del usuario
  if (loading) {
    return <Loader loading={loading}  />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rutinas-diarias" element={<RutinasDiarias />} />
        <Route
          path="/ejercicios"
          element={usuario ? <Ejercicios /> : <Navigate to="/" />}
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Rutas;

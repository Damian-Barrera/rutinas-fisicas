import { NavLink, useNavigate } from 'react-router-dom'
import estilos from '../styles/form.module.css'
import { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Loader from '../utils/Loader'

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {

  }, [])

  const login = async () => {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential) {
        <Loader loading={loading} />
        // const uid = userCredential.user.uid
        navigate('/ejercicios')

      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  }

  return (
    <>
      {loading && <Loader loading={loading} />}
      <div className="wrapper">
        <form className={estilos.formulario} onKeyUp={handleKeyUp}>
          <h2>Inicia Sesión</h2>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <hr />
          <button type="button" onClick={login} >Ingresar</button>
          <p> ¿No tenes cuenta? <NavLink to='/register' >Registrate</NavLink> </p>
        </form>
      </div>
    </>
  )
}

export default Login

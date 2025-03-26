import { NavLink, useNavigate } from 'react-router-dom'
import estilos from '../styles/form.module.css'
import { useState } from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Loader from '../utils/Loader'
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [verClave, setVerClave] = useState(false)
  const [error, setError] = useState(false)

  // useEffect(() => {

  // }, [])

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
      if (error.code === 'auth/invalid-credential') {
        setError('Correo o contraseña incorrectos')
        setTimeout(() => {
          setError('')
        }, 3000);
      }
    }
    finally {
      setLoading(false); // Desactiva el spinner al finalizar
    }

  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  }

  return (
    <>

      <div className={estilos.wrapperLogin} >
        {loading && <Loader loading={loading} />}
        {!loading && (
          <div className="wrapper">
            <form className={estilos.formulario} onKeyUp={handleKeyUp}>
              <h2>Inicia Sesión</h2>

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Contraseña:</label>
              <div className={estilos.inputContainer}>
                <input
                  className={estilos.inputPass}
                  type={verClave ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className={estilos.eye} onClick={() => setVerClave(!verClave)}>
                  {verClave ? <LuEye /> : <LuEyeClosed />}
                </span>
              </div>
              <hr />
              <div>
                {
                  error ? <p className={estilos.alert} > {error} </p> : ''
                }
              </div>
              <button type="button" onClick={login} disabled={!email || !password} >
                Ingresar
              </button>
              <p>
                ¿No tenes cuenta? <NavLink to="/register">Registrate</NavLink>
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );

}

export default Login

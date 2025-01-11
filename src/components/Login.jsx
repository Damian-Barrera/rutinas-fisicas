import { NavLink } from 'react-router-dom'
import estilos from '../styles/form.module.css'


const Login = () => {
  return (
    <>
      <div className="wrapper">
        <form className={estilos.formulario}>
          <h2>Inicia Sesión</h2>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" required />
          <hr />
          <button type="submit">Registrarse</button>
          <p> ¿No tenes cuenta? <NavLink to='/register' >Registrate</NavLink> </p>
        </form>
      </div>
    </>
  )
}

export default Login

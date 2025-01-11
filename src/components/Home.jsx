import { NavLink } from "react-router-dom"
import estilos from '../styles/home.module.css'

const Home = () => {
  return (
    <>
      <div className="wrapper">
        <div className={estilos.container}>
          <h1>Bienvenido a tu tracker personal de ejercicios</h1>
          <NavLink to='login' >
            <button>Iniciar Sesión</button>
          </NavLink>

          <NavLink to='register'>
            <button>Registrarte</button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Home


import { NavLink } from 'react-router-dom'
import estilos from '../styles/form.module.css'

const Register = () => {
    return (
        <>
            <div className="wrapper">
                <form className={estilos.formulario}>
                    <h2>Por favor ingresa tus datos</h2>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required autoComplete='off' />

                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required autoComplete='off' />
                    <hr />

                    <label htmlFor="fecha">Fecha de Nacimiento:</label>
                    <input type="date" id="fecha" name="fecha" required />

                    <label htmlFor="genero">Género:</label>
                    <select id="genero" name="genero" required>
                        <option value="" disabled>Seleccione</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                    <hr />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" name="password" required />
                    <hr />
                    <button type="submit">Registrarse</button>
                    <p className='opciones'>¿Ya tenes cuenta? <NavLink to='/login'>Acceder</NavLink></p>
                </form>
            </div>
        </>
    )
}

export default Register

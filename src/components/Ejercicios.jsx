import estilos from '../styles/ejercicios.module.css'
import { useNavigate } from 'react-router-dom'


const Ejercicios = () => {

    const navigate = useNavigate();

    const cerrarSesion = () => {
        console.log('Sesion Cerrada')
        navigate('/')
    }

    const editarRegistro = () => {
        console.log('Editando Registro')
    }

    const borrarRegistro = () => {
        console.log('Borrando Registro')
    }

    return (
        <>
            <div className={estilos.ejerciciosContainer}>
                <div className={estilos.wraper}>
                    <h2>Mis Ejercicios:</h2>
                    <button onClick={cerrarSesion} >Cerrar Sesion</button>
                </div>
                <table>
                    <thead>
                        <tr className={estilos.encabezados} >
                            <th>Fecha</th>
                            <th>Flexiones</th>
                            <th>Dominadas</th>
                            <th>Sentadillas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className={estilos.tbody}>
                        <tr className={estilos.cuerpo}>
                            <td>09/01/2025</td>
                            <td>30</td>
                            <td>20</td>
                            <td>20</td>
                            <td>
                                <span className={estilos.edit} onClick={editarRegistro}>Editar</span> / <span className={estilos.delete} onClick={borrarRegistro} >Eliminar</span>
                            </td>
                        </tr>
                        <tr className={estilos.cuerpo} >
                            <td>11/01/2025</td>
                            <td>20</td>
                            <td>30</td>
                            <td>400</td>
                            <td>
                                <span className={estilos.edit} onClick={editarRegistro} >Editar</span> / <span className={estilos.delete} onClick={borrarRegistro} >Eliminar</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Ejercicios

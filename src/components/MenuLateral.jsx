import { useState } from 'react'
import estilos from '../styles/menuLateral.module.css'
import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const MenuLateral = () => {


    const [verMenu, setVerMenu] = useState(false)

    const showMenu = () => {
        setVerMenu(!verMenu)
    }

 

    const cerrarSesion = async () => {
        await signOut(auth)
    }
    return (
        <>
            <div className={estilos.hamburger} onClick={showMenu} > </div>
            <div className={`${estilos.menuLateral} ${verMenu ? estilos.mostrarMenu : ''}`}>
                <div className={estilos.menu}>
                    <span className={estilos.closeMenu} onClick={showMenu} >X</span>
                    <ul>
                        <li> <NavLink to='/'> Inicio </NavLink> </li>
                        <li> <NavLink to='/ejercicios'> Ejercicios </NavLink> </li>
                        <li> <NavLink to='/rutinas-diarias' > Rutinas </NavLink> </li>
                        <li> <span onClick={cerrarSesion} >Cerrar Sesión </span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MenuLateral

import estilos from '../styles/menuLateral.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { LuLogOut } from "react-icons/lu";
import { LuHouse } from "react-icons/lu";
import { LuBadgePlus } from "react-icons/lu";
import { LuFlag } from "react-icons/lu";
import { LuMail } from "react-icons/lu";



const MenuLateral = () => {


    const [verMenu, setVerMenu] = useState(false)
    // const [devContact, setDevContact] = useState(false)

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
                        <li> <NavLink to='/'>
                            <span className={estilos.menuIcons} >
                                <LuHouse color='green' />
                                Inicio
                            </span>

                        </NavLink> </li>
                        <li> <NavLink to='/ejercicios'>
                            <span className={estilos.menuIcons}>
                                <LuFlag color='green' />
                                Ejercicios
                            </span>
                        </NavLink> </li>
                        <li> <NavLink to='/rutinas-diarias' >
                            <span className={estilos.menuIcons} >
                                <LuBadgePlus color='green' />
                                Rutinas
                            </span></NavLink> </li>
                        <li> <NavLink to='/support' >
                            <span className={estilos.menuIcons} >
                                <LuMail color='green' />
                                Soporte Tecnico
                            </span>

                        </NavLink>  </li>
                        <li className={estilos.logOut} onClick={cerrarSesion}>
                            <span className={estilos.menuIcons} >
                                <LuLogOut color='green' />
                                Cerrar Sesión
                            </span>


                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MenuLateral

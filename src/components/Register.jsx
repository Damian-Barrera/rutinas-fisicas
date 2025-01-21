import { NavLink } from 'react-router-dom'
import estilos from '../styles/form.module.css'
import { useState } from 'react'
import { db, auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {  doc, setDoc } from 'firebase/firestore'

const Register = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [genero, setGenero] = useState('')
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [recontraseña, setRecontraseña] = useState('')

    const limpiarFormulario = () => {
        setNombre('');
        setApellido('');
        setNacimiento('');
        setGenero('');
        setEmail('');
        setContraseña('');
        setRecontraseña('');
    }

    const crearBaseDatos = async (uid) => {
        try {
            const usuarioRef = doc(db, 'rutinas', uid)
            await setDoc(usuarioRef, {
                nombre,
                apellido,
                fecha_nacimiento: nacimiento,
                genero,
                img_perfil_url: ''
            });

            // const ejerciciosRef = collection(usuarioRef, "ejercicios");
            // await addDoc(ejerciciosRef, {
            //     dominadas: 0,
            //     sentadillas: 0,
            //     flexiones: 0
            // });

        } catch (error) {
            console.log('Hubo un error al crear la base de datos', error)
        }
    }

    const registrar = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña)
            const user = userCredential.user
            const uid = user.uid

             crearBaseDatos(uid)

             limpiarFormulario();
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="wrapper">
                <form className={estilos.formulario}  >
                    <h2>Por favor ingresa tus datos</h2>
                    <label htmlFor="nombre" >Nombre:</label>
                    <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required autoComplete='off' />

                    <label htmlFor="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required autoComplete='off' />
                    <hr />

                    <label htmlFor="fecha">Fecha de Nacimiento:</label>
                    <input type="date" id="fecha" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} name="fecha" required />

                    <label htmlFor="genero">Género:</label>
                    <select id="genero" name="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required>
                        <option value="" disabled  >Seleccionar</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                    <hr />
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label htmlFor="password">Contraseña:</label>
                    <input className={estilos.password} type="password" name="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />

                    <label htmlFor="password">Repetir Contraseña:</label>
                    <input className={estilos.repassword} type="password" name="password" value={recontraseña} onChange={(e) => setRecontraseña(e.target.value)} required />

                    <hr />
                    <button type="button" disabled={!contraseña || contraseña !== recontraseña} onClick={registrar} >Registrarse</button>
                    <p className='opciones'>¿Ya tenes cuenta? <NavLink to='/login'>Acceder</NavLink></p>
                </form>
            </div>
        </>
    )
}

export default Register

import { NavLink } from 'react-router-dom'
import estilos from '../styles/form.module.css'
import { useState } from 'react'
import { db, auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import Loader from '../utils/Loader'
import { LuEye, LuEyeClosed } from "react-icons/lu";


const Register = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [genero, setGenero] = useState('')
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [recontraseña, setRecontraseña] = useState('')
    const [loading, setLoading] = useState(false)
    const [verClave, setVerClave] = useState(false)
    const [verClave2, setVerClave2] = useState(false)
    const [errorMail, setErrorMail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [alerta, setAlerta] = useState('')

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

    const registrar = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña)
            const user = userCredential.user
            const uid = user.uid

            crearBaseDatos(uid)

            limpiarFormulario();
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setErrorMail('Formato de correo incorrecto')

                    setTimeout(() => {
                        setErrorMail('')

                    }, 3000);
                    break;

                case 'auth/weak-password':
                    setErrorPassword('Debe contener minimo 6 caracteres')
                    setTimeout(() => {
                        setErrorPassword('')
                    }, 3000);
                    break;

                case 'auth/email-already-in-use':
                    setErrorMail('Este correo ya está registrado')
                    setTimeout(() => {
                        setErrorMail('')
                    }, 3000);
                    break;

                case 'auth/network-request-failed':
                    console.log('Error de conexión. Revisa tu internet.');
                    setAlerta('Error de conexion')
                    break;

                default:
                    console.log('Error desconocido:', error.message);
            }
        } finally {
            setLoading(false)
        }

    }


    return (
        <>
            <div className={estilos.wrapperRegister}>
                {loading && <Loader loading={loading} />}
                <div className="wrapper">
                    <form className={estilos.formulario} onSubmit={registrar} >
                        <h2>Por favor ingresa tus datos</h2>
                        <label htmlFor="nombre" >Nombre:</label>
                        <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required autoComplete='off' />

                        <label htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required autoComplete='off' />
                        <label htmlFor="genero">Género:</label>
                        <select id="genero" name="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required>
                            <option value="" disabled  >Seleccionar</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>


                        {/* <label htmlFor="fecha">Fecha de Nacimiento:</label>
                    <input type="date" id="fecha" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} name="fecha" /> */}

                        <hr />
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {errorMail && <p className={estilos.alert} > {errorMail} </p>}
                        <label htmlFor="password">Contraseña:</label>
                        <div className={estilos.inputContainer}>
                            <input className={estilos.password}
                                type={verClave ? 'text' : 'password'}
                                name="password"
                                value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
                            {errorPassword && <p className={estilos.alert} > {errorPassword} </p>}
                            <span className={estilos.eye} onClick={() => setVerClave(!verClave)} >
                                {verClave ? <LuEye /> : <LuEyeClosed />}
                            </span>
                        </div>
                        <label htmlFor="password">Repetir Contraseña:</label>
                        <div className={estilos.inputContainer}>
                            <input className={estilos.repassword}
                                type={verClave2 ? 'text' : 'password'}
                                name="password" value={recontraseña} onChange={(e) => setRecontraseña(e.target.value)} required />
                            <span className={estilos.eye} onClick={() => setVerClave2(!verClave2)} >
                                {verClave2 ? <LuEye /> : <LuEyeClosed />}
                            </span>
                        </div>
                        <hr />
                        {alerta && <p className={estilos.alert} > {alerta} </p>}
                        <button type="submit" disabled={!contraseña || contraseña !== recontraseña}  >Registrarse</button>
                        <p className='opciones'>¿Ya tenes cuenta? <NavLink to='/login'>Acceder</NavLink></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register

import { NavLink, useNavigate } from 'react-router-dom'
import estilos from '../styles/form.module.css'
import { useState, useEffect } from 'react'
import { db, auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut,sendEmailVerification } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import Loader from '../utils/Loader'
import { LuEye, LuEyeClosed } from "react-icons/lu";
// import google from '../assets/img/google.png'
// import facebook from '../assets/img/facebook.png'

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
    // const [redirigir, setRedirigir] = useState(false);
    // const [errorGoogle, setErrorGoogle] = useState('Esta cuenta ya existe');

    // const navigate = useNavigate();



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
            sendEmailVerification(user)
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
    // ********************************************+




    // const googleRegister = async () => {


    //     try {
    //         setLoading(true);

    //         const result = await signInWithPopup(auth, googleProvider);
    //         const user = result.user;

    //         const uid = user.uid;
    //         const nombre = user.displayName || "Usuario de Google";
    //         const email = user.email;
    //         const img_perfil_url = user.photoURL || "";

    //         const usuarioExistente = await verificarUsuarioExistente(uid);

    //         if (usuarioExistente) {
    //              await signOut(auth);                // Cierra sesión
 

    //             setTimeout(() => {
    //                 navigate('/register');
    //              }, 50);
    //             return;
    //         }

    //         await crearBaseDatosGoogle(uid, nombre, email, img_perfil_url);
    //     } catch (error) {
    //         console.error("Error al registrar usuario con Google:", error);

    //         if (error.code === 'auth/popup-closed-by-user') {
    //             setErrorMail('El proceso fue cancelado.');
    //         } else {
    //             setErrorMail('Hubo un error al registrarte. Por favor, intenta de nuevo.');
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // }





    // Verificar si el usuario ya existe en Firestore usando el UID
    // const verificarUsuarioExistente = async (uid) => {
    //     try {
    //         console.log("Verificando usuario con UID:", uid);

    //         // Buscamos al usuario en la colección 'rutinas' usando el UID como identificador
    //         const usuariosRef = doc(db, 'rutinas', uid); // Usamos UID como clave
    //         const docSnap = await getDoc(usuariosRef);

    //         if (docSnap.exists()) {
    //             console.log("El usuario ya está registrado");
    //             return true; // Usuario ya registrado
    //         } else {
    //             console.log("El usuario no está registrado");
    //             return false; // Usuario no registrado
    //         }
    //     } catch (error) {
    //         console.error('Error al verificar usuario:', error);
    //         return false;  // En caso de error, asumimos que no está registrado
    //     }
    // };

    // Crear base de datos para el nuevo usuario de google
    // const crearBaseDatosGoogle = async (uid, nombre, email, img_perfil_url) => {
    //     try {
    //         console.log("Creando base de datos para el usuario con UID:", uid);
    //         const usuarioRef = doc(db, 'rutinas', uid); // Usamos UID como clave para el documento

    //         // Verificamos si ya existe el documento antes de crearlo
    //         const docSnap = await getDoc(usuarioRef);
    //         if (docSnap.exists()) {
    //             console.log("El usuario ya existe en la base de datos, no se crea de nuevo.");
    //             return; // Si el usuario ya existe en la base de datos, no lo creamos nuevamente
    //         }

    //         // Si no existe, creamos el usuario en la base de datos
    //         await setDoc(usuarioRef, {
    //             nombre,
    //             apellido: "",
    //             fecha_nacimiento: "",
    //             genero: "",
    //             email,
    //             img_perfil_url
    //         });

    //         console.log("Usuario registrado exitosamente");
    //     } catch (error) {
    //         console.error('Error al crear la base de datos con Google:', error);
    //     }
    // };











    // const facebookRegister = () => {
    //     console.log('Registrado con facebook')
    // }

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
                        <div className={estilos['registro-opcional']} >
                            {/* <p>O registrate con:</p>
                            <span> <img
                                src={google}
                                alt="google"
                                width={'20px'}
                                title='Registrate con google'
                                onClick={googleRegister} />
                            </span> 
                            //Cancelado hasta encontar a falla de crear usuarios con google
                            */   }
                                    

                        </div>
                        {/* {errorGoogle && <p className={estilos.alert} > {errorGoogle} </p>} */}
                        <button type="submit" disabled={!contraseña || contraseña !== recontraseña}  >Registrarse</button>
                        <p className='opciones'>¿Ya tenes cuenta? <NavLink to='/login'>Acceder</NavLink></p>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Register

import { signOut } from 'firebase/auth';
import estilos from '../styles/ejercicios.module.css'
import { auth } from '../config/firebase';
import { NavLink } from 'react-router-dom';
import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// auth.currentUser.uid

const Ejercicios = () => {

    const usuarioActualAutenticado = auth.currentUser
    const [usuarioName, setUsuarioName] = useState('')
    const [usuarioGenero, setUsuarioGenero] = useState('')
    const [subcoleccionExiste, setSubcoleccionExiste] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);


    useEffect(() => {

        const llamdaDatos = async () => {
            try {
                const docRef = await doc(db, 'rutinas', usuarioActualAutenticado.uid)
                const datosUser = await getDoc(docRef)

                if (datosUser.exists()) {
                    setUsuarioName(datosUser.data().nombre)
                    setUsuarioGenero(datosUser.data().genero)

                    // Verificar si existe la subcolección "ejercicios"
                    const ejerciciosRef = collection(docRef, 'ejercicios');
                    const ejerciciosSnapshot = await getDocs(ejerciciosRef);

                    if (!ejerciciosSnapshot.empty) {
                        setSubcoleccionExiste(true);
                        //Aca la obtencion de datos
                        try {
                            const docRef = await doc(db, 'rutinas', usuarioActualAutenticado.uid);
                            const datosUser = await getDoc(docRef);

                            if (datosUser.exists()) {
                                setUsuarioName(datosUser.data().nombre);
                                setUsuarioGenero(datosUser.data().genero);

                                // Verificar si existe la subcolección "ejercicios"
                                const ejerciciosRef = collection(docRef, 'ejercicios');
                                const consulta = query(ejerciciosRef, orderBy('fecha', 'asc'));
                                const ejerciciosSnapshot = await getDocs(consulta);


                                if (!ejerciciosSnapshot.empty) {
                                    setSubcoleccionExiste(true);
                                    // Aquí va la obtención de datos
                                    
                                    const ejerciciosData = ejerciciosSnapshot.docs.map(doc => ({
                                        id: doc.id,
                                        ...doc.data()
                                    }))
                                    setEjercicios(ejerciciosData);
                                  
 
                                } else {
                                    setSubcoleccionExiste(false);
                                }
                            }
                        } catch (error) {
                            console.error('Error al obtener los datos', error);
                        }


                    } else {
                        setSubcoleccionExiste(false);
                    }

                }


            } catch (error) {
                console.error('Error al obtener los datos', error)
            }
        }

        llamdaDatos()
    }, [usuarioActualAutenticado.uid])


    // useEffect(() => {
    //     if (!subcoleccionExiste) {
    //         console.log('Todavia no tienes datos');
    //     }
    // }, [subcoleccionExiste]);



    const cerrarSesion = async () => {
        await signOut(auth);
        console.log('Sesion Cerrada')
    }

    const editarRegistro = () => {
        console.log('Editando Registro')
    }

    const borrarRegistro = () => {
        console.log('Borrando Registro')
        const today = new Date();
        console.log(today)
    }

    return (
        <>
            <header className={estilos.header}>
                <h2 className={estilos.bienvenida} > {usuarioGenero === 'masculino' ? 'Bienvenido' : 'Bienvenida'}  {usuarioName} ! </h2>
                <h3 className={estilos.usuarioActual}> {usuarioActualAutenticado.email}</h3>
            </header>
            <section className={estilos.header2}>
                <div className={estilos.rutinaDiaria} >
                    <NavLink to={'/rutinas-diarias'}><button>Mi rutina de hoy</button></NavLink>
                </div>
                <button onClick={cerrarSesion} >Cerrar Sesion</button>
            </section>
            <div className={estilos.ejerciciosContainer}>
                <div className={estilos.wraper}>
                    <h2>Mis Ejercicios:</h2>
                </div>
                {subcoleccionExiste ?
                    <table>
                        <thead>
                            <tr className={estilos.encabezados} >
                                <th>Fecha</th>
                                <th>Flexiones</th>
                                <th>Dominadas</th>
                                <th>Sentadillas</th>
                                <th>Abdominales</th>
                                <th>Observaciones</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className={estilos.tbody}>

                            {ejercicios.map((ejercicio) =>(
                            <tr key= {ejercicio.id} className={estilos.cuerpo}>
                                <td>{ejercicio.fecha}</td>
                                <td>{ejercicio.flexiones}</td>
                                <td>{ejercicio.dominadas}</td>
                                <td>{ejercicio.sentadillas}</td>
                                <td>{ejercicio.abdominales}</td>
                                
                                <td className={estilos.observaciones}> {ejercicio.observaciones}</td>
                                <td>
                                    <span className={estilos.edit} onClick={editarRegistro}>Editar </span>
                                     / 
                                    <span className={estilos.delete} onClick={borrarRegistro} > Eliminar</span>
                                </td>
                            </tr>

                            ))}

                            
                            
                        </tbody>
                    </table>
                    :
                    <p className={estilos.alert} > Todavia no tienes ningun dato creado </p>
                }
            </div>

        </>
    )
}

export default Ejercicios

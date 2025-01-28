import { signOut } from 'firebase/auth';
import estilos from '../styles/ejercicios.module.css';
import { auth, db } from '../config/firebase';
import { NavLink } from 'react-router-dom';
import { doc, getDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Loader from '../utils/Loader'

const Ejercicios = () => {
    const usuarioActualAutenticado = auth.currentUser;
    const [usuarioName, setUsuarioName] = useState('');
    const [usuarioGenero, setUsuarioGenero] = useState('');
    const [subcoleccionExiste, setSubcoleccionExiste] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const obtenerDatosEnTiempoReal = async () => {
            try {
                const docRef = doc(db, 'rutinas', usuarioActualAutenticado.uid);
                const datosUser = await getDoc(docRef);

                if (datosUser.exists()) {
                    setUsuarioName(datosUser.data().nombre);
                    setUsuarioGenero(datosUser.data().genero);
                    setLoading(false)
                    // Referencia a la subcolección "ejercicios"
                    const ejerciciosRef = collection(docRef, 'ejercicios');
                    const consulta = query(ejerciciosRef, orderBy('fecha', 'asc'));

                    // Configurar la suscripción en tiempo real
                    const unsubscribe = onSnapshot(consulta, (snapshot) => {
                        if (!snapshot.empty) {
                            setSubcoleccionExiste(true);
                            const ejerciciosData = snapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }));
                            setEjercicios(ejerciciosData);
                        } else {
                            setSubcoleccionExiste(false);
                        }
                    });

                    // Cleanup de la suscripción
                    return () => unsubscribe();
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatosEnTiempoReal();
    }, [usuarioActualAutenticado.uid]);

    const cerrarSesion = async () => {
        await signOut(auth);
        console.log('Sesión Cerrada');
    };

    const editarRegistro = () => {
        console.log('Editando Registro');
    };

    const borrarRegistro = () => {
        console.log('Borrando Registro');
        const today = new Date();
        console.log(today);
    };

    return (
        <>
            {loading && <Loader loading={loading} />}
            <header className={estilos.header}>
                <h2 className={estilos.bienvenida}>
                    {usuarioGenero === 'femenino' ? 'Bienvenida' : 'Bienvenido'} {usuarioName}!
                </h2>
                <h3 className={estilos.usuarioActual}>{usuarioActualAutenticado.email}</h3>
            </header>
            <section className={estilos.header2}>
                <div className={estilos.rutinaDiaria}>
                    <NavLink to={'/rutinas-diarias'}>
                        <button>Mi rutina de hoy</button>
                    </NavLink>
                </div>
                <button onClick={cerrarSesion}>Cerrar Sesión</button>
            </section>
            <div className={estilos.ejerciciosContainer}>
                <div className={estilos.wraper}>
                    <h2>Mis Ejercicios:</h2>
                </div>
                {subcoleccionExiste ? (
                    <table>
                        <thead>
                            <tr className={estilos.encabezados}>
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
                            {ejercicios.map((ejercicio) => (
                                <tr key={ejercicio.id} className={estilos.cuerpo}>
                                    <td>{ejercicio.fecha}</td>
                                    <td>{ejercicio.flexiones}</td>
                                    <td>{ejercicio.dominadas}</td>
                                    <td>{ejercicio.sentadillas}</td>
                                    <td>{ejercicio.abdominales}</td>
                                    <td className={estilos.observaciones}>{ejercicio.observaciones}</td>
                                    <td>
                                        <span className={estilos.edit} onClick={editarRegistro}>
                                            Editar
                                        </span>{' '}
                                        /{' '}
                                        <span className={estilos.delete} onClick={borrarRegistro}>
                                            Eliminar
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={estilos.alert}>Todavía no tienes ningún dato creado</p>
                )}
            </div>
        </>
    );
};

export default Ejercicios;

import { signOut } from 'firebase/auth';
import estilos from '../styles/ejercicios.module.css';
import { auth, db } from '../config/firebase';
import { NavLink } from 'react-router-dom';
import { doc, getDoc, collection, query, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Loader from '../utils/Loader'
// import Edit from '../utils/Edit';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'




const Ejercicios = () => {
    const usuarioActualAutenticado = auth.currentUser;
    const [usuarioName, setUsuarioName] = useState('');
    const [usuarioGenero, setUsuarioGenero] = useState('');
    const [subcoleccionExiste, setSubcoleccionExiste] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true)
    // const [editarDatos, setEditarDatos] = useState(null)
    const usuarioActual = auth.currentUser.uid;
    const navigate = useNavigate()



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

    const editarRegistro = (ejercicio) => {
        const datos = { ...ejercicio, usuarioActual };
        // setEditarDatos(datos); // Opcional si lo necesitas en el estado local
        navigate('/edit', { state: datos }); // Pasa los datos directamente
    };

    const borrarRegistro = (id) => {
        //Sweet Alert2   

        Swal.fire({
            title: "Estas seguro?",
            text: "Esta acción no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(doc(db, 'rutinas', usuarioActual, 'ejercicios', id))
                Swal.fire({
                    title: "Eliminado!",
                    text: "Esta entrada se ha eliminado.",
                    icon: "success"
                });
            }
        });

    };


    return (
        <>
            {loading && <Loader />} {/* Este es el spinner que se verá mientras carga */}
    
            {!loading && (
                <>
                    <header className={estilos.header}>
                        <h2 className={estilos.bienvenida}>
                            {usuarioGenero === 'femenino' ? 'Bienvenida' : 'Bienvenido'} {usuarioName} !
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
                        <section className={estilos.tableContainer}>
                            {subcoleccionExiste ? (
                                <table className={estilos.table}>
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
                                                <td>{ejercicio.fecha}  </td>
                                                <td>{ejercicio.flexiones}</td>
                                                <td>{ejercicio.dominadas}</td>
                                                <td>{ejercicio.sentadillas}</td>
                                                <td>{ejercicio.abdominales}</td>
                                                <td className={estilos.observaciones}>{ejercicio.observaciones}</td>
                                                <td>
                                                    <span className={estilos.edit} onClick={() => editarRegistro(ejercicio)}>
                                                        Editar
                                                    </span>{' '}
                                                    /{' '}
                                                    <span className={estilos.delete} onClick={() => borrarRegistro(ejercicio.id)}>
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
                        </section>
                    </div>
                </>
            )}
        </>
    );
    

};

export default Ejercicios;

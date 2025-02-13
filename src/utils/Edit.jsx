import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import RutinasDiarias from '../components/RutinasDiarias';
// import estilo from '../styles/edit.module.css'
import estilos from '../styles/rutinas-diarias.module.css'
// import edit from '../styles/edit.module.css'
import { db } from '../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';


const Edit = () => {

    const location = useLocation();
    const datosEjercicio = location.state; // Aquí llegan los datos
    const { id, flexiones, dominadas, sentadillas, abdominales, fecha, observaciones, usuarioActual } = datosEjercicio;

    const navigate = useNavigate()

    const [flex, setFlexiones] = useState(flexiones)
    const [domi, setDominadas] = useState(dominadas)
    const [sent, setSentadillas] = useState(sentadillas)
    const [abd, setAbdominales] = useState(abdominales)
    const [fech, setFecha] = useState(fecha)
    const [obs, setObservaciones] = useState(observaciones)
    // const [error, setError] = useState('')

    const modificarDatos = async () => {
        const datosActuales = doc(db, 'rutinas', usuarioActual, 'ejercicios', id)

        try {
            await updateDoc(datosActuales, {
                flexiones: flex,
                dominadas: domi,
                sentadillas: sent,
                abdominales: abd,
                fecha: fech,
                observaciones: obs
            }
            )

            navigate('/ejercicios')

        } catch (error) {
            console.log('hubo un error al modificar los datos', error)
            //Continuar agregando bien los datos que quiero modificar . Agregarlos al objeto
        }
    }

    const cancelarEdit = () => {
        navigate(-1)
    }

    return (
        <>

            <section className={estilos.ejercicios} >

                <form >
                    <div>
                        <label htmlFor="flex">Flexiones</label>
                        <input type="text" id="flex" value={flex} onChange={(e) => setFlexiones(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="dom">Dominadas</label>
                        <input type="text" id="dom" value={domi} onChange={(e) => setDominadas(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="sent">Sentadillas</label>
                        <input type="text" id="sent" value={sent} onChange={e => setSentadillas(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="abd">Abdominales</label>
                        <input type="text" id="abd" value={abd} onChange={e => setAbdominales(e.target.value)} />
                    </div>
                    <div className={estilos.fecha}>
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" id="fecha" value={fech} onChange={e => setFecha(e.target.value)} required />
                    </div>
                    <div className={estilos.comentario}>
                        <label htmlFor="obs">Comentarios</label>
                        <textarea id="obs" value={obs} onChange={e => setObservaciones(e.target.value)}  ></textarea>
                    </div>
                    <div className={estilos.button}>
                        <button className={estilos.send} type="button" onClick={modificarDatos}>Actualizar</button>
                        <button className={estilos.cancel} type="button" onClick={cancelarEdit}>Cancelar</button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default Edit



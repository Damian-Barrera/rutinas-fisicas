import { useState } from 'react'
import estilos from '../styles/rutinas-diarias.module.css'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../config/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'


const RutinasDiarias = () => {

  const [flexiones, setFlexiones] = useState('')
  const [dominadas, setDominadas] = useState('')
  const [sentadillas, setSentadillas] = useState('')
  const [abdominales, setAbdominales] = useState('')
  const [fecha, setFecha] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const enviarDatos = async () => {

    const flexNum = Number(flexiones)
    const domNum = Number(dominadas)
    const sentNum = Number(sentadillas)
    const abdNum = Number(abdominales)


    if (
      isNaN(flexNum) || isNaN(domNum) || isNaN(sentNum) || isNaN(abdNum)
    ) {
      setError('Todos los campos deben ser numericos !')
      return
    }

    const dataExercise = {
      creado:serverTimestamp(),
      flexiones,
      dominadas,
      sentadillas,
      abdominales,
      fecha,
      observaciones
    }

    try {
      const subcoleeccionRef = collection(db, 'rutinas', auth.currentUser.uid, 'ejercicios')

      await addDoc(subcoleeccionRef, dataExercise)


      reiniciarForm();
      navigate('/ejercicios')

    } catch (error) {
      console.log('Hubo un error al ingresar los campos. Verifique mas tarde', error)
    }

  }


  const reiniciarForm = () => {
    setFlexiones('')
    setDominadas('')
    setSentadillas('')
    setAbdominales('')
    setFecha('')
    setObservaciones('')
    setError('')
  }

  return (
    <>
      <section className={estilos['rutinas-title']} >
        <h3  >Rutinas de hoy</h3>
        <button className={estilos.btn} type="button" onClick={() => navigate('/ejercicios')} >Ver mis ejercicios</button>
      </section>
      <section className={estilos.ejercicios} >
        <form >
          <div>
            <label htmlFor="flex">Flexiones</label>
            <input type="text" id="flex" value={flexiones} onChange={(e) => setFlexiones(e.target.value)} />
          </div>

          <div>
            <label htmlFor="dom">Dominadas</label>
            <input type="text" id="dom" value={dominadas} onChange={(e) => setDominadas(e.target.value)} />
          </div>
          <div>
            <label htmlFor="sent">Sentadillas</label>
            <input type="text" id="sent" value={sentadillas} onChange={(e) => setSentadillas(e.target.value)} />
          </div>

          <div>
            <label htmlFor="abd">Abdominales</label>
            <input type="text" id="abd" value={abdominales} onChange={(e) => setAbdominales(e.target.value)} />
          </div>
          <div className={estilos.fecha}>
            <label htmlFor="fecha">Fecha</label>
            <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div className={estilos.comentario}>
            <label htmlFor="obs">Comentarios</label>
            <textarea id="obs" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea>
          </div>
          {error ? <p className={estilos.error} >{error}</p> : ''}
          <div className={estilos.button}>
            <button className={estilos.send} type="button" onClick={enviarDatos}>Enviar</button>
            <button className={estilos.cancel} type="button" onClick={reiniciarForm}>Cancelar</button>
          </div>
        </form>
      </section>

    </>
  )
}

export default RutinasDiarias

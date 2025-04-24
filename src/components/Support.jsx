import { useState } from 'react';
import estilos from '../styles/support.module.css'
import { useNavigate } from 'react-router-dom';



const Support = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('')
    const [contacto, setContacto] = useState('')
    const [textarea, setTextarea] = useState('')

    const navigate = useNavigate();

    const handleForm = (e) => {
        e.preventDefault()
 

    }

    const limpiarFormulario = () => {
        setNombre('')
        setEmail('')
        setContacto('')
        setTextarea('')

        navigate('/ejercicios')
    }
  
    return (
        <div className={estilos.support}>
            <h2>Contactar con el desarrollador</h2>
            <form className={estilos['form-support']} onSubmit={handleForm} >
                <input type="text" name="nombre" placeholder='Ingrese su nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="email" name="email" placeholder='Ingrese su email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" name="contacto" placeholder='Mail de contacto (opcional)' value={contacto} onChange={(e) => setContacto(e.target.value)} />
                <textarea name="textarea" placeholder='Ingrese el motivo de su consulta' value={textarea} onChange={(e) => setTextarea(e.target.value)}></textarea>
                <input type="submit" className={estilos.btn} value="Enviar" />
                <input type="button" className={estilos.btn} value="Cancelar" onClick={limpiarFormulario} />
            </form>
        </div>

    )
}

export default Support;
import React, { useState } from 'react';
import { db, collection, addDoc } from '../../firebaseConfig';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './confirmacion.scss';
import OsitaSonriendo from '../../assets/ositaSonriendo.png';
import Close from '../../assets/close.png';

const Confirmacion = ({ onClose }) => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => { // Asegúrate de que la función sea 'async'
        e.preventDefault();

        if (!nombre.trim() || !mensaje.trim()) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            // Crea una referencia a la colección 'confirmaciones'
            // Si la colección no existe, Firestore la creará automáticamente.
            const docRef = await addDoc(collection(db, "confirmaciones"), {
                nombre: nombre,
                mensaje: mensaje,
                fechaConfirmacion: new Date() // Opcional: añade la fecha y hora de la confirmación
            });

            console.log("Documento escrito con ID: ", docRef.id);
            alert("¡Tu confirmación ha sido enviada con éxito!"); // Mensaje de éxito
            setNombre(''); // Limpia el campo nombre
            setMensaje(''); // Limpia el campo mensaje
            navigate('/invitacion-confirmada'); // Navega al mensaje de invitación confirmada

        } catch (error) {
            console.error("Error al enviar la confirmación a Firestore:", error);
            alert("Hubo un error al enviar tu confirmación. Por favor, inténtalo de nuevo."); // Mensaje de error
        }
    };


    return (
        <div className='confirmacion'>
            <button className='closeBtn' onClick={onClose}>
                <img src={Close} alt="cerrar" className='close' />
            </button>
            <img src={OsitaSonriendo} alt="Osita decoración" className='ositaSonriendo' />
            <h2 className='titulo'>Mayté</h2>

            <form className="formulario" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Déjanos tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Déjanos tu mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Confirmacion;
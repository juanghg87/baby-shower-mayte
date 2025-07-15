import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import './confirmacion.scss';
import OsitaSonriendo from '../../assets/ositaSonriendo.png';
import Close from '../../assets/close.png';

const Confirmacion = ({ onClose }) => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación básica de campos (opcional pero recomendada)
        if (!nombre.trim() || !mensaje.trim()) {
            alert("Por favor completa todos los campos");
            return;
        }
        
        // Navegación directa sin llamada a API
        navigate('/invitacion-confirmada');
        
        /*
        // Código comentado para futura implementación de API
        try {
            await axios.post('https://tu-api.com/confirmacion', {
                nombre,
                mensaje
            });
            navigate('/invitacion-confirmada');
        } catch (error) {
            console.error("Error al enviar:", error);
            alert("Hubo un error al enviar los datos.");
        }
        */
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
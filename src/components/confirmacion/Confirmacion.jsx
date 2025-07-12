import React, { useState } from 'react';
import './confirmacion.scss';
import OsitaSonriendo from '../../assets/ositaSonriendo.png';
import axios from 'axios'; // axios instalado

const Confirmacion = () => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://tu-api.com/confirmacion', {
                nombre,
                mensaje
            });
            alert("¡Datos enviados con éxito!");
            setNombre('');
            setMensaje('');
        } catch (error) {
            console.error("Error al enviar:", error);
            alert("Hubo un error al enviar los datos.");
        }
    };

    return (
        <div className='confirmacion'>
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
                    placeholder="Déjanos tu nombre"
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

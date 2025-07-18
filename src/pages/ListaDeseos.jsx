import React from 'react';
import './listaDeseos.scss';
import WpButton from '../components/wpButton/WpButton';
import Osita from '../assets/ositaGlobitos.png'

const items = [
    'Pañales',
    'Biberón',
    'Mamelucos',
    'Toallitas',
    'Chupetes',
    'Ropita',
    'Juguetes',
    'Cobijas',
    'Set de baño',
    'Monitor',
];

const ListaDeseos = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const selectedItems = [];

        items.forEach((_, idx) => {
            if (formData.get(`deseo-${idx}`)) {
                selectedItems.push(items[idx]);
            }
        });

        console.log('Items seleccionados:', selectedItems);
        // Aquí puedes agregar tu lógica de envío
        alert(`¡Gracias! Has seleccionado: ${selectedItems.join(', ')}`);
    };

    return (
        <>
            <form className="lista-deseos" onSubmit={handleSubmit}>
                <h1 className="lista-deseos__titulo">Lista de deseos</h1>
                <ul className="lista-deseos__lista">
                    {items.map((item, idx) => (
                        <li key={idx} className="lista-deseos__item">
                            <span className="lista-deseos__texto">{item}</span>
                            <input
                                type="checkbox"
                                id={`deseo-${idx}`}
                                name={`deseo-${idx}`}
                                className="lista-deseos__checkbox"
                            />
                            <label htmlFor={`deseo-${idx}`} className="visually-hidden">
                                Marcar {item}
                            </label>
                        </li>
                    ))}
                </ul>
                <input type="text" className="nombre" placeholder='Ingresa tu Nombre' />
                <button type="submit" className="lista-deseos__hecho">
                    Hecho!
                </button>
            </form>
            <WpButton />
            <img src={Osita} alt="" className="osita" />
        </>
    );
};

export default ListaDeseos;
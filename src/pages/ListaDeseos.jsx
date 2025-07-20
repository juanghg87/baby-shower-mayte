import React, { useState, useEffect } from 'react';
import './listaDeseos.scss';
import WpButton from '../components/wpButton/WpButton';
import Osita from '../assets/ositaGlobitos.png';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const ListaDeseos = () => {
    const [deseosList, setDeseosList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nombrePersona, setNombrePersona] = useState('');
    const [selectedGifts, setSelectedGifts] = useState({});


    useEffect(() => {
        const fetchDeseos = async () => {
            try {
                const giftsCollectionRef = collection(db, "itemsRegalos");
                const querySnapshot = await getDocs(giftsCollectionRef);

                const fetchedDeseos = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (!data.regalado) {
                        fetchedDeseos.push({
                            id: doc.id,
                            ...data
                        });
                    }
                });
                setDeseosList(fetchedDeseos);
            } catch (err) {
                console.error("Error al obtener la lista de deseos de Firestore:", err);
                setError("Hubo un error al cargar la lista de deseos. Por favor, inténtalo de nuevo más tarde.");
                setDeseosList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDeseos();
    }, []);


    
    const handleCheckboxChange = (giftId) => {
        setSelectedGifts(prevSelectedGifts => ({
            ...prevSelectedGifts,
            [giftId]: !prevSelectedGifts[giftId]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const persona = nombrePersona.trim();
        if (!persona) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        const giftsToUpdate = Object.keys(selectedGifts).filter(id => selectedGifts[id]);

        if (giftsToUpdate.length === 0) {
            alert("Por favor, selecciona al menos un regalo.");
            return;
        }

        const updatedSuccessfully = [];
        const failedUpdates = [];

        for (const giftId of giftsToUpdate) {
            try {
                const giftRef = doc(db, "itemsRegalos", giftId);
                await updateDoc(giftRef, {
                    regalado: true,
                    persona: persona,
                });
                updatedSuccessfully.push(deseosList.find(gift => gift.id === giftId).nombre);
            } catch (error) {
                console.error(`Error al actualizar el regalo ${giftId} en Firestore:`, error);
                failedUpdates.push(deseosList.find(gift => gift.id === giftId).nombre);
                alert(`Error al intentar registrar "${deseosList.find(gift => gift.id === giftId).nombre}". Podría ya haber sido elegido. Por favor, revisa tus selecciones.`);
            }
        }

        if (updatedSuccessfully.length > 0) {
            alert(`¡Gracias ${persona}! Has elegido: ${updatedSuccessfully.join(', ')}. Tu elección ha sido registrada.`);
            setNombrePersona('');
            setSelectedGifts({});
            
            setDeseosList(prevList =>
                prevList.filter(gift => !giftsToUpdate.includes(gift.id))
            );
        }

        if (failedUpdates.length > 0) {
            console.warn("Algunos regalos no pudieron ser actualizados:", failedUpdates);
        }
    };

    return (
        <>
            <form className="lista-deseos" onSubmit={handleSubmit}>
                <h1 className="lista-deseos__titulo">Lista de deseos</h1>
                {loading && <p className="loading-message">Cargando lista de deseos...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && deseosList.length === 0 && (
                    <p className="no-items-message">¡Felicidades! Todos los regalos de la lista ya han sido elegidos.</p>
                )}
                <ul className="lista-deseos__lista">
                    {deseosList.map((gift) => ( 
                        <li key={gift.id} className="lista-deseos__item">
                            <span className="lista-deseos__texto">{gift.nombre}</span>
                            <input
                                type="checkbox"
                                id={`deseo-${gift.id}`}
                                name={`deseo-${gift.id}`}
                                className="lista-deseos__checkbox"
                                checked={!!selectedGifts[gift.id]}
                                onChange={() => handleCheckboxChange(gift.id)}
                            />
                            <label htmlFor={`deseo-${gift.id}`} className="visually-hidden">
                                Marcar {gift.nombre}
                            </label>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    className="nombre"
                    placeholder='Ingresa tu Nombre'
                    value={nombrePersona}
                    onChange={(e) => setNombrePersona(e.target.value)}
                    required
                />
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
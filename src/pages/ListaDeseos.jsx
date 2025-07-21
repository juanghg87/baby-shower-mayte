import React, { useState, useEffect } from 'react';
import './listaDeseos.scss';
import WpButton from '../components/wpButton/WpButton';
import Osita from '../assets/ositaGlobitos.png';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const ListaDeseos = () => {
    // Mantendremos todos los deseos, incluyendo los regalados
    const [deseosList, setDeseosList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nombrePersona, setNombrePersona] = useState('');
    // selectedGifts ahora solo manejará los que el usuario está a punto de regalar
    const [selectedGifts, setSelectedGifts] = useState({});

    useEffect(() => {
        const fetchDeseos = async () => {
            try {
                const giftsCollectionRef = collection(db, "itemsRegalos");
                const querySnapshot = await getDocs(giftsCollectionRef);

                const fetchedDeseos = [];
                // También inicializamos los regalos seleccionados para desmarcar todo al cargar
                const initialSelectedGifts = {};

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // Ahora incluimos TODOS los regalos, independientemente de su estado 'regalado'
                    fetchedDeseos.push({
                        id: doc.id,
                        ...data
                    });
                    // Los regalos que ya están regalados no pueden ser seleccionados
                    if (data.regalado) {
                        initialSelectedGifts[doc.id] = false; // Asegurarse de que no estén marcados inicialmente
                    }
                });
                setDeseosList(fetchedDeseos);
                setSelectedGifts(initialSelectedGifts); // Reiniciar selecciones al cargar
            } catch (err) {
                console.error("Error al obtener la lista de deseos de Firestore:", err);
                setError("Hubo un error al cargar la lista de deseos. Por favor, inténtalo de nuevo más tarde.");
                setDeseosList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDeseos();
    }, []); // El array de dependencias vacío asegura que se ejecute solo una vez al montar

    // Esta función maneja el cambio del checkbox
    const handleCheckboxChange = (giftId, isGifted) => {
        // Solo permite cambiar el estado si el regalo no está ya regalado
        if (!isGifted) {
            setSelectedGifts(prevSelectedGifts => ({
                ...prevSelectedGifts,
                [giftId]: !prevSelectedGifts[giftId]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const persona = nombrePersona.trim();
        if (!persona) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        // Filtra los regalos que el usuario ha seleccionado y que aún no están regalados
        // Es importante re-verificar el estado 'regalado' del regalo en el deseosList local
        // ya que la UI puede no estar actualizada si otro usuario lo regaló
        const giftsToUpdate = deseosList.filter(gift =>
            selectedGifts[gift.id] && !gift.regalado
        ).map(gift => gift.id);

        if (giftsToUpdate.length === 0) {
            alert("Por favor, selecciona al menos un regalo que no haya sido elegido ya.");
            return;
        }

        const updatedSuccessfully = [];
        const failedUpdates = [];
        const newDeseosList = [...deseosList]; // Crea una copia para modificar localmente

        for (const giftId of giftsToUpdate) {
            try {
                const giftRef = doc(db, "itemsRegalos", giftId);
                // Aquí, el nombre de la persona no puede ser "null" como string, debe ser el nombre real.
                const updateData = {
                    regalado: true,
                    persona: persona,
                };
                console.log(`Intentando actualizar ${giftId} con datos:`, updateData);
                await updateDoc(giftRef, updateData);

                // Actualiza el estado local del regalo a 'regalado' y 'persona'
                const index = newDeseosList.findIndex(gift => gift.id === giftId);
                if (index !== -1) {
                    newDeseosList[index] = { ...newDeseosList[index], regalado: true, persona: persona };
                }
                updatedSuccessfully.push(deseosList.find(gift => gift.id === giftId).nombre);

            } catch (error) {
                console.error(`Error al actualizar el regalo ${giftId} en Firestore:`, error);
                const giftName = deseosList.find(gift => gift.id === giftId)?.nombre || giftId;
                failedUpdates.push(giftName);
                alert(`Error al intentar registrar "${giftName}". Podría ya haber sido elegido o hay un problema de permisos. Por favor, revisa tus selecciones e inténtalo de nuevo.`);
            }
        }

        // Actualiza el estado global de la lista de deseos con los cambios
        setDeseosList(newDeseosList);

        if (updatedSuccessfully.length > 0) {
            alert(`¡Gracias ${persona}! Has elegido: ${updatedSuccessfully.join(', ')}. Tu elección ha sido registrada.`);
            setNombrePersona('');
            setSelectedGifts({}); // Limpiar selecciones después de un envío exitoso
        }

        if (failedUpdates.length > 0) {
            console.warn("Algunos regalos no pudieron ser actualizados:", failedUpdates);
            // Si hubo fallos, los regalos fallidos aún podrían estar seleccionados, desmarcarlos.
            const newSelectedGifts = { ...selectedGifts };
            failedUpdates.forEach(giftName => {
                const giftId = deseosList.find(gift => gift.nombre === giftName)?.id;
                if (giftId) {
                    newSelectedGifts[giftId] = false;
                }
            });
            setSelectedGifts(newSelectedGifts);
        }
    };

    return (
        <>
            <form className="lista-deseos" onSubmit={handleSubmit}>
                <h1 className="lista-deseos__titulo">Lista de deseos</h1>
                {loading && <p className="loading-message">Cargando lista de deseos...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && deseosList.length === 0 && (
                    <p className="no-items-message">No hay regalos disponibles en la lista en este momento.</p>
                )}
                <ul className="lista-deseos__lista">
                    {deseosList.map((gift) => (
                        <li key={gift.id} className="lista-deseos__item">
                            <span className="lista-deseos__texto">
                                {gift.nombre}
                                {gift.regalado && gift.persona && gift.persona !== 'null' && (
                                    <span className="lista-deseos__regalado-por"> (Regalado por: {gift.persona})</span>
                                )}
                            </span>
                            {/* Renderiza el checkbox solo si el regalo no está regalado */}
                            {!gift.regalado ? (
                                <>
                                    <input
                                        type="checkbox"
                                        id={`deseo-${gift.id}`}
                                        name={`deseo-${gift.id}`}
                                        className="lista-deseos__checkbox"
                                        checked={!!selectedGifts[gift.id]}
                                        onChange={() => handleCheckboxChange(gift.id, gift.regalado)}
                                    />
                                    <label htmlFor={`deseo-${gift.id}`} className="visually-hidden">
                                        Marcar {gift.nombre}
                                    </label>
                                </>
                            ) : (
                                // Opcional: Puedes renderizar un texto o un ícono para indicar que ya está regalado
                                <span className="lista-deseos__already-gifted">✓ Elegido</span>
                            )}
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
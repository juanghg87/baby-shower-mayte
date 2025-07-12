// Invitacion.jsx
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import "./invitacion.scss";
import Perrita1 from "../../assets/perrita1.png";
import Nube2 from "../../assets/nube2.png";
import Nube3 from "../../assets/nube3.png";
import OsitaGlobitos from "../../assets/ositaGlobitos.png";
import WpButton from "../wpButton/WpButton"
import Confirmacion from '../confirmacion/Confirmacion';

const Invitacion = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-50%",
        once: false
    });

    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const handleCerrarConfirmacion = () => {
        setMostrarConfirmacion(false);
    };

    return (
        <motion.div
            ref={ref}
            className="invitacion-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 5 }}
        >
            <div className="container1">
                <motion.img
                    src={Nube2}
                    alt="Nube animada"
                    className="nube3"
                    animate={{
                        y: [0, -10, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.img
                    src={Perrita1}
                    alt="Perrita"
                    className="perrita1"
                    animate={{
                        y: [0, -12, 0, 8, 0],
                        x: [0, 6, -4, 6, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container2">
                <div className="textoContenido">
                    ¡ A mis papis y a mí nos gustaría que nos acompañaras en esta fecha especial !
                </div>
                <div className="contenedorBotones">
                    <button className="boton1" onClick={() => setMostrarConfirmacion(true)}>
                        Confirmar asistencia
                    </button>
                    <button className="boton2">Más adelante</button>
                </div>
            </div>

            <div className="container3">
                <motion.img
                    src={Nube3}
                    alt="Nube animada"
                    className="nube2"
                    animate={{
                        y: [0, -15, 0],
                        x: [0, -10, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <img src={OsitaGlobitos} alt="Osita con globitos" className="ositaGlobitos" />
            </div>

            <WpButton />

            {mostrarConfirmacion && (
                <Confirmacion onClose={handleCerrarConfirmacion} />
            )}
        </motion.div>
    );
};

export default Invitacion;

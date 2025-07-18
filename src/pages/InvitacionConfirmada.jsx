import React from 'react';
import './invitacionConfirmada.scss';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WpButton from '../components/wpButton/WpButton'
import Osita from '../assets/osita1.png'
import Compartir from '../assets/share.png'
import Nube from "../assets/nube2.png"
import NubeDos from "../assets/nube3.png"

const InvitacionConfirmada = () => {
    return (
        <motion.div
            className="invitacion-confirmada"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <main className='containerAgradecimientos'>
                <article className='articuloAgradecimientos'>
                    <p className='textoAgradecimiento'>
                        ! Nos hace mucha ilusión que compartan este momento tan especial con nosotros ¡
                    </p>
                </article>
            </main>

            <aside className='contenedorFecha'>
                <article className='contendoFecha'>
                    <span className='fecha'>Domingo <span className='fechaDos'><strong>24</strong></span> Agosto</span>
                </article>
                <img src={Osita} alt="Imagen de osita de decoración" className="ositaUno" />
            </aside>
            <aside className='ubicacion'>
                <a
                    href="https://www.google.com/maps/place/Remanso+del+Rodeo+Cll+6+sur+con+Cra+79-195"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ borderRadius: '10px', overflow: 'hidden' }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4435502742613!2d-75.60252412627239!3d6.205074526784377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e46820b046fae63%3A0x8fd95c57a611c4dc!2sRemanso%20del%20Rodeo%20Cll%206%20sur%20con%20Cra%2079-195!5e0!3m2!1ses!2sco!4v1752533896151!5m2!1ses!2sco"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa de ubicación"
                    ></iframe>
                </a>
                <button className='compartirBtn'>
                    <img src={Compartir} alt="Imangen de compartir en redes de decoración" className="compartir" />
                </button>
            </aside>

            <aside className="informacion">
                <button className="infoAdicional">U. Remanso del Rodeo</button>
                <button className="infoAdicional">Hora: 4 pm</button>
                <Link to="/lista-deseos">
                    <button className="infoAdicional listaDeseos">
                        Lista de Deseos
                    </button>
                </Link>
            </aside>

            <aside className='nubesDecorativas'>
                <img src={Nube} alt="Nubes decorativas" className="nubes" />
                <img src={NubeDos} alt="Nubes decorativas " className="nubes derecha" />
            </aside>

            <WpButton />

        </motion.div>
    );
};

export default InvitacionConfirmada;
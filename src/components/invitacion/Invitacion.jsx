import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Invitacion = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        margin: "-50%",
        once: false
    });

    return (
        <motion.div
            ref={ref}
            className="invitacion-content"
            initial={{ opacity: 0 }}
            animate={{
                opacity: isInView ? 1 : 0
            }}
            transition={{ duration: 5 }}
        >
            <h1>¡Bienvenidos al Baby Shower de Mayté!</h1>
        </motion.div>
    );
};

export default Invitacion;
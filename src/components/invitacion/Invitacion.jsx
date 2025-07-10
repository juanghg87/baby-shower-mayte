import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import "./invitacion.scss"

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
            <div className="container1">
                
            </div>
            <div className="container2">
                
            </div>
            <div className="container3">

            </div>

            
        </motion.div>
    );
};

export default Invitacion;
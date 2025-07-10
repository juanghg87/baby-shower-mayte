import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import "./name.scss";
import Nube3 from "../../assets/nube3.png";
import Osito2 from "../../assets/osito2.png";
import Osito1 from "../../assets/osita1.png";
import Nube2 from "../../assets/nube2.png";

const Name = () => {
  const parte1Ref = useRef(null);
  const parte2Ref = useRef(null);
  const parte3Ref = useRef(null);

  const parte1InView = useInView(parte1Ref, { once: false });
  const parte2InView = useInView(parte2Ref, { once: false });
  const parte3InView = useInView(parte3Ref, { once: false });

  const fadeVariant = {
    visible: { opacity: 1, transition: { duration: 5 } },
    hidden: { opacity: 0, transition: { duration: 0.01 } }
  };

  const nubeAnimation = {
    animate: {
      x: ["0%", "50%", "0%"],
      scale: [1, 0.95, 1],
    },
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const ositaAnimation = {
    animate: {
      y: ["0px", "-15px", "0px"],
      scale: [1, 1.1, 1],
      rotate: ["0deg", "5deg", "0deg"]
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  };

  const handleInvitacion = () => {
    const section = document.getElementById('invitacion');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <motion.div
        ref={parte1Ref}
        initial="hidden"
        animate={parte1InView ? "visible" : "hidden"}
        variants={fadeVariant}
        className="parte1"
      >
        <motion.img src={Nube3} alt="Nube decorativa" className="nube3" {...nubeAnimation} />
        <motion.img src={Osito2} alt="Osita decorativa" className="osito2" {...ositaAnimation} />
      </motion.div>

      <motion.div
        ref={parte2Ref}
        initial="hidden"
        animate={parte2InView ? "visible" : "hidden"}
        variants={fadeVariant}
        className="parte2"
      >
        <h2 className="message">Bienvenidos al Baby Shower de</h2>
        <h1 className="name">Mayté</h1>
      </motion.div>

      <motion.div
        ref={parte3Ref}
        initial="hidden"
        animate={parte3InView ? "visible" : "hidden"}
        variants={fadeVariant}
        className="parte3"
      >
        <motion.img src={Nube2} alt="Nube decorativa" className="nube2" {...nubeAnimation} />
        <img src={Osito1} alt="Osita decorativa" className="osito1" />
        <button
          id="btn"
          className="glass"
          onClick={() => {
            setTimeout(() => {
              handleInvitacion();
            }, 3000);
          }}
        >
          Invitación
        </button>

      </motion.div>
    </div>
  );
};

export default Name;
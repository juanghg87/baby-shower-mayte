import { motion, scale } from 'framer-motion';
import "./name.scss";
import Nube3 from "../../assets/nube3.png";
import Osito2 from "../../assets/osito2.png";
import Osito1 from "../../assets/osita1.png";
import Nube2 from "../../assets/nube2.png";

const Name = () => {
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
  }

  return (
    <div>
      <motion.img
        src={Nube3}
        alt="Nube decorativa"
        className="nube3"
        {...nubeAnimation}
      />

      <motion.img
        src={Osito2}
        alt="Osita decorativa"
        className="osito2"
        {...ositaAnimation}
      />

      <div className="container">
        <h2 className="message">Bienvenidos al Baby Shower de</h2>
        <h1 className="name">Mayté</h1>
      </div>

      <motion.img
        src={Nube2}
        alt="Nube decorativa"
        className="nube2"
        {...nubeAnimation}
      />

      <img src={Osito1} alt="Osita decorativa" className="osito1" />
      <button id="btn" class="glass">Inivitación</button>
    </div>
  )
}

export default Name;
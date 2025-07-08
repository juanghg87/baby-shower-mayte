import React from 'react';
import "./name.scss";
import Nube3 from "../../assets/nube3.png";
import Osito2 from "../../assets/osito2.png";
import Osito1 from "../../assets/osita1.png";
import Nube2 from "../../assets/nube2.png";

const name = () => {
  return (
    <div>
      <img src={Nube3} alt="Nube decorativa" className="nube3" />
      <img src={Osito2} alt="Osita decorativa" className="osito2" />
      <div className="container">
        <h2 className="message">
          Bienvenidos al Baby Shower de
        </h2>
        <h1 className="name">
          Mayté
        </h1>
      </div>
      {/* <img src={Nube2} alt="Osita decorativa" className="nube2" /> */}
      <img src={Osito1} alt="Osita decorativa" className="osito1" />
    </div>
  )
}

export default name
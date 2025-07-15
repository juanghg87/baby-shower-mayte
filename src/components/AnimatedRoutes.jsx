import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Name from "./name/Name";
import Invitacion from "./invitacion/Invitacion";
import Confirmacion from "./confirmacion/Confirmacion";
import InvitacionConfirmada from "../pages/InvitacionConfirmada";

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Name />} />
                <Route path="/home" element={<Name />} />
                <Route path="/invitacion" element={<Invitacion />} />
                <Route path="/confirmacion" element={<Confirmacion />} />
                <Route path="/invitacion-confirmada" element={<InvitacionConfirmada />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
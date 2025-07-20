import './spButton.scss'
import WhatsApp from "../../assets/wp.png"

const handleWhatsAppRedirect = () => {
    const phoneNumber = '573015018260';
    const message = encodeURIComponent('¡Hola! Me gustaría confirmar mi asistencia al Baby Shower 🎉👶');
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(url, '_blank');
};

const WpButton = () => {


    return (
        <div>
            <button
                id="btn"
                className="wpButton"
                onClick={() => {
                    setTimeout(() => {
                        handleWhatsAppRedirect();
                    }, 1000);
                }}
            >
                <img src={WhatsApp} alt="WhatsApp conexión" className='whatsAppBtn' />
            </button>
        </div>
    )
}

export default WpButton
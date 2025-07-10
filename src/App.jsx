import { useEffect, useState } from 'react';
import './App.scss';
import Name from './components/name/Name.jsx';
import SplashScreen from './components/splashScreen/SplashScreen.jsx';
import Invitacion from './components/invitacion/Invitacion.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <main>
          <section className="content" id="home">
            <Name />
          </section>

          <section className="invitacion" id="invitacion">
            <Invitacion />
          </section>
        </main>
      )}

    </>
  );
}

export default App;
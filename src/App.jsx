import { useEffect, useState } from 'react';
import './App.scss';
import Name from './components/name/Name.jsx';
import SplashScreen from './components/splashScreen/SplashScreen.jsx';

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
        <section>
          <Name />
        </section>
      )}
    </>
  );
}

export default App;

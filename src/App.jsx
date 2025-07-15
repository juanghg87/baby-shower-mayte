import { useEffect, useState } from 'react';
import './App.scss';
import AnimatedRoutes from './components/AnimatedRoutes';
import SplashScreen from './components/splashScreen/SplashScreen';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      {loading ? <SplashScreen /> : <AnimatedRoutes />}
    </div>
  );
}

export default App;
import React from 'react';
import "./SplashScreen.scss";
import perrita1 from '../../assets/perrita1.png';

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <div className="logo-container">
                <div className="image-container">
                    <img
                        src={perrita1}
                        alt="Cute Dog"
                        className="main-image"
                    />
                    <div className="particles">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                                style={{
                                    '--i': i,
                                    '--size': `${Math.random() * 8 + 4}px`,
                                    '--delay': `${Math.random() * 0.5}s`
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="text-container">
                <h1 className="logo-text">Mayté</h1>
                <div className="loading-bar">
                    <div className="progress"></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
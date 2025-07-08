import React from 'react'
import "./SplashScreen.scss";

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <div className="logo-container">
                <div className="animated-logo">
                    <div className="logo-circle">
                        <div className="inner-circle"></div>
                    </div>
                    <div className="particles">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="particle" style={{
                                '--i': i,
                                '--size': `${Math.random() * 8 + 4}px`,
                                '--delay': `${Math.random() * 0.5}s`
                            }}></div>
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
    )
}

export default SplashScreen
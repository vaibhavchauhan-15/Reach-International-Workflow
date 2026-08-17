import React from 'react';

export default function Header({
    currentSlide,
    totalSlides,
    isWalkthroughActive,
    toggleWalkthrough,
    setIsGridOpen,
    toggleFullscreen
}) {
    return (
        <header className="app-header">
            <div className="brand-container">
                <img src="/favicon.svg" alt="Reach International Logo" className="brand-header-logo" />
                <div className="brand-text">
                    <span className="brand-name">REACH <span className="highlight">INTERNATIONAL</span></span>
                </div>
            </div>

            <div className="header-controls">
                <div className="slide-indicator">
                    Slide <span>{currentSlide + 1}</span> of <span>{totalSlides}</span>
                </div>
                <button 
                    className={`btn ${isWalkthroughActive ? 'btn-primary' : 'btn-outline'}`}
                    onClick={toggleWalkthrough}
                    title="Interactive Step Walkthrough"
                >
                    <span>{isWalkthroughActive ? 'Pause Walkthrough' : 'Walkthrough'}</span>
                </button>
                <button className="btn btn-outline" onClick={() => setIsGridOpen(true)} title="Overview Grid">
                    <span>Slide Deck</span>
                </button>
                <button className="btn btn-icon" onClick={toggleFullscreen} title="Toggle Fullscreen">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                </button>
            </div>
        </header>
    );
}

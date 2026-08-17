import React from 'react';

export default function Header({
    currentSlide,
    totalSlides,
    isWalkthroughActive,
    toggleWalkthrough,
    setIsGridOpen,
    toggleFullscreen,
    isFullscreen
}) {
    return (
        <header className="app-header">
            <div className="brand-container">
                <img src="/favicon-96x96.png" alt="Reach International Logo" className="brand-header-logo" />
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
                <button 
                    className={`btn btn-icon ${isFullscreen ? 'active' : ''}`} 
                    onClick={toggleFullscreen} 
                    title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
                    aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                    {isFullscreen ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M16 21v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
                        </svg>
                    )}
                </button>
            </div>
        </header>
    );
}

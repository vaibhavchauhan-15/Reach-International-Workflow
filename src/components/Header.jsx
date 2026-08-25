import React from 'react';

const Header = React.memo(function Header({
    activePage,
    setActivePage,
    currentSlide,
    totalSlides,
    isWalkthroughActive,
    isWalkthroughPaused,
    startWalkthrough,
    pauseWalkthrough,
    resumeWalkthrough,
    resetWalkthrough,
    setIsGridOpen,
    toggleFullscreen,
    isFullscreen
}) {
    return (
        <header className="app-header">
            <div 
                className="brand-container" 
                onClick={() => setActivePage('landing')} 
                style={{ cursor: 'pointer' }}
                title="Return to Landing Page Portal"
            >
                <img src="/favicon-96x96.png" alt="Reach International Logo" className="brand-header-logo" width="32" height="32" />
                <div className="brand-text">
                    <span className="brand-name">REACH <span className="highlight">INTERNATIONAL</span></span>
                </div>
            </div>

            <div className="header-controls">
                {activePage === 'workflows' && (
                    <>
                        <div className="slide-indicator">
                            <span className="indicator-label">Slide </span><span>{currentSlide + 1}</span>/<span className="total-slides">{totalSlides}</span>
                        </div>

                        {!isWalkthroughActive ? (
                            <button 
                                className="btn btn-outline btn-header-action"
                                onClick={startWalkthrough}
                                title="Interactive Step Walkthrough"
                                aria-label="Start Walkthrough"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"/>
                                </svg>
                                <span className="btn-text">Walkthrough</span>
                            </button>
                        ) : isWalkthroughPaused ? (
                            <div className="walkthrough-btn-group">
                                <button 
                                    className="btn btn-primary btn-header-action"
                                    onClick={resumeWalkthrough}
                                    title="Resume Walkthrough from current step"
                                    aria-label="Resume Walkthrough"
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"/>
                                    </svg>
                                    <span className="btn-text">Resume</span>
                                </button>
                                <button 
                                    className="btn btn-outline btn-header-action"
                                    onClick={resetWalkthrough}
                                    title="Reset Walkthrough to first card"
                                    aria-label="Reset Walkthrough"
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                        <path d="M3 3v5h5"/>
                                    </svg>
                                    <span className="btn-text">Reset</span>
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="btn btn-primary btn-header-action"
                                onClick={pauseWalkthrough}
                                title="Pause Walkthrough"
                                aria-label="Pause Walkthrough"
                            >
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="6" y="4" width="4" height="16"/>
                                    <rect x="14" y="4" width="4" height="16"/>
                                </svg>
                                <span className="btn-text">Pause</span>
                            </button>
                        )}

                        <button 
                            className="btn btn-outline btn-header-action" 
                            onClick={() => setIsGridOpen(true)} 
                            title="Overview Grid (G)"
                            aria-label="Overview Grid"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"/>
                                <rect x="14" y="3" width="7" height="7"/>
                                <rect x="14" y="14" width="7" height="7"/>
                                <rect x="3" y="14" width="7" height="7"/>
                            </svg>
                            <span className="btn-text">Deck</span>
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
                    </>
                )}
            </div>
        </header>
    );
});

export default Header;

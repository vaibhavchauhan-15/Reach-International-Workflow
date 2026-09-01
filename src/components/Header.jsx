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
    isFullscreen,
    searchQuery,
    setSearchQuery
}) {
    return (
        <header className="h-14 md:h-16 bg-white border-b border-border-light flex items-center justify-between px-3 sm:px-4 md:px-7 z-50 sticky top-0 select-none">
            {/* Brand Logo & Title */}
            <div 
                className="flex items-center gap-2 sm:gap-2.5 md:gap-3.5 cursor-pointer group flex-shrink-0" 
                onClick={() => setActivePage('landing')} 
                title="Return to Landing Page Portal"
            >
                <img 
                    src="/favicon-96x96.png" 
                    alt="Reach International Logo" 
                    className="w-6.5 h-6.5 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain rounded-md transition-transform group-hover:scale-105 flex-shrink-0" 
                    width="32" 
                    height="32" 
                />
                <div className="flex flex-col">
                    <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-wide text-slate-900 uppercase whitespace-nowrap">
                        REACH <span className="text-ribbon-4">INTERNATIONAL</span>
                    </span>
                    <span className="hidden md:inline-block text-[10px] font-semibold text-slate-500 tracking-wider">
                        DAILY MEETING REPORTS
                    </span>
                </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 justify-end ml-2">
                {activePage === 'meetings' && (
                    <div className="relative flex items-center w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] transition-all duration-200">
                        <svg className="absolute left-2.5 sm:left-3 text-slate-400 pointer-events-none w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input 
                            type="text" 
                            className="w-full h-9 md:h-10 pl-8 sm:pl-9 pr-7.5 sm:pr-8 text-xs sm:text-sm bg-slate-100/90 sm:bg-stage-bg border border-border-light rounded-full focus:bg-white focus:border-theme-breakdown focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-xs"
                            placeholder="Search summaries..."
                            value={searchQuery || ''}
                            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                            aria-label="Search meeting summaries"
                        />
                        {searchQuery && (
                            <button 
                                className="absolute right-1.5 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all active:scale-90" 
                                onClick={() => setSearchQuery && setSearchQuery('')}
                                title="Clear search"
                                aria-label="Clear search query"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                )}

                {activePage === 'workflows' && (
                    <>
                        <div className="bg-stage-bg text-slate-900 px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full text-xs md:text-sm font-semibold border border-border-light whitespace-nowrap">
                            <span className="hidden sm:inline text-slate-500 font-normal">Slide </span>
                            <span className="text-ribbon-3 font-bold">{currentSlide + 1}</span>
                            <span className="text-slate-400"> / </span>
                            <span className="text-slate-600">{totalSlides}</span>
                        </div>

                        {!isWalkthroughActive ? (
                            <button 
                                className="inline-flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold bg-white text-slate-900 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[34px] sm:min-h-[38px]"
                                onClick={startWalkthrough}
                                title="Interactive Step Walkthrough"
                                aria-label="Start Walkthrough"
                            >
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-ribbon-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="5 3 19 12 5 21 5 3"/>
                                </svg>
                                <span className="hidden sm:inline">Walkthrough</span>
                            </button>
                        ) : isWalkthroughPaused ? (
                            <div className="flex items-center gap-1.5 md:gap-2">
                                <button 
                                    className="inline-flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn hover:shadow-primary-btn-hover hover:-translate-y-0.5 active:scale-95 transition-all min-h-[34px] sm:min-h-[38px]"
                                    onClick={resumeWalkthrough}
                                    title="Resume Walkthrough from current step"
                                    aria-label="Resume Walkthrough"
                                >
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"/>
                                    </svg>
                                    <span className="hidden sm:inline">Resume</span>
                                </button>
                                <button 
                                    className="inline-flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold bg-white text-slate-900 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[34px] sm:min-h-[38px]"
                                    onClick={resetWalkthrough}
                                    title="Reset Walkthrough to first card"
                                    aria-label="Reset Walkthrough"
                                >
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                        <path d="M3 3v5h5"/>
                                    </svg>
                                    <span className="hidden sm:inline">Reset</span>
                                </button>
                            </div>
                        ) : (
                            <button 
                                className="inline-flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn hover:shadow-primary-btn-hover hover:-translate-y-0.5 active:scale-95 transition-all min-h-[34px] sm:min-h-[38px]"
                                onClick={pauseWalkthrough}
                                title="Pause Walkthrough"
                                aria-label="Pause Walkthrough"
                            >
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="6" y="4" width="4" height="16"/>
                                    <rect x="14" y="4" width="4" height="16"/>
                                </svg>
                                <span className="hidden sm:inline">Pause</span>
                            </button>
                        )}

                        <button 
                            className="inline-flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold bg-white text-slate-900 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[34px] sm:min-h-[38px]" 
                            onClick={() => setIsGridOpen(true)} 
                            title="Overview Grid (G)"
                            aria-label="Overview Grid"
                        >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"/>
                                <rect x="14" y="3" width="7" height="7"/>
                                <rect x="14" y="14" width="7" height="7"/>
                                <rect x="3" y="14" width="7" height="7"/>
                            </svg>
                            <span className="hidden sm:inline">Deck</span>
                        </button>

                        <button 
                            className={`w-8.5 h-8.5 md:w-9 md:h-9 flex items-center justify-center rounded-lg border border-border-light transition-all active:scale-95 min-w-[34px] min-h-[34px] ${isFullscreen ? 'bg-cyan-50 text-ribbon-4 border-ribbon-4' : 'bg-white text-slate-700 hover:bg-stage-bg hover:text-ribbon-4 hover:border-ribbon-4'}`} 
                            onClick={toggleFullscreen} 
                            title={isFullscreen ? "Exit Fullscreen (F)" : "Enter Fullscreen (F)"}
                            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        >
                            {isFullscreen ? (
                                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-4.5 md:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M16 21v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-4.5 md:h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

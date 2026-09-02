import React from 'react';

const Footer = React.memo(function Footer({ currentSlide, totalSlides, prevSlide, nextSlide, goToSlide }) {
    return (
        <footer className="h-[52px] md:h-16 bg-white border-t border-border-light flex items-center justify-between px-3 md:px-7 select-none z-40">
            {/* Previous Slide Button */}
            <button 
                className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold bg-white text-slate-700 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[38px] md:min-h-[42px]"
                onClick={prevSlide} 
                title="Previous Slide (Left Arrow)" 
                aria-label="Previous Slide"
            >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Slide Indicator Dots Bar */}
            <div className="flex items-center gap-1.5 max-w-[130px] sm:max-w-none overflow-x-auto scrollbar-none py-1 px-1">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                            currentSlide === idx ? 'w-5 md:w-6 bg-ribbon-4 shadow-xs' : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                        onClick={() => goToSlide(idx)}
                        title={`Slide ${idx + 1}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Next Slide Button */}
            <button 
                className="inline-flex items-center gap-1.5 md:gap-2 px-3.5 py-1.5 md:px-5 md:py-2 rounded-lg text-xs md:text-sm font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn hover:shadow-primary-btn-hover hover:-translate-y-0.5 active:scale-95 transition-all min-h-[38px] md:min-h-[42px]"
                onClick={nextSlide} 
                title="Next Slide (Right Arrow)" 
                aria-label="Next Slide"
            >
                <span className="hidden sm:inline">Next</span>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </button>
        </footer>
    );
});

export default Footer;

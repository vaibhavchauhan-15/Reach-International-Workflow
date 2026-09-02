import React, { useEffect } from 'react';

const SlideDeckGrid = React.memo(function SlideDeckGrid({ isGridOpen, setIsGridOpen, slidesData, currentSlide, goToSlide }) {
    useEffect(() => {
        if (!isGridOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsGridOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGridOpen, setIsGridOpen]);

    if (!isGridOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 animate-fade-in" 
            onClick={() => setIsGridOpen(false)}
        >
            <div 
                className="bg-white border border-border-light rounded-2xl shadow-modal w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border-light flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 uppercase tracking-tight">
                        Operational Flowcharts Slide Index
                    </h3>
                    <button 
                        className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1.5 leading-none transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center" 
                        onClick={() => setIsGridOpen(false)}
                        title="Close (Esc)"
                    >
                        ✕
                    </button>
                </div>

                {/* Slides Grid */}
                <div className="p-3 sm:p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 scroll-fade-top relative">
                    <div className="top-blur-mask" aria-hidden="true" />
                    {slidesData.map((slide, idx) => (
                        <div 
                            key={idx} 
                            className={`p-3 rounded-xl border transition-all cursor-pointer text-left flex flex-col ${
                                currentSlide === idx 
                                    ? 'bg-cyan-50/70 border-ribbon-4 ring-2 ring-ribbon-4/20 shadow-sm' 
                                    : 'bg-stage-bg border-border-light hover:bg-white hover:border-ribbon-4 hover:-translate-y-0.5 hover:shadow-md'
                            }`}
                            onClick={() => {
                                goToSlide(idx);
                                setIsGridOpen(false);
                            }}
                        >
                            <span className="text-[10px] font-bold text-ribbon-3 uppercase tracking-wider mb-1">
                                {slide.isCover ? 'START' : `SLIDE ${idx < 10 ? '0' : ''}${idx}`}
                            </span>
                            <div className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                                {slide.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default SlideDeckGrid;

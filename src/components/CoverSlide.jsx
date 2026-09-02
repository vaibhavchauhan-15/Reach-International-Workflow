import React from 'react';

const CoverSlide = React.memo(function CoverSlide({ goToSlide, toggleFullscreen }) {
    const handleStartPresentation = () => {
        goToSlide(1);
        if (toggleFullscreen && !document.fullscreenElement && !document.webkitFullscreenElement) {
            toggleFullscreen();
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center text-center bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-slate-900 overflow-y-auto scroll-fade-top relative">
            <div className="top-blur-mask" aria-hidden="true" />
            {/* Scissor Lift Hero Image Showcase */}
            <div className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[320px] h-[100px] sm:h-[120px] md:h-[150px] mb-3 md:mb-4 flex items-center justify-center flex-shrink-0">
                <img 
                    src="https://www.reachinternational.co.in/wp-content/uploads/2024/05/JCB-S1530E.png" 
                    alt="Reach International JCB Scissor Lift" 
                    className="max-w-full max-h-full object-contain drop-shadow-[0_12px_24px_rgba(15,23,42,0.12)]"
                    decoding="async"
                />
            </div>

            {/* Main Presentation Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 max-w-4xl mb-4 md:mb-6 tracking-tight leading-tight uppercase">
                STANDARD OPERATING PROCEDURES
            </h1>

            {/* 3 Overview Flowchart Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-5 max-w-4xl w-full mb-5 md:mb-7">
                <div 
                    className="bg-stage-bg border border-border-light rounded-xl p-3 md:p-4 flex items-center gap-3.5 md:gap-4 text-left cursor-pointer hover:bg-white hover:border-ribbon-4 hover:-translate-y-1 hover:shadow-card-hover active:scale-[0.985] transition-all shadow-xs group"
                    onClick={() => goToSlide(1)}
                >
                    <div className="w-11 h-11 md:w-13 md:h-13 rounded-lg bg-white border border-border-light flex items-center justify-center p-1.5 flex-shrink-0 group-hover:border-ribbon-4 transition-colors">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/05/JCB-S1530E.png" alt="Parts Inventory" className="max-w-full max-h-full object-contain" loading="lazy" decoding="async" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm md:text-base font-extrabold text-slate-900 group-hover:text-ribbon-4 transition-colors">3 Flowcharts</div>
                        <div className="text-[11px] md:text-xs text-slate-500 font-medium mt-0.5">Procurement, Inbound & Outbound</div>
                    </div>
                </div>

                <div 
                    className="bg-stage-bg border border-border-light rounded-xl p-3 md:p-4 flex items-center gap-3.5 md:gap-4 text-left cursor-pointer hover:bg-white hover:border-ribbon-4 hover:-translate-y-1 hover:shadow-card-hover active:scale-[0.985] transition-all shadow-xs group"
                    onClick={() => goToSlide(4)}
                >
                    <div className="w-11 h-11 md:w-13 md:h-13 rounded-lg bg-white border border-border-light flex items-center justify-center p-1.5 flex-shrink-0 group-hover:border-ribbon-4 transition-colors">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/06/hyundai.png" alt="Fleet Commercial" className="max-w-full max-h-full object-contain" loading="lazy" decoding="async" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm md:text-base font-extrabold text-slate-900 group-hover:text-ribbon-4 transition-colors">3 Flowcharts</div>
                        <div className="text-[11px] md:text-xs text-slate-500 font-medium mt-0.5">OEM Fleet, Sales & Rentals</div>
                    </div>
                </div>

                <div 
                    className="bg-stage-bg border border-border-light rounded-xl p-3 md:p-4 flex items-center gap-3.5 md:gap-4 text-left cursor-pointer hover:bg-white hover:border-ribbon-4 hover:-translate-y-1 hover:shadow-card-hover active:scale-[0.985] transition-all shadow-xs group"
                    onClick={() => goToSlide(7)}
                >
                    <div className="w-11 h-11 md:w-13 md:h-13 rounded-lg bg-white border border-border-light flex items-center justify-center p-1.5 flex-shrink-0 group-hover:border-ribbon-4 transition-colors">
                        <img src="https://www.reachinternational.co.in/wp-content/uploads/2024/06/16BRJ-9.png" alt="Service Maintenance" className="max-w-full max-h-full object-contain" loading="lazy" decoding="async" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm md:text-base font-extrabold text-slate-900 group-hover:text-ribbon-4 transition-colors">4 Flowcharts</div>
                        <div className="text-[11px] md:text-xs text-slate-500 font-medium mt-0.5">Fleet Repairs, Client & Maintenance</div>
                    </div>
                </div>
            </div>

            {/* Start Presentation CTA Button */}
            <div className="flex items-center justify-center w-full">
                <button 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 rounded-lg text-sm md:text-base font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn hover:shadow-primary-btn-hover hover:-translate-y-0.5 active:scale-95 transition-all w-full sm:w-auto min-h-[44px]"
                    onClick={handleStartPresentation}
                >
                    <span>Start Presentation</span>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
        </div>
    );
});

export default CoverSlide;

import React from 'react';

export default function LandingPage({ setActivePage, totalSlides = 11 }) {
    return (
        <div className="flex-1 w-full h-full overflow-y-auto max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 flex flex-col justify-center gap-6 md:gap-9 animate-fade-in">
            {/* Executive Hero Banner */}
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-2.5 md:gap-3.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-ribbon-4 text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xs">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span>REACH INTERNATIONAL OPERATIONAL PORTAL</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    Streamlined Operations & <span className="bg-gradient-to-r from-ribbon-4 to-ribbon-3 bg-clip-text text-transparent">Daily Intelligence</span>
                </h1>
            </div>

            {/* Main Portal Navigation Cards (2 Main Modules) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-4xl w-full mx-auto">
                {/* 1. Workflows Deck Card */}
                <div 
                    className="bg-white border border-border-light rounded-2xl p-5 sm:p-6 md:p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-ribbon-4 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
                    onClick={() => setActivePage('workflows')}
                >
                    <div>
                        <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-ribbon-4 flex items-center justify-center group-hover:bg-ribbon-4 group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                    <polyline points="2 17 12 22 22 17"/>
                                    <polyline points="2 12 12 17 22 12"/>
                                </svg>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 text-ribbon-4 border border-cyan-200">
                                {totalSlides} Interactive Slides
                            </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 group-hover:text-ribbon-4 transition-colors">
                            Workflows Deck
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                            Explore interactive step-by-step operational presentation decks, department flowcharts, 
                            and visual node breakdowns for end-to-end plant processes.
                        </p>

                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium mb-5">
                            <li className="flex items-center gap-2">
                                <span className="text-amber-500">⚡</span> Interactive Step Walkthroughs
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-cyan-500">📊</span> Horizontal Visual Flowcharts
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-teal-500">🔍</span> Node Detail Modals & Specifications
                            </li>
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <button className="w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn group-hover:shadow-primary-btn-hover flex items-center justify-center gap-2 transition-all min-h-[44px]">
                            <span>Open Workflows Deck</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </div>

                {/* 2. Daily Meetings Card */}
                <div 
                    className="bg-white border border-border-light rounded-2xl p-5 sm:p-6 md:p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-emerald-500 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
                    onClick={() => setActivePage('meetings')}
                >
                    <div>
                        <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                Date-Wise Summaries
                            </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            Daily Meetings
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                            Access date-wise daily meeting logs, machine breakdown analysis, serviceman service status, 
                            store parts inventory tracking, and action items.
                        </p>

                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium mb-5">
                            <li className="flex items-center gap-2">
                                <span className="text-blue-500">📅</span> Choose Meeting Date & Card Grid
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-amber-500">🔧</span> Machine Breakdown & Serviceman Status
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-500">✅</span> Action Items & Task Completion Tracking
                            </li>
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <button className="w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md group-hover:shadow-lg flex items-center justify-center gap-2 transition-all min-h-[44px]">
                            <span>Choose Meeting Date</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';

export default function LandingPage({ setActivePage }) {
    return (
        <div className="flex-1 w-full h-full overflow-y-auto max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-12 flex flex-col justify-center gap-6 md:gap-8 animate-fade-in">
            {/* Title Banner */}
            <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                    Daily Meeting Reports
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
                    Real-time fleet operations, breakdown diagnostics, parts tracking & actionable directives
                </p>
            </div>

            {/* Main Portal Navigation Card */}
            <div className="max-w-xl w-full mx-auto">
                <div 
                    className="bg-white border border-border-light rounded-2xl p-6 sm:p-7 md:p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 hover:border-emerald-500 cursor-pointer transition-all duration-300 flex flex-col justify-between group"
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

                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium mb-6">
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
                        <button className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md group-hover:shadow-lg flex items-center justify-center gap-2 transition-all min-h-[44px]">
                            <span>Choose Meeting Date</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

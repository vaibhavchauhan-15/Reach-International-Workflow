import React, { useState, useRef, useEffect } from 'react';
import { formatMeetingSummary, copyTextToClipboard, formatMeetingDate } from '../utils/meetingUtils';

export default function MeetingDetailModal({ selectedMeeting, setSelectedMeeting }) {
    if (!selectedMeeting) return null;

    const [copySuccess, setCopySuccess] = useState(false);
    const copyTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    const copyFormattedSummary = async () => {
        const text = formatMeetingSummary(selectedMeeting);
        const success = await copyTextToClipboard(text);
        
        if (success) {
            setCopySuccess(true);
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
            copyTimeoutRef.current = setTimeout(() => {
                setCopySuccess(false);
            }, 2500);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 animate-fade-in" 
            onClick={() => setSelectedMeeting(null)}
        >
            <div 
                className="bg-white border border-border-light rounded-2xl shadow-modal w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden select-none" 
                onClick={e => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border-light flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-theme-breakdown bg-blue-50 px-2 py-0.5 rounded border border-blue-100 mb-1 inline-block">
                            Operational Meeting Summary
                        </span>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                            {formatMeetingDate(selectedMeeting.dateFormatted || selectedMeeting.date || selectedMeeting.title)}
                        </h2>
                    </div>
                    <button 
                        className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1.5 leading-none transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center" 
                        onClick={() => setSelectedMeeting(null)} 
                        title="Close (Esc)"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
                    {/* Header Details */}
                    <div className="border-b border-border-light pb-4">
                        <div className="text-xs sm:text-sm text-slate-700 mb-1 flex flex-wrap gap-1.5">
                            <span className="font-bold text-slate-900">Date:</span>
                            <span className="font-semibold text-ribbon-3">{formatMeetingDate(selectedMeeting.dateFormatted || selectedMeeting.date || selectedMeeting.title)}</span>
                        </div>
                        <div className="text-xs sm:text-sm text-slate-700 flex flex-wrap gap-1.5">
                            <span className="font-bold text-slate-900">Focus:</span>
                            <span className="text-slate-600">{selectedMeeting.focus}</span>
                        </div>
                    </div>

                    {/* Holiday Notification Banner */}
                    {selectedMeeting.isHoliday && (
                        <div className="bg-amber-50/80 border border-amber-200/90 border-l-4 border-l-amber-500 rounded-xl p-4 shadow-xs">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl flex-shrink-0">🎉</span>
                                <div className="space-y-1">
                                    <h2 className="text-sm sm:text-base font-extrabold text-amber-950">
                                        Official Company Holiday – {selectedMeeting.holidayName || 'Holiday'}
                                    </h2>
                                    <p className="text-xs text-amber-900/80 leading-relaxed font-medium">
                                        Operations, workshop maintenance, and administrative offices remained closed in celebration of {selectedMeeting.holidayName || 'Company Holiday'}. No daily operations breakdown or coordination meeting was conducted on this day.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 1: Machine Breakdowns & Site Updates */}
                    {selectedMeeting.breakdowns && selectedMeeting.breakdowns.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                                <span>1.</span> Machine Breakdowns & Site Updates
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {selectedMeeting.breakdowns.map((item, idx) => (
                                    <div key={idx} className="bg-slate-50/70 border-l-4 border-theme-breakdown border-t border-r border-b border-border-light rounded-r-xl p-3 text-xs shadow-xs space-y-1.5">
                                        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">
                                            {item.site}:
                                        </h3>
                                        
                                        {item.issue && (
                                            <div>
                                                <span className="font-bold text-slate-800 mr-1.5">Issue:</span>
                                                <span className="text-slate-600">{item.issue}</span>
                                            </div>
                                        )}

                                        {item.action && (
                                            <div>
                                                <span className="font-bold text-slate-800 mr-1.5">Action:</span>
                                                <span className="text-slate-600">{item.action}</span>
                                            </div>
                                        )}

                                        {item.logistics && (
                                            <div>
                                                <span className="font-bold text-slate-800 mr-1.5">Logistics:</span>
                                                <span className="text-slate-600">{item.logistics}</span>
                                            </div>
                                        )}

                                        {item.status && (
                                            <div>
                                                <span className="font-bold text-slate-800 mr-1.5">Status:</span>
                                                <span className="text-slate-600">{item.status}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SECTION 2: Parts Table */}
                    {selectedMeeting.parts && selectedMeeting.parts.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                                <span>2.</span> Parts, Procurement & Inventory
                            </h2>
                            
                            <div className="overflow-x-auto rounded-lg border border-border-light shadow-xs">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="bg-slate-100 border-b border-border-light text-slate-800 font-bold uppercase text-[10px] tracking-wider">
                                            <th className="px-3 py-2">Part / Equipment</th>
                                            <th className="px-3 py-2">Site / Context</th>
                                            <th className="px-3 py-2">Status & Next Steps</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedMeeting.parts.map((p, idx) => (
                                            <tr key={idx} className="border-b border-border-light last:border-0 hover:bg-slate-50/80 transition-colors">
                                                <td className="px-3 py-2 font-bold text-slate-900 min-w-[130px]">{p.part}</td>
                                                <td className="px-3 py-2 text-slate-600 min-w-[110px]">{p.context}</td>
                                                <td className="px-3 py-2 text-slate-700 min-w-[180px]">{p.statusNextSteps}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {/* SECTION 3: Directives */}
                    {selectedMeeting.directives && selectedMeeting.directives.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                                <span>3.</span> Policy & Process Directives
                            </h2>
                            
                            <div className="space-y-2">
                                {selectedMeeting.directives.map((directive, idx) => (
                                    <div key={idx} className="bg-amber-50/70 border-l-4 border-theme-directive border-t border-r border-b border-amber-200/70 rounded-r-xl p-3 text-xs shadow-xs">
                                        <h3 className="text-xs font-extrabold text-amber-950 mb-1">
                                            {directive.title}:
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1 text-xs text-amber-900/90 font-medium">
                                            {directive.points.map((pt, pIdx) => (
                                                <li key={pIdx}>{pt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* SECTION 4: Action Items */}
                    {selectedMeeting.actionItems && selectedMeeting.actionItems.length > 0 && (
                        <section className="space-y-3">
                            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                                <span>4.</span> Key Action Items & Ownership
                            </h2>
                            
                            <div className="bg-emerald-50/70 border-l-4 border-theme-action border-t border-r border-b border-emerald-200/70 rounded-r-xl p-3 shadow-xs space-y-1.5">
                                {selectedMeeting.actionItems.map((item, idx) => (
                                    <div key={idx} className="text-xs text-slate-800">
                                        <strong className="font-bold text-emerald-900 mr-1.5">{item.person}:</strong>
                                        <span className="text-slate-700">{item.task}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-border-light flex items-center justify-between bg-stage-bg">
                    <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                        Reach International Operational Summary
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button 
                            type="button"
                            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs min-h-[38px] ${
                                copySuccess 
                                    ? 'bg-emerald-600 text-white' 
                                    : 'bg-white text-slate-800 border border-border-light hover:bg-slate-50'
                            }`} 
                            onClick={copyFormattedSummary}
                            title="Copy formatted text summary"
                        >
                            {copySuccess ? '✓ Copied!' : '📋 Copy Text Summary'}
                        </button>
                        <button 
                            type="button"
                            className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn hover:shadow-primary-btn-hover active:scale-95 transition-all min-h-[38px]" 
                            onClick={() => setSelectedMeeting(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

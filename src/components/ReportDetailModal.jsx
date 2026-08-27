import React from 'react';

export default function ReportDetailModal({ selectedReport, setSelectedReport }) {
    if (!selectedReport) return null;

    return (
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 animate-fade-in" 
            onClick={() => setSelectedReport(null)}
        >
            <div 
                className="bg-white border border-border-light rounded-2xl shadow-modal w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden select-none" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-border-light flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span 
                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                                style={{ backgroundColor: `${selectedReport.badgeColor}15`, color: selectedReport.badgeColor, borderColor: `${selectedReport.badgeColor}40` }}
                            >
                                {selectedReport.category}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-500">🗓️ {selectedReport.date}</span>
                        </div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">{selectedReport.title}</h2>
                        <p className="text-xs text-slate-600 mt-0.5">
                            <strong>Department:</strong> {selectedReport.department} &nbsp;|&nbsp; <strong>Author / HOD:</strong> {selectedReport.author}
                        </p>
                    </div>
                    <button 
                        className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1.5 leading-none transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center" 
                        onClick={() => setSelectedReport(null)} 
                        title="Close (Esc)"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
                    {/* Key Stats Bar */}
                    {selectedReport.keyMetrics && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {selectedReport.keyMetrics.map((m, idx) => (
                                <div key={idx} className="bg-stage-bg border border-border-light rounded-xl p-3 text-left">
                                    <span className="text-base sm:text-lg font-extrabold text-slate-900 block">{m.value}</span>
                                    <span className="text-xs text-slate-500 font-medium">{m.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Flowchart / Workflow Visualization */}
                    {selectedReport.workflowNodes && (
                        <div className="bg-stage-bg border border-border-light rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-extrabold text-slate-900">📊 {selectedReport.workflowTitle || 'Process Flowchart & Step Walkthrough'}</h3>
                                <span className="text-xs text-slate-400 font-medium">Click steps for details</span>
                            </div>
                            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                {selectedReport.workflowNodes.map((node, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="bg-white border border-border-light rounded-lg p-2.5 min-w-[140px] max-w-[160px] flex-shrink-0 shadow-xs">
                                            <div className="text-[10px] font-bold text-ribbon-3 uppercase">{node.step}</div>
                                            <div className="text-xs font-bold text-slate-900 mt-0.5">{node.title}</div>
                                            <div className="text-[10px] text-slate-500 mt-0.5">👤 {node.role}</div>
                                        </div>
                                        {idx < selectedReport.workflowNodes.length - 1 && (
                                            <div className="text-slate-400 flex-shrink-0">➔</div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Detailed Sections */}
                    <div className="space-y-4">
                        {selectedReport.sections && selectedReport.sections.map((sec, idx) => (
                            <div key={idx} className="bg-white border border-border-light rounded-xl p-4 shadow-xs">
                                <h4 className="text-sm font-extrabold text-slate-900 mb-2">{sec.title}</h4>
                                <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    {sec.content.split('\n').map((paragraph, pIdx) => (
                                        <p key={pIdx}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-t border-border-light flex items-center justify-between bg-stage-bg">
                    <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                        Approved by Reach International Operational Board
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button 
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-800 border border-border-light hover:bg-slate-50 shadow-xs min-h-[38px]" 
                            onClick={() => window.print()}
                        >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                            Print
                        </button>
                        <button 
                            className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn hover:shadow-primary-btn-hover active:scale-95 transition-all min-h-[38px]" 
                            onClick={() => setSelectedReport(null)}
                        >
                            Close Detail Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

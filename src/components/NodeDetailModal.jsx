import React, { useEffect } from 'react';

const ribbonColors = ['bg-ribbon-1', 'bg-ribbon-2', 'bg-ribbon-3', 'bg-ribbon-4', 'bg-ribbon-5'];

const roleBgMap = {
    'role-mgmt': 'bg-ribbon-1 text-white',
    'role-sm': 'bg-ribbon-3 text-white',
    'role-guard': 'bg-ribbon-2 text-white',
    'role-eng': 'bg-role-eng text-white',
    'role-client': 'bg-role-client text-white',
    'role-oem': 'bg-role-oem text-white',
    'role-logistics': 'bg-role-logistics text-white',
    'role-sys': 'bg-role-sys text-white',
    'role-store': 'bg-role-store text-white',
};

const NodeDetailModal = React.memo(function NodeDetailModal({ selectedNode, setSelectedNode, goToSlide }) {
    useEffect(() => {
        if (!selectedNode) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedNode(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedNode, setSelectedNode]);

    if (!selectedNode) return null;

    const stepNum = selectedNode.step ? selectedNode.step.replace(/[^0-9]/g, '') : '01';
    const stepInt = parseInt(stepNum, 10) || 1;
    const stepColor = ribbonColors[(stepInt - 1) % 5];
    const roleBadgeClass = roleBgMap[selectedNode.roleClass] || 'bg-slate-600 text-white';

    return (
        <div 
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-md z-[1000] flex items-center justify-center p-3 sm:p-4 transition-all duration-300 animate-fade-in" 
            onClick={() => setSelectedNode(null)}
        >
            <div 
                className="relative w-full max-w-lg max-h-[90vh] bg-white border border-border-light rounded-2xl shadow-modal overflow-y-auto flex flex-col select-none scroll-fade-top" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    className="absolute top-3 right-3 z-30 p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900 shadow-md transition-all active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center" 
                    onClick={() => setSelectedNode(null)} 
                    title="Close (Esc)"
                    aria-label="Close modal"
                >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Big Zoomed Card Hero */}
                <div className="relative w-full aspect-[4/3] max-h-[260px] sm:max-h-[300px] bg-slate-900 overflow-hidden flex items-end justify-start p-4">
                    {selectedNode.photo ? (
                        <img 
                            src={selectedNode.photo} 
                            alt={selectedNode.title} 
                            className="absolute inset-0 w-full h-full object-cover opacity-85" 
                            decoding="async"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-4xl">
                            📋
                        </div>
                    )}
                    
                    {/* Hero Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                    
                    {/* Top Ribbon */}
                    <div className={`absolute top-0 right-0 h-8 px-3 pl-5 flex items-center justify-center text-white text-xs font-extrabold tracking-wider clip-chevron shadow-md z-20 ${stepColor}`}>
                        {selectedNode.step || `STEP ${stepNum}`}
                    </div>

                    {/* Role Tag & Badge on Hero */}
                    <div className="relative z-10 flex flex-col gap-1 pr-6">
                        <span className={`inline-block self-start px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${roleBadgeClass}`}>
                            {selectedNode.role}
                        </span>
                        <h2 className="text-base sm:text-lg font-extrabold text-white leading-tight drop-shadow-sm">
                            {selectedNode.title}
                        </h2>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col gap-3.5 text-left">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {selectedNode.desc}
                    </p>

                    <div className="flex flex-col gap-2">
                        <span className={`inline-block self-start text-xs font-semibold px-2 py-0.5 rounded ${
                            selectedNode.isSuccess 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : selectedNode.isAlert 
                                    ? 'bg-red-50 text-red-600 border border-red-200' 
                                    : 'bg-stage-bg text-slate-600 border border-border-light'
                        }`}>
                            {selectedNode.tag}
                        </span>

                        {selectedNode.isDecision && (
                            <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3 text-xs flex flex-col gap-1.5">
                                <div className="font-bold text-amber-900">Decision Pathways:</div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                                        {selectedNode.yesText}
                                    </span>
                                    <span className="font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-300">
                                        {selectedNode.noText}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedNode.linkSlide !== undefined && (
                        <div className="flex justify-end pt-3 border-t border-slate-100">
                            <button 
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-ribbon-4 to-ribbon-3 text-white shadow-primary-btn hover:shadow-primary-btn-hover active:scale-95 transition-all min-h-[44px]"
                                onClick={() => {
                                    const targetSlide = selectedNode.linkSlide;
                                    setSelectedNode(null);
                                    if (goToSlide) goToSlide(targetSlide);
                                }}
                            >
                                <span>Navigate to Linked Chapter (Slide {selectedNode.linkSlide + 1})</span>
                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Accent Pill */}
                <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full ${stepColor}`} />
            </div>
        </div>
    );
});

export default NodeDetailModal;

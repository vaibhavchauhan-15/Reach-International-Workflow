import React, { useEffect, useRef } from 'react';

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

const FlowNodeCard = React.memo(function FlowNodeCard({ node, nIdx, isNodeActive, goToSlide, setSelectedNode }) {
    const cardRef = useRef(null);

    useEffect(() => {
        if (isNodeActive && cardRef.current) {
            cardRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, [isNodeActive]);

    const stepColor = ribbonColors[nIdx % 5];
    const roleBadgeClass = roleBgMap[node.roleClass] || 'bg-slate-600 text-white';

    return (
        <div 
            ref={cardRef}
            className={`w-full md:flex-[1_1_0px] md:min-w-[170px] md:max-w-none snap-start h-auto bg-white border rounded-2xl p-3 pb-4 flex flex-col items-start text-left relative transition-all duration-300 shadow-card hover:-translate-y-1 hover:shadow-card-hover hover:border-ribbon-4 cursor-default overflow-hidden group ${
                isNodeActive ? 'border-ribbon-4 ring-4 ring-cyan-500/20 animate-pulse-node shadow-card-hover' : 'border-border-light'
            } ${node.isSuccess ? 'border-emerald-200' : ''} ${node.isAlert ? 'border-red-200' : ''}`}
        >
            {/* Chevron Ribbon Step Badge */}
            <div className={`absolute top-0 right-0 h-7 px-2.5 pl-4 flex items-center justify-center text-white text-xs font-extrabold tracking-wider clip-chevron shadow-sm z-10 ${stepColor}`}>
                {(nIdx + 1) < 10 ? `0${nIdx + 1}` : nIdx + 1}
            </div>

            {/* Related Photo Thumbnail */}
            {node.photo && (
                <div className="w-full aspect-[4/3] max-h-[220px] md:max-h-none rounded-lg overflow-hidden mb-2 bg-stage-bg border border-border-light flex-shrink-0 flex items-center justify-center">
                    <img 
                        src={node.photo} 
                        alt={node.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        loading="lazy" 
                        decoding="async" 
                    />
                </div>
            )}

            {/* Role Badge */}
            <div className={`inline-block max-w-[calc(100%-55px)] px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis ${roleBadgeClass}`}>
                {node.role}
            </div>
            
            {/* Node Content */}
            <div className="w-full flex-1 flex flex-col">
                <h3 className="text-xs sm:text-[13px] md:text-sm font-extrabold text-slate-900 mb-1 leading-snug group-hover:text-ribbon-4 transition-colors">
                    {node.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-2 line-clamp-2">
                    {node.desc}
                </p>
            </div>

            {/* Card Footer Row & Action Controls */}
            <div className="w-full mt-auto flex items-center justify-between gap-1 pt-1 border-t border-slate-100">
                {node.isDecision ? (
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {node.yesText}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                            {node.noText}
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            node.isSuccess 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : node.isAlert 
                                    ? 'bg-red-50 text-red-600 border border-red-200' 
                                    : 'bg-stage-bg text-slate-600 border border-border-light'
                        }`}>
                            {node.tag}
                        </span>
                    </div>
                )}

                <button 
                    type="button"
                    className="w-6.5 h-6.5 p-1 rounded-md bg-white border border-border-light text-slate-500 hover:bg-cyan-50 hover:text-ribbon-4 hover:border-ribbon-4 active:scale-90 transition-all flex items-center justify-center flex-shrink-0 shadow-xs min-w-[26px] min-h-[26px]"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNode(node);
                    }}
                    title="Open in large view"
                    aria-label="Open in large view"
                >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                </button>
            </div>

            {/* Bottom Accent Pill */}
            <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-9 h-1 rounded-full ${stepColor}`}></div>
        </div>
    );
});

export default FlowNodeCard;

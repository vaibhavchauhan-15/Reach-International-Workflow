import React, { useEffect } from 'react';

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

    // Extract step index if available or default to 1
    const stepNum = selectedNode.step ? selectedNode.step.replace(/[^0-9]/g, '') : '01';
    const stepInt = parseInt(stepNum, 10) || 1;
    const ribbonClass = `ribbon-step-${((stepInt - 1) % 5) + 1}`;
    const pillClass = `pill-step-${((stepInt - 1) % 5) + 1}`;

    return (
        <div className="zoomed-modal-overlay active" onClick={() => setSelectedNode(null)}>
            <div className="zoomed-card-wrapper" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="zoomed-close-btn" onClick={() => setSelectedNode(null)} title="Close (Esc)">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Big Zoomed Card Content */}
                <div className={`zoomed-card-hero ${!selectedNode.photo ? 'no-photo' : ''}`}>
                    {selectedNode.photo && (
                        <img 
                            src={selectedNode.photo} 
                            alt={selectedNode.title} 
                            className="zoomed-card-img" 
                            decoding="async"
                        />
                    )}
                    <div className="zoomed-hero-overlay"></div>
                    
                    {/* Top Ribbon */}
                    <div className={`chevron-ribbon zoomed-ribbon ${ribbonClass}`}>
                        {selectedNode.step || `STEP ${stepNum}`}
                    </div>

                    {/* Role Tag & Badge on Hero */}
                    <div className="zoomed-hero-content">
                        <span className={`node-badge ${selectedNode.roleClass}`}>{selectedNode.role}</span>
                        <h2 className="zoomed-card-title">{selectedNode.title}</h2>
                    </div>
                </div>

                <div className="zoomed-card-body">
                    <p className="zoomed-card-desc">{selectedNode.desc}</p>

                    <div className="zoomed-card-meta">
                        <span className={`meta-tag ${selectedNode.isSuccess ? 'status-success' : selectedNode.isAlert ? 'status-danger' : ''}`}>
                            {selectedNode.tag}
                        </span>

                        {selectedNode.isDecision && (
                            <div className="zoomed-decision-box">
                                <div className="decision-title">Decision Pathways:</div>
                                <div className="decision-options">
                                    <span className="badge-yes">{selectedNode.yesText}</span>
                                    <span className="badge-no">{selectedNode.noText}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {selectedNode.linkSlide !== undefined && (
                        <div className="zoomed-action-footer">
                            <button 
                                className="btn btn-primary"
                                onClick={() => {
                                    const targetSlide = selectedNode.linkSlide;
                                    setSelectedNode(null);
                                    if (goToSlide) goToSlide(targetSlide);
                                }}
                            >
                                <span>Navigate to Linked Chapter (Slide {selectedNode.linkSlide + 1})</span>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Accent Pill */}
                <div className={`bottom-pill ${pillClass}`}></div>
            </div>
        </div>
    );
});

export default NodeDetailModal;


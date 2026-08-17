import React, { useEffect, useRef } from 'react';

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

    return (
        <div 
            ref={cardRef}
            className={`flow-node ${node.isSuccess ? 'success-node' : ''} ${node.isAlert ? 'alert-node' : ''} ${node.isDecision ? 'decision-node' : ''} ${node.linkSlide !== undefined ? 'link-node' : ''} ${isNodeActive ? 'active-step' : ''}`}
        >
            {/* Chevron Ribbon Step Badge */}
            <div className={`chevron-ribbon ribbon-step-${(nIdx % 5) + 1}`}>
                {(nIdx + 1) < 10 ? `0${nIdx + 1}` : nIdx + 1}
            </div>

            {/* Related Photo Thumbnail */}
            {node.photo && (
                <div className="node-photo-wrapper">
                    <img src={node.photo} alt={node.title} className="node-photo" loading="lazy" decoding="async" />
                </div>
            )}

            <div className={`node-badge ${node.roleClass}`}>{node.role}</div>
            
            <div className="node-content">
                <h3>{node.title}</h3>
                <p>{node.desc}</p>
            </div>

            <div className="card-footer-row">
                {node.isDecision ? (
                    <div className="decision-badges">
                        <span className="badge-yes">{node.yesText}</span>
                        <span className="badge-no">{node.noText}</span>
                    </div>
                ) : (
                    <div className="node-meta">
                        <span className={`meta-tag ${node.isSuccess ? 'status-success' : node.isAlert ? 'status-danger' : ''}`}>
                            {node.tag}
                        </span>
                    </div>
                )}

                <button 
                    type="button"
                    className="open-large-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNode(node);
                    }}
                    title="Open in large view"
                    aria-label="Open in large view"
                >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                </button>
            </div>

            {/* Bottom Accent Pill */}
            <div className={`bottom-pill pill-step-${(nIdx % 5) + 1}`}></div>
        </div>
    );
});

export default FlowNodeCard;


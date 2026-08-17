import React from 'react';

export default function FlowNodeCard({ node, nIdx, isNodeActive, goToSlide, setSelectedNode }) {
    return (
        <div 
            className={`flow-node ${node.isSuccess ? 'success-node' : ''} ${node.isAlert ? 'alert-node' : ''} ${node.isDecision ? 'decision-node' : ''} ${node.linkSlide !== undefined ? 'link-node' : ''} ${isNodeActive ? 'active-step' : ''}`}
            onClick={() => {
                if (node.linkSlide !== undefined) {
                    goToSlide(node.linkSlide);
                } else {
                    setSelectedNode(node);
                }
            }}
        >
            {/* Chevron Ribbon Step Badge */}
            <div className={`chevron-ribbon ribbon-step-${(nIdx % 5) + 1}`}>
                {`0${nIdx + 1}`}
            </div>

            <div className={`node-badge ${node.roleClass}`}>{node.role}</div>
            
            <div className="node-content">
                <h3>{node.title}</h3>
                <p>{node.desc}</p>
            </div>

            {node.isDecision ? (
                <div className="decision-badges">
                    <span className="badge-yes">{node.yesText}</span>
                    <span className="badge-no">{node.noText}</span>
                </div>
            ) : (
                <div className="node-meta">
                    <span className={`meta-tag ${node.isSuccess ? 'status-success' : node.isAlert ? 'status-danger' : ''}`}>{node.tag}</span>
                </div>
            )}

            {/* Bottom Accent Pill */}
            <div className={`bottom-pill pill-step-${(nIdx % 5) + 1}`}></div>
        </div>
    );
}

import React from 'react';

export default function NodeDetailModal({ selectedNode, setSelectedNode }) {
    if (!selectedNode) return null;

    return (
        <div className="modal-overlay active" onClick={() => setSelectedNode(null)}>
            <div className="modal-card node-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{selectedNode.title}</h3>
                    <button className="close-btn" onClick={() => setSelectedNode(null)}>×</button>
                </div>
                <div className="modal-body">
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{selectedNode.desc}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="modal-step-badge">{selectedNode.role}</span>
                        <span className="meta-tag">{selectedNode.tag}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

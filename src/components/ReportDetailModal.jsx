import React from 'react';

export default function ReportDetailModal({ selectedReport, setSelectedReport }) {
    if (!selectedReport) return null;

    return (
        <div className="modal-backdrop active" onClick={() => setSelectedReport(null)}>
            <div className="modal-container report-detail-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title-group">
                        <div className="modal-tags-row">
                            <span className="modal-badge" style={{ backgroundColor: `${selectedReport.badgeColor}15`, color: selectedReport.badgeColor, border: `1px solid ${selectedReport.badgeColor}40` }}>
                                {selectedReport.category}
                            </span>
                            <span className="modal-badge modal-badge-status">
                                {selectedReport.status}
                            </span>
                            <span className="modal-date-tag">
                                🗓️ {selectedReport.date}
                            </span>
                        </div>
                        <h2 className="modal-report-title">{selectedReport.title}</h2>
                        <p className="modal-report-subtitle">
                            <strong>Department:</strong> {selectedReport.department} &nbsp;|&nbsp; <strong>Author / HOD:</strong> {selectedReport.author}
                        </p>
                    </div>
                    <button className="modal-close-btn" onClick={() => setSelectedReport(null)} title="Close (Esc)">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="modal-body report-modal-body">
                    {/* Key Stats Bar */}
                    {selectedReport.keyMetrics && (
                        <div className="report-metrics-grid">
                            {selectedReport.keyMetrics.map((m, idx) => (
                                <div key={idx} className="metric-box">
                                    <span className="metric-value">{m.value}</span>
                                    <span className="metric-label">{m.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Flowchart / Workflow Visualization */}
                    {selectedReport.workflowNodes && (
                        <div className="report-section-box">
                            <div className="section-box-header">
                                <h3>📊 {selectedReport.workflowTitle || 'Process Flowchart & Step Walkthrough'}</h3>
                                <span className="section-subtitle">Click steps for details</span>
                            </div>
                            <div className="report-flowchart-row">
                                {selectedReport.workflowNodes.map((node, idx) => (
                                    <React.Fragment key={idx}>
                                        <div className="report-flow-node">
                                            <div className="report-node-step">{node.step}</div>
                                            <div className="report-node-title">{node.title}</div>
                                            <div className="report-node-role">👤 {node.role}</div>
                                            <div className="report-node-desc">{node.desc}</div>
                                        </div>
                                        {idx < selectedReport.workflowNodes.length - 1 && (
                                            <div className="report-flow-arrow">
                                                <svg viewBox="0 0 24 24" width="20" height="20">
                                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/>
                                                </svg>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Detailed Sections */}
                    <div className="report-sections-list">
                        {selectedReport.sections && selectedReport.sections.map((sec, idx) => (
                            <div key={idx} className="report-text-section">
                                <h4>{sec.title}</h4>
                                <div className="report-text-content">
                                    {sec.content.split('\n').map((paragraph, pIdx) => (
                                        <p key={pIdx}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-footer">
                    <div className="footer-signoff">
                        <span>Approved by Reach International Operational Board</span>
                    </div>
                    <div className="modal-footer-actions">
                        <button className="btn btn-outline" onClick={() => window.print()}>
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                            Print Report
                        </button>
                        <button className="btn btn-primary" onClick={() => setSelectedReport(null)}>
                            Close Detail Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

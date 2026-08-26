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
        <div className="modal-backdrop active" onClick={() => setSelectedMeeting(null)}>
            <div className="modal-container clean-meeting-modal" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="modal-title-group">
                        <span className="modal-badge modal-badge-meeting-date">
                            Operational Meeting Summary
                        </span>
                        <h2 className="modal-meeting-date-title">
                            {formatMeetingDate(selectedMeeting.dateFormatted || selectedMeeting.date || selectedMeeting.title)}
                        </h2>
                    </div>
                    <button className="modal-close-btn" onClick={() => setSelectedMeeting(null)} title="Close (Esc)">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Modal Body with Clean Document Layout */}
                <div className="modal-body clean-modal-body">
                    {/* Clean Document Container */}
                    <div className="clean-meeting-document modal-doc-version">
                        {/* Title Header */}
                        <div className="clean-doc-header">
                            <h1 className="doc-main-title">Operational Meeting Summary</h1>
                            <div className="doc-meta-item">
                                <span className="doc-meta-label">Date:</span>
                                <span className="doc-meta-value">{formatMeetingDate(selectedMeeting.dateFormatted || selectedMeeting.date || selectedMeeting.title)}</span>
                            </div>
                            <div className="doc-meta-item">
                                <span className="doc-meta-label">Focus:</span>
                                <span className="doc-meta-value">{selectedMeeting.focus}</span>
                            </div>
                        </div>

                        {/* SECTION 1: Machine Breakdowns & Site Updates */}
                        {selectedMeeting.breakdowns && selectedMeeting.breakdowns.length > 0 && (
                            <section className="clean-doc-section">
                                <h2 className="clean-section-heading">1. Machine Breakdowns & Site Updates</h2>
                                
                                <div className="breakdown-sites-list">
                                    {selectedMeeting.breakdowns.map((item, idx) => (
                                        <div key={idx} className="clean-site-block">
                                            <h3 className="clean-site-title">{item.site}:</h3>
                                            
                                            <div className="site-field-lines">
                                                {item.issue && (
                                                    <div className="clean-field-line">
                                                        <span className="field-name">Issue:</span>
                                                        <span className="field-desc">{item.issue}</span>
                                                    </div>
                                                )}

                                                {item.action && (
                                                    <div className="clean-field-line">
                                                        <span className="field-name">Action:</span>
                                                        <span className="field-desc">{item.action}</span>
                                                    </div>
                                                )}

                                                {item.logistics && (
                                                    <div className="clean-field-line">
                                                        <span className="field-name">Logistics:</span>
                                                        <span className="field-desc">{item.logistics}</span>
                                                    </div>
                                                )}

                                                {item.clarification && (
                                                    <div className="clean-field-line">
                                                        <span className="field-name">Clarification:</span>
                                                        <span className="field-desc">{item.clarification}</span>
                                                    </div>
                                                )}

                                                {item.status && (
                                                    <div className="clean-field-line">
                                                        <span className="field-name">Status:</span>
                                                        <span className="field-desc">{item.status}</span>
                                                    </div>
                                                )}

                                                {item.pendingIssue && (
                                                    <div className="clean-field-line">
                                                        <span className="field-name">Pending Issue:</span>
                                                        <span className="field-desc">{item.pendingIssue}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SECTION 2: Parts, Procurement & Inventory */}
                        {selectedMeeting.parts && selectedMeeting.parts.length > 0 && (
                            <section className="clean-doc-section">
                                <h2 className="clean-section-heading">2. Parts, Procurement & Inventory</h2>
                                
                                <div className="table-responsive clean-table-responsive">
                                    <table className="clean-parts-table">
                                        <thead>
                                            <tr>
                                                <th>Part / Equipment</th>
                                                <th>Site / Context</th>
                                                <th>Status & Next Steps</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedMeeting.parts.map((p, idx) => (
                                                <tr key={idx}>
                                                    <td className="col-part-name">{p.part}</td>
                                                    <td className="col-site-context">{p.context}</td>
                                                    <td className="col-status-steps">{p.statusNextSteps}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        )}

                        {/* SECTION 3: Policy & Process Directives */}
                        {selectedMeeting.directives && selectedMeeting.directives.length > 0 && (
                            <section className="clean-doc-section">
                                <h2 className="clean-section-heading">3. Policy & Process Directives</h2>
                                
                                <div className="clean-directives-list">
                                    {selectedMeeting.directives.map((directive, idx) => (
                                        <div key={idx} className="clean-directive-item">
                                            <h3 className="clean-directive-title">{directive.title}:</h3>
                                            <ul className="clean-directive-points">
                                                {directive.points.map((pt, pIdx) => (
                                                    <li key={pIdx}>{pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* SECTION 4: Key Action Items & Ownership */}
                        {selectedMeeting.actionItems && selectedMeeting.actionItems.length > 0 && (
                            <section className="clean-doc-section">
                                <h2 className="clean-section-heading">4. Key Action Items & Ownership</h2>
                                
                                <div className="clean-action-items-list">
                                    {selectedMeeting.actionItems.map((item, idx) => (
                                        <div key={idx} className="clean-action-line">
                                            <strong className="action-owner-name">{item.person}:</strong>{' '}
                                            <span className="action-task-text">{item.task}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                    <div className="footer-signoff">
                        <span>Operational Meeting Summary • Reach International</span>
                    </div>
                    <div className="modal-footer-actions">
                        <button 
                            type="button"
                            className={`btn ${copySuccess ? 'btn-success' : 'btn-outline'}`} 
                            onClick={copyFormattedSummary}
                            title="Copy formatted text summary to clipboard"
                            aria-label="Copy summary to clipboard"
                        >
                            {copySuccess ? '✓ Copied Summary!' : '📋 Copy Text Summary'}
                        </button>
                        <button 
                            type="button"
                            className="btn btn-primary" 
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



import React, { useState, useRef, useEffect } from 'react';
import { meetingsData } from '../data/meetingsData';
import MeetingDetailModal from './MeetingDetailModal';
import { formatMeetingSummary, copyTextToClipboard, formatMeetingDate } from '../utils/meetingUtils';

export default function MeetingSummariesPage({ searchQuery = '', setSearchQuery }) {
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const currentSearchQuery = setSearchQuery ? searchQuery : localSearchQuery;
    const updateSearchQuery = setSearchQuery || setLocalSearchQuery;

    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [useModalView, setUseModalView] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const pageContainerRef = useRef(null);
    const copyTimeoutRef = useRef(null);

    const availableMonths = [
        { key: 'all', label: 'All Months' },
        ...Array.from(
            new Set(
                meetingsData
                    .map(m => {
                        const parts = m.date.split('-');
                        return `${parts[0]}-${parts[1]}`;
                    })
                    .filter(Boolean)
            )
        ).map(yearMonth => {
            const [year, month] = yearMonth.split('-');
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const label = `${monthNames[parseInt(month, 10) - 1]} ${year}`;
            return { key: yearMonth, label };
        })
    ];

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (currentSearchQuery && selectedMeeting) {
            setSelectedMeeting(null);
        }
    }, [currentSearchQuery]);

    const scrollToTop = () => {
        if (pageContainerRef.current) {
            pageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredMeetings = meetingsData.filter(meeting => {
        const matchesMonth = selectedMonth === 'all' || meeting.date.startsWith(selectedMonth);
        const query = currentSearchQuery.toLowerCase().trim();
        const matchesQuery = !query || 
               meeting.title.toLowerCase().includes(query) ||
               meeting.date.includes(query) ||
               (meeting.dateFormatted && meeting.dateFormatted.toLowerCase().includes(query)) ||
               (meeting.focus && meeting.focus.toLowerCase().includes(query)) ||
               (meeting.breakdowns && meeting.breakdowns.some(b => 
                   (b.site && b.site.toLowerCase().includes(query)) ||
                   (b.issue && b.issue.toLowerCase().includes(query)) ||
                   (b.action && b.action.toLowerCase().includes(query)) ||
                   (b.logistics && b.logistics.toLowerCase().includes(query)) ||
                   (b.clarification && b.clarification.toLowerCase().includes(query)) ||
                   (b.status && b.status.toLowerCase().includes(query))
               )) ||
               (meeting.parts && meeting.parts.some(p =>
                   p.part.toLowerCase().includes(query) ||
                   p.context.toLowerCase().includes(query) ||
                   p.statusNextSteps.toLowerCase().includes(query)
               )) ||
               (meeting.directives && meeting.directives.some(d =>
                   d.title.toLowerCase().includes(query) ||
                   d.points.some(pt => pt.toLowerCase().includes(query))
               )) ||
               (meeting.actionItems && meeting.actionItems.some(a =>
                   a.person.toLowerCase().includes(query) ||
                   a.task.toLowerCase().includes(query)
               ));
        return matchesMonth && matchesQuery;
    });

    const handleSelectMeeting = (meeting) => {
        setSelectedMeeting(meeting);
        scrollToTop();
    };

    const currentIndex = selectedMeeting ? meetingsData.findIndex(m => m.id === selectedMeeting.id) : -1;
    const prevMeeting = currentIndex > 0 ? meetingsData[currentIndex - 1] : null;
    const nextMeeting = currentIndex < meetingsData.length - 1 ? meetingsData[currentIndex + 1] : null;

    const copyFormattedSummary = async () => {
        if (!selectedMeeting) return;
        
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
        <div ref={pageContainerRef} className="meetings-page-container">
            {selectedMeeting ? (
                <div className="meeting-detail-full-page">
                    {/* Clean Operational Document Container */}
                    <div className="clean-meeting-document">
                        {/* Sticky / Floating Top-Right Copy Button */}
                        <div className="doc-sticky-copy-anchor">
                            <button
                                type="button"
                                className={`btn-icon-copy-sticky ${copySuccess ? 'copied' : ''}`}
                                onClick={copyFormattedSummary}
                                title={copySuccess ? 'Copied to clipboard!' : 'Copy full meeting summary'}
                                aria-label="Copy full meeting summary"
                            >
                                {copySuccess ? (
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                )}
                                <span className={`copy-badge-tooltip ${copySuccess ? 'show-copied' : ''}`}>
                                    {copySuccess ? '✓ Copied!' : 'Copy Summary'}
                                </span>
                            </button>
                        </div>

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

                        {/* Document Footer Controls */}
                        <div className="clean-doc-footer">
                            <div className="doc-footer-nav-group">
                                <button 
                                    type="button"
                                    className="btn btn-outline footer-back-btn"
                                    onClick={() => {
                                        setSelectedMeeting(null);
                                        scrollToTop();
                                    }}
                                >
                                    ← All Summaries
                                </button>

                                {(prevMeeting || nextMeeting) && (
                                    <div className="footer-day-pills">
                                        {prevMeeting && (
                                            <button 
                                                type="button"
                                                className="btn btn-outline footer-day-btn"
                                                onClick={() => handleSelectMeeting(prevMeeting)}
                                                title={`Previous: ${formatMeetingDate(prevMeeting.dateFormatted || prevMeeting.date || prevMeeting.title)}`}
                                            >
                                                ← Previous Day
                                            </button>
                                        )}
                                        {nextMeeting && (
                                            <button 
                                                type="button"
                                                className="btn btn-outline footer-day-btn"
                                                onClick={() => handleSelectMeeting(nextMeeting)}
                                                title={`Next: ${formatMeetingDate(nextMeeting.dateFormatted || nextMeeting.date || nextMeeting.title)}`}
                                            >
                                                Next Day →
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="doc-footer-actions-group">
                                <button 
                                    type="button"
                                    className={`btn ${copySuccess ? 'btn-success' : 'btn-outline'} footer-copy-btn`}
                                    onClick={copyFormattedSummary}
                                    title="Copy formatted text summary to clipboard"
                                    aria-label="Copy formatted text summary to clipboard"
                                >
                                    {copySuccess ? '✓ Copied Summary!' : '📋 Copy Text Summary'}
                                </button>
                                <button 
                                    type="button"
                                    className="btn btn-primary footer-top-btn"
                                    onClick={scrollToTop}
                                    title="Scroll back to top"
                                    aria-label="Scroll back to top"
                                >
                                    ↑ Top
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* GRID VIEW */
                <>
                    {/* Page Hero Banner with Choose Date & Month Filter */}
                    <div className="page-hero-banner meeting-hero-banner">
                        <div className="hero-content-wrapper meeting-hero-flex">
                            <div className="hero-text-side">
                                <h1>Choose Date</h1>
                            </div>
                            <div className="month-pills-bar">
                                <span className="month-filter-label">Filter Month:</span>
                                {availableMonths.map(m => (
                                    <button 
                                        key={m.key} 
                                        type="button"
                                        className={`month-pill-btn ${selectedMonth === m.key ? 'active' : ''}`}
                                        onClick={() => setSelectedMonth(m.key)}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="meetings-content-section">
                        <div className="section-info-row">
                            <span className="results-count">Showing {filteredMeetings.length} Meeting Summary Record(s)</span>
                        </div>

                        <div className="meetings-grid">
                            {filteredMeetings.map((meeting) => (
                                <div 
                                    key={meeting.id} 
                                    className="meeting-card clean-summary-card"
                                    onClick={() => handleSelectMeeting(meeting)}
                                >
                                    <h2 className="clean-card-date">{formatMeetingDate(meeting.dateFormatted || meeting.date || meeting.title)}</h2>
                                </div>
                            ))}
                        </div>

                        {filteredMeetings.length === 0 && (
                            <div className="empty-search-state">
                                <span className="empty-icon">📅</span>
                                <h3>No meeting summaries found</h3>
                                <p>No summaries matched "{currentSearchQuery}".</p>
                                <button className="btn btn-outline" onClick={() => updateSearchQuery('')}>
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {useModalView && (
                <MeetingDetailModal 
                    selectedMeeting={selectedMeeting} 
                    setSelectedMeeting={setSelectedMeeting} 
                />
            )}
        </div>
    );
}




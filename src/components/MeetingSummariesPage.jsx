import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
    fetchYearsIndex, 
    fetchMonthIndex, 
    fetchMeetingDetail, 
    fetchSearchIndex, 
    searchMeetings, 
    getChronologicalNavigation 
} from '../utils/meetingDataService';
import { 
    formatMeetingSummary, 
    copyTextToClipboard, 
    formatMeetingDate, 
    formatShortMeetingDate, 
    formatLongMeetingDate,
    formatDateDDMMYYYY,
    normalizeDateToYYYYMMDD
} from '../utils/meetingUtils';
import MeetingShareMenu from './MeetingShareMenu';

export default function MeetingSummariesPage({ 
    searchQuery = '', 
    setSearchQuery,
    selectedMeeting: controlledSelectedMeeting,
    setSelectedMeeting: controlledSetSelectedMeeting
}) {
    // -------------------------------------------------------------
    // State Management
    // -------------------------------------------------------------
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const currentSearchQuery = setSearchQuery ? searchQuery : localSearchQuery;
    const updateSearchQuery = setSearchQuery || setLocalSearchQuery;

    const [yearsData, setYearsData] = useState(null);
    const [selectedYear, setSelectedYear] = useState('2026');
    const [selectedMonth, setSelectedMonth] = useState('09');
    const [monthData, setMonthData] = useState(null);
    const [searchIndex, setSearchIndex] = useState([]);

    const [localSelectedMeeting, setLocalSelectedMeeting] = useState(null);
    const selectedMeetingMeta = controlledSelectedMeeting !== undefined ? controlledSelectedMeeting : localSelectedMeeting;
    const setSelectedMeetingMeta = controlledSetSelectedMeeting || setLocalSelectedMeeting;

    const [fullMeetingDetail, setFullMeetingDetail] = useState(null);
    const [isLoadingMeeting, setIsLoadingMeeting] = useState(false);
    const [isLoadingMonth, setIsLoadingMonth] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const pageContainerRef = useRef(null);
    const copyTimeoutRef = useRef(null);

    // -------------------------------------------------------------
    // Initial Load: Years Index & Search Index
    // -------------------------------------------------------------
    useEffect(() => {
        let isMounted = true;

        async function init() {
            try {
                const [years, searchIdx] = await Promise.all([
                    fetchYearsIndex(),
                    fetchSearchIndex()
                ]);

                if (!isMounted) return;

                setYearsData(years);
                setSearchIndex(searchIdx);

                if (years.latestYear) {
                    setSelectedYear(years.latestYear);
                }
                if (years.latestMonth) {
                    setSelectedMonth(years.latestMonth);
                }
            } catch (err) {
                console.error("Failed to load initial meeting indexes:", err);
            }
        }

        init();

        return () => {
            isMounted = false;
        };
    }, []);

    // -------------------------------------------------------------
    // Load Month Index when Year or Month changes
    // -------------------------------------------------------------
    useEffect(() => {
        let isMounted = true;
        if (!selectedYear || !selectedMonth) return;

        async function loadMonth() {
            setIsLoadingMonth(true);
            try {
                const data = await fetchMonthIndex(selectedYear, selectedMonth);
                if (isMounted) {
                    setMonthData(data);
                }
            } catch (err) {
                console.error(`Failed to load month index for ${selectedYear}/${selectedMonth}:`, err);
                if (isMounted) {
                    setMonthData(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoadingMonth(false);
                }
            }
        }

        loadMonth();

        return () => {
            isMounted = false;
        };
    }, [selectedYear, selectedMonth]);

    // -------------------------------------------------------------
    // Load Full Meeting Detail on-demand when selected
    // -------------------------------------------------------------
    useEffect(() => {
        let isMounted = true;
        if (!selectedMeetingMeta) {
            setFullMeetingDetail(null);
            return;
        }

        // If the object already contains the full document (breakdowns array)
        if (selectedMeetingMeta.breakdowns && selectedMeetingMeta.breakdowns.length > 0) {
            setFullMeetingDetail(selectedMeetingMeta);
            return;
        }

        async function loadMeeting() {
            setIsLoadingMeeting(true);
            try {
                const doc = await fetchMeetingDetail(selectedMeetingMeta.path || selectedMeetingMeta.date);
                if (isMounted) {
                    setFullMeetingDetail(doc);
                }
            } catch (err) {
                console.error("Failed to fetch full meeting document:", err);
            } finally {
                if (isMounted) {
                    setIsLoadingMeeting(false);
                }
            }
        }

        loadMeeting();

        return () => {
            isMounted = false;
        };
    }, [selectedMeetingMeta]);

    // -------------------------------------------------------------
    // Scroll to top on meeting selection & scroll listener
    // -------------------------------------------------------------
    const scrollToTop = useCallback(() => {
        if (pageContainerRef.current) {
            pageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const container = pageContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop || window.scrollY || 0;
            setShowScrollTop(scrollTop > 200);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        handleScroll();

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedMeetingMeta]);

    // -------------------------------------------------------------
    // URL Deep-linking & History Synchronization
    // -------------------------------------------------------------
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if a meeting date was provided in URL query params on load
        const params = new URLSearchParams(window.location.search);
        const meetingParam = params.get('meeting') || params.get('date');

        if (meetingParam) {
            const isoDate = normalizeDateToYYYYMMDD(meetingParam);
            if (isoDate && isoDate.includes('-')) {
                const [y, m] = isoDate.split('-');
                setSelectedYear(y);
                setSelectedMonth(m);
                setSelectedMeetingMeta({ date: isoDate, id: `meet-${isoDate}` });
            }
        }

        // Handle Browser Back / Forward buttons
        const handlePopState = () => {
            const currentParams = new URLSearchParams(window.location.search);
            const currentMeetingParam = currentParams.get('meeting') || currentParams.get('date');
            if (currentMeetingParam) {
                const isoDate = normalizeDateToYYYYMMDD(currentMeetingParam);
                if (isoDate && isoDate.includes('-')) {
                    const [y, m] = isoDate.split('-');
                    setSelectedYear(y);
                    setSelectedMonth(m);
                    setSelectedMeetingMeta({ date: isoDate, id: `meet-${isoDate}` });
                }
            } else {
                setSelectedMeetingMeta(null);
                setFullMeetingDetail(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // Sync URL when selected meeting changes (writes DD-MM-YYYY into URL bar)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const url = new URL(window.location.href);

        if (selectedMeetingMeta?.date) {
            const dmyDate = formatDateDDMMYYYY(selectedMeetingMeta.date);
            if (url.searchParams.get('meeting') !== dmyDate) {
                url.searchParams.set('meeting', dmyDate);
                url.searchParams.delete('date');
                window.history.pushState({ meeting: dmyDate }, '', url.toString());
            }
        } else {
            if (url.searchParams.has('meeting') || url.searchParams.has('date')) {
                url.searchParams.delete('meeting');
                url.searchParams.delete('date');
                window.history.pushState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
            }
        }
    }, [selectedMeetingMeta]);

    // Clear search on meeting selection
    useEffect(() => {
        if (currentSearchQuery && selectedMeetingMeta) {
            setSelectedMeetingMeta(null);
        }
    }, [currentSearchQuery]);

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current);
            }
        };
    }, []);

    // -------------------------------------------------------------
    // Event Handlers
    // -------------------------------------------------------------
    const handleSelectMeeting = (meeting) => {
        if (meeting?.isHoliday) return;
        if (meeting?.date) {
            const parts = meeting.date.split('-');
            if (parts.length >= 2) {
                setSelectedYear(parts[0]);
                setSelectedMonth(parts[1]);
            }
        }
        setSelectedMeetingMeta(meeting);
        scrollToTop();
    };

    const copyFormattedSummary = async () => {
        if (!fullMeetingDetail) return;
        
        const text = formatMeetingSummary(fullMeetingDetail);
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

    // -------------------------------------------------------------
    // Calculations: Search Filtering & Navigation
    // -------------------------------------------------------------
    const isSearching = Boolean(currentSearchQuery && currentSearchQuery.trim());
    const searchResults = isSearching ? searchMeetings(currentSearchQuery, searchIndex) : [];

    // Chronological navigation calculations
    const { prevMeeting, nextMeeting } = getChronologicalNavigation(
        fullMeetingDetail?.date || selectedMeetingMeta?.date,
        yearsData?.chronologicalSequence
    );

    // Current Year's Month List & Total Meetings
    const activeYearObject = yearsData?.years?.find(y => String(y.year) === String(selectedYear));
    const availableMonthsForYear = activeYearObject?.months || [];
    const totalMeetingsForYear = activeYearObject?.meetingCount ?? availableMonthsForYear.reduce((acc, m) => acc + (m.meetingCount || 0), 0);

    // Selected Month Name
    const activeMonthObject = availableMonthsForYear.find(m => m.month === selectedMonth);
    const displayMonthName = activeMonthObject?.name || monthData?.monthName || 'September';

    // -------------------------------------------------------------
    // Render Component
    // -------------------------------------------------------------
    return (
        <div ref={pageContainerRef} className="flex-1 min-h-0 flex flex-col overflow-y-auto bg-stage-bg pb-12 w-full select-none animate-fade-in scroll-fade-top relative">
            <div className="top-blur-mask" aria-hidden="true" />
            {selectedMeetingMeta ? (
                /* ========================================================= */
                /* OPERATIONAL DOCUMENT VIEW                                 */
                /* ========================================================= */
                <div className="pt-5 sm:pt-6 md:pt-8 px-3 sm:px-5 md:px-8 pb-12 flex justify-center">
                    <div className="relative bg-white border border-border-light rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-auto shadow-card">
                        {/* Top Navigation & Action Row */}
                        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-3.5 mb-4 sm:mb-5 border-b border-slate-100">
                            <button 
                                type="button"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 border border-border-light active:scale-95 transition-all cursor-pointer shadow-2xs"
                                onClick={() => {
                                    setSelectedMeetingMeta(null);
                                    setFullMeetingDetail(null);
                                    scrollToTop();
                                }}
                                title="Return to Archive Dashboard"
                                aria-label="Return to Archive Dashboard"
                            >
                                <span>← Archive Dashboard</span>
                            </button>

                            {/* Action Buttons: Share & Copy */}
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                {/* Share Button & Popover */}
                                <MeetingShareMenu 
                                    meeting={fullMeetingDetail} 
                                    disabled={!fullMeetingDetail || isLoadingMeeting} 
                                />

                                {/* Small Static Copy Button */}
                                <button
                                    type="button"
                                    onClick={copyFormattedSummary}
                                    disabled={!fullMeetingDetail || isLoadingMeeting}
                                    className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-90 border flex-shrink-0 cursor-pointer group ${
                                        copySuccess 
                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                                            : 'bg-white text-slate-500 border-border-light hover:text-theme-breakdown hover:border-theme-breakdown hover:bg-slate-50 shadow-2xs'
                                    } ${(!fullMeetingDetail || isLoadingMeeting) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    title={copySuccess ? 'Copied to clipboard!' : 'Copy full meeting summary'}
                                    aria-label="Copy full meeting summary"
                                >
                                    {copySuccess ? (
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    )}

                                    {/* Tooltip */}
                                    <span className={`absolute right-full mr-2 px-2 py-0.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all shadow-md ${
                                        copySuccess ? 'bg-emerald-700 text-white opacity-100' : 'bg-slate-900 text-white opacity-0 group-hover:opacity-100 pointer-events-none'
                                    }`}>
                                        {copySuccess ? '✓ Copied!' : 'Copy'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Loading State Spinner */}
                        {isLoadingMeeting && !fullMeetingDetail && (
                            <div className="py-16 flex flex-col items-center justify-center gap-3">
                                <div className="w-8 h-8 border-3 border-theme-breakdown border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs font-semibold text-slate-500">Loading meeting details...</span>
                            </div>
                        )}

                        {/* Loaded Content */}
                        {fullMeetingDetail && (
                            <>
                                {/* Meeting Summary Main Title & Date */}
                                <div className="pb-4 sm:pb-5 mb-5 sm:mb-6">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                                        {formatDateDDMMYYYY(fullMeetingDetail.date || fullMeetingDetail.dateDisplay || fullMeetingDetail.dateFormatted || fullMeetingDetail.title)}
                                    </h1>

                                    {/* Focus Section */}
                                    {fullMeetingDetail.focus && (
                                        <div className="bg-slate-50/80 border border-slate-200/90 border-l-4 border-l-theme-breakdown rounded-xl p-3 sm:p-4 shadow-2xs">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="text-xs">🎯</span>
                                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-theme-breakdown">
                                                    Meeting Focus
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                                                {fullMeetingDetail.focus}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Holiday Notification Banner */}
                                {fullMeetingDetail.isHoliday && (
                                    <div className="bg-amber-50/80 border border-amber-200/90 border-l-4 border-l-amber-500 rounded-xl p-4 sm:p-5 mb-6 shadow-xs">
                                        <div className="flex items-start sm:items-center gap-3">
                                            <span className="text-2xl sm:text-3xl flex-shrink-0">🎉</span>
                                            <div className="space-y-1">
                                                <h2 className="text-sm sm:text-base font-extrabold text-amber-950">
                                                    Official Company Holiday – {fullMeetingDetail.holidayName || 'Holiday'}
                                                </h2>
                                                <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed font-medium">
                                                    Operations, workshop maintenance, and administrative offices remained closed in celebration of {fullMeetingDetail.holidayName || 'Company Holiday'}. No daily operations breakdown or coordination meeting was conducted on this day.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Clean Divider */}
                                <hr className="border-border-light my-6 sm:my-8" />

                                {/* SECTION 01: Machine Breakdowns & Site Updates */}
                                {fullMeetingDetail.breakdowns && fullMeetingDetail.breakdowns.length > 0 && (
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-600 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    01
                                                </span>
                                                <span className="truncate sm:overflow-visible">
                                                    <span className="hidden sm:inline">Machine </span>Breakdowns & Site Updates
                                                </span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-theme-breakdown border border-blue-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs">
                                                {fullMeetingDetail.breakdowns.length} Sites
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3 sm:gap-3.5">
                                            {fullMeetingDetail.breakdowns.map((item, idx) => (
                                                <div key={idx} className="bg-slate-50/70 border border-border-light border-l-4 border-l-theme-breakdown rounded-xl p-3.5 sm:p-4.5 text-xs sm:text-sm shadow-xs flex flex-col gap-2 transition-colors hover:bg-slate-50">
                                                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-1.5 border-b border-slate-200/70">
                                                        <span className="w-2 h-2 rounded-full bg-theme-breakdown"></span>
                                                        <span>{item.site}</span>
                                                    </h3>
                                                    
                                                    <div className="space-y-1.5 text-xs sm:text-sm pt-0.5">
                                                        {item.issue && (
                                                            <p className="leading-relaxed">
                                                                <span className="font-bold text-slate-800 mr-1.5">Issue:</span>
                                                                <span className="text-slate-600">{item.issue}</span>
                                                            </p>
                                                        )}

                                                        {item.action && (
                                                            <p className="leading-relaxed">
                                                                <span className="font-bold text-slate-800 mr-1.5">Action:</span>
                                                                <span className="text-slate-600">{item.action}</span>
                                                            </p>
                                                        )}

                                                        {item.logistics && (
                                                            <p className="leading-relaxed">
                                                                <span className="font-bold text-slate-800 mr-1.5">Logistics:</span>
                                                                <span className="text-slate-600">{item.logistics}</span>
                                                            </p>
                                                        )}

                                                        {item.clarification && (
                                                            <p className="leading-relaxed">
                                                                <span className="font-bold text-slate-800 mr-1.5">Clarification:</span>
                                                                <span className="text-slate-600">{item.clarification}</span>
                                                            </p>
                                                        )}

                                                        {item.status && (
                                                            <p className="leading-relaxed">
                                                                <span className="font-bold text-slate-800 mr-1.5">Status:</span>
                                                                <span className="text-slate-700 font-semibold">{item.status}</span>
                                                            </p>
                                                        )}

                                                        {item.pendingIssue && (
                                                            <p className="leading-relaxed">
                                                                <span className="font-bold text-amber-900 mr-1.5">Pending Issue:</span>
                                                                <span className="text-amber-800 font-medium">{item.pendingIssue}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* SECTION 02: Parts, Procurement & Inventory */}
                                {fullMeetingDetail.parts && fullMeetingDetail.parts.length > 0 && (
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-600 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    02
                                                </span>
                                                <span className="truncate sm:overflow-visible">Parts & Procurement</span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-theme-parts border border-teal-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs">
                                                {fullMeetingDetail.parts.length} Items
                                            </span>
                                        </div>
                                        
                                        <div className="overflow-x-auto rounded-xl border border-border-light shadow-xs">
                                            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-slate-100/90 border-b border-border-light text-slate-800 font-bold uppercase text-[10px] sm:text-xs tracking-wider">
                                                        <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Part / Equipment</th>
                                                        <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Site / Context</th>
                                                        <th className="px-3.5 py-2.5 sm:px-4 sm:py-3">Status & Next Steps</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fullMeetingDetail.parts.map((p, idx) => (
                                                        <tr key={idx} className="border-b border-border-light last:border-0 hover:bg-slate-50/80 transition-colors">
                                                            <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 font-bold text-slate-900 min-w-[130px]">{p.part}</td>
                                                            <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-600 min-w-[110px]">{p.context}</td>
                                                            <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-700 min-w-[180px] font-medium">{p.statusNextSteps}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}

                                {/* SECTION 03: Policy & Process Directives */}
                                {fullMeetingDetail.directives && fullMeetingDetail.directives.length > 0 && (
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    03
                                                </span>
                                                <span className="truncate sm:overflow-visible">Directives</span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-theme-directive border border-amber-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs">
                                                {fullMeetingDetail.directives.length} Policies
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {fullMeetingDetail.directives.map((directive, idx) => (
                                                <div key={idx} className="bg-amber-50/70 border border-amber-200/80 border-l-4 border-l-theme-directive rounded-xl p-3.5 sm:p-4.5 shadow-xs space-y-2">
                                                    <h3 className="text-xs sm:text-sm font-extrabold text-amber-950 flex items-center gap-1.5">
                                                        <span>{directive.title}</span>
                                                    </h3>
                                                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-amber-900/90 font-medium pl-1">
                                                        {directive.points.map((pt, pIdx) => (
                                                            <li key={pIdx} className="leading-relaxed">{pt}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* SECTION 04: Key Action Items & Ownership */}
                                {fullMeetingDetail.actionItems && fullMeetingDetail.actionItems.length > 0 && (
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-600 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    04
                                                </span>
                                                <span className="truncate sm:overflow-visible">Action Items</span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-theme-action border border-emerald-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs">
                                                {fullMeetingDetail.actionItems.length} Owners
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-3 sm:space-y-3.5">
                                            {fullMeetingDetail.actionItems.map((item, idx) => {
                                                const taskPoints = item.task
                                                    ? item.task.split(';').map(t => t.trim()).filter(Boolean)
                                                    : [];
                                                const nameParts = (item.person || '').split('&')[0].trim().split(' ');
                                                const initials = nameParts.length > 1
                                                    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
                                                    : (item.person || 'U').substring(0, 2).toUpperCase();

                                                return (
                                                    <div 
                                                        key={idx} 
                                                        className="bg-emerald-50/40 border border-emerald-200/80 border-l-4 border-l-theme-action rounded-xl p-3.5 sm:p-4 shadow-2xs hover:bg-emerald-50/70 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-4"
                                                    >
                                                        {/* Person Info Badge */}
                                                        <div className="flex items-center gap-2 sm:w-48 md:w-56 flex-shrink-0">
                                                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100/90 text-emerald-900 font-extrabold text-xs flex items-center justify-center border border-emerald-300/60 shadow-2xs flex-shrink-0">
                                                                {initials}
                                                            </span>
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                                                                    {item.person}
                                                                </span>
                                                                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-800">
                                                                    {taskPoints.length > 1 ? `${taskPoints.length} Action Points` : 'Assigned Owner'}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Task List / Content */}
                                                        <div className="flex-1 min-w-0 pt-0.5 sm:pt-0">
                                                            {taskPoints.length > 1 ? (
                                                                <ul className="space-y-1.5 list-none">
                                                                    {taskPoints.map((point, pIdx) => (
                                                                        <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                                                            <span className="text-theme-action font-bold mt-0.5 select-none text-xs">▪</span>
                                                                            <span>{point}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                                                                    {item.task}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </section>
                                )}

                                {/* Clean Divider */}
                                <hr className="border-border-light my-6 sm:my-8" />

                                {/* Document Footer Controls: Previous Day / Next Day */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 w-full">
                                        <button 
                                            type="button"
                                            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-800 border border-border-light hover:bg-stage-bg hover:border-slate-400 active:scale-95 transition-all shadow-xs min-h-[44px] cursor-pointer"
                                            onClick={() => {
                                                setSelectedMeetingMeta(null);
                                                setFullMeetingDetail(null);
                                                scrollToTop();
                                            }}
                                        >
                                            ← Back to Archive
                                        </button>

                                        {(prevMeeting || nextMeeting) && (
                                            <div className="grid grid-cols-2 sm:flex items-center gap-2 flex-1 sm:flex-initial">
                                                {prevMeeting ? (
                                                    <button 
                                                        type="button"
                                                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[44px] cursor-pointer"
                                                        onClick={() => handleSelectMeeting(prevMeeting)}
                                                        title={`Previous Day: ${formatDateDDMMYYYY(prevMeeting.date || prevMeeting.dateDisplay || prevMeeting.dateFormatted || prevMeeting.title)}`}
                                                    >
                                                        ← Previous Day
                                                    </button>
                                                ) : (
                                                    <div className="hidden sm:block" />
                                                )}
                                                {nextMeeting ? (
                                                    <button 
                                                        type="button"
                                                        className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-border-light hover:bg-stage-bg hover:border-ribbon-4 hover:text-ribbon-4 active:scale-95 transition-all shadow-xs min-h-[44px] cursor-pointer"
                                                        onClick={() => handleSelectMeeting(nextMeeting)}
                                                        title={`Next Day: ${formatDateDDMMYYYY(nextMeeting.date || nextMeeting.dateDisplay || nextMeeting.dateFormatted || nextMeeting.title)}`}
                                                    >
                                                        Next Day →
                                                    </button>
                                                ) : (
                                                    <div className="hidden sm:block" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                /* ========================================================= */
                /* ARCHIVE DASHBOARD VIEW                                    */
                /* ========================================================= */
                <div className="pt-5 sm:pt-6 md:pt-8 px-3 sm:px-5 md:px-8 pb-12 max-w-5xl mx-auto w-full flex flex-col gap-6">
                    {/* 1. Main Header & Search Box Card */}
                    <div className="bg-white border border-border-light rounded-2xl p-4 sm:p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                            Daily Meeting Archive
                        </h1>

                        {/* Search meetings input */}
                        <div className="relative flex items-center w-full sm:w-72 md:w-80">
                            <svg className="absolute left-3.5 text-slate-400 pointer-events-none w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input 
                                type="text" 
                                className="w-full h-11 sm:h-12 pl-10 sm:pl-11 pr-10 text-xs sm:text-sm bg-slate-50 border border-border-light rounded-xl focus:bg-white focus:border-theme-breakdown focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-2xs"
                                placeholder="Search (02-09-2026, 2 Sept, Sanand)..."
                                value={currentSearchQuery}
                                onChange={(e) => updateSearchQuery(e.target.value)}
                                aria-label="Search meetings across archive"
                            />
                            {currentSearchQuery && (
                                <button 
                                    className="absolute right-3 w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all active:scale-90" 
                                    onClick={() => updateSearchQuery('')}
                                    title="Clear search"
                                    aria-label="Clear search query"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 2. Year Header & Month Cards Grid (When Not Searching) */}
                    {!isSearching && (
                        <div className="flex flex-col gap-4">
                            {/* Year Title & Switcher */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                    {selectedYear}
                                </h2>

                                <div className="flex items-center gap-3">
                                    <span className="text-xs sm:text-sm font-medium text-slate-500">
                                        <span className="font-semibold text-slate-800">{totalMeetingsForYear}</span> Total Meetings
                                    </span>

                                    {/* Multi-year Switcher (if multiple years exist) */}
                                    {yearsData?.years && yearsData.years.length > 1 && (
                                        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-border-light shadow-2xs">
                                            {yearsData.years.map(y => (
                                                <button
                                                    key={y.year}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedYear(y.year);
                                                        if (y.months && y.months.length > 0) {
                                                            setSelectedMonth(y.months[0].month);
                                                        }
                                                    }}
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                                        selectedYear === y.year
                                                            ? 'bg-slate-900 text-white shadow-xs'
                                                            : 'text-slate-500 hover:text-slate-800'
                                                    }`}
                                                >
                                                    {y.year}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Month Cards Grid */}
                            {availableMonthsForYear.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                                    {availableMonthsForYear.map(m => {
                                        const isSelected = selectedMonth === m.month;
                                        return (
                                            <div
                                                key={m.month}
                                                onClick={() => setSelectedMonth(m.month)}
                                                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col justify-between group min-h-[90px] shadow-card hover:shadow-card-hover hover:-translate-y-1 ${
                                                    isSelected
                                                        ? 'bg-blue-50/70 border-theme-breakdown ring-2 ring-theme-breakdown/20'
                                                        : 'bg-white border-border-light hover:border-slate-300'
                                                }`}
                                            >
                                                <div>
                                                    <h3 className={`text-sm sm:text-base font-extrabold leading-tight ${
                                                        isSelected ? 'text-theme-breakdown' : 'text-slate-900 group-hover:text-theme-breakdown'
                                                    }`}>
                                                        {m.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 font-semibold mt-1">
                                                        {m.meetingCount} {m.meetingCount === 1 ? 'Meeting' : 'Meetings'}
                                                    </p>
                                                </div>

                                                <div className="mt-2 flex items-center justify-end text-[10px] font-semibold text-slate-400">
                                                    <span className={`transition-transform group-hover:translate-x-0.5 ${isSelected ? 'text-theme-breakdown font-bold' : ''}`}>→</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 3. Monthly Meeting Stream / List Section */}
                    <div className="flex flex-col gap-3.5">
                        {/* Section Header */}
                        <div className="flex items-center justify-between pt-2">
                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                {isSearching 
                                    ? `Search Results (${searchResults.length})` 
                                    : `${displayMonthName} ${selectedYear}`}
                            </h2>
                            <span className="text-xs font-semibold text-slate-500">
                                {isSearching 
                                    ? `${searchResults.length} ${searchResults.length === 1 ? 'match' : 'matches'} across archive`
                                    : `${monthData?.meetings?.length || 0} Records`}
                            </span>
                        </div>

                        {/* Loading Month State */}
                        {isLoadingMonth && !isSearching && (
                            <div className="py-12 bg-white rounded-2xl border border-border-light flex flex-col items-center justify-center gap-3 shadow-2xs">
                                <div className="w-8 h-8 border-3 border-theme-breakdown border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs font-semibold text-slate-500">Loading meeting records...</span>
                            </div>
                        )}

                        {/* List Items Stream */}
                        {(!isLoadingMonth || isSearching) && (
                            <div className="flex flex-col gap-2.5">
                                {(isSearching ? searchResults : (monthData?.meetings || [])).map((meeting) => {
                                    const shortDate = formatDateDDMMYYYY(meeting.date || meeting.dateDisplay || meeting.dateFormatted || meeting.title);
                                    
                                    if (meeting.isHoliday) {
                                        return (
                                            <div 
                                                key={meeting.id} 
                                                className="bg-white border border-border-light border-l-4 border-l-amber-500 rounded-xl p-3.5 sm:p-4 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 min-h-[56px] select-none"
                                            >
                                                <div className="flex items-center gap-2.5 sm:gap-3.5">
                                                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 min-w-[64px] flex-shrink-0">
                                                        {shortDate}
                                                    </span>
                                                    <span className="text-slate-300 select-none">─</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100/90 text-amber-900 font-extrabold text-xs">
                                                            🎉 Holiday: {meeting.holidayName || 'Holiday'}
                                                        </span>
                                                        <span className="text-xs text-slate-400 font-medium hidden md:inline">
                                                            (Operations Closed)
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] font-semibold text-slate-400 self-start sm:self-auto">
                                                    No Meeting Held
                                                </span>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div 
                                            key={meeting.id} 
                                            onClick={() => handleSelectMeeting(meeting)}
                                            className="bg-white border border-border-light border-l-4 border-l-theme-breakdown rounded-xl p-3.5 sm:p-4.5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group min-h-[56px]"
                                        >
                                            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                                                {/* Date Label */}
                                                <span className="text-xs sm:text-sm font-extrabold text-slate-900 min-w-[64px] flex-shrink-0 group-hover:text-theme-breakdown transition-colors">
                                                    {shortDate}
                                                </span>

                                                {/* Dash Separator */}
                                                <span className="text-slate-300 select-none hidden sm:inline">─</span>

                                                {/* Focus Description / Summary */}
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs sm:text-sm text-slate-700 font-medium group-hover:text-slate-900 leading-snug line-clamp-1 sm:line-clamp-2">
                                                        {meeting.focus || 'Operational Meeting & Fleet Review'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Mini Badges & Chevron CTA */}
                                            <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                    {meeting.breakdownCount > 0 && (
                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-theme-breakdown border border-blue-100">
                                                            🔧 {meeting.breakdownCount}
                                                        </span>
                                                    )}
                                                    {meeting.partsCount > 0 && (
                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-theme-parts border border-teal-100">
                                                            📦 {meeting.partsCount}
                                                        </span>
                                                    )}
                                                    {meeting.actionItemsCount > 0 && (
                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-theme-action border border-emerald-100">
                                                            ✅ {meeting.actionItemsCount}
                                                        </span>
                                                    )}
                                                </div>

                                                <span className="text-theme-breakdown text-sm font-bold transition-transform group-hover:translate-x-1 pl-1">
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Empty Search State */}
                        {isSearching && searchResults.length === 0 && (
                            <div className="text-center py-12 px-4 bg-white border border-border-light rounded-xl max-w-md mx-auto my-6 shadow-xs">
                                <span className="text-4xl mb-3 block">🔍</span>
                                <h3 className="text-base font-extrabold text-slate-900 mb-1">No meeting summaries found</h3>
                                <p className="text-xs sm:text-sm text-slate-500 mb-4">No summaries matched "{currentSearchQuery}".</p>
                                <button 
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-white text-slate-800 border border-border-light hover:bg-stage-bg active:scale-95 transition-all shadow-xs min-h-[44px]" 
                                    onClick={() => updateSearchQuery('')}
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Floating Scroll-to-Top Action Button */}
            <button
                type="button"
                onClick={scrollToTop}
                className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-border-light shadow-card hover:shadow-hover text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-ribbon-4 hover:to-ribbon-3 flex items-center justify-center transition-all duration-300 transform active:scale-90 group min-w-[44px] min-h-[44px] ${
                    showScrollTop 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
                title="Scroll back to top"
                aria-label="Scroll back to top"
            >
                <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
            </button>
        </div>
    );
}

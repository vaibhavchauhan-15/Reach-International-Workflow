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
    setSelectedMeeting: controlledSetSelectedMeeting,
    resetTrigger
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
    const [isCardsScrolled, setIsCardsScrolled] = useState(false);

    const pageContainerRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const copyTimeoutRef = useRef(null);

    // -------------------------------------------------------------
    // Navbar Reset Coordination
    // -------------------------------------------------------------
    useEffect(() => {
        if (resetTrigger) {
            setSelectedMeetingMeta(null);
            setFullMeetingDetail(null);
            updateSearchQuery('');
            setIsCardsScrolled(false);
            if (cardsContainerRef.current) {
                cardsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
            if (pageContainerRef.current) {
                pageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [resetTrigger]);

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
        if (selectedMeetingMeta && pageContainerRef.current) {
            pageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (cardsContainerRef.current) {
            cardsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [selectedMeetingMeta]);

    // Track scroll for floating back-to-top button & card list scroll fade mask
    useEffect(() => {
        const handleScroll = () => {
            const activeContainer = selectedMeetingMeta ? pageContainerRef.current : cardsContainerRef.current;
            const scrollTop = activeContainer ? activeContainer.scrollTop : (window.scrollY || 0);
            setShowScrollTop(scrollTop > 150);

            if (cardsContainerRef.current) {
                setIsCardsScrolled(cardsContainerRef.current.scrollTop > 4);
            }
        };

        const activeContainer = selectedMeetingMeta ? pageContainerRef.current : cardsContainerRef.current;
        if (activeContainer) {
            activeContainer.addEventListener('scroll', handleScroll, { passive: true });
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        handleScroll();

        return () => {
            if (activeContainer) {
                activeContainer.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedMeetingMeta, monthData]);

    // Reset card list scroll to top when month, year, or search changes
    useEffect(() => {
        if (cardsContainerRef.current) {
            cardsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsCardsScrolled(false);
    }, [selectedMonth, selectedYear, currentSearchQuery]);

    // Smooth wheel forwarding when hovering over static dashboard areas (header/month pills)
    const handleDashboardWheel = useCallback((e) => {
        if (cardsContainerRef.current && !cardsContainerRef.current.contains(e.target)) {
            cardsContainerRef.current.scrollTop += e.deltaY;
        }
    }, []);

    // Keyboard navigation for card list (ArrowUp, ArrowDown, PageUp, PageDown, Home, End)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
            if (selectedMeetingMeta) return;
            if (!cardsContainerRef.current) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                cardsContainerRef.current.scrollBy({ top: 68, behavior: 'smooth' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                cardsContainerRef.current.scrollBy({ top: -68, behavior: 'smooth' });
            } else if (e.key === 'PageDown') {
                e.preventDefault();
                cardsContainerRef.current.scrollBy({ top: 260, behavior: 'smooth' });
            } else if (e.key === 'PageUp') {
                e.preventDefault();
                cardsContainerRef.current.scrollBy({ top: -260, behavior: 'smooth' });
            } else if (e.key === 'Home') {
                e.preventDefault();
                cardsContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (e.key === 'End') {
                e.preventDefault();
                cardsContainerRef.current.scrollTo({ top: cardsContainerRef.current.scrollHeight, behavior: 'smooth' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
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
    const availableYears = (yearsData?.years && yearsData.years.length > 0)
        ? yearsData.years
        : [{ year: selectedYear || '2026', months: [] }];
    const activeYearObject = availableYears.find(y => String(y.year) === String(selectedYear)) || availableYears[0];
    const availableMonthsForYear = activeYearObject?.months || [];
    const totalMeetingsForYear = activeYearObject?.meetingCount ?? availableMonthsForYear.reduce((acc, m) => acc + (m.meetingCount || 0), 0);

    // Selected Month Name
    const activeMonthObject = availableMonthsForYear.find(m => m.month === selectedMonth);
    const displayMonthName = activeMonthObject?.name || monthData?.monthName || 'September';

    // -------------------------------------------------------------
    // Render Component
    // -------------------------------------------------------------
    return (
        <div className="flex-1 min-h-0 flex flex-col bg-stage-bg w-full select-none animate-fade-in relative overflow-hidden">
            {selectedMeetingMeta ? (
                /* ========================================================= */
                /* OPERATIONAL DOCUMENT VIEW                                 */
                /* ========================================================= */
                <div ref={pageContainerRef} className="flex-1 min-h-0 flex flex-col overflow-y-auto pb-12 w-full scroll-fade-top relative">
                    <div className="top-blur-mask" aria-hidden="true" />
                    <div className="pt-16 sm:pt-20 md:pt-20 px-3 sm:px-5 md:px-8 pb-12 flex justify-center meeting-document-outer">
                    <div className="relative bg-white border border-border-light rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full mx-auto shadow-card meeting-document-card">
                        {/* Top Navigation & Action Row */}
                        <div className="flex items-center justify-between gap-3 pb-3 sm:pb-3.5 mb-4 sm:mb-5 border-b border-slate-100 no-print">
                            <button 
                                type="button"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 border border-border-light active:scale-95 transition-all cursor-pointer shadow-2xs"
                                onClick={() => {
                                    setSelectedMeetingMeta(null);
                                    setFullMeetingDetail(null);
                                    scrollToTop();
                                }}
                                title="Return to Daily Meeting Report"
                                aria-label="Return to Daily Meeting Report"
                            >
                                <span>← Daily Meeting Report</span>
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
                                {/* Print-Only Formal Report Header */}
                                <div className="hidden print:block pb-4 mb-5 border-b-2 border-slate-900">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-xl font-black tracking-tight text-slate-900 uppercase">
                                                REACH INTERNATIONAL
                                            </div>
                                            <div className="text-xs text-slate-600 font-semibold tracking-wide">
                                                Operations & Fleet Equipment Management
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 text-[10px] font-extrabold border border-blue-200 uppercase tracking-wider">
                                                Daily Operations Report
                                            </span>
                                            <div className="text-[10px] text-slate-500 font-mono mt-1">
                                                Ref: #{fullMeetingDetail.id || 'REPORT'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Meeting Summary Main Title & Date */}
                                <div className="pb-4 sm:pb-5 mb-5 sm:mb-6 print:pb-2 print:mb-3">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 print:text-2xl print:mb-2">
                                        {formatDateDDMMYYYY(fullMeetingDetail.date || fullMeetingDetail.dateDisplay || fullMeetingDetail.dateFormatted || fullMeetingDetail.title)}
                                    </h1>

                                    {/* Focus Section */}
                                    {fullMeetingDetail.focus && (
                                        <div className="bg-slate-50/80 border border-slate-200/90 border-l-4 border-l-theme-breakdown rounded-xl p-3 sm:p-4 shadow-2xs print:bg-slate-50 print:border-slate-300 print:shadow-none">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <span className="text-xs">🎯</span>
                                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-theme-breakdown">
                                                    Meeting Focus
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold print:text-slate-900">
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
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 print:mb-4 print:pb-2">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 print:break-after-avoid">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-600 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    01
                                                </span>
                                                <span className="truncate sm:overflow-visible">
                                                    <span className="hidden sm:inline">Machine </span>Breakdowns & Site Updates
                                                </span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-theme-breakdown border border-blue-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs print:border-blue-300">
                                                {fullMeetingDetail.breakdowns.length} Sites
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-col gap-3 sm:gap-3.5 print:gap-2.5">
                                            {fullMeetingDetail.breakdowns.map((item, idx) => (
                                                <div key={idx} className="breakdown-item bg-slate-50/70 border border-border-light border-l-4 border-l-theme-breakdown rounded-xl p-3.5 sm:p-4.5 text-xs sm:text-sm shadow-xs flex flex-col gap-2 transition-colors hover:bg-slate-50 print:bg-slate-50/90 print:border-slate-300 print:shadow-none print:break-inside-avoid print:p-3">
                                                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-1.5 border-b border-slate-200/70 print:border-slate-300">
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
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 print:mb-4 print:pb-2">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 print:break-after-avoid">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-600 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    02
                                                </span>
                                                <span className="truncate sm:overflow-visible">Parts & Procurement</span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-theme-parts border border-teal-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs print:border-teal-300">
                                                {fullMeetingDetail.parts.length} Items
                                            </span>
                                        </div>
                                        
                                        <div className="overflow-x-auto rounded-xl border border-border-light shadow-xs print:overflow-visible print:border-slate-300 print:shadow-none">
                                            <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                                                <thead className="print:table-header-group">
                                                    <tr className="bg-slate-100/90 border-b border-border-light text-slate-800 font-bold uppercase text-[10px] sm:text-xs tracking-wider print:bg-slate-100 print:border-slate-300">
                                                        <th className="px-3.5 py-2.5 sm:px-4 sm:py-3 print:py-2 print:px-3">Part / Equipment</th>
                                                        <th className="px-3.5 py-2.5 sm:px-4 sm:py-3 print:py-2 print:px-3">Site / Context</th>
                                                        <th className="px-3.5 py-2.5 sm:px-4 sm:py-3 print:py-2 print:px-3">Status & Next Steps</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {fullMeetingDetail.parts.map((p, idx) => (
                                                        <tr key={idx} className="border-b border-border-light last:border-0 hover:bg-slate-50/80 transition-colors print:border-slate-200 print:break-inside-avoid">
                                                            <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 font-bold text-slate-900 min-w-[130px] print:py-2 print:px-3">{p.part}</td>
                                                            <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-600 min-w-[110px] print:py-2 print:px-3">{p.context}</td>
                                                            <td className="px-3.5 py-2.5 sm:px-4 sm:py-3 text-slate-700 min-w-[180px] font-medium print:py-2 print:px-3">{p.statusNextSteps}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                )}

                                {/* SECTION 03: Policy & Process Directives */}
                                {fullMeetingDetail.directives && fullMeetingDetail.directives.length > 0 && (
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 print:mb-4 print:pb-2">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 print:break-after-avoid">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-500 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    03
                                                </span>
                                                <span className="truncate sm:overflow-visible">Directives</span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-theme-directive border border-amber-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs print:border-amber-300">
                                                {fullMeetingDetail.directives.length} Policies
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-3 print:space-y-2.5">
                                            {fullMeetingDetail.directives.map((directive, idx) => (
                                                <div key={idx} className="directive-item bg-amber-50/70 border border-amber-200/80 border-l-4 border-l-theme-directive rounded-xl p-3.5 sm:p-4.5 shadow-xs space-y-2 print:bg-amber-50/60 print:border-amber-300 print:shadow-none print:break-inside-avoid print:p-3">
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
                                    <section className="mb-6 sm:mb-8 pb-5 sm:pb-6 print:mb-4 print:pb-2">
                                        <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 print:break-after-avoid">
                                            <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                                                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-600 text-white text-xs font-extrabold shadow-xs flex-shrink-0">
                                                    04
                                                </span>
                                                <span className="truncate sm:overflow-visible">Action Items</span>
                                            </h2>
                                            <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-theme-action border border-emerald-200/80 flex-shrink-0 whitespace-nowrap shadow-2xs print:border-emerald-300">
                                                {fullMeetingDetail.actionItems.length} Owners
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-3 sm:space-y-3.5 print:space-y-2.5">
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
                                                        className="action-item bg-emerald-50/40 border border-emerald-200/80 border-l-4 border-l-theme-action rounded-xl p-3.5 sm:p-4 shadow-2xs hover:bg-emerald-50/70 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-4 print:bg-emerald-50/40 print:border-emerald-300 print:shadow-none print:break-inside-avoid print:p-3"
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

                                {/* Print-Only Formal Report Footer */}
                                <div className="hidden print:flex items-center justify-between pt-4 mt-6 border-t border-slate-300 text-[10px] text-slate-500 font-medium">
                                    <span>Reach International Workflow Portal • Daily Operations Report</span>
                                    <span>Confidential • Internal Distribution Only</span>
                                </div>

                                {/* Clean Divider */}
                                <hr className="border-border-light my-6 sm:my-8 no-print" />

                                {/* Document Footer Controls: Previous Day / Next Day */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 no-print">
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
            </div>
            ) : (
                /* ========================================================= */
                /* ARCHIVE DASHBOARD VIEW                                    */
                /* ========================================================= */
                <div 
                    className="flex-1 min-h-0 max-w-5xl mx-auto w-full flex flex-col px-3 sm:px-5 md:px-8 pt-3 sm:pt-4 pb-2 sm:pb-3 gap-2 sm:gap-2.5 overflow-hidden"
                    onWheel={handleDashboardWheel}
                >
                    {/* 1. Sleek, Compact Heading Bar */}
                    <div className="flex items-center justify-between gap-3 flex-shrink-0 pt-0.5">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
                                Daily Meeting Report
                            </h1>
                            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/70">
                                {totalMeetingsForYear} Total
                            </span>
                        </div>

                        {/* Year Switcher / Selector */}
                        <div className="flex items-center gap-2">
                            {availableYears.length > 0 && (
                                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-border-light shadow-2xs">
                                    {availableYears.map(y => {
                                        const isSelectedYear = String(selectedYear) === String(y.year);
                                        return (
                                            <button
                                                key={y.year}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedYear(y.year);
                                                    if (y.months && y.months.length > 0) {
                                                        setSelectedMonth(y.months[0].month);
                                                    }
                                                }}
                                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                                    isSelectedYear
                                                        ? 'bg-slate-900 text-white shadow-xs'
                                                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                                }`}
                                                aria-pressed={isSelectedYear}
                                            >
                                                {y.year}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            <span className="sm:hidden text-xs font-semibold text-slate-500">
                                {totalMeetingsForYear} Total
                            </span>
                        </div>
                    </div>

                    {/* 2. Month Filter Pills Strip (or Search Indicator) */}
                    {!isSearching ? (
                        availableMonthsForYear.length > 0 && (
                            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 flex-shrink-0">
                                {availableMonthsForYear.map(m => {
                                    const isSelected = selectedMonth === m.month;
                                    return (
                                        <button
                                            key={m.month}
                                            type="button"
                                            onClick={() => setSelectedMonth(m.month)}
                                            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer min-h-[36px] select-none ${
                                                isSelected
                                                    ? 'bg-theme-breakdown text-white shadow-sm ring-2 ring-theme-breakdown/25 active:scale-[0.98]'
                                                    : 'bg-white text-slate-600 border border-border-light hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 active:scale-[0.98]'
                                            }`}
                                            aria-pressed={isSelected}
                                        >
                                            <span>{m.name}</span>
                                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                                                isSelected 
                                                    ? 'bg-white/25 text-white' 
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {m.meetingCount}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )
                    ) : (
                        <div className="flex items-center justify-between gap-3 flex-shrink-0 bg-white px-3.5 py-2 rounded-xl border border-border-light shadow-2xs">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-xs font-bold text-slate-900 truncate">
                                    Search Results for "{currentSearchQuery}"
                                </span>
                                <span className="text-xs font-semibold text-slate-500 flex-shrink-0">
                                    ({searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'})
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateSearchQuery('')}
                                className="text-xs font-bold text-theme-breakdown hover:underline cursor-pointer flex-shrink-0"
                            >
                                Clear
                            </button>
                        </div>
                    )}

                    {/* 3. Monthly Meeting Stream / List Section */}
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                        {/* Loading Month State */}
                        {isLoadingMonth && !isSearching && (
                            <div className="py-10 bg-white rounded-2xl border border-border-light flex flex-col items-center justify-center gap-3 shadow-2xs">
                                <div className="w-7 h-7 border-3 border-theme-breakdown border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-xs font-semibold text-slate-500">Loading meeting records...</span>
                            </div>
                        )}

                        {/* List Items Stream */}
                        {(!isLoadingMonth || isSearching) && (
                            <div 
                                ref={cardsContainerRef}
                                tabIndex={0}
                                aria-label="Meeting summaries list"
                                onScroll={(e) => {
                                    const scrolled = e.currentTarget.scrollTop > 4;
                                    if (scrolled !== isCardsScrolled) {
                                        setIsCardsScrolled(scrolled);
                                    }
                                }}
                                className={`flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 pt-0.5 pr-1.5 sm:pr-2 pb-8 overscroll-contain scroll-smooth focus:outline-none focus-visible:ring-1 focus-visible:ring-theme-breakdown/30 rounded-xl transition-[mask-image] duration-200 ${
                                    isCardsScrolled ? 'scroll-fade-top' : ''
                                }`}
                                style={{
                                    WebkitOverflowScrolling: 'touch',
                                    willChange: 'scroll-position',
                                }}
                            >
                                {(isSearching ? searchResults : (monthData?.meetings || [])).map((meeting) => {
                                    const shortDate = formatDateDDMMYYYY(meeting.date || meeting.dateDisplay || meeting.dateFormatted || meeting.title);
                                    
                                    if (meeting.isHoliday) {
                                        return (
                                            <div 
                                                key={meeting.id} 
                                                className="bg-white border border-border-light border-l-4 border-l-amber-500 rounded-xl p-3 sm:px-4 sm:py-3 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-h-[52px] select-none flex-shrink-0"
                                                style={{
                                                    contentVisibility: 'auto',
                                                    containIntrinsicSize: 'auto 52px',
                                                }}
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
                                            className="bg-white border border-border-light border-l-4 border-l-theme-breakdown rounded-xl p-3 sm:px-4 sm:py-3.5 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 group min-h-[52px] flex-shrink-0"
                                            style={{
                                                contentVisibility: 'auto',
                                                containIntrinsicSize: 'auto 52px',
                                            }}
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

                                {/* Clean End of List Indicator */}
                                {(isSearching ? searchResults : (monthData?.meetings || [])).length > 0 && (
                                    <div className="pt-2 pb-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 select-none flex-shrink-0">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        <span>
                                            {isSearching 
                                                ? `End of search results (${searchResults.length} ${searchResults.length === 1 ? 'record' : 'records'})` 
                                                : `All ${monthData?.meetings?.length || 0} records loaded for ${displayMonthName} ${selectedYear || '2026'}`}
                                        </span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Empty Search State */}
                        {isSearching && searchResults.length === 0 && (
                            <div className="flex-1 flex items-center justify-center p-4">
                                <div className="text-center py-10 px-4 bg-white border border-border-light rounded-xl max-w-md mx-auto shadow-xs">
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

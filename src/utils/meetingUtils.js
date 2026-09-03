/**
 * Standard Date & Meeting Text Utilities for Reach International Workflow
 */

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_ABBR = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function getOrdinalSuffix(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

/**
 * Parses any incoming date string (DD-MM-YYYY, YYYY-MM-DD, DD/MM/YYYY, 2 September, etc.)
 * into a structured parts object.
 */
export function parseAnyDateToParts(dateStr) {
    if (!dateStr) return null;
    const clean = String(dateStr).trim();

    // 1. YYYY-MM-DD or YYYY/MM/DD or YYYY.MM.DD
    let m = clean.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (m) {
        const year = m[1];
        const monthInt = parseInt(m[2], 10);
        const dayInt = parseInt(m[3], 10);
        if (monthInt >= 1 && monthInt <= 12 && dayInt >= 1 && dayInt <= 31) {
            return buildParts(year, monthInt, dayInt);
        }
    }

    // 2. DD-MM-YYYY or DD/MM/YYYY or DD.MM.YYYY
    m = clean.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (m) {
        const dayInt = parseInt(m[1], 10);
        const monthInt = parseInt(m[2], 10);
        const year = m[3];
        if (monthInt >= 1 && monthInt <= 12 && dayInt >= 1 && dayInt <= 31) {
            return buildParts(year, monthInt, dayInt);
        }
    }

    // 3. DD Month (YYYY) (e.g. "02 Sep 2026", "2 September 2026", "2nd Sept", "2 sept")
    m = clean.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)(?:\s+(\d{4}))?$/i);
    if (m) {
        const dayInt = parseInt(m[1], 10);
        const monthWord = m[2].toLowerCase();
        const year = m[3] || '2026';
        let monthInt = MONTH_NAMES.findIndex(mn => mn.toLowerCase().startsWith(monthWord.slice(0, 3))) + 1;
        if (monthWord === 'sept') monthInt = 9;
        if (monthInt >= 1 && monthInt <= 12 && dayInt >= 1 && dayInt <= 31) {
            return buildParts(year, monthInt, dayInt);
        }
    }

    // 4. Month DD (YYYY) (e.g. "September 2 2026", "Sep 02", "Sept 2nd")
    m = clean.match(/^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s+(\d{4}))?$/i);
    if (m) {
        const monthWord = m[1].toLowerCase();
        const dayInt = parseInt(m[2], 10);
        const year = m[3] || '2026';
        let monthInt = MONTH_NAMES.findIndex(mn => mn.toLowerCase().startsWith(monthWord.slice(0, 3))) + 1;
        if (monthWord === 'sept') monthInt = 9;
        if (monthInt >= 1 && monthInt <= 12 && dayInt >= 1 && dayInt <= 31) {
            return buildParts(year, monthInt, dayInt);
        }
    }

    // 5. Native Date parser fallback
    const d = new Date(clean);
    if (!isNaN(d.getTime())) {
        return buildParts(String(d.getFullYear()), d.getMonth() + 1, d.getDate());
    }

    return null;
}

function buildParts(year, monthInt, dayInt) {
    const dayPadded = String(dayInt).padStart(2, '0');
    const monthPadded = String(monthInt).padStart(2, '0');
    const dayStr = String(dayInt);
    const monthStr = String(monthInt);
    const yearStr = String(year);

    const monthFull = MONTH_NAMES[monthInt - 1] || 'Unknown';
    const monthShort = MONTH_ABBR[monthInt - 1] || 'Unknown';
    const monthSept = monthInt === 9 ? 'Sept' : monthShort;

    const ord = getOrdinalSuffix(dayInt);
    const dayOrd = `${dayInt}${ord}`;
    const dayPaddedOrd = `${dayPadded}${ord}`;

    return {
        year: yearStr,
        monthInt,
        monthPadded,
        monthStr,
        dayInt,
        dayPadded,
        dayStr,
        monthFull,
        monthShort,
        monthSept,
        dayOrd,
        dayPaddedOrd,
        isoDate: `${yearStr}-${monthPadded}-${dayPadded}`,
        displayDate: `${dayPadded}-${monthPadded}-${yearStr}`
    };
}

/**
 * Converts any date string to 'DD-MM-YYYY' (e.g. '02-09-2026').
 */
export function formatDateDDMMYYYY(dateStr) {
    const p = parseAnyDateToParts(dateStr);
    return p ? p.displayDate : (dateStr || '');
}

/**
 * Converts any date string to 'YYYY-MM-DD' (e.g. '2026-09-02') for disk paths/storage.
 */
export function normalizeDateToYYYYMMDD(dateStr) {
    const p = parseAnyDateToParts(dateStr);
    return p ? p.isoDate : (dateStr || '');
}

/**
 * Formats a date string into 'DD-MM-YYYY' format for main titles & headers.
 */
export function formatMeetingDate(dateStr) {
    return formatDateDDMMYYYY(dateStr);
}

/**
 * Formats a date string into 'DD-MM-YYYY' or short stream format.
 */
export function formatShortMeetingDate(dateStr) {
    return formatDateDDMMYYYY(dateStr);
}

/**
 * Formats a date string into 'DD-MM-YYYY' for main headers.
 */
export function formatLongMeetingDate(dateStr) {
    return formatDateDDMMYYYY(dateStr);
}

/**
 * Generates all search variation tokens for a given meeting date.
 * (e.g. '02-09-2026', '2/09/2026', '2 September', '2 sept', 'sept 2', etc.)
 */
export function generateAllDateVariations(dateStr) {
    const p = parseAnyDateToParts(dateStr);
    if (!p) return [];

    const variations = new Set();

    // 1. Numeric with hyphens
    variations.add(`${p.dayPadded}-${p.monthPadded}-${p.year}`); // 02-09-2026
    variations.add(`${p.dayStr}-${p.monthPadded}-${p.year}`);    // 2-09-2026
    variations.add(`${p.dayPadded}-${p.monthStr}-${p.year}`);    // 02-9-2026
    variations.add(`${p.dayStr}-${p.monthStr}-${p.year}`);       // 2-9-2026
    variations.add(`${p.dayPadded}-${p.monthPadded}`);           // 02-09
    variations.add(`${p.dayStr}-${p.monthPadded}`);              // 2-09
    variations.add(`${p.dayStr}-${p.monthStr}`);                 // 2-9
    variations.add(`${p.dayPadded}-${p.monthStr}`);              // 02-9

    // 2. Numeric with slashes
    variations.add(`${p.dayPadded}/${p.monthPadded}/${p.year}`); // 02/09/2026
    variations.add(`${p.dayStr}/${p.monthPadded}/${p.year}`);    // 2/09/2026
    variations.add(`${p.dayPadded}/${p.monthStr}/${p.year}`);    // 02/9/2026
    variations.add(`${p.dayStr}/${p.monthStr}/${p.year}`);       // 2/9/2026
    variations.add(`${p.dayPadded}/${p.monthPadded}`);           // 02/09
    variations.add(`${p.dayStr}/${p.monthPadded}`);              // 2/09
    variations.add(`${p.dayStr}/${p.monthStr}`);                 // 2/9
    variations.add(`${p.dayPadded}/${p.monthStr}`);              // 02/9

    // 3. Numeric with dots
    variations.add(`${p.dayPadded}.${p.monthPadded}.${p.year}`); // 02.09.2026
    variations.add(`${p.dayStr}.${p.monthPadded}.${p.year}`);    // 2.09.2026
    variations.add(`${p.dayStr}.${p.monthStr}.${p.year}`);       // 2.9.2026
    variations.add(`${p.dayPadded}.${p.monthPadded}`);           // 02.09
    variations.add(`${p.dayStr}.${p.monthStr}`);                 // 2.9

    // 4. ISO variations
    variations.add(`${p.year}-${p.monthPadded}-${p.dayPadded}`); // 2026-09-02
    variations.add(`${p.year}/${p.monthPadded}/${p.dayPadded}`); // 2026/09/02
    variations.add(`${p.year}-${p.monthStr}-${p.dayStr}`);       // 2026-9-2

    // 5. Month word variations
    const monthWords = [p.monthFull, p.monthShort];
    if (p.monthSept !== p.monthShort) monthWords.push(p.monthSept);

    const dayForms = [p.dayStr, p.dayPadded, p.dayOrd, p.dayPaddedOrd];

    monthWords.forEach(mw => {
        dayForms.forEach(df => {
            variations.add(`${df} ${mw}`);               // 2 September, 2nd Sept, 02 Sep
            variations.add(`${df} ${mw} ${p.year}`);     // 2 September 2026, 2nd Sept 2026
            variations.add(`${mw} ${df}`);               // September 2, Sept 2nd, Sep 02
            variations.add(`${mw} ${df} ${p.year}`);     // September 2 2026
            variations.add(`${mw} ${df}, ${p.year}`);    // September 2, 2026
        });
        variations.add(`${mw} ${p.year}`);               // September 2026
        variations.add(mw);                              // September, Sep, Sept
    });

    // 6. Compact numeric
    variations.add(`${p.dayPadded}${p.monthPadded}${p.year}`);   // 02092026
    variations.add(`${p.year}${p.monthPadded}${p.dayPadded}`);   // 20260902

    return Array.from(variations);
}

/**
 * Formats a meeting data object into a clean, human-readable structured text document.
 * Suitable for pasting into WhatsApp, Slack, emails, or notes.
 */
export function formatMeetingSummary(meeting) {
    if (!meeting) return '';

    const displayDate = formatDateDDMMYYYY(meeting.date || meeting.dateFormatted || meeting.title);

    let text = `==================================================\n`;
    text += `OPERATIONAL MEETING SUMMARY\n`;
    text += `==================================================\n`;
    text += `Date: ${displayDate}\n`;
    text += `Focus: ${meeting.focus || 'Operational Updates'}\n\n`;

    if (meeting.isHoliday) {
        text += `--------------------------------------------------\n`;
        text += `OFFICIAL HOLIDAY: ${(meeting.holidayName || 'COMPANY HOLIDAY').toUpperCase()}\n`;
        text += `--------------------------------------------------\n`;
        text += `• Office and general fleet operations remained closed on account of ${meeting.holidayName || 'Company Holiday'}.\n`;
        text += `• No daily operations breakdown or coordination meeting was conducted.\n\n`;
    }

    if (meeting.breakdowns && meeting.breakdowns.length > 0) {
        text += `--------------------------------------------------\n`;
        text += `1. MACHINE BREAKDOWNS & SITE UPDATES\n`;
        text += `--------------------------------------------------\n`;
        meeting.breakdowns.forEach((m, idx) => {
            text += `• ${m.site}:\n`;
            if (m.issue) text += `  - Issue: ${m.issue}\n`;
            if (m.action) text += `  - Action: ${m.action}\n`;
            if (m.logistics) text += `  - Logistics: ${m.logistics}\n`;
            if (m.clarification) text += `  - Clarification: ${m.clarification}\n`;
            if (m.status) text += `  - Status: ${m.status}\n`;
            if (m.pendingIssue) text += `  - Pending Issue: ${m.pendingIssue}\n`;
            if (idx < meeting.breakdowns.length - 1) text += `\n`;
        });
        text += `\n`;
    }

    if (meeting.parts && meeting.parts.length > 0) {
        text += `--------------------------------------------------\n`;
        text += `2. PARTS, PROCUREMENT & INVENTORY\n`;
        text += `--------------------------------------------------\n`;
        meeting.parts.forEach((p, idx) => {
            text += `• ${p.part}${p.context ? ` [${p.context}]` : ''}\n`;
            text += `  - Status & Next Steps: ${p.statusNextSteps}\n`;
            if (idx < meeting.parts.length - 1) text += `\n`;
        });
        text += `\n`;
    }

    if (meeting.directives && meeting.directives.length > 0) {
        text += `--------------------------------------------------\n`;
        text += `3. POLICY & PROCESS DIRECTIVES\n`;
        text += `--------------------------------------------------\n`;
        meeting.directives.forEach((pd, idx) => {
            text += `• ${pd.title}:\n`;
            if (pd.points && pd.points.length > 0) {
                pd.points.forEach(pt => {
                    text += `  - ${pt}\n`;
                });
            }
            if (idx < meeting.directives.length - 1) text += `\n`;
        });
        text += `\n`;
    }

    if (meeting.actionItems && meeting.actionItems.length > 0) {
        text += `--------------------------------------------------\n`;
        text += `4. KEY ACTION ITEMS & OWNERSHIP\n`;
        text += `--------------------------------------------------\n`;
        meeting.actionItems.forEach(a => {
            text += `• ${a.person}: ${a.task}\n`;
        });
        text += `\n`;
    }

    text += `==================================================\n`;
    text += `Reach International Workflow Management System\n`;
    text += `==================================================`;

    return text;
}

/**
 * Copies text to the clipboard using navigator.clipboard with fallback to document.execCommand.
 * Returns a promise resolving to true if copy succeeded, false otherwise.
 */
export async function copyTextToClipboard(text) {
    if (!text) return false;

    // 1. Modern Clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.warn('navigator.clipboard.writeText failed, using textarea fallback: ', err);
        }
    }

    // 2. Fallback: create temporary off-screen textarea
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.setAttribute('readonly', '');
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, text.length);

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
    } catch (fallbackErr) {
        console.error('Fallback execCommand copy failed: ', fallbackErr);
        return false;
    }
}

/**
 * High-performance smart search across meetings supporting:
 * - Direct Date formats: '02-09-2026', '2-9-2026', '02/09/2026', '2/09/2026', '2.09.2026'
 * - Word Date formats: '2 September', '2 sept', '2 sep', 'September 2', '2nd September 2026'
 * - Partial Date formats: '02-09', '2/09', 'September 2026', 'August'
 * - Keywords: Site names, technician/engineer names, parts, issues, actions, focus topics
 *
 * @param {string} query Search term
 * @param {Array} searchIndex Array of search index items
 */
export function searchMeetings(query, searchIndex) {
    if (!query || !query.trim() || !Array.isArray(searchIndex)) {
        return [];
    }

    const rawQuery = query.trim();
    const cleanQuery = rawQuery.toLowerCase();

    // 1. Try parsing query as structured date
    const parsedQueryDate = parseAnyDateToParts(rawQuery);

    // 2. Tokenize search query (words / numbers)
    const normalizedQueryString = cleanQuery
        .replace(/[/.]/g, ' ')
        .replace(/(\d+)(?:st|nd|rd|th)/g, '$1')
        .trim();

    const queryTokens = normalizedQueryString.split(/\s+/).filter(Boolean);

    const scoredResults = [];

    for (const item of searchIndex) {
        let score = 0;
        
        // Retrieve or generate date variations
        const itemVariations = Array.isArray(item.dateVariations) && item.dateVariations.length > 0
            ? item.dateVariations
            : generateAllDateVariations(item.date);

        const itemVariationsLower = itemVariations.map(v => v.toLowerCase());

        // A. Direct exact/substring date variation match
        if (itemVariationsLower.some(v => v === cleanQuery || v.includes(cleanQuery) || cleanQuery.includes(v))) {
            score += 150;
        }

        // B. If query parsed as a structured date, compare day/month/year
        if (parsedQueryDate) {
            const itemDateParts = parseAnyDateToParts(item.date);
            if (itemDateParts) {
                const dayMatch = itemDateParts.dayInt === parsedQueryDate.dayInt;
                const monthMatch = itemDateParts.monthInt === parsedQueryDate.monthInt;
                const yearMatch = itemDateParts.year === parsedQueryDate.year;

                if (dayMatch && monthMatch && yearMatch) {
                    score += 200; // Perfect full date match
                } else if (dayMatch && monthMatch) {
                    score += 120; // Day + Month match
                } else if (monthMatch && yearMatch && !rawQuery.match(/\d{1,2}[-/.]/)) {
                    score += 50;  // Month + Year match (e.g. "September 2026")
                }
            }
        }

        // C. Full text search target
        const searchTarget = [
            item.dateDisplay,
            item.date,
            item.dateFormatted,
            item.title,
            item.focus,
            item.holidayName,
            item.keywords,
            ...(Array.isArray(item.sites) ? item.sites : []),
            ...(Array.isArray(item.people) ? item.people : []),
            ...(Array.isArray(item.parts) ? item.parts : []),
            ...itemVariationsLower
        ].filter(Boolean).join(' ').toLowerCase();

        // Check if all query tokens match in the target text
        const allTokensMatch = queryTokens.every(token => {
            if (token === 'sept' || token === 'sep') {
                return searchTarget.includes('sep') || searchTarget.includes('september') || searchTarget.includes('09');
            }
            if (token === 'aug') {
                return searchTarget.includes('aug') || searchTarget.includes('august') || searchTarget.includes('08');
            }
            return searchTarget.includes(token);
        });

        if (allTokensMatch) {
            score += 40;
            if (item.title && item.title.toLowerCase().includes(cleanQuery)) score += 30;
            if (item.focus && item.focus.toLowerCase().includes(cleanQuery)) score += 20;
            if (Array.isArray(item.people) && item.people.some(p => p.toLowerCase().includes(cleanQuery))) score += 25;
            if (Array.isArray(item.sites) && item.sites.some(s => s.toLowerCase().includes(cleanQuery))) score += 25;
            if (Array.isArray(item.parts) && item.parts.some(pt => pt.toLowerCase().includes(cleanQuery))) score += 20;
        }

        if (score > 0) {
            scoredResults.push({ item, score });
        }
    }

    // Sort by relevance score descending, then by date descending
    scoredResults.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return new Date(b.item.date).getTime() - new Date(a.item.date).getTime();
    });

    return scoredResults.map(r => r.item);
}

/**
 * Calculate previous and next non-holiday meetings in chronological sequence.
 * @param {string} currentDate e.g. "2026-09-02" or "02-09-2026"
 * @param {Array} chronologicalSequence Array of { id, date, isHoliday, ... } from years.json
 */
export function getChronologicalNavigation(currentDate, chronologicalSequence = []) {
    if (!currentDate || !Array.isArray(chronologicalSequence) || chronologicalSequence.length === 0) {
        return { prevMeeting: null, nextMeeting: null };
    }

    const isoDate = normalizeDateToYYYYMMDD(currentDate);
    const nonHolidayList = chronologicalSequence.filter(m => !m.isHoliday);
    
    const currentIndex = nonHolidayList.findIndex(m => 
        m.date === isoDate || 
        m.id === `meet-${isoDate}` || 
        m.date === currentDate ||
        m.dateDisplay === currentDate
    );

    const prevMeeting = currentIndex > 0 ? nonHolidayList[currentIndex - 1] : null;
    const nextMeeting = currentIndex >= 0 && currentIndex < nonHolidayList.length - 1 ? nonHolidayList[currentIndex + 1] : null;

    return { prevMeeting, nextMeeting };
}


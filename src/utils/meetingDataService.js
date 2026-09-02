/**
 * Static Data Service for Daily Meeting Summaries
 * 
 * Provides in-memory cached fetching of:
 * 1. Global Years & Months Index (/data/meetings/years.json)
 * 2. Monthly Meeting Index (/data/meetings/YYYY/MM/index.json)
 * 3. Individual Daily Meeting Document (/data/meetings/YYYY/MM/DD.json)
 * 4. Lightweight Search Index (/data/meetings/search-index.json)
 */

import { 
    parseAnyDateToParts, 
    formatDateDDMMYYYY, 
    normalizeDateToYYYYMMDD, 
    generateAllDateVariations 
} from './meetingUtils.js';

const cache = new Map();

async function fetchJsonWithCache(url) {
    if (cache.has(url)) {
        return cache.get(url);
    }
    try {
        const res = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch ${url} (HTTP ${res.status})`);
        }
        const data = await res.json();
        cache.set(url, data);
        return data;
    } catch (err) {
        console.error(`[meetingDataService] Error fetching ${url}:`, err);
        throw err;
    }
}

/**
 * Fetch the global years index containing year tree, month counts, and chronological sequence.
 */
export async function fetchYearsIndex() {
    return fetchJsonWithCache('/data/meetings/years.json');
}

/**
 * Fetch a specific month's meeting index.
 * @param {string|number} year e.g. "2026"
 * @param {string|number} month e.g. "09" or "9"
 */
export async function fetchMonthIndex(year, month) {
    const paddedMonth = String(month).padStart(2, '0');
    return fetchJsonWithCache(`/data/meetings/${year}/${paddedMonth}/index.json`);
}

/**
 * Fetch an individual daily meeting document on-demand.
 * Accepts: "/data/meetings/2026/09/02.json", "2026-09-02", "02-09-2026", "2/09/2026", etc.
 * @param {string} pathOrDate
 */
export async function fetchMeetingDetail(pathOrDate) {
    if (!pathOrDate) throw new Error("Path or date required");

    let url = pathOrDate;
    if (!url.startsWith('/')) {
        const iso = normalizeDateToYYYYMMDD(url);
        const parts = iso.split('-');
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1].padStart(2, '0');
            const day = parts[2].padStart(2, '0');
            url = `/data/meetings/${year}/${month}/${day}.json`;
        }
    }
    return fetchJsonWithCache(url);
}

/**
 * Fetch the global lightweight pre-indexed search tokens.
 */
export async function fetchSearchIndex() {
    return fetchJsonWithCache('/data/meetings/search-index.json');
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

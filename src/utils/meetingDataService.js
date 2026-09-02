/**
 * Static Data Service for Daily Meeting Summaries
 * 
 * Provides in-memory cached fetching of:
 * 1. Global Years & Months Index (/data/meetings/years.json)
 * 2. Monthly Meeting Index (/data/meetings/YYYY/MM/index.json)
 * 3. Individual Daily Meeting Document (/data/meetings/YYYY/MM/DD.json)
 * 4. Lightweight Search Index (/data/meetings/search-index.json)
 */

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
 * @param {string} pathOrDate Path like "/data/meetings/2026/09/02.json" or date like "2026-09-02"
 */
export async function fetchMeetingDetail(pathOrDate) {
    let url = pathOrDate;
    if (!url.startsWith('/')) {
        const parts = url.split('-');
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
 * Perform high-speed client-side search across pre-indexed tokens without downloading full meetings.
 * @param {string} query Search term
 * @param {Array} searchIndex Array of search index items
 */
export function searchMeetings(query, searchIndex) {
    if (!query || !query.trim() || !Array.isArray(searchIndex)) {
        return [];
    }

    const cleanQuery = query.toLowerCase().trim();
    const tokens = cleanQuery.split(/\s+/).filter(Boolean);

    return searchIndex.filter(item => {
        // Quick string check
        const targetString = `${item.date} ${item.dateFormatted} ${item.title} ${item.focus} ${item.holidayName || ''} ${item.keywords || ''}`.toLowerCase();
        
        // Every token must match somewhere in the indexed entry
        return tokens.every(token => targetString.includes(token));
    });
}

/**
 * Calculate previous and next non-holiday meetings in chronological sequence.
 * @param {string} currentDate e.g. "2026-09-02"
 * @param {Array} chronologicalSequence Array of { id, date, isHoliday, ... } from years.json
 */
export function getChronologicalNavigation(currentDate, chronologicalSequence = []) {
    if (!currentDate || !Array.isArray(chronologicalSequence) || chronologicalSequence.length === 0) {
        return { prevMeeting: null, nextMeeting: null };
    }

    const nonHolidayList = chronologicalSequence.filter(m => !m.isHoliday);
    const currentIndex = nonHolidayList.findIndex(m => m.date === currentDate || m.id === `meet-${currentDate}`);

    const prevMeeting = currentIndex > 0 ? nonHolidayList[currentIndex - 1] : null;
    const nextMeeting = currentIndex >= 0 && currentIndex < nonHolidayList.length - 1 ? nonHolidayList[currentIndex + 1] : null;

    return { prevMeeting, nextMeeting };
}

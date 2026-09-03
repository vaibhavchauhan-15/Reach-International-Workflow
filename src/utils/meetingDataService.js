/**
 * Centralized Static Data Service for Daily Meeting Summaries
 * 
 * Sources all data directly from centralized src/data/meetings:
 * 1. Global Years & Months Index (src/data/meetings/years.json)
 * 2. Monthly Meeting Index (src/data/meetings/YYYY/MM/index.json)
 * 3. Individual Daily Meeting Document (src/data/meetings/YYYY/MM/DD.json)
 * 4. Lightweight Search Index (src/data/meetings/search-index.json)
 */

import { 
    parseAnyDateToParts, 
    formatDateDDMMYYYY, 
    normalizeDateToYYYYMMDD, 
    generateAllDateVariations 
} from './meetingUtils.js';

export { searchMeetings, getChronologicalNavigation } from './meetingUtils.js';

import yearsData from '../data/meetings/years.json';
import searchIndexData from '../data/meetings/search-index.json';

// Eagerly loaded monthly indexes and daily meeting documents (bundled directly into memory)
const monthIndexModules = import.meta.glob('../data/meetings/*/*/index.json', { eager: true, import: 'default' });
const dailyMeetingModules = import.meta.glob('../data/meetings/*/*/[0-9]*.json', { eager: true, import: 'default' });

/**
 * Fetch the global years index containing year tree, month counts, and chronological sequence.
 */
export async function fetchYearsIndex() {
    return yearsData.default || yearsData;
}

/**
 * Fetch a specific month's meeting index.
 * @param {string|number} year e.g. "2026"
 * @param {string|number} month e.g. "09" or "9"
 */
export async function fetchMonthIndex(year, month) {
    const paddedMonth = String(month).padStart(2, '0');
    const target = `${year}/${paddedMonth}/index.json`;
    const match = Object.entries(monthIndexModules).find(([k]) => k.replace(/\\/g, '/').includes(target));
    if (match && match[1]) {
        return match[1].default || match[1];
    }
    throw new Error(`Month index not found for ${year}/${paddedMonth}`);
}

/**
 * Fetch an individual daily meeting document on-demand.
 * Accepts: "/data/meetings/2026/09/02.json", "2026-09-02", "02-09-2026", "2/09/2026", etc.
 * @param {string} pathOrDate
 */
export async function fetchMeetingDetail(pathOrDate) {
    if (!pathOrDate) throw new Error("Path or date required");

    let year = '';
    let month = '';
    let day = '';

    const pathMatch = String(pathOrDate).match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
    if (pathMatch) {
        year = pathMatch[1];
        month = pathMatch[2].padStart(2, '0');
        day = pathMatch[3].padStart(2, '0');
    } else {
        const iso = normalizeDateToYYYYMMDD(pathOrDate);
        if (iso && iso.includes('-')) {
            const parts = iso.split('-');
            year = parts[0];
            month = parts[1].padStart(2, '0');
            day = parts[2].padStart(2, '0');
        }
    }

    if (!year || !month || !day) {
        throw new Error(`Invalid meeting identifier: ${pathOrDate}`);
    }

    const target = `${year}/${month}/${day}.json`;
    const match = Object.entries(dailyMeetingModules).find(([k]) => k.replace(/\\/g, '/').includes(target));
    if (match && match[1]) {
        return match[1].default || match[1];
    }

    throw new Error(`Meeting document not found for ${pathOrDate} (${target})`);
}

/**
 * Fetch the global lightweight pre-indexed search tokens.
 */
export async function fetchSearchIndex() {
    return searchIndexData.default || searchIndexData;
}


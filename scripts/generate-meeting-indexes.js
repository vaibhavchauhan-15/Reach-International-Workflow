import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

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

function parseAnyDateToParts(dateStr) {
    if (!dateStr) return null;
    const clean = String(dateStr).trim();

    // 1. YYYY-MM-DD
    let m = clean.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (m) {
        const year = m[1];
        const monthInt = parseInt(m[2], 10);
        const dayInt = parseInt(m[3], 10);
        if (monthInt >= 1 && monthInt <= 12 && dayInt >= 1 && dayInt <= 31) {
            return buildParts(year, monthInt, dayInt);
        }
    }

    // 2. DD-MM-YYYY
    m = clean.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (m) {
        const dayInt = parseInt(m[1], 10);
        const monthInt = parseInt(m[2], 10);
        const year = m[3];
        if (monthInt >= 1 && monthInt <= 12 && dayInt >= 1 && dayInt <= 31) {
            return buildParts(year, monthInt, dayInt);
        }
    }

    // 3. DD Month (YYYY)
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

    // 4. Native Date parse
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

function formatDateDDMMYYYY(dateStr) {
    const p = parseAnyDateToParts(dateStr);
    return p ? p.displayDate : (dateStr || '');
}

function generateAllDateVariations(dateStr) {
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

function extractKeywords(meeting) {
    const tokens = new Set();
    const addWords = (text) => {
        if (!text) return;
        const words = String(text)
            .toLowerCase()
            .replace(/[^\w\s-]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length >= 2);
        words.forEach(w => tokens.add(w));
    };

    addWords(meeting.title);
    addWords(meeting.date);
    addWords(meeting.dateDisplay);
    addWords(meeting.dateFormatted);
    addWords(meeting.focus);
    addWords(meeting.holidayName);

    // Add all date variations
    const variations = generateAllDateVariations(meeting.date);
    variations.forEach(v => {
        tokens.add(v.toLowerCase());
        addWords(v);
    });

    if (meeting.breakdowns && Array.isArray(meeting.breakdowns)) {
        meeting.breakdowns.forEach(b => {
            addWords(b.site);
            addWords(b.issue);
            addWords(b.action);
            addWords(b.logistics);
            addWords(b.clarification);
            addWords(b.status);
            addWords(b.pendingIssue);
        });
    }

    if (meeting.parts && Array.isArray(meeting.parts)) {
        meeting.parts.forEach(p => {
            addWords(p.part);
            addWords(p.context);
            addWords(p.statusNextSteps);
        });
    }

    if (meeting.directives && Array.isArray(meeting.directives)) {
        meeting.directives.forEach(d => {
            addWords(d.title);
            if (Array.isArray(d.points)) {
                d.points.forEach(pt => addWords(pt));
            }
        });
    }

    if (meeting.actionItems && Array.isArray(meeting.actionItems)) {
        meeting.actionItems.forEach(a => {
            addWords(a.person);
            addWords(a.task);
        });
    }

    return Array.from(tokens).join(' ');
}

function getAllJsonFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getAllJsonFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
            results.push(fullPath);
        }
    }
    return results;
}

async function loadMeetingsSource() {
    const meetingsSrcDir = path.resolve(rootDir, 'src/data/meetings');
    if (fs.existsSync(meetingsSrcDir)) {
        const jsonFiles = getAllJsonFiles(meetingsSrcDir);
        const loadedMeetings = [];
        
        for (const filePath of jsonFiles) {
            try {
                const content = fs.readFileSync(filePath, 'utf-8');
                const parsed = JSON.parse(content);
                if (parsed && typeof parsed === 'object' && (parsed.date || parsed.id)) {
                    loadedMeetings.push(parsed);
                }
            } catch (err) {
                console.error(`[generate-meeting-indexes] Failed to parse JSON file at ${filePath}:`, err.message);
            }
        }
        
        if (loadedMeetings.length > 0) {
            return loadedMeetings;
        }
    }

    const meetingsDataPath = path.resolve(rootDir, 'src/data/meetingsData.js');
    if (fs.existsSync(meetingsDataPath)) {
        const fileUrl = new URL(`file://${meetingsDataPath.replace(/\\/g, '/')}`).href;
        const module = await import(fileUrl);
        if (module.meetingsData && Array.isArray(module.meetingsData)) {
            return module.meetingsData;
        }
    }
    return [];
}

async function generate() {
    console.log('📦 Starting Meeting Archive & Index Generation...');

    const meetings = await loadMeetingsSource();
    console.log(`Found ${meetings.length} source meeting records.`);

    const outputBaseDir = path.resolve(rootDir, 'public/data/meetings');
    if (!fs.existsSync(outputBaseDir)) {
        fs.mkdirSync(outputBaseDir, { recursive: true });
    }

    const sortedChronological = [...meetings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const sortedNewestFirst = [...meetings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const yearMonthMap = new Map();
    const searchIndexList = [];
    const chronologicalSequence = [];

    for (const meeting of sortedNewestFirst) {
        const parts = meeting.date.split('-');
        if (parts.length < 3) {
            console.warn(`Skipping invalid date: ${meeting.date}`);
            continue;
        }

        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        const monthIdx = parseInt(month, 10) - 1;
        const monthName = MONTH_NAMES[monthIdx] || 'Unknown';
        const displayDate = formatDateDDMMYYYY(meeting.date);

        const meetingFilePath = `/data/meetings/${year}/${month}/${day}.json`;
        const meetingDiskDir = path.join(outputBaseDir, year, month);
        const meetingDiskFile = path.join(meetingDiskDir, `${day}.json`);

        if (!fs.existsSync(meetingDiskDir)) {
            fs.mkdirSync(meetingDiskDir, { recursive: true });
        }

        const variations = generateAllDateVariations(meeting.date);

        const completeMeetingObject = {
            id: meeting.id || `meet-${meeting.date}`,
            title: displayDate,
            date: meeting.date,
            dateDisplay: displayDate,
            dateFormatted: displayDate,
            focus: meeting.focus || '',
            isHoliday: !!meeting.isHoliday,
            holidayName: meeting.holidayName || '',
            breakdowns: meeting.breakdowns || [],
            parts: meeting.parts || [],
            directives: meeting.directives || [],
            actionItems: meeting.actionItems || []
        };

        fs.writeFileSync(meetingDiskFile, JSON.stringify(completeMeetingObject, null, 2), 'utf-8');

        const monthSummaryItem = {
            id: completeMeetingObject.id,
            date: completeMeetingObject.date,
            dateDisplay: displayDate,
            dateFormatted: displayDate,
            title: displayDate,
            focus: completeMeetingObject.focus,
            isHoliday: completeMeetingObject.isHoliday,
            holidayName: completeMeetingObject.holidayName,
            breakdownCount: completeMeetingObject.breakdowns.length,
            partsCount: completeMeetingObject.parts.length,
            directivesCount: completeMeetingObject.directives.length,
            actionItemsCount: completeMeetingObject.actionItems.length,
            path: meetingFilePath
        };

        if (!yearMonthMap.has(year)) {
            yearMonthMap.set(year, new Map());
        }
        const monthMap = yearMonthMap.get(year);
        if (!monthMap.has(month)) {
            monthMap.set(month, {
                year,
                month,
                monthName,
                meetings: []
            });
        }
        monthMap.get(month).meetings.push(monthSummaryItem);

        const sites = completeMeetingObject.breakdowns.map(b => b.site).filter(Boolean);
        const people = Array.from(new Set(completeMeetingObject.actionItems.map(a => a.person).filter(Boolean)));
        const partNames = completeMeetingObject.parts.map(p => p.part).filter(Boolean);
        const keywords = extractKeywords(completeMeetingObject);

        searchIndexList.push({
            id: completeMeetingObject.id,
            date: completeMeetingObject.date,
            dateDisplay: displayDate,
            dateFormatted: displayDate,
            title: displayDate,
            focus: completeMeetingObject.focus,
            isHoliday: completeMeetingObject.isHoliday,
            holidayName: completeMeetingObject.holidayName,
            breakdownCount: completeMeetingObject.breakdowns.length,
            partsCount: completeMeetingObject.parts.length,
            directivesCount: completeMeetingObject.directives.length,
            actionItemsCount: completeMeetingObject.actionItems.length,
            path: meetingFilePath,
            dateVariations: variations,
            sites: sites.slice(0, 8),
            people: people.slice(0, 10),
            parts: partNames.slice(0, 8),
            keywords
        });
    }

    for (const meeting of sortedChronological) {
        const parts = meeting.date.split('-');
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        const displayDate = formatDateDDMMYYYY(meeting.date);

        chronologicalSequence.push({
            id: meeting.id || `meet-${meeting.date}`,
            date: meeting.date,
            dateDisplay: displayDate,
            dateFormatted: displayDate,
            title: displayDate,
            isHoliday: !!meeting.isHoliday,
            holidayName: meeting.holidayName || '',
            path: `/data/meetings/${year}/${month}/${day}.json`
        });
    }

    const yearsIndexStructure = [];
    const sortedYears = Array.from(yearMonthMap.keys()).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

    for (const year of sortedYears) {
        const monthMap = yearMonthMap.get(year);
        const sortedMonths = Array.from(monthMap.keys()).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
        
        const yearEntry = {
            year,
            meetingCount: 0,
            months: []
        };

        for (const month of sortedMonths) {
            const monthData = monthMap.get(month);
            const monthDiskDir = path.join(outputBaseDir, year, month);
            const monthIndexDiskFile = path.join(monthDiskDir, 'index.json');

            const monthIndexContent = {
                year,
                month,
                monthName: monthData.monthName,
                meetingCount: monthData.meetings.length,
                meetings: monthData.meetings
            };

            fs.writeFileSync(monthIndexDiskFile, JSON.stringify(monthIndexContent, null, 2), 'utf-8');

            yearEntry.meetingCount += monthData.meetings.length;
            yearEntry.months.push({
                month,
                name: monthData.monthName,
                meetingCount: monthData.meetings.length,
                latestMeetingDate: monthData.meetings[0]?.date || '',
                indexPath: `/data/meetings/${year}/${month}/index.json`
            });
        }

        yearsIndexStructure.push(yearEntry);
    }

    const yearsIndexFile = path.join(outputBaseDir, 'years.json');
    const yearsIndexPayload = {
        years: yearsIndexStructure,
        totalMeetings: meetings.length,
        latestYear: yearsIndexStructure[0]?.year || '2026',
        latestMonth: yearsIndexStructure[0]?.months[0]?.month || '09',
        latestMeetingId: sortedNewestFirst[0]?.id || '',
        chronologicalSequence
    };
    fs.writeFileSync(yearsIndexFile, JSON.stringify(yearsIndexPayload, null, 2), 'utf-8');

    const searchIndexFile = path.join(outputBaseDir, 'search-index.json');
    fs.writeFileSync(searchIndexFile, JSON.stringify(searchIndexList, null, 2), 'utf-8');

    console.log(`✅ Successfully generated:`);
    console.log(`   - ${meetings.length} individual daily meeting JSON files with DD-MM-YYYY display`);
    console.log(`   - Monthly index.json files for ${yearsIndexStructure.reduce((acc, y) => acc + y.months.length, 0)} month(s)`);
    console.log(`   - Global years.json (${(fs.statSync(yearsIndexFile).size / 1024).toFixed(2)} KB)`);
    console.log(`   - Global search-index.json (${(fs.statSync(searchIndexFile).size / 1024).toFixed(2)} KB)`);
}

generate().catch(err => {
    console.error('❌ Error generating meeting indexes:', err);
    process.exit(1);
});

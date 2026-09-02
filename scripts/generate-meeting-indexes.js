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

function formatMeetingDate(dateStr) {
    if (!dateStr) return '';
    if (/^\d{1,2}\s+[A-Za-z]{3}\s+\d{4}$/.test(dateStr.trim())) {
        return dateStr.trim();
    }
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3 && parts[0].length === 4) {
            const year = parts[0];
            const monthIdx = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            if (monthIdx >= 0 && monthIdx < 12) {
                const dayPadded = day < 10 ? `0${day}` : `${day}`;
                return `${dayPadded} ${MONTH_ABBR[monthIdx]} ${year}`;
            }
        }
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        const day = d.getDate();
        const dayPadded = day < 10 ? `0${day}` : `${day}`;
        return `${dayPadded} ${MONTH_ABBR[d.getMonth()]} ${d.getFullYear()}`;
    }
    return dateStr;
}

function extractKeywords(meeting) {
    const tokens = new Set();
    const addWords = (text) => {
        if (!text) return;
        // Clean and tokenize
        const words = String(text)
            .toLowerCase()
            .replace(/[^\w\s-]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length >= 2);
        words.forEach(w => tokens.add(w));
    };

    addWords(meeting.title);
    addWords(meeting.date);
    addWords(meeting.dateFormatted);
    addWords(meeting.focus);
    addWords(meeting.holidayName);

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
    // 1. Primary Source: Modular per-day JSON files in src/data/meetings/YYYY/MM/DD.json
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

    // 2. Fallback if meetingsData.js still exists during transition
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

    // Sort meetings chronologically (oldest to newest for sequence, newest to oldest for display)
    const sortedChronological = [...meetings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const sortedNewestFirst = [...meetings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Map of Year -> Month -> Array of Meetings
    const yearMonthMap = new Map();
    const searchIndexList = [];
    const chronologicalSequence = [];

    // Process all meetings
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
        const formattedDate = meeting.dateFormatted || formatMeetingDate(meeting.date);

        const meetingFilePath = `/data/meetings/${year}/${month}/${day}.json`;
        const meetingDiskDir = path.join(outputBaseDir, year, month);
        const meetingDiskFile = path.join(meetingDiskDir, `${day}.json`);

        if (!fs.existsSync(meetingDiskDir)) {
            fs.mkdirSync(meetingDiskDir, { recursive: true });
        }

        const completeMeetingObject = {
            id: meeting.id || `meet-${meeting.date}`,
            title: meeting.title || formattedDate,
            date: meeting.date,
            dateFormatted: formattedDate,
            focus: meeting.focus || '',
            isHoliday: !!meeting.isHoliday,
            holidayName: meeting.holidayName || '',
            breakdowns: meeting.breakdowns || [],
            parts: meeting.parts || [],
            directives: meeting.directives || [],
            actionItems: meeting.actionItems || []
        };

        // Write individual meeting JSON
        fs.writeFileSync(meetingDiskFile, JSON.stringify(completeMeetingObject, null, 2), 'utf-8');

        // Extract metadata for Month index
        const monthSummaryItem = {
            id: completeMeetingObject.id,
            date: completeMeetingObject.date,
            dateFormatted: completeMeetingObject.dateFormatted,
            title: completeMeetingObject.title,
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

        // Extract metadata for Search Index
        const sites = completeMeetingObject.breakdowns.map(b => b.site).filter(Boolean);
        const people = Array.from(new Set(completeMeetingObject.actionItems.map(a => a.person).filter(Boolean)));
        const partNames = completeMeetingObject.parts.map(p => p.part).filter(Boolean);
        const keywords = extractKeywords(completeMeetingObject);

        searchIndexList.push({
            id: completeMeetingObject.id,
            date: completeMeetingObject.date,
            dateFormatted: completeMeetingObject.dateFormatted,
            title: completeMeetingObject.title,
            focus: completeMeetingObject.focus,
            isHoliday: completeMeetingObject.isHoliday,
            holidayName: completeMeetingObject.holidayName,
            breakdownCount: completeMeetingObject.breakdowns.length,
            partsCount: completeMeetingObject.parts.length,
            directivesCount: completeMeetingObject.directives.length,
            actionItemsCount: completeMeetingObject.actionItems.length,
            path: meetingFilePath,
            sites: sites.slice(0, 8),
            people: people.slice(0, 10),
            parts: partNames.slice(0, 8),
            keywords
        });
    }

    // Build chronological sequence for prev/next day navigation
    for (const meeting of sortedChronological) {
        const parts = meeting.date.split('-');
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        chronologicalSequence.push({
            id: meeting.id || `meet-${meeting.date}`,
            date: meeting.date,
            dateFormatted: meeting.dateFormatted || formatMeetingDate(meeting.date),
            title: meeting.title || formatMeetingDate(meeting.date),
            isHoliday: !!meeting.isHoliday,
            holidayName: meeting.holidayName || '',
            path: `/data/meetings/${year}/${month}/${day}.json`
        });
    }

    // Write monthly index.json files
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

    // Write years.json
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

    // Write search-index.json
    const searchIndexFile = path.join(outputBaseDir, 'search-index.json');
    fs.writeFileSync(searchIndexFile, JSON.stringify(searchIndexList, null, 2), 'utf-8');

    console.log(`✅ Successfully generated:`);
    console.log(`   - ${meetings.length} individual daily meeting JSON files`);
    console.log(`   - Monthly index.json files for ${yearsIndexStructure.reduce((acc, y) => acc + y.months.length, 0)} month(s)`);
    console.log(`   - Global years.json (${(fs.statSync(yearsIndexFile).size / 1024).toFixed(2)} KB)`);
    console.log(`   - Global search-index.json (${(fs.statSync(searchIndexFile).size / 1024).toFixed(2)} KB)`);
}

generate().catch(err => {
    console.error('❌ Error generating meeting indexes:', err);
    process.exit(1);
});

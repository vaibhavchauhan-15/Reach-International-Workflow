import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchMeetings, formatDateDDMMYYYY, parseAnyDateToParts } from '../src/utils/meetingUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const searchIndex = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/meetings/search-index.json'), 'utf-8'));

const testQueries = [
    { query: '02-09-2026', expectedDate: '2026-09-02' },
    { query: '2-9-2026', expectedDate: '2026-09-02' },
    { query: '2 September', expectedDate: '2026-09-02' },
    { query: '2 sept', expectedDate: '2026-09-02' },
    { query: '2 sep', expectedDate: '2026-09-02' },
    { query: '2/09/2026', expectedDate: '2026-09-02' },
    { query: '2/9/2026', expectedDate: '2026-09-02' },
    { query: '02/09/2026', expectedDate: '2026-09-02' },
    { query: '02.09.2026', expectedDate: '2026-09-02' },
    { query: 'September 2', expectedDate: '2026-09-02' },
    { query: 'Sept 2', expectedDate: '2026-09-02' },
    { query: '2nd September', expectedDate: '2026-09-02' },
    { query: '2nd Sept', expectedDate: '2026-09-02' },
    { query: '02-09', expectedDate: '2026-09-02' },
    { query: '2/09', expectedDate: '2026-09-02' },
    { query: '25-08-2026', expectedDate: '2026-08-25' },
    { query: '25 August', expectedDate: '2026-08-25' },
    { query: '25 aug', expectedDate: '2026-08-25' },
    { query: '25/08/2026', expectedDate: '2026-08-25' },
    { query: 'Sanand', expectedCount: (c) => c > 0 },
    { query: 'Pradeep', expectedCount: (c) => c > 0 },
    { query: '02-09-2026 Sanand', expectedDate: '2026-09-02' }
];

let allPassed = true;

console.log('🧪 Testing Search Query Variations...\n');

for (const t of testQueries) {
    const results = searchMeetings(t.query, searchIndex);
    if (t.expectedDate) {
        const topResult = results[0];
        const passed = topResult && (topResult.date === t.expectedDate || topResult.dateDisplay === formatDateDDMMYYYY(t.expectedDate));
        if (passed) {
            console.log(`✅ Query: "${t.query}" -> Top Result: ${topResult.dateDisplay} (${topResult.date})`);
        } else {
            console.error(`❌ Query: "${t.query}" FAILED! Got: ${topResult ? topResult.date : 'No results'}, Expected: ${t.expectedDate}`);
            allPassed = false;
        }
    } else if (t.expectedCount) {
        const passed = t.expectedCount(results.length);
        if (passed) {
            console.log(`✅ Query: "${t.query}" -> Found ${results.length} results`);
        } else {
            console.error(`❌ Query: "${t.query}" FAILED! Expected results > 0, got ${results.length}`);
            allPassed = false;
        }
    }
}

if (allPassed) {
    console.log('\n🎉 ALL SEARCH VARIATIONS PASSED PERFECTLY!');
} else {
    process.exit(1);
}

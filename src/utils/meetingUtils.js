/**
 * Formats a date string into 'DD Mon YYYY' (e.g. '25 Aug 2026') format.
 */
export function formatMeetingDate(dateStr) {
    if (!dateStr) return '';
    if (typeof dateStr === 'string' && /^\d{1,2}\s+[A-Za-z]{3}\s+\d{4}$/.test(dateStr.trim())) {
        return dateStr.trim();
    }
    if (typeof dateStr === 'string' && dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3 && parts[0].length === 4) {
            const year = parts[0];
            const monthIdx = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            if (monthIdx >= 0 && monthIdx < 12) {
                return `${day} ${monthNames[monthIdx]} ${year}`;
            }
        }
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        const day = d.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${day} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    }
    return dateStr;
}

/**
 * Formats a meeting data object into a clean, human-readable structured text document.
 * Suitable for pasting into WhatsApp, Slack, emails, or notes.
 */
export function formatMeetingSummary(meeting) {
    if (!meeting) return '';

    const displayDate = formatMeetingDate(meeting.dateFormatted || meeting.date || meeting.title);

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
        
        // Prevent scrolling to bottom of page in mobile / older browsers
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

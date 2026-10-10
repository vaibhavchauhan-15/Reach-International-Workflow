/**
 * Reach International Operations - Daily Meeting Sync (09-10-2026)
 *
 * Implements strict Reach International standards:
 * - 100% Cloud-Native ingestion (zero static JSON files in src/data/)
 * - Strictly ONE machine per breakdown card
 * - Concise, single-line informative fields across all sections
 * - Accurate English translation and distillation of raw Hindi meeting transcripts
 * - Direct Supabase ingestion with automated verification check
 */

import { syncDailyMeeting, supabaseAdmin } from './sync-daily-meeting.js';

export const meeting09 = {
    id: "meet-2026-10-09",
    title: "09-10-2026",
    date: "2026-10-09",
    dateFormatted: "09-10-2026",
    focus: "Jammu S-125 uncommanded drive & starting interlock, Mundra JCB 45 Bombay AGM battery PO & Z-40 cartridge valve, Hardoi Palfinger 2-hour discharge, Haldia 150ft VIP shutdown seals, and diagnostic laptop deployment.",
    isHoliday: false,
    holidayName: "",
    breakdowns: [
        {
            site: "Jammu Project Site",
            model: "Genie S-125",
            serialNumber: "2409",
            issue: "Boom up elevation command inadvertently triggers uncommanded drive marching movement.",
            action: "Pravin Kumar and Umesh Kumar coordinating conference call with site operator to trace wiring harness and joystick circuit.",
            logistics: "Diagnostic multimeter and wiring harness test tools deployed on site.",
            clarification: "Previous wiring harness repair completed; operator conference required before deciding on control card replacement.",
            pendingIssue: "Conduct operator conference call and isolate joystick circuit before approving control card.",
            status: "Electrical Breakdown — Uncommanded drive marching on boom elevation; wiring harness and card review pending."
        },
        {
            site: "Jammu Project Site",
            model: "Genie S-125",
            serialNumber: "Unit S-125 (Second Unit)",
            issue: "Engine fails to start from platform basket controls without cycling ground emergency power switch.",
            action: "Umesh Kumar connecting operator on conference call with technician Pravin Kumar to inspect starting interlock.",
            logistics: "Upper control console wiring diagram and multimeter arranged for circuit testing.",
            clarification: "Starting circuit functions only after cycling lower ground emergency switch, indicating an emergency interlock or relay defect.",
            pendingIssue: "Execute conference troubleshooting with operator and Pravin Kumar to resolve basket ignition interlock.",
            status: "Starting Interlock Fault — Engine starts only after cycling ground emergency switch; operator conference call pending."
        },
        {
            site: "Mundra Project Site",
            model: "Genie Z-40/45",
            serialNumber: "Unit Z-40-Mundra",
            issue: "Drive marching function fails during operational testing while hydraulic drive motor overheats.",
            action: "Mantu photographing drive cartridge valve for WhatsApp group so Pardeep Tomar can identify yard replacement.",
            logistics: "Replacement drive cartridge valve requested from central yard inventory.",
            clarification: "Overheating drive motor indicates a defective or seized hydraulic cartridge valve in the manifold.",
            pendingIssue: "Post cartridge valve photograph to WhatsApp group and dispatch matching valve from central store.",
            status: "Hydraulic Drive Breakdown — Drive marching halted with motor overheating; cartridge valve identification pending."
        },
        {
            site: "Mundra Project Site",
            model: "JCB 45 Electric Boom",
            serialNumber: "JCB 45-Mundra",
            issue: "Machine grounded since October 3rd due to depleted AGM traction battery bank.",
            action: "Dhruv Sharma sourced two 420Ah AGM batteries from Bombay supplier at ₹55k–56k each for immediate dispatch.",
            logistics: "Two 420Ah AGM batteries being dispatched from Bombay; interim yard battery bank arriving today.",
            clarification: "OEM warranty expired as machine predates April 2026; Bombay supplier selected to save ₹10,000 per battery over OEM.",
            pendingIssue: "Install interim yard batteries for deep charging and finalize commercial dispatch of two Bombay batteries.",
            status: "Grounded (Batteries) — Sourced two replacement AGM batteries from Bombay; interim yard battery set arriving for test."
        },
        {
            site: "Hardoi Project Site",
            model: "Palfinger 12m Boom Lift",
            serialNumber: "Palfinger 12-Hardoi",
            issue: "Traction battery bank completely drains within 2 hours of light operation after a full overnight charge.",
            action: "Sudesh Pal conducted on-site battery testing and identified two defective Trojan AGM cells requiring replacement.",
            logistics: "Battery photographs and cell test readings uploaded to technical group for replacement approval.",
            clarification: "Machine operates in 2-hour bursts but client requires full-shift availability; two cells suffered deep degradation.",
            pendingIssue: "Approve procurement or yard dispatch of two replacement 12V Trojan AGM batteries.",
            status: "Running with Issue — Battery bank exhausts within 2 hours; replacement of two Trojan cells pending approval."
        },
        {
            site: "Haldia Project Site",
            model: "150ft Telescopic Boom Lift",
            serialNumber: "Unit 150-Haldia",
            issue: "Hydraulic oil level 10 fingers low requiring 50–60 liters, with worn main boom and rotary cylinder seals.",
            action: "Banarasi Yadav preparing hydraulic oil and cylinder seal kit quotation for direct WhatsApp approval by Pardeep Tomar.",
            logistics: "Quotation for 50–60 liters hydraulic oil, rotary seal, and main boom seal kits being finalized.",
            clarification: "Site shut down due to CM VIP visit; machine parked in private paid parking (₹250–300/day) near HPL office.",
            pendingIssue: "Submit seal kit and oil quotation to Pardeep Tomar for approval during plant shutdown window.",
            status: "Halted (VIP Shutdown) — Low hydraulic oil and seal replacement required; work suspended due to CM visit."
        },
        {
            site: "Sanand Project Site",
            model: "JLG M600JP",
            serialNumber: "Unit 600-Sanand",
            issue: "Hydraulic fluid leakage observed and platform extension deck failing to slide out smoothly.",
            action: "Site technician scheduled hydraulic leak resealing and platform extension mechanical overhaul for Sunday.",
            logistics: "Replacement cylinder O-rings and overhaul tools staged at Sanand site store.",
            clarification: "Machine continues running during active plant hours; minor leakage scheduled for Sunday to avoid production stoppage.",
            pendingIssue: "Execute cylinder seal overhaul and free jammed platform extension during Sunday maintenance window.",
            status: "Running with Problem — Platform deck jammed and hydraulic leak noted; maintenance scheduled for Sunday."
        },
        {
            site: "BMH Project Site",
            model: "Electric Boom Lift 10832",
            serialNumber: "10832",
            issue: "Damaged electrical control cable causing intermittent signal loss to boom control functions.",
            action: "Pardeep Tomar coordinated with Umesh Kumar to supply and replace the damaged electrical control cable.",
            logistics: "Replacement electrical control cable allocated from store.",
            clarification: "Issue verified with Umesh; complaint closed on personal tracking after cable replacement coordination.",
            pendingIssue: "Install replacement cable on site and perform final operational test.",
            status: "Cable Defect — Damaged electrical control cable identified; replacement cable fitment underway."
        },
        {
            site: "Panipat Project Site",
            model: "Hyundai 2-Ton Forklift",
            serialNumber: "Hyundai 2T-Panipat",
            issue: "Burst high-pressure hydraulic hose pipe caused fluid discharge and halted forklift operations.",
            action: "Pardeep Tomar and Shiv Uniyal prepared parts indent for replacement hydraulic hose pipe and fittings.",
            logistics: "High-pressure hydraulic hose pipe and fittings requisitioned for urgent store dispatch.",
            clarification: "Burst hose grounded machine; small parts indent submitted to central store.",
            pendingIssue: "Procure and dispatch replacement hydraulic hose pipe to Panipat site.",
            status: "Hydraulic Breakdown — Burst hydraulic pipe halted operation; hose procurement and dispatch pending."
        },
        {
            site: "Visakhapatnam Project Site",
            model: "Rough Terrain RT Boom Lift",
            serialNumber: "Vizag RT",
            issue: "Continuous hydraulic valve leakage reported; client service ticket active.",
            action: "Shiv Uniyal and Jitendra Budhauliya coordinating seal kit sourcing and technician travel.",
            logistics: "Hydraulic valve seal kit requisition pending part number confirmation.",
            clarification: "Machine currently running with problem; continuous leak requires prompt on-site valve resealing.",
            pendingIssue: "Confirm seal kit part numbers and book technician travel ticket to Visakhapatnam.",
            status: "Running with Problem — Continuous hydraulic valve leakage; technician travel and seal kit dispatch pending."
        },
        {
            site: "Bangalore Project Site",
            model: "2-Ton Electric Forklift",
            serialNumber: "Bangalore 2T",
            issue: "Warehouse attachment clamp malfunctioning during pallet handling operations.",
            action: "Shiv Uniyal contacted attachment clamp OEM specialist to inspect and calibrate hydraulic clamp mechanism.",
            logistics: "OEM clamp service technician requisitioned for on-site visit.",
            clarification: "Forklift remains running with problem while dedicated clamp technician is arranged.",
            pendingIssue: "Complete OEM specialist site visit to adjust hydraulic clamp mechanism.",
            status: "Running with Problem — Forklift attachment clamp malfunctioning; OEM specialist site visit scheduled."
        },
        {
            site: "Hyderabad Project Site",
            model: "Electric Boom Lift",
            serialNumber: "Hyderabad Unit",
            issue: "Damaged and excessively worn tire creating operational safety concern.",
            action: "Shiv Uniyal verified tire condition; confirmed machine is running without total breakdown.",
            logistics: "Replacement industrial tire sourcing evaluated with Jay Prakash and central store.",
            clarification: "Tire defect logged on portal; verified not a dead breakdown but requires scheduled replacement.",
            pendingIssue: "Finalize replacement tire procurement and schedule wheel changeover on site.",
            status: "Running with Problem — Worn tire identified; machine operational while replacement tire is arranged."
        },
        {
            site: "Dholera Project Site",
            model: "JCB 40 Boom Lift",
            serialNumber: "Dholera JCB 40",
            issue: "Machine grounded awaiting arrival of replacement batteries and dedicated technician attendance.",
            action: "Ranjan booked on train travel to reach Dholera today, with Mishra ji overseeing battery installation.",
            logistics: "Replacement battery consignment arriving on site today; travel ticket confirmed for Ranjan.",
            clarification: "Technician assigned exclusively to Dholera to eliminate multi-site travel delays.",
            pendingIssue: "Ranjan to reach Dholera and Mishra ji to supervise on-site battery installation.",
            status: "Breakdown — Awaiting technician Ranjan arrival and battery bank installation by Mishra ji."
        },
        {
            site: "Jamnagar Project Site",
            model: "Genie S-65 Boom Lift",
            serialNumber: "Jamnagar S-65",
            issue: "Service and calibration required on site; primary technician Deepak occupied on high-priority call.",
            action: "Sandeep dispatched to Jamnagar for S-65 machine while Deepak is reassigned to Dholera.",
            logistics: "Travel ticket arranged for Sandeep to travel to Jamnagar.",
            clarification: "Regular technician punching and attendance logging verified in compliance with management standards.",
            pendingIssue: "Sandeep to reach Jamnagar site and perform required machine calibration.",
            status: "Technician Deployment — Sandeep dispatched to Jamnagar for S-65 service while Deepak is reassigned."
        },
        {
            site: "JK Paper Project Site",
            model: "Forklift 5002",
            serialNumber: "Unit 5002",
            issue: "Major mechanical breakdown continuing to halt heavy industrial paper handling.",
            action: "Shiv Uniyal and Jitendra Budhauliya following up on replacement parts delivery and technician schedule.",
            logistics: "Dedicated spare parts shipment dispatched to site depot.",
            clarification: "One of three reported breakdowns at paper plant; awaiting parts arrival for restoration.",
            pendingIssue: "Confirm receipt of parts consignment and assign technician for assembly.",
            status: "Breakdown — Major mechanical breakdown ongoing; awaiting spare parts delivery."
        },
        {
            site: "JK Paper Project Site",
            model: "Forklift 3002",
            serialNumber: "Unit 3002",
            issue: "Electrical drive controller malfunction halting warehouse operations.",
            action: "Shiv Uniyal tracking electronic controller replacement parts en route to site.",
            logistics: "Electronic controller components included in consolidated parts transit.",
            clarification: "Unit scheduled for immediate restoration alongside unit 5002.",
            pendingIssue: "Receive electronic controller components and complete wiring installation.",
            status: "Breakdown — Controller failure halting operations; replacement components in transit."
        }
    ],
    parts: [
        { part: "Drive Manifold Cartridge Valve", context: "Mundra Site / Genie Z-40/45", statusNextSteps: "Mantu sharing part photo on WhatsApp for Pardeep Tomar to verify and dispatch from yard stock." },
        { part: "420Ah AGM Traction Batteries (2 Units)", context: "Mundra Site / JCB 45", statusNextSteps: "Sourced from Bombay vendor at ₹55k–56k each; direct dispatch in progress while interim yard batteries arrive." },
        { part: "12V Trojan AGM Deep-Cycle Batteries (2 Units)", context: "Hardoi Site / Palfinger 12m", statusNextSteps: "Photographs and cell test readings uploaded to technical group for replacement approval." },
        { part: "Rotary & Main Boom Cylinder Seal Kits", context: "Haldia Site / 150ft Telescopic Boom", statusNextSteps: "Quotation being sent directly to Pardeep Tomar via WhatsApp for approval during VIP plant shutdown." },
        { part: "Hydraulic Oil (50–60 Liters)", context: "Haldia Site / 150ft Telescopic Boom", statusNextSteps: "Level measured 10 fingers low; quotation being sent for oil top-up during site shutdown." },
        { part: "High-Pressure Hydraulic Hose Pipe & Fittings", context: "Panipat Site / Hyundai 2-Ton Forklift", statusNextSteps: "Requisitioned by Pardeep Tomar and Shiv Uniyal for urgent dispatch to fix burst hydraulic line." },
        { part: "Electrical Control Cable Assembly", context: "BMH Site / Electric Boom Lift 10832", statusNextSteps: "Allocated from store inventory by Pardeep Tomar for on-site fitment by Umesh Kumar." },
        { part: "Hydraulic Valve Seal Kit", context: "Visakhapatnam Site / Rough Terrain RT", statusNextSteps: "OEM part number confirmation pending for procurement and technician dispatch." },
        { part: "Industrial Traction Wheel / Tire", context: "Hyderabad Site / Electric Boom Lift", statusNextSteps: "Tire condition evaluated; replacement sourcing under review with Jay Prakash." },
        { part: "Forklift Mechanical & Controller Consignment", context: "JK Paper Site / Units 5002 & 3002", statusNextSteps: "Shipment en route to depot for simultaneous restoration of heavy paper forklifts." },
        { part: "Diagnostic Software Laptops (2 Units)", context: "Central Fleet / AWP & JCB Calibration", statusNextSteps: "Allocating 1 unit in Sanand for AWP fleet and retrieving 1 unit from Ram Babu for heavy JCB machinery." }
    ],
    directives: [
        {
            title: "Dual-Channel Requisition Protocol (WhatsApp Direct + Google Form)",
            points: [
                "Urgent or complex spare part requests must be sent directly to store manager Pardeep Tomar on WhatsApp with photos.",
                "Technicians must simultaneously log the formal indent on the Google Form to ensure audit and CRM tracking."
            ]
        },
        {
            title: "Mandatory Technical Triage Before Electronic Card Replacement",
            points: [
                "Field teams must conduct a 3-way conference call between operator, supervisor, and senior technician Pravin Kumar before requesting control cards.",
                "Inspect wiring harness continuity, joystick voltage, and safety interlocks thoroughly before condemning expensive electronic cards."
            ]
        },
        {
            title: "Strict Commercial Vetting on Battery Procurements",
            points: [
                "Confirm machine manufacturing date against April 2026 threshold to verify whether OEM warranty applies before raising POs.",
                "Compare OEM prices against approved third-party suppliers (e.g., Bombay AGM at ₹55k vs OEM ₹60k) to optimize procurement costs."
            ]
        },
        {
            title: "VIP Plant Shutdown Maintenance Windows",
            points: [
                "Utilize client plant stoppages (such as CM visits or VIP shutdowns) to perform hydraulic resealing, oil top-ups, and structural overhauls.",
                "Secure equipment in authorized parking to prevent compounding private parking charges during extended shutdowns."
            ]
        },
        {
            title: "Diagnostic Laptop Custody and Operational Deployment",
            points: [
                "Maintain exactly two diagnostic laptops in active fleet rotation: one dedicated to Sanand AWP and one for JCB heavy equipment.",
                "Diagnostic laptops must not remain idle with non-technical personnel and must be transferred immediately to active field technicians."
            ]
        }
    ],
    actionItems: [
        { person: "Dhruv Sharma & Dinesh", task: "Finalize purchase order and dispatch of two 420Ah AGM batteries from Bombay supplier for Mundra JCB 45." },
        { person: "Pardeep Tomar", task: "Verify cartridge valve photo on WhatsApp for Mundra Z-40 and dispatch replacement valve from central yard." },
        { person: "Umesh Kumar & Pravin Kumar", task: "Conduct 3-way conference call with Jammu operator to diagnose S-125 uncommanded drive and starting interlock." },
        { person: "Mishra Ji & Ranjan", task: "Receive incoming batteries and complete installation on JCB 40 upon Ranjan's arrival at Dholera site." },
        { person: "Banarasi Yadav", task: "Submit quotation for 50-60L hydraulic oil and cylinder seals directly to Pardeep Tomar for Haldia 150ft boom." },
        { person: "Shiv Uniyal & Jitendra Budhauliya", task: "Confirm hydraulic seal kit part number and book technician travel ticket for Visakhapatnam RT leak." },
        { person: "Shiv Uniyal", task: "Coordinate with attachment clamp OEM specialist for on-site calibration of Bangalore 2-ton electric forklift." },
        { person: "Pardeep Tomar & Ram Babu", task: "Retrieve diagnostic laptop from Ram Babu and stage it for field technician deployment on heavy JCB machinery." },
        { person: "Sandeep & Deepak", task: "Sandeep to travel to Jamnagar for S-65 calibration while Deepak is reassigned to Dholera site." },
        { person: "Sudesh Pal & Umesh Kumar", task: "Submit battery test data and obtain management approval for two replacement Trojan AGM cells at Hardoi." }
    ]
};

async function run() {
    console.log('🚀 Synchronizing October 09, 2026 meeting...');
    const result = await syncDailyMeeting(meeting09);
    console.log(`✅ Synced ${result.meetingId}: ${result.counts.breakdowns} machines, ${result.counts.parts} parts, ${result.counts.directives} directives, ${result.counts.actionItems} action items.`);

    // Explicit Verification Check (Step B)
    console.log('\n🔍 Running Mandatory Database Verification Query (Step B)...');
    const { data: meet, error: mErr } = await supabaseAdmin
        .from('meetings')
        .select('*')
        .eq('id', 'meet-2026-10-09')
        .single();

    if (mErr || !meet) {
        throw new Error(`Verification failed: Master meeting record meet-2026-10-09 not found: ${mErr?.message}`);
    }

    const [bRes, pRes, dRes, aRes] = await Promise.all([
        supabaseAdmin.from('breakdown_machines').select('id', { count: 'exact' }).eq('meeting_id', 'meet-2026-10-09'),
        supabaseAdmin.from('meeting_parts').select('id', { count: 'exact' }).eq('meeting_id', 'meet-2026-10-09'),
        supabaseAdmin.from('meeting_directives').select('id', { count: 'exact' }).eq('meeting_id', 'meet-2026-10-09'),
        supabaseAdmin.from('meeting_action_items').select('id', { count: 'exact' }).eq('meeting_id', 'meet-2026-10-09')
    ]);

    console.log(`📊 Master Record: ${meet.id} | Date: ${meet.date} | Title: ${meet.title}`);
    console.log(`📊 Child Counts Verification:`);
    console.log(`   - Breakdowns: ${bRes.count} in DB (expected: ${meeting09.breakdowns.length})`);
    console.log(`   - Parts: ${pRes.count} in DB (expected: ${meeting09.parts.length})`);
    console.log(`   - Directives: ${dRes.count} in DB (expected: ${meeting09.directives.length})`);
    console.log(`   - Action Items: ${aRes.count} in DB (expected: ${meeting09.actionItems.length})`);

    const matches = (
        bRes.count === meeting09.breakdowns.length &&
        pRes.count === meeting09.parts.length &&
        dRes.count === meeting09.directives.length &&
        aRes.count === meeting09.actionItems.length
    );

    if (!matches) {
        throw new Error('❌ Verification failed: Database child record counts do not match payload counts!');
    }

    console.log('\n🎉 ALL DATABASE VERIFICATION CHECKS PASSED SUCCESSFULLY!');
}

run().catch(err => {
    console.error('❌ Ingestion or verification failed:', err);
    process.exit(1);
});

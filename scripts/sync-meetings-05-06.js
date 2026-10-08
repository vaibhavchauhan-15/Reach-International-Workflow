import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Load environment variables from .env
function loadEnv() {
    const envPath = path.join(ROOT_DIR, '.env');
    if (!fs.existsSync(envPath)) return {};
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    const env = {};
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [k, ...v] = trimmed.split('=');
        if (k && v.length) env[k.trim()] = v.join('=').trim();
    }
    return env;
}

const env = loadEnv();
const SUPABASE_URL = env.SUPABASE_URL || 'https://mwtfftedrtxiegawgssf.supabase.co';
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;

if (!SERVICE_KEY) {
    console.error('❌ Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false }
});

// ============================================================================
// MEETING DATA: 2026-10-05 (Monday)
// ============================================================================
const meeting05 = {
    id: "meet-2026-10-05",
    title: "05-10-2026",
    date: "2026-10-05",
    dateDisplay: "05-10-2026",
    dateFormatted: "05-10-2026",
    focus: "Sanand S-65 emergency circuit breakdown escalation, Bhiwadi units 502/510 parts transit, Mundra JLG 800AJ local engine parts sourcing, and strict 12 PM CRM logging deadline.",
    isHoliday: false,
    holidayName: "",
    noMeetingHeld: false,
    notRecorded: false,
    breakdowns: [
        {
            site: "Sanand Project Site — Genie S-65 Telescopic Boom Lift",
            model: "Genie S-65",
            serialNumber: "S6015D-364",
            location: "Sanand Project Site",
            issue: "Safety inspection rejected unit due to auxiliary emergency circuit shutoff and basket rotation solenoid failure (20-25 days unreported).",
            action: "Dheeraj Dubey and Imran penalized Rs 10,000 salary deduction; Pradeep Suthar deployed to rectify circuit.",
            logistics: "Technician gate pass and medical clearance cleared; emergency components staged on site.",
            clarification: "Concealing breakdowns compromises client safety and invalidates timesheet billing.",
            pendingIssue: "Restore auxiliary emergency circuit and basket rotation to clear client re-inspection.",
            status: "Under Repair — Pradeep deployed to replace APU valve and solenoid."
        },
        {
            site: "Sanand Project Site — Genie GS-5390 Scissor Lift",
            model: "Genie GS-5390",
            serialNumber: "GS90D-215",
            location: "Sanand Project Site",
            issue: "Sudden electrical power supply cutoff immediately upon starting operation.",
            action: "Pradeep Suthar assigned to inspect power supply wiring harness and main contactors.",
            logistics: "Electrical testing multimeter and spare harness staged at Sanand.",
            clarification: "Strict client safety audits require all electrical interlocks fully operational.",
            pendingIssue: "Trace and eliminate electrical supply cutoff on main harness.",
            status: "Under Investigation — Power harness and contactor testing in progress."
        },
        {
            site: "Sanand Project Site — Genie GS-4550 Scissor Lift",
            model: "Genie GS-4550",
            serialNumber: "0030 / 8384",
            location: "Sanand Project Site",
            issue: "Extendable platform deck is jammed and fails to roll out.",
            action: "Pradeep Suthar assigned to inspect deck slide roller guides and clean track rails.",
            logistics: "Slide guide roller spares and grease staged on site.",
            clarification: "Jammed extension deck prevents operators from reaching work areas safely.",
            pendingIssue: "Free jammed deck extension slide guides and verify smooth rollout.",
            status: "Under Repair — Deck slide guide roller inspection underway."
        },
        {
            site: "Sanand Project Site — JCB 45ft Electric Boom Lift",
            model: "JCB Access 45ft",
            serialNumber: "JCB 45ft",
            location: "Sanand Project Site",
            issue: "Chassis electrical shock and current leakage hazard occurs when connected for charging.",
            action: "Technician testing charger grounding and insulation resistance to eliminate electrocution hazard.",
            logistics: "Insulation resistance testing meter mobilized to Sanand site.",
            clarification: "Critical electrical safety hazard; charger isolated until recertified.",
            pendingIssue: "Replace damaged charger insulation and verify zero chassis current leakage.",
            status: "Under Repair — Charger insulation resistance test underway."
        },
        {
            site: "Sanand Project Site — Genie S-600 Boom Lift",
            model: "Genie S-600",
            serialNumber: "Unit S-600",
            location: "Sanand Project Site",
            issue: "Minor hydraulic oil leakage observed around manifold fittings.",
            action: "Pradeep Suthar instructed to tighten hose fittings and replace copper washers.",
            logistics: "Hydraulic seal washer kit available in Sanand depot inventory.",
            clarification: "Preventative seal replacement prevents site oil spills on client premises.",
            pendingIssue: "Tighten fittings and verify zero hydraulic drip under pressure.",
            status: "Scheduled Rectification — Fitting torque and washer replacement underway."
        },
        {
            site: "Bhiwadi Project Site — Hyundai 5-Ton Forklift (Unit 502)",
            model: "Hyundai 5-Ton Forklift",
            serialNumber: "Unit 502",
            location: "Bhiwadi Project Site",
            issue: "Breakdown persists awaiting OEM spares; dispatch stalled due to payment hold.",
            action: "Payment cleared; Babban deployed to self-collect parts from Hyundai depot via passenger train.",
            logistics: "Babban mobilized on train for same-day hand collection from Hyundai regional office.",
            clarification: "Hand-collection via rail chosen to eliminate multi-day freight transit delays.",
            pendingIssue: "Babban arrival with parts and installation by Bhiwadi technician.",
            status: "Parts in Transit — Hand collection via rail underway for immediate delivery."
        },
        {
            site: "Bhiwadi Project Site — Hyundai 5-Ton Forklift (Unit 510)",
            model: "Hyundai 5-Ton Forklift",
            serialNumber: "Unit 510",
            location: "Bhiwadi Project Site",
            issue: "Electric motor fitting incomplete; mast mounting stalled due to crane unavailability and jammed bearing.",
            action: "Sandeep Kumar and Ravinder deploying full team to mount mast and complete motor assembly today.",
            logistics: "Mobile crane booked on site for mast hoisting and alignment.",
            clarification: "Sunday overtime dispute resolved; full team deployed for same-day commissioning.",
            pendingIssue: "Hoist mast with mobile crane and finish electric drive motor alignment.",
            status: "In Progress — Mobile crane deployed for same-day mast and motor assembly."
        },
        {
            site: "Regional Fleet Depot — Machine 302 / 322 Control Card",
            model: "Electric Scissor Lift",
            serialNumber: "Unit 302 / 322",
            location: "Regional Fleet Depot",
            issue: "Machine grounded 90 days; electronic motherboard declared unrepairable by vendor.",
            action: "Dhruv Sharma ordered procurement to stop repair attempts and buy new OEM controller immediately.",
            logistics: "Part number sent to OEM suppliers for price quotation and availability.",
            clarification: "Prolonged repair discussions ended; direct OEM controller purchase mandated.",
            pendingIssue: "Obtain quotation and place purchase order for new OEM control card.",
            status: "Escalated — Procurement mandated to buy replacement OEM control card."
        },
        {
            site: "Hyderabad Project Site — 3-Ton Forklift Tires",
            model: "3-Ton Forklift",
            serialNumber: "Hyderabad 3T",
            location: "Hyderabad Project Site",
            issue: "Replacement heavy solid tires delayed 15 days; consignment halted at Howrah logistics hub.",
            action: "Banarasi Yadav posted docket slip to group; logistics team escalating for urgent carrier clearance.",
            logistics: "Tracking docket 2423... with carrier; exploring direct hub collection.",
            clarification: "Delayed tire fitment causes idle equipment billing disputes with client.",
            pendingIssue: "Clear consignment from Howrah hub and deliver to Hyderabad site.",
            status: "Logistics Escalation — Carrier clearance expedited for delayed tires."
        },
        {
            site: "Baroda Project Site — 100ft Boom Lift Tires",
            model: "100ft Boom Lift",
            serialNumber: "Baroda 100ft",
            location: "Baroda Project Site",
            issue: "Replacement tires for 100ft boom lift have not reached site; unit immobilized.",
            action: "Logistics coordinating with regional distributor and transporter for dispatch confirmation.",
            logistics: "Regional warehouse verifying transporter docket and transit ETA.",
            clarification: "Tires needed urgently to resume facade maintenance for client.",
            pendingIssue: "Obtain dispatch confirmation and tracking number from distributor.",
            status: "Tracking — Logistics following up on tire delivery to Baroda site."
        },
        {
            site: "JK Paper Mills Site — 3-Ton Paper Clamp Forklift (Drive Motor)",
            model: "3-Ton Paper Clamp Forklift",
            serialNumber: "JK Paper Unit",
            location: "JK Paper Mills Site",
            issue: "Electric drive motor burned out, causing complete machine stoppage.",
            action: "Motor dispatched to specialized Surat facility for rewinding; monitored by Sushil Mishra.",
            logistics: "Drive motor in transit to Surat rewinding workshop.",
            clarification: "Emergency rewinding turnaround required to prevent client contract penalty.",
            pendingIssue: "Complete Surat motor rewinding and dispatch back to site.",
            status: "Under Repair — Motor undergoing precision rewinding at Surat workshop."
        },
        {
            site: "JK Paper Mills Site — 3-Ton Paper Clamp Forklift (Charging Pump)",
            model: "3-Ton Paper Clamp Forklift",
            serialNumber: "JK Paper Unit",
            location: "JK Paper Mills Site",
            issue: "Internal mechanical breakdown of hydraulic charging pump causing zero fluid pressure.",
            action: "Sushil Mishra requisitioned replacement hydraulic charging pump from central depot.",
            logistics: "Replacement charging pump being dispatched from central stores today.",
            clarification: "Both motor and pump repairs synchronized for same-day recommissioning.",
            pendingIssue: "Receive replacement charging pump and install with rewound motor.",
            status: "Sourcing Spares — Replacement charging pump requisitioned from central stores."
        },
        {
            site: "Bangalore Amazon Hub — 2-Ton Paper Roll Clamp Forklift",
            model: "2-Ton Clamp Forklift",
            serialNumber: "Bangalore 2T",
            location: "Bangalore Amazon Hub",
            issue: "Clamp grips rolls but hydraulic valve block defect prevents opening / releasing.",
            action: "Dhruv Sharma engaged Cascade OEM support to evaluate flow and provide replacement valve block.",
            logistics: "Technician Anuj booked for immediate travel with test equipment and seals.",
            clarification: "Critical commercial urgency due to peak Amazon Great Indian Festival volume.",
            pendingIssue: "Cascade OEM valve block inspection and replacement by technician Anuj.",
            status: "High Priority — Cascade OEM engaged; technician Anuj traveling to site."
        },
        {
            site: "Visakhapatnam Amazon Hub — Double-Deep Reach Truck",
            model: "Double-Deep Reach Truck",
            serialNumber: "Vizag Double-Deep",
            location: "Visakhapatnam Amazon Hub",
            issue: "Severe cylinder oil leakage and damaged mast camera antenna causing operational blindness.",
            action: "Technician Anuj dispatched with sample seals and camera antenna for same-day repair.",
            logistics: "Sample seals and camera antenna packaged with traveling technician Anuj.",
            clarification: "Amazon festival rush requires full reach truck availability.",
            pendingIssue: "Fit replacement cylinder seals and install new camera antenna.",
            status: "Technician En Route — Anuj traveling with replacement seal kit and antenna."
        },
        {
            site: "Sanand Project Depot — Genie 150X Boom Lift",
            model: "Genie 150X",
            serialNumber: "Unit 150X",
            location: "Sanand Project Depot",
            issue: "Off-hire released machine requiring 100% mechanical overhaul prior to redeployment.",
            action: "Banarasi Yadav and Vinod Pal conducting mechanical overhaul, hydraulic flush, and load testing.",
            logistics: "Sanand workshop bay and test weight blocks allocated.",
            clarification: "Zero tolerance for deploying un-refurbished off-hire machinery to new sites.",
            pendingIssue: "Complete comprehensive servicing and certified load testing.",
            status: "Depot Overhaul — Mechanical overhaul and structural inspection in progress."
        },
        {
            site: "Sanand Project Depot — Genie SST Boom Lift",
            model: "Genie SST",
            serialNumber: "Unit SST",
            location: "Sanand Project Depot",
            issue: "Released off-hire machine undergoing preventive maintenance and electrical inspection.",
            action: "Depot technicians inspecting wire harnesses, safety switches, and replacing hydraulic filters.",
            logistics: "Filter kit and hydraulic oil allocated from depot inventory.",
            clarification: "All safety interlocks and emergency descent systems must be verified.",
            pendingIssue: "Complete filter replacement and safety circuit testing.",
            status: "Depot Overhaul — Electrical overhaul and preventative servicing in progress."
        },
        {
            site: "Sanand Project Depot — Genie S-100 Boom Lift",
            model: "Genie S-100",
            serialNumber: "Unit S-100",
            location: "Sanand Project Depot",
            issue: "Boom telescoping wear pads and lift cylinder require overhaul after off-hire release.",
            action: "Banarasi Yadav inspecting telescoping wear pads and resealing lift cylinder.",
            logistics: "Wear pad shims and cylinder seal kits staged in depot workshop.",
            clarification: "Telescoping tolerances must meet OEM specifications before redeployment.",
            pendingIssue: "Complete wear pad adjustment and hydraulic pressure calibration.",
            status: "Depot Overhaul — Boom wear pad servicing and pressure calibration underway."
        },
        {
            site: "Sanand Project Depot — Genie 150 Boom Lift",
            model: "Genie 150",
            serialNumber: "Unit 150",
            location: "Sanand Project Depot",
            issue: "Released off-hire unit with operational defect requiring depot warranty verification.",
            action: "Jitendra Budhauliya coordinating with Genie OEM service engineer for warranty inspection.",
            logistics: "Technical warranty case logged with Genie India support team.",
            clarification: "OEM warranty claim must be settled before field deployment.",
            pendingIssue: "Genie engineer depot visit and warranty component replacement.",
            status: "OEM Warranty Review — Technical support case logged with Genie."
        },
        {
            site: "Mundra Project Depot — JLG 800AJ Boom Lift (S/N: 6228)",
            model: "JLG 800AJ",
            serialNumber: "6228",
            location: "Mundra Project Depot",
            issue: "Immobilized 15 days; engine dismantled and machined, but Bombay supplier lacked parts.",
            action: "Management bypassed Bombay vendor; Jitendra Budhauliya instructed to buy parts locally today.",
            logistics: "Local Mundra/Gandhidham supplier identified for immediate cash purchase.",
            clarification: "Procurement delays on released fleet halted by switching to local sourcing.",
            pendingIssue: "Procure engine components locally and assemble engine at Mundra depot.",
            status: "Sourcing Shift — Switched to local procurement for immediate engine assembly."
        },
        {
            site: "Assam Project Site (Jagiroad) — Traction Batteries",
            model: "MEWP Traction Batteries",
            serialNumber: "Batteries (6-12)",
            location: "Assam Project Site",
            issue: "6 to 12 traction batteries lying unattended on site with minimal security, risking theft or discharge.",
            action: "Pravesh Yadav authorized to get client gate pass and shift batteries into locked room.",
            logistics: "Gate pass paperwork submitted to client security.",
            clarification: "Valuable traction batteries must be secured in locked quarters.",
            pendingIssue: "Secure client gate pass and transfer batteries to locked storage.",
            status: "Security Directive — Gate pass processing underway for locked storage."
        },
        {
            site: "Assam Project Site — Genie Boom Lift (S/N: 167014)",
            model: "Genie Boom Lift",
            serialNumber: "167014",
            location: "Assam Project Site",
            issue: "Rotary emergency motor defect reported 4 days ago; operating intermittently under breakdown risk.",
            action: "Mantu Dada and Sandeep assigned for immediate on-site inspection and motor swap.",
            logistics: "Replacement rotary motor staged with regional technician.",
            clarification: "Emergency auxiliary motor is mandatory for operator safety clearance.",
            pendingIssue: "Complete on-site inspection and replace defective rotary motor.",
            status: "Inspection Scheduled — Technicians deployed for rotary motor swap."
        },
        {
            site: "Bellary Project Site — Mining Application Machine",
            model: "Mining Boom Lift",
            serialNumber: "Bellary Unit",
            location: "Bellary Project Site",
            issue: "Mechanical breakdown repaired previously, but formal CRM closure report is pending.",
            action: "Dhruv Sharma instructed site team to upload signed work report and close ticket in CRM by 12:00 PM.",
            logistics: "Signed work sheet retrieved from site supervisor.",
            clarification: "Open tickets in CRM distort operational fleet availability metrics.",
            pendingIssue: "Submit closure entry and attach site sheet in CRM by 12:00 PM.",
            status: "Closure Pending — Breakdown rectified; CRM closure entry required."
        }
    ],
    parts: [
        { part: "Genie S-65 APU Valve & Solenoid", context: "Sanand Site / Unit S-65", statusNextSteps: "Staged at site; Pradeep installing to restore emergency descent." },
        { part: "Hyundai 5-Ton Forklift Spares", context: "Bhiwadi Site / Unit 502", statusNextSteps: "PO paid; Babban self-collecting via passenger train from OEM." },
        { part: "Heavy Solid Tires (Docket 2423...)", context: "Hyderabad & Baroda Sites", statusNextSteps: "Halted at Howrah hub; transport agency escalated for priority release." },
        { part: "3-Ton Forklift Electric Drive Motor", context: "JK Paper Mills Site", statusNextSteps: "Undergoing emergency rewinding at specialized workshop in Surat." },
        { part: "Hydraulic Charging Pump", context: "JK Paper Mills Site", statusNextSteps: "Internal mechanical failure; replacement requisitioned from central stores." },
        { part: "Paper Roll Clamp Valve Manifold", context: "Bangalore Amazon Hub", statusNextSteps: "Cascade OEM technical support engaged; technician Anuj mobilized." },
        { part: "Double-Deep Cylinder Seal Kit & Antenna", context: "Visakhapatnam Amazon Hub", statusNextSteps: "Technician Anuj en route with replacement seals and camera antenna." },
        { part: "JLG 800AJ Engine Rebuild Components", context: "Mundra Depot / Serial 6228", statusNextSteps: "Switched to local vendor for same-day purchase and assembly." },
        { part: "Rotary Emergency Auxiliary Motor", context: "Assam Site / Unit 167014", statusNextSteps: "Technicians deployed on-site for immediate inspection and swap." }
    ],
    directives: [
        {
            title: "Daily 12:00 PM CRM Breakdown & Rectification Policy",
            points: [
                "Update all site breakdown tickets, repairs, and machine statuses in CRM by 12:00 PM daily.",
                "Attach signed work sheets and clear photo evidence to every completed rectification in CRM."
            ]
        },
        {
            title: "Zero-Tolerance Policy on Concealed Breakdowns & Penalties",
            points: [
                "Concealing breakdowns results in Rs 10,000 salary penalty and liability for idle operator wages.",
                "Supervisors with unreported breakdowns placed on 1-week notice with termination prior to Diwali."
            ]
        },
        {
            title: "Rapid Local Procurement & Hand-Carried Transit Policy",
            points: [
                "Authorize local purchase within 24 hours whenever distant vendors encounter stock delays.",
                "Mobilize staff for hand-collection of emergency spares via train to bypass road transit halts."
            ]
        },
        {
            title: "Pre-Mobilization Refurbishment for Off-Hire Fleet",
            points: [
                "Complete 100% mechanical overhaul, seal replacement, and load test before re-deploying released fleet."
            ]
        }
    ],
    actionItems: [
        { person: "Dhruv Sharma", task: "Enforce 12:00 PM CRM update deadline and process Rs 10,000 supervisor deductions." },
        { person: "Jitendra Budhauliya", task: "Coordinate Babban's train collection for Hyundai 502 and authorize local parts for JLG 800AJ." },
        { person: "Vinay Singh", task: "Review supervisor compliance before Diwali and protect timesheet billing with clients." },
        { person: "Sushil Mishra", task: "Track Surat rewinding of JK Paper motor and coordinate Cascade OEM support for Bangalore." },
        { person: "Sandeep Kumar", task: "Finish Hyundai 510 mast and motor assembly today; inspect Unit 167014 rotary motor." },
        { person: "Banarasi Yadav", task: "Post docket 2423... slip to group and lead overhaul of 4 released units at Sanand depot." },
        { person: "Dheeraj Dubey & Imran", task: "Log daily CRM updates without fail and assist Pradeep on Sanand S-65 emergency circuit." },
        { person: "Deenanath Maurya", task: "Expedite technician and operator gate passes directly with client P&M at Sanand." },
        { person: "Anuj", task: "Travel to Bangalore and Vizag with seal samples to fix clamp manifold and reach truck." },
        { person: "Pravesh Yadav", task: "Secure client gate pass and shift 6-12 traction batteries into locked room in Assam." }
    ]
};

// ============================================================================
// MEETING DATA: 2026-10-06 (Tuesday - Today's Meeting)
// ============================================================================
const meeting06 = {
    id: "meet-2026-10-06",
    title: "06-10-2026",
    date: "2026-10-06",
    dateDisplay: "06-10-2026",
    dateFormatted: "06-10-2026",
    focus: "Lucknow Hyundai steering leaks, Sanand S-65 gas spring & harness repairs, Mundra vendor payment clearance & 8-battery bank fitment, and Baroda tire challan logistics ahead of CM visit.",
    isHoliday: false,
    holidayName: "",
    noMeetingHeld: false,
    notRecorded: false,
    breakdowns: [
        {
            site: "Lucknow Project Site — Hyundai 20 Forklift (Unit 1)",
            model: "Hyundai 20 Forklift",
            serialNumber: "Unit 1",
            location: "Lucknow Project Site",
            issue: "Persistent hydraulic fluid leakage from steering orbitrol unit over past 1.5 months.",
            action: "Technician Amit scheduled to mobilize from Patna to Lucknow to inspect and replace steering seals.",
            logistics: "Replacement steering seal kit requisitioned from central store.",
            clarification: "Steering leaks pose floor contamination hazards and risk steering lockup.",
            pendingIssue: "Amit arrival from Patna to replace steering cylinder seals and test.",
            status: "Under Investigation — Technician Amit scheduled to arrive from Patna."
        },
        {
            site: "Lucknow Project Site — Hyundai 20 Forklift (Unit 2)",
            model: "Hyundai 20 Forklift",
            serialNumber: "Unit 2",
            location: "Lucknow Project Site",
            issue: "Steering column hydraulic oil leakage ongoing for over one month without CRM logging.",
            action: "Rahul Singh instructed to register open ticket in CRM and coordinate Amit site visit.",
            logistics: "Steering unit seal kit staged with regional service engineer.",
            clarification: "All three Lucknow Hyundai units require simultaneous steering overhauls.",
            pendingIssue: "Complete CRM ticket entry and execute seal overhaul upon Amit arrival.",
            status: "Logged for Service — Awaiting technician Amit deployment from Patna."
        },
        {
            site: "Lucknow Project Site — Hyundai 20 Forklift (Unit 3)",
            model: "Hyundai 20 Forklift",
            serialNumber: "Unit 3",
            location: "Lucknow Project Site",
            issue: "Brand new unit arrived 10 days ago exhibiting pre-commissioning steering oil leakage.",
            action: "Amit assigned to perform pre-commissioning PDI and seal replacement before client handover.",
            logistics: "Pre-commissioning seal kit and hydraulic top-up oil arranged locally.",
            clarification: "Client refused formal handover until factory oil leakage is fully eliminated.",
            pendingIssue: "Complete pre-commissioning PDI and eliminate steering leak before client sign-off.",
            status: "Pre-Commissioning Defect — Factory steering leak rectification pending."
        },
        {
            site: "Ratlam Project Site (MP) — New Sale Machine (Unit 1)",
            model: "MEWP Access Equipment",
            serialNumber: "Ratlam Sale Unit 1",
            location: "Ratlam Project Site (MP)",
            issue: "Enclosure safety door hinge misalignment prevents latching on newly sold unit.",
            action: "Sushil Mishra coordinating with OEM support to supply replacement door gate under warranty.",
            logistics: "Warranty replacement gate requisition submitted to manufacturer.",
            clarification: "Direct sale equipment must meet zero-defect standard before buyer inspection.",
            pendingIssue: "Procure and align replacement enclosure door under OEM warranty.",
            status: "OEM Warranty Claim — Replacement door gate requested from manufacturer."
        },
        {
            site: "Ratlam Project Site (MP) — New Sale Machine (Unit 2)",
            model: "MEWP Access Equipment",
            serialNumber: "Ratlam Sale Unit 2",
            location: "Ratlam Project Site (MP)",
            issue: "Access door damaged in transit, causing interlock switch engagement failure.",
            action: "Field technician adjusting hinges while warranty replacement gate is being processed.",
            logistics: "Hinge alignment kit dispatched from regional depot.",
            clarification: "Additional 4 units dispatching tonight; defect must not recur on new batch.",
            pendingIssue: "Fit warranty replacement gate and verify safety interlock switch operation.",
            status: "Under Rectification — Temporary hinge adjustment done; warranty gate awaited."
        },
        {
            site: "Greater Noida Sension Site — Electric Stacker / Forklift",
            model: "Electric Stacker",
            serialNumber: "Sension Unit",
            location: "Greater Noida Sension Site",
            issue: "Steering angle sensor failed, triggering controller fault and steering lockout.",
            action: "Technician deployed on site; replacement steering sensor requisitioned from store.",
            logistics: "Steering angle sensor dispatched from central warehouse.",
            clarification: "Unit immobilized inside warehouse aisle; requires urgent sensor swap.",
            pendingIssue: "Install replacement steering sensor and calibrate zero-point angle.",
            status: "Awaiting Spares — Replacement steering sensor in transit to site."
        },
        {
            site: "Shreeram Project Site — Electric Stacker",
            model: "Electric Stacker",
            serialNumber: "Shreeram Unit",
            location: "Shreeram Project Site",
            issue: "Hydraulic lift cylinder inoperative; stacker fails to elevate loaded pallets.",
            action: "Service engineer dispatched on site to diagnose lift solenoid valve and pump pressure.",
            logistics: "Hydraulic pressure testing gauge and solenoid spares mobilized.",
            clarification: "Forklift driver unable to load racks; ticket opened for immediate action.",
            pendingIssue: "Identify hydraulic pressure drop cause and restore mast lifting function.",
            status: "Under Investigation — Service technician troubleshooting lift hydraulics on site."
        },
        {
            site: "PG Kasna Site — 2-Ton Forklift",
            model: "2-Ton Forklift",
            serialNumber: "PG Kasna 2T",
            location: "PG Kasna Site",
            issue: "Second hydraulic hose burst under pressure immediately after first hose was replaced yesterday.",
            action: "Operator removed ruptured hose; technician having heavy-duty 2-wire hose crimped at workshop.",
            logistics: "Local hose crimping workshop engaged for custom high-pressure assembly.",
            clarification: "Recurring hose bursts indicate possible system pressure relief valve sticking.",
            pendingIssue: "Fit newly crimped high-pressure hose and verify relief valve calibration.",
            status: "In Progress — Second hose undergoing workshop crimping for re-fitment."
        },
        {
            site: "Vidya Polymer Site — 2-Ton SF Stacker",
            model: "2-Ton SF Stacker",
            serialNumber: "Vidya Polymer Unit",
            location: "Vidya Polymer Site",
            issue: "Equipment chronic stoppage unresolved; client demands immediate removal due to parking space shortage.",
            action: "Sushil Mishra approved mobilization of recovery truck to transport stacker back to yard.",
            logistics: "Recovery flatbed trailer booked to retrieve machine from client facility.",
            clarification: "Client refuses to park non-operational equipment; depot overhaul required.",
            pendingIssue: "Pick up immobilized machine and transport to central workshop.",
            status: "Dehire / Off-hire Scheduled — Recovery vehicle arranged to transport unit to depot."
        },
        {
            site: "Sanand Project Site — Genie S-65 Boom Lift",
            model: "Genie S-65",
            serialNumber: "S6015D-364",
            location: "Sanand Project Site",
            issue: "Engine hood gas spring failed, causing canopy cover to drop automatically during maintenance.",
            action: "Emergency descent circuit rectified by Pradeep; Shiv Uniyal dispatched replacement gas spring.",
            logistics: "Replacement gas spring strut dispatched; ETA 11:00 AM on site.",
            clarification: "Client P&M safety inspection requires all hood latching struts secure.",
            pendingIssue: "Receive gas spring by 11:00 AM and fit on engine canopy cover.",
            status: "Parts En Route — Emergency circuit fixed; canopy gas spring arriving at 11:00 AM."
        },
        {
            site: "Sanand Project Site — JCB / Genie 4046 Scissor Lift",
            model: "JCB / Genie 4046",
            serialNumber: "03605710",
            location: "Sanand Project Site",
            issue: "Wiring harness severed, preventing lower platform controls and extension from functioning.",
            action: "Replacement wiring harness arrived on site; mechanic scheduled to replace harness once gate pass clears.",
            logistics: "Replacement harness received at site gate.",
            clarification: "Cross-rent machine operating with manual workaround; safety audit failure risk.",
            pendingIssue: "Clear mechanic gate pass and install new control wiring harness.",
            status: "Awaiting Gate Pass — Harness delivered; technician gate pass processing underway."
        },
        {
            site: "Sanand Project Site — Genie M600JP Boom Lift",
            model: "Genie M600JP",
            serialNumber: "Unit M600JP",
            location: "Sanand Project Site",
            issue: "Severe hydraulic fluid leakage occurs overnight when machine is parked idle.",
            action: "Khemchand instructed to inspect boom cylinder glands and pipe connections for hidden cracks.",
            logistics: "Seal washer kit and hydraulic drip collection tray staged on site.",
            clarification: "Nighttime oil loss creates environmental violation risks on client site.",
            pendingIssue: "Pinpoint exact leak origin between cylinder gland and hose joint.",
            status: "Under Investigation — Overnight leakage source tracing in progress."
        },
        {
            site: "Sanand Project Site — JCB / Genie 4550 Scissor Lift",
            model: "JCB / Genie 4550",
            serialNumber: "0030 / 8393",
            location: "Sanand Project Site",
            issue: "Platform falsely triggers overload alarm and disables lift when 3 personnel board deck.",
            action: "Dheeraj Dubey and Deepak assigned to calibrate platform hydraulic load pressure sensor.",
            logistics: "Load calibration weights and pressure gauge staged at Sanand depot.",
            clarification: "False overload stops work intermittently; sensor recalibration required.",
            pendingIssue: "Calibrate pressure transducer and verify 3-person rated payload capacity.",
            status: "Under Calibration — Technicians testing platform pressure sensor setting."
        },
        {
            site: "Sanand CG Power Site — Genie Z-45 Boom Lift",
            model: "Genie Z-45",
            serialNumber: "CG Power Unit",
            location: "Sanand CG Power Site",
            issue: "Operational but 48V onboard charger defective and main line contactor chattering.",
            action: "Khemchand filled Google Form requisition; Pardeep Tomar instructed to dispatch 48V charger.",
            logistics: "48V industrial battery charger and DC contactor staged for dispatch from central stores.",
            clarification: "Operating without onboard charging risks battery bank deep discharge.",
            pendingIssue: "Dispatch 48V battery charger and contactor from central inventory.",
            status: "Spares Requisitioned — Google Form submitted; central store dispatch pending."
        },
        {
            site: "Bhatinda Project Site — Genie S-65 Boom Lift",
            model: "Genie S-65",
            serialNumber: "14244",
            location: "Bhatinda Project Site",
            issue: "Load cell display unit malfunctioning and harness damaged, causing intermittent cutoffs.",
            action: "Satendra Kumar submitted requisition for load cell display box and sensor harness.",
            logistics: "Load cell display unit packaged for courier dispatch from store.",
            clarification: "Faulty load display causes false platform trip; replacement essential.",
            pendingIssue: "Receive replacement load cell display and complete on-site wiring.",
            status: "Spares Processing — Load cell display requisition logged by Satendra."
        },
        {
            site: "Jamnagar Project Site — Genie S-65 Boom Lift",
            model: "Genie S-65",
            serialNumber: "1435",
            location: "Jamnagar Project Site",
            issue: "Engine starting difficulty with automatic surging / hunting RPM surges during operation.",
            action: "Mantu Dada assigned to check electronic throttle actuator, fuel filters, and governor sensor.",
            logistics: "Throttle actuator sensor and fuel filter kit staged at regional depot.",
            clarification: "Governor speed fluctuation compromises steady boom elevation control.",
            pendingIssue: "Mantu Dada site inspection to calibrate throttle actuator and fuel feed.",
            status: "Technician Assigned — Mantu Dada deployed to diagnose engine RPM hunting."
        },
        {
            site: "Mundra Project Site — Genie S-60 Boom Lift",
            model: "Genie S-60",
            serialNumber: "Mundra S-60",
            location: "Mundra Project Site",
            issue: "Auxiliary emergency descent system inoperative; machine grounded under client breakdown status.",
            action: "Chunnilal Patel instructed to assign technician to trace auxiliary pump wiring and switch.",
            logistics: "Emergency descent relay and auxiliary motor spares staged in depot.",
            clarification: "Client requires functional auxiliary emergency descent before issuing daily work permits.",
            pendingIssue: "Repair auxiliary emergency circuit to restore safety certification.",
            status: "Breakdown Grounded — Auxiliary emergency descent troubleshooting in progress."
        },
        {
            site: "Mundra Project Site — JLG 1350SJ Boom Lift",
            model: "JLG 1350SJ",
            serialNumber: "Unit 1350",
            location: "Mundra Project Site",
            issue: "Main hydraulic pressure hose ruptured; dismantled and sent to local vendor shop.",
            action: "Jitendra Budhauliya contacting local hydraulic shop owner to clear payment and collect hose.",
            logistics: "Fabricated hose ready at local shop; awaiting payment release of pending bills.",
            clarification: "Local shop withholding parts due to accumulated credit balance of 5 invoices.",
            pendingIssue: "Clear shop payment with Kaushal and reinstall hydraulic hose on machine.",
            status: "Awaiting Payment Release — Fabricated hose held at local shop pending dues."
        },
        {
            site: "Mundra Project Site — Genie GS-5390 RT Scissor Lift",
            model: "Genie GS-5390 RT",
            serialNumber: "1141",
            location: "Mundra Project Site",
            issue: "Engine fails to crank and start due to electrical ignition feed breakdown last night.",
            action: "Chunnilal deployed technician Dada to inspect starter relay, ignition switch, and fuse box.",
            logistics: "Starter motor relay and ignition switch spares staged at Mundra.",
            clarification: "Breakdown occurred during night shift; unit needed urgently for morning tasks.",
            pendingIssue: "Diagnose electrical starting fault and restart engine on site.",
            status: "Under Repair — Technician Dada troubleshooting starting electrical circuit."
        },
        {
            site: "Mundra Project Site — Genie Z-45 Boom Lift (Pocket 1)",
            model: "Genie Z-45",
            serialNumber: "Pocket 1 Unit",
            location: "Mundra Project Site",
            issue: "Testing and commissioning incomplete; delayed due to lack of client operating permit.",
            action: "Chunnilal performing functional testing today; client handover scheduled upon successful run.",
            logistics: "Test run inspection sheet prepared for client site engineer.",
            clarification: "Successful full-cycle testing required before billing commences.",
            pendingIssue: "Complete load testing today and obtain client commissioning sign-off.",
            status: "Testing & Commissioning — Final functional test run underway for client handover."
        },
        {
            site: "Rajkot Depot / Dholera Transfer — MEWP Boom Lift",
            model: "MEWP Boom Lift",
            serialNumber: "Rajkot Dholera Unit",
            location: "Rajkot Depot",
            issue: "Grounded awaiting 4 traction batteries to enable transfer to Dholera project.",
            action: "Imran Khan confirmed 4 batteries releasing today from central depot to Rajkot.",
            logistics: "4 heavy-duty traction batteries scheduled for truck dispatch today.",
            clarification: "Equipment must be mobilized to Dholera immediately upon battery installation.",
            pendingIssue: "Receive 4 batteries, complete bank wiring, and load unit onto Dholera trailer.",
            status: "Batteries Dispatched — 4 batteries in transit to Rajkot for Dholera mobilization."
        },
        {
            site: "Baroda Refinery Site — 100ft Boom Lift",
            model: "100ft Boom Lift",
            serialNumber: "Baroda 100ft",
            location: "Baroda Refinery Site",
            issue: "Replacement solid tires arrived at depot but cannot enter refinery due to missing paper challan.",
            action: "Banarasi Yadav and Jitendra escalating to generate dispatch delivery challan immediately.",
            logistics: "Tires physically staged; transport paper challan required for gate entry.",
            clarification: "Refinery enters total lockdown for CM visit on October 14; tires must be fitted prior.",
            pendingIssue: "Issue formal paper delivery challan and transport tires inside refinery.",
            status: "Documentation Pending — Tires staged; entry blocked awaiting paper delivery challan."
        },
        {
            site: "Sanand Project Depot — Genie 150ft Boom Lift",
            model: "Genie 150",
            serialNumber: "Unit 150",
            location: "Sanand Project Depot",
            issue: "Main boom hydraulic elevation cylinder seal leaking during depot inspection.",
            action: "Vinod Pal requisitioned cylinder seal kit; instructed to execute seal swap in workshop bay.",
            logistics: "Cylinder seal kit allocated from Sanand depot maintenance inventory.",
            clarification: "Off-hire machine overhaul requires 100% leak-free hydraulic certification.",
            pendingIssue: "Dismantle main boom cylinder head and install replacement seal kit.",
            status: "Depot Maintenance — Main boom cylinder seal replacement scheduled in bay."
        }
    ],
    parts: [
        { part: "Gas Spring Strut (Genie S-65 Canopy)", context: "Sanand Site / Unit S-65", statusNextSteps: "Dispatched by Shiv Uniyal; delivery by 11:00 AM to replace failing hood strut." },
        { part: "Platform Wiring Harness Assembly", context: "Sanand Site / Unit 4046", statusNextSteps: "Arrived at site gate; technician scheduled to install once gate pass clears." },
        { part: "Hydraulic Pressure / Overload Transducer", context: "Sanand Site / Unit 4550", statusNextSteps: "Staged at site depot; technician calibrating to clear false 3-man overload alarm." },
        { part: "48V Industrial Charger & Contactor", context: "Sanand CG Power Site / Unit Z-45", statusNextSteps: "Requisitioned via Google Form; Pardeep Tomar processing central store dispatch." },
        { part: "Surya 6V 440Ah Traction Batteries (8 Units)", context: "Mundra Project Site / Unit 5390", statusNextSteps: "Consignment in transit; Chunnilal following up courier delivery for bank fitment." },
        { part: "Load Cell Display Box & Sensor Harness", context: "Bhatinda Site / Unit S-65 (S/N: 14244)", statusNextSteps: "Packaged for courier dispatch to resolve intermittent load sensing cutoffs." },
        { part: "Custom 2-Wire High-Pressure Hydraulic Hose", context: "Mundra Site / Unit 1350", statusNextSteps: "Fabricated at local shop; awaiting payment release of pending bills to collect." },
        { part: "Heavy-Duty Swaged Hydraulic Hose", context: "PG Kasna Site / 2-Ton Forklift", statusNextSteps: "Undergoing workshop swaging after first replacement ruptured under pressure." },
        { part: "Heavy Solid Drive Tires & Delivery Challan", context: "Baroda Refinery Site / 100ft Boom", statusNextSteps: "Consignment staged; awaiting billing challan before plant CM VIP lockdown." },
        { part: "Traction Batteries (4 Units)", context: "Rajkot Depot to Dholera Transfer", statusNextSteps: "Scheduled for truck dispatch today to mobilize transferred boom lift." },
        { part: "Main Boom Cylinder Seal Kit", context: "Sanand Depot / Genie 150ft", statusNextSteps: "Allocated from depot inventory for workshop overhaul of released machine." },
        { part: "Hyundai Orbitrol Steering Valve Seals", context: "Lucknow Site / Units 1, 2, 3", statusNextSteps: "Technician Amit mobilizing from Patna to inspect recurring steering leaks." }
    ],
    directives: [
        {
            title: "Mandatory CRM Registration for All Breakdowns",
            points: [
                "Log all equipment failures, hydraulic bursts, and sensor faults into CRM immediately; informal WhatsApp reporting alone is prohibited.",
                "Attach photos, serial numbers, and signed work sheets to every CRM ticket before initiating repairs."
            ]
        },
        {
            title: "Strict Field Vendor Payment Clearance & Credit Discipline",
            points: [
                "Clear recurring local vendor invoices promptly (e.g. Mundra Rs 10,592 battery bill & hydraulic hose shops) to prevent technician detention and parts withholding.",
                "Establish verified secondary vendors to avoid single-supplier bottlenecks on critical project sites."
            ]
        },
        {
            title: "Pre-VIP Plant Lockdown Equipment Extraction Policy",
            points: [
                "Expedite tire installation and challan documentation at Baroda Refinery ahead of the October 14 Chief Minister visit.",
                "Clear all released and maintenance fleet from VIP plant premises to prevent gate impoundment and external demurrage."
            ]
        },
        {
            title: "New Machine Pre-Delivery Inspection (PDI) Protocol",
            points: [
                "Inspect all new sales and rental fleet (e.g., MP Ratlam units & Lucknow Hyundai forklifts) for door alignment and steering seals prior to client handover.",
                "File immediate OEM warranty claims on factory defects discovered during commissioning."
            ]
        }
    ],
    actionItems: [
        { person: "Rahul Singh", task: "Inspect Greater Noida sites, coordinate Lucknow steering leak repairs with Amit, and manage Ratlam door warranty claims." },
        { person: "Sushil Mishra", task: "Register all Noida and regional breakdown tickets in CRM, and coordinate with OEM for Ratlam replacement door gates." },
        { person: "Imran Khan", task: "Expedite dispatch of Rajkot traction batteries for Dholera, and follow up 48V charger delivery for CG Power Z-45." },
        { person: "Khemchand", task: "Inspect M600JP hydraulic cylinder fittings at Sanand, and coordinate 4046 harness fitment once gate passes clear." },
        { person: "Jitendra Budhauliya", task: "Clear Mundra vendor payment (Rs 10,592) with Kaushal, follow up Baroda tire challan, and monitor technician gate passes." },
        { person: "Satendra Kumar", task: "Coordinate Jamnagar S-65 RPM surging inspection with Mantu Dada, and dispatch Bhatinda load cell display unit." },
        { person: "Chunnilal Patel", task: "Collect fabricated 1350 hydraulic hose from local shop upon payment, and oversee Mundra 8-battery installation." },
        { person: "Dheeraj Dubey", task: "Install S-65 gas spring arriving at 11:00 AM, complete Pradeep gate pass, and calibrate 4550 overload sensor." },
        { person: "Vinod Pal", task: "Follow up Baroda 100ft tire transport paper challan, and execute Genie 150 main boom cylinder seal replacement." },
        { person: "Banarasi Yadav", task: "Coordinate Baroda tire transport delivery, and support depot overhauls of released off-hire machines." }
    ]
};

async function syncMeetings() {
    console.log('🚀 Synchronizing October 5 and October 6 Meetings...');

    // 1. Write local JSON files
    const octDir = path.join(ROOT_DIR, 'src/data/meetings/2026/10');
    if (!fs.existsSync(octDir)) fs.mkdirSync(octDir, { recursive: true });

    const file05 = path.join(octDir, '05.json');
    const file06 = path.join(octDir, '06.json');

    fs.writeFileSync(file05, JSON.stringify(meeting05, null, 2), 'utf8');
    fs.writeFileSync(file06, JSON.stringify(meeting06, null, 2), 'utf8');
    console.log(`📁 Wrote ${file05}`);
    console.log(`📁 Wrote ${file06}`);

    // 2. Synchronize to Supabase
    const meetings = [meeting05, meeting06];

    for (const m of meetings) {
        console.log(`\n⏳ Syncing ${m.date} (${m.id}) to Supabase...`);

        // Upsert meeting master record
        const meetingRecord = {
            id: m.id,
            date: m.date,
            title: m.title,
            focus: m.focus,
            is_holiday: Boolean(m.isHoliday),
            holiday_name: m.holidayName || null,
            no_meeting_held: Boolean(m.noMeetingHeld),
            not_recorded: Boolean(m.notRecorded),
            breakdowns_count: m.breakdowns.length,
            parts_count: m.parts.length,
            directives_count: m.directives.length,
            action_items_count: m.actionItems.length,
            updated_at: new Date().toISOString()
        };

        const { error: mErr } = await supabase
            .from('meetings')
            .upsert(meetingRecord, { onConflict: 'id' });

        if (mErr) {
            console.error(`❌ Error upserting meeting ${m.id}:`, mErr.message);
            continue;
        }
        console.log(`  ✅ Master record upserted: ${m.date}`);

        // Delete existing child records for clean idempotent sync
        await Promise.all([
            supabase.from('breakdown_machines').delete().eq('meeting_id', m.id),
            supabase.from('meeting_parts').delete().eq('meeting_id', m.id),
            supabase.from('meeting_directives').delete().eq('meeting_id', m.id),
            supabase.from('meeting_action_items').delete().eq('meeting_id', m.id)
        ]);

        // Insert breakdown_machines
        const machineRows = m.breakdowns.map(b => ({
            meeting_id: m.id,
            model: b.model,
            serial_number: b.serialNumber,
            site: b.location || b.site,
            issue: b.issue,
            action: b.action,
            logistics: b.logistics || null,
            clarification: b.clarification || null,
            pending_issue: b.pendingIssue || null,
            status: b.status || 'Active Breakdown'
        }));

        const { error: bErr } = await supabase.from('breakdown_machines').insert(machineRows);
        if (bErr) console.error(`  ❌ Error inserting machines for ${m.id}:`, bErr.message);
        else console.log(`  ✅ Inserted ${machineRows.length} machines`);

        // Insert meeting_parts
        const partRows = m.parts.map(p => ({
            meeting_id: m.id,
            part_name: p.part,
            equipment_context: p.context,
            status_next_steps: p.statusNextSteps
        }));
        const { error: pErr } = await supabase.from('meeting_parts').insert(partRows);
        if (pErr) console.error(`  ❌ Error inserting parts for ${m.id}:`, pErr.message);
        else console.log(`  ✅ Inserted ${partRows.length} parts`);

        // Insert meeting_directives
        const directiveRows = m.directives.map(d => ({
            meeting_id: m.id,
            title: d.title,
            points: d.points
        }));
        const { error: dErr } = await supabase.from('meeting_directives').insert(directiveRows);
        if (dErr) console.error(`  ❌ Error inserting directives for ${m.id}:`, dErr.message);
        else console.log(`  ✅ Inserted ${directiveRows.length} directives`);

        // Insert meeting_action_items
        const actionRows = m.actionItems.map(a => ({
            meeting_id: m.id,
            person: a.person,
            task: a.task
        }));
        const { error: aErr } = await supabase.from('meeting_action_items').insert(actionRows);
        if (aErr) console.error(`  ❌ Error inserting action items for ${m.id}:`, aErr.message);
        else console.log(`  ✅ Inserted ${actionRows.length} action items`);
    }

    console.log('\n🎉 ALL MEETINGS SYNCHRONIZED TO SUPABASE!');
}

syncMeetings().catch(err => {
    console.error('Fatal sync error:', err);
    process.exit(1);
});

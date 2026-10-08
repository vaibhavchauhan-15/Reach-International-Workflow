/**
 * Reach International Operations - Daily Meeting Sync (07-09-2026 & 08-09-2026)
 *
 * Implements strict Reach International standards:
 * - 100% Cloud-Native ingestion (zero static JSON files in src/data/)
 * - Strictly ONE machine per breakdown card
 * - Concise, single-line informative fields across all sections
 * - Accurate English translation and distillation of raw Hindi meeting transcripts
 */

import { syncDailyMeeting } from './sync-daily-meeting.js';

export const meeting07 = {
    id: "meet-2026-09-07",
    title: "07-09-2026",
    date: "2026-09-07",
    dateFormatted: "07-09-2026",
    focus: "Sanand S-65 boom height failure & gate pass protocol, Mundra JCB 45 battery PO, Bina 120ft load cell, Haldia harness, and Hardoi Palfinger discharge.",
    isHoliday: false,
    holidayName: "",
    breakdowns: [
        {
            site: "Sanand Project Site",
            model: "Genie S-65",
            serialNumber: "Unit S-65",
            issue: "Boom stuck raised at full elevation with broken canopy gas springs causing hood to drop unassisted during safety inspection.",
            action: "Deepak and Dhiraj coordinating site entry to inspect boom lowering hydraulic circuit and fit replacement gas springs.",
            logistics: "Canopy gas springs in transit to Sanand site from central store.",
            clarification: "Tata safety inspectors refused green sticker approval because unassisted canopy drops automatically upon opening.",
            pendingIssue: "Fit replacement gas springs and inspect lowering valve circuit to bring boom down safely.",
            status: "Breakdown at Height — Boom stuck raised; canopy gas spring replacement and lowering check pending."
        },
        {
            site: "Sanand Project Site",
            model: "Electric Scissor Lift",
            serialNumber: "1472",
            issue: "Ground panel function failure and electrical drive cutout immobilizing the scissor lift.",
            action: "Deepak and Khemchand completed repairs on the electrical drive and ground control panel.",
            logistics: "Replacement electrical components fitted directly on site.",
            clarification: "Unit successfully restored and operational verification completed on ground controls.",
            pendingIssue: "Conduct platform control testing and obtain operational sign-off from site supervisor.",
            status: "Operational — Ground control panel and electrical drive restored by Deepak and Khemchand."
        },
        {
            site: "Sanand Project Site",
            model: "Fleet Equipment Unit",
            serialNumber: "0.4-Panel",
            issue: "Electrical power supply failing to reach busbar in 0.4 panel, causing complete power cutout.",
            action: "Satendra Kumar assigned to inspect electrical incoming busbar and panel terminations.",
            logistics: "Multimeter diagnostic tools staged on site.",
            clarification: "Incoming panel power supply defect preventing machine operation on site.",
            pendingIssue: "Check incoming supply connections to panel busbar and restore operational power feed.",
            status: "Breakdown — Power supply failure to 0.4 panel busbar under active investigation."
        },
        {
            site: "Sanand Tata Micron Site",
            model: "Fleet Operations (76 Units)",
            serialNumber: "Sanand Fleet",
            issue: "High risk of pass cancellation across 76-machine fleet under mandatory 5-day biometric face punching rule.",
            action: "Dhiraj submitting Pradeep's pass paperwork; Ranjan being permanently transferred from Delhi to assist field team.",
            logistics: "Hari and Dinesh coordinating digital PDF pass documentation and email uploads.",
            clarification: "Tata Micron automatically deletes pass slots if personnel miss face punching for 5 days without prior notice.",
            pendingIssue: "Obtain gate pass approvals for Pradeep and Ranjan to ensure required 3-man technician presence.",
            status: "Administrative Follow-up — Gate pass paperwork submitted for Pradeep and Ranjan."
        },
        {
            site: "Mundra Project Site",
            model: "JCB 45",
            serialNumber: "JCB 45-Mundra",
            issue: "Machine grounded since September 3rd due to exhaustion of two 6V 400Ah traction batteries.",
            action: "Sushil Mishra and Dinesh raising urgent Purchase Order for two 6V 400Ah batteries (~Rs 56,000–57,000).",
            logistics: "Direct vendor dispatch to Mundra planned upon PO commercial approval.",
            clarification: "OEM warranty denied as machine was commissioned prior to April 2026 (1-year warranty expired).",
            pendingIssue: "Issue commercial purchase order and expedite dispatch of 2 replacement traction batteries.",
            status: "Breakdown Since Sept 3 — Out of warranty; PO placement for 2 traction batteries pending."
        },
        {
            site: "Mundra Project Site",
            model: "60ft Boom Lift",
            serialNumber: "Mundra 60ft",
            issue: "Traction battery bank degraded, requiring emergency battery bank replacement.",
            action: "8 batteries previously dispatched via commercial taxi/transport from yard staged for installation.",
            logistics: "8 batteries delivered to Mundra via commercial transport.",
            clarification: "Dedicated battery stock transferred to maintain uptime across Mundra's 80 boom lifts.",
            pendingIssue: "Complete battery bank fitment and verify machine under operating load.",
            status: "Batteries In Yard — 8 replacement batteries arrived on site awaiting installation."
        },
        {
            site: "Bina Project Site",
            model: "120ft Boom Lift",
            serialNumber: "Unit 120",
            issue: "Water ingress from heavy monsoon rains halted operations; load cell and lighting fault logged.",
            action: "Ram Babu dispatched to Bina to service load cell and light fittings as rain ceased.",
            logistics: "Load cell and lights dispatched with technician; SSLE junction box transit follow-up active.",
            clarification: "4 machines operational at Bina; unit 120 resuming service post heavy monsoon rains.",
            pendingIssue: "Install replacement load cell, reconnect lights, and calibrate safety circuit.",
            status: "Technician On Site — Ram Babu arrived at Bina to service load cell and electricals."
        },
        {
            site: "Hardoi Project Site",
            model: "Palfinger 12m",
            serialNumber: "Palfinger 12",
            issue: "Battery bank completely discharges within 2 hours after full 8–10 hour charging cycle.",
            action: "Umesh Kumar obtaining battery nameplate photos; Jitendra arranging technician check from Lucknow depot.",
            logistics: "Local replacement battery bank sourcing under review in Lucknow depot.",
            clarification: "Severe specific gravity drop preventing standard shift operation on site.",
            pendingIssue: "Inspect individual cell voltages and deploy replacement traction batteries.",
            status: "Battery Breakdown — Rapid discharge after 2 hours; replacement batteries required."
        },
        {
            site: "Haldia Project Site",
            model: "150ft Boom Lift",
            serialNumber: "Haldia 150ft",
            issue: "Main boom control feel issue pending 2–3 months; 15–16 core wiring harness required.",
            action: "Vinod Pal repairing internal wiring, horn, and lights inside yard; Jitendra ordering 15–16 core harness.",
            logistics: "15–16 core multi-core cable harness being ordered locally.",
            clarification: "CM visit restrictions prevent taking machine outside yard to avoid external crane/rental expenses.",
            pendingIssue: "Procure wiring harness and execute major boom repair after yard release on the 15th.",
            status: "Yard Restricted — Internal wiring and horn fixed; main boom harness on order."
        },
        {
            site: "Kota Project Site",
            model: "3-Ton Forklift",
            serialNumber: "33459",
            issue: "Forklift grounded due to battery failure; boom lift on site also facing battery shortage.",
            action: "Jitendra Budhauliya logging battery replacement indent in central equipment tracker.",
            logistics: "Regional battery allocation being evaluated between Bangalore and Delhi depots.",
            clarification: "Serial number 33459 confirmed during operational roll call.",
            pendingIssue: "Finalize battery allocation and dispatch replacement bank to Kota.",
            status: "Breakdown — Battery exhausted; replacement battery pack required."
        },
        {
            site: "Anuppur Project Site",
            model: "Genie Z-135",
            serialNumber: "Z-135",
            issue: "Electronic control card failure immobilizing platform drive and lift functions.",
            action: "Software updated on electronic card; Nirbhay and Rajkishore conducted overnight video call to rectify wiring.",
            logistics: "Programmed PCB card bench-tested and delivered to site.",
            clarification: "Card bench-tested successfully; on-site wiring fault identified during remote video diagnostics.",
            pendingIssue: "Rectify harness wiring connections and perform load testing.",
            status: "Under Field Diagnostics — Card software updated; wiring fault being rectified."
        },
        {
            site: "Saint-Gobain Project Site",
            model: "Forklift 502",
            serialNumber: "Unit 502",
            issue: "Mechanical and electrical breakdown; awaiting replacement spare parts from central warehouse.",
            action: "Shiv Uniyal checking central warehouse inventory to release pending spares today.",
            logistics: "Spare parts dispatch scheduled upon store inventory clearance.",
            clarification: "Machine grounded alongside unit 510 pending client operational clearance.",
            pendingIssue: "Dispatch required replacement parts and assign technician for fitment.",
            status: "Breakdown — Awaiting spare parts dispatch from central store."
        },
        {
            site: "Saint-Gobain Project Site",
            model: "Forklift 510",
            serialNumber: "Unit 510",
            issue: "Forklift non-operational; repair work pending parts and commercial payment approval.",
            action: "Shiv Uniyal coordinating with client regarding payment clearance and parts fitment.",
            logistics: "Requisition logged in parts indent tracker.",
            clarification: "Client payment follow-up active before final repair sign-off.",
            pendingIssue: "Complete parts installation and verify lifting operation under load.",
            status: "Breakdown — Repair pending commercial payment clearance."
        },
        {
            site: "Hindon Air Force Site",
            model: "Hindon Equipment Fleet",
            serialNumber: "Hindon Fleet",
            issue: "Site access temporarily barred due to ongoing 4-day Air Force military parade.",
            action: "Imran Khan coordinating gate clearance to enter site immediately upon parade conclusion.",
            logistics: "Security documentation and worker Aadhaar clearances submitted.",
            clarification: "Permanent government customer; 2024 invoice payment follow-up handled with Saurabh Sir.",
            pendingIssue: "Await parade conclusion to resume on-site machine servicing and invoice sign-offs.",
            status: "Access Restricted — Military parade in progress; gate entry scheduled after completion."
        },
        {
            site: "Jamnagar Project Site",
            model: "55ft Boom Lift",
            serialNumber: "Unit 55",
            issue: "Operational servicing and technical inspection required across site fleet (7–8 machines).",
            action: "Jitendra dispatching Sandeep to Jamnagar today to inspect and service unit 55.",
            logistics: "Travel arrangements confirmed for Sandeep to Jamnagar.",
            clarification: "Jamnagar fleet comprises 7–8 machines requiring dedicated technician presence.",
            pendingIssue: "Sandeep to arrive on site and carry out preventive maintenance and repair.",
            status: "Technician Dispatched — Sandeep traveling to Jamnagar for unit 55 servicing."
        }
    ],
    parts: [
        { part: "Canopy Gas Springs", context: "Genie S-65, Sanand Project Site", statusNextSteps: "Dispatched from central store; awaiting on-site delivery." },
        { part: "6V 400Ah Traction Batteries (2 Units)", context: "JCB 45, Mundra Project Site", statusNextSteps: "Urgent PO being processed by Sushil Mishra & Dinesh (~Rs 56,000–57,000)." },
        { part: "15–16 Core Multi-Core Wiring Harness", context: "150ft Boom Lift, Haldia Project Site", statusNextSteps: "Local purchase order placed by Jitendra; awaiting delivery." },
        { part: "Load Cell & Light Fittings", context: "Unit 120, Bina Project Site", statusNextSteps: "Delivered to site with technician Ram Babu for installation." },
        { part: "SSLE Junction Box", context: "Bina Project Site", statusNextSteps: "Transit follow-up active with logistics team." },
        { part: "3-Ton Traction Battery Bank", context: "Forklift 33459, Kota Project Site", statusNextSteps: "Indent logged in tracker; regional depot allocation pending." },
        { part: "12m Scissor Lift Battery Bank", context: "Palfinger 12m, Hardoi Project Site", statusNextSteps: "Discharge logs verified; replacement pack requisitioned from Lucknow." },
        { part: "Electronic Control Card & Harness", context: "Genie Z-135, Anuppur Project Site", statusNextSteps: "Software updated; video call wiring rectification completed." },
        { part: "Forklift Replacement Spares", context: "Forklift 502, Saint-Gobain Project Site", statusNextSteps: "Inventory check underway to release parts from central warehouse." }
    ],
    directives: [
        {
            title: "Strict Biometric Punching & Gate Pass Retention",
            points: [
                "All field technicians must punch in/out on biometric face scanners every 3 to 5 days without fail.",
                "Tata Micron automatically cancels pass slots if personnel miss face punching for 5 days without notice."
            ]
        },
        {
            title: "Mandatory Notification Prior to Planned Leave",
            points: [
                "Technicians proceeding on leave must surrender gate passes and notify site supervisors beforehand.",
                "Unreported absences result in gate pass deletion and up to 15-day delays for new approvals."
            ]
        },
        {
            title: "AGM vs Lead-Acid Charger Compatibility Protocol",
            points: [
                "Technicians must verify charger profiles before connecting flooded lead-acid batteries to prevent cell damage.",
                "Using uncalibrated AGM chargers on lead-acid banks accelerates plate sulfation and ruins batteries."
            ]
        },
        {
            title: "OEM Warranty Verification Protocol",
            points: [
                "Verify machine purchase date and PO terms before processing battery claims with OEMs.",
                "Machines commissioned prior to April 1, 2026 carry 1-year warranty while newer units carry 2-year warranty."
            ]
        }
    ],
    actionItems: [
        { person: "Sushil Mishra & Dinesh", task: "Expedite PO issuance for two 6V 400Ah batteries for Mundra JCB 45 (~Rs 56,000–57,000)." },
        { person: "Jitendra Budhauliya", task: "Order 15–16 core wiring harness for Haldia 150ft boom lift and monitor dispatch." },
        { person: "Jitendra Budhauliya", task: "Deploy Sandeep to Jamnagar for unit 55 servicing and Ram Babu to Bina for unit 120." },
        { person: "Pandit Dhiraj Dubey", task: "Follow up on gate pass approvals for Pradeep and coordinate Ranjan's on-site integration at Sanand." },
        { person: "Deepak & Khemchand", task: "Replace canopy gas springs on Genie S-65 and inspect boom lowering hydraulics once parts arrive." },
        { person: "Umesh Kumar", task: "Obtain battery nameplate photos and discharge test logs for Hardoi Palfinger 12m scissor lift." },
        { person: "Shiv Uniyal", task: "Follow up with Saint-Gobain on commercial invoice payment and release spare parts for forklift 502/510." },
        { person: "Imran Khan", task: "Coordinate with Saurabh Sir on 2024 invoice payment and track Hindon Air Force entry clearance post-parade." },
        { person: "Hari & Dinesh", task: "Provide remote PDF document processing and portal upload support for field technician gate pass applications." }
    ]
};

export const meeting08 = {
    id: "meet-2026-09-08",
    title: "08-09-2026",
    date: "2026-09-08",
    dateFormatted: "08-09-2026",
    focus: "Sanand S-65 safety tag & 4046 pothole harness, JCB 45 charging current leakage, M600JP hydraulic repair window, and Mundra JCB 45 battery PO.",
    isHoliday: false,
    holidayName: "",
    breakdowns: [
        {
            site: "Sanand Tata Micron Site",
            model: "JCB Scissor Lift",
            serialNumber: "3362413",
            issue: "Recurring electrical intermittent fault reported over last 4 days; machine operating with instability during shifts.",
            action: "Dhiraj and Pradeep deployed to Tata Micron plant to inspect wiring harness and electrical connectors.",
            logistics: "Technician site entry cleared via approved digital gate pass.",
            clarification: "Logged in daily tracker as working with problem rather than total operational breakdown.",
            pendingIssue: "Complete electrical harness diagnostics and clear error code on site.",
            status: "Working with Problem — 4-day recurring electrical issue under on-site investigation."
        },
        {
            site: "Sanand Project Site",
            model: "Genie S-65",
            serialNumber: "Unit S-65",
            issue: "Machine mechanically and electrically restored by Reach team, but grounded awaiting Johnson/Tata safety green tag.",
            action: "Dhiraj coordinating with Johnson site safety office to obtain mandatory safety sticker.",
            logistics: "Safety compliance verification photos and checklist submitted to safety office.",
            clarification: "Technical repair completed; external client safety compliance sign-off pending.",
            pendingIssue: "Secure safety inspector sign-off and green tag release from Johnson office.",
            status: "Ready Awaiting Tag — Technically cleared; awaiting client safety inspector green tag."
        },
        {
            site: "Sanand Project Site",
            model: "JCB 45",
            serialNumber: "3370437",
            issue: "Operator receives electrical current shock during battery charging; scheduled periodic maintenance service also overdue.",
            action: "Jitendra checking warranty coverage (2025 machine); Deepak verifying earthing connections on external distribution board.",
            logistics: "Multimeter and ground leakage tester staged for electrical inspection.",
            clarification: "Similar past fault was caused by site distribution board lacking proper earth ground rather than machine defect.",
            pendingIssue: "Test charging circuit and site power distribution board earthing to eliminate electric shock.",
            status: "Electrical Leakage — Current felt during charging; earthing verification and service pending."
        },
        {
            site: "Sanand Project Site",
            model: "JLG M600JP",
            serialNumber: "300100695",
            issue: "Hydraulic oil leakage from master cylinder tele-boom pipe manifold; running on night shift with risk of safety grounding.",
            action: "Deepak and Dinanath attempted repair but plant prohibited work at active bay; Khemchand to obtain permit for weekend repair.",
            logistics: "Replacement hydraulic O-rings staged for temporary sealing.",
            clarification: "Full manifold rebuild takes several days; temporary O-ring replacement restores operation for 2–3 months.",
            pendingIssue: "Obtain yard transit permit and replace hydraulic cylinder O-rings during Sunday maintenance window.",
            status: "Minor Hydraulic Leak — Operating on night shift; scheduled for O-ring repair over weekend."
        },
        {
            site: "Sanand Project Site",
            model: "Genie GS-4046",
            serialNumber: "GS4046-Pothole",
            issue: "Pothole guard wiring harness damaged, preventing safe machine travel at height.",
            action: "Dhiraj obtaining 6-hour work permit; Pradeep and Deepak assigned to replace pothole guard wiring harness today.",
            logistics: "Replacement pothole guard harness issued from Sanand store.",
            clarification: "Detailed 6-hour replacement job planned to eliminate repetitive drive cutouts.",
            pendingIssue: "Complete 6-hour wiring harness installation and test pothole deployment mechanism.",
            status: "Under Repair — Work permit secured for 6-hour pothole guard harness replacement."
        },
        {
            site: "Sanand Project Site",
            model: "Genie GS-4046",
            serialNumber: "GS4046-Deck",
            issue: "Extension platform deck jammed and fails to extend; client warned of immediate machine grounding if unresolved.",
            action: "Deepak requiring mechanical/hydraulic jack to release and align deck sliders; store tool tracking follow-up initiated.",
            logistics: "Dinanath tasked to purchase replacement heavy-duty jack locally.",
            clarification: "Previous store jack was misplaced between technician Manish Patel and operator Lalit during rainy weather.",
            pendingIssue: "Purchase replacement jack locally and align extension platform deck sliders.",
            status: "Jammed Extension Deck — Client grounding warning; local jack procurement underway for repair."
        },
        {
            site: "Rajkot Project Site",
            model: "Zoomlion 4550",
            serialNumber: "Unit 4550",
            issue: "Traction battery bank degraded; 14-piece limit switch assembly installation pending management policy clearance.",
            action: "Traction batteries scheduled to arrive today or tomorrow; Imran verifying Vinay Sir's approval for limit switch fitting.",
            logistics: "Batteries dispatched from Gujarat vendor; 14 limit switches held in Sanand yard store.",
            clarification: "Management policy inquiry active regarding whether limit switches should be installed directly on client site.",
            pendingIssue: "Receive batteries on site and obtain management confirmation for limit switch installation.",
            status: "Batteries In Transit — Battery delivery expected today/tomorrow; limit switch approval pending."
        },
        {
            site: "Hindon Air Force Site",
            model: "Hindon Equipment Fleet",
            serialNumber: "Hindon Fleet",
            issue: "Final day of 4-day military parade restrictions preventing technician site entry.",
            action: "Imran Khan confirming entry permits will be granted tomorrow morning upon parade completion.",
            logistics: "Gate clearance passes pre-processed for immediate entry.",
            clarification: "Technicians on standby to enter base compound tomorrow for routine inspections and customer billing sign-offs.",
            pendingIssue: "Enter Air Force compound tomorrow morning to inspect fleet and obtain sign-offs.",
            status: "Access Restricted — Parade finishes today; full site entry scheduled for tomorrow morning."
        },
        {
            site: "Regional Fleet Workshop",
            model: "Genie Z-45",
            serialNumber: "Unit Z-45",
            issue: "48V battery charger failing and electrical contactor overheating, shorting, and melting at terminals.",
            action: "Khemchand and Pradeep Tomar arranging local procurement of replacement contactor and 48V charger.",
            logistics: "Local vendor sourcing initiated; technicians instructed to mark installation date on all parts.",
            clarification: "Contactor replacement is standard local procurement; date-stamping mandated across all components.",
            pendingIssue: "Procure 48V charger and heavy-duty contactor, date-mark, and fit onto machine.",
            status: "Electrical Risk — Contactor melting and charger fault; local procurement underway."
        },
        {
            site: "Bina Project Site",
            model: "Bina Equipment Fleet",
            serialNumber: "Bina Fleet",
            issue: "Scheduled delivery of electrical spares and components logged in requisition portal.",
            action: "Pradeep Tomar dispatching requested spares to Bina via express courier.",
            logistics: "Spares consolidated from central store for dispatch.",
            clarification: "Satendra Kumar confirmed serial numbers and submitted requisitions via Google Form.",
            pendingIssue: "Track courier dispatch and ensure arrival at Bina site.",
            status: "Spares Dispatched — Materials package dispatched from store for site delivery."
        },
        {
            site: "Jamnagar Project Site",
            model: "Boom Lift Fleet",
            serialNumber: "Jamnagar Fleet",
            issue: "Engine RPM hunting and calibration issues on site boom lifts requiring experienced engine specialist.",
            action: "Jitendra coordinating to redeploy Mantu from Mundra to Jamnagar once engine overhaul is completed; Deepak also considered.",
            logistics: "Travel clearance being arranged between Mundra and Jamnagar.",
            clarification: "Dedicated engine technician required to troubleshoot RPM regulation and throttle actuator.",
            pendingIssue: "Complete Mundra engine job and mobilize specialist technician to Jamnagar.",
            status: "Specialist Mobilization Planned — Mantu scheduled to transfer to Jamnagar for engine diagnostics."
        },
        {
            site: "Mundra Project Site",
            model: "JCB 45",
            serialNumber: "JCB 45-Mundra",
            issue: "Breakdown persists; 370Ah AGM battery previously sent from Sanand failed under operational load.",
            action: "Dhruv Sharma instructed Hari and Dinesh to coordinate directly and place urgent purchase order for two 440Ah/400Ah batteries.",
            logistics: "Direct vendor dispatch to Mundra requested to bypass intermediate yard delays.",
            clarification: "370Ah battery had insufficient capacity; true 440Ah/400Ah heavy-duty cells required.",
            pendingIssue: "Place direct purchase order and arrange fast-track delivery to Mundra.",
            status: "Breakdown Awaiting PO — Replacement 370Ah battery insufficient; urgent PO for 440Ah batteries required."
        },
        {
            site: "Mundra Project Site",
            model: "JLG 600AJ",
            serialNumber: "Unit 600",
            issue: "Operator basket rotates automatically on its own during operation, creating serious safety hazard.",
            action: "Mantu previously repaired basket 10 days ago; problem recurred, indicating defective rotary limit switch/sensor.",
            logistics: "Rotary control sensor part identification in progress with Pradeep Tomar.",
            clarification: "Machine currently kept operating for light work but uncommanded rotation presents major safety risk.",
            pendingIssue: "Identify exact rotary sensor/switch part number and order replacement immediately.",
            status: "Working with Safety Defect — Basket rotates uncommanded; sensor replacement part identification active."
        },
        {
            site: "Mundra Project Site",
            model: "JLG 860SJ",
            serialNumber: "Unit 860",
            issue: "Engine emitting heavy exhaust smoke and consuming excessive engine oil; grounded since January.",
            action: "Chunnilal Patel preparing machine for comprehensive on-site engine overhaul.",
            logistics: "Engine overhaul kit, rings, gaskets, and oil filters required.",
            clarification: "Long-term breakdown grounded since January; client released machine for full overhaul.",
            pendingIssue: "Dispatch complete engine overhaul kit and initiate teardown with Mantu.",
            status: "Grounded Since January — Heavy engine smoking and oil burn; full engine rebuild planned."
        },
        {
            site: "Mundra Project Site",
            model: "Genie GS-4390 RT",
            serialNumber: "Unit 4390",
            issue: "Marching/drive function cuts out completely when scissor platform is elevated to height.",
            action: "Chunnilal Patel logging defect in CRM group; technician assigned to inspect drive angle sensor and wiring.",
            logistics: "Field multimeter inspection scheduled on site.",
            clarification: "Ground driving operational, but elevated drive cutout stops working during maintenance tasks.",
            pendingIssue: "Inspect platform drive enable circuit and elevation limit switches.",
            status: "Elevated Drive Failure — Marching cut out at height; drive interlock circuit under inspection."
        },
        {
            site: "Rewari Project Site",
            model: "Forklift Fleet (5002 & 3002)",
            serialNumber: "5002 / 3002",
            issue: "Both units in breakdown; spares package dispatched to Rewari depot yesterday.",
            action: "Hari tracking parts delivery; field technician assigned for immediate installation upon package arrival.",
            logistics: "Spare parts dispatched from Delhi depot yesterday via road transport.",
            clarification: "Critical material handling units servicing warehouse client.",
            pendingIssue: "Confirm package arrival at Rewari and complete parts installation.",
            status: "Spares In Transit — Parts dispatched yesterday; on-site installation scheduled upon delivery."
        },
        {
            site: "Vidya Polymer Client Site",
            model: "2-Ton Electric Forklift",
            serialNumber: "Vidya Polymer 2T",
            issue: "Client requisition for 2-ton replacement machine to support factory material handling operations.",
            action: "Dhruv Sharma and Jitendra managing dispatch and commissioning of 2-ton forklift to Vidya Polymer site.",
            logistics: "Transport carrier booked for equipment dispatch.",
            clarification: "Client deployment to replace aging unit.",
            pendingIssue: "Deliver machine to client site, complete commissioning, and obtain client sign-off.",
            status: "Machine Dispatched — 2-ton forklift in transit for client commissioning."
        },
        {
            site: "Visakhapatnam Project Site",
            model: "Rough Terrain RT",
            serialNumber: "Vizag RT",
            issue: "Persistent hydraulic oil leakage reported; client ticket opened with no technician yet on site.",
            action: "Jitendra Budhauliya planning technician travel; Shiv Uniyal coordinating with equipment specialist for replacement seals.",
            logistics: "Hydraulic seal kit part number requested from OEM documentation.",
            clarification: "Machine ticket logged in portal; technician travel booking required.",
            pendingIssue: "Identify hydraulic seal part number and deploy technician to Visakhapatnam.",
            status: "Awaiting Technician — Ticket logged for hydraulic oil leakage; technician deployment pending."
        }
    ],
    parts: [
        { part: "6V 440Ah/400Ah Traction Batteries (2 Units)", context: "JCB 45, Mundra Project Site", statusNextSteps: "Hari & Dinesh punching urgent purchase order for direct vendor dispatch." },
        { part: "48V Battery Charger", context: "Genie Z-45, Regional Fleet Workshop", statusNextSteps: "Local vendor procurement initiated by Pradeep Tomar." },
        { part: "Heavy-Duty Electrical Contactor", context: "Genie Z-45, Regional Fleet Workshop", statusNextSteps: "Procuring locally; installation date to be marked on component." },
        { part: "Pothole Guard Wiring Harness", context: "Genie GS-4046, Sanand Project Site", statusNextSteps: "Issued from Sanand store; 6-hour installation permit secured." },
        { part: "Rotary Control Limit Sensor / Switch", context: "JLG 600AJ, Mundra Project Site", statusNextSteps: "Part identification in progress with store supervisor Pradeep Tomar." },
        { part: "Heavy-Duty Hydraulic/Mechanical Jack", context: "Genie GS-4046, Sanand Store", statusNextSteps: "Dinanath tasked to purchase replacement jack locally today." },
        { part: "Engine Overhaul Gasket & Ring Kit", context: "JLG 860SJ, Mundra Project Site", statusNextSteps: "Requisition submitted to central store for engine rebuild." },
        { part: "Hydraulic Cylinder O-Ring Kit", context: "JLG M600JP, Sanand Project Site", statusNextSteps: "O-rings staged; replacement scheduled during Sunday maintenance window." },
        { part: "Forklift Replacement Spares", context: "Units 5002 & 3002, Rewari Project Site", statusNextSteps: "Dispatched from Delhi depot yesterday; courier tracking active." },
        { part: "Hydraulic Seal Kit", context: "Rough Terrain RT, Visakhapatnam Project Site", statusNextSteps: "Part number lookup underway from OEM documentation." }
    ],
    directives: [
        {
            title: "Part Installation Date-Marking Policy",
            points: [
                "Technicians and supervisors must physically write the exact installation date on every replacement spare part before fitting.",
                "Mandatory date-marking enables accurate component life tracking and simplifies vendor warranty enforcement."
            ]
        },
        {
            title: "Tool Custody and Financial Liability Policy",
            points: [
                "Heavy tools and specialized service gear must be strictly logged in and out of site stores with photo confirmation.",
                "Unreturned or misplaced equipment will be debited directly against technician and supervisor accounts."
            ]
        },
        {
            title: "Weekend Maintenance Windows for Active Plants",
            points: [
                "For machines running night shifts or inside restricted bays, schedule permits specifically for Saturday night and Sunday.",
                "Prevents operational disruptions while allowing unhurried repairs like cylinder O-ring replacements."
            ]
        },
        {
            title: "Proper Earthing Verification on Charging Points",
            points: [
                "Test external distribution board ground earth pins whenever electric shock or leakage is reported during charging.",
                "Rule out site supply grounding faults before dismantling machine chargers or internal wiring."
            ]
        },
        {
            title: "Accurate Battery Ampere-Hour Matching",
            points: [
                "Field teams must never install lower-rated battery banks (e.g., 370Ah instead of 440Ah) on heavy boom lifts.",
                "Verify exact ampere-hour ratings prior to dispatch to prevent premature voltage drops and recurring downtime."
            ]
        }
    ],
    actionItems: [
        { person: "Hari & Dinesh", task: "Coordinate directly to punch purchase order for two 6V 440Ah/400Ah batteries for Mundra JCB 45." },
        { person: "Pradeep Tomar & Khemchand", task: "Procure 48V charger and heavy-duty contactor locally, date-mark components, and dispatch." },
        { person: "Deepak & Dhiraj", task: "Secure 6-hour permit and complete pothole guard wiring harness installation on Genie GS-4046 at Sanand." },
        { person: "Dinanath", task: "Purchase heavy-duty replacement jack locally to service jammed platform deck on GS-4046." },
        { person: "Khemchand", task: "Arrange permit to move JLG M600JP outside plant on Saturday night/Sunday to replace master cylinder O-rings." },
        { person: "Chunnilal Patel & Mantu", task: "Identify rotary sensor part number for unit 600 and initiate engine teardown on unit 860." },
        { person: "Imran Khan", task: "Finalize Air Force security gate clearance for tomorrow morning entry at Hindon." },
        { person: "Shiv Uniyal & Jitendra", task: "Deploy technician to Visakhapatnam for RT hydraulic oil leakage with replacement seal kit." },
        { person: "Hari", task: "Track courier delivery of forklift spares to Rewari depot for units 5002 and 3002." }
    ]
};

async function main() {
    console.log('🚀 Ingesting September 07 and 08 meetings directly into Supabase...');

    console.log('\n--- Syncing September 07, 2026 ---');
    const res07 = await syncDailyMeeting(meeting07);
    console.log(`✅ Sept 07 Synced: ${res07.counts.breakdowns} breakdowns, ${res07.counts.parts} parts, ${res07.counts.directives} directives, ${res07.counts.actionItems} action items.`);

    console.log('\n--- Syncing September 08, 2026 ---');
    const res08 = await syncDailyMeeting(meeting08);
    console.log(`✅ Sept 08 Synced: ${res08.counts.breakdowns} breakdowns, ${res08.counts.parts} parts, ${res08.counts.directives} directives, ${res08.counts.actionItems} action items.`);

    console.log('\n🎉 Both meetings synced atomically into Supabase with zero static files!');
}

if (process.argv[1] && process.argv[1].endsWith('sync-sept-07-08.js')) {
    main().catch(err => {
        console.error('❌ Sync failed:', err);
        process.exit(1);
    });
}

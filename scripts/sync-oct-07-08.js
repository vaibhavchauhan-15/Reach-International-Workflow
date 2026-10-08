/**
 * Reach International Operations - Daily Meeting Sync (07-10-2026 & 08-10-2026)
 *
 * Implements strict Reach International standards:
 * - 100% Cloud-Native ingestion (zero static JSON files in src/data/)
 * - Strictly ONE machine per breakdown card
 * - Concise, single-line informative fields across all sections
 * - Accurate English translation and distillation of raw Hindi meeting transcripts
 */

import { syncDailyMeeting } from './sync-daily-meeting.js';

export const meeting07 = {
    id: "meet-2026-10-07",
    title: "07-10-2026",
    date: "2026-10-07",
    dateFormatted: "07-10-2026",
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
            pendingIssue: "Complete final shift operational verification under factory working conditions.",
            status: "Operational — Ground control panel and electrical drive restored and verified on site."
        },
        {
            site: "Sanand Project Site",
            model: "Electric Scissor Lift",
            serialNumber: "Unit 0.4-Panel",
            issue: "Electrical power supply failing to reach busbar in 0.4 panel, causing complete power cutout.",
            action: "Satendra Kumar and site electricians testing incoming supply lines and tracing busbar feed.",
            logistics: "Multimeter diagnostics and electrical test tools deployed on site.",
            clarification: "Zero incoming voltage at busbar prevents battery charging and equipment movement.",
            pendingIssue: "Restore main incoming voltage to 0.4 distribution panel busbar.",
            status: "Power Breakdown — Zero voltage at busbar; incoming line tracing in progress."
        },
        {
            site: "Mundra Project Site",
            model: "JCB 45",
            serialNumber: "JCB 45-Mundra",
            issue: "Machine grounded since September 3rd due to exhaustion of two 6V 400Ah traction batteries.",
            action: "Dinesh and Hari expediting urgent purchase order for two 6V 400Ah replacement traction batteries.",
            logistics: "Purchase order generation underway for direct supplier dispatch to Mundra.",
            clarification: "OEM warranty denied as machine was delivered prior to April 2026 two-year warranty policy.",
            pendingIssue: "Release commercial purchase order for two 6V 400Ah batteries.",
            status: "Grounded — Awaiting commercial PO approval and dispatch of two 6V batteries."
        },
        {
            site: "Mundra Project Site",
            model: "60ft Boom Lift",
            serialNumber: "Mundra 60ft",
            issue: "Traction battery bank degraded, requiring emergency battery bank replacement.",
            action: "Pritam Chand and site team allocated replacement batteries from yard stock.",
            logistics: "Battery sets dispatched via dedicated road transport to Mundra.",
            clarification: "Temporary yard battery bank utilized to avoid extended rental downtime.",
            pendingIssue: "Complete on-site battery installation and load testing.",
            status: "Battery Replacement — Yard batteries dispatched for on-site fitment."
        },
        {
            site: "Bina Project Site",
            model: "120ft Boom Lift",
            serialNumber: "Unit 120",
            issue: "Water ingress from heavy monsoon rains halted operations; load cell and lighting fault logged.",
            action: "Rambabu and Satendra Kumar inspecting load cell wiring and clearing water accumulation.",
            logistics: "Replacement load cell and light assembly requisitioned from central store.",
            clarification: "Heavy rainfall flooded lower electrical junction boxes; drying and moisture clearance in progress.",
            pendingIssue: "Dry electrical connections and calibrate replacement load cell sensor.",
            status: "Under Inspection — Technicians clearing rainwater ingress and testing load cell."
        },
        {
            site: "Hardoi Project Site",
            model: "Palfinger 12m",
            serialNumber: "Palfinger 12",
            issue: "Battery bank completely discharges within 2 hours after full 8–10 hour charging cycle.",
            action: "Umesh Kumar obtaining battery photographs and specific gravity test reports for cell evaluation.",
            logistics: "Replacement battery bank identified in Lucknow depot for dispatch if needed.",
            clarification: "Rapid voltage loss under light work indicates deep sulfation across internal cells.",
            pendingIssue: "Review diagnostic test report and authorize replacement battery pack dispatch.",
            status: "Battery Fault — Discharging in 2 hours; diagnostic report pending from operator."
        },
        {
            site: "Haldia Project Site",
            model: "150ft Boom Lift",
            serialNumber: "Haldia 150ft",
            issue: "Main boom control feel erratic pending 2–3 months; 15–16 core wiring harness required.",
            action: "Vinod Pal repaired horn and rotor locally; 15–16 core harness ordered from supplier.",
            logistics: "15–16 core electrical harness under fabrication for express courier dispatch.",
            clarification: "Major boom overhaul deferred until October 15th due to plant security restrictions during CM visit.",
            pendingIssue: "Deliver 15–16 core harness and schedule maintenance window after October 15th.",
            status: "Partial Working — Operating internally; major boom overhaul scheduled post October 15th."
        },
        {
            site: "Kota Project Site",
            model: "3-Ton Forklift",
            serialNumber: "33459",
            issue: "Forklift grounded due to battery failure; boom lift on site also facing battery shortage.",
            action: "Jitendra Budhauliya coordinating emergency battery requisition from regional stock hubs.",
            logistics: "Stock allocation check underway across Bangalore and Kolkata storage locations.",
            clarification: "Essential warehouse material handling halted until operational traction cells arrive.",
            pendingIssue: "Finalize battery allocation from nearest available depot.",
            status: "Grounded — Forklift immobilized; battery stock allocation underway."
        },
        {
            site: "Anuppur Project Site",
            model: "Genie Z-135",
            serialNumber: "Z-135",
            issue: "Electronic control card failure immobilizing platform drive and lift functions.",
            action: "Nirbhay and Rajkishore conducted video diagnostic session and successfully restored card operation.",
            logistics: "Software-updated control card installed and tested on machine.",
            clarification: "Card wiring configuration resolved live over video call with senior technical lead.",
            pendingIssue: "Complete 24-hour continuous operational shift trial.",
            status: "Restored — Control card issue resolved via video support; unit under operational observation."
        },
        {
            site: "Saint-Gobain Project Site",
            model: "Forklift 502",
            serialNumber: "Unit 502",
            issue: "Mechanical and electrical breakdown; awaiting replacement spare parts from central warehouse.",
            action: "Pardeep Tomar packing replacement parts package at store for express courier dispatch.",
            logistics: "Spare parts package prepared for courier dispatch.",
            clarification: "Forklift immobilized pending arrival of specific mechanical replacement components.",
            pendingIssue: "Receive parts on site and complete technician replacement.",
            status: "Awaiting Parts — Replacement drive components being dispatched from store."
        },
        {
            site: "Saint-Gobain Project Site",
            model: "Forklift 510",
            serialNumber: "Unit 510",
            issue: "Forklift non-operational; repair work pending parts and commercial payment approval.",
            action: "Client payment cleared; technician scheduled for on-site diagnostic and component fitment.",
            logistics: "Commercial clearance finalized; repair tools deployed.",
            clarification: "Repair work commenced immediately following receipt of overdue client payment.",
            pendingIssue: "Complete wiring inspection and drive motor circuit testing.",
            status: "Under Repair — Repair work initiated following client commercial payment clearance."
        },
        {
            site: "Jamnagar Project Site",
            model: "55ft Boom Lift",
            serialNumber: "Unit 55",
            issue: "Operational servicing and technical inspection required across site fleet (7–8 machines).",
            action: "Jitendra deputing Sandeep to Jamnagar site to execute complete technical servicing.",
            logistics: "Service kit and hydraulic filters allocated for Jamnagar deployment.",
            clarification: "Preventive overhaul required to prevent unexpected field breakdown across active machines.",
            pendingIssue: "Technician arrival on site and execution of comprehensive service.",
            status: "Service Deputed — Technician assigned for on-site hydraulic and engine servicing."
        }
    ],
    parts: [
        { part: "Canopy Gas Springs", context: "Sanand Site / Genie S-65", statusNextSteps: "In transit to site to allow Tata safety green tag sign-off." },
        { part: "6V 400Ah Traction Batteries (2 Units)", context: "Mundra Site / JCB 45", statusNextSteps: "Emergency PO clearance pending with procurement for vendor direct dispatch." },
        { part: "Heavy-Duty Traction Battery Banks", context: "Kota Site Fleet (Forklift 33459 & Boom)", statusNextSteps: "Stock allocation search underway across Bangalore and Kolkata depots." },
        { part: "Load Cell & Light Assembly", context: "Bina Site / 120ft Boom Lift", statusNextSteps: "Dispatched from central store; installation scheduled following rainwater clearing." },
        { part: "15–16 Core Control Wiring Harness", context: "Haldia Site / 150ft Boom Lift", statusNextSteps: "Custom wiring harness being fabricated for site fitment post October 15th." },
        { part: "12m Scissor Battery Pack", context: "Hardoi Site / Palfinger 12m", statusNextSteps: "Lucknow spare battery bank identified for dispatch following diagnostic confirmation." },
        { part: "Forklift Mechanical & Electrical Spares", context: "Saint-Gobain Site / Forklifts 502 & 510", statusNextSteps: "Dispatched by Pardeep Tomar; awaiting on-site delivery and fitment." },
        { part: "Control Card Flash Module", context: "Anuppur Site / Genie Z-135", statusNextSteps: "Successfully programmed and operational verification confirmed via video call." }
    ],
    directives: [
        {
            title: "Biometric Attendance & Gate Pass Cancellation Risk",
            points: [
                "Technicians must execute biometric face punches at least once every 5 days to prevent automatic gate pass deletion.",
                "Field supervisors must notify site leads 48 hours before planned leaves with staff ID numbers to protect security slots."
            ]
        },
        {
            title: "Mandatory OEM Warranty Verification Protocol",
            points: [
                "All battery and component failures must be verified against machine purchase orders and delivery dates before placing paid orders.",
                "Equipment delivered after April 1, 2026 carries 2-year warranty; older units carry 1-year warranty."
            ]
        },
        {
            title: "Lead-Acid Battery Charging Compatibility",
            points: [
                "Never use high-frequency AGM chargers on flooded lead-acid batteries as improper charging profiles accelerate cell degradation.",
                "Always match charger charging curves with battery chemistry and consult charger vendors before deployment."
            ]
        },
        {
            title: "Video-Assisted Field Diagnostics",
            points: [
                "Technicians encountering complex electronic control or card issues must initiate live video calls with central technical leads.",
                "Eliminates unnecessary outstation technician travel and cuts machine downtime through real-time wiring guidance."
            ]
        }
    ],
    actionItems: [
        { person: "Dinesh & Hari", task: "Place urgent purchase order for two 6V 400Ah traction batteries for Mundra JCB 45." },
        { person: "Deepak & Dhiraj", task: "Secure site entry permit and install replacement canopy gas springs on Genie S-65 at Sanand." },
        { person: "Vinod Pal", task: "Finalize order for 15–16 core wiring harness and schedule Haldia 150ft maintenance after October 15th." },
        { person: "Umesh Kumar", task: "Obtain battery photos and specific gravity reports for Hardoi Palfinger 12m from site technician." },
        { person: "Satendra Kumar", task: "Clear rainwater accumulation, inspect load cell, and test electrical circuits on Bina 120ft unit." },
        { person: "Pardeep Tomar", task: "Track courier delivery of forklift drive spares to Saint-Gobain site for units 502 and 510." },
        { person: "Imran Khan", task: "Monitor Hindon Air Force parade conclusion to coordinate immediate entry clearance for bypassed equipment." },
        { person: "Jitendra Budhauliya", task: "Deploy technician Sandeep to Jamnagar site for comprehensive servicing across fleet machines." }
    ]
};

export const meeting08 = {
    id: "meet-2026-10-08",
    title: "08-10-2026",
    date: "2026-10-08",
    dateFormatted: "08-10-2026",
    focus: "Sanand S-65 safety tag clearance, JCB 45 charging shock & Mundra 6V PO, GS-4046 pothole harness, and M600JP weekend cylinder seal overhaul.",
    isHoliday: false,
    holidayName: "",
    breakdowns: [
        {
            site: "Sanand Tata Micron Site",
            model: "JCB Scissor Lift",
            serialNumber: "3362413",
            issue: "Recurring intermittent electrical fault over last 4 days causing machine instability during work shifts.",
            action: "Deepak and Dhiraj deployed to Micron plant following supervisor email approval.",
            logistics: "Technician entry gate pass approved via email for site access.",
            clarification: "Unit continues operating in running condition, but electrical glitch requires resolution.",
            pendingIssue: "Conduct electrical troubleshooting on control panel wiring and ground circuit.",
            status: "Working with Problem — Intermittent electrical issue under investigation by site technicians."
        },
        {
            site: "Sanand Project Site",
            model: "Genie S-65",
            serialNumber: "Unit S-65",
            issue: "Machine mechanically restored by Reach team, but grounded awaiting Johnson/Tata safety green sticker.",
            action: "Dhiraj submitting documentation at Johnson office to obtain final green safety tag.",
            logistics: "Formal inspection paperwork processed through client safety portal.",
            clarification: "Reach repairs complete; machine standing idle solely awaiting statutory safety sticker.",
            pendingIssue: "Secure safety inspector sign-off and green tag release from Johnson office.",
            status: "Awaiting Safety Tag — Mechanically ready; formal client safety green sticker clearance pending."
        },
        {
            site: "Sanand Project Site",
            model: "JCB 45",
            serialNumber: "3370437",
            issue: "Operator receives mild electric shock during charging, and periodic maintenance service is overdue.",
            action: "Deepak investigating ground earth continuity on charging socket; Imran checking OEM warranty.",
            logistics: "Multimeter earth-leakage tester deployed on charging circuit.",
            clarification: "Current leakage likely caused by faulty distribution board earth pin rather than internal defect.",
            pendingIssue: "Verify external power source grounding and confirm machine warranty status with OEM.",
            status: "Electrical Leakage — Current shock during charging under investigation; earth testing required."
        },
        {
            site: "Sanand Project Site",
            model: "JLG M600JP",
            serialNumber: "300100695",
            issue: "Hydraulic oil leaking from master cylinder tele-boom pipe manifold, risking safety grounding.",
            action: "Deepak and Dinanath planning Saturday night / Sunday permit to dismantle cylinder and fit new O-rings.",
            logistics: "Replacement hydraulic O-rings and seal kit staged in Sanand store.",
            clarification: "Machine currently operating night shifts; major cylinder teardown scheduled during weekend downtime.",
            pendingIssue: "Secure weekend plant permit and replace leaking manifold O-rings.",
            status: "Scheduled Maintenance — Running night shifts; master cylinder O-ring overhaul set for weekend."
        },
        {
            site: "Sanand Project Site",
            model: "Genie GS-4046",
            serialNumber: "GS4046-Pothole",
            issue: "Pothole guard wiring harness damaged, causing travel limit cutout and safety fault.",
            action: "Deepak and Dhiraj secured 6-hour permit to replace complete pothole guard wiring harness today.",
            logistics: "Replacement wiring harness issued from Sanand store.",
            clarification: "Machine held for scheduled 6-hour maintenance slot to ensure compliance.",
            pendingIssue: "Complete wiring harness routing, connector crimping, and pothole limit function test.",
            status: "Under Repair — 6-hour permit secured for pothole harness replacement and testing."
        },
        {
            site: "Sanand Project Site",
            model: "Genie GS-4046",
            serialNumber: "GS4046-Deck",
            issue: "Extension platform deck mechanism jammed and fails to extend outward under manual force.",
            action: "Dinanath purchasing replacement mechanical bottle jack from local market to service deck slide.",
            logistics: "Heavy-duty mechanical jack being procured locally by site technician.",
            clarification: "Client warned of imminent machine grounding if extension deck is not restored today.",
            pendingIssue: "Procure jack, release jammed deck slide guides, and lubricate roller channels.",
            status: "Mechanical Jam — Platform deck extension seized; local jack procurement underway for repair."
        },
        {
            site: "Rajkot Project Site",
            model: "Zoomlion 4550",
            serialNumber: "Unit 4550",
            issue: "Battery backup degraded and 14-piece safety limit switch assembly requires installation.",
            action: "Pardeep Tomar arranging battery delivery; management clearance requested for limit switch fitment.",
            logistics: "Batteries scheduled for site delivery today or tomorrow; 14 limit switches staged at Sanand.",
            clarification: "Vinay Sir clearance required before installing limit switches to confirm billing liability.",
            pendingIssue: "Receive batteries on site and secure management approval for limit switch installation.",
            status: "Spares in Transit — Replacement batteries arriving; policy clearance pending for limit switches."
        },
        {
            site: "Regional Fleet Workshop",
            model: "Genie Z-45",
            serialNumber: "Unit Z-45",
            issue: "48V battery charger failure and electrical main contactor overheating, shorting, and melting.",
            action: "Pardeep Tomar and Khemchand procuring heavy-duty contactor locally and sourcing 48V charger.",
            logistics: "Contactor sourced from local market with installation date-marking applied.",
            clarification: "Melting contacts caused by terminal looseness and excessive current draw under load.",
            pendingIssue: "Purchase replacement contactor, date-mark component, and test 48V charging circuit.",
            status: "Component Breakdown — Contactor melted; local procurement and charger indent in progress."
        },
        {
            site: "Mundra Project Site",
            model: "JCB 45",
            serialNumber: "JCB 45-Mundra",
            issue: "Breakdown persists; previously fitted 370Ah AGM battery failed to hold operational load.",
            action: "Hari and Dinesh coordinating to place purchase order for two 6V 400Ah/440Ah traction batteries.",
            logistics: "Emergency purchase order being generated for direct supplier dispatch.",
            clarification: "370Ah AGM battery lacked sufficient ampere-hour capacity; heavy 400Ah+ batteries required.",
            pendingIssue: "Expedite purchase order issuance and track freight dispatch to Mundra.",
            status: "Grounded — 370Ah AGM trial failed; urgent PO placement required for two 6V 400Ah batteries."
        },
        {
            site: "Mundra Project Site",
            model: "JLG 600AJ",
            serialNumber: "Unit 600",
            issue: "Operator basket rotates uncommanded on its own during operation, creating severe safety risk.",
            action: "Chunnilal Patel identifying rotary position sensor part number with Pardeep Tomar for ordering.",
            logistics: "Spare rotary position sensor part number being cross-referenced in technical manual.",
            clarification: "Mantu repaired rotary drive 10 days ago, but fault recurred due to internal sensor wear.",
            pendingIssue: "Determine OEM part number, log requisition in portal, and expedite spare delivery.",
            status: "Safety Defect — Basket auto-rotating; part number identification and requisition in progress."
        },
        {
            site: "Mundra Project Site",
            model: "JLG 860SJ",
            serialNumber: "Unit 860",
            issue: "Engine emitting heavy exhaust smoke, burning excessive engine oil, and grounded since January.",
            action: "Chunnilal Patel and Mantu scheduling complete engine teardown and overhaul on site.",
            logistics: "Engine overhaul kit, piston rings, and gasket set requisitioned from central workshop.",
            clarification: "Unit held non-operational since January awaiting dedicated technician mobilization.",
            pendingIssue: "Mobilize engine overhaul tools to Mundra and commence teardown upon technician availability.",
            status: "Long-Term Breakdown — Grounded since January; comprehensive engine overhaul scheduled."
        },
        {
            site: "Mundra Project Site",
            model: "Genie GS-4390 RT",
            serialNumber: "Unit 4390",
            issue: "Drive marching function cuts out completely whenever scissor platform is raised to work height.",
            action: "Chunnilal Patel logging complaint on portal and assigning on-site technician to inspect height switch.",
            logistics: "Electrical multi-tester and schematic diagrams deployed for circuit tracing.",
            clarification: "Height sensor or angle limit switch is cutting drive interlock circuit erroneously.",
            pendingIssue: "Inspect platform elevation limit switches and calibrate drive interlock circuit.",
            status: "Height Interlock Fault — Drive disabled at height; elevation limit sensor inspection pending."
        },
        {
            site: "Rewari Project Site",
            model: "Forklift 5002",
            serialNumber: "Unit 5002",
            issue: "Mechanical and electrical breakdown halting warehouse handling operations.",
            action: "Hari tracking courier parcel containing dedicated replacement spare parts dispatched to Rewari depot.",
            logistics: "Spare parts package dispatched yesterday via courier to Rewari.",
            clarification: "Spares expected at local depot today for immediate technician fitting.",
            pendingIssue: "Confirm parcel delivery at Rewari depot and assign technician for component replacement.",
            status: "Awaiting Parts — Replacement spares in courier transit to Rewari depot."
        },
        {
            site: "Rewari Project Site",
            model: "Forklift 3002",
            serialNumber: "Unit 3002",
            issue: "Operating breakdown due to electrical controller and contactor failure.",
            action: "Replacement controller components included in consolidated courier package sent to Rewari.",
            logistics: "Consolidated spares consignment dispatched yesterday to Rewari depot.",
            clarification: "Both Rewari forklifts targeted for simultaneous restoration upon parcel arrival.",
            pendingIssue: "Collect parcel from courier and execute controller replacement and calibration.",
            status: "Awaiting Parts — Consolidated spares package en route to Rewari for immediate fitment."
        },
        {
            site: "Vidya Polymer Client Site",
            model: "2-Ton Electric Forklift",
            serialNumber: "Vidya Polymer 2T",
            issue: "Client requisition for 2-ton replacement electric forklift to support warehouse material handling.",
            action: "Dhruv Sharma coordinating commercial terms and staging 2-ton machine for dispatch.",
            logistics: "Machine transport vehicle being arranged for factory delivery.",
            clarification: "Requisition logged to replace defective equipment at client manufacturing facility.",
            pendingIssue: "Complete pre-delivery inspection and finalize transport vehicle booking.",
            status: "Dispatch Staging — 2-ton forklift undergoing pre-delivery check prior to site transit."
        },
        {
            site: "Visakhapatnam Project Site",
            model: "Rough Terrain RT",
            serialNumber: "Vizag RT",
            issue: "Persistent hydraulic oil leakage reported around boom lift valves; client ticket pending.",
            action: "Shiv Uniyal coordinating with vendor to obtain hydraulic seal kit part numbers and assign technician.",
            logistics: "Replacement hydraulic seal kit part number requested from OEM distributor.",
            clarification: "Client logged service ticket; no technician has visited site yet due to distance.",
            pendingIssue: "Source hydraulic seal kit and finalize technician travel itinerary to Visakhapatnam.",
            status: "Leakage Breakdown — Hydraulic oil leak reported; seal kit sourcing and technician dispatch pending."
        }
    ],
    parts: [
        { part: "Pothole Guard Wiring Harness", context: "Sanand Site / Genie GS-4046", statusNextSteps: "Staged on site; installation underway during 6-hour approved permit window." },
        { part: "Heavy-Duty Mechanical Bottle Jack", context: "Sanand Site / Genie GS-4046", statusNextSteps: "Procured locally by site technician to release jammed platform extension deck." },
        { part: "Master Cylinder Manifold O-Rings", context: "Sanand Site / JLG M600JP", statusNextSteps: "Staged at Sanand store for scheduled weekend night-shift replacement." },
        { part: "48V Heavy-Duty Electrical Contactor", context: "Regional Workshop / Genie Z-45", statusNextSteps: "Procured locally; date-marking to be physically inscribed prior to installation." },
        { part: "48V Battery Charger", context: "Regional Workshop / Genie Z-45", statusNextSteps: "Supplier indent submitted for procurement clearance following repeated contactor overheating." },
        { part: "6V 400Ah/440Ah Traction Batteries (2 Units)", context: "Mundra Site / JCB 45", statusNextSteps: "Purchase order approval expedited following failure of 370Ah AGM battery trial." },
        { part: "Rotary Position Sensor", context: "Mundra Site / JLG 600AJ", statusNextSteps: "OEM part number being verified from manual to order replacement for uncommanded rotation." },
        { part: "Engine Overhaul Gasket & Ring Kit", context: "Mundra Site / JLG 860SJ", statusNextSteps: "Requisition logged for comprehensive overhaul to fix severe exhaust smoke and oil burn." },
        { part: "Safety Limit Switch Assemblies (14 Pieces)", context: "Rajkot Site / Zoomlion 4550", statusNextSteps: "Staged at Sanand; awaiting management policy clearance before on-site installation." },
        { part: "Forklift Controller & Electrical Consignment", context: "Rewari Depot / Units 5002 & 3002", statusNextSteps: "Dispatched via courier yesterday; delivery expected at depot today for fitment." },
        { part: "Hydraulic Valve Seal Kit", context: "Visakhapatnam Site / Rough Terrain RT", statusNextSteps: "Part number requested from OEM distributor to address continuous hydraulic oil leakage." }
    ],
    directives: [
        {
            title: "Mandatory Date-Marking on All Replacement Spares",
            points: [
                "Technicians and site supervisors must physically write the installation date on every spare part before fitting.",
                "Enables precise component life tracking and simplifies warranty claims with component manufacturers."
            ]
        },
        {
            title: "Tool Custody and Personal Financial Liability",
            points: [
                "Heavy tools and testing equipment must be officially signed out from site stores and returned with photo verification.",
                "Missing or neglected tools will be debited directly against responsible technician and supervisor accounts."
            ]
        },
        {
            title: "Weekend Maintenance Windows for Active Plants",
            points: [
                "For equipment operating night shifts or inside high-security bays, schedule major repairs during Saturday night and Sunday.",
                "Prevents client production disruption while giving technicians unhurried access for tasks like cylinder O-ring replacements."
            ]
        },
        {
            title: "Supply Grounding Verification for Charging Shock Complaints",
            points: [
                "Test external distribution board ground earth pins whenever electric shock or leakage is reported during charging.",
                "Confirms site supply grounding defects before dismantling internal machine chargers or wiring harnesses."
            ]
        },
        {
            title: "Exact Battery Ampere-Hour Matching",
            points: [
                "Field teams must never install lower-rated batteries (e.g., 370Ah instead of 400Ah/440Ah) on heavy boom lifts.",
                "Verify required ampere-hour capacity prior to dispatch to prevent premature voltage drop and recurring machine downtime."
            ]
        }
    ],
    actionItems: [
        { person: "Hari & Dinesh", task: "Coordinate directly to punch purchase order for two 6V 400Ah/440Ah batteries for Mundra JCB 45." },
        { person: "Pardeep Tomar & Khemchand", task: "Procure 48V contactor locally, apply mandatory date-marking, and process 48V charger indent." },
        { person: "Deepak & Dhiraj", task: "Execute pothole wiring harness replacement during 6-hour permit on Genie GS-4046 at Sanand." },
        { person: "Dinanath", task: "Purchase heavy-duty mechanical jack locally to free jammed extension deck on Genie GS-4046." },
        { person: "Khemchand", task: "Secure plant permit to move JLG M600JP outside for master cylinder O-ring overhaul on Saturday night." },
        { person: "Chunnilal Patel & Mantu", task: "Identify rotary sensor part number for JLG 600AJ and prepare engine overhaul tools for JLG 860SJ." },
        { person: "Imran Khan", task: "Follow up on Air Force gate clearance for tomorrow morning entry at Hindon following parade conclusion." },
        { person: "Shiv Uniyal & Jitendra", task: "Obtain hydraulic seal kit part number and schedule technician travel to Visakhapatnam for RT leak." },
        { person: "Hari", task: "Track courier delivery of consolidated forklift spares package at Rewari depot for units 5002 and 3002." },
        { person: "Dhruv Sharma", task: "Follow up with commercial team for pre-delivery inspection and vehicle booking for Vidya Polymer 2-ton forklift." }
    ]
};

async function run() {
    console.log('🚀 Synchronizing October 07, 2026 meeting...');
    const r07 = await syncDailyMeeting(meeting07);
    console.log(`✅ Synced ${r07.meetingId}: ${r07.counts.breakdowns} machines, ${r07.counts.parts} parts, ${r07.counts.directives} directives, ${r07.counts.actionItems} action items.`);

    console.log('\n🚀 Synchronizing October 08, 2026 meeting...');
    const r08 = await syncDailyMeeting(meeting08);
    console.log(`✅ Synced ${r08.meetingId}: ${r08.counts.breakdowns} machines, ${r08.counts.parts} parts, ${r08.counts.directives} directives, ${r08.counts.actionItems} action items.`);
}

run().catch(err => {
    console.error('❌ Ingestion failed:', err);
    process.exit(1);
});

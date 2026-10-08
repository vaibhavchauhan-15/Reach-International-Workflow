/**
 * Sync September 07 and September 08, 2026 Meetings to Supabase
 *
 * Implements strict Reach International standards:
 * - 100% Cloud-Native ingestion (zero static JSON files)
 * - Strictly ONE machine per breakdown card
 * - Concise, single-line informative fields across all sections
 */

import { syncDailyMeeting } from './sync-daily-meeting.js';

const meeting07 = {
    id: "meet-2026-09-07",
    title: "07-09-2026",
    date: "2026-09-07",
    dateFormatted: "07-09-2026",
    focus: "Kochi 120ft fuel burn diagnostics, Mundra pump & diesel overhaul, Sanand battery cannibalization, Jaisalmer charger dispatch, and Radhey tire indents.",
    isHoliday: false,
    holidayName: "",
    breakdowns: [
        {
            site: "Kochi Project Site",
            model: "120ft Boom Lift",
            serialNumber: "Unit 120ft",
            issue: "Abnormally high diesel consumption burning up to 7 liters per hour under operational load.",
            action: "Dinesh Babu deploying technician via direct Chennai-to-Kochi bus to inspect injectors and fuel pump.",
            logistics: "Bus tickets booked from Chennai to Kochi for immediate site arrival.",
            clarification: "Client disputing daily fuel logs and refusing further fuel supply until resolved.",
            pendingIssue: "Inspect fuel injection pump calibration and return lines on site.",
            status: "Technician In Transit — Direct Chennai-to-Kochi bus travel scheduled for engine diagnostics."
        },
        {
            site: "Mundra Project Site",
            model: "Genie GS-4390 RT",
            serialNumber: "Unit 4390",
            issue: "Locally repaired hydraulic pump failed during commissioning and is completely inoperative.",
            action: "Dhrup Sir and Vishal Sir requested cost quotation to approve emergency Purchase Order today.",
            logistics: "Replacement pump vendor identified; dispatch ready upon commercial clearance.",
            clarification: "Machine grounded 2 weeks awaiting commercial approval amid loss-rental costing debate.",
            pendingIssue: "Clear emergency PO approval and dispatch replacement hydraulic pump from vendor.",
            status: "Awaiting Commercial Approval — Emergency PO clearance pending with senior management."
        },
        {
            site: "Mundra Project Site",
            model: "JLG 660SJ",
            serialNumber: "95369",
            issue: "Grounded over 1 week due to fuel injection pump failure and pending hydraulic line servicing.",
            action: "Pritam Chand and Mantu deployed via train to Mundra to execute fuel pump overhaul and engine tuning.",
            logistics: "Train tickets confirmed for same-day technician travel with fuel pump spares.",
            clarification: "Engine overhaul and hydraulic line maintenance synchronized with pump replacement.",
            pendingIssue: "Complete on-site fuel injection pump rebuild and test engine under load.",
            status: "Technicians En Route — Deputed on train for diesel pump overhaul and tuning."
        },
        {
            site: "Sanand Tata Micron Site",
            model: "JCB 3240",
            serialNumber: "2518",
            issue: "Four traction batteries completely dead with zero specific gravity, immobilizing the scissor lift.",
            action: "Pandit Dhiraj Dubey instructed to consolidate working batteries from unit 6241 into unit 2518.",
            logistics: "Cannibalized battery bank staged for immediate inter-machine swap.",
            clarification: "Cannibalization deployed to restore operational uptime while replacement packs are processed.",
            pendingIssue: "Complete battery bank swap and restore scissor lift operation.",
            status: "Restored via Cannibalization — Swapped functional batteries to achieve full operation."
        },
        {
            site: "Sanand Tata Micron Site",
            model: "JCB 3240",
            serialNumber: "6241",
            issue: "Three weak batteries operating below rated capacity, risking intermittent site shutdown.",
            action: "Unit isolated in yard to donate healthy cells to unit 2518 while replacement pack is arranged.",
            logistics: "Replacement battery requisition logged for procurement.",
            clarification: "Machine safely parked in bay pending fresh warranty battery pack.",
            pendingIssue: "Receive new replacement battery bank to recommission unit.",
            status: "Parked for Spares — Donated batteries to unit 2518; awaiting replacement pack."
        },
        {
            site: "Sanand Tata Micron Site",
            model: "JCB 4G",
            serialNumber: "5710",
            issue: "Premature battery degradation logged under warranty review with JCB OEM.",
            action: "Field team submitted specific gravity logs to JCB service engineer for warranty claim.",
            logistics: "Warranty replacement documentation submitted to OEM depot.",
            clarification: "OEM warranty replacement required before formal client handover.",
            pendingIssue: "Obtain warranty replacement decision from JCB technical engineer.",
            status: "Under OEM Warranty Review — Battery claim documentation submitted to JCB."
        },
        {
            site: "Sanand Project Site",
            model: "Genie GS-1932",
            serialNumber: "Genie 19",
            issue: "Total battery discharge and overload cutout during shift operation.",
            action: "Shifted to charging bay for overnight equalization charging and morning mechanic inspection.",
            logistics: "Dedicated charging station allocated at Sanand yard.",
            clarification: "Full charging cycle required to determine if cells recover rated specific gravity.",
            pendingIssue: "Complete overnight charging and test load capacity tomorrow morning.",
            status: "Charging Bay — Shifted for overnight battery charge and mechanic inspection."
        },
        {
            site: "Sanand Project Site",
            model: "Zoomlion 4550",
            serialNumber: "Unit 4550",
            issue: "Drive motor emitting grinding noise and overload sensor repeatedly tripping due to uncalibrated bypass.",
            action: "Deepak and Pardeep deployed to inspect motor terminals and perform formal load recalibration.",
            logistics: "Multimeter and calibration weight kits staged on site.",
            clarification: "Temporary overload bypass must be replaced with certified recalibration.",
            pendingIssue: "Eliminate motor noise and complete calibrated load sensor setup.",
            status: "Under Rectification — Motor terminal inspection and sensor recalibration active."
        },
        {
            site: "Jaisalmer Project Site",
            model: "Genie SX-125",
            serialNumber: "4047",
            issue: "Machine grounded due to burnt/missing onboard battery charger.",
            action: "Pardeep Tomar dispatched high-capacity replacement charger via road transit; technician Ranjan deputed.",
            logistics: "Industrial battery charger dispatched via surface road logistics.",
            clarification: "Surface road transit mandated to comply with hazardous transport regulations.",
            pendingIssue: "Receive charger on site and complete technician wiring installation.",
            status: "Charger Dispatched — Road logistics in transit; technician assigned for installation."
        },
        {
            site: "Vapi Project Site",
            model: "3-Ton Forklift",
            serialNumber: "Vapi 3T",
            issue: "Forklift grounded due to dead traction battery cells causing rapid voltage drop.",
            action: "Raju packed and dispatched replacement traction battery cells via surface transport.",
            logistics: "Replacement battery cells dispatched from central depot today.",
            clarification: "Cell replacement will revive existing battery bank without full pack cost.",
            pendingIssue: "Deliver cells to site and complete series connection with local technician.",
            status: "Spares In Transit — Replacement cells dispatched from depot for cell swap."
        },
        {
            site: "Rajpura Project Site",
            model: "3-Ton Forklift",
            serialNumber: "Rajpura 3T",
            issue: "Traction battery cell failure causing lifting cutout under pallet load.",
            action: "Raju organized courier dispatch of replacement traction cells to local supervisor.",
            logistics: "Replacement cells dispatched via approved courier service.",
            clarification: "Local supervisor to install cells upon receipt and verify gravity.",
            pendingIssue: "Receive replacement cells and complete pack re-balancing.",
            status: "Spares In Transit — Replacement cells en route to site supervisor."
        },
        {
            site: "Samsung Project Site",
            model: "3-Ton Forklift",
            serialNumber: "Samsung 3T",
            issue: "Machine controller throwing error code 4000 indicating communication failure.",
            action: "Technician troubleshooting CAN-bus harness and controller terminal connectors.",
            logistics: "Diagnostic multimeter and spare wiring harness arranged on site.",
            clarification: "Controller error halts all drive and hydraulic operations.",
            pendingIssue: "Isolate harness fault and clear controller communication error.",
            status: "Under Investigation — Technician diagnosing CAN-bus communication error."
        },
        {
            site: "Ahmedabad JK Paper Site",
            model: "Order Picker",
            serialNumber: "Bay 507 / 302",
            issue: "Electrical feed failure on Bay 302 during warehouse shift operations.",
            action: "Local service team inspected and resolved electrical faults on Bay 302.",
            logistics: "Local workshop spares utilized for immediate rectification.",
            clarification: "Bay 302 cleared for production; Bay 507 under preventive monitoring.",
            pendingIssue: "Monitor machine during shift operation to verify stable performance.",
            status: "Operational — Bay 302 resolved and cleared for ongoing warehouse duty."
        },
        {
            site: "Haldia Project Site",
            model: "100ft Boom Lift",
            serialNumber: "Haldia 100ft",
            issue: "Awaiting replacement electrical connector assembly currently in transit without tracking status.",
            action: "Pardeep Tomar instructed to trace courier tracking docket immediately and push delivery.",
            logistics: "Connector assembly shipped via courier; docket tracking retrieval underway.",
            clarification: "Unit immobilized until connector is plugged and verified.",
            pendingIssue: "Trace courier docket and complete connector plug installation.",
            status: "Spares In Transit — Courier tracking retrieval underway for urgent delivery."
        },
        {
            site: "Mangalore Project Site",
            model: "100ft Boom Lift",
            serialNumber: "Mangalore 100ft",
            issue: "Scheduled preventive maintenance delayed due to continuous client working schedule.",
            action: "Technician scheduling servicing window during upcoming Sunday/Monday client downtime.",
            logistics: "Filter kit and hydraulic oil pre-staged at Mangalore site.",
            clarification: "Maintenance aligned with client off-hours to prevent operational conflict.",
            pendingIssue: "Execute scheduled preventive maintenance during client work window.",
            status: "Service Scheduled — Maintenance planned for upcoming Sunday/Monday client off-hours."
        },
        {
            site: "Radhey Client Site",
            model: "150ft Boom Lift",
            serialNumber: "Radhey 150ft",
            issue: "Severe tire failure: 3 tires excessively depressed/flattened and 1 tire burst completely.",
            action: "Radhey submitted purchase indent for a full set of replacement heavy tires for commercial clearance.",
            logistics: "Tire supplier quotation and technical specifications attached to indent.",
            clarification: "Tires declared non-repairable beyond retreading; urgent new tires required.",
            pendingIssue: "Secure finance approval and place purchase order with tire distributor.",
            status: "Awaiting Finance Clearance — Emergency tire purchase indent submitted for budget release."
        },
        {
            site: "Radhey Client Site",
            model: "80ft Boom Lift",
            serialNumber: "Radhey 80ft",
            issue: "Boom tires severely worn down to cords, declared non-repairable.",
            action: "Included in emergency tire procurement requisition submitted for budget release.",
            logistics: "80ft replacement tire sizing submitted to central procurement.",
            clarification: "Worn tires pose safety hazard on graded client surfaces.",
            pendingIssue: "Finalize tire purchase order along with 150ft tire pack.",
            status: "Indent Logged — Combined tire purchase requisition submitted to management."
        }
    ],
    parts: [
        { part: "Genie 4390 Hydraulic Pump", context: "Mundra Site / Unit 4390", statusNextSteps: "Emergency PO clearance pending with Vishal Sir & Dhrup Sir for vendor dispatch." },
        { part: "Genie Z-40 Drive Motor & Control Card", context: "Mundra Site Fleet", statusNextSteps: "Motor dispatched; control card received by Sitaram via train for fitment." },
        { part: "SX-125 High-Capacity Battery Charger", context: "Jaisalmer Site / Unit 4047", statusNextSteps: "Dispatched today via road transit; technician Ranjan aligning for installation." },
        { part: "Traction Battery Replacement Cells", context: "Vapi & Rajpura Forklift Sites", statusNextSteps: "Packed and dispatched by Raju via surface transport for cell swaps." },
        { part: "JCB 3240 Flooded Batteries (SN 2518 & 6241)", context: "Sanand Tata Micron Site", statusNextSteps: "Cannibalized healthy cells between units to restore 2 machines; warranty logged." },
        { part: "Industrial Boom Lift Tires (150ft & 80ft)", context: "Radhey Client Site", statusNextSteps: "Commercial purchase indent submitted today for finance budget release." },
        { part: "Haldia 100ft Connector Assembly", context: "Haldia Project Site", statusNextSteps: "Courier tracking docket being traced by Pardeep Tomar for site arrival." },
        { part: "Zoomlion Scissor Tyres", context: "Sanand Project Site", statusNextSteps: "Dispatched tires arrived on site; local mechanic actively fitting today." },
        { part: "Forklift Direction Switch & Control Spares", context: "Material Handling Fleet", statusNextSteps: "Payment processed today; supplier direct dispatch scheduled tomorrow." }
    ],
    directives: [
        {
            title: "Strict Prohibition of Battery Transit via Passenger Train Cargo",
            points: [
                "Absolute ban on rail luggage for batteries following RPF notices; dedicated surface road carriers only.",
                "General non-hazardous hardware (cards, cables, small motors) may utilize train cargo with valid receipts."
            ]
        },
        {
            title: "Interim Battery Swapping & Fleet Cannibalization Protocol",
            points: [
                "Consolidate functional batteries across partially crippled units at a single site to maximize operational uptime.",
                "Specific gravity test sheets and serial numbers must be recorded in the Breakdown group for all swapped cells."
            ]
        },
        {
            title: "Loss-Rental & High-Value Spare Procurement Escalation Protocol",
            points: [
                "Procurements pending over 48 hours must escalate to a direct conference call with senior management.",
                "PO approval must be closed within the same working day to keep downtime under 7 days."
            ]
        },
        {
            title: "OEM Portal Complaint Logging Prerequisite",
            points: [
                "Field supervisors must log complaints directly on OEM customer portals before requesting service deputation.",
                "Record OEM portal ticket IDs in the daily breakdown update to monitor service level agreements."
            ]
        }
    ],
    actionItems: [
        { person: "Vishal Sir & Dhrup Sir", task: "Conduct emergency conference call today on Mundra Genie 4390 pump costing and release PO." },
        { person: "Pardeep Tomar", task: "Dispatch SX-125 charger to Jaisalmer today, trace Haldia connector docket, and enforce road transit for batteries." },
        { person: "Pandit Dhiraj Dubey", task: "Execute battery swapping between JCB 3240 units at Sanand, charge Genie 19 tonight, and check Zoomlion tires." },
        { person: "Dinesh Babu", task: "Confirm travel tickets to Chennai for tomorrow and arrange direct bus connection to Kochi for fuel diagnostics." },
        { person: "Raju", task: "Pack and dispatch replacement traction battery cells to Rajpura and Vapi sites today via road logistics." },
        { person: "Pritam Chand & Mantu", task: "Board train to Mundra today to execute fuel injection pump replacement and engine tuning on JLG 660." },
        { person: "Radhey", task: "Submit formal requisition document and tire specifications for 150ft and 80ft boom lifts to store and finance." },
        { person: "Amrish", task: "Clarify electrical contactor vs charger requirements for Jaisalmer machine 4047 and coordinate installation." },
        { person: "Deepak", task: "Complete physical inspection on Zoomlion 4550 drive motor and wiring terminals at Sanand and calibrate load circuit." }
    ]
};

const meeting08 = {
    id: "meet-2026-09-08",
    title: "08-09-2026",
    date: "2026-09-08",
    dateFormatted: "08-09-2026",
    focus: "Bangalore 23-battery deficit, Bhiwani tilt cylinder overhaul, GS-90 scrap battery credit, Jamnagar T65 platform diagnostics, Model 450 gasket transit, and 800 axle depot transfer.",
    isHoliday: false,
    holidayName: "",
    breakdowns: [
        {
            site: "Bangalore Fleet Site",
            model: "Material Handling Fleet",
            serialNumber: "Bangalore MHE",
            issue: "Acute shortage of traction batteries with 23 battery packs completely dead across the fleet.",
            action: "Rahul Singh and Dhruv Sharma negotiating vendor support to revive 7-8 dead packs and ordering 10 new banks.",
            logistics: "Local vendor battery reconditioning setup being evaluated for rapid turnaround.",
            clarification: "24/7 site operations require immediate battery replenishment to avoid fleet paralysis.",
            pendingIssue: "Deploy vendor reconditioning team and secure finance release for 10 new battery packs.",
            status: "Critical Escalation — Cell reconditioning initiated for 7–8 packs; 10 new packs in procurement."
        },
        {
            site: "Bhiwani Project Site",
            model: "Hyundai 3-Ton",
            serialNumber: "Bhiwani Unit",
            issue: "Tilt cylinder assembly opened on site for seal replacement; local mechanic abandoned job.",
            action: "Rahul Singh following up with Mishra Ji for immediate engineer dispatch with proper seal kit.",
            logistics: "Replacement cylinder seal kit staged at regional depot.",
            clarification: "Machine grounded mid-repair; requires certified technician to finish rebuild.",
            pendingIssue: "Depute Mishra Ji's technician to install seals and commission tilt cylinder.",
            status: "Under Repair — Technician deputation pending to assemble tilt cylinder."
        },
        {
            site: "Jamshedpur / Tatanagar Site",
            model: "3-Ton Forklift",
            serialNumber: "Jamshedpur 3T",
            issue: "Standing grounded for 2.5 to 3 months due to an exhausted 3-ton traction battery bank.",
            action: "Dhruv Sharma confirmed dispatched 3-ton battery bank left origin on 30-Aug; tracking shared with team.",
            logistics: "Road transit tracking docket active with carrier; ETA 24–48 hours.",
            clarification: "Battery arrival will restore long-term grounded machine to active billing.",
            pendingIssue: "Receive battery consignment on site and install into forklift.",
            status: "Spares In Transit — Dispatched 3-ton battery bank en route (ETA 1–2 days)."
        },
        {
            site: "PG Electroplast Site (Greater Noida)",
            model: "2-Ton Forklift",
            serialNumber: "PG 2T",
            issue: "2-Ton traction battery bank degraded, requiring full replacement pack.",
            action: "Order confirmed with vendor Manish for complete pack (cells and tray assembled); tracking awaited.",
            logistics: "Vendor assembly completed; dispatch tracking number being shared today.",
            clarification: "Commercial payment cleared; zero payment block on shipment.",
            pendingIssue: "Receive carrier tracking docket from vendor Manish and confirm dispatch.",
            status: "Order Confirmed — Pack assembled by vendor Manish; dispatch tracking awaited today."
        },
        {
            site: "Regional Fleet Depot",
            model: "Genie GS-90 RT",
            serialNumber: "GS90D-588",
            issue: "2023–2024 Amaron battery bank suffered internal cell failure under cranking load.",
            action: "Satendra Kumar instructed to remove dead batteries, submit core return credit paperwork, and log in CRM.",
            logistics: "Scrap battery cores being delivered to central depot for vendor credit deduction.",
            clarification: "Payment for replacements strictly withheld until old scrap cores are surrendered.",
            pendingIssue: "Surrender old cores for vendor credit and process replacement battery indent.",
            status: "Core Surrender Pending — De-installation underway for scrap credit deduction."
        },
        {
            site: "Jamnagar Project Site",
            model: "JCB T65",
            serialNumber: "539503",
            issue: "Platform-side function failure prevents operator from controlling boom movements.",
            action: "Technician Pradeep arrived on site; Jitendra Budhauliya instructed CRM induction of serial 539503.",
            logistics: "Platform console diagnostic equipment and wiring spares on site.",
            clarification: "CRM ticket registration required for tracking component consumption.",
            pendingIssue: "Trace platform console signal failure and register serial number in CRM.",
            status: "Technician On-Site — Pradeep diagnosing platform control failure; CRM induction active."
        },
        {
            site: "Regional Fleet Site",
            model: "Genie J-6034",
            serialNumber: "710",
            issue: "Cylinder locking pins worn, rotary seals partially fitted, and wiring heating occurred upon restart.",
            action: "Delhi store dispatched lock pins; remaining rotary seals being fitted and wiring heating rectified.",
            logistics: "Lock pins and balance rotary seals dispatched from Delhi store.",
            clarification: "Platform diesel engine function harness being configured to eliminate heating.",
            pendingIssue: "Install lock pins, fit remaining rotary seals, and verify engine harness.",
            status: "Under Overhaul — Lock pins sourced; rotary seals and harness wiring underway."
        },
        {
            site: "Panipat Project Site",
            model: "Model 450 Boom Lift",
            serialNumber: "030077669",
            issue: "Engine in complete breakdown due to a blown 1-notch cylinder head gasket.",
            action: "Technician Praveen carrying 1-notch gasket to Panipat tonight for immediate cylinder head replacement.",
            logistics: "1-notch gasket hand-carried by traveling technician on night transit.",
            clarification: "Hand-carried transit eliminates multi-day courier delay for engine repair.",
            pendingIssue: "Technician Praveen arrival tonight to install 1-notch gasket and torque head.",
            status: "Spares In Transit — Praveen hand-carrying 1-notch gasket to Panipat tonight."
        },
        {
            site: "Regional Fleet Depot",
            model: "800 Boom Lift",
            serialNumber: "Unit 800",
            issue: "Third-party axle fabrication failed and smoked upon installation due to incorrect tolerances.",
            action: "Management aborted uncertified local repairs; damaged axle assembly being shipped to Delhi depot.",
            logistics: "Axle assembly being packed for transport to Delhi central engineering depot.",
            clarification: "Precision OEM machining at central workshop required to prevent axle destruction.",
            pendingIssue: "Dispatch damaged axle to Delhi central depot for certified precision machining.",
            status: "Depot Transfer — Local fabrication aborted; axle assembly shipping to Delhi depot."
        },
        {
            site: "Korba Project Site",
            model: "JCB 2040",
            serialNumber: "3534",
            issue: "Touch pad control keypad console damaged and non-responsive.",
            action: "Umesh Kumar and store team identifying exact JCB OEM part number for urgent courier dispatch.",
            logistics: "OEM part catalogue cross-referenced for keypad procurement.",
            clarification: "Defective keypad prevents operator platform elevation.",
            pendingIssue: "Confirm JCB part number and place courier order for replacement keypad.",
            status: "Part Sourcing — OEM part number identification underway for courier dispatch."
        },
        {
            site: "Ambala / Chandigarh Site",
            model: "Genie GS-1932",
            serialNumber: "21730",
            issue: "Recurrent starting issues and safety limit sensor calibration tripped out of tolerance.",
            action: "Umesh Kumar coordinating limit recalibration; warning decals for 6 machines handed to Ranjan.",
            logistics: "Calibration sensor and 6-machine decal sets handed to technician Ranjan.",
            clarification: "Limit switch recalibration required to meet safety compliance standards.",
            pendingIssue: "Recalibrate safety limit sensors and affix warning decals.",
            status: "Under Calibration — Sensor recalibration and decal application assigned to Ranjan."
        },
        {
            site: "Outstation Fleet Site",
            model: "Boom Lift",
            serialNumber: "Machine 3046",
            issue: "Electrical supply cutout; platform lift/drive selector toggle button defective, dropping power.",
            action: "Live video call troubleshooting arranged with Senior Technician Trilochan Ji to bypass/replace switch.",
            logistics: "Replacement toggle switches and test leads pre-staged.",
            clarification: "Video conference enables live terminal guidance without outstation travel delay.",
            pendingIssue: "Conduct video call with Trilochan Ji to execute switch troubleshooting and bypass.",
            status: "Remote Video Support — Video troubleshooting session scheduled with Trilochan Ji."
        },
        {
            site: "Client Project Site",
            model: "150ft Ultra Boom Lift",
            serialNumber: "Unit 150ft",
            issue: "Misaligned exhaust silencer pipe discharging heavy smoke directly onto the boom structure.",
            action: "Banarsi deployed to repair exhaust silencer pipe and eliminate smoke discharge.",
            logistics: "Silencer elbow clamps and heat-resistant seals staged on site.",
            clarification: "Client supervisor escalating daily regarding smoke staining and fault codes.",
            pendingIssue: "Complete silencer pipe realignment and test exhaust flow under full engine rev.",
            status: "Under Repair — Banarsi on-site realigning exhaust silencer pipe."
        },
        {
            site: "Client Project Site",
            model: "150ft / 100ft Boom Lift",
            serialNumber: "Large Tyre Unit",
            issue: "Large replacement tire pending for over 1 month, creating equipment immobilization risk.",
            action: "Vinod Pal re-escalated tire photos to Shiv Sir and management for immediate shipment update.",
            logistics: "Tire dispatch status being tracked with regional transporter.",
            clarification: "Over 30 days pending; critical priority to prevent machine grounding.",
            pendingIssue: "Obtain confirmed dispatch docket and ETA from Shiv Sir.",
            status: "Escalated — Tire dispatch confirmation awaited from management."
        }
    ],
    parts: [
        { part: "Bangalore 2-Ton & 3-Ton Traction Battery Banks", context: "Bangalore Material Handling Fleet", statusNextSteps: "Vendor negotiating cell reconditioning for 7-8 packs; 10 new banks ordered." },
        { part: "Hyundai 3-Ton Tilt Cylinder Seal Kit", context: "Bhiwani Site / Hyundai 3-Ton", statusNextSteps: "Cylinder opened on site; Mishra Ji deputing engineer with seal kit." },
        { part: "3-Ton Traction Battery Bank", context: "Jamshedpur Site / 3-Ton Forklift", statusNextSteps: "Dispatched on 30-Aug in road transit (ETA 1-2 days) to revive grounded unit." },
        { part: "PG Electroplast 2-Ton Battery Pack", context: "PG Electroplast (Greater Noida)", statusNextSteps: "Assembled by vendor Manish; payment cleared; dispatch tracking awaited today." },
        { part: "Amaron Traction Battery Bank (GS90D-588)", context: "Scissor Fleet / Unit 588", statusNextSteps: "Old cores being surrendered to central store for scrap credit before replacement PO." },
        { part: "JCB T65 Platform Control Wiring & Console", context: "Jamnagar Site / Serial 539503", statusNextSteps: "Technician Pradeep diagnosing function drops on-site; CRM induction active." },
        { part: "Cylinder Safety Lock Pins & Rotary Seals", context: "J-6034 / 710 Boom Lift Fleet", statusNextSteps: "Delhi store dispatched lock pins; remaining rotary seals being fitted on site." },
        { part: "Model 450 1-Notch Cylinder Head Gasket", context: "Panipat Site / Serial 030077669", statusNextSteps: "Praveen hand-carrying 1-notch gasket to Panipat tonight for urgent engine repair." },
        { part: "800 Boom Lift Heavy-Duty Axle Assembly", context: "800 Boom Lift Fleet", statusNextSteps: "Local fabrication failed; assembly shipping to Delhi central depot for OEM machining." },
        { part: "JCB 2040 Touch Pad Console Keypad", context: "Korba Site / Serial 3534", statusNextSteps: "Store team cross-referencing JCB OEM part number for urgent courier dispatch." },
        { part: "150ft Exhaust Silencer Elbow & Heavy Tyres", context: "Client Site / 150ft Fleet", statusNextSteps: "Banarsi realigning silencer pipe; large tyre shipment escalated to Shiv Sir." }
    ],
    directives: [
        {
            title: "Mandatory Battery Core Surrender Prior to Procurement Payment (Old Battery Return Credit)",
            points: [
                "Payment for replacement traction batteries strictly withheld until old scrap cores are surrendered for vendor credit.",
                "Field supervisors must raise formal email indents and record dead cell serials and specific gravity logs in CRM.",
                "De-install dead batteries immediately from client premises to prevent pilferage and electrolyte degradation."
            ]
        },
        {
            title: "Outstation Technician Movement & Task Communication Protocol",
            points: [
                "Reassigning technicians between hubs must be coordinated in advance to avoid abandoning high-priority jobs.",
                "Team leads must post a clear 4-point work summary on WhatsApp when handing over active sites.",
                "Ensure continuous coverage and vendor alignment for 24/7 operating facilities like Bangalore."
            ]
        },
        {
            title: "Immediate Ban on Uncertified Third-Party Field Fabrications",
            points: [
                "Drivetrain, steering, and structural load components must never be locally fabricated without engineering clearance.",
                "Ship damaged assemblies to Delhi central depot for certified OEM precision machining instead of wasteful field trials."
            ]
        },
        {
            title: "CRM Machine Registration & Technician Ticket Ownership",
            points: [
                "Every machine discussed in daily meetings must be verified live in CRM before clearing field actions.",
                "Field technicians must ensure breakdown reports and tickets are registered under their own personal technician IDs."
            ]
        },
        {
            title: "Remote Technical Support via Live Video Calling",
            points: [
                "Operators facing intricate electrical or console faults must immediately initiate live video calls with senior specialists.",
                "Video calls enable immediate inspection of terminals, wire color codes, and bypass options, cutting downtime."
            ]
        }
    ],
    actionItems: [
        { person: "Rahul Singh", task: "Follow up with Mishra Ji for immediate engineer dispatch to Bhiwani tilt cylinder; manage Bangalore handover." },
        { person: "Dhruv Sharma", task: "Confirm vendor dispatch docket from Manish for PG Electroplast 2-ton battery pack; track Jamshedpur shipment." },
        { person: "Jitendra Budhauliya", task: "Ensure Jamnagar T65 (SN 539503) is registered in CRM; coordinate video call with Trilochan Ji for Machine 3046." },
        { person: "Satendra Kumar", task: "De-install dead Amaron battery bank from GS 90 D 588, prepare old core return paperwork, and log in CRM." },
        { person: "Ravikant", task: "Coordinate with Praveen to deliver 1-notch head gasket to Panipat tonight; arrange 800 axle dispatch to Delhi." },
        { person: "Pardeep Tomar", task: "Receive cable photographs from site, log in system, and dispatch electrical cables and lock pins." },
        { person: "Umesh Kumar", task: "Identify JCB 2040 touch pad part number for Korba (SN 3534); coordinate Ambala Genie 1932 limit calibration." },
        { person: "Banarsi", task: "Complete on-site repair and alignment of exhaust silencer on 150ft boom lift to eliminate boom smoke discharge." },
        { person: "Vinod Pal", task: "Send cable photographs to Pardeep Tomar, escalate swapped medical insurance card with admin, and track large tire status." },
        { person: "Trilochan Ji", task: "Conduct technical video call with field operator for Machine 3046 to provide guidance on selector toggle switch." }
    ]
};

async function run() {
    console.log('🚀 Synchronizing September 7, 2026 meeting...');
    const r07 = await syncDailyMeeting(meeting07);
    console.log(`✅ Synced ${r07.meetingId}: ${r07.counts.breakdowns} machines, ${r07.counts.parts} parts, ${r07.counts.directives} directives, ${r07.counts.actionItems} action items.`);

    console.log('\n🚀 Synchronizing September 8, 2026 meeting...');
    const r08 = await syncDailyMeeting(meeting08);
    console.log(`✅ Synced ${r08.meetingId}: ${r08.counts.breakdowns} machines, ${r08.counts.parts} parts, ${r08.counts.directives} directives, ${r08.counts.actionItems} action items.`);
}

run().catch(err => {
    console.error('❌ Failed:', err);
    process.exit(1);
});

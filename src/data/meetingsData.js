export const meetingsData = [
    {
        id: 'meet-2026-09-01',
        title: '01 Sep 2026',
        date: '2026-09-01',
        dateFormatted: '01 Sep 2026',
        focus: 'Fleet Breakdown Resolutions (Jammu, Sanand, Hardoi, Chengalpattu), Assam Landslide Logistics & Genie Control Protection, Maruti Fleet Servicing & Transport Dispatch, Rejected Battery Scrap Clearance, and Vendor Payment Approval Protocol',
        breakdowns: [
            {
                site: 'Assam Site (Jagiroad / Guwahati) — Genie Boom Lift (Tata Client)',
                issue: 'Heavy monsoon rainfall triggered landslides and boulder collapse blocking the 6-lane road between Guwahati and Jagiroad. Machine battery arrived in Guwahati transit overnight but road transit is blocked. Actuator coil (burnt earlier) dispatched by train arriving at 7:00 AM. Control joystick experiences moisture sensitivity, causing control card error lockouts during abrupt operator inputs.',
                action: 'Pravesh Yadav collecting actuator coil from train at 7:00 AM for immediate installation. Coordinating with transporter to move battery to Guwahati railway station for train cargo transport to Jagiroad. Damroo (forklift boy) assigned to assist Pravesh with wiring inspection. Joystick console covered with waterproof protection. Operator briefed on smooth joystick handling; supervisor Imran instructed to provide basic training.',
                status: 'Actuator Coil & Battery Rail Logistics Underway; Weatherproofing & Training in Progress'
            },
            {
                site: 'Jammu Site (Airport & Field Operations) — JLG Fleet Machines (Units 4047 & 1209 / 571)',
                issue: 'Unit 4047 facing power supply cut/failure; Unit 1209 / 571 has motor carbon brush wear. JLG radiator dispatched from Delhi yesterday to avoid high Mumbai vendor cost (₹30,000–40,000).',
                action: 'Technician reaching site today with replacement JLG radiator to inspect carbon brushes on Unit 1209 and diagnose power supply on Unit 4047.',
                status: 'Radiator in Transit; On-Site Motor & Electrical Diagnostics Scheduled Today'
            },
            {
                site: 'Sanand Site (Gujarat) — Zoomlion 450 Scissor Lift (Serial No. 10027)',
                issue: 'Both front tyres severely damaged and worn out, causing machine to stand idle for 15–20 days with escalating client complaints.',
                action: 'Confirmed compatible JLG/JCB tyres from yard/iTech repairs fit Zoomlion 450. Dhruv Sharma authorized immediate payment clearance to tyre vendor (Kaushal/iTech) to dispatch tyres to Sanand today.',
                status: 'Vendor Payment Approved; Tyres Being Dispatched to Sanand'
            },
            {
                site: 'Hardoi Site (UP) — Palfinger 12m Aerial Platform',
                issue: 'Hydraulic oil leakage detected in pipe located directly beneath the coil; machine stopped by client without operator present.',
                action: 'Umesh Kumar shared site leakage photos. Service team dispatching replacement hydraulic hose and technician for on-site fitment.',
                status: 'Hydraulic Leak Photos Verified; Replacement Hose & Technician Mobilization Underway'
            },
            {
                site: 'Chennai Site (Chengalpattu) — 2 Rental Fleet Machines',
                issue: 'Hydraulic pipe leakage on site. Local external technician attended 2 service visits and billed ₹12,000 (₹6,000/visit), but payment was slashed to ₹8,000 (₹4,000/visit), causing the technician to refuse further service calls.',
                action: 'Umesh Kumar to share exact site address. Dhruv Sharma to speak with local technician directly to settle payment and restore uninterrupted field maintenance support.',
                status: 'Dispute Under Direct Resolution by Management; Site Address Forwarded'
            },
            {
                site: 'Maruti Site (Manesar / Gurgaon / Gujarat) — Fleet Deployment & Order Pickers',
                issue: '33 machines stationed at Maruti; 3 Order Picker units down due to camera alignment, fork issues, and missing lock nut. Transport truck carrying replacement equipment suffered a tyre puncture en route.',
                action: 'Transport vehicle departing tomorrow. Dedicated junior service technician (skilled in 5-ton/8-ton servicing from Vapi) assigned to station at Maruti for 4 continuous days of servicing. Ahmedabad technician joining on the 15th to assume long-term Gujarat fleet maintenance.',
                status: '4-Day Dedicated Service Deployment Initiated; Transport Resuming Tomorrow'
            },
            {
                site: 'Gujarat Operations — Order Picker & Fleet Loading',
                issue: 'One machine down due to severed cable; second machine awaiting gate pass / loading clearance from client Pandey.',
                action: 'Damaged cable repaired locally and machine entering operation today. Dispatch loading gate pass confirmed with Pandey. Amit arriving tomorrow to resolve all pending site maintenance matters within 1 day.',
                status: 'Cable Repaired; Dispatch Gate Pass Confirmed'
            }
        ],
        parts: [
            {
                part: 'Actuator Coil',
                context: 'Genie Boom Lift — Tata Project, Jagiroad Site (Assam)',
                statusNextSteps: 'Dispatched and arriving today via train at 7:00 AM. Pravesh Yadav collecting for immediate on-site fitment; Vinod Yadav on standby for backup dispatch if required.'
            },
            {
                part: 'Heavy-Duty Traction Battery Pack',
                context: 'Genie Boom Lift / Fleet Equipment — Jagiroad Site (Assam)',
                statusNextSteps: 'Arrived in Guwahati transit overnight. Transporter transferring battery to Guwahati railway station to bypass road landslide via train cargo to Jagiroad.'
            },
            {
                part: 'Front Tyres (JLG / Zoomlion Compatible)',
                context: 'Zoomlion 450 Scissor Lift (Serial No. 10027) — Sanand Site (Gujarat)',
                statusNextSteps: '2 front tyres required. Payment cleared today for tyre vendor (Kaushal / iTech repaired stock) to enable immediate shipment to site.'
            },
            {
                part: 'JLG Radiator Assembly',
                context: 'JLG Fleet Equipment — Jammu Airport / Field Site',
                statusNextSteps: 'Dispatched from Delhi inventory yesterday (saving ₹30,000–40,000 compared to Mumbai market). Arriving today for technician installation.'
            },
            {
                part: 'Motor Carbon Brushes & Electrical Supply Cable',
                context: 'Fleet Machines (Serial Nos. 4047 & 1209 / 571) — Jammu Airport Site',
                statusNextSteps: 'Technician reaching site today to replace worn carbon brushes on Unit 1209 and diagnose power supply on Unit 4047.'
            },
            {
                part: 'Hydraulic Hose & Coil Fittings',
                context: 'Palfinger 12m Aerial Platform — Hardoi Site (UP)',
                statusNextSteps: 'Leaking hydraulic line under the coil identified from photos; replacement hose assembly being prepared for technician fitment.'
            },
            {
                part: 'JCB 45 / 43-13238 Battery Charger',
                context: 'JCB Model 43-13238 — Mundra Site (Gujarat)',
                statusNextSteps: 'Charger reached Mundra site in July. Umesh Kumar to verify whether local technician installed the new unit or repaired the previous one. Local Indian charger conversion feasibility reviewed.'
            },
            {
                part: 'Motor & Pump Assembly',
                context: 'Boom Lift / Yard Refurbishment Fleet — Mundra / Delhi Yard',
                statusNextSteps: 'Tracked at Janakpuri courier hub. Workshop team dispatched to collect and expedite machine assembly.'
            },
            {
                part: 'Fleet Cross-Rent Branding Stickers & Manuals',
                context: 'JCB, Scissor & Boom Lifts (15 units) — Deployments to Sanand (12), Mandir (5), Rajkot, Vadodara, Chandigarh & Jammu',
                statusNextSteps: '15 sheets of Cross-Rent branding stickers, JCB books, and JK Paper checklist printed (₹7,788). Payment cleared for Kaushal to release materials.'
            },
            {
                part: 'Rejected Batteries & Scrap Clearance',
                context: 'Kolkata (2 chargers + batteries), Bangalore (3 batteries), JK Paper, Bhiwadi & Delhi Yard',
                statusNextSteps: 'Transporters being arranged for Kolkata & Bangalore returns. Rate finalized at ₹108–109/unit for scrap buyer to lift all rejected batteries from JK Paper, Bhiwadi, and Yard ahead of safety audits.'
            }
        ],
        directives: [
            {
                title: 'Daily Vendor Payment Clearance Window (5:30 PM – 6:00 PM)',
                points: [
                    'To eliminate payment pendency for critical suppliers (Gama Power, tyre repairers, local mechanics, printers), Dhruv Sharma and Jitendra Budhauliya will conduct a dedicated 10-minute daily review from 5:30 PM to 6:00 PM to approve all verified invoices.',
                    'Vendor credit lines must not be compromised over small balance delays.'
                ]
            },
            {
                title: 'Mandatory Video Camera On for All Field Personnel',
                points: [
                    'All site supervisors, field service engineers, and technicians attending morning operational syncs must keep their cameras ON starting tomorrow.'
                ]
            },
            {
                title: 'Genie Control Protection & Operator Handling Protocol',
                points: [
                    'Genie joystick electronics and control cards are sensitive to moisture and rapid multi-directional inputs. Site teams must install waterproof covers during rain and instruct operators on smooth joystick handling to prevent error lockouts.'
                ]
            },
            {
                title: 'Transparent Outstation Local Vendor Rate Alignment',
                points: [
                    'Before assigning emergency breakdown visits to third-party local mechanics (e.g. Chengalpattu), visit rates and travel costs must be clearly agreed upon in advance and paid promptly without arbitrary post-service deductions.'
                ]
            },
            {
                title: 'Fleet Commissioning & Branding Verification',
                points: [
                    'Before machines depart for client deployments (Sanand, Rajkot, Vadodara, Chandigarh, Jammu), store and operations teams must verify whether units are company fleet, sales, or cross-rental, ensuring battery commissioning (by Lochan ji for JCB) and Cross-Rent stickers are completed.'
                ]
            }
        ],
        actionItems: [
            { person: 'Dhruv Sharma', task: 'Conduct daily 5:30 PM – 6:00 PM payment clearance sync with Jitendra to resolve vendor pendencies (Kaushal, Gama Power, tyre vendors); speak with Chengalpattu local technician to resolve payment dispute; oversee operator training protocols and camera-on compliance.' },
            { person: 'Jitendra Budhauliya', task: 'Finalize scrap battery buyer pickup at ₹108–109 rate for JK Paper, Bhiwadi, and yard stock today; arrange transport logistics for lifting rejected batteries/chargers from Kolkata and Bangalore; track Mundra motor & pump from Janakpuri hub; coordinate candidate Gupta 1-week yard trial.' },
            { person: 'Ravi Tiwari', task: 'Finalize cable repair on Gujarat order picker and follow up with Pandey for second machine loading gate pass; assist with transport arrangements for Kolkata charger/battery return; coordinate Maruti transport departure tomorrow.' },
            { person: 'Pravesh Yadav', task: 'Collect Genie actuator coil from train at 7:00 AM and install on Tata site machine at Jagiroad; coordinate with transporter to receive replacement battery via railway station cargo; work with Damroo on wiring diagnostics and maintain waterproof joystick covering.' },
            { person: 'Umesh Kumar', task: 'Track transit delivery of JLG radiator, carbon brushes, and electrical spares for Jammu Airport machines (Units 4047 & 1209); forward Chengalpattu site address to Dhruv; verify charger status on JCB unit 43-13238 at Mundra.' },
            { person: 'Shiv Uniyal', task: 'Ensure immediate release of payment to Kaushal/iTech for Zoomlion 450 front tyres and track shipment to Sanand; track printed stickers and checklist batch.' },
            { person: 'Pardeep Tomar', task: 'Call Lochan ji for battery commissioning on new JCB fleet machines; distribute Cross-Rent branding stickers across machines heading to Sanand (12), Mandir (5), Rajkot, Vadodara, Chandigarh, and Jammu.' },
            { person: 'Sushil Mishra', task: 'Schedule candidate Gupta for a 1-week technical trial at Delhi yard before field deployment; expedite Amit arrival at Gujarat site tomorrow to close open maintenance points.' }
        ]
    },
    {
        id: 'meet-2026-08-31',
        title: '31 Aug 2026',
        date: '2026-08-31',
        dateFormatted: '31 Aug 2026',
        focus: 'Google Forms Parts Repair Escalation, Battery Capacity (6V 250Ah) & Cable Tree Assembly, Machine Angle Data Monitoring & Rotary Shield Installation',
        breakdowns: [
            {
                site: 'Fleet Breakdown Operations & Site Issues',
                issue: 'Multiple fleet machines operating with ongoing breakdown issues and operator complaints raised during site operations (17:34, 28:49).',
                action: 'Jitendra Budhauliya and Shiv Uniyal verifying live working status and breakdown details against Google Sheets and mobile application entries. Shift parts according to stock logic and escalate repair requirements through standardized Google Forms.',
                status: 'Active Troubleshooting & Complaint Verification Ongoing'
            },
            {
                site: 'Tool & Fleet Refurbishment (Internal Motor & Radiator)',
                issue: 'Internal motor tool issues identified requiring physical diagnostics; radiator condition needs verification and repair follow-up (14:57, 16:18).',
                action: 'Jitendra Budhauliya and Umesh Kumar checking internal motor mechanism and confirming radiator condition for overhaul.',
                status: 'Inspection & Overhaul in Progress'
            },
            {
                site: 'Rajpura & Visited Field Sites',
                issue: 'Dhruv Sharma reported site visit observations regarding machine operating limits and battery cell capacity constraints (40:51, 45:38).',
                action: 'Dhruv Sharma and technical leads documenting battery performance, capacity observations (6V 250Ah), and making second standby battery cells available if required.',
                status: 'Site Observations Documented; Standby Battery Procurement Coordinated'
            },
            {
                site: 'Fleet Telematics & Angle Sensor Job Monitoring',
                issue: 'False machine angle sensor data and duplicate logs flagged during telemetry data collection (46:31, 46:37).',
                action: 'Shiv Uniyal leading job monitoring data collection conference to resolve sensor bypass issues and streamline accurate tracking without data duplication.',
                status: 'Data Review & Conference Review Planned'
            }
        ],
        parts: [
            {
                part: 'Battery Cells (6 Volt / 250 Ampere)',
                context: 'Rajpura / Field Fleet Power Units',
                statusNextSteps: 'Confirmed requirement of 6V 250Ah battery cells by Vaibhav and Shiv. Satendra Kumar confirming stock and cable availability; standby secondary batteries being sourced.'
            },
            {
                part: 'Cable Trees & Baskets (Rotary Shield)',
                context: 'Rotary Shield Installation & Harness Protection',
                statusNextSteps: 'Jitendra Budhauliya preparing cable tree assemblies and baskets for rotary shield installation to prevent wire entanglement and delay.'
            },
            {
                part: 'Part No. 245245 (Last 1f Sample)',
                context: 'Fleet Spare Procurement & Replacement',
                statusNextSteps: 'Pardeep Tomar confirmed part number 245245 (ending in 1f). Sushil Mishra and Satendra Kumar to ensure physical sample correctness and documentation before batch procurement.'
            },
            {
                part: 'Consolidated Service Materials & Spares',
                context: 'Workshop & Yard Spares Inventory',
                statusNextSteps: 'Dhruv Sharma and Pardeep shifting parts based on stock logic prioritization and breakdown urgency. Open points for remaining service materials to be finalized in next review.'
            }
        ],
        directives: [
            {
                title: 'Google Form Repair Escalation & Stock Allocation Logic',
                points: [
                    'All machine repair requirements and spare part requisitions must be formally logged via Google Forms before parts are shifted or issued.',
                    'Store and workshop teams (Pradeep) must prioritize part shifting based on logical breakdown urgency and available inventory math.'
                ]
            },
            {
                title: 'Strict Sample Verification & Part Number Accuracy',
                points: [
                    'Prior to vendor ordering, exact part numbers (e.g. Part No. 245245) and physical samples must be cross-verified and validated to avoid incorrect procurement.',
                    'Paper requirements and technical specifications must be reconciled before purchase execution.'
                ]
            },
            {
                title: 'Telemetry Data Integrity & Job Monitoring Protocol',
                points: [
                    'Technicians and monitoring teams must verify telematics sensors to prevent bypassing false angle readings or creating duplicate entries.',
                    'Daily conference calls to review job card execution and operational complaints logged in Google Sheets.'
                ]
            }
        ],
        actionItems: [
            { person: 'Dhruv Sharma', task: 'Escalate repair requirements using Google Forms; implement stock logic prioritization for part shifting; document site visit observations regarding machine battery capacity.' },
            { person: 'Jitendra Budhauliya', task: 'Check internal motor for tool issues; inspect radiator condition; verify Google Sheets complaint logs; fabricate cable trees and baskets for rotary shield installation; finalize service material specs.' },
            { person: 'Satendra Kumar', task: 'Confirm stock availability for batteries and cables; verify sample correctness for Part No. 245245; reconcile open meeting points.' },
            { person: 'Shiv Uniyal', task: 'Verify machine breakdown and working status; collect monitoring telematics data while avoiding duplicate entries; lead job monitoring conference.' },
            { person: 'Pardeep Tomar', task: 'Shift parts in store based on breakdown priority logic; verify Part No. 245245 (Last 1f) sample details.' },
            { person: 'Sushil Mishra', task: 'Ensure physical sample corrections and verify paper requirements for pending spare orders.' },
            { person: 'Vaibhav Chauhan', task: 'Document and publish 30 Aug (Sunday Holiday) and 31 Aug 2026 daily meeting summary; coordinate 6V 250Ah battery capacity specifications.' },
            { person: 'Shivam Pandey', task: 'Ensure all operational site complaints and repair tickets are properly logged and updated in Google Sheets.' }
        ]
    },
    {
        id: 'meet-2026-08-30',
        title: '30 Aug 2026',
        date: '2026-08-30',
        dateFormatted: '30 Aug 2026',
        isHoliday: true,
        holidayName: 'Sunday (Weekly Off)',
        focus: 'Weekly Official Holiday (Sunday) – Office & Fleet Operations Closed',
        breakdowns: [],
        parts: [],
        directives: [],
        actionItems: []
    },
    {
        id: 'meet-2026-08-29',
        title: '29 Aug 2026',
        date: '2026-08-29',
        dateFormatted: '29 Aug 2026',
        focus: 'Maruti 45ft AGM Battery Swaps & Night Power Cutoff, Khurja Cutter Issue, Scrap Battery Clearance, Yard Team Job Cards & Public Transport Health Mandate',
        breakdowns: [
            {
                site: 'Maruti Site (45ft Boom Lift)',
                issue: 'Machine battery pack had 1 damaged unit and a mismatched 6V 250Ah battery instead of required 370/390Ah AGM. Charger delivered 2 days prior remained uncollected/unconnected on-site. Critical site constraint: Tata power distribution board (DB) cuts power daily at 9:00 PM, preventing overnight machine charging.',
                action: 'Khemchand instructed to replace all 8 AGM batteries immediately today to make the rental machine operational. Pardeep Tomar to coordinate with supervisor Dheeraj regarding charger pickup. Vinay Singh and Dhruv Sharma to escalate DB night power cutoff with Tata/client management.',
                logistics: 'All 8 replaced batteries to be packed in original wooden crates and booked via transport to Delhi yard.',
                status: 'All 8 Batteries Being Replaced Today; Night Power Issue Escalated to Client'
            },
            {
                site: 'Maruti Sites (Bangalore & Gujarat Deployments)',
                issue: 'Client repeatedly calling for running and commissioning (OB) of machine delivered to Bangalore; service pending for 8 fleet machines with spare parts already on site.',
                action: 'Anuj assigned for Bangalore Maruti service (familiar with site machinery). New technician joining post-1st to be deployed from Delhi to handle Gujarat operations.',
                status: 'Technician Mobilization Planned (Anuj for Bangalore, New Joiner for Gujarat)'
            },
            {
                site: 'Khurja Site (JLG 60ft / Model 600)',
                issue: 'Boom lift facing cutter / wire cutting malfunction on machine for the past 2 days.',
                action: 'Ravi Tiwari and Khemchand to identify exact serial/model details and open an immediate job card in the mobile application for technician dispatch and troubleshooting.',
                status: 'Job Card Opening & Serial Verification in Progress'
            },
            {
                site: 'Yard Workshop / Fleet Refurbishment',
                issue: '5-ton machine standing with brake work pending; multiple scissor and boom lifts (1930 models, 3384, 2632, 2620, JCB, and Genie ex-Rajasthan) require service, battery checks, and unloading.',
                action: 'Service team deployed (Raj Kishore, Govind, Mantu, Babulal, Ranjan, helper) in pairs (1 senior + 1 junior per machine). 5-ton brake repair being finalized today. Forklift unable to unload 2 new long machines; specialized unloading arranged.',
                status: 'Multi-Mechanic Team Deployed with Individual Job Cards'
            },
            {
                site: 'Assam Site (Jagiroad / Guwahati)',
                issue: 'Machine has been standing idle for 1.5 months awaiting replacement battery (delayed 45 days in bus transit); engine oil, hydraulic oil, and filter service overdue.',
                action: 'Pardeep Tomar actively tracking bus parcel logistics for battery. Imran Khan instructed to prepare consolidated machine spares/oil list by 1:00 PM to initiate direct OEM supply via Mishra ji.',
                status: 'Battery Delivery Follow-up & Spares List Compilation Underway'
            },
            {
                site: 'Haldiram / Odisha / Bihar Movement',
                issue: 'Machinery movement from Haldiram pending; machine transfer for Odisha/Bihar awaiting trailer truck arrangement.',
                action: 'Vaibhav Chauhan and Ravi Tiwari to remind and coordinate with Rahul to book a 450 trailer truck for machine mobilization.',
                status: '450 Truck Booking Coordination Pending with Rahul'
            }
        ],
        parts: [
            {
                part: 'AGM Fleet Batteries (8 Units - 6V 370/390Ah)',
                context: 'Maruti 45ft Boom Lift',
                statusNextSteps: 'Replaced on site today by Khemchand. All 8 removed batteries to be packed in wooden boxes and returned to Delhi yard via transport.'
            },
            {
                part: 'Old Scrap Batteries (Entire Yard Stock)',
                context: 'Yard Safety & Inventory Clearance',
                statusNextSteps: 'Negotiated at ₹109 per unit. Ravi Tiwari to coordinate with scrap vendor to lift all old batteries within 2–3 days ahead of Singhania Sahab / safety management visit on 1st.'
            },
            {
                part: 'Limit Switches',
                context: 'Workshop Fleet Refurbishment',
                statusNextSteps: 'Yard stock depleted. Pardeep sending Raju to market for direct procurement. Existing repairable switches to be reconditioned.'
            },
            {
                part: 'Boom Extension Rods / Sticks (डंडे)',
                context: 'Yard Workshop Maintenance',
                statusNextSteps: 'Old bent/damaged rods to be straightened, repaired, and painted by dedicated helper to maintain standby spare stock.'
            },
            {
                part: 'External Cable Tray (Part No. 54 14 15)',
                context: 'Z-60 Boom Lift (Satendra Request)',
                statusNextSteps: 'Satendra instructed to log exact length and specification requirement in Google Sheets for purchase order release.'
            },
            {
                part: 'Hydraulic Oil, Engine Oil & Filter Kits',
                context: 'Assam (Jagiroad / Guwahati) Fleet',
                statusNextSteps: 'Imran Khan submitting consolidated requirement list by 1:00 PM for direct OEM purchase order dispatch via Mishra ji.'
            }
        ],
        directives: [
            {
                title: 'Mandatory Public Transport Health & Mask Protocol',
                points: [
                    'Due to seasonal weather shifts and surging viral infections/hospitalizations, all staff and technicians traveling via Metro, buses, or shared public transport must wear protective face masks.',
                    'Store team (Dinesh) to order bulk black protective masks online immediately for distribution to all workshop and field service personnel.'
                ]
            },
            {
                title: 'Mandatory Job Card Opening & Digital Tracking',
                points: [
                    'Every machine attended at customer sites or undergoing workshop refurbishment must have a digital Job Card opened in the mobile app before commencing work.',
                    'Senior and junior mechanic pairs must be assigned to specific machine serial numbers, and signed completion reports must be submitted before departure.'
                ]
            },
            {
                title: 'Scrap Clearance & Yard Safety Audit Compliance',
                points: [
                    'All dead/scrap battery inventory, discarded parts, and scrap metal must be cleared from the yard within a strict 2-3 day window ahead of executive safety inspections on the 1st.',
                    'Defective batteries returning from sites must remain in designated packaging until scrap pickup.'
                ]
            },
            {
                title: 'On-Site Charging & Client Power Verification',
                points: [
                    'Site supervisors must verify power supply continuity at client Distribution Boards (DB). If client shuts power off at night (e.g. 9:00 PM cutoff), charging schedules or dedicated power feeds must be escalated in writing.'
                ]
            }
        ],
        actionItems: [
            { person: 'Dhruv Sharma', task: 'Authorize urgent mask bulk order; review Assam spares list at 1:00 PM; coordinate client discussions regarding Maruti DB power cutoff.' },
            { person: 'Khemchand', task: 'Complete replacement of all 8 AGM batteries on Maruti 45ft boom lift today; pack old batteries into wooden crates for return dispatch.' },
            { person: 'Pardeep Tomar', task: 'Deploy workshop mechanics in pairs with assigned job cards; send Raju to procure limit switches; supervise boom stick straightening and painting; expedite Assam battery delivery.' },
            { person: 'Imran Khan', task: 'Compile and share consolidated oil and filter requirement list for Assam/Guwahati machines by 1:00 PM with Dhruv and Vaibhav.' },
            { person: 'Ravi Tiwari', task: 'Contact scrap battery buyer at ₹109 negotiated rate for yard clearance; open Khurja 60ft boom lift job card and coordinate client follow-up.' },
            { person: 'Shivam Pandey', task: 'Coordinate with Mukesh to generate, finalize, and scan customer/vendor bills before lunch.' },
            { person: 'Vaibhav Chauhan', task: 'Log and publish 28 Aug (Holiday) and 29 Aug 2026 operational meeting summaries; conduct Daily Operator Log App demo at 2:30 PM; submit desktop workstation specifications.' },
            { person: 'Vinay Singh', task: 'Follow up on Maruti Bangalore site machine running (Anuj deployment) and coordinate 450 trailer logistics with Rahul.' }
        ]
    },
    {
        id: 'meet-2026-08-28',
        title: '28 Aug 2026',
        date: '2026-08-28',
        dateFormatted: '28 Aug 2026',
        isHoliday: true,
        holidayName: 'Rakshabandhan',
        focus: 'Holiday for Rakshabandhan – Office & Fleet Operations Closed',
        breakdowns: [],
        parts: [],
        directives: [],
        actionItems: []
    },
    {
        id: 'meet-2026-08-27',
        title: '27 Aug 2026',
        date: '2026-08-27',
        dateFormatted: '27 Aug 2026',
        focus: 'Breakdown Closures, AGM vs Flooded Battery Protocol, Jamnagar Cable Tray & Mundra Cross-Rent Spares',
        breakdowns: [
            {
                site: 'Vapi / JK Paper',
                issue: 'Wheel sound reported on running machine; 2 machines (507 and 300) are currently down with battery & mechanical issues.',
                action: '23 fleet machines operating on site. Technician assigned to inspect wheel noise on paper mill unit and troubleshoot breakdowns on 507 and 300.',
                status: 'Active Breakdown (23 Running, 2 Down - Units 507 & 300)'
            },
            {
                site: 'Noida 143 (1930 Models)',
                issue: 'Previous drive and function motor failure on 2 scissor lift units (ex-Mumbai).',
                action: 'Replacement motors successfully installed. Both 1930 machines tested, fully operational, and ready for work.',
                status: 'Breakdown Closed / Resolved'
            },
            {
                site: 'Samsung Display',
                issue: 'Previous loud charger transformer noise and charging issue reviewed.',
                status: '3-Ton machine is running; 4G charger working stably on site.'
            },
            {
                site: 'Fatehgarh / Desert Sites (JLG 600SJ)',
                issue: 'Radiator failure due to heavy dust accumulation.',
                action: 'New replacement radiator has been ordered from vendor and is in transit. Machine will be serviced and fitted immediately upon arrival.',
                status: 'Pending New Radiator Delivery'
            },
            {
                site: 'Jamnagar Site (CT-5, Z-60 & Unit 734)',
                issue: 'Servicing needed for CT-5 and Z-60 machines. Unit 734 facing chronic cable tray issue.',
                action: 'Deepak assigned with travel ticket to attend machines. Jitendra to coordinate cable tray directly with Mumbai depot / crane client to avoid expensive third-party booking fees.',
                status: 'Deepak Attending Site; Cable Tray Logistics in Progress'
            },
            {
                site: 'Kolkata Site',
                status: 'Machine cleaning, greasing, and battery check completed.',
                pendingIssue: 'Engine oil and filter replacement remains pending Damru Patra arrival.'
            },
            {
                site: 'Korba & Anuppur Sites',
                action: 'Service scheduled for Monday. Vinod Pal\'s travel ticket to be booked for Saturday to reach by Sunday evening for gate pass processing before Monday morning start.',
                logistics: 'CRM service ticket reassigned to Ram Babu for on-site closure.'
            },
            {
                site: 'Udyog Bhawan / Lucknow (450 / 45 ft Boom Lift)',
                action: 'Ranjan dispatched to Udyog Bhawan to thoroughly inspect and test 45 ft machine prior to dispatch to Lucknow.',
                status: 'Pre-dispatch Inspection Underway'
            },
            {
                site: 'Mundra Site / Access System Cross-Rent (660SJ Boom Lift)',
                issue: 'Cross-rented 660SJ machine returned in severely damaged condition (platform wiring pulled out, damaged joystick, broken components).',
                action: 'Vinay Singh and Jitendra to inspect damaged parts (hose pipe, fan belt, battery change, local repairs) and prepare an itemized cost sheet for office billing reconciliation against Access System.',
                logistics: 'Office billing department to raise recovery invoice with Access System.'
            },
            {
                site: 'Kasna (600S)',
                status: 'Machine running on site; hour meter and toggle switch replacement queued for next technician visit.'
            },
            {
                site: 'Saint-Gobain',
                action: 'Safety camera installation requested by Mukesh on ready machine before final dispatch.'
            }
        ],
        parts: [
            {
                part: 'AGM vs Flooded (Water) Batteries',
                context: 'Fleet Battery Pack Replacement',
                statusNextSteps: 'Dispute flagged by Pardeep Tomar: site received 3 flooded water batteries and only 1 AGM battery. Mixing AGM with flooded batteries causes uneven charging and machine failure. Trilochan to coordinate with Pushpinder on site to ensure matched AGM batteries and dedicated AGM chargers are deployed.'
            },
            {
                part: '8 General Fleet Batteries & Platform Controllers',
                context: 'J20 / General Fleet Inventory',
                statusNextSteps: 'Dhruv Sharma instructed immediate payment clearance. Sushil Mishra & Jitendra to ensure dispatch by evening once payment is confirmed.'
            },
            {
                part: 'Platform Control Board (0241)',
                context: 'Cross-Rent Scissor Lifts',
                statusNextSteps: 'Dispatched yesterday by Pradeep to replace damaged controller.'
            },
            {
                part: '1930 Drive & Function Motors',
                context: 'Noida 143 Scissor Lifts',
                statusNextSteps: 'Installed successfully; both machines back in full operation.'
            },
            {
                part: 'Cable Tray (Unit 734)',
                context: 'Jamnagar Site (600SJ)',
                statusNextSteps: 'Direct dispatch being organized from Mumbai yard to avoid third-party reservation costs.'
            },
            {
                part: 'JLG Battery Box',
                context: 'Jamnagar / Fleet Spares',
                statusNextSteps: 'Sizing specifications being verified by Satendra Kumar before placing vendor order.'
            },
            {
                part: 'Access System Replacement Spares',
                context: 'Mundra Damaged Unit (660SJ)',
                statusNextSteps: 'Itemize all replaced parts (hose pipe, fan belt, battery, local parts) in Excel for commercial billing office.'
            }
        ],
        directives: [
            {
                title: 'Strict Battery Chemistry & Charger Compatibility',
                points: [
                    'Never mix AGM (sealed) batteries with conventional flooded/water lead-acid batteries within the same machine pack.',
                    'AGM batteries must always be paired with an AGM-specific charging profile/charger to prevent rapid degradation.',
                    'Storekeeper and site technicians must double-check battery specifications and machine requirements prior to dispatch.'
                ]
            },
            {
                title: 'Google Sheets PO & Cross-Rent Compliance',
                points: [
                    'All purchase orders and cross-rental equipment movements must be recorded immediately in the central Google Sheets / Google Form by Pravesh, Rahul, and Jitendra.',
                    'Damaged return machinery must be documented with photos and itemized parts sheets for customer/vendor billing recovery.'
                ]
            },
            {
                title: 'Site Travel & Gate Pass Advance Booking',
                points: [
                    'Technicians traveling for Monday service visits (e.g. Vinod Pal for Anuppur) must have tickets booked for Saturday to ensure Sunday arrival and gate pass clearance.'
                ]
            },
            {
                title: 'Inter-Team Professional Communication',
                points: [
                    'All teams must maintain a calm, constructive, and respectful tone during daily breakdown and logistics coordination calls.'
                ]
            }
        ],
        actionItems: [
            { person: 'Dhruv Sharma', task: 'Authorize instant payment release for 8 batteries and platform controllers to expedite evening dispatch.' },
            { person: 'Sushil Mishra', task: 'Monitor and update payment status for batteries/controllers; follow up on Kolkata site oil and filter replacement.' },
            { person: 'Jitendra Budhauliya', task: 'Confirm dispatch of 8 batteries and controllers; update POs & cross-rent entries in Google Sheets; resolve Jamnagar cable tray logistics directly with Mumbai; rectify battery mix-up on site.' },
            { person: 'Pardeep Tomar & Trilochan Sharma', task: 'Coordinate with Pushpinder on site to resolve AGM battery and charger requirement; verify battery inventory specs before shipping.' },
            { person: 'Satendra Kumar', task: 'Track Jamnagar cable tray delivery and confirm JLG battery box dimensions/requirements.' },
            { person: 'Vinay Singh', task: 'Compile itemized damage and parts replacement sheet (pipes, fan belt, battery) for Mundra Access System machine for office billing.' },
            { person: 'Vinod Pal', task: 'Book Saturday travel ticket to arrive at Anuppur by Sunday evening for Monday service kickoff.' },
            { person: 'Vaibhav Chauhan', task: 'Update daily operational meeting summary (27 Aug 2026) and coordinate CRM service ticket reassignments (Ram Babu).' }
        ]
    },
    {
        id: 'meet-2026-08-26',
        title: '26 Aug 2026',
        date: '2026-08-26',
        dateFormatted: '26 Aug 2026',
        focus: 'Machine Breakdowns, Site Service Operations, Logistics & Parts Procurement',
        breakdowns: [
            {
                site: 'Noida 143',
                issue: 'Function motor failure on 2 machines (ex-Mumbai units); battery & charger issues.',
                action: 'Ambrish dispatched with replacement motor, batteries, and chargers. Trilochan (Service Engineer) visiting site to diagnose whether fault is in the drive motor or function motor.',
                logistics: 'Defective motors and old batteries must be retrieved from the site immediately via Porter to the office.'
            },
            {
                site: 'Samsung Display',
                issue: '3-Ton machine charger transformer has a loud noise issue and is not charging the machine properly.',
                action: 'Single charger available on site; immediate transformer replacement/inspection prioritized to prevent machine stoppage.'
            },
            {
                site: 'Fatehgarh / Desert Sites (JLG 600SJ)',
                issue: 'Radiator failure caused by heavy sand/dust accumulation; previous chemical cleaning failed.',
                action: 'Radiator to be replaced/repaired. Management approved providing air blowers / compressors on sandy sites for routine cleaning.'
            },
            {
                site: 'Jamnagar Site',
                issue: '2 machines down (CT-5 / Z-60 / Z-45 boom lift). Cable tray pending for 5–6 months.',
                clarification: 'Management clarified the machine was purchased from auction/TC and is company-owned (not cross-rent). Invoice to be retrieved from office by Keshav; serial plate photos to be shared.'
            },
            {
                site: 'Kolkata Site',
                status: 'Cleaning and greasing completed. Oil and filter replacement pending arrival of Damru Patra.',
                pendingIssue: 'Key switch bypassed for several months; permanent replacement ordered.'
            },
            {
                site: 'Korba & Anuppur',
                status: 'Laptop dispatched. Service pending for Korba machine. Past complaint resolved on-site; pending CRM closure.'
            },
            {
                site: 'Udyog Bhawan / Lucknow',
                action: '45 ft machine (450) at Udyog Bhawan to be inspected and mobilized for dispatch to Lucknow. 450 freed from NTPC Khurja.'
            }
        ],
        parts: [
            {
                part: 'Control Boards (Platform Controllers)',
                context: '4 Cross-Rent Scissor Lifts',
                statusNextSteps: '2 boards arrived damaged/cut wires. Replacements approved. 1 unit in stock (Part ending in 0241) to be dispatched immediately.'
            },
            {
                part: 'Batteries (8 Units)',
                context: 'J20 / General Stock',
                statusNextSteps: 'Payment to be released today for next-day vendor dispatch.'
            },
            {
                part: 'Hour Meter & Toggle Switch',
                context: 'Kasna (600S)',
                statusNextSteps: 'Dispatched with technician; operator photo requested.'
            },
            {
                part: 'Safety Camera',
                context: 'Saint-Gobain Machine',
                statusNextSteps: 'Payment completed. Hari & Shiv to coordinate camera installation on ready machine before dispatch.'
            },
            {
                part: 'Hydraulic Oil',
                context: 'General Fleet',
                statusNextSteps: 'Orders placed; dispatch expected in 1–2 days.'
            },
            {
                part: '1930 Drive/Function Motors',
                context: 'Workshop / Spares',
                statusNextSteps: 'Explore China sourcing via Shiv and alternate local repair vendors (Jitendra).'
            }
        ],
        directives: [
            {
                title: 'Mandatory PO Placement Rule',
                points: [
                    'POs must be issued to vendors immediately upon requirement identification. PO creation cannot be put on hold for payment approval.',
                    'Google Sheets must reflect: "Order Placed – Pending for Payment".'
                ]
            },
            {
                title: 'Cross-Rent Inventory Protocol',
                points: [
                    'All cross-rent machines must have Google Forms submitted with model, serial number, and cross-rent vendor name (Pravesh / Rahul).',
                    'Physical cross-rent identification stickers/markings must be applied.'
                ]
            },
            {
                title: 'CRM Ticket Management',
                points: [
                    'Vaibhav & Jitendra to review and close all resolved pending CRM service tickets before lunch.'
                ]
            },
            {
                title: 'Defective Part Recovery',
                points: [
                    'Strict instruction to return all replaced parts (batteries, boards, motors) back to the central warehouse via Porter/bike delivery.'
                ]
            }
        ],
        actionItems: [
            { person: 'Dhruv Sharma', task: 'Authorize urgent payments (8 batteries, control boxes).' },
            { person: 'Jitendra Budhauliya & Sushil Mishra', task: 'Coordinate Ambrish/Trilochan at Noida 143; follow up on control bank vendor and alternate motor sourcing.' },
            { person: 'Pardeep Tomar', task: 'Dispatch in-stock controller board (ending in 0241) and track reverse logistics of defective parts.' },
            { person: 'Pravesh Yadav & Rahul Singh', task: 'Fill Google Forms for new scissor lifts; ensure machine cleanliness and tagging.' },
            { person: 'Vaibhav Chauhan', task: 'Coordinate with site leads to close all resolved CRM service calls.' }
        ]
    },
    {
        id: 'meet-2026-08-25',
        title: '25 Aug 2026',
        date: '2026-08-25',
        dateFormatted: '25 Aug 2026',
        focus: 'Machine Repairs, Payment Clearances & Logistics Transfers',
        breakdowns: [
            {
                site: 'Main Workshop / Converter System',
                issue: 'Converter is broken/defective. Payment is pending with Mukesh (00:28); clearing June payment is mandatory to resume operations.',
                action: 'Shiv Uniyal to speak with Mukesh for converter payment clearance.'
            },
            {
                site: 'Noida Site',
                issue: 'Noida machine battery is defective and there is a general shortage of chargers (26:31).',
                action: 'Battery exchange is currently in progress. Umesh Kumar taking action on battery and charger issues; Sushil Mishra sharing live updates.'
            },
            {
                site: 'Workshop / Hyundai Machine (Sales Unit)',
                issue: 'Sales unit parts for Hyundai machine have not arrived yet (02:01). Servicing must be completed within 1 day once parts arrive.',
                action: 'Emails sent to Yogesh and Tarun Jha to expedite Hyundai parts delivery.'
            },
            {
                site: 'Haldia Site',
                issue: 'Machine is running, but Haldia machine connector is broken (13:43). Battery and motor issues encountered.',
                action: 'Technical repair team following up on connector replacement and motor repair plan.'
            },
            {
                site: 'Repair Workshop / 1930 Model Machine',
                issue: 'Model 1930 machine battery is working fine (29:56). Motor repairing plan is being formulated.',
                action: 'Formulate motor repair plan and evaluate vendor cost differences.'
            },
            {
                site: 'Khurja to Lucknow Route',
                issue: 'Machine transfer is stuck and vehicle has been standing idle for months (20:04).',
                action: 'Shifting arrangements queued from Khurja to Lucknow (12:53).'
            }
        ],
        parts: [
            {
                part: 'Hyundai Machine Spare Parts',
                context: 'Workshop / Yard',
                statusNextSteps: 'Delivery awaited from Yogesh and Tarun Jha; 1-day turnaround target upon receipt.'
            },
            {
                part: 'Battery Chargers & Connectors',
                context: 'Noida & Haldia Sites',
                statusNextSteps: 'Shortage flagged; fast-track dispatch instructions issued by Dhruv Sharma.'
            },
            {
                part: 'Converter Assembly',
                context: 'Main Workshop',
                statusNextSteps: 'Payment clearance pending with Mukesh to unlock repair.'
            }
        ],
        directives: [
            {
                title: 'Photo & Video Documentation for Warranty',
                points: [
                    'All machine warranty claims must be supported with high-resolution photos and video proof before vendor submission.'
                ]
            },
            {
                title: 'Site Flooring & Sanitation Standards',
                points: [
                    'Video audit required for fleet machine cleanliness and site flooring condition.'
                ]
            }
        ],
        actionItems: [
            { person: 'Dhruv Sharma', task: 'Send email to Yugesh/Tarun Jha for parts; send Team Deployment Sheet; audit Charger/PCON supply chain.' },
            { person: 'Shiv Uniyal', task: 'Speak with Mukesh regarding converter payment clearance; re-send email for Hyundai parts.' },
            { person: 'Sushil Mishra', task: 'Prepare Warranty Report with photos/videos; send live updates on battery/charger status on WhatsApp.' },
            { person: 'Jitendra Budhauliya', task: 'Conduct training for Raj Kishore; check charger requirements across teams; arrange Mumbai train tickets.' },
            { person: 'Umesh Kumar', task: 'Take action on charger and battery issues; ensure proper battery fitting in fleet vehicles.' },
            { person: 'Vinay Singh', task: 'Take Blue Star order to secure required machinery; follow up with machine repair customers.' }
        ]
    }
];



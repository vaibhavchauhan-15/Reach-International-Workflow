export const meetingsData = [
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



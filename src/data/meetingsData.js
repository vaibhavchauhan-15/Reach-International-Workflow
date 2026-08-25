export const meetingsData = [
    {
        id: 'meet-2026-08-25',
        title: '25 August 2026',
        fullDateFormatted: 'Tuesday, 25 August 2026',
        date: '2026-08-25',
        subtitle: '',
        time: '',
        location: '',
        chairperson: '',
        attendees: [],
        summary: 'Daily operational meeting covering machine repairs (Converter, Noida, Hyundai, Haldia, 1930 Model), payment clearances (Mukesh, Bunty), spare parts procurement (chargers, connectors, Hyundai parts), logistics (Khurja to Lucknow), site sanitation, and team action items.',
        status: '',
        statusColor: '#10b981',
        machineBreakdowns: [
            {
                id: 'mb-25-1',
                machineName: 'Converter System',
                machineCode: 'Converter Unit',
                location: 'Site Location',
                downtime: 'Pending Payment Clearance (00:28)',
                urgency: 'High',
                problemFacing: 'Converter is broken/defective. Payment is pending with Mukesh (00:28); clearing June payment is mandatory to resume operations.',
                servicemanStatus: {
                    serviced: false,
                    servicemanName: 'Shiv Uniyal / Mukesh',
                    serviceStatusText: 'Payment Clearance & Repair Pending',
                    serviceTime: '00:28',
                    serviceNotes: 'Shiv Uniyal to speak with Mukesh for converter payment clearance.'
                },
                partsRequired: [
                    { partName: 'Converter Component / Assembly', qty: '1 Unit', storeStatus: 'Payment Pending', urgency: 'High' }
                ]
            },
            {
                id: 'mb-25-2',
                machineName: 'Noida Machine',
                machineCode: 'Noida Unit',
                location: 'Noida Site',
                downtime: 'Battery Malfunction (26:31)',
                urgency: 'High',
                problemFacing: 'Noida machine battery is defective and there is a general shortage of chargers (26:31). Battery exchange is currently in progress.',
                servicemanStatus: {
                    serviced: false,
                    servicemanName: 'Umesh Kumar / Sushil Mishra',
                    serviceStatusText: 'Battery Exchange In Progress',
                    serviceTime: '26:31',
                    serviceNotes: 'Umesh Kumar taking action on battery and charger issues; Sushil Mishra sharing live updates on WhatsApp.'
                },
                partsRequired: [
                    { partName: 'Replacement Battery Unit', qty: '1 Unit', storeStatus: 'Exchange In Progress', urgency: 'High' },
                    { partName: 'Battery Charger', qty: 'Required', storeStatus: 'Shortage / Dispatch Ordered', urgency: 'High' }
                ]
            },
            {
                id: 'mb-25-3',
                machineName: 'Hyundai Machine (Sales Unit)',
                machineCode: 'Hyundai Unit',
                location: 'Workshop / Yard',
                downtime: 'Awaiting Spare Parts (02:01)',
                urgency: 'High',
                problemFacing: 'Sales unit parts for Hyundai machine have not arrived yet (02:01). Servicing must be completed within 1 day once parts arrive.',
                servicemanStatus: {
                    serviced: false,
                    servicemanName: 'Dhruv Sharma / Shiv Uniyal',
                    serviceStatusText: 'Awaiting Parts Shipment',
                    serviceTime: '02:01',
                    serviceNotes: 'Emails sent to Yogesh and Tarun Jha to expedite Hyundai parts delivery.'
                },
                partsRequired: [
                    { partName: 'Hyundai Machine Spare Parts', qty: 'As Per Order', storeStatus: 'Delivery Awaited', urgency: 'High' }
                ]
            },
            {
                id: 'mb-25-4',
                machineName: 'Haldia Machine',
                machineCode: 'Haldia Unit',
                location: 'Haldia Site',
                downtime: 'Operational with Defect (13:43)',
                urgency: 'Medium',
                problemFacing: 'Machine is running, but Haldia machine connector is broken (13:43). Battery and motor issues encountered.',
                servicemanStatus: {
                    serviced: false,
                    servicemanName: 'Technical Repair Team',
                    serviceStatusText: 'Connector Broken / Motor Repair Planning',
                    serviceTime: '13:43',
                    serviceNotes: 'Repair team following up on connector replacement and motor repair plan.'
                },
                partsRequired: [
                    { partName: 'Machine Connector', qty: '1 Pc', storeStatus: 'Broken - Replacement Needed', urgency: 'Medium' }
                ]
            },
            {
                id: 'mb-25-5',
                machineName: '1930 Model Machine',
                machineCode: 'Model 1930',
                location: 'Repair Workshop',
                downtime: 'Under Repair Planning (29:56)',
                urgency: 'Medium',
                problemFacing: 'Model 1930 machine battery is working fine (29:56). Motor repairing plan is being formulated.',
                servicemanStatus: {
                    serviced: false,
                    servicemanName: 'Repair Team',
                    serviceStatusText: 'Battery OK / Motor Repair Planned',
                    serviceTime: '29:56',
                    serviceNotes: 'Battery verified working fine; motor repair plan under preparation.'
                },
                partsRequired: [
                    { partName: 'Motor Repair Components', qty: 'As Planned', storeStatus: 'Under Planning', urgency: 'Medium' }
                ]
            },
            {
                id: 'mb-25-6',
                machineName: 'Machine Transfer Vehicle (Logistics)',
                machineCode: 'Logistics Unit',
                location: 'Khurja to Lucknow Route',
                downtime: 'Stalled for Months (20:04)',
                urgency: 'Medium',
                problemFacing: 'Machine transfer is stuck and vehicle has been standing idle for months (20:04). Shifting arrangements queued from Khurja to Lucknow (12:53).',
                servicemanStatus: {
                    serviced: false,
                    servicemanName: 'Logistics Team',
                    serviceStatusText: 'Transfer Logistics Pending',
                    serviceTime: '20:04',
                    serviceNotes: 'Arrangements being set up to dispatch machine from Khurja to Lucknow.'
                },
                partsRequired: []
            }
        ],
        keyTopics: [
            'Machine Repair & Payment Clearances: Converter broken, payment pending with Mukesh (00:28), June payment required, Bunty payment rejected & advance payment needed (04:20).',
            'Parts & Delivery: Defective battery link & charger (08:25), Hyundai machine parts delay (02:01), rate negotiations based on legacy rates (08:25).',
            'Machine Operations & Site Status: Haldia machine connector broken (13:43), site flooring & cleaning video submission required (09:56), 1930 Model battery & motor plan (29:56).',
            'Team Communication & Governance: Email updates to Yogesh & Tarun Jha (03:15), rental machine focus, WhatsApp for urgent issues & rejected payments (05:20), formal meeting summary logging (47:52).',
            'Local Support & Logistics: Rambabu on sick leave, Sanand manpower gap (23:25), Khurja to Lucknow machine dispatch (12:53), medical issues (Vinod & Praveen) and laptop dispatch (44:40).'
        ],
        actionItems: [
            { id: 1, task: 'Send email to Yugesh and Tarun Jha for Hyundai parts delivery and communication improvement (03:27)', assignee: 'Dhruv Sharma', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 2, task: 'Send Team Deployment Sheet for machine repair and servicing (23:43)', assignee: 'Dhruv Sharma', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 3, task: 'Issue instructions for quick charger dispatch to resolve charging issues (35:56)', assignee: 'Dhruv Sharma', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 4, task: 'Audit Charger and PCON supply chain to prevent logistics delays (36:14)', assignee: 'Dhruv Sharma', priority: 'Medium', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 5, task: 'Speak with Mukesh regarding converter payment clearance to unlock progress (00:51)', assignee: 'Shiv Uniyal', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 6, task: 'Re-send email for Hyundai machine parts delivery (03:28)', assignee: 'Shiv Uniyal', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 7, task: 'Prepare Warranty Report with photos/videos for machine warranty tracking (22:23)', assignee: 'Sushil Mishra', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 8, task: 'Send live updates on battery and charger status via personal WhatsApp (05:18)', assignee: 'Sushil Mishra', priority: 'Medium', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 9, task: 'Follow up between repair team and customer for smooth repair progress (36:32)', assignee: 'Sushil Mishra', priority: 'Medium', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 10, task: 'Conduct training for Raj Kishore and handle team deployment (45:15)', assignee: 'Jitendra Budhauliya', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 11, task: 'Check charger requirements across teams (36:11)', assignee: 'Jitendra Budhauliya', priority: 'Medium', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 12, task: 'Arrange Mumbai train tickets for team travel (41:32)', assignee: 'Jitendra Budhauliya', priority: 'Medium', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 13, task: 'Take action on charger and battery issues to maintain machine performance (28:37)', assignee: 'Umesh Kumar', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 14, task: 'Ensure proper battery fitting in fleet vehicles (32:15)', assignee: 'Umesh Kumar', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 15, task: 'Take Blue Star order to secure required machinery (36:40)', assignee: 'Vinay Singh', priority: 'High', status: 'Pending', dueDate: '25 Aug 2026' },
            { id: 16, task: 'Follow up with machine repair customers (42:58)', assignee: 'Vinay Singh', priority: 'Medium', status: 'Pending', dueDate: '25 Aug 2026' }
        ],
        departmentUpdates: [
            { dept: 'Machine Repair & Payments', lead: 'Shiv Uniyal & Sushil Mishra', update: 'Converter payment pending with Mukesh; warranty report preparation with photo/video proof active; Bunty payment rejected.' },
            { dept: 'Parts & Delivery', lead: 'Dhruv Sharma & Shiv Uniyal', update: 'Awaiting Hyundai machine parts (1 day turnaround upon receipt); price negotiations on old rates; charger & PCON supply audit.' },
            { dept: 'Site & Machine Operations', lead: 'Umesh Kumar & Repair Team', update: 'Haldia machine connector broken; Noida battery exchange active; 1930 Model battery OK & motor repair planned; site cleaning video audit.' },
            { dept: 'Local Support & Logistics', lead: 'Jitendra Budhauliya & Team', update: 'Khurja to Lucknow machine shifting queued; Rambabu on sick leave; Mumbai train tickets; laptop dispatch planned.' }
        ],
        meetingNotes: 'Priority focus on clearing pending payments (Mukesh & Bunty), expediting Hyundai spare parts delivery, issuing charger dispatches, and submitting photo/video documentation for warranty reports.'
    }
];


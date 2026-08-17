export const totalSlides = 11;

export const slidesData = [
    {
        id: 0,
        tag: 'SOP OVERVIEW • EDITORIAL DECK',
        title: 'OPERATIONAL WORKFLOWS & SOP DIAGRAMS',
        isCover: true,
    },
    {
        id: 1,
        tag: 'CHAPTER 01 • INBOUND INVENTORY',
        title: 'Product In Workflow (Parts / Goods Receiving)',
        desc: 'Receiving ordered parts, gate security verification, store inspection, ERP logging & bin storage.',
        nodes: [
            { step: 'STEP 01', role: 'Shiv / Mishra / Jitendra', roleClass: 'role-mgmt', icon: '🛒', bgClass: 'bg-blue', title: 'Order Initiated', desc: 'Order placed by Management / Authorities', tag: 'PO Approved' },
            { step: 'STEP 02', role: 'Security Guard', roleClass: 'role-guard', icon: '🛡️', bgClass: 'bg-amber', title: 'Delivery Arrival', desc: 'Part delivery check & gate pass entry by Guard', tag: 'Gate Pass Entry' },
            { step: 'STEP 03', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '🔍', bgClass: 'bg-teal', title: 'Check & Verify', desc: 'Physical inspection & PO verification by SM', tag: 'Quality & Qty Check' },
            { step: 'STEP 04', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '📝', bgClass: 'bg-indigo', title: 'Record Entry', desc: 'Log receipt in Inventory Register / System', tag: 'GRN Created' },
            { step: 'STEP 05', role: 'Warehouse', roleClass: 'role-store', icon: '🏬', bgClass: 'bg-green', title: 'Store Location', desc: 'Place product/part in proper bin location', tag: 'In Stock Ready', isSuccess: true }
        ]
    },
    {
        id: 2,
        tag: 'CHAPTER 02 • OUTBOUND INVENTORY',
        title: 'Product Out Workflow (Parts Issuance)',
        desc: 'Processing part requests raised by Service Engineers & Mechanics for machine maintenance.',
        nodes: [
            { step: 'STEP 01', role: 'Service Eng / Mechanic', roleClass: 'role-eng', icon: '🔧', bgClass: 'bg-purple', title: 'Requirement Raised', desc: 'Engineer/Mechanic submits part request slip', tag: 'Requisition Slip' },
            { step: 'STEP 02', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '📋', bgClass: 'bg-teal', title: 'Stock Check', desc: 'Store Manager verifies inventory availability', tag: 'Stock Audit' },
            { step: 'STEP 03', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '⚡', bgClass: 'bg-amber', title: 'In Stock?', desc: 'Check if item is physically available', isDecision: true, yesText: 'YES ➔ Issue', noText: 'NO ➔ Procurement' },
            { step: 'STEP 04', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '📦', bgClass: 'bg-blue', title: 'Issue Part', desc: 'Store Manager issues part to Mechanic', tag: 'Physical Handover' },
            { step: 'STEP 05', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '✍️', bgClass: 'bg-green', title: 'Record Entry', desc: 'Deduct stock in ERP & close request', tag: 'Issue Registered', isSuccess: true }
        ]
    },
    {
        id: 3,
        tag: 'CHAPTER 03 • PROCUREMENT',
        title: 'Procurement of Parts Workflow',
        desc: 'Handling out-of-stock items, purchase requisitions to Mishra Sir, approval & order placement.',
        nodes: [
            { step: 'STEP 01', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '⚠️', bgClass: 'bg-red', title: 'Stock Out Detected', desc: 'SM identifies stock shortage during check', tag: 'Zero Stock Alert', isAlert: true },
            { step: 'STEP 02', role: 'Store Manager (SM)', roleClass: 'role-sm', icon: '📤', bgClass: 'bg-amber', title: 'Send Requisition', desc: 'Send Part Request to Mishra Sir (Purchase HOD)', tag: 'Indent Sent' },
            { step: 'STEP 03', role: 'Mishra Sir', roleClass: 'role-mgmt', icon: '🔍', bgClass: 'bg-purple', title: 'Verification', desc: 'Mishra Sir verifies requirement & vendor price', tag: 'Price & Qty Audit' },
            { step: 'STEP 04', role: 'Mishra Sir', roleClass: 'role-mgmt', icon: '🛒', bgClass: 'bg-green', title: 'Place Order', desc: 'Approve Requisition & issue official PO to OEM', tag: 'PO Issued', isSuccess: true },
            { step: 'STEP 05', role: 'Next Phase', roleClass: 'role-store', icon: '🔄', bgClass: 'bg-blue', title: 'Triggers Product In', desc: 'Inbound shipment transitions into Product In Workflow', tag: 'Click ➔ Slide 1', linkSlide: 1 }
        ]
    },
    {
        id: 4,
        tag: 'CHAPTER 04 • WARRANTY SERVICE',
        title: 'Machine Service Overdue (Under Warranty)',
        desc: 'Handling scheduled maintenance overdue alerts for machines covered under active OEM / Company warranty.',
        nodes: [
            { step: 'STEP 01', role: 'Supervisor / Telematics', roleClass: 'role-sys', icon: '⏰', bgClass: 'bg-red', title: 'Service Due Alert', desc: 'Service due alert triggered / informed by the supervisor', tag: 'Informed by Supervisor', isAlert: true },
            { step: 'STEP 02', role: 'Supervisor', roleClass: 'role-mgmt', icon: '🛡️', bgClass: 'bg-teal', title: 'Warranty Status Check', desc: 'Service warranty check performed by the supervisor', tag: 'Checked by Supervisor' },
            { step: 'STEP 03', role: 'OEM / Reach Service', roleClass: 'role-oem', icon: '📩', bgClass: 'bg-indigo', title: 'Log Service Ticket', desc: 'Raise free OEM service call / warranty claim', tag: 'Free Maintenance Claim' },
            { step: 'STEP 04', role: 'Certified Tech', roleClass: 'role-eng', icon: '🛻', bgClass: 'bg-purple', title: 'Technician Dispatch', desc: 'Deploy certified engineer with genuine OEM service kit', tag: 'On-Site Dispatch' },
            { step: 'STEP 05', role: 'Client / Inspector', roleClass: 'role-client', icon: '✅', bgClass: 'bg-green', title: 'Service & Signoff', desc: 'Execute oil/filter overhaul & sign off checksheet', tag: 'Warranty Certified', isSuccess: true }
        ]
    },
    {
        id: 5,
        tag: 'CHAPTER 05 • NON-WARRANTY SERVICE',
        title: 'Machine Service Overdue (Not Under Warranty)',
        desc: 'Paid service workflow: alert trigger, quotation generation, approval clearance, parts release & overhaul.',
        nodes: [
            { step: 'STEP 01', role: 'Supervisor / Telematics', roleClass: 'role-sys', icon: '⚠️', bgClass: 'bg-red', title: 'Service Overdue Alert', desc: 'Service due alert triggered / informed by the supervisor', tag: 'Informed by Supervisor', isAlert: true },
            { step: 'STEP 02', role: 'Supervisor / Admin', roleClass: 'role-eng', icon: '📄', bgClass: 'bg-amber', title: 'Quotation Estimate', desc: 'Generate estimation for spares, oil & technician labor', tag: 'Cost Estimate' },
            { step: 'STEP 03', role: 'Client / Mgmt', roleClass: 'role-client', icon: '💳', bgClass: 'bg-purple', title: 'Approval & PO', desc: 'Client/Management approves quote & issues PO', isDecision: true, yesText: 'Approved ➔ Execute', noText: 'Rejected ➔ Hold' },
            { step: 'STEP 04', role: 'Store Manager', roleClass: 'role-sm', icon: '📦', bgClass: 'bg-teal', title: 'Parts Issued', desc: 'Product Out workflow executed for service kit', tag: 'Spares Handover' },
            { step: 'STEP 05', role: 'Service Team', roleClass: 'role-eng', icon: '🛠️', bgClass: 'bg-green', title: 'Overhaul & Invoice', desc: 'Complete PM service, safety test & issue tax invoice', tag: 'Job Closed', isSuccess: true }
        ]
    },
    {
        id: 6,
        tag: 'CHAPTER 06 • OEM FLEET ACQUISITION',
        title: 'Machine Procurement from Manufacturer (JCB, Hyundai, Genie, JLG)',
        desc: 'Acquiring heavy equipment & aerial lifts from global OEMs for fleet expansion or client sales.',
        nodes: [
            { step: 'STEP 01', role: 'Leadership / Sales', roleClass: 'role-mgmt', icon: '📊', bgClass: 'bg-blue', title: 'Fleet Expansion Req', desc: 'Demand analysis for Scissor / Boom Lift fleet', tag: 'Req Specs Fixed' },
            { step: 'STEP 02', role: 'OEM Manufacturers', roleClass: 'role-oem', icon: '🏭', bgClass: 'bg-indigo', title: 'OEM RFQ & Negotiation', desc: 'Tender / Quote with JCB, Hyundai, Genie, JLG', tag: 'OEM Commercial Terms' },
            { step: 'STEP 03', role: 'Mishra Sir / Finance', roleClass: 'role-mgmt', icon: '📝', bgClass: 'bg-amber', title: 'PO & Payment', desc: 'Issue PO & process LC / Bank Payment to OEM', tag: 'PO Released' },
            { step: 'STEP 04', role: 'Logistics Team', roleClass: 'role-logistics', icon: '🚛', bgClass: 'bg-purple', title: 'Factory Dispatch & Transit', desc: 'Flatbed shipment, transit insurance & customs', tag: 'Transit Tracked' },
            { step: 'STEP 05', role: 'Yard Team', roleClass: 'role-eng', icon: '🏗️', bgClass: 'bg-green', title: 'PDI & Fleet Tagging', desc: 'Pre-Delivery Inspection at yard & barcode tagging', tag: 'Added to Fleet', isSuccess: true }
        ]
    },
    {
        id: 7,
        tag: 'CHAPTER 07 • MACHINE SALES',
        title: 'Machine Selling to Customer Workflow',
        desc: 'End-to-end sales lifecycle: inquiry, site survey, quotation, agreement, dispatch & operator handover training.',
        nodes: [
            { step: 'STEP 01', role: 'Customer', roleClass: 'role-client', icon: '📞', bgClass: 'bg-blue', title: 'Inquiry Received', desc: 'Customer reaches out via web or direct sales call', tag: 'Lead Qualified' },
            { step: 'STEP 02', role: 'Sales Eng', roleClass: 'role-eng', icon: '📐', bgClass: 'bg-teal', title: 'Site Survey & Sizing', desc: 'Assess working height, load & indoor/outdoor terrain', tag: 'Specs Matched' },
            { step: 'STEP 03', role: 'Sales / Finance', roleClass: 'role-mgmt', icon: '💼', bgClass: 'bg-indigo', title: 'Proposal & Contract', desc: 'Commercial quote, warranty terms & sales contract', tag: 'Contract Signed' },
            { step: 'STEP 04', role: 'Finance Dept', roleClass: 'role-mgmt', icon: '💵', bgClass: 'bg-amber', title: 'Payment Clearance', desc: 'Advance / Bank Loan approval & Tax Invoice release', tag: 'Funds Received' },
            { step: 'STEP 05', role: 'Service Tech', roleClass: 'role-eng', icon: '🚚', bgClass: 'bg-green', title: 'Delivery & Training', desc: 'Site dispatch, safety handover & certified training', tag: 'Machine Handed Over', isSuccess: true }
        ]
    },
    {
        id: 8,
        tag: 'CHAPTER 08 • EQUIPMENT RENTAL',
        title: 'Machine Rental to Customer Workflow',
        desc: 'Rental management: duration sizing, rental contract, security deposit, site mobilization & off-hire return.',
        nodes: [
            { step: 'STEP 01', role: 'Client / Contractor', roleClass: 'role-client', icon: '🏗️', bgClass: 'bg-blue', title: 'Rental Requirement', desc: 'Height, machine type & project tenure submitted', tag: 'Rental Inquiry' },
            { step: 'STEP 02', role: 'Rental Team', roleClass: 'role-mgmt', icon: '📜', bgClass: 'bg-purple', title: 'Quotation & Terms', desc: 'Monthly rate, mob/demob charges & contract terms', tag: 'Quote Approved' },
            { step: 'STEP 03', role: 'Finance', roleClass: 'role-mgmt', icon: '🛡️', bgClass: 'bg-amber', title: 'Agreement & Deposit', desc: 'Rental agreement signed + security deposit / PO', tag: 'Deposit Verified' },
            { step: 'STEP 04', role: 'Yard & Logistics', roleClass: 'role-logistics', icon: '🚛', bgClass: 'bg-teal', title: 'PDI & Mobilization', desc: 'Pre-rental safety audit & trailer dispatch to site', tag: 'Dispatched to Site' },
            { step: 'STEP 05', role: 'Site Operator', roleClass: 'role-eng', icon: '🔑', bgClass: 'bg-green', title: 'On-site Off-hire Return', desc: 'Commissioning on site ➔ Monthly PM ➔ Off-hire check', tag: 'Active Rental', isSuccess: true }
        ]
    },
    {
        id: 9,
        tag: 'CHAPTER 09 • INTERNAL FLEET REPAIR',
        title: 'Own Machine Repair Workflow (Reach Fleet)',
        desc: "Internal workshop workflow for repairing and restoring breakdown equipment in Reach International's rental fleet.",
        nodes: [
            { step: 'STEP 01', role: 'Supervisor / Field Tech', roleClass: 'role-mgmt', icon: '🚨', bgClass: 'bg-red', title: 'Breakdown Complaint Raised', desc: 'Machine breakdown complaint raised by the supervisor', tag: 'Raised by Supervisor', isAlert: true },
            { step: 'STEP 02', role: 'Sr. Service Engineer', roleClass: 'role-eng', icon: '🔍', bgClass: 'bg-purple', title: 'Workshop Diagnosis', desc: 'Hydraulic, electrical & structural fault analysis', tag: 'Job Card Opened' },
            { step: 'STEP 03', role: 'Store Manager', roleClass: 'role-sm', icon: '⚙️', bgClass: 'bg-teal', title: 'Parts Requisition', desc: 'Product Out workflow executed for repair spares', tag: 'Click ➔ Slide 2', linkSlide: 2 },
            { step: 'STEP 04', role: 'Mechanic Team', roleClass: 'role-eng', icon: '🛠️', bgClass: 'bg-indigo', title: 'Repair & Overhaul', desc: 'Engine overhaul, cylinder seals & electrical rewiring', tag: 'Work in Progress' },
            { step: 'STEP 05', role: 'Mechanic / Service Eng', roleClass: 'role-eng', icon: '🏅', bgClass: 'bg-green', title: 'Testing & Job Closed', desc: 'Repair testing completed & job closed by mechanic / service engineer', tag: 'Closed by Mechanic/Eng', isSuccess: true }
        ]
    },
    {
        id: 10,
        tag: 'CHAPTER 10 • CLIENT SERVICE',
        title: 'Customer Machine Repair Workflow (External Client)',
        desc: 'Providing emergency repair, troubleshooting & overhauling services for customer-owned machines.',
        nodes: [
            { step: 'STEP 01', role: 'Supervisor / Customer', roleClass: 'role-mgmt', icon: '📱', bgClass: 'bg-blue', title: 'Breakdown Complaint Raised', desc: 'Breakdown complaint ticket raised by the supervisor / customer', tag: 'Raised by Supervisor' },
            { step: 'STEP 02', role: 'Mobile Van Tech', roleClass: 'role-eng', icon: '🛻', bgClass: 'bg-amber', title: 'Mobile Tech Dispatch', desc: 'Deploy mobile service unit with diagnostic tools', tag: 'On-Site Arrival' },
            { step: 'STEP 03', role: 'Customer Approval', roleClass: 'role-client', icon: '📑', bgClass: 'bg-purple', title: 'Estimate Approval', desc: 'Diagnostic report & commercial repair estimate', isDecision: true, yesText: 'Approved ➔ Repair', noText: 'Declined ➔ Visit Fee' },
            { step: 'STEP 04', role: 'Service Team', roleClass: 'role-eng', icon: '🔧', bgClass: 'bg-indigo', title: 'Repair Execution', desc: 'On-site repair or towing to Reach central workshop', tag: 'Spares Installed' },
            { step: 'STEP 05', role: 'Mechanic / Service Eng', roleClass: 'role-eng', icon: '📄', bgClass: 'bg-green', title: 'Testing & Job Closed', desc: 'Testing completed, customer signoff & job closed by mechanic / service engineer', tag: 'Closed by Mechanic/Eng', isSuccess: true }
        ]
    }
];

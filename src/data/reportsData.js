export const reportsData = [
    {
        id: 'report-procurement-01',
        title: 'Procurement & Purchase Order Requisition Standard Workflow Report',
        category: 'Procurement',
        date: '2026-08-24',
        author: 'Shiv Sir / Mishra Sir',
        department: 'Purchase & Inventory Management',
        summary: 'Comprehensive operational analysis of stock-out detection, purchase requisition procedures, OEM vendor approvals, and purchase order releases.',
        status: 'Approved & Active',
        badgeColor: '#00a8cc',
        keyMetrics: [
            { label: 'Avg PO Processing Time', value: '1.8 Days' },
            { label: 'Vendor Approval Rate', value: '98.4%' },
            { label: 'Requisition Accuracy', value: '99.1%' },
            { label: 'Active OEM Suppliers', value: '42 Vendors' }
        ],
        workflowTitle: 'Procurement Process Flowchart',
        workflowNodes: [
            { step: 'Step 1', title: 'Stock Out Detected', role: 'Store Manager (Pradeep)', status: 'Warning', desc: 'Identifies inventory shortage during routine audit or issuance.' },
            { step: 'Step 2', title: 'Send Requisition', role: 'Store Manager (Pradeep)', status: 'Pending', desc: 'Submits formal Purchase Requisition Indent.' },
            { step: 'Step 3', title: 'Audit & Verification', role: 'Shiv Sir / Mishra Sir', status: 'Review', desc: 'HOD verifies stock specs, prices, and vendor quotations.' },
            { step: 'Step 4', title: 'Approve & Place Order', role: 'Shiv Sir / Mishra Sir', status: 'Success', desc: 'Official Purchase Order (PO) issued to OEM vendor.' },
            { step: 'Step 5', title: 'Trigger Product Inbound', role: 'Store & Logistics', status: 'Complete', desc: 'Shipment dispatched into inbound receiving workflow.' }
        ],
        sections: [
            {
                title: 'Executive Summary',
                content: 'This report documents the streamlined Procurement SOP at Reach International. The objective is to eliminate line stoppage due to unexpected stock-outs by standardizing communication between Store Manager Pradeep and Purchase HODs (Shiv Sir / Mishra Sir).'
            },
            {
                title: 'Key Operational Workflow Controls',
                content: '1. Daily Automated Stock Threshold Triggers: Any item falling below safety buffer triggers an automatic alert.\n2. Dual-Verification System: Requisitions over threshold amounts require formal HOD review to prevent excess holding costs.\n3. OEM Vendor Tracking: Tracking order placement to delivery transit times ensuring vendors adhere to lead time SLAs.'
            },
            {
                title: 'Standard Operating Procedure (SOP) Guidelines',
                content: 'All purchase requisitions must be entered into the central system before 2:00 PM for same-day HOD review. Emergency stock-out indents must be flagged with High Priority tags and escalated directly via instant notification.'
            },
            {
                title: 'Action Plan & Next Steps',
                content: '• Integrate automated vendor quote comparison tool by Q4 2026.\n• Conduct bi-weekly review of fast-moving spare items with Pradeep and Store team.\n• Establish preferred vendor SLA agreements for emergency 24-hour deliveries.'
            }
        ]
    },
    {
        id: 'report-inbound-02',
        title: 'Inbound Material Receiving, Gate Pass & GRN Workflow Report',
        category: 'Inbound Logistics',
        date: '2026-08-22',
        author: 'Jitendra Sir & Store Team',
        department: 'Warehouse & Quality Assurance',
        summary: 'Detailed report on physical inspection of arriving inventory, security gate pass verification, physical quality check, GRN entry in ERP system, and storage bin allocation.',
        status: 'Active SOP',
        badgeColor: '#10b981',
        keyMetrics: [
            { label: 'Inbound Inspection Speed', value: '45 Mins/Truck' },
            { label: 'GRN Logging Accuracy', value: '100%' },
            { label: 'Defect Return Rate', value: '< 0.5%' },
            { label: 'Avg Gate Pass Time', value: '8 Mins' }
        ],
        workflowTitle: 'Inbound Goods Flowchart & Gate Entry Protocol',
        workflowNodes: [
            { step: 'Step 1', title: 'Delivery Arrival & Gate Entry', role: 'Security Guard', status: 'Complete', desc: 'Checks invoice, physical vehicle condition, and issues Gate Pass.' },
            { step: 'Step 2', title: 'Unloading & Quality Audit', role: 'QA Inspector', status: 'Complete', desc: 'Verifies box counts, part numbers, and physical condition.' },
            { step: 'Step 3', title: 'GRN Entry in ERP', role: 'Store Clerk', status: 'Success', desc: 'Enters Goods Receipt Note into central inventory system.' },
            { step: 'Step 4', title: 'Bin Allocation & Stacking', role: 'Store Manager (Pradeep)', status: 'Complete', desc: 'Moves accepted goods to dedicated rack locations.' }
        ],
        sections: [
            {
                title: 'Executive Summary',
                content: 'Inbound material quality and logging speed are critical to maintaining inventory accuracy. This workflow guarantees that 100% of delivered stock is verified against valid POs prior to receiving into active stock.'
            },
            {
                title: 'Gate Pass & Receiving Audit Findings',
                content: 'During the recent audit cycle, zero unregistered trucks were admitted to the unloading bay. Gate Pass turn-around time dropped from 15 minutes to 8 minutes per delivery.'
            },
            {
                title: 'Discrepancy & Rejection Handling',
                content: 'If damaged packaging or short shipments are discovered during receiving, a physical Return Note is generated immediately, and the driver sign-off is logged before updating GRN quantities.'
            }
        ]
    },
    {
        id: 'report-outbound-03',
        title: 'Store Inventory Dispatch & Outbound Logistics SOP Report',
        category: 'Outbound Logistics',
        date: '2026-08-20',
        author: 'Store Manager Pradeep',
        department: 'Logistics & Store Dispatch',
        summary: 'Standardized workflow for store material issue requests, picking lists, gate pass creation, vehicle loading, and customer dispatch verification.',
        status: 'Published',
        badgeColor: '#f59e0b',
        keyMetrics: [
            { label: 'Dispatch Fulfillment Rate', value: '97.8%' },
            { label: 'Packing Verification', value: '100%' },
            { label: 'Avg Turnaround', value: '2.5 Hours' },
            { label: 'Zero-Error Shipments', value: '99.4%' }
        ],
        workflowTitle: 'Outbound Fulfillment & Dispatch Flowchart',
        workflowNodes: [
            { step: 'Step 1', title: 'Material Issue Requisition', role: 'Production HOD', status: 'Complete', desc: 'Submits approved bill of materials dispatch request.' },
            { step: 'Step 2', title: 'Pick & Pack Verification', role: 'Store Manager (Pradeep)', status: 'Complete', desc: 'Picks parts from bins and scans barcode/serial numbers.' },
            { step: 'Step 3', title: 'Outbound Invoice & Pass', role: 'Logistics Desk', status: 'Complete', desc: 'Generates e-Way bill, tax invoice, and exit gate pass.' },
            { step: 'Step 4', title: 'Vehicle Loading & Dispatch', role: 'Security & Logistics', status: 'Success', desc: 'Final seal audit and vehicle dispatch sign-off.' }
        ],
        sections: [
            {
                title: 'Executive Summary',
                content: 'Outbound logistics efficiency ensures timely delivery to client projects and internal assembly operations. Pradeep and the dispatch team have implemented mandatory barcode scanning on outbound items.'
            },
            {
                title: 'Packaging & Dispatch Controls',
                content: 'All outgoing pallets undergo double-check verification against line item picking lists. Transit damage insurance logs are maintained for all long-distance freight.'
            }
        ]
    },
    {
        id: 'report-quality-04',
        title: 'Quality Assurance & Defective Component Return Audit Report',
        category: 'Quality Control',
        date: '2026-08-18',
        author: 'Quality Assurance Department',
        department: 'QA & Compliance',
        summary: 'Audit report covering non-conforming part identification, physical rejection tags, OEM replacement workflows, and vendor chargeback credits.',
        status: 'Review Complete',
        badgeColor: '#8b5cf6',
        keyMetrics: [
            { label: 'Inspected Component Lots', value: '14,500 Units' },
            { label: 'Rejection Defect Rate', value: '0.42%' },
            { label: 'OEM Credit Recovery', value: '100%' },
            { label: 'First-Pass Yield Rate', value: '99.58%' }
        ],
        workflowTitle: 'Non-Conforming Material & QA Defect Workflow',
        workflowNodes: [
            { step: 'Step 1', title: 'Defect Detection', role: 'QA Inspector', status: 'Warning', desc: 'Identifies dimension, tolerance, or surface defects.' },
            { step: 'Step 2', title: 'Red Tag Isolation', role: 'QA Lead', status: 'Review', desc: 'Moves defective parts to segregated Quarantine Cage.' },
            { step: 'Step 3', title: 'NCR Issued to Vendor', role: 'Shiv Sir / Mishra Sir', status: 'Action', desc: 'Sends Non-Conformance Report and replacement request.' },
            { step: 'Step 4', title: 'OEM Credit Note', role: 'Accounts & Purchase', status: 'Success', desc: 'Vendor issues full credit note or replacement dispatch.' }
        ],
        sections: [
            {
                title: 'Executive Summary',
                content: 'Quality control remains non-negotiable. This audit highlights our strict zero-defect quarantine protocol, which prevents flawed raw materials from reaching production.'
            },
            {
                title: 'Defect Analysis',
                content: 'Over 99.5% of incoming batches passed on first inspection. The 0.42% non-conforming items were contained immediately with full credit recovery from vendors.'
            }
        ]
    },
    {
        id: 'report-maintenance-05',
        title: 'Preventive Maintenance & Spare Parts Inventory SOP Report',
        category: 'Maintenance',
        date: '2026-08-15',
        author: 'Plant Engineering & Store Dept',
        department: 'Facility & Equipment Maintenance',
        summary: 'Operational workflow for routine equipment maintenance, critical spare replenishment thresholds, and emergency store indents.',
        status: 'Active SOP',
        badgeColor: '#ec4899',
        keyMetrics: [
            { label: 'Machine Uptime Rate', value: '99.2%' },
            { label: 'Critical Spares Stocked', value: '100%' },
            { label: 'Unplanned Downtime', value: '0 Hours' },
            { label: 'Scheduled PM Tasks', value: '38/38 Done' }
        ],
        workflowTitle: 'Preventive Maintenance & Spares Workflow',
        workflowNodes: [
            { step: 'Step 1', title: 'Scheduled PM Notice', role: 'Maintenance Engineer', status: 'Complete', desc: 'Triggers bi-weekly servicing checklist.' },
            { step: 'Step 2', title: 'Spare Parts Requisition', role: 'Store Manager (Pradeep)', status: 'Complete', desc: 'Issues required belts, bearings, and lubricants.' },
            { step: 'Step 3', title: 'Servicing & Calibration', role: 'Technical Team', status: 'Success', desc: 'Performs maintenance and records runtime logs.' },
            { step: 'Step 4', title: 'Safety Certification', role: 'Plant HOD', status: 'Complete', desc: 'Signs off machine readiness for production.' }
        ],
        sections: [
            {
                title: 'Executive Summary',
                content: 'Preventive maintenance ensures continuous plant operations. Spare parts buffer management by Store Manager Pradeep has eliminated machine downtime caused by missing parts.'
            }
        ]
    }
];

export const totalSlides = 11;

export const slidesData = [
    {
        id: 0,
        tag: 'SOP OVERVIEW • EDITORIAL DECK',
        title: 'OPERATIONAL WORKFLOWS & STANDARD OPERATING PROCEDURES',
        isCover: true,
    },
    {
        id: 1,
        tag: 'CHAPTER 01 • PROCUREMENT',
        title: 'Procurement of Parts Workflow',
        desc: 'Managing stockouts, purchase requisitions, verification by Purchase HOD (Shiv Sir / Mishra Sir), and official PO issuance to OEMs.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '⚠️', 
                bgClass: 'bg-red', 
                title: 'Stock Out Detected', 
                desc: 'Store Manager (Pradeep) identifies inventory shortage during routine stock audit or part issuance.', 
                tag: 'Zero Stock Alert', 
                isAlert: true,
                photo: '/images/stock-out-detected.png'
            },
            { 
                step: 'STEP 02', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '📤', 
                bgClass: 'bg-amber', 
                title: 'Send Requisition', 
                desc: 'Submits formal Purchase Requisition (Indent) to Purchase HOD (Shiv Sir / Mishra Sir).', 
                tag: 'Indent Submitted',
                photo: '/images/Send Requisition.png'
            },
            { 
                step: 'STEP 03', 
                role: 'Shiv Sir / Mishra Sir', 
                roleClass: 'role-mgmt', 
                icon: '🔍', 
                bgClass: 'bg-purple', 
                title: 'Audit & Verification', 
                desc: 'Purchase HOD verifies stock requirement, technical specifications, and vendor quotations.', 
                tag: 'Price & Qty Audit',
                photo: '/images/verification.png'
            },
            { 
                step: 'STEP 04', 
                role: 'Shiv Sir / Mishra Sir', 
                roleClass: 'role-mgmt', 
                icon: '🛒', 
                bgClass: 'bg-green', 
                title: 'Approve & Place Order', 
                desc: 'Approves purchase requisition and releases official Purchase Order (PO) to OEM vendor.', 
                tag: 'PO Released', 
                isSuccess: true,
                photo: '/images/Place-Order.png'
            },
            { 
                step: 'STEP 05', 
                role: 'Store & Logistics', 
                roleClass: 'role-store', 
                icon: '🔄', 
                bgClass: 'bg-blue', 
                title: 'Trigger Product Inbound', 
                desc: 'Order dispatched by vendor; shipment automatically transitions into Product In Workflow upon arrival.', 
                tag: 'Click ➔ Slide 2', 
                linkSlide: 2,
                photo: '/images/Triggers Product In.png'
            }
        ]
    },
    {
        id: 2,
        tag: 'CHAPTER 02 • INBOUND INVENTORY',
        title: 'Product In Workflow (Parts / Goods Receiving)',
        desc: 'End-to-end inbound receiving: purchase order verification, security gate pass, physical quality check, GRN entry, and bin storage.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Shiv Sir / Mishra Sir / Jitendra Sir', 
                roleClass: 'role-mgmt', 
                icon: '🛒', 
                bgClass: 'bg-blue', 
                title: 'PO Order Initiated', 
                desc: 'Official Purchase Order (PO) issued and sent to manufacturer/vendor for dispatch.', 
                tag: 'PO Approved',
                photo: '/images/Place-Order.png'
            },
            { 
                step: 'STEP 02', 
                role: 'Security Guard', 
                roleClass: 'role-guard', 
                icon: '🛡️', 
                bgClass: 'bg-amber', 
                title: 'Delivery Arrival & Gate Entry', 
                desc: 'Security Guard checks delivery invoice/challan and logs official Gate Pass Entry.', 
                tag: 'Gate Pass Entry',
                photo: '/images/Delivery Arrival.png'
            },
            { 
                step: 'STEP 03', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '🔍', 
                bgClass: 'bg-teal', 
                title: 'Physical Inspection & Audit', 
                desc: 'Store Manager (Pradeep) inspects parcel contents, verifying physical quantity and quality against PO.', 
                tag: 'Quality & Qty Check',
                photo: '/images/Check & Verify.png'
            },
            { 
                step: 'STEP 04', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '📝', 
                bgClass: 'bg-indigo', 
                title: 'GRN & System Record Entry', 
                desc: 'Logs received goods into ERP inventory system and generates Goods Receipt Note (GRN).', 
                tag: 'GRN Logged',
                photo: '/images/Record Entry.png'
            },
            { 
                step: 'STEP 05', 
                role: 'Warehouse Team', 
                roleClass: 'role-store', 
                icon: '🏬', 
                bgClass: 'bg-green', 
                title: 'Bin Allocation & Storage', 
                desc: 'Stores items in dedicated bin location; stock is immediately available for issuance.', 
                tag: 'In Stock & Ready', 
                isSuccess: true,
                photo: '/images/Store Location.png'
            }
        ]
    },
    {
        id: 3,
        tag: 'CHAPTER 03 • OUTBOUND INVENTORY',
        title: 'Product Out Workflow (Parts Issuance)',
        desc: 'Processing part requisitions raised by Service Engineers and Mechanics for equipment repairs and maintenance.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Service Eng / Mechanic', 
                roleClass: 'role-eng', 
                icon: '🔧', 
                bgClass: 'bg-purple', 
                title: 'Requisition Slip Raised', 
                desc: 'Engineer or Mechanic fills out and submits formal part requisition slip.', 
                tag: 'Requisition Slip',
                photo: '/images/Requirement Raised.png'
            },
            { 
                step: 'STEP 02', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '📋', 
                bgClass: 'bg-teal', 
                title: 'Stock Availability Check', 
                desc: 'Store Manager (Pradeep) checks physical stock in warehouse and system ERP balance.', 
                tag: 'Stock Audit',
                photo: '/images/Stock Check.png'
            },
            { 
                step: 'STEP 03', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '⚡', 
                bgClass: 'bg-amber', 
                title: 'Stock Availability Decision', 
                desc: 'Verifies whether the requested part is physically available in the inventory store.', 
                isDecision: true, 
                yesText: 'YES ➔ Issue Part', 
                noText: 'NO ➔ Procurement (Slide 1)',
                photo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '📦', 
                bgClass: 'bg-blue', 
                title: 'Physical Part Issuance', 
                desc: 'Handover of verified spare parts to the requesting Service Engineer / Mechanic.', 
                tag: 'Physical Handover',
                photo: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '✍️', 
                bgClass: 'bg-green', 
                title: 'ERP Deduction & Closure', 
                desc: 'Deducts stock balance in ERP system, updates stock register, and closes request.', 
                tag: 'Issue Registered', 
                isSuccess: true,
                photo: '/images/Record Entry.png'
            }
        ]
    },
    {
        id: 4,
        tag: 'CHAPTER 04 • OEM FLEET ACQUISITION',
        title: 'Machine Procurement from Manufacturer (JCB, Hyundai, Genie, JLG)',
        desc: 'Acquiring new heavy machinery & aerial work platforms directly from global OEMs for fleet expansion or client sales.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Leadership / Operations', 
                roleClass: 'role-mgmt', 
                icon: '📊', 
                bgClass: 'bg-blue', 
                title: 'Fleet Requirement Defined', 
                desc: 'Demand analysis conducted to specify Scissor Lift, Boom Lift, or Heavy Equipment models.', 
                tag: 'Specs Finalized',
                photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 02', 
                role: 'OEM Sales Managers', 
                roleClass: 'role-oem', 
                icon: '🏭', 
                bgClass: 'bg-indigo', 
                title: 'RFQ & OEM Negotiation', 
                desc: 'Requests quotes and negotiates commercial terms with JCB, Hyundai, Genie, or JLG.', 
                tag: 'Commercial Terms Agreed',
                photo: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 03', 
                role: 'Shiv Sir / Mishra Sir / Finance', 
                roleClass: 'role-mgmt', 
                icon: '📝', 
                bgClass: 'bg-amber', 
                title: 'PO Issuance & Payment', 
                desc: 'Shiv Sir / Mishra Sir approve PO; Finance processes LC / Bank Transfer payment to OEM.', 
                tag: 'PO & Payment Released',
                photo: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Logistics Team', 
                roleClass: 'role-logistics', 
                icon: '🚛', 
                bgClass: 'bg-purple', 
                title: 'Factory Dispatch & Transit', 
                desc: 'Manages flatbed trailer transport, transit insurance, and customs documentation.', 
                tag: 'Transit Monitored',
                photo: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Yard Technical Team', 
                roleClass: 'role-eng', 
                icon: '🏗️', 
                bgClass: 'bg-green', 
                title: 'PDI & Fleet Onboarding', 
                desc: 'Executes Pre-Delivery Inspection (PDI), assigns barcode asset ID, and adds machine to fleet.', 
                tag: 'Added to Live Fleet', 
                isSuccess: true,
                photo: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=400&q=75'
            }
        ]
    },
    {
        id: 5,
        tag: 'CHAPTER 05 • NEW MACHINE SALES',
        title: 'New Machine Sales Workflow',
        desc: 'Fulfilling new machine orders: inquiry logged by Pradeep Das, Delivery Challan issued, spec/price presentation, customer acceptance, PO sent to OEM by Richa/Rinky (Hyundai) or Rajendra (JCB), & site delivery.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Pradeep Das (Sales Lead)', 
                roleClass: 'role-mgmt', 
                icon: '📞', 
                bgClass: 'bg-blue', 
                title: 'Client Inquiry Logged', 
                desc: 'Pradeep Das logs customer machine inquiry and registers technical requirements in CRM.', 
                tag: 'Inquiry Registered',
                photo: 'https://images.unsplash.com/photo-1534536281715-e28d76741401?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 02', 
                role: 'Pradeep Das / Store', 
                roleClass: 'role-store', 
                icon: '📄', 
                bgClass: 'bg-teal', 
                title: 'Delivery Challan Issued', 
                desc: 'Generates Delivery Challan and gate pass documentation for machine demo/inspection.', 
                tag: 'Challan Released',
                photo: '/images/Record Entry.png'
            },
            { 
                step: 'STEP 03', 
                role: 'Pradeep Das (Sales Lead)', 
                roleClass: 'role-mgmt', 
                icon: '📊', 
                bgClass: 'bg-purple', 
                title: 'Features, Specs & Pricing', 
                desc: 'Pradeep Das briefs client on machine capabilities, technical specifications, and final pricing.', 
                tag: 'Specs & Pricing Briefed',
                photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Customer / Client', 
                roleClass: 'role-client', 
                icon: '🤝', 
                bgClass: 'bg-amber', 
                title: 'Customer Buy Acceptance', 
                desc: 'Customer evaluates features, approves pricing terms, and agrees to purchase the machine.', 
                isDecision: true, 
                yesText: 'ACCEPTED ➔ Release PO', 
                noText: 'RENEGOTIATE ➔ Revise Quote',
                photo: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Richa / Rinky / Rajendra', 
                roleClass: 'role-oem', 
                icon: '🏭', 
                bgClass: 'bg-indigo', 
                title: 'PO Sent to OEM Manufacturer', 
                desc: 'Richa/Rinky (Hyundai) or Rajendra (JCB) issues Purchase Order (PO) to OEM manufacturer for factory dispatch.', 
                tag: 'OEM PO Issued',
                photo: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 06', 
                role: 'Logistics & Service Team', 
                roleClass: 'role-logistics', 
                icon: '🚛', 
                bgClass: 'bg-green', 
                title: 'Delivery to Customer Location', 
                desc: 'Transports machine via flatbed trailer to client site, executes delivery handover & operator training.', 
                tag: 'Delivered & Commissioned', 
                isSuccess: true,
                photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=75'
            }
        ]
    },
    {
        id: 6,
        tag: 'CHAPTER 06 • EQUIPMENT RENTAL',
        title: 'Machine Rental to Customer Workflow',
        desc: 'Rental fleet lifecycle management: requirement analysis, commercial proposal, agreement & security deposit, site mobilization, and off-hire return.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Client / Contractor', 
                roleClass: 'role-client', 
                icon: '🏗️', 
                bgClass: 'bg-blue', 
                title: 'Rental Requirement Submitted', 
                desc: 'Client submits machine type, working height requirements, and estimated project duration.', 
                tag: 'Rental Inquiry',
                photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 02', 
                role: 'Rental Sales Team', 
                roleClass: 'role-mgmt', 
                icon: '📜', 
                bgClass: 'bg-purple', 
                title: 'Quotation & Contract Terms', 
                desc: 'Prepares proposal specifying monthly rental charges, mobilization costs, and operating terms.', 
                tag: 'Quotation Sent',
                photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 03', 
                role: 'Finance & Legal', 
                roleClass: 'role-mgmt', 
                icon: '🛡️', 
                bgClass: 'bg-amber', 
                title: 'Agreement & Security Deposit', 
                desc: 'Rental agreement signed by client; security deposit or client Purchase Order (PO) verified.', 
                tag: 'Deposit Verified',
                photo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Yard & Logistics Team', 
                roleClass: 'role-logistics', 
                icon: '🚛', 
                bgClass: 'bg-teal', 
                title: 'PDI Audit & Mobilization', 
                desc: 'Pre-rental safety inspection completed; equipment dispatched to customer site via flatbed trailer.', 
                tag: 'Dispatched to Site',
                photo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Site Service Operator', 
                roleClass: 'role-eng', 
                icon: '🔑', 
                bgClass: 'bg-green', 
                title: 'Site Setup & Off-Hire Return', 
                desc: 'Commissions machine on site, manages monthly maintenance, and coordinates off-hire return.', 
                tag: 'Active Rental Managed', 
                isSuccess: true,
                photo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=75'
            }
        ]
    },
    {
        id: 7,
        tag: 'CHAPTER 07 • INTERNAL FLEET REPAIR',
        title: 'Own Machine Repair Workflow (Reach Fleet)',
        desc: 'Internal workshop repair process for breakdown equipment in Reach International\'s rental fleet.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Supervisor / Field Tech', 
                roleClass: 'role-mgmt', 
                icon: '🚨', 
                bgClass: 'bg-red', 
                title: 'Breakdown Complaint Raised', 
                desc: 'Machine breakdown reported by Field Technician or Supervisor.', 
                tag: 'Raised by Supervisor', 
                isAlert: true,
                photo: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 02', 
                role: 'Sr. Service Engineer', 
                roleClass: 'role-eng', 
                icon: '🔍', 
                bgClass: 'bg-purple', 
                title: 'Workshop Diagnosis', 
                desc: 'Conducts diagnostic inspection (hydraulic, electrical, mechanical) and opens Job Card.', 
                tag: 'Job Card Opened',
                photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 03', 
                role: 'Store Manager (Pradeep)', 
                roleClass: 'role-sm', 
                icon: '⚙️', 
                bgClass: 'bg-teal', 
                title: 'Parts Requisition', 
                desc: 'Triggers Product Out Workflow (Slide 3) to obtain required replacement spares from store.', 
                tag: 'Click ➔ Slide 3', 
                linkSlide: 3,
                photo: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Mechanic Team', 
                roleClass: 'role-eng', 
                icon: '🛠️', 
                bgClass: 'bg-indigo', 
                title: 'Repair & Overhaul', 
                desc: 'Mechanics execute engine overhaul, hydraulic cylinder seal replacement, and electrical repairs.', 
                tag: 'Work in Progress',
                photo: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Mechanic / Sr. Service Eng', 
                roleClass: 'role-eng', 
                icon: '🏅', 
                bgClass: 'bg-green', 
                title: 'Testing & Job Closed', 
                desc: 'Performs load testing and safety checks; job card is verified and officially closed by Mechanic / Service Engineer.', 
                tag: 'Closed by Mechanic/Eng', 
                isSuccess: true,
                photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=75'
            }
        ]
    },
    {
        id: 8,
        tag: 'CHAPTER 08 • CLIENT SERVICE',
        title: 'Customer Machine Repair Workflow (External Client)',
        desc: 'Providing on-site emergency repairs, diagnostic estimates, client approvals, and overhaul services for customer-owned machinery.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Supervisor / Customer', 
                roleClass: 'role-mgmt', 
                icon: '📱', 
                bgClass: 'bg-blue', 
                title: 'Breakdown Complaint Raised', 
                desc: 'Customer or Supervisor reports machine breakdown ticket with fault details.', 
                tag: 'Raised by Supervisor',
                photo: 'https://images.unsplash.com/photo-1534536281715-e28d76741401?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 02', 
                role: 'Mobile Van Tech', 
                roleClass: 'role-eng', 
                icon: '🛻', 
                bgClass: 'bg-amber', 
                title: 'Mobile Tech Dispatch', 
                desc: 'Deploys mobile service unit equipped with diagnostic tools to client site.', 
                tag: 'On-Site Arrival',
                photo: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 03', 
                role: 'Customer / Client', 
                roleClass: 'role-client', 
                icon: '📑', 
                bgClass: 'bg-purple', 
                title: 'Estimate Approval', 
                desc: 'Engineer provides diagnostic report and repair cost estimate for client review.', 
                isDecision: true, 
                yesText: 'APPROVED ➔ Execute Repair', 
                noText: 'DECLINED ➔ Visit Fee Only',
                photo: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Service Team', 
                roleClass: 'role-eng', 
                icon: '🔧', 
                bgClass: 'bg-indigo', 
                title: 'Repair Execution', 
                desc: 'Executes on-site repair or hauls equipment to Reach central workshop for major overhaul.', 
                tag: 'Spares Installed',
                photo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Mechanic / Sr. Service Eng', 
                roleClass: 'role-eng', 
                icon: '📄', 
                bgClass: 'bg-green', 
                title: 'Testing & Job Closed', 
                desc: 'Testing completed, customer signoff obtained, and job card officially closed by Mechanic / Service Engineer.', 
                tag: 'Closed by Mechanic/Eng', 
                isSuccess: true,
                photo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=75'
            }
        ]
    },
    {
        id: 9,
        tag: 'CHAPTER 09 • WARRANTY SERVICE',
        title: 'Machine Service Overdue Workflow (Under Warranty)',
        desc: 'Managing under-warranty service alerts: notification via CRM/App/WhatsApp, warranty verification by Shiv/Jitendra/Sushil Sir, free engineer visit under policy, parts policy assessment, customer quotation, PO + payment receipt, & OEM parts replacement.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Supervisor', 
                roleClass: 'role-sys', 
                icon: '🚨', 
                bgClass: 'bg-red', 
                title: 'Service Overdue Alert', 
                desc: 'Service overdue notification triggered by Supervisor via CRM, Mobile App, or WhatsApp Group.', 
                tag: 'CRM / App / WhatsApp Alert', 
                isAlert: true,
                photo: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 02', 
                role: 'Shiv / Jitendra / Sushil Sir', 
                roleClass: 'role-mgmt', 
                icon: '🛡️', 
                bgClass: 'bg-teal', 
                title: 'Warranty Status Check', 
                desc: 'Warranty status verified by Shiv Sir, Jitendra Sir, or Sushil Sir against machine serial & contract.', 
                tag: 'Under Warranty Verified',
                photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 03', 
                role: 'Service Engineer', 
                roleClass: 'role-eng', 
                icon: '🛻', 
                bgClass: 'bg-blue', 
                title: 'Free Service Visit', 
                desc: 'Service Engineer dispatched to client site to perform scheduled PM service covered under warranty policy.', 
                tag: 'Free Service Under Policy',
                photo: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Service Eng / Customer', 
                roleClass: 'role-eng', 
                icon: '🔍', 
                bgClass: 'bg-amber', 
                title: 'Spare Parts Policy Check', 
                desc: 'Determines whether required replacement parts are covered under free warranty policy or chargeable.', 
                isDecision: true, 
                yesText: 'POLICY COVERED ➔ Free Service', 
                noText: 'EXTRA PARTS ➔ Send Quote',
                photo: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Service Admin / HOD', 
                roleClass: 'role-sm', 
                icon: '📄', 
                bgClass: 'bg-purple', 
                title: 'Quotation to Customer', 
                desc: 'Issues commercial quotation to customer for non-policy spare parts.', 
                tag: 'Quotation Sent',
                photo: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 06', 
                role: 'Client / Finance', 
                roleClass: 'role-client', 
                icon: '💳', 
                bgClass: 'bg-teal', 
                title: 'PO & Payment Receipt', 
                desc: 'Client accepts quote, releases Purchase Order (PO), and clears payment.', 
                isDecision: true, 
                yesText: 'PO + PAYMENT ➔ Install Parts', 
                noText: 'DECLINED ➔ Service On Hold',
                photo: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 07', 
                role: 'Service Team', 
                roleClass: 'role-eng', 
                icon: '✅', 
                bgClass: 'bg-green', 
                title: 'OEM Parts & Problem Resolution', 
                desc: 'Installs genuine OEM parts, completes maintenance, and fully resolves machine problem.', 
                tag: 'Machine Problem Resolved', 
                isSuccess: true,
                photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=75'
            }
        ]
    },
    {
        id: 10,
        tag: 'CHAPTER 10 • NON-WARRANTY SERVICE',
        title: 'Machine Service Overdue Workflow (Out of Warranty)',
        desc: 'Managing out-of-warranty service alerts: notification via CRM/App/WhatsApp, warranty check by Shiv/Jitendra/Sushil Sir, visit fee quote & engineer dispatch, parts quotation, PO + payment clearance, & OEM parts replacement.',
        nodes: [
            { 
                step: 'STEP 01', 
                role: 'Supervisor', 
                roleClass: 'role-sys', 
                icon: '🚨', 
                bgClass: 'bg-red', 
                title: 'Service Overdue Alert', 
                desc: 'Supervisor triggers service overdue alert via CRM, Mobile App, or WhatsApp Group.', 
                tag: 'CRM / App / WhatsApp Alert', 
                isAlert: true,
                photo: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 02', 
                role: 'Shiv / Jitendra / Sushil Sir', 
                roleClass: 'role-mgmt', 
                icon: '🛡️', 
                bgClass: 'bg-teal', 
                title: 'Warranty Status Check', 
                desc: 'Warranty status cross-checked by Shiv Sir, Jitendra Sir, or Sushil Sir to confirm out-of-warranty status.', 
                tag: 'Non-Warranty Verified',
                photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 03', 
                role: 'Service Engineer', 
                roleClass: 'role-eng', 
                icon: '🛻', 
                bgClass: 'bg-amber', 
                title: 'Service Charge & Dispatch', 
                desc: 'Out-of-warranty visit charge quoted to client; Service Engineer visits site upon client acceptance.', 
                tag: 'Client Approved Visit',
                photo: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 04', 
                role: 'Service Engineer', 
                roleClass: 'role-eng', 
                icon: '🔧', 
                bgClass: 'bg-indigo', 
                title: 'On-Site Inspection & Diagnostics', 
                desc: 'Engineer resolves minor issues immediately on site; major repairs require spare parts procurement.', 
                tag: 'On-Site Fix or Major Scope',
                photo: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 05', 
                role: 'Mechanic / Service Admin', 
                roleClass: 'role-sm', 
                icon: '📄', 
                bgClass: 'bg-purple', 
                title: 'Parts Request & Quotation', 
                desc: 'Mechanic submits part requisition and formal repair quotation is sent to customer.', 
                tag: 'Quotation Dispatched',
                photo: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 06', 
                role: 'Client / Finance', 
                roleClass: 'role-client', 
                icon: '💳', 
                bgClass: 'bg-teal', 
                title: 'PO & Payment Clearance', 
                desc: 'Customer approves quotation, submits Purchase Order (PO), and clears payment.', 
                isDecision: true, 
                yesText: 'PO & PAYMENT ➔ Proceed', 
                noText: 'DECLINED ➔ Service On Hold',
                photo: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=75'
            },
            { 
                step: 'STEP 07', 
                role: 'Service Team', 
                roleClass: 'role-eng', 
                icon: '✅', 
                bgClass: 'bg-green', 
                title: 'OEM Parts Install & Resolution', 
                desc: 'Installs new genuine OEM parts, verifies machine performance, fully resolves machine problem, and signs off.', 
                tag: 'Machine Problem Resolved', 
                isSuccess: true,
                photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=75'
            }
        ]
    }
];


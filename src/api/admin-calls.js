
export async function fetchApplicationList() {
    await new Promise(res => setTimeout(res, 100));
    return [
        "Loblaw Data Insights & Analytics Portal",
        "Article Workflow",
        "Approved Merchandise Planning",
        "Product Lifecycle Management",
        "Food Safety Certification Management System",
        "Pharmaceuticals Portal Application Group",
        "Joint Business Planning Reports",
        "Vendor Invoice Reports",
        "Vendor Workflow"
    ];
}


export async function createUser(userData) {
    await new Promise(res => setTimeout(res, 200));
    return { success: true, message: "User created (dummy)" };
}


export async function fetchUserDetails() {
    await new Promise(res => setTimeout(res, 100));

    return {
        email: "Dummy.doe@abc.com",
        firstName: "Dummy",
        lastName: "Doe",
        vendorNumber: "654321",
        companyName: "Dummy Bakery",
        companyAddress: "456 Dummy St",
        addressLine2: "Suite 200",
        city: "Montreal",
        province: "QC",
        postalCode: "H2H 2H2",
        country: "Canada",
        companyPhone: "514-555-9876",
        additionalVendorNumbers: "78910",
        altPhone: "514-555-1111",
        altExt: "123",
        status: "Active",
        privilegeLevel: "Admin",
        applications: [
            "Loblaw Data Insights & Analytics Portal",
            "Vendor Invoice Reports"
        ]
    };
}

export async function updateUser(userData) {
    await new Promise(res => setTimeout(res, 200));
    return { success: true, message: "User updated (dummy)" };
}


export async function searchUsers(query) {
    await new Promise(res => setTimeout(res, 100));

    return [
        { id: '1', name: 'Dummy User', email: 'dummy@dummy.com', vendorNumber: '123456' },
        { id: '2', name: 'Dummy User2', email: 'dummy2@dummy.com', vendorNumber: '654321' }
    ].filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()));
}


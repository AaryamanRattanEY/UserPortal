export async function fetchUserProfile() {
    //Just using dummy data for now
    await new Promise(res => setTimeout(res, 200));
    return {
        email: "Dummy Data",
        firstName: "Dummy",
        lastName: "Data",
        vendorNumber: "123456",
        companyName: "Dummy Bakery",
        companyAddress: "123 Dummy St",
        addressLine2: "",
        city: "Toronto",
        province: "ON",
        postalCode: "M1M 1M1",
        country: "Canada",
        companyPhone: "416-555-1234",
        additionalVendorNumbers: "",
        altPhone: "",
        altExt: "",
        persona: "Technology",
        applicationList: ""
    };
}

export async function updateUserProfile(data) {
   
    await new Promise(res => setTimeout(res, 200));
    return { success: true, message: "Profile updated (dummy)" };
}


export async function updateUserPassword(newPassword) {
    await new Promise(res => setTimeout(res, 200));
    return { success: true };
}

export async function updateSecurityQuestions(data) {
    await new Promise(res => setTimeout(res, 200));
    return { success: true };
}
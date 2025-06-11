import { fetchApplicationList, createUser } from '../../api/admin-calls.js';

document.addEventListener('DOMContentLoaded', async () => {

    const appList = await fetchApplicationList();
    const appListDiv = document.getElementById('application-list');
    appListDiv.innerHTML = appList.map((app, idx) => `
        <div>
            <input type="checkbox" id="app-${idx}" name="applications" value="${app}">
            <label for="app-${idx}">${app}</label>
        </div>
    `).join('');
});


document.getElementById('create-user-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        email: form.email.value,
        firstName: form['first-name'].value,
        lastName: form['last-name'].value,
        vendorNumber: form['vendor-number'].value,
        companyName: form['company-name'].value,
        companyAddress: form['company-address'].value,
        addressLine2: form['address-line2'].value,
        city: form.city.value,
        province: form.province.value,
        postalCode: form['postal-code'].value,
        country: form.country.value,
        companyPhone: form['company-phone'].value,
        additionalVendorNumbers: form['additional-vendor-numbers'].value,
        altPhone: form['alt-phone'].value,
        altExt: form['alt-ext'].value,
        status: form.status.value,
        privilegeLevel: form['privilege-level'].value,
        applications: Array.from(form.querySelectorAll('input[name="applications"]:checked')).map(cb => cb.value)
    };
    try {
        const result = await createUser(formData);
        if (result.success) {
            alert('User created successfully!');
            form.reset();
        } else {
            alert('Failed to create user: ' + result.message);
        }
    } catch (err) {
        alert('Error creating user: ' + err.message);
    }
});
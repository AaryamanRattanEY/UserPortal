import { searchUsers, fetchUserDetails, fetchApplicationList, updateUser } from '../../api/admin-calls.js';

let selectedUserId = null;

document.getElementById('user-search').addEventListener('input', async function() {
    const query = this.value.trim();
    const resultsDiv = document.getElementById('user-search-results');
    resultsDiv.innerHTML = '';
    document.getElementById('modify-user-form').style.display = 'none';

    if (query.length < 2) return;

    const users = await searchUsers(query); // [{id, name, email, vendorNumber}]
    if (!users.length) {
        resultsDiv.textContent = 'No users found.';
        return;
    }
    resultsDiv.innerHTML = users.map(u =>
        `<div class="user-result" data-id="${u.id}" style="cursor:pointer;padding:0.3rem 0;">
            <strong>${u.name}</strong> (${u.email}) - Vendor#: ${u.vendorNumber}
        </div>`
    ).join('');


    document.querySelectorAll('.user-result').forEach(div => {
        div.onclick = async function() {
            selectedUserId = this.getAttribute('data-id');
            await loadUser(selectedUserId);
            resultsDiv.innerHTML = '';
            document.getElementById('user-search').value = '';
        };
    });
});


async function loadUser(userId) {
    const userData = await fetchUserDetails(userId);
    document.getElementById('email').value = userData.email || '';
    document.getElementById('first-name').value = userData.firstName || '';
    document.getElementById('last-name').value = userData.lastName || '';
    document.getElementById('vendor-number').value = userData.vendorNumber || '';
    document.getElementById('company-name').value = userData.companyName || '';
    document.getElementById('company-address').value = userData.companyAddress || '';
    document.getElementById('address-line2').value = userData.addressLine2 || '';
    document.getElementById('city').value = userData.city || '';
    document.getElementById('province').value = userData.province || '';
    document.getElementById('postal-code').value = userData.postalCode || '';
    document.getElementById('country').value = userData.country || '';
    document.getElementById('company-phone').value = userData.companyPhone || '';
    document.getElementById('additional-vendor-numbers').value = userData.additionalVendorNumbers || '';
    document.getElementById('alt-phone').value = userData.altPhone || '';
    document.getElementById('alt-ext').value = userData.altExt || '';
    document.getElementById('status').value = userData.status || 'Active';
    document.getElementById('privilege-level').value = userData.privilegeLevel || 'User';

    const appList = await fetchApplicationList();
    const appListDiv = document.getElementById('application-list');
    appListDiv.innerHTML = appList.map((app, idx) => `
        <div>
            <input type="checkbox" id="app-${idx}" name="applications" value="${app}" ${userData.applications && userData.applications.includes(app) ? 'checked' : ''}>
            <label for="app-${idx}">${app}</label>
        </div>
    `).join('');

    document.getElementById('modify-user-form').style.display = '';
}

document.getElementById('modify-user-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!selectedUserId) return;
    const form = e.target;
    const formData = {
        id: selectedUserId,
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
        const result = await updateUser(formData);
        if (result.success) {
            alert('User updated successfully!');
        } else {
            alert('Failed to update user: ' + result.message);
        }
    } catch (err) {
        alert('Error updating user: ' + err.message);
    }
});
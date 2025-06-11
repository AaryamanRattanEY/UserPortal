import { fetchUserProfile, updateUserProfile } from '../../api/profile-calls.js';

async function populateForm() {
    try {
        console.log(' Fetching user profile data...');
        const data = await fetchUserProfile();
        document.getElementById('email').value = data.email || '';
        document.getElementById('first-name').value = data.firstName || '';
        document.getElementById('last-name').value = data.lastName || '';
        document.getElementById('vendor-number').value = data.vendorNumber || '';
        document.getElementById('company-name').value = data.companyName || '';
        document.getElementById('company-address').value = data.companyAddress || '';
        document.getElementById('address-line2').value = data.addressLine2 || '';
        document.getElementById('city').value = data.city || '';
        document.getElementById('province').value = data.province || '';
        document.getElementById('postal-code').value = data.postalCode || '';
        document.getElementById('country').value = data.country || '';
        document.getElementById('company-phone').value = data.companyPhone || '';
        document.getElementById('additional-vendor-numbers').value = data.additionalVendorNumbers || '';
        document.getElementById('alt-phone').value = data.altPhone || '';
        document.getElementById('alt-ext').value = data.altExt || '';
        document.getElementById('persona').value = data.persona || '';
        document.getElementById('application-list').value = data.applicationList || '';
    } catch (err) {
        alert('Failed to load profile: ' + err.message);
    }
}

document.addEventListener('DOMContentLoaded', populateForm);


let formDirty = false;
document.querySelectorAll('#personal-profile-form input, #personal-profile-form select').forEach(input => {
    input.addEventListener('input', () => {
        formDirty = true;
    });
});


function showAlertBar(tabUrl) {
    if (document.getElementById('alert-bar')) return;
    const alertBar = document.createElement('div');
    alertBar.id = 'alert-bar';
    alertBar.style.position = 'fixed';
    alertBar.style.top = '0';
    alertBar.style.left = '0';
    alertBar.style.width = '100%';
    alertBar.style.background = '#ffd700';
    alertBar.style.color = '#222';
    alertBar.style.padding = '1rem';
    alertBar.style.zIndex = '1000';
    alertBar.style.textAlign = 'center';
    alertBar.innerHTML = `
        <span>Switching tabs will erase unsaved changes. </span>
        <button id="alert-submit">Submit & Stay</button>
        <button id="alert-cancel">Proceed & Switch</button>
    `;
    document.body.appendChild(alertBar);

    document.getElementById('alert-submit').onclick = function() {
        document.getElementById('personal-profile-form').requestSubmit();
        document.body.removeChild(alertBar);
    };
    document.getElementById('alert-cancel').onclick = function() {
        formDirty = false;
        window.location.href = tabUrl;
    };
}

document.querySelectorAll('.tabs a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (formDirty) {
            e.preventDefault();
            showAlertBar(this.href);
        }
    });
});


document.getElementById('personal-profile-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = {
        email: document.getElementById('email').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        vendorNumber: document.getElementById('vendor-number').value,
        companyName: document.getElementById('company-name').value,
        companyAddress: document.getElementById('company-address').value,
        addressLine2: document.getElementById('address-line2').value,
        city: document.getElementById('city').value,
        province: document.getElementById('province').value,
        postalCode: document.getElementById('postal-code').value,
        country: document.getElementById('country').value,
        companyPhone: document.getElementById('company-phone').value,
        additionalVendorNumbers: document.getElementById('additional-vendor-numbers').value,
        altPhone: document.getElementById('alt-phone').value,
        altExt: document.getElementById('alt-ext').value,
        persona: document.getElementById('persona').value,
        applicationList: document.getElementById('application-list').value
    };
    try {
        await updateUserProfile(data);
        alert('Profile updated successfully!');
        formDirty = false;
        if (document.getElementById('alert-bar')) {
            document.body.removeChild(document.getElementById('alert-bar'));
        }
    } catch (err) {
        alert('Failed to update profile: ' + err.message);
    }
});
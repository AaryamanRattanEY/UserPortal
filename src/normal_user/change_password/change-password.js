import { updateUserPassword } from '../../api/profile-calls.js';

let formDirty = false;


document.querySelectorAll('#change-password-form input').forEach(input => {
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
        document.getElementById('change-password-form').requestSubmit();
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


function validatePassword(password) {
    const lengthValid = password.length >= 8 && password.length <= 14;
    const upperValid = /[A-Z]/.test(password);
    const lowerValid = /[a-z]/.test(password);
    const numberValid = /[0-9]/.test(password);
    const specialValid = /[!@#$%^&*]/.test(password);
    return lengthValid && upperValid && lowerValid && numberValid && specialValid;
}


document.getElementById('change-password-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }
    if (!validatePassword(newPassword)) {
        alert('Password does not meet the requirements:\n- 8-14 characters\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least one special character (!@#$%^&*)');
        return;
    }
    try {
        await updateUserPassword(newPassword);
        alert('Password updated successfully!');
        formDirty = false;
        if (document.getElementById('alert-bar')) {
            document.body.removeChild(document.getElementById('alert-bar'));
        }
    } catch (err) {
        alert('Failed to update password: ' + err.message);
    }
});
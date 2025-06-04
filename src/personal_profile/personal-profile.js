// Tab switching logic
document.querySelectorAll('.tab').forEach((tab, idx) => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.tab-content')[idx].classList.add('active');
    });
});

let formDirty = false;

// Mark form as dirty on input
document.querySelectorAll('#personal-profile-form input, #personal-profile-form select').forEach(input => {
    input.addEventListener('input', () => {
        formDirty = true;
    });
});

// Create alert bar
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

// Tab click logic
document.querySelectorAll('.tabs a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (formDirty) {
            e.preventDefault();
            showAlertBar(this.href);
        }
    });
});

// Form submit logic
document.getElementById('personal-profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Update Account clicked (Personal Profile, API integration pending)');
    formDirty = false;
    if (document.getElementById('alert-bar')) {
        document.body.removeChild(document.getElementById('alert-bar'));
    }
});
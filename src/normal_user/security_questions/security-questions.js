import { updateSecurityQuestions } from '../../api/profile-calls.js';

document.addEventListener('DOMContentLoaded', populateQuestions);


document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

    });
});


document.getElementById('security-questions-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const questions = [];
    for (let i = 1; i <= 3; i++) {
        questions.push({
            question: document.getElementById(`question-${i}`).value,
            answer: document.getElementById(`answer-${i}`).value
        });
    }
    try {
        await updateSecurityQuestions({ questions });
        alert('Security questions updated successfully!');
    } catch (err) {
        alert('Failed to update security questions: ' + err.message);
    }
});
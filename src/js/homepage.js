// Dummy user data (replace with API call in production)
const user = {
    name: "123",
    email: "123.43.ca",
    role: "Vendor Admin"
};
//dummy code
document.addEventListener("DOMContentLoaded", () => {
    const profileInfo = document.getElementById("profile-info");
    profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role}</p>
    `;

    document.getElementById("edit-profile").onclick = () => {
        window.location.href = "./personal_profile/personal-profile.html";
    };
});
window.onload = function () {
    // Get the company name from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const company = urlParams.get('company');
    // Display the company name in the input field
    document.getElementById('company').value = company;
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("jobApplicationForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Perform form validation
        if (validateForm()) {
            // Submit the form if validation passes
            this.submit();
        }
    });

    function validateForm() {
        let isValid = true;

        // Check each required field
        const requiredFields = ["firstName", "lastName", "email", "phone", "experience", "skills", "currentCity", "resume"];
        requiredFields.forEach(function (fieldId) {
            const field = document.getElementById(fieldId);
            if (!field.checkValidity()) {
                field.classList.add("invalid");
                isValid = false;
            } else {
                field.classList.remove("invalid");
            }
        });

        return isValid;
    }
});

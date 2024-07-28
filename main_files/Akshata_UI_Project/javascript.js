let profileMenu = document.getElementById("profilemenu");

function toggleMenu() {
    profileMenu.classList.toggle("open-menu");
}

document.addEventListener("DOMContentLoaded", function() {
    // Load profile picture URL from local storage
    const profilePicUrl = localStorage.getItem("profilePicUrl");
    if (profilePicUrl) {
        document.getElementById("profilePic").src = profilePicUrl;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Add event listeners to all connect buttons
    const connectButtons = document.querySelectorAll(".connect-btn");
    connectButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Toggle the class "connected" when the button is clicked
            this.classList.toggle("connected");
            // Change the button text based on its state
            if (this.classList.contains("connected")) {
                this.textContent = "Request sent";
                this.style.backgroundColor = "green";
                this.style.color = "white";
            } else {
                this.textContent = "Connect";
            }
        });
    });
});

function openImageUploader() {
    document.getElementById("imageUploadModal").style.display = "block";
}

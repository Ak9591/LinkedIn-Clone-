document.addEventListener("DOMContentLoaded", function () {
    // Load profile picture URL from local storage
    const profilePicUrl = localStorage.getItem("profilePicUrl");
    if (profilePicUrl) {
        document.getElementById("profilePicContainer").src = profilePicUrl;
        document.getElementById("profilePic").src = profilePicUrl;
        document.getElementById("sidebarpic").src = profilePicUrl;
        document.getElementById("pic").src = profilePicUrl;
        document.getElementById("profilepost").src = profilePicUrl;
        
        const postActivityUserIcons = document.getElementsByClassName("post-activity-user-icon");
        for (let i = 0; i < postActivityUserIcons.length; i++) {
            postActivityUserIcons[i].src = profilePicUrl;
        }
       
        
    }
});

function openImageUploader() {
    document.getElementById("imageUploadModal").style.display = "block";
}

function closeImageUploader() {
    document.getElementById("imageUploadModal").style.display = "none";
}

function uploadImage() {
    const input = document.getElementById("imageInput");
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const profilePic = document.getElementById("profilePicContainer");
        profilePic.src = e.target.result;

        // Save profile picture URL to local storage
        localStorage.setItem("profilePicUrl", e.target.result);

        closeImageUploader();
    };

    reader.readAsDataURL(file);
}



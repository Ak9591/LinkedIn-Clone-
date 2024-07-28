document.addEventListener("DOMContentLoaded", function () {
    function createPost() {
        const postContent = document.querySelector(".create-post-input textarea").value;

        if (postContent === "") {
            alert("Please enter some text before posting.");
            return;
        }
        const selectedFile = document.getElementById("photoInput").files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const tempImageUrl = URL.createObjectURL(selectedFile);
                const tempImage = new Image();
                tempImage.src = tempImageUrl;
                tempImage.onload = function () {
                    createPostWithImage(postContent, tempImageUrl);
                }
            };
            reader.readAsArrayBuffer(selectedFile); // Read as ArrayBuffer for better performance
        } else {
            createPostWithImage(postContent);
        }

    }

    // Function to create a new post with an image
    function createPostWithImage(postContent, imageData = null) {
        // Get the profile picture URL
        const profilePicUrl = document.getElementById("profilePicContainer").src;

        // Get the current date and time
        const currentDate = new Date();

        // Create a new post element
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Create the post author section
        const authorElement = document.createElement("div");
        authorElement.classList.add("post-author");
        authorElement.innerHTML = `
        <img src="${profilePicUrl}">
        <div>
            <h1>Akshata</h1>
            <small>intern at Broadridge</small>
            <small class="post-time" data-post-time="${currentDate}">${getTimeAgo(currentDate)}</small>
        </div>
    `;
        postElement.appendChild(authorElement);

        // Create the post content section if postContent is not null
        if (postContent !== null) {
            const contentElement = document.createElement("p");
            contentElement.textContent = postContent;
            postElement.appendChild(contentElement);
        }

        // If there's image data, create an image element and append it
        if (imageData) {
            const imageElement = document.createElement("img");
            imageElement.src = imageData;
            imageElement.style.width = "100%";
          
            postElement.appendChild(imageElement);
        }

        // Create the post stats section
        const statsElement = document.createElement("div");
        statsElement.classList.add("post-stats");
        statsElement.innerHTML = `
        <div>
            <img src="img/thumbsup.png">
            <img src="img/love.png">
            <img src="img/clap.png">
            <span class="liked-user">You and 0 others</span>
        </div>
        <div>
            <span>0 comments &middot; 0 shares</span>
        </div>
    `;
        postElement.appendChild(statsElement);

        // Create the post activity section
        const activityElement = document.createElement("div");
        activityElement.classList.add("post-activity");
        activityElement.innerHTML = `
        <div>
            <img src="${profilePicUrl}" class="post-activity-user-icon">
            <img src="img/down-arrow.png" class="post-activity-arrow-icon">
        </div>
        <div class="post-activity-link">
            <img src="img/like.png">
            <span>Like</span>
        </div>
        <div class="post-activity-link">
            <img src="img/comment.png">
            <span>Comment</span>
        </div>
        <div class="post-activity-link">
            <img src="img/share.png">
            <span>Share</span>
        </div>
        <div class="post-activity-link">
            <img src="img/send.png">
            <span>Send</span>
        </div>
    `;
        postElement.appendChild(activityElement);

        // Append the new post after the "Sort by" section
        const sortBySection = document.querySelector('.sort-by');
        const mainContent = document.querySelector(".main-content");
        mainContent.insertBefore(postElement, sortBySection.nextSibling);

        // Clear the text area
        document.querySelector(".create-post-input textarea").value = "";
    }

    // Event listener for clicking on "Post" button
    document.querySelector(".create-post-links a:last-child").addEventListener("click", createPost);

    // Event listener for clicking on "Photo" button
    document.querySelector(".create-post-links a:nth-child(1)").addEventListener("click", function () {
        document.getElementById("photoInput").click();
    });

    // Event listener for clicking on "Video" button
    document.querySelector(".create-post-links a:nth-child(2)").addEventListener("click", function () {
        document.getElementById("videoInput").click();
    });

    // Event listener for when a video is selected
    document.getElementById("videoInput").addEventListener("change", function (event) {
        const selectedVideo = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const videoElement = document.createElement("video");
            videoElement.src = e.target.result;
            videoElement.width = "100%";
            videoElement.controls = true;
            // Append the selected video to the DOM
            document.querySelector(".create-post").appendChild(videoElement);
        };
        reader.readAsDataURL(selectedVideo);
    });
    
    // Update the time displayed within each post periodically
    setInterval(function () {
        const postTimes = document.querySelectorAll('.post-time');
        postTimes.forEach(function (timeElement) {
            const postDate = new Date(timeElement.getAttribute('data-post-time'));
            timeElement.textContent = getTimeAgo(postDate);
        });
    }, 60000); // Update every minute

    // Function to get the time ago
    function getTimeAgo(date) {
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        let interval = Math.floor(seconds / 60);

        if (interval < 1) {
            return "Just now";
        }
        if (interval < 60) {
            return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
        }
        interval = Math.floor(interval / 60);
        if (interval < 24) {
            return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
        }
        interval = Math.floor(interval / 24);
        if (interval < 30) {
            return interval + " day" + (interval > 1 ? "s" : "") + " ago";
        }
        interval = Math.floor(interval / 30);
        if (interval < 12) {
            return interval + " month" + (interval > 1 ? "s" : "") + " ago";
        }
        interval = Math.floor(interval / 12);
        return interval + " year" + (interval > 1 ? "s" : "") + " ago";
    }
});

"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const envelopeSection = document.getElementById("envelope-section");
const openEnvelopeBtn = document.getElementById("open-envelope-btn");
const passcodeInput = document.getElementById("passcode");

const CORRECT_PASSCODE = "14092024"; // Set your own passcode
const MAX_IMAGES = 5;
let noCount = 0;

// ✅ Yes Button Click Handler (Only if yesButton exists)
if (yesButton) {
    yesButton.addEventListener("click", function () {
        titleElement.innerHTML = "Yippeeee OwO";
        buttonsContainer.classList.add("hidden");
        changeImage("yes");
        playSound();
        startConfetti();

        // Show the envelope section
        envelopeSection?.classList.remove("hidden");
    });
}

// ✅ No Button Click Handler
if (noButton) {
    noButton.addEventListener("click", function () {
        if (noCount >= MAX_IMAGES) {
            // Prevent further actions after the final message
            return;
        }
        noCount++;
        const imageIndex = Math.min(noCount, MAX_IMAGES);
        changeImage(imageIndex);

        if (noCount < MAX_IMAGES) {
            resizeYesButton(); // Only resize if not at max
        }
        noButton.innerHTML = generateMessage(noCount);
    });
}


// ✅ Resize Yes Button
function resizeYesButton() {
    yesButton.style.fontSize = `${parseFloat(window.getComputedStyle(yesButton).fontSize) * 1.4}px`;
}

// ✅ Generate "No" Button Messages
function generateMessage(noCount) {
    const messages = [
        "No",
        "Excuse me??",
        "Try that again, I dare you.",
        "I hope your pillow is always warm.",
        "LAST. CHANCE.",
        "Fine. But I'm taking the cat with me."
    ];
    return messages[Math.min(noCount, messages.length - 1)];
}

// ✅ Change Cat Image
function changeImage(image) {
    catImg.src = `img/cat-${image}.jpg`;
}

// ✅ Play "Yippee" Sound
function playSound() {
    new Audio("sounds/yippee.mp3").play();
}

// ✅ Start Confetti Effect
function startConfetti() {
    confetti({ particleCount: 200, spread: 300, origin: { y: 0.2 } });
}

// ✅ Envelope Passcode Check
if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener("click", function () {
        if (passcodeInput.value === CORRECT_PASSCODE) {
            window.location.href = "letter.html";
        } else {
            alert("Wrong passcode! Try again.");
        }
    });
}

// ✅ Toggle Hint Text
const hintButton = document.getElementById("hint-btn");
if (hintButton) {
    hintButton.addEventListener("click", function () {
        document.getElementById("hint-text")?.classList.toggle("show");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Only bind the Yes Button click event if we're on the correct page
    if (document.body.classList.contains("index-page")) { 
        const yesButton = document.querySelector(".btn--yes");
        if (yesButton) {
            yesButton.addEventListener("click", function () {
                console.log("Yes button clicked!");
            });
        } else {
            console.error("Error: yesButton not found!");
        }
    }
});

// Check if the current page is 'letter.html'
if (window.location.pathname.includes("letter.html")) {
    // Only run the heart animation on letter.html page

    function startHeartEffect() {
        console.log("Adding hearts..."); // Debugging message

        for (let i = 0; i < 20; i++) {
            const heart = document.createElement("img");
            heart.src = "img/favicon.ico";  // Ensure the path is correct
            heart.classList.add("heart");

            // Randomly decide whether the heart starts from left, right, or bottom
            const direction = Math.floor(Math.random() * 3); // 0 = left, 1 = right, 2 = bottom

            if (direction === 0) {
                // Start from left
                heart.style.left = `${Math.random() * window.innerWidth}px`;
                heart.style.bottom = "0px";  // At the bottom
                heart.style.position = "fixed";
            } else if (direction === 1) {
                // Start from right
                heart.style.left = `${window.innerWidth - Math.random() * window.innerWidth}px`;
                heart.style.bottom = "0px";  // At the bottom
                heart.style.position = "fixed";
            } else {
                // Start from bottom center
                heart.style.left = `${Math.random() * window.innerWidth}px`;  // Random x position
                heart.style.bottom = "1em";  // Start from bottom
                heart.style.position = "fixed";
            }

            // Debugging log
            console.log(`Heart ${i} added at left: ${heart.style.left}, bottom: ${heart.style.bottom}`);

            document.body.appendChild(heart);

            // Remove heart after floating up
            setTimeout(() => {
                heart.remove();
                console.log(`Heart ${i} removed`);
            }, 3500);
        }
    }

    // Loop the heart effect every 1 second
    setInterval(startHeartEffect, 1000); // 1000ms = 1 second
}



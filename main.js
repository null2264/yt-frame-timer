function compute() {
    // Initiate basic time variables
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    // Get framerate, start frame, and end frame from corresponding elements
    // Double check they all have a value
    let frameRate = parseInt(document.getElementById('framerate').value);
    let startFrame = document.getElementById('startobj').value;
    let endFrame = document.getElementById('endobj').value;
    if (typeof(startFrame) === 'undefined' || endFrame === 'undefined' || framerate === 'undefined') {
        return
    };
    // Calculate framerate
    let frames = (endFrame - startFrame) * frameRate;
    seconds = Math.floor(frames / frameRate);
    frames = frames % frameRate;
    milliseconds = Math.round(frames / frameRate * 1000);
    if (milliseconds < 10) {
        milliseconds = '00' + milliseconds;
    } else if (milliseconds < 100) {
        milliseconds = '0' + milliseconds;
    }
    if (seconds >= 60) {
        minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
    }
    if (minutes >= 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
    }
    // Show the time and mod message in the DOM
    let finalTime = hours.toString() + 'h ' + minutes.toString() + 'm ' + seconds.toString() + 's ' + milliseconds.toString() + 'ms';
    let modMessage = `Mod Message: Time starts at ${parseFloat(startFrame).toFixed(3)} and ends at ${parseFloat(endFrame).toFixed(3)} at ${frameRate} fps to get a final time of ${finalTime}.`;
    let credits = `Retimed using [yt-frame-timer](https://mattbraddock.com/yt-frame-timer)`;
    document.getElementById('time').value = finalTime;
    document.getElementById('modMessage').disabled = false;
    document.getElementById('modMessage').innerText = modMessage + ' ' + credits;
    document.getElementById("modMessageButton").disabled = false;
}

function copyModMessage() {
    // Allow user to copy mod message to clipboard
    const textArea = document.getElementById('modMessage');
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    alert(`The mod message has been copied to clipboard! Please paste it into the comment of the run you are verifying.`);
}
const validateFPS = (event) => {
    // If framerate is invalid, show an error message and disable start and end frame fields
    if (event.target.value === '' || parseInt(event.target.value) <= 0 || isNaN(parseInt(event.target.value))) {
        document.getElementById('framerate').setCustomValidity('Please enter a valid framerate.');
        document.getElementById('framerate').reportValidity();
        document.getElementById('startobj').disabled = true;
        document.getElementById('endobj').disabled = true;
        document.getElementById('computeButton').disabled = true;
    } else {
        document.getElementById('startobj').disabled = false;
        document.getElementById('endobj').disabled = false;
        document.getElementById('computeButton').disabled = false;
    }
}
const parseForTime = (event) => {
    // Get current frame from input field (either start time or end time)
    let frameFromInputText = (JSON.parse(event.target.value)).lct;
    if (typeof frameFromInputText !== 'undefined') {
        // Get the framerate
        let frameRate = parseInt(document.getElementById('framerate').value);
        // Calculate the frame
        let frameFromObj = (time, fps) => Math.floor(time * fps) / fps; //round to the nearest frame
        let finalFrame = frameFromObj(frameFromInputText, frameRate);
        // Update the DOM
        document.getElementById(event.target.id).value = `${finalFrame}`;
    }
}
/*let trans = () => {
    //Add class
    document.documentElement.classList.add("transition");
    //Wait for the animation to finish then remove the class
    window.setTimeout(() => {
        document.documentElement.classList.remove("transition");
    }, 1000);
};
let preferedColorScheme = localStorage.getItem("colorMode");
let colorPreferanceToggle = document.getElementById("colorPreferance");
let colorPreferanceText = document.getElementById("colorPreferanceText");
let activeCss= document.getElementById("colorScheme");

//If the user already has a preferance respect it
if (preferedColorScheme == "Dark") {
    preferesDark();
} else if (preferedColorScheme == "Light") {
    preferesLight();
} else {
    //If they don't then make them use dark mode like a normal person
    preferesDark();
}

function preferesDark() {
    //Start the transition
    trans();
    //Save the preferance
    localStorage.setItem("colorMode", "Dark");
    colorPreferanceToggle.checked = true;
    colorPreferanceText.innerText = "🌚";
    activeCss.innerHTML = '<link rel="stylesheet" type="text/css" href="dark.css">';
}

function preferesLight() {
    //Start the transition
    trans();
    //Save the preferance
    localStorage.setItem("colorMode", "Light");
    colorPreferanceToggle.checked = false;
    colorPreferanceText.innerText = "🌞";
    activeCss.innerHTML = '<link rel="stylesheet" type="text/css" href="light.css">';
}

function colorChange() {
    //If the user already has a preferance respect it
    if (preferedColorScheme == "Dark") {
        preferesDark();
    } else if (preferedColorScheme == "Light") {
        preferesLight();
    } else {
        preferesLight();
    }
}

function colorChange() {
    //Find the button which will be checked if it's checked or not
    if (colorPreferanceToggle.checked == true) {
        preferesDark();
    } else {
        preferesLight();
    }
}

function handleColorChange(event) {
    if (event.matches) {
        // Dark mode
        preferesDark();
    } else {
        //There are only 2 options possible, so it should be fine
        preferesLight();
    }
}
colorPreferanceToggle.addEventListener("click", colorChange, true);
var mql = matchMedia("(prefers-color-scheme: dark)");
mql.onchange = handleColorChange;*/

"use strict";
/*Braxton English/INFX 370/ This code is meant to process the onclick interactions
from the user and display different animations in the text area from an array, seperated
by the =====\n delimiter. The animations can also be manupulated based on their speed as 
well as the size of the text. Buttons that should not be used are disabled to prevent
errors with the animations*/
var animationFrames;
var interval;
var size = document.getElementById("size");
var speed = 250;


window.onload = pageLoad;
//initially sets the page to a default state
function pageLoad() {
    //when the page loads, these button will be enabled/disabled 
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    //loads the functions with user interaction
    document.getElementById("start").onclick = start;
    document.getElementById("stop").onclick = stop;
    document.getElementById("animation").onclick = animation;
    document.getElementById("size").onclick = changeSize;
    document.getElementById("speed").onclick = changeSpeed;
}
function start() {
    //changes the page to set the animation and disable buttons
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    document.getElementById("animation").disabled = true;

    // creates an reoccurring function call that will change depending on changeSpe
    interval = setInterval(function() {
        nextSlide();
    }, speed);
}
function stop() {
	//clears the current interval and sets the values of the buttons
    clearInterval(interval);
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("animation").disabled = false;
    //displays all frames of the animation
    animation();
}
function nextSlide() {
    if (animationFrames.length > 0) {
        //grabs the first frame from the array of slides AND remove it from the array of frames.
        let currentFrame = animationFrames.shift();
        //print out the current frame
        document.getElementById("mytextarea").value = currentFrame;
		//places the frame to the end of the index to prevent using a while loop
        animationFrames.push(currentFrame);
    }
}
//displays the animation by changing the value of mytextarea depending on the user's input
function animation() {
    var whichOne = document.getElementById("animation").value;
    document.getElementById("mytextarea").value = ANIMATIONS[whichOne];

    // When we put all the slides in the print area, break it into an array of frames.
    animationFrames = document.getElementById("mytextarea").value.split("=====\n");
}
//changes the value of the font of mytextarea based on the input 
function changeSize() {
    size = document.getElementById("size").value;
    document.getElementById("mytextarea").style.fontSize = size;
}
//changes the speed between the default 250ms to 50ms when checked
function changeSpeed() {
    var turbo = document.getElementById("speed").checked;
    if (turbo) {
        speed = 50;
    } else {
        speed = 250;
    }
	//when set to turbo, the animation uses the new speed in the interval
    if (document.getElementById("start").disabled) {
        clearInterval(interval);
        start();
    }
}
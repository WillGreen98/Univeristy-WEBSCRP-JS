'use strict';

function id() {
    return "UP853829";
}

// This function update the leader board system for player scores
function updateLeaderBoard(player_Names, oneself) {
    let counter = 0;
    const leaderboard = document.getElementById("top10");

    // Removing all children; In reverse is faster than starting at firstChild
    while(leaderboard.lastChild) {
        leaderboard.removeChild(leaderboard.lastChild);
    }

    for(const lead of player_Names) {
        // This array map creates an li element and sets its textContent to leader, initialisation & Declaration
        // This is useful if you have multiple assignments
        const [li] = [document.createElement("li")].map(index => {
            index.textContent = lead;
            return index;
        });

        if(lead === oneself) li.className = "myself";
        leaderboard.append(li);

        counter++;
        if(counter === 10) return false; // this breaks the loop
    }
}

// Changes what is displayed on the window when user changes name value
function nickChanged() {
    document.getElementById("playername").textContent = document.getElementById("nick").value;
}
// Keeps step value up-to-date
function updateStep() {
    step = parseInt(document.getElementById("scalerange").value);
}

// Assigns and Displays new leaders
function leaders(limit) {
    let leaders_update = [];
    const leaderboard_li = document.getElementById("top10").getElementsByTagName("li");

    // Loops each value of the current leaderboard and replaces values with new values if valid
    for(const leader in leaderboard_li) {
        if(leaderboard_li[leader].textContent) {
            leaders_update.push(leaderboard_li[leader].textContent);
        }
    }
    return leaders_update.slice(0, limit); // Checks the 0th value so value passes 1
}

// Overwrites function in lib.js - Draws user Position
function drawUserPos() {
    const canvas_context = document.getElementById("c1").getContext("2d");

    canvas_context.beginPath();
    canvas_context.arc(canvas.width / 2, canvas.height / 2, step, Math.PI * 2, false);
    canvas_context.fillStyle = colours[pointer.colIndex]; // colIndex is defined in lib.js
    canvas_context.fill();
}

// Overwrites function in lib.js - Draws Pointer Position
function drawPointerPos() {
    context.beginPath();
    context.lineWidth = 4;
    context.arc(pointer.x, pointer.y, pointer.radius / step * 50, Math.PI * 2, false);
    context.strokeStyle = "black";
    context.stroke();
}

// Updated MoveMouse Function From lib.js in accordance to Errata: "Missing Sentence: Degrees"
function mouseMoved(e) {
    // position of the pointer within the canvas
    pointer.x = (e.pageX - canvas.offsetLeft);
    pointer.y = (e.pageY - canvas.offsetTop);

    // position of the pointer relative to the centre of the canvas
    pointer.xOffset = pointer.x - halfWidth;
    pointer.yOffset = pointer.y - halfHeight;

    // based on mouse.xOffset and mouse.yOffset .
    pointer.radius = Math.min(
        Math.sqrt(
            Math.pow(pointer.xOffset, 2) +
            Math.pow(pointer.yOffset, 2)
        ), limitOfAcceleration) / limitOfAcceleration * step;

    pointer.angle = Math.atan2(pointer.yOffset, pointer.xOffset).toFixed(3); // atan2 as parsing x & y

    //Updated code - Calculates new Degree value
    let degree = parseInt(pointer.angle * 180 / Math.PI) + 90;
    if(degree < 0) degree = parseInt(degree) + 360;

    pointer.degrees = degree;
    redraw();
}

function init() {
    // Reassigns pointer.colIndex based on current value, in tern creates an infinite loop of colour array
    canvas.addEventListener("click", () => {
        pointer.colIndex = (pointer.colIndex === 4) ? 0 : pointer.colIndex + 1;
    });

    document.getElementById("nick").addEventListener("input", nickChanged);
}

window.addEventListener("load", init);
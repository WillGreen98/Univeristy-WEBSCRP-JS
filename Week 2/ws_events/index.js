'use strict';


// Utility functions for reference that may be used by tests for various reasons.
function exampleAttacher() {
  window.exampleid.addEventListener("click", exampleEventHandler);
}

function exampleEventHandler(event) {
    console.log("This is a", event.type, "event.");
}

// used by snitchAttacher
function snitchUpdater(event) {
  window.snitch.textContent = (event.type == 'mouseover' ? "IN" : "OUT");
}

// used by lovelyParaAttacher
function lovelyToggle() {
    window.thisisalovelyparagraph.classList.toggle("lovely");
}

function id() {
    return "UP853829";
}

function fn() {
    return "Will";
}

function sn() {
    return "Green";
}

function targetTextToConsole(event) {
    console.log(event.target.textContent);
}

function tttcAttacher() {
    window.button0.addEventListener("click", targetTextToConsole);
}

function lovelyParaAttacher() {
    window.thisisalovelyparagraph.addEventListener("click", lovelyToggle);
}

function lovelyButtonAttacher() {
    window.button1.addEventListener("click", lovelyToggle);
}

function concatWorker(event) {
    window.out1.textContent = window.in1.value + window.in2.value;
}

function concatAttacher() {
    window.in1.addEventListener("change", concatWorker);
    window.in2.addEventListener("change", concatWorker);
}

function snitchAttacher() {
    window.mousewatcher.addEventListener("mouseover", snitchUpdater);
    window.mousewatcher.addEventListener("mouseout", snitchUpdater);
}

function reportUpdater(event) {
    document.getElementById("report").textContent = "x: " + event.screenX + " y: " + event.screenY;
}

function reportAttacher() {
    window.mousereporter.addEventListener("mousemove", reportUpdater);
}

function idValidationWatcher(event) {
    event.target.value.includes(" ") ? event.target.classList.add("invalid") : event.target.classList.remove("invalid");
}

function idValidationAttacher() {
    document.getElementById("newid").addEventListener("input", idValidationWatcher);
}
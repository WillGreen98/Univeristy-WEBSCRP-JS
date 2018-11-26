'use strict';

function id() {
    return "UP853829";
}

function fn() {
    return "Will";
}

function sn() {
    return "Green";
}

async function showMessage(element, string_url) {
    element.textContent = await fetch(string_url).text();
}

async function showList(element, string_url) {
    for(const data of await fetch(string_url).json()) {
        let li = document.createElement("li");
        li.textContent = i;
        element.appendChild(li);
    }
}

async function startShowingMessages(element, string_rul) {
    setInterval(showMessage, 1000, element, string_rul);
}

async function handleError(element ,string_url) {
    const response = await fetch(url);
    element.textContent = (response.ok) ? await response.text() : "OH DEAR";
}

function drawBox(canvas, url) {
    let ctx = canvas.getContext("2d");

    setInterval(function() {
        fetch(url)
            .then((response) => {return response.json()})
            .then((json) => {
                ctx.rect(json.x, json.y, 5, 5);
                ctx.stroke();

            })
    },1000);
}
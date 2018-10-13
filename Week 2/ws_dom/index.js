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

let attribute_setter = (element, attribute) => { for(let key in attribute) element.setAttribute(key, attribute[key]) };

function replaceText(element, string) {
    return element.textContent = string;
}

function addTextTo(element, string) {
    return element.append(string);
}

function moreBears() {
    attribute_setter(document.getElementById("animals"), {src: "http://placebear.com/400/200", alt: "A bear.", title: "A BEAR!"});
}

function setId(element, string) {
    element.id = string;
    return element;
}

function setClass(element, string) {
    element.className = string;
    return element;
}

function addAClass(element, string) {
    element.classList.add(string);
    return element
}

function removeAClass(element, string) {
    element.classList.remove(string);
    return element
}

function newElement(name) {
    return document.createElement(name)
}

function findElementById(id) {
    return document.getElementById(id);
}

function findElementsByQuery(query) {
    return document.querySelectorAll(query)
}

function reverseList(selector) {
    attribute_setter(document.querySelector(selector), {display: "flex", flexDirection: "row-reverse"});
}

function mover(element, selector) {
    document.querySelector(selector).appendChild(document.querySelector(element));
}

function filler(list, array) {
    return array.forEach(function(value) { list.appendChild([li] = [document.createElement("li")].map(index => { index.textContent = value; return index; })); });
}

function dupe(selector) {
    const element = document.querySelector(selector);
    const new_element = document.createElement("p");
    new_element.textContent = element.textContent;
    element.parentNode.appendChild(new_element);
}

function removeAll(selector) {
    for(const element of document.querySelectorAll(selector)){
        element.parentElement.removeChild(element);
    }
}

function getUserData() {
    return {
        username: document.querySelector("#username").valueOf(),
        speed: document.querySelector("#speed").valueOf(),
        student: document.querySelector("#student").valueOf()
    }
}
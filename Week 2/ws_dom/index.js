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

function replaceText(element, string) {
    return element.textContent = string;
}

function addTextTo(element, string) {
    return element.append(string);
}

function moreBears() {
    let attribute_setter = (element, attribute) => { for(let key in attribute) element.setAttribute(key, attribute[key]) };
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
    const list = document.querySelector(selector);
    let list_length = list.childNodes.length;
    while(list_length--) list.appendChild(list.childNodes[list_length]);
    return list;
}

function mover(element, selector) {
    document.querySelector(selector).appendChild(document.querySelector(element));
}

function filler(list, array) {
    for(const value of array) {
        const [li] = [document.createElement("li")].map(index => { index.textContent = value; return index; });
        list.appendChild(li);
    }
    return list;
}

function dupe(selector) {
    document.querySelector(selector).cloneNode(true).removeAttribute("id");
    document.querySelector(selector).parentNode.appendChild(document.querySelector(selector).cloneNode(true));
}

function removeAll(selector) {
    for(const element of document.querySelectorAll(selector)) {
        element.parentElement.removeChild(element);
    }
}

function getUserData() {
    return {
        name: document.getElementById("username").value,
        speed: parseInt(document.getElementById("speed").value),
        student: document.querySelector("#student").checked
    }
}
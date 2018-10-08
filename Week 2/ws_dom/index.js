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

function addAClass(element, string){
    element.classList.add(string);
    return element
}

function removeAClass(element, string){
    element.classList.remove(string);
    return element
}

function newElement(name){
    return document.createElement(name)
}

function findElementById(id){
    return document.getElementById(id);
}

function findElementsByQuery(query){
    return document.querySelectorAll(query)
}

// TODO Refactor as this an example
function reverseList(selector) {
    let no = document.querySelector(selector);
    let no_len = no.childNodes.length;
    while(no_len--) no.appendChild(no.childNodes[no_len]);
    return no;
}

// TODO try this.element & this.selector - doesn't work
function mover(element, selector) {
    let object_element = document.querySelector(element);
    let object_selector = document.querySelector(selector);
    object_selector.appendChild(object_element);
}

function filler(list, array) {
    //let array_items = document.getElementById(array).getElementsByTagName("li");

    for(const value of array) {
        const li = document.createElement("li");
        li.textContent = value;
        list.appendChild(li);
    }
    return list
}

function dupe(selector) {
    const element = document.querySelector(selector);
    const new_element = document.createElement("p");
    new_element.textContent = element.textContent;
    element.parentNode.appendChild(new_element);
}

function removeAll(selector) {
    const elements = document.querySelectorAll(selector);
    for(const element of elements){
        element.parentElement.removeChild(element)
    }
}

function getUserData() {
    const username = document.querySelector("#username");
    const speed = document.querySelector("#speed");
    const student = document.querySelector("#student");
    return {
        name: username.value,
        speed: parseInt(speed.value),
        student: student.checked
    }
}
const events = [ "dragstart", "drag", "dragenter", "dragleave", "dragover", "drop", "dragend" ]

let sections, footer;

function logEvent(e) {
	e.target.textContent += "x";
}

function addCell(parent, txt) {
	const td = document.createElement("td");
	td.textContent = txt;
	parent.appendChild(td);
}


function feedback(event) {

  let received = '';
  let time = Date.now();

  // do the drag and drop magic so something actually happens.
  if (event.type=="dragstart") {
    event.dataTransfer.setData("text/plain", time);
  }

  if (event.type=="dragover") {
    if (event.target.id == "droptarget") {
      // only allow dropping in one place.
      event.preventDefault();
    }
  }

  if (event.type=="drop") {
    received = event.dataTransfer.getData('text/plain');
    event.preventDefault();
  }

  // now the actual feeding back
	if (window["x"+event.type].checked) {

		const tr = document.createElement("tr");
		window.fbk.insertBefore(tr, window.fbk.firstChild);
		addCell(tr, time);
		addCell(tr, event.type);
		addCell(tr, event.target.id);
		addCell(tr, event.currentTarget.id);
		addCell(tr, received);

		// update counter
		window["x"+event.type+"count"].dataset.count++;
		window["x"+event.type+"count"].textContent = window["x"+event.type+"count"].dataset.count;
	}
}

function toggle(e) {
  selected[e] = !selected[e];
  localStorage.setItem("eventexpo", JSON.stringify(selected) );
  console.log("stored", e, localStorage.eventexpo);
}

let selected = {};

function createSwitches() {
  let str = "";
  try {
    if (localStorage.eventexpo) {
      selected = JSON.parse(localStorage.eventexpo);
    }
  	for (const event of events) {
      let checked = selected[event] ? 'checked' : '';
  		 str+= `<label><input type="checkbox" ${checked} onclick="toggle('${event}')" id="x${event}"><p>${event} (<span id=x${event}count data-count=0>0</span>)</p></label>`
  	}
  } catch (e) {
     str = "<p class=error>Hmmmm.  <code>localStorage</code> could not be accessed.  If you're on Safari, set <em>'Disable local file restrictions'</em> in the <em>Develop</em> menu to fix this security feature.</p>";
  }
	window.switches.innerHTML+=str;
}

function prep() {
	sections = document.getElementsByTagName("section");
	footer = document.getElementsByTagName("footer")[0];
	for (const section of sections) {
		for (const event of events) {
			section.addEventListener(event, feedback);
		}
	}
	const dragme = document.createElement("p");
	dragme.id="dragme";
	dragme.draggable=true;
	dragme.textContent = "Drag me!!";
	sections[0].appendChild(dragme);
	createSwitches();
}

window.addEventListener("load", prep);

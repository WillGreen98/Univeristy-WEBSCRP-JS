'use strict';

let lastTime = null;

function drawStickFigure(el, x, y, facing) {
    let c = el.getContext("2d");

    // set our drawing style
    c.lineWidth = 2;
    c.lineCap = "round";
    c.lineJoin = "round";
    c.strokeStyle = "#000";

    if(x == null) x = 100;
    if(y == null) y = 150;

    // the arms and the legs look the same
    drawLimbs(c, x, y); // legs
    drawLimbs(c, x, y - 40); // arms

    // body is just a line
    line(c, x, y - 40, x, y - 80); // body

    // head is a circle with eyes and a smile
    circle(c, x, y - 100, 20); // head
    drawFace(c, x, y - 100, facing); // face

    // helpful functions start here
    function drawLimbs(c, x, y) {
        line(c, x - 20, y, x, y - 40);
        line(c, x + 20, y, x, y - 40);
    }

    function drawFace(c, x, y, facing) {
        // if the `facing` parameter is not given, the stick figure will face towards us
        if(facing == null) facing = 90;

        // make sure the `facing` parameter is between 0 and 360
        facing = facing % 360; // that's like the mathematical remainder after a division
        if(facing < 0) facing += 360;
        if(facing > 180) return; // facing away from us, don't draw a face

        // we'll fake the turning of the face by shifting the eyes and the smile by an offset of up to 10 pixels
        let faceOffset = 0;
        if(facing <= 180) faceOffset = (facing - 90) / 9;

        circle(c, x - 7 - faceOffset, y - 5, 1); // 7 is distance from center, 5 is how high the eyes are from the head's center, 1 is eye size
        circle(c, x + 7 - faceOffset, y - 5, 1);

        // decrease the smile size here
        let smileSize = 70; // size of smile in degrees of angle; 360 would be a full circle
        let startAngle = rad(90 - smileSize / 2 - 2 * faceOffset);
        let endAngle = rad(90 + smileSize / 2 - 2 * faceOffset);
        arc(c, x - faceOffset, y, 12, startAngle, endAngle); // 12 is the radius of the smile circle
    }

    // draw a line on canvas context `c`, from point x1,y1 to point x2,y2
    function line(c, x1, y1, x2, y2) {
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x2, y2);
        c.stroke();
    }

    // draw a circle on canvas context `c`, centered on x,y, with radius r
    // also fill the circle with white (so it's not transparent)
    function circle(c, x, y, r) {
        c.beginPath();
        c.fillStyle = "#fff";
        c.arc(x, y, r, 0, 6.3, false); // 6.3 is bigger than 2π so the arc will be a whole circle
        c.fill();
        c.stroke();
    }


    // draw an arc on canvas context `c`, cenetered on x,y, with radius r, from angleStart to angleEnd
    function arc(c, x, y, r, angleStart, angleEnd) {
        c.beginPath();
        c.arc(x, y, r, angleStart, angleEnd, false);
        c.stroke();
    }

    // convert from degrees to radians
    function rad(x) {
        return x * Math.PI / 180;
    }
}

function drawLines(canvas) {
    let canvas_context = canvas.getContext("2d");

    canvas_context.beginPath();
    canvas_context.moveTo(100, 100);
    canvas_context.lineTo(500, 100);
    canvas_context.stroke();

    canvas_context.moveTo(100, 200);
    canvas_context.lineTo(300, 200);
    canvas_context.stroke();
}

function drawTriangle(canvas, x1, y1, x2, y2, x3, y3) {
    const canvas_context = canvas.getContext("2d");

    canvas_context.beginPath();
    canvas_context.moveTo(x1, y1);
    canvas_context.lineTo(x2, y2);
    canvas_context.lineTo(x3, y3);
    canvas_context.lineTo(x1, y1);
    canvas_context.fillStyle = "#00FF00";
    canvas_context.outlineColor = "#FF0000";
    canvas_context.fill();
    canvas_context.stroke();
}

function drawGrid(canvas) {
    const canvas_context = canvas.getContext("2d");

    canvas_context.beginPath();
    for(let x = 0; x < canvas.width; x += 50) {
        for(let y = 0; y < canvas.height; y += 50) {
            canvas_context.moveTo(0, y);
            canvas_context.lineTo(canvas.width, y);
            canvas_context.stroke();
        }

        canvas_context.moveTo(x, 0);
        canvas_context.lineTo(x, canvas.height);
        canvas_context.stroke();
    }
}

function drawCzechFlag(canvas) {
    const canvas_context = canvas.getContext("2d");

    canvas_context.beginPath();
    canvas_context.rect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    canvas_context.fillStyle = "#FF0000";
    canvas_context.fill();
    canvas_context.stroke();

    canvas_context.beginPath();
    canvas_context.moveTo(0, 0);
    canvas_context.lineTo(canvas.width / 2, canvas.height / 2);
    canvas_context.lineTo(0, canvas.height);
    canvas_context.fillStyle = "#0000FF";
    canvas_context.fill();
    canvas_context.stroke();
}

function elapsedTime() {
    if (!lastTime) lastTime = Date.now();
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTime;
    lastTime = currentTime;
    return timeElapsed / 1000;
}

function drawSpartacus(canvas) {
    let canvas_context = canvas.getContext("2d");

    drawStickFigure(canvas, 50, 150, 180);

    let speed = 20;
    let distanceWalked = 0;
    let walking = false;

    let positionX = Math.floor(Math.random() * (canvas.width - 100) + 50);
    let positionY = Math.floor(Math.random() * (canvas.height - 120) + 100);
    let targetX = positionX;
    let targetY = positionY;

    canvas.addEventListener('click', setNewTarget);

    updateAndDrawCurrentState();

    function startWalking(canvas_context, canvas) {
        if(walking) return;
        walking = true;
        elapsedTime();
        updateAndDrawCurrentState(canvas_context, canvas)
    }

    function stopWalking() {
        walking = false;
    }

    function updateAndDrawCurrentState() {
        console.log(canvas_context, targetX, targetY);
        console.error(canvas);
        canvas_context.clearRect(0, 0, canvas.width, canvas.height);
        cross(canvas_context, targetX, targetY);

        const distance = Math.sqrt(Math.pow(targetX - positionX, 2) + Math.pow(targetY - positionY, 2));

        if(distance < 1) {
            drawStickFigure(canvas, positionX, positionY, canvas);
            distanceWalked = 0;
            stopWalking();
            return;
        }

        let walkedNow = speed * elapsedTime();
        if (walkedNow > distance) walkedNow = distance;

        let direction = Math.acos((targetX - positionX) / distance);
        if((targetY - positionY) < 0) direction -= direction;

        positionX = positionX + Math.cos(direction) * walkedNow;
        positionY = positionY + Math.sin(direction) * walkedNow;
        distanceWalked += walkedNow;

        drawStickFigure(canvas, positionX, positionY, 180);
        if(walking) requestAnimationFrame(updateAndDrawCurrentState);
    }

    function setNewTarget(event) {
        const canvas_context = canvas.getContext("2d");

        const click = getClickCoordinates(event, canvas);
        targetX = click.left - 2;
        targetY = click.top - 2;
        console.log(canvas);
        startWalking(canvas_context, canvas);
    }

    function cross(canvas, targetX, targetY) {
        line(canvas, targetX - 10, targetY, targetX + 10, targetY);
        line(canvas, targetX, targetY - 10, targetX, targetY + 10);
    }

    function line(canvas, x1, y1, x2, y2) {
        canvas.beginPath();
        canvas.moveTo(x1, y1);
        canvas.lineTo(x2, y2);
        canvas.stroke();
    }

    function getClickCoordinates(event, element) {
        const rect = element.getBoundingClientRect();
        return {
            left: event.clientX - rect.left,
            top: event.clientY - rect.top,
        };
    }
}

function drawEyes(canvas) {
    const canvas_context = canvas.getContext("2d");

    // Sclera
    circle(canvas_context, canvas.width / 4, canvas.height / 2, canvas.width / 4);
    circle(canvas_context, canvas.width / 4 + canvas.width / 2, canvas.height / 2, canvas.width / 4);
    // Iris
    circle(canvas_context, canvas.width / 4, canvas.height / 2, canvas.width / 8, "brown");
    circle(canvas_context, canvas.width / 4 + canvas.width / 2, canvas.height / 2, canvas.width / 8, "brown");
    // Pupil
    circle(canvas_context, canvas.width / 4, canvas.height / 2, canvas.width / 16, "black");
    circle(canvas_context, canvas.width / 4 + canvas.width / 2, canvas.height / 2, canvas.width / 16, "black");

    function circle(canvas, x, y, r, fill="#fff") {
        canvas.beginPath();
        canvas.arc(x, y, r, 0, 6.3, false); // 6.3 is bigger than 2π so the arc will be a whole circle
        canvas.fillStyle = fill;
        canvas.fill();
        canvas.stroke()
    }
}

function drawSmiley(canvas) {

}

function drawEmoji(canvas) {

}
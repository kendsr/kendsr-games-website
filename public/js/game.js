var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;

var canvas, canvasContext;

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    // var mousey = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);    
    canvas.addEventListener('mousemove', updateMousePos);
}

function updateAll() {
    moveAll();
    drawAll();
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width) { // left
        ballSpeedX *= -1;
    }
    if (ballX < 0) { // right
        ballSpeedX *= -1;
    }
    if (ballY > canvas.height) { // top
        ballReset();
    }
    if (ballY < 0) { // bottom
        ballSpeedY *= -1;
    }

    var paddleTopEdgeY = canvas.height-PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdge = paddleLeftEdgeX + PADDLE_WIDTH;
    if (ballY > paddleTopEdgeY && // below the top of paddle
        ballY < paddleBottomEdgeY && //above the bottom of paddle
        ballX > paddleLeftEdgeX && // right of the left side of paddle
        ballX < paddleRightEdge) { // left of the right side of paddle
            ballSpeedY *= -1;

            var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
            var ballDistfromPaddleCenterX = ballX - centerOfPaddleX;
            ballSpeedX = ballDistfromPaddleCenterX * 0.35;
        }
}
    
function drawAll() {

    colorRect(0,0, canvas.width, canvas.height, 'black'); // Clear screen
    colorCircle(ballX,ballY, 10, 'white'); // draw ball
    colorRect(paddleX, canvas.height -PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'red'); // draw PADDLE
}

function colorRect(topLeftX,topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth, boxHeight, fillColor);
}
function colorCircle(centerX,centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    canvasContext.fill();
}

var base;
var top;
var mainchar;
var score;
var x1 = 700;
var x2 = 300;
var y=300;
var obstacleTop;
var obstacleBottom;
var i=0;
var j=0;
var size;
var font;
var scoreText;
var x_score;
var y_score;
var highScore = localStorage.getItem('highestScore');
var scoreValue = 0;
var scoreText = "SCORE: " + scoreValue ;
canvas = document.createElement('canvas');
function createCanvas(){
    canvas.width = 750;
    canvas.height = 500;
    context = canvas.getContext('2d');
    document.body.insertBefore(canvas, document.body.childNodes[0]);
}
function createElementsInGame(){
    base = new createElements(0,350,'green',750,150);
    top = new createElements(0,0,'green',750,150);
}

function scoreElement(size, font, fontColor, x_score, y_score){
    var scoreBoard = canvas.getContext('2d');
    scoreBoard.font = size + " " + font;
    scoreBoard.fillStyle = fontColor;
    scoreBoard.fillText(scoreText, x_score, y_score);
}
function updateGameArea(){
    clearTheWindow();
    mainchar = new createElements(10,y,'red',50,50);
    createElementsInGame();
    x1 += -6;
    x2 += -6;
    obstacleTop = new createElements(x1,0,'deepskyblue',200,150);
    obstacleBottom = new createElements(x2, 350, 'deepskublue',150,150);
    score = new scoreElement("30px", "Consolas", "black", 500, 40);
    scoreValue += 1;
    scoreText = "SCORE: " + scoreValue;
    if(x1<-200){
        x1 = Math.floor(Math.random()*750);
        x1 += 750;
    }
    if(x2<-175){
        do{
            x2 = Math.floor(Math.random()*750);
            x2 += 750;
        }
        while((Math.max(x1, x2) - Math.min(x1, x2)) < 300);    
    }
    if(crashBottom() || crashTop()){
        stop();
    }
}

function jump(){
    if(y==300){
        y=150;
    }
    else{
        y=300;
    }
   
}


function createElements(x,y,c,w,h){
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = c;
    ctx.fillRect(x,y,w,h);
}

function refresh(){
    interval = setInterval(updateGameArea, 20);
}
function clearTheWindow(){
    context.clearRect(0,0,canvas.width,canvas.height);
}

function crashBottom(){
    var mainCharLeft = 10;
    var mainCharRight = 60;
    var mainCharTop = y;
    var mainCharBottom = y+50;
    var obstacleBottomLeft = x2;
    var obstacleBottomRight = x2+150;
    var obstacleBottomTop = 350;
    var obstacleBottomBottom = 500;
    var crashBottomResult = true;
    if((mainCharBottom<obstacleBottomTop) || (mainCharRight<obstacleBottomLeft) || (mainCharLeft>obstacleBottomRight)){
        crashBottomResult = false;
    }
    return crashBottomResult;

}

function crashTop(){
    mainCharLeft = 10;
    mainCharRight = 60;
    mainCharTop = y;
    mainCharBottom = y+50;
    var obstacleTopLeft = x1;
    var obstacleTopRight = x1+200;
    var obstacleTopBottom = 150;
    var obstacleTopTop = 0;
    var crashTopResult = true;
    if((mainCharBottom<obstacleTopTop) || (mainCharTop>obstacleTopBottom) || (mainCharRight<obstacleTopLeft) || (mainCharLeft>obstacleTopRight)){
        crashTopResult = false;
    }
    return crashTopResult;
}

function stop(){
    highestScore();
    clearInterval(interval);
}

function highestScore(){
    if(highScore !== null){
        if(scoreValue > parseInt(highScore)){
            localStorage.setItem('highestScore', scoreValue);
        }
    }
    else{
        localStorage.setItem('highestScore', scoreValue);
    }
    document.getElementById('highestScore').innerHTML = "YOUR SCORE: " + scoreValue + " " + "HIGHEST SCORE: " + localStorage.getItem('highestScore');
}




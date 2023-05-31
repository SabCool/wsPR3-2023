const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let clients = [];
let isGameRunning = false;


const utils = require('./utils');
const Grass = require('./entities/grass');
const Grazer = require('./entities/grazer');
const Predator = require('./entities/predator');

app.use(express.static("./client"));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, function(){
    console.log("Der WS Server läuft auf port 3000");
    
    io.on('connection', function(socket){
      console.log('ws client connection established');
      clients.push(socket.id);
      socket.emit("connection", socket.id);

     if(clients.length == 1 && isGameRunning == false){
      console.log("Starte Spiel... wenn noch nicht gestartet...");
      initGame();
      setInterval(updateGame, fr);
      isGameRunning = true;
      setInterval(raining, 4000);
     }


    });
});

matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 3, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
 ];

let fr = 1000;

//Liste der Lebewesen
grassArr = [];
grazerArr = [];
predArr = [];

// wetter
let isRaining = false;

function getRandMatrix(b, h){
    let matrix = [];
    for(let y = 0; y < h; y++){
        matrix[y] = [];
        for(let x = 0; x < b; x++){
            matrix[y][x] = Math.round(utils.getRandomInt(0,2));  
        }
    }
    return matrix;
}

function initGame(){
    matrix = getRandMatrix(50,50);
    matrix[12][8] = 2;  
    matrix[35][46] = 2;
    createPredators(10);
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if(matrix[y][x] == 1){
                let grasObj = new Grass(x, y);
                grassArr.push(grasObj);
            }else if(matrix[y][x] == 2){
                let grasfresser = new Grazer(x,y);
                grazerArr.push(grasfresser);
            }else if(matrix[y][x] == 3){
                let fleischfresser = new Predator(x,y);
                predArr.push(fleischfresser);
            }
        }
    }
    
    console.log("Game init - done");
    console.log("Sende matrix zu clients")
    io.sockets.emit('send matrix', matrix);
 }

 function updateGame(){
   
    for(let i=0; i<grassArr.length; i++){
        let grasObj= grassArr[i];
        grasObj.mul(); 
    }

    for(let i=0; i< grazerArr.length; i++){
        let grasfresser = grazerArr[i];
        grasfresser.eat();
        grasfresser.mul();
    }

    for (let i = 0; i < predArr.length; i++) {
        const pred = predArr[i];
        pred.eat();
        pred.mul();
    }

    // console.log(matrix);
    console.log("sende matrix zu clients...");
    io.sockets.emit('send matrix', matrix);
 }

function raining(){
    isRaining = !isRaining;
    io.sockets.emit('raining', isRaining);
}

function createPredators(amount){
    for (let i = 0; i < amount; i++) {
       let x = utils.getRandomInt(0, 50);
       let y = utils.getRandomInt(0, 50);
        matrix[y][x] = 3;
        // let pred = new Predator(x, y)
        // predArr.push(pred);     
    }
}
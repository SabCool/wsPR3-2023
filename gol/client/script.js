let matrix = [[]];
let side = 10;
let fr = 4;
let socket_id = undefined;
let isRaining = false;


window.onload = handleGame;

function handleGame(){
    const socket = io();

    socket.on('connection', function(data){
     console.log("connection successful: ", data);
     socket_id = data;
    })

    socket.on('send matrix', function(data){
        resizeCanvas(side*matrix[0].length+1, side * matrix.length+1);
        matrix = data;
    })

    socket.on('raining', function(data){
        isRaining = data;
    })
}


function setup(){
    // createCanvas(side*matrix[0].length+1, side * matrix.length+1);
    background('#acacac');
    frameRate(fr);
}

 function draw(){
    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            matrix[y][x];
            fill('white');
            if(matrix[y][x] == 1){
                if(isRaining){
                    fill('blue')
                }else{
                    fill('green')
                }
                
            }else if(matrix[y][x] == 2){
                if(isRaining){
                    fill('orange')
                }else{
                    fill('yellow')
                }
            }else if(matrix[y][x] == 3){
                if(isRaining){
                    fill('purple')
                }else{
                    fill('red')
                }
            }
            // zeichnen rect
            rect(x*side,y*side,side,side);
        }
    }
}
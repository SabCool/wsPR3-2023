function main (){
    console.log("main is executed...");
    const socket = io();

    //callback
    function openMatrix (matrixData){
        // zeichne diese Matrix
        matrix = matrixData;  
    }
    socket.on('send matrix', openMatrix)
}

main();

let matrix = [];
let side = 50;
let fr = 5;
function setup(){
    // createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    createCanvas(500, 500);
    background('#acacac');
    frameRate(fr);
}

function draw(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill('white');
            if (matrix[y][x] == 1) {
                fill("#28764F")
            } else if (matrix[y][x] == 2) {
                fill('#DB960B')
            } else if (matrix[y][x] == 3) {
                fill('#961707')
            }
            rect(x * side, y * side, side, side);
        }
    }
}
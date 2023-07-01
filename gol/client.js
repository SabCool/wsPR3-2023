function main (){
    console.log("main is executed...");
    const socket = io();
    //Callbacks festlegen für Infos vom Server
    function openMatrix (matrixData){
        // speichere diese Matrix
        matrix = matrixData;   
    }

    function initMatrix(matrixData){
        matrix = matrixData;
        resizeCanvas(matrix[0].length * side + 1, matrix.length * side + 1)
    }
    socket.on('send matrix', openMatrix);
    socket.on('init matrix', initMatrix);

    // Callbacks für Klick Events
    function killAll(){
        // sende Nachricht an Server
        console.log("sende kill all an server..");
        socket.emit('kill all', 'Grazer')
    }
    let btn = document.getElementById('myGameBtn');
    btn.onclick = killAll;
}

main();

// Spieldaten und Zeichnen mit p5.js
let matrix = [];
let side = 20;
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
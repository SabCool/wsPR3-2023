const Grass = require('./grass');
const Grazer = require('./grazer');
const Predator = require('./predator');

const express = require('express');
const { SocketAddress } = require('net');
const app = express();
let server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('./'));
app.get('/', function (req, res) {
    res.redirect('client.html');
})

matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 3, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];

let fr = 3;
let side = 10;

// 
grassArr = [];
grazerArr = [];
predArr = [];

// Funktionen definieren
function getRandomMatrix(width, height) {
    // erstellt matrix
    let matrix = [];
    // weitere Arrays erstellen
    for (let y = 0; y < height; y++) {
        // leeres Array in die Matrix speichern
        matrix.push([]);
        // jedes dieser Array - werte rein speichern
        for (let x = 0; x < width; x++) {
            matrix[y][x] = Math.floor(Math.random() * 2);
        }
    }
    return matrix;
}

function createMoreCreatures() {
    // Grasfresser und Fleischfresser
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (x == y) {
                matrix[y][x] = 2;
                if (y + 2 < matrix.length && x + 2 < matrix[0].length)
                    matrix[y + 2][x + 2] = 2;
            }
            if (x + y == matrix.length - 1) {
                matrix[y][x] = 3;
            }
        }
    }
}

function initGame() {
    console.log('init Game...');
    // matrix = getRandomMatrix(50, 50);
    // createMoreCreatures();
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y));
            } else if (matrix[y][x] == 2) {
                grazerArr.push(new Grazer(x, y));
            }
            else if (matrix[y][x] == 3) {
                predArr.push(new Predator(x, y));
            }
        }
    }
    console.log(matrix);
}

function updateGame() {
    console.log("update Game...")

    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }

    for (let i = 0; i < grazerArr.length; i++) {
        grazerArr[i].eat();
    }

    for (let i = 0; i < predArr.length; i++) {
        predArr[i].eat();

    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            // console.log(matrix);
        }
    }
}

function killAll(data) {
    console.log("Client EVENT erhalten: ", data);
    // spiellogik alle Lebewesen löschen
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    grassArr = [];
    grazerArr = [];
    predArr = [];

}

////////////////////////////////////////
// Spiel auf Server starten
//////////////////////////////////////
let myInterval = null;

server.listen(3000, function () {
    console.log("Server wurde gestartet und hört auf Port 3000.");
})

io.on('connection', function (socket) {
    console.log('ws connection established...', io.engine.clientsCount);

    // Spiel starten sobald 1. Client verbunden
    if (io.engine.clientsCount === 1) {
        initGame();
        socket.emit('init matrix', matrix);
        // starte game loop
        myInterval = setInterval(function () {
            updateGame();
            console.log('send matrix');
            io.sockets.emit('send matrix', matrix);
        }, 1000);
    } else {
        // init wenn weitere clients sich verbinden
        socket.emit('init matrix', matrix);
    }

    // Definition von callbacks für client-Infos
    socket.on('kill all', killAll);
})
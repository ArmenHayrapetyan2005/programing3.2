function generator(matLen, gr, grEat, grPred, grPred1, grWall) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < grPred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < grPred1; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < grWall; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    return matrix;
}

let side = 15;

let matrix = generator(30, 100, 60, 10, 1, 1,1);

let grassArr = []
let grassEaterArr = []
let PredatorArr = []
let Predator1Arr = []
let waterArr = []
let WalArr = []

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(3)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grE = new GrassEater(x, y)
                grassEaterArr.push(grE)
            } else if (matrix[y][x] == 3) {
                let grPred = new Predator(x, y)
                PredatorArr.push(grPred)
            } else if (matrix[y][x] == 5) {
                let grPred = new Predator1(x, y)
                Predator1Arr.push(grPred)
            } else if (matrix[y][x] == 4) {
                let grPred = new Water(x, y)
                waterArr.push(grPred)
            } else if (matrix[y][x] == 6) {
                let grPred = new Wall(x, y)
                WalArr.push(grPred)
            }
        }
    }
}

var fs = require('fs');

var statistics = {};
let a = 200;

let b = 80;
setInterval(function() {
statistics.grass = a++;
statistics.grassEater = b++;
fs.writeFile("statistics.json", JSON.stringify( statistics), function(){
console.log("send")
})
},1000);

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green')
            } else if (matrix[y][x] == 0) {
                fill('#acacac')
            } else if (matrix[y][x] == 2) {
                fill('yellow')
            } else if (matrix[y][x] == 3) {
                fill('red')
            } else if (matrix[y][x] == 4) {
                fill('blue')
            } else if (matrix[y][x] == 5) {
                fill('pink')
            } else if (matrix[y][x] == 6) {
                fill('black')
            }

            rect(x * side, y * side, side, side)
        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in PredatorArr) {
        PredatorArr[i].mul()
        PredatorArr[i].eat()
    }
    for (let i in Predator1Arr) {
        Predator1Arr[i].mul()
        Predator1Arr[i].eat()
    }
}

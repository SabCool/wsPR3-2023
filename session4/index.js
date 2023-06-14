// const Square = require("./module");

// function main(){
//     let square = new Square(50);
//     console.log(square.getArea())
// }

// main();

const fs = require('fs');

function main(){
    
    let file  = "hello.js";
    // fs.appendFileSync(file, "console.log('Hello world')\n");
    fs.writeFile('test.txt', "hello SAbine", 
    function(err) {
        console.log("fs.writeFile ended...")
    }
    )

    console.log('fs.writefile');
 }
 main();
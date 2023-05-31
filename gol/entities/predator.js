const utils = require("../utils");
const LivingCreature = require("./livingCreature");

module.exports = class Predator extends LivingCreature {
    constructor(x, y){
        super(x, y);
        this.eatCounter = 0;
        this.notEatCounter = 0;
    }

    updateNeighbors(){
        this.neighborPos = [
            [this.x -1, this.y -1],
            [this.x, this.y -1],
            [this.x +1, this.y-1],
            [this.x-1, this.y],
            [this.x+1, this.y],
            [this.x-1, this.y+1],
            [this.x, this.y+1],
            [this.x+1, this.y+1]
        ];
    }

    chooseFields(symbol){
        this.updateNeighbors();
        return super.chooseFields(symbol);
    }

    eat(){
        let fields = this.chooseFields(2);
        if(fields.length > 0){
            let foodPos = utils.getRandomElementFromArray(fields);
            let newX = foodPos[0];
            let newY = foodPos[1];
            matrix[newY][newX]= 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            // fressen
            for(let i=0; i< predArr.length; i++){
                let obj = predArr[i];
                if(obj.x == this.x && obj.y == this.y){
                    predArr.splice(i, 1); // index, wieviele Element löschen
                    break;
                }
            }
            this.eatCounter++;
            this.notEatCounter = 0;
        }else{
            this.eatCounter = 0;
            this.notEatCounter++;
            if(this.notEatCounter >= 8){
                this.die();
            }else{
                this.move();
            }
            
        }
    }

    die(){
        matrix[this.y][this.x] = 0;
        for(let i = 0; i < predArr.length; i++){
            let obj = predArr[i];
            if(obj.x == this.x && obj.y == this.y){
                predArr.splice(i, 1);
                break;
            }
        }
    }

    move(){
        let emptyFields = this.chooseFields(0);
        if(emptyFields.length > 0){
            let newPos = utils.getRandomElementFromArray(emptyFields);
            matrix[newPos[1]][newPos[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newPos[0];
            this.y = newPos[1];
        }
    }

    mul(){
        if(this.eatCounter >= 8){
            let emptyFields = this.chooseFields(0);
            if(emptyFields.length > 0){
                let newPos = utils.getRandomElementFromArray(emptyFields);
                predArr.push(new Predator(newPos[0], newPos[1]));
                matrix[newPos[1]][newPos[0]] = 3;
            }
            this.eatCounter = 0;
        }
    }
}
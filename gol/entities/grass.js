let LivingCreature = require("./livingCreature");
const utils = require("../utils");

module.exports = class Grass extends LivingCreature{

    mul(){
        this.multiply++;
        // wenn 5 Runden vorbei 
        if(this.multiply >= 6){
            let emptyFields = this.chooseFields(0);
            if(emptyFields.length > 0){
                let newPos = utils.getRandomElementFromArray(emptyFields);
                let newX = newPos[0];
                let newY = newPos[1];
                let grasObj = new Grass(newX, newY);
                grassArr.push(grasObj);
                matrix[newY][newX] = 1;
            }
            this.multiply = 0;
        }
    }
}
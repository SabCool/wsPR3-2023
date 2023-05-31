module.exports = class LivingCreature{

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
        let found = [];
        for(let i = 0; i < this.neighborPos.length; i++){
            let posArr = this.neighborPos[i];
            let x = posArr[0];
            let y = posArr[1];
            if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if(matrix[y][x] == symbol){
                    found.push(posArr);
                }
            }
            
        }
        return found;
    }

}
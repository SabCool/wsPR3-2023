function getRandomInt(min, max){
    return  Math.floor(Math.random() * (max - min) + min);
}

function getRandomElementFromArray(arr){
    if(arr && arr.length > 0){
        let randIndex = getRandomInt(0, arr.length);
        return arr[randIndex];
    }else{
        return undefined;
    }
}

module.exports = { getRandomElementFromArray, getRandomInt }
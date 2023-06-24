let clickCount = 0;
function clickHandler(evt){
   clickCount++;
   console.log(evt);
   let str = "Thanks for clicking " + clickCount;
   this.innerText = "blubb blubb";
}

let p = document.getElementById("pElement");
p.addEventListener("click", clickHandler);

// 1. Schritt button aus DOM finden
let myBtn = document.getElementById("btnElement");
// 2. sChritt EventListener registieren auf Button
function btnCallback(){
    alert("hallo SAbine");

}
myBtn.onclick = btnCallback;

function loadCallback (){
    alert("webseite ist geladen...")
    
}
window.onload = loadCallback;
function keyCallback(evt){
    console.log(evt.key);
}
window.onkeydown = keyCallback;
// myBtn.addEventListener('click', btnCallback);


function bodyClick(evt){
  console.log("body was clicked....", evt.pageX, evt.pageY);  
}

window.onclick = bodyClick
function setup(){
    createCanvas(500, 500);
    background('red');
}
function mouseClicked() {
    console.log(mouseX, mouseY);
 }
 
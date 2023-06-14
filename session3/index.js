const express = require("express");
const app = express();

app.use(express.static('../gol'))

app.get("/", function(req, res){
    res.send("<h2 style='color:#ff0000;'>Hello user....</h2><p>mein toller TExt</p>");
});

app.get("/gol", function(req, res){
    res.redirect("index.html");
})

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });
 
 app.get("/google/:search", function(req, res){
    let search = req.params.search;
    res.redirect('http://google.de/search?q='+search);
 });

app.listen( 3000, function(){
    console.log("my server is running on port 3000...");
});



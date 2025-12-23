const express = require("express");
const app = express();
const http = require("http");

//1 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//2 session


//3 BSSR: 
app.set("views", "views");
app.set("view engine", "ejs");


//4
app.get("/", function (req, res) {
    res.end("<h1>Hello world</h1>");
})

app.get("/gift", function (req, res) {
	res.end("<h1>Siz sovgalar bolimidasz</h1>");
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(`server is running on port: ${PORT}`);
})

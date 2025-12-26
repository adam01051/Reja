const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
	if (err) {
		console.log("ERROR: ", err);
	} else {
		user = JSON.parse(data);
	}
});
//1
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//2 session

//3 BSSR:
app.set("views", "views");
app.set("view engine", "ejs");

//4

app.post("/create-item", function (req, res) {
	// res.end("  <h1>hello world</h1>");
	//to do it later
});
app.get("/author", function (req, res) {
	res.render("author", { user: user });
});

app.get("/", function (req, res) {
	res.render("harid.ejs");
});



const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(`server is running on port: ${PORT}`);
})

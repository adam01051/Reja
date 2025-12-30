const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");

const db = require("./server").db();

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
	res.render("reja.ejs");
});



module.exports =app;
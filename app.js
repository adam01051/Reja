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
	console.log("user entered create item");
	const new_reja = req.body.reja;
	console.log(req.body);
	db.collection("reja").insertOne({ reja: new_reja }, (err, data) => {
		if (err) {
			{
				console.log("smth went wrong on adding to reja", err);
			}
		} else {
			console.log("susccess");
		}
	});
});
app.get("/author", function (req, res) {
	res.render("author", { user: user });
});

app.get("/", function (req, res) {
	console.log("user entered /");
	db.collection("reja")
		.find()
		.toArray((err, data) => {
			if (err) {
				console.log(err);
				res.end("something went wrong");
			} else {
				

				res.render("reja", { items: data });
			}
		});
});



module.exports =app;
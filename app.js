const express = require("express");
const app = express();
const http = require("http");
const fs = require("fs");
const user = require("./database/user.json");

const db = require("./server").db();
const mongodb = require("mongodb");
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
	if (!new_reja || !new_reja.trim()) {
		return res.status(400).json({ error: "Reja text is required" });
	}
	console.log(req.body);
	db.collection("reja").insertOne({ reja: new_reja.trim() }, (err, data) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ error: "create failed" });
		}
		console.log(data.ops[0]);
		res.json(data.ops[0]);
	});
});
app.get("/author", function (req, res) {
	res.render("author", { user: user });
});

app.use(express.static("public"));

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
app.post("/delete-item", (req, res) => {
	const id = req.body.id;
	db.collection("reja").deleteOne(
		{ _id: new mongodb.ObjectId(id) },
		function (err, data) {
			if (err) {
				console.log(err);
				res.end("smth went wrong");
			}
			res.json({ state: "success" });
		}
	);
});
app.post("/edit-item", (req, res) => {
	const data = req.body;
	db.collection("reja").findOneAndUpdate(
		{ _id: new mongodb.ObjectId(data.id) },
		{ $set: { reja: data.new_input } },
		function (err, data) {
			if (err) {
				console.log(err);
				res.end("smth went wrong");
			}
			res.json({ state: "success" });
		}
	);
});
app.post("/delete-all", (req, res) => {
	if (req.body.delete_all) {
		db.collection("reja").deleteMany(function () {
			res.json({ state: "hamma reja ochirildi" });
		});
	}
});

module.exports = app;

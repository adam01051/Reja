const http = require("http");

const mongodb = require("mongodb");
let db;

const ConnectionString =
	"mongodb+srv://adam01051:pTULr4jMzIEDeRdM@cluster0.xxcb6nc.mongodb.net/";

mongodb.connect(
	ConnectionString,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) console.log("error: ", error);
		else {
			console.log("mongodb connection suceeded");
			module.exports = client;
			const app = require("./app");
			const server = http.createServer(app);
			let PORT = 4009;
			server.listen(PORT, function () {
				console.log(
					`server is running on port: ${PORT}, http://localhost:${PORT}`,
				);
			});
		}
	}
);

//mitask c
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();

class Shop {
	#non;
	#cola;
	#lagmon;
	constructor(non, cola, lagmon) {
		this.#non = non;
		this.#cola = cola;
		this.#lagmon = lagmon;
	}

	qoldiq() {
		console.log(
			`Hozir ${hours}:${minutes}'da  ${this.#non}'ta non,  ${
				this.#lagmon
			}'ta lag'mon, ${this.#cola}'ta cola mavjud!`
		);
	}

	qabul(elem, num) {
		if (elem === "non") {
			this.#non = this.#non + num;
		} else if (elem === "cola") {
			this.#cola = this.#cola + num;
		} else if (elem === "lag'mon") {
			this.#lagmon = this.#lagmon + num;
		}
	}
	sotish(elem, num) {
		if (elem === "non") {
			if (this.#non >= num) {
				this.#non -= num;
			} else {
				console.log("Yetarli mahsulot (non) mavjud emas");
			}
		} else if (elem === "cola") {
			if (this.#cola >= num) {
				this.#cola -= num;
			} else {
				console.log("Yetarli mahsulot (cola) mavjud emas");
			}
		} else if (elem === "lag'mon") {
			if (this.#lagmon >= num) {
				this.#lagmon -= num;
			} else {
				console.log("Yetarli mahsulot (lag'mon) mavjud emas");
			}
		}
	}
}
//did optional logic for sotish() method
const shop = new Shop(4, 5, 2);
shop.sotish("non", 6);
shop.qoldiq();

//mitask b

// function countDigits(text) {
// 	let count = 0;
// 	for (const ele of text) {
// 		if (ele >= "0" && ele <= "9") {
// 			count++;
// 		}
// 	}
// 	return count;
// }
// console.log(countDigits("ad2a54y79wet0sfgb9"));

// //mitask a

// function countLetter(a, b) {
// 	let count = 0;
// 	for (const ele of b) {
// 		if (a === ele) {
// 			count++;
// 		}
// 	}
// 	return count;
// }
// console.log(countLetter("e", "engineer"));

//22nd lecture
// const list = [
// 	"yahshi talaba boling",
// 	"togri boshlig tanlang va koproq hato qiling", // 20-30
// 	"uzingizga ishlashingizni boshlang", // 30-40
// 	"siz kuchli bolgan narsalarni qiling", // 40-50
// 	"yoshlarga investitsiya qiling", // 50-60
// 	"endi dam oling, foydasi yoq endi", // 60
// ];

// function maslahatBering(a, callback) {
// 	if (typeof a !== "number") callback("please insert number here", null);
// 	else if (a <= 20) callback(null, list[0]);
// 	else if (a > 20 && a <= 30) callback(null, list[1]);
// 	else if (a > 30 && a <= 40) callback(null, list[2]);
// 	else if (a > 40 && a <= 50) callback(null, list[3]);
// 	else if (a > 50 && a <= 60) callback(null, list[4]);
// 	else {
// 		setTimeout(function () {
// 			callback(null, list[5]);
// 		});
// 	}
// }
// console.log("passed here");
// maslahatBering(63, (err, data) => {
// 	if (err) console.log("error", err);
// 	console.log("javob:", data);
// });
// console.log("passed here 1");

// async function maslahatBering(a, callback) {
// 	if (typeof a !== "number") throw new Error("please insert number here");
// 	else if (a <= 20) return list[0];
// 	else if (a > 20 && a <= 30) return list[1];
// 	else if (a > 30 && a <= 40) return list[2];
// 	else if (a > 40 && a <= 50) return list[3];
// 	else if (a > 50 && a <= 60) return list[4];
// 	else {
// 		// return list[5];
// 		return new Promise((resolve, reject) => {
// 			setInterval(() => {
// 				resolve(list[5]);
// 			}, 5000);
// 		});
// 	}
// }

// async function run(params) {
// 	let javob = await maslahatBering(20);
// 	console.log(javob);
// 	javob = await maslahatBering(81);
// 	console.log(javob);
// 	javob = await maslahatBering(71);
// 	console.log(javob);
// }
// run();

//then/catch
// console.log("passed here");
// maslahatBering(25)
// 	.then((data) => {
// 		console.log("javob:", data);
// 	})
// 	.catch((err) => {
// 		console.log("error:", err);
// 	});
// console.log("passed here 1");

//21st lecture------------------------------

// function maslahatBering(a, callback) {
// 	if (typeof a !== "number") callback("please insert number here", null);
// 	else if (a <= 20) callback(null, list[0]);
// 	else if (a > 20 && a <= 30) callback(null, list[1]);
// 	else if (a > 30 && a <= 40) callback(null, list[2]);
// 	else if (a > 40 && a <= 50) callback(null, list[3]);
// 	else if (a > 50 && a <= 60) callback(null, list[4]);
// 	else {
// 		setTimeout(function () {
// 			callback(null, list[5]);
// 		});
// 	}
// }
// console.log("passed here");
// maslahatBering(63, (err, data) => {
// 	if (err) console.log("error", err);
// 	console.log("javob:", data);
// });
// console.log("passed here 1");

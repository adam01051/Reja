const { default: axios } = require("axios");
const { response } = require("../app");

let createField = document.getElementById("create-field");

function itemTemplate(data) {
	return `

	<li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
		<span  class="item-text">
			${item.reja}
		</span>
		<div>
			<button data-id ="<${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">
				Ozgartirish
			</button>
			<button data-id ="<${item._id}"> class="delete-me btn btn-danger btn-sm">Ochirish</button>
		</div>
 	</li>`;
}

document.getElementById("create-form").addEventListener("submit", function (e) {
	e.preventDefault();
	axios
		.post("/create-item", { reja: new_reja })
		.then((response) => {
			document
				.getElementById("item-list")
                .insertAdjacentElement("beforeend", itemTemplate(response.data));
            createField.value = "";
            createField.focus(); 
		})
        .catch((er) => {
            console.log("please try again");
        });
});

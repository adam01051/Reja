let createField = document.getElementById("create-field");

function itemTemplate(item) {
	return `

	<li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
		<span  class="item-text">
			${item.reja}
		</span>
		<div>
			<button data-id ="<$={item._id}" class="edit-me btn btn-secondary btn-sm mr-1">
				Ozgartirish
			</button>
			<button data-id ="<$={item._id}" class="delete-me btn btn-danger btn-sm">Ochirish</button>
		</div>
 	</li>`;
}

document.getElementById("create-form").addEventListener("submit", function (e) {
	e.preventDefault();
	axios
		.post("/create-item", { reja: createField.value })
		.then((response) => {
			document
				.getElementById("item-list")
				.insertAdjacentHTML("beforeend", itemTemplate(response.data));
			createField.value = "";
			createField.focus();
			console.log("add new function is working for now");
		})
		.catch((err) => {
			console.log("please try again", err);
		});
});

document.addEventListener("click", function (e) {
	if (e.target.classList.contains("delete-me")) {
		if (confirm("anniq ochirmoqchimisz?")) {
			axios
				.post("/delete-item", { id: e.target.getAttribute("data-id") })
				.then((response) => {
					console.log(response.data);
					e.target.parentElement.parentElement.remove();
				})
				.catch((err) => {
					console.log("iltimos boshqattan harakat qilin");
				});
		}
	}
	if (e.target.classList.contains("edit-me")) {
		if (confirm("anniq ozgarish kiritmoqchimisz?")) {
		}
	}
});

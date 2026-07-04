const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const createField = document.getElementById("create-field");
const createForm = document.getElementById("create-form");
const itemList = document.getElementById("item-list");
const cleanAllButton = document.getElementById("clean-all");
const emptyState = document.getElementById("empty-state");
const feedback = document.getElementById("form-feedback");
let motionApi = null;

function getMotion() {
	if (motionApi) return Promise.resolve(motionApi);
	return import("https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm")
		.then((module) => {
			motionApi = {
				animate: module.animate,
				inView: module.inView,
				stagger: module.stagger,
			};
			return motionApi;
		})
		.catch((error) => {
			console.warn("Motion animations unavailable", error);
			return null;
		});
}

function runMotion() {
	if (reduceMotion) {
		document
			.querySelectorAll(".motion-rise, .motion-item, .motion-section, .motion-card")
			.forEach((element) => {
				element.style.opacity = "1";
				element.style.transform = "none";
			});
		return;
	}

	getMotion().then((motion) => {
		if (!motion) return;
		const { animate, inView, stagger } = motion;

		document.querySelectorAll(".motion-rise, .motion-item").forEach((element) => {
			element.style.opacity = "0";
			element.style.transform = "translateY(18px)";
		});

		document.querySelectorAll(".motion-section, .motion-card").forEach((element) => {
			element.style.opacity = "0";
			element.style.transform = "translateY(18px)";
		});

		animate(
			".motion-rise",
			{ opacity: 1, y: 0 },
			{ duration: 0.55, delay: stagger(0.08), easing: [0.22, 1, 0.36, 1] },
		);

		animate(
			".motion-item",
			{ opacity: 1, y: 0 },
			{ duration: 0.42, delay: stagger(0.05), easing: [0.22, 1, 0.36, 1] },
		);

		document.querySelectorAll(".motion-section").forEach((section) => {
			inView(
				section,
				() => {
					animate(section, { opacity: 1, y: 0 }, { duration: 0.5, easing: [0.22, 1, 0.36, 1] });
					animate(
						section.querySelectorAll(".motion-card"),
						{ opacity: 1, y: 0 },
						{ duration: 0.42, delay: stagger(0.06), easing: [0.22, 1, 0.36, 1] },
					);
				},
				{ margin: "0px 0px -18% 0px" },
			);
		});

		document
			.querySelectorAll(".service-card, .task-card, .primary-button, .ghost-button, .icon-button")
			.forEach((element) => {
				element.addEventListener("pointerenter", () => {
					animate(element, { y: -3 }, { duration: 0.18 });
				});
				element.addEventListener("pointerleave", () => {
					animate(element, { y: 0 }, { duration: 0.18 });
				});
			});
	});
}

function escapeHtml(value) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function setFeedback(message, isError = true) {
	if (!feedback) return;
	feedback.textContent = message;
	feedback.style.color = isError ? "var(--danger)" : "var(--success)";
}

function postJSON(url, payload) {
	return fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}
		return response.json();
	});
}

function updateEmptyState() {
	if (!itemList || !emptyState) return;
	const isEmpty = itemList.children.length === 0;
	itemList.classList.toggle("is-empty", isEmpty);
	emptyState.classList.toggle("hidden", !isEmpty);
	if (cleanAllButton) cleanAllButton.disabled = isEmpty;
}

function renumberItems() {
	if (!itemList) return;
	[...itemList.children].forEach((item, index) => {
		const indexElement = item.querySelector(".task-card__index");
		if (indexElement) indexElement.textContent = String(index + 1).padStart(2, "0");
	});
}

function itemTemplate(item) {
	const safeText = escapeHtml(item.reja || "");
	return `
		<li class="task-card motion-item" style="opacity: 1; transform: none;">
			<span class="task-card__index">00</span>
			<span class="item-text">${safeText}</span>
			<div class="task-card__actions">
				<button data-id="${item._id}" class="edit-me icon-button" type="button" aria-label="Edit plan">Edit</button>
				<button data-id="${item._id}" class="delete-me icon-button danger" type="button" aria-label="Delete plan">Delete</button>
			</div>
		</li>`;
}

if (createForm && createField && itemList) {
	createForm.addEventListener("submit", function (event) {
		event.preventDefault();
		const value = createField.value.trim();

		if (!value) {
			setFeedback("Please write a plan before adding it.");
			createField.focus();
			return;
		}

		setFeedback("");
		const submitButton = createForm.querySelector("button[type='submit']");
		if (submitButton) submitButton.disabled = true;

		postJSON("/create-item", { reja: value })
			.then((response) => {
				itemList.insertAdjacentHTML("beforeend", itemTemplate(response));
				const newItem = itemList.lastElementChild;
				createField.value = "";
				createField.focus();
				renumberItems();
				updateEmptyState();
				setFeedback("Plan added.", false);

				if (newItem && !reduceMotion) {
					getMotion().then((motion) => {
						if (!motion) return;
						motion.animate(newItem, { opacity: [0, 1], y: [14, 0] }, { duration: 0.35, easing: [0.22, 1, 0.36, 1] });
					});
				}
			})
			.catch((error) => {
				console.error("Create failed", error);
				setFeedback("Could not add this plan. Please try again.");
			})
			.finally(() => {
				if (submitButton) submitButton.disabled = false;
			});
	});
}

document.addEventListener("click", function (event) {
	const target = event.target;
	if (!(target instanceof HTMLElement)) return;

	if (target.classList.contains("delete-me")) {
		const card = target.closest(".task-card");
		const id = target.getAttribute("data-id");
		if (!card || !id) return;

		if (confirm("Delete this plan?")) {
			target.disabled = true;
			postJSON("/delete-item", { id })
				.then(() => {
					const removeCard = () => {
						card.remove();
						renumberItems();
						updateEmptyState();
					};

					if (reduceMotion) {
						removeCard();
					} else {
						getMotion().then((motion) => {
							if (!motion) {
								removeCard();
								return;
							}
							motion.animate(card, { opacity: 0, x: 18, height: 0, marginTop: 0, marginBottom: 0 }, { duration: 0.28 }).then(removeCard);
						});
					}
				})
				.catch((error) => {
					console.error("Delete failed", error);
					target.disabled = false;
					alert("Please try deleting this plan again.");
				});
		}
	}

	if (target.classList.contains("edit-me")) {
		const card = target.closest(".task-card");
		const textElement = card?.querySelector(".item-text");
		const id = target.getAttribute("data-id");
		if (!card || !textElement || !id) return;

		const currentText = textElement.textContent.trim();
		const userInput = prompt("Edit your plan", currentText);
		if (userInput === null) return;

		const nextText = userInput.trim();
		if (!nextText) {
			alert("Plan text cannot be empty.");
			return;
		}

		target.disabled = true;
		postJSON("/edit-item", { id, new_input: nextText })
			.then(() => {
				textElement.textContent = nextText;
				if (!reduceMotion) {
					getMotion().then((motion) => {
						if (!motion) return;
						motion.animate(card, { backgroundColor: ["#dff3ed", "#ffffff"] }, { duration: 0.55 });
					});
				}
			})
			.catch((error) => {
				console.error("Edit failed", error);
				alert("Please try editing this plan again.");
			})
			.finally(() => {
				target.disabled = false;
			});
	}
});

if (cleanAllButton && itemList) {
	cleanAllButton.addEventListener("click", function () {
		if (itemList.children.length === 0) return;
		if (!confirm("Delete all plans? This cannot be undone.")) return;

		cleanAllButton.disabled = true;
		postJSON("/delete-all", { delete_all: true })
			.then(() => {
				itemList.innerHTML = "";
				updateEmptyState();
				setFeedback("All plans cleared.", false);
			})
			.catch((error) => {
				console.error("Delete all failed", error);
				alert("Please try clearing plans again.");
				cleanAllButton.disabled = false;
			});
	});
}

runMotion();
renumberItems();
updateEmptyState();

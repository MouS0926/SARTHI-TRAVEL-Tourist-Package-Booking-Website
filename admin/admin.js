window.addEventListener("load", () => {
    fetchProduct();
});

let cardsContainer = document.getElementById("data-list-wrapper");
const sortSelect = document.querySelector("#sort");
const filterSelect = document.querySelector("#filter");
const searchInput = document.querySelector("#search");
const editInput = document.querySelector("#edit");

async function fetchProduct() {
    try {
        const response = await fetch("https://sarthi-api.onrender.com/destinations");
        const users = await response.json();
        renderCards(users);
        return users;
    } catch (error) {
        console.error(error);
    }
}

function renderCards(users) {
    console.log(users);
    cardsContainer.innerHTML = "";

    users.forEach((user) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const boxImg = document.createElement("div");
        boxImg.classList.add("boxImg");
        const image = document.createElement("img");
        image.src = `${user.image}`;
        image.alt = `${user.name}'s profile picture`;
        boxImg.appendChild(image);
        card.appendChild(boxImg);

        const boxdetails = document.createElement("div");
        boxdetails.classList.add("boxDetails");
        const name = document.createElement("h3");
        name.textContent = user.name;
        boxdetails.appendChild(name);

        const location = document.createElement("p");
        location.textContent = `${user.location}`;
        boxdetails.appendChild(location);

        const price = document.createElement("p");
        price.textContent = `Price: ₹${user.price * 10}`;
        boxdetails.appendChild(price);

        const btnDiv = document.createElement("div");
        const deleteIcon = document.createElement("button");
        deleteIcon.classList.add("deleteIcon");
        deleteIcon.textContent = "Delete";
        deleteIcon.addEventListener("click", async() => {
            let del_id = user.id;
            try {
                const response = await fetch(
                    `https://sarthi-api.onrender.com/destinations/${del_id}`, {
                        method: "DELETE",
                    }
                );
                if (response.ok) {
                    card.remove(); //this will remove the card
                }
            } catch (error) {
                console.error(error);
            }
            fetchUsers();
        });
        btnDiv.appendChild(deleteIcon);

        const editIcon = document.createElement("button");
        const aTag = document.createElement("a");
        aTag.setAttribute("href", "#");
        aTag.setAttribute("data-id", user.id);
        aTag.classList.add("cardLink");
        aTag.innerText = "Edit";

        editIcon.addEventListener("click", function(e) {
            e.preventDefault();
            const editLink = document.querySelectorAll(".cardLink");
            console.log(editLink);
            editLink.forEach((elementbtn) => {
                elementbtn.addEventListener("click", (event) => {
                    event.preventDefault();
                    let id = event.target.dataset.id;
                    console.log(id);
                    updateAllPopulateProduct(id);
                });
            });
        });
        editIcon.appendChild(aTag);

        btnDiv.appendChild(editIcon);
        boxdetails.appendChild(btnDiv);
        card.appendChild(boxdetails);

        cardsContainer.appendChild(card);
    });
}

//  add products
let destinationNameInput = document.getElementById("product-name");
let destinationImgInput = document.getElementById("product-image");
let destinationLocationInput = document.getElementById("product-brand");
let destinationPriceInput = document.getElementById("product-price");
let destinationCreateBtn = document.getElementById("add-product");

destinationCreateBtn.addEventListener("click", () => {
    let destinationName = destinationNameInput.value;
    let destinationImg = destinationImgInput.value;
    let destinationLocation = destinationLocationInput.value;
    let destinationPrice = destinationPriceInput.value;

    let newEmpObj = {
        name: destinationName,
        image: destinationImg,
        location: destinationLocation,
        price: destinationPrice,
    };

    console.log(newEmpObj);
    fetch("https://sarthi-api.onrender.com/destinations", {
            method: "POST",
            body: JSON.stringify(newEmpObj),
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            fetchProduct(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

//  update products
let updateDestinationIdInput = document.getElementById("update-product-id");
let updateDestinationNameInput = document.getElementById("update-product-name");
let updateDestinationImgInput = document.getElementById("update-product-image");
let updateDestinationBrandInput = document.getElementById(
    "update-product-brand"
);
let updateDestinationPriceInput = document.getElementById(
    "update-product-price"
);
let updateDestinationCreateBtn = document.getElementById("update-product");

function updateAllPopulateProduct(changeid) {
    console.log(changeid);
    fetch(`https://sarthi-api.onrender.com/destinations/${changeid}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            // Populate the input fields with the extracted values
            updateDestinationIdInput.value = data.id;
            updateDestinationNameInput.value = data.name;
            updateDestinationImgInput.value = data.image;
            updateDestinationBrandInput.value = data.location;
            updateDestinationPriceInput.value = data.price;
        })
        .catch((error) => {
            console.log(error);
        });
}

// function changeUpdatesProducts() {
updateDestinationCreateBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let updateDestinationId = updateDestinationIdInput.value;
    let updateproductName = updateDestinationNameInput.value;
    let updateproductImg = updateDestinationImgInput.value;
    let updateproductBrand = updateDestinationBrandInput.value;
    let updateproductPrice = updateDestinationPriceInput.value;

    let newUpdatedProductObj = {
        id: updateDestinationId,
        name: updateproductName,
        image: updateproductImg,
        location: updateproductBrand,
        price: updateproductPrice,
    };
    let changeid = updateDestinationId;
    console.log(changeid);

    fetch(`https://sarthi-api.onrender.com/destinations/${changeid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUpdatedProductObj),
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            fetchProduct(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

let sortProductLowtoHigh = document.getElementById("sort-low-to-high");
sortProductLowtoHigh.addEventListener("click", function() {
    fetch(`https://sarthi-api.onrender.com/destinations/?_sort=price,views&_order=asc`)
        .then((response) => {
            return response.json();
        })
        .then((productData) => {
            console.log(productData);
            renderCards(productData);
        })
        .catch((error) => {
            console.error(error);
        });
});

let sortProductHightoLow = document.getElementById("sort-high-to-low");
sortProductHightoLow.addEventListener("click", () => {
    console.log("low");
    fetch(`https://sarthi-api.onrender.com/destinations?_sort=price,views&_order=desc`)
        .then((res) => res.json())
        .then((productData) => {
            renderCards(productData);
        })
        .catch((err) => {
            console.log(err);
        });
});

// filterSelect.addEventListener("change", function (e) {
//   const selectedBatch = e.target.value;

//   fetch("http://localhost:1999/products")
//     .then((response) => {
//       return response.json();
//     })
//     .then((users) => {
//       const filteredUsers = filterUsersByBatch(users, selectedBatch);
//       renderCards(filteredUsers);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// function filterUsersByBatch(users, batchFilter) {
//   if (batchFilter === "") {
//     return users;
//   } else {
//     return users.filter((user) => user.batch === batchFilter);
//     searchQuery;
//   }
// }
searchInput.addEventListener("input", function(e) {
    const searchQuery = e.target.value.toLowerCase().trim();

    fetch("https://sarthi-api.onrender.com/destinations")
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            const filteredUsers = searchUsersByName(users, searchQuery);
            renderCards(filteredUsers);
        })
        .catch((error) => {
            console.error(error);
        });
});

function searchUsersByName(users, searchQuery) {
    if (searchQuery === "") {
        return users;
    } else {
        return users.filter(
            (user) =>
            user.name.toLowerCase().includes(searchQuery) ||
            user.location.toLowerCase().includes(searchQuery)
        );
    }
}
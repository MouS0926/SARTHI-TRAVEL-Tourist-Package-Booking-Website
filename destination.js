let destination = JSON.parse(localStorage.getItem("destination")) || [];
let conty = document.getElementById("conty");

let imgdiv = document.createElement("div");

let paise = destination[0].price;

let backImage = document.createElement("img");
backImage.setAttribute("src", destination[0].image);

let place = document.createElement("h1");
place.innerText = destination[0].name;

let position = document.createElement("h2");
position.textContent = ` ${destination[0].location}`;

imgdiv.append(backImage, place, position);
conty.append(imgdiv);

let from = document.getElementById("city");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let NoOfPerson = document.getElementById("NoOfperson");

let bookBtn = document.getElementById("bookBtn");

bookBtn.addEventListener("click", function () {
  alert("Your booking is completed.Thank You");

  fetch("http://localhost:9971/bookPlaces", {
    method: "POST",
    body: JSON.stringify({
      name: `${place.innerText}`,
      location: `${position.innerText}`,
      city: `${from.value}`,
      start: `${startDate.value}`,
      end: `${endDate.value}`,
      persons: `${NoOfPerson.value}`,
      amount: `${Number(paise) * Number(NoOfPerson.value) * 10}`,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  location.replace("./discover.html");
});

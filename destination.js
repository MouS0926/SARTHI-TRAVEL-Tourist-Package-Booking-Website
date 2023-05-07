let destination = JSON.parse(localStorage.getItem("destination")) || [];
let conty = document.getElementById("conty");

let imgdiv = document.createElement("div");

let backImage = document.createElement("img");
backImage.setAttribute("src", destination[0].image);

let place = document.createElement("h1");
place.innerText = destination[0].name;

let position = document.createElement("h2");
position.textContent = ` ${destination[0].location}`;

imgdiv.append(backImage, place, position);
conty.append(imgdiv);

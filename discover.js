let cont = document.getElementById("container");
let data = [];
let info = fetch("http://localhost:9971/destinations");
info
  .then(function (res) {
    return res.json();
  })
  .then(function (datas) {
    // console.log(data);
    data = datas;
    console.log(data);
    display(data);
  })
  .catch(function (err) {
    console.log(err);
  });
function display(data) {
  cont.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let anchor = document.createElement("a");
    anchor.setAttribute("href", "./destination.html");
    anchor.addEventListener("click", function () {
      let destination = [];
      destination.push(data[i]);
      localStorage.setItem("destination", JSON.stringify(destination));
    });

    let card = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", data[i].image);

    let name = document.createElement("h2");
    name.innerText = data[i].name;

    let location = document.createElement("h4");
    location.innerText = data[i].location;

    let box = document.createElement("div");

    let rating = document.createElement("h4");
    rating.innerText = `⭐ ${Number(data[i].rating) / 10}`;

    let price = document.createElement("h4");
    price.innerText = `$ ${data[i].price} / Person`;

    box.append(rating, price);
    card.append(image, name, location, box);
    anchor.append(card);
    cont.append(anchor);
  }
}

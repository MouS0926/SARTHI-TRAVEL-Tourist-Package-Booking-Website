const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

fetch(`http://localhost:9971/bookPlaces`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    let total = 0;
    let price = 0;
    let adminDataAppend = document.getElementById("adminSiteBoxId");
    let x = "";
    data.forEach((visitor) => {
      total += visitor.price * 10;
      let income = (visitor.price * 10 * 25) / 100;
      price += income;
      x += `
      <div class="card">
        <div class="card__image"> 
        <img  src="${visitor.image}" alt="Image Error" />
        </div>
        <div class="card__infos">
        <h1 id="card__name">${visitor.name}</h1>
        <h2 id="card__location">${visitor.location}</h2>
        <p id="card__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
   `;
      adminDataAppend.innerHTML = x;
    });

    let dealsData = document.getElementById("total-deals");
    dealsData.innerText = data.length;
    let saleData = document.getElementById("total-sale");
    saleData.innerText = `₹${price}`;
    let incomeData = document.getElementById("income");
    incomeData.innerText = `₹${total}`;
  });

let logOut = document.getElementById("logout");
logOut.addEventListener("click", () => {
  window.location.href = "../index.html";
});

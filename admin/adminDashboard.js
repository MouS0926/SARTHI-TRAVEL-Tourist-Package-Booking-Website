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

fetch(`http://localhost:9971/destinations`)
  .then((res) => res.json())
  .then((data) => {
    let total = 0;
    let price = 0;

    data.forEach((order) => {
      total += order.price;
      let income = (order.price * 25) / 100;
      price += income;
      const tr = document.createElement("tr");
      const trContent = `
                     
                        <td>${order.title}</td>
                        <td>${order.id}</td>
                        <td>${order.category}</td>
                        <td>${order.price}</td>
                        <td>DONE</td>
                    `;
      tr.innerHTML = trContent;
      document.querySelector("table tbody").appendChild(tr);
    });
    let dealsData = document.getElementById("total-deals");
    dealsData.innerText = data.length;
    let saleData = document.getElementById("total-sale");
    saleData.innerText = total;
    let incomeData = document.getElementById("income");
    incomeData.innerText = price;
  });

let logOut = document.getElementById("logout");
logOut.addEventListener("click", () => {
  window.location.href = "../index.html";
});

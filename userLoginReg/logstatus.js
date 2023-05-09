let loginstatus = JSON.parse(localStorage.getItem("logStatus"))
let username = localStorage.getItem("username")
let logDiv = document.getElementById("logdiv")
let registerDiv = document.getElementById("registerDiv")

registerDiv.innerText = "Register"
if (loginstatus == true) {
    logDiv.innerHTML = '<i class="fa-solid fa-user"></i> ' + username
    registerDiv.innerText = "Logout"
    registerDiv.setAttribute("href", "#")
    logDiv.setAttribute("href", "#")

} else {
    logDiv.innerText = "Login"

}

if (loginstatus == true) {
    registerDiv.addEventListener("click", function(e) {
        e.preventDefault()
        localStorage.removeItem("logStatus");

        registerDiv.innerText = "Register"

        localStorage.removeItem("username");
        logDiv.innerText = "Login"
        window.open((location.href = "../index.html"))

    })
}
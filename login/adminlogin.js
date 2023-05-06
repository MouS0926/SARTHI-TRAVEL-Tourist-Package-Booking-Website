let username = document.getElementById("user_name");
let password = document.getElementById("passwords");
let loginBtn = document.getElementById("login--btn");
let loginSucessfully = document.getElementById("login--sucessfully");
let clickHereMassageBtn = document.getElementById("Show-here");
let card = document.getElementById("Card");

loginBtn.addEventListener("click", () => {
    let userNameValue = username.value;
    let passwordValue = password.value;

    if (userNameValue == "" && passwordValue == "") {
        alert("Please enter your username and password");
    } else if (userNameValue == "") {
        alert("Please enter your username");
    } else if (passwordValue == "") {
        alert("Please enter your password");
    } else {
        login({
            username: userNameValue,
            password: passwordValue,
        });
    }
});

function login(obj) {
    console.log(obj);
    fetch("http://localhost:9971/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let found = false;
            data.forEach((e) => {
                if (e.name == obj.username && e.passward == obj.password) {
                    found = true;
                }
                console.log(e.name, e.passward);
            });
            if (found) {
                alert("Login successful");
                window.open((location.href = "../admin/adminDashboard.html"));
            } else {
                alert("Wrong username or password");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
let nameIn = document.getElementById("name")
let emailIn = document.getElementById("email")
let passIn = document.getElementById("password")
let regform = document.getElementById("regForm")




function register() {
    fetch(`https://sarthi-api.onrender.com/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                name: nameIn.value,
                email: emailIn.value,
                passward: passIn.value
            })
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}






regform.addEventListener("submit", function(e) {
    e.preventDefault()
    fetch(`https://sarthi-api.onrender.com/users`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            let found = false
            data.forEach((el) => {
                if (el.email == emailIn.value) {
                    found = true
                }
            })

            if (found) {
                alert("Email already exist")
            } else {
                register()
                alert("Registered Successfully")
                window.open((location.href = "login.html"));
            }
        })
})
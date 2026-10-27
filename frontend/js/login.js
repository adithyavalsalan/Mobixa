// Selected user role
let selectedRole = "customer";


// Role buttons
const roles = document.querySelectorAll(".role");

roles.forEach(role => {

    role.addEventListener("click", () => {

        // Remove active class
        roles.forEach(r => {
            r.classList.remove("active");
        });

        // Add active class
        role.classList.add("active");

        // Save role
        selectedRole = role.dataset.role;

        console.log("Selected role:", selectedRole);
    });

});


// Password show/hide

const password =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        password.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-regular fa-eye"></i>';

    }

});


// Login form

const loginForm =
    document.getElementById("loginForm");

const message =
    document.getElementById("message");


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const userPassword =
        document.getElementById("password").value;

    const remember =
        document.getElementById("remember").checked;


    if (!email || !userPassword) {

        message.style.color = "#ff5b6e";

        message.innerText =
            "Please enter email and password.";

        return;
    }


    try {

        message.style.color = "#b8c0d8";

        message.innerText = "Logging in...";


        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: userPassword,
                    role: selectedRole,
                    remember: remember
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            message.style.color = "#ff5b6e";

            message.innerText =
                data.message || "Login failed.";

            return;
        }


        message.style.color = "#00e6a8";

        message.innerText =
            "Login successful!";


        // Save login information
        if (remember) {

            localStorage.setItem(
                "mobixaUser",
                JSON.stringify(data.user)
            );

        } else {

            sessionStorage.setItem(
                "mobixaUser",
                JSON.stringify(data.user)
            );
        }


        // Redirect according to role

        setTimeout(() => {

            if (selectedRole === "admin") {

                window.location.href =
                    "admin-dashboard.html";

            } else if (selectedRole === "employee") {

                window.location.href =
                    "employee-dashboard.html";

            } else {

                window.location.href =
                    "home.html";
            }

        }, 800);

    }

    catch (error) {

        console.error(error);

        message.style.color = "#ff5b6e";

        message.innerText =
            "Server connection failed.";
    }

});


// Forgot password

document
    .getElementById("forgotPassword")
    .addEventListener("click", (event) => {

        event.preventDefault();

        alert(
            "Password recovery page will be added next."
        );

    });


// Google login demo

document
    .getElementById("googleLogin")
    .addEventListener("click", () => {

        alert(
            "Google login integration will be added later."
        );

    });


// Apple login demo

document
    .getElementById("appleLogin")
    .addEventListener("click", () => {

        alert(
            "Apple login integration will be added later."
        );

    });


// Sign up

document
    .getElementById("signupLink")
    .addEventListener("click", (event) => {

        event.preventDefault();

        window.location.href =
            "signup.html";

    });
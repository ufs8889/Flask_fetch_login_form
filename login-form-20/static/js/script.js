// Cache DOM elements
const passwordInput = document.getElementById("pwd");
const passwordInputre = document.getElementById("pwdre");
const passwordMessage = document.getElementById("passwordMessage");
const password_Error_Message = document.getElementById("Error_Message");
const Button_submit = document.getElementById("submit_button");
const Username_Button_submit = document.getElementById("username_submit_button");
const hashtag = document.getElementById("hashtag");
const username = document.getElementById("username");
const Username_message = document.getElementById("Username_message");
const user_creredentials = [];
// Function to validate the password
function validatePassword() {
  const password = passwordInput.value;

  // Define your password validation criteria
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const missingCriteria = [];

  if (password.length < minLength) {
    missingCriteria.push("At least 8 characters");
    passwordInputre.disabled = true;
  }
  if (!hasUpperCase) {
    missingCriteria.push("At least one uppercase letter");
    passwordInputre.disabled = true;
  }
  if (!hasLowerCase) {
    missingCriteria.push("At least one lowercase letter");
    passwordInputre.disabled = true;
  }
  if (!hasNumber) {
    missingCriteria.push("At least one number");
    passwordInputre.disabled = true;
  }

  if (missingCriteria.length === 0) {
    passwordMessage.innerHTML = "";
    passwordInputre.disabled = false;
    passwordInput.disabled = true;
  } else {
    passwordMessage.innerHTML = missingCriteria
      .map((item) => `<span style="color: red;">${item}</span>`)
      .join("<br>");
  }
}

// Attach the event listener to the input field
passwordInput.addEventListener("keyup", validatePassword);

// Function to check if passwords match
function checkPasswordsMatch() {
  const password = passwordInput.value;
  const password2 = passwordInputre.value;

  if (password === password2) {
    password_Error_Message.textContent = "Passwords match";
    password_Error_Message.style.color = "green";
    Button_submit.disabled = false;
    Button_submit.style.display = "block";
    Button_submit.style.backgroundColor = "#7f5feb";
  } else {
    password_Error_Message.textContent = "Passwords didn't match! ";
    password_Error_Message.style.color = "red";
    Button_submit.style.display = "none";
    Button_submit.disabled = true;
  }
}

passwordInputre.addEventListener("keyup", checkPasswordsMatch);
passwordInputre.addEventListener("input", checkPasswordsMatch);

// Function to check username
function checkUsername() {
  fetch("/process_data", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(username.value),
  })
    .then(function (a) {
      return a.json();
    })
    .then(function (json) {
      if (json[0] === true) {
        hashtag.textContent = "Password recovery";
        username.style.display = "none";
        Username_Button_submit.style.display = "none";
        Username_message.style.display = "none";
        passwordInput.style.display = "block";
        passwordInputre.style.display = "block";
        user_creredentials.push(json[1]);
      } else {
        Username_message.innerText = "Username not found !";
        Username_message.style.color = "red";
      }
    })
    .catch(function (error) {
      // Handle errors here
      console.error("Error: " + error);
    });
}

// Function to recover password
function recoverPassword() {
  user_creredentials.push(passwordInputre.value);
  fetch("/new_password", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_creredentials),
  })
    .then(function (a) {
      return a.json();
    })
    .then(function (json) {
      if (json === true) {
        user_creredentials.length = 0;
        hashtag.innerHTML =
          "Password successfully changed! <br> You will be redirected to the login page.";
        setTimeout(function () {
          window.location.href = "/"; // Replace with your desired URL
        }, 3000);
      }
    })
    .catch(function (error) {
      // Handle errors here
      console.error("Error: " + error);
    });
}

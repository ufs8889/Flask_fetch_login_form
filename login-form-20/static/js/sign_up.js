let user_credentials = []
let state = false;    
let password = document.getElementById("password");
let email = document.getElementById("email");
let phone_number = document.getElementById("number");
let passwordStrength = document.getElementById("password-strength");
let lowUpperCase = document.querySelector(".low-upper-case i");
let number = document.querySelector(".one-number i").style.display = "none";;
let exist_phone_number = document.getElementById("number_exist_message");
let specialChar = document.querySelector(".one-special-char i");
let eightChar = document.querySelector(".eight-character i");
let button = document.getElementById("button");
let username = document.getElementById('Username')
const username_result = document.getElementById("username_result");
const username_result2 = document.getElementById("username_result2");
let usernameTimer; // Initialize a timer variable for the username input

username.addEventListener('keyup', () => {
  clearTimeout(usernameTimer); // Clear the previous timer if it exists

  usernameTimer = setTimeout(() => {
    const inputValue = username.value.trim();

    if (inputValue === '') {
      // Continue waiting if the input is empty
    } else {
      // If not empty, check the length of the username
      if (inputValue.length > 20) {
        username.value = inputValue.slice(0, 20);
        username_result2.innerText = "No more than 20 characters!";
        phone_number.disabled = true; // Disable phone input
        email.disabled = true; // Disable email input
        password.disabled = true; // Disable password input
      } else {
        username_result2.innerText = "";
        // Check the existence of the username using fetch
        fetch("/exist_username", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputValue),
        })
          .then(function (a) {
            return a.json();
          })
          .then(function (json) {
            if (json === true) {
              username_result.innerText = "Username already exists!";
              phone_number.disabled = true; // Disable phone input
              email.disabled = true; // Disable email input
              password.disabled = true; // Disable password input
            } else {
              username_result.innerText = "";
              phone_number.disabled = false; // Enable phone input
              email.disabled = true; // Enable email input
              password.disabled = true; // Enable password input
            }
          })
          .catch(function (error) {
            // Handle errors here
            console.error("Error: " + error);
          });
      }
    }
  }, 2000);
});






function exist() {
    fetch("/exist_number", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phone_number.value),
    })
      .then(function (a) {
        return a.json();
      })
      .then(function (json) {
        if (json === true){
            document.getElementById("number_exist_message").innerHTML = "This number exist !";
            email.disabled = true;
        }else{
            //console.log("no");
            document.getElementById("number_exist_message").innerHTML = "";
      }})
      .catch(function (error) {
        // Handle errors here
        console.error("Error: " + error);
      });}
          

const validateNumber = (number) => {
return number.match(
/^\+998([- ])?(90|91|93|94|95|98|99|33|97|71)([- ])?(\d{3})([- ])?(\d{2})([- ])?(\d{2})$/gm);};

const validate = () => {
const $result = $('#result');
const number = $('#number').val();
$result.text('');

if(validateNumber(number)){
$result.text(number + ' is valid.');
$result.css('color', 'green');
username.disabled = true;
email.disabled = false;


} else{
$result.text(number + ' is invalid.');
$result.css('color', 'red');
email.disabled = true;
//number.disabled = true;
username.disabled = true;
password.disabled = true;
}
return false;
}
$('#number').on('input', validate);


const validateEmail = (email) => {
return email.match(
/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
};

const validate1 = () => {
const $result = $('#result_email');
const email = $('#email').val();
$result.text('');

if(validateEmail(email)){
$result.text(email + ' is valid.');
$result.css('color', 'green');
phone_number.disabled = true;
//email.disabled = false;
password.disabled = false;

} else{
$result.text(email + ' is invalid.');
$result.css('color', 'red');
password.disabled = true;
phone_number.disabled = true;
}
return false;
}
$('#email').on('input', validate1);


password.addEventListener("keyup", function(){
let pass = document.getElementById("password").value;
checkStrength(pass);
});


function toggle(){
if(state){
    document.getElementById("password").setAttribute("type","password");
    state = false;
}else{
    document.getElementById("password").setAttribute("type","text")
    state = true;
}
}

function myFunction(show){
show.classList.toggle("fa-eye-slash");
}

function checkStrength(password) {
let strength = 0;
email.disabled = true;
//If password contains both lower and uppercase characters
if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    strength += 1;
    lowUpperCase.classList.remove('fa-circle');
    lowUpperCase.classList.add('fa-check');
} else {
    lowUpperCase.classList.add('fa-circle');
    lowUpperCase.classList.remove('fa-check');
}
//If it has numbers and characters
if (password.match(/([0-9])/)) {
    strength += 1;
    number.classList.remove('fa-circle');
    number.classList.add('fa-check');
} else {
    number.classList.add('fa-circle');
    number.classList.remove('fa-check');
}
//If it has one special character
if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    strength += 1;
    specialChar.classList.remove('fa-circle');
    specialChar.classList.add('fa-check');
} else {
    specialChar.classList.add('fa-circle');
    specialChar.classList.remove('fa-check');
}
//If password is greater than 7
if (password.length > 7) {
    strength += 1;
    eightChar.classList.remove('fa-circle');
    eightChar.classList.add('fa-check');
} else {
    eightChar.classList.add('fa-circle');
    eightChar.classList.remove('fa-check');   
}

// If value is less than 2
if (strength < 2) {
    passwordStrength.classList.remove('progress-bar-warning');
    passwordStrength.classList.remove('progress-bar-success');
    passwordStrength.classList.add('progress-bar-danger');
    passwordStrength.style = 'width: 10%';
    //email.disabled = true;
    button.disabled = true;
} else if (strength == 3) {
    passwordStrength.classList.remove('progress-bar-success');
    passwordStrength.classList.remove('progress-bar-danger');
    passwordStrength.classList.add('progress-bar-warning');
    passwordStrength.style = 'width: 60%';
    //email.disabled = true;
    button.disabled = true;
} else if (strength == 4) {
    passwordStrength.classList.remove('progress-bar-warning');
    passwordStrength.classList.remove('progress-bar-danger');
    passwordStrength.classList.add('progress-bar-success');
    passwordStrength.style = 'width: 100%';
    //if (validateEmail(email.value) || (validateNumber(phone_number.value) || (username.value.length < 6))){
    button.disabled = false;
  }
}

function change(){
        user_credentials = [];
        user_credentials.push(username.value,phone_number.value,email.value,password.value)
        fetch('/user_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
	    },
        body: JSON.stringify({user_credentials: user_credentials})
        })
        user_credentials =[]
        window.location.href = "/";
}


let user_credentials = []    
let username = document.getElementById("Username");
let password = document.getElementById("password-field");
var checkedValue = document.getElementById('remember_option').checked
//console.log(checkedValue);

function change(){
 if (!!username.value || !!password.value){
  user_credentials = [];
  user_credentials.push(username.value,password.value,checkedValue)
	//console.log(user_credentials);  
  fetch("/user_data", {
   method: 'POST',
   headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
   },
   body: JSON.stringify({
    user_credentials: user_credentials
   })
})
   .then(function (a) {
       return a.json(); 
   })
   .then(function (json) {
      //console.log(json)
       if (json[0] === true){
        //const token = json[1];
        //localStorage.setItem("token", token);
        window.location.href = "https://devev.com/";
      }else{
        //console.log("out");
        document.getElementById("error_msg").innerText= json;
      }
    })
  }else{
    document.getElementById("error_msg").innerText= "Сredentials cannot be an empty!";
  }
}

function Is_Authorized(){
  const token = localStorage.getItem('token');
  //console.log(token);
  fetch("/url", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user_token: token,
          
      })
  })
      .then(function (a) {
      return a.json(); 
      })
      .then(function (json) {
          //console.log(json)
          if (json[0] === true){
          window.location.href = "https://devev.com/";
          }
  })  
}
var checkedValue = document.getElementById('remember_option').checked
console.log(checkedValue);
//fetch(url, {
//   method: 'POST',
//   headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//       email: login,
//       password: password,
//   })
//})
//   .then(function (a) {
//       return a.json(); // call the json method on the response to get JSON
//   })
//   .then(function (json) {
//       console.log(json)
//   })
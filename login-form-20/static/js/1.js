const token = localStorage.getItem('token');
console.log(token);
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
        console.log(json)
})
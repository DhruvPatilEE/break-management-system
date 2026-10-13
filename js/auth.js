function login(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;

const user = USERS[username];

if(!user){

alert("User not found");
return;

}

if(user.password !== password){

alert("Wrong password");
return;

}

localStorage.setItem(
"currentUser",
username
);

if(user.role==="admin"){

window.location.href=
"pages/manager.html";

}
else{

window.location.href=
"pages/user.html";

}

}

 
import * as coo from "./cookies.js";

let name = document.getElementById("name");
let password = document.getElementById("password");
let signup = document.getElementById("signup");


// const namePattern = /^[A-Za-z\s]+$/;
// const passwordPattern = /[1-9]{3,}$/;

signup.addEventListener("click", function () {
  let obj = {
    name: name.value,
    pass: password.value,
  };

  // if (!namePattern.test(obj.name)) {
  //   alert("Invalid name! Only alphabets and spaces are allowed.");
  //   return;
  // }

  // if (!passwordPattern.test(obj.pass)) {
  //   alert("Invalid password! It should contain at least 3 digit or More ");
  //   return;
  // }

  coo.setCookie(obj.name, obj, 5);
  window.location.replace(`login.html`);

});
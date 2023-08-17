// import { get } from "http";
import * as coo from "./cookies.js";

let name =document.getElementById("name")
let password =document.getElementById("password")
let login =document.getElementById("login")

login.addEventListener('click',function(){
    if (coo.hasCookie(name.value)) {
        let namecoo = coo.getCookie(name.value)
        if (namecoo.name==name.value && namecoo.pass==password.value) {
            // document.body.innerHTML+=
            // `
            // <h1>Welcome ${name.value}</h1><br/>
            // `
            // console.log("pass");
            window.location.replace(`/table?name=${namecoo.name}`);

        }
        else{
            console.log("faild");
            alert(`Invalid username or Password`)
        }
    }
    else{
        alert("user not found");
    }
    console.log(coo.hasCookie("rrr"));  
    // console.log(coo.hasCookie("ahmed"));  
})

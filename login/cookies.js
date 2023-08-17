export function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (JSON.stringify(value) || "")  + expires + "; path=/";
}
export function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        // console.log(cookie.split("=")[0]);
        if (cookie.split("=")[0].trim()==name) {
            return JSON.parse(cookie.split("=")[1])
            
        }
    }
    return null;
}
export function hasCookie(name) {
    var cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        
        if (cookie.split("=")[0].trim()==name) {
            return true
        }
    }
    return false;
}
export function deleteCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export function hasCookieKey (name ,key){
    var cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        if (cookie.split("=")[0].trim()==name) {
            if(JSON.parse(cookie.split("=")[1])[key]===undefined ) 
            {
                return false
            }
            else {
                return true
            }
        }
    }
    
}
export function editCookie(name ,key ,value,days){
    var cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        if (cookie.split("=")[0].trim()==name) {
            let obj =getCookie(name)
            obj[key]=value
            if(hasCookieKey(name ,key)){
                setCookie(name,obj,days)
            }
        }
    }

}
export function addCookieKey(name,key,value,days)
{
    var cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        if (cookie.split("=")[0].trim()==name) {
            let obj =getCookie(name)
            obj[key]=value
            if(hasCookieKey(name ,key)==false){
                setCookie(name,obj,days)
            }
        }
    }
}

// addCookieKey("ahmed","d","oo",5) 
// console.log(hasCookieKey("ahmed","name"));
// editCookie("ahmed","s",[5,7,9],5)     
// editCookie("ahmed","kk","9d99",5)    
// console.log(getCookie("ttyt") ); 
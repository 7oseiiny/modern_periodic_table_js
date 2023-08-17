import * as coo from "/login/cookies.js";

let elements =document.getElementsByClassName("element")
let searchInput = document.getElementById("searchInput");

for (const element of elements) {
   hover("add",element)
}
document.body.addEventListener("click",typee)
function typee(event){
    for (const element of elements) {



        if (event.target.textContent=="57-71"||event.target.textContent=="89-103") {
            
        }
        else if (event.target.parentElement.classList.contains("elementhover")&&event.target.parentElement.classList.contains("element")) { 
       
            try{
                if (event.target.parentElement.children[1].textContent==element.children[1].textContent) { 
                    show_element_details(element)
                }
                else{
                    hide_element_details(element) 
                }
            }catch{}
        }
        else if((event.target.id=="")||(event.target.classList.contains("elementhover")==false&&event.target.classList.contains("element"))){ 
            element.classList.remove("opacity")
            element.classList.remove("shadow")
            hover("add",element)
            hide_element_details(element)

        }
        else if (element.classList.contains(event.target.id)) {
            element.classList.remove("opacity")
            element.classList.add("shadow")
            hover("add",element)
            hide_element_details(element)

        }
        else{
            element.classList.remove("shadow")
            element.classList.add("opacity")
            hover("remove",element)
            hide_element_details(element)

        }
    }
}
 /// search

searchInput.addEventListener("input", function (event) {
    const searchValue = event.target.value.toLowerCase();
  
    for (const element of elements) {
      var symbolElement = element.getElementsByClassName("symbole")[0];
      var nameElement = element.getElementsByClassName("namee")[0];
      var atomicNumberElement = element.getElementsByClassName("numbere")[0];
      var atomicMassElement = element.getElementsByClassName("masse")[0];
  
      var symbol = "";
      var name = "";
      var atomicNumber = "";
      var atomicMass = "";
  
      if (symbolElement) {
        symbol = symbolElement.textContent.toLowerCase().trim();
      }
      if (nameElement) {
        name = nameElement.textContent.toLowerCase().trim();
      }
      if (atomicNumberElement) {
        atomicNumber = atomicNumberElement.textContent.toLowerCase().trim();
      }
      if (atomicMassElement) {
        atomicMass = atomicMassElement.textContent.toLowerCase().trim();
      }
  
      if (
        symbol.includes(searchValue) ||
        name.includes(searchValue) ||
        atomicNumber.includes(searchValue) ||
        atomicMass.includes(searchValue)
      ) {
        element.classList.remove("opacity");
        element.classList.add("shadow");
        hover("add", element);
        hide_element_details(element);
      } else {
        element.classList.remove("shadow");
        element.classList.add("opacity");
        hover("remove", element);
        hide_element_details(element);
      }
    }
  });


















 
// ========================Json========================


var xhr=new XMLHttpRequest();
xhr.open("GET","data.json")

xhr.send()
let res
xhr.addEventListener("readystatechange",function(){

    if(xhr.readyState==4){
        
        res=[...JSON.parse(xhr.response)]
        console.log(res);

        let i =0
        let namecoo=coo.getCookie(location.search.split("?")[1].split("=")[1])

        for (const obj of res) {
            
           for (const element of elements) {
            
                    if(element.textContent==obj.symbol)
                    {
                        element.innerHTML=
                        `
                        <div class="check">
                            <div class="numbere">${obj.atomicNumber}</div>
                            <div id="done" class="done"></div>
                        </div>
                        <div class="symbole">${obj.symbol}</div>
                        <div class="namee">${obj.name}</div>
                        <div class="masse">${obj.atomicMass}</div>
                        `
                        let done =document.getElementById("done")
                       try{
                        if(
                            
                            namecoo.donesymbols.includes(obj.atomicNumber.toString())
                           ) 
                           {
                               element.children[0].children[1].innerHTML="✅" 
                               console.log(obj.atomicNumber);
                           }
                       }
                       catch{}
                        
                    }
           } 
            i++
            
        }

        

    }
})



// ========================functions========================

function hover(v , element) {
    if (v=="add") {
        element.addEventListener("mouseover", function() {
            element.classList.add("elementhover")
            if (element.classList.contains("elementhovermax")) {
                element.style.zIndex="3"
            }
            else{
                element.style.zIndex="2"
            }

        }); 
        element.addEventListener("mouseout", function() {
            element.classList.remove("elementhover")
            if (element.classList.contains("elementhovermax")) {
                element.style.zIndex="3"
            }
            else{
                element.style.zIndex="1"
            }

        });
    }
    else if (v=="remove") {
        element.addEventListener("mouseover", function() {
            element.classList.remove("elementhover")
        });
    }
    
}



function show_element_details(element) {
    let atomicNumber =element.children[0].children[0].textContent
    console.log(atomicNumber);

    element.style.zIndex="3"
    let name =window.location.search.split("?")[1].split("=")[1]

    window.open("information.html?atomicNumber="+atomicNumber.trim()+"&name="+name, "_blank");
  
 
}
function hide_element_details(element) {
    element.classList.remove("elementhovermax")
    element.style.zIndex="1" 
    
    
}
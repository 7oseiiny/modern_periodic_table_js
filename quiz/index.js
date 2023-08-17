import * as coo from "/login/cookies.js";

 // select elements 

 let bulletsSpanContainer = document.querySelector(".bullets .spans");
 let quizarea=document.querySelector(".quiz-area")
let answerArea=document.querySelector(".ansewrs-area")
let submitButton=document.querySelector(".submit-button")
let bulletCounter=document.querySelector(".bullets")
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

//set options 
let currentIndex=0;
 let rightAnswers=0;
 let countdownInterval;

 // AJAX CALL 
 function getquestion(){

    let myReqyest=new XMLHttpRequest();

    myReqyest.onreadystatechange=function(){
if(this.readyState===4 && this.status===200){
// convert 
    let questionobject=JSON.parse(this.responseText)
   
    
    // create bullets
   let questioncount=questionobject.length;
createBullets(questioncount)

// create ques & answer 
 addQuesAnswer(questionobject[currentIndex] ,questioncount)

  // Start CountDown >> for first question 
  countdown(60, questioncount);


// submit or next function 
// get right answer 
submitButton.onclick=function(){
    let rightAnswer=questionobject[currentIndex].correct_answer;

    // increase currentIndex
    currentIndex++; 
    
    // compare between user answer and right answer
    
    chechAnswer(rightAnswer,questioncount)

// remove previous question 

quizarea.innerHTML="";
// remove previous question 
answerArea.innerHTML="";
 
// add new question & answers 
addQuesAnswer(questionobject[currentIndex] ,questioncount)

// handle circles in footer 
handleBullets();

 // Start CountDown
  clearInterval(countdownInterval); // restart count down 
  countdown(60, questioncount); // for question except  first question 


//show result 
showResult(questioncount );

};




} };

  myReqyest.open("GET","index.json",true)
  myReqyest.send()


 }

 getquestion()


 //////////////////////////////////////////

 // create bullets 
function createBullets(num){
for(let i=0 ; i<num ; i++){

    //create bullet >>span 
    let bullet=document.createElement("span");
    if(i===0){
        bullet.className="check"
    }
    // Append bullet 
    bulletsSpanContainer.appendChild(bullet);

}
}
/////////////////////////////////////////////
// create ques & answer 
 function addQuesAnswer(obj , count){
    if (currentIndex < count){
//create question 
// create h2 
let questitle=document.createElement("h3")
//create question text 
let questext=document.createTextNode(obj["question"]);
// append text to h2
questitle.appendChild(questext)
// append h2 to quiz-area
quizarea.appendChild(questitle)

//create answers
for(let i=1 ;i<=4; i++){
 //create main div
let maindiv=document.createElement("div");
maindiv.className="answer";
// create radio input

let radioInput=document.createElement("input")

// add name , type , id , data-attribute to input
radioInput.type="radio";
radioInput.name="question"
radioInput.id=`answer_${i}`;
radioInput.dataset.answer=obj[`answer_${i}`]

// make first option checked
if(i===1){

    radioInput.checked=true;  
}


// create label
let label=document.createElement("label")
label.htmlFor=`answer_${i}`;
//  create answer text 
let answerText=document.createTextNode(obj[`answer_${i}`])
 // append anser text to label 
 label.appendChild(answerText)
 // append label & input to main div 

 maindiv.appendChild(radioInput);
 maindiv.appendChild(label);

 // append main div to answer area
 answerArea.appendChild(maindiv) ;
}

 }
}


//////////////////////////////////////////

//compare between user answer and right answer  >> function on next button
 function chechAnswer(rightAns,counter){

    // get the user answer 
    // select answers 
    let answers=document.getElementsByName("question")
    let ChoosenAnswer;

// know which answer user choose it 
for( let i=0 ; i<answers.length ; i++){

    if(answers[i].checked){
        ChoosenAnswer = answers[i].dataset.answer;

    }

}
 // compare 
 if(rightAns == ChoosenAnswer ){
    rightAnswers++;


 }
 
 }
 
 ///////////////////////////////////////////

// handle circles in footer 
 function handleBullets(){
let bulletsSpans= document.querySelectorAll(".bullets .spans span");
let arrayOfSpans=Array.from(bulletsSpans);
// console.log(arrayOfSpans);

arrayOfSpans.forEach ((span , index) =>{
    if (currentIndex===index ){
        span.className="check";
    }
});
}

//////////////////////////////////////////

//show result 
 function showResult(counter){
    let resultt;
    if (currentIndex === counter){
        quizarea.remove();
        answerArea.remove();
        submitButton.remove();
        bulletCounter.remove();

        if (rightAnswers ===4 ) {
          resultt = `<span class="good">Good</span> ...${rightAnswers} From ${counter}`;
          } else if (rightAnswers === 5) {
            resultt= `<span class="perfect">Perfect</span> ...  ${rightAnswers} From ${counter}`;
          } else {
            resultt= `<span class="bad">Bad</span> ...  ${rightAnswers} From ${counter}`;
          }
          resultsContainer.innerHTML = resultt;
          resultsContainer.style.padding = "10px";
          resultsContainer.style.backgroundColor = "white";
          resultsContainer.style.marginTop = "10px";
          let atomicNumber =window.location.search.split("?")[1].split("&")[0].split("=")[1]
          let name =window.location.search.split("?")[1].split("&")[1].split("=")[1]

          resultsContainer.parentElement.parentElement.innerHTML+=`<button id="table"><a href="../table/?name=${location.search.split("?")[1].split("&")[1].split("=")[1]}" id="signup-link">back to table</a></button>          `
 
          coo.addCookieKey(name,"donesymbols",[],5) 
          let old_donesymbols =coo.getCookie(name).donesymbols
          console.log(old_donesymbols);
          let pushed =old_donesymbols.concat(atomicNumber)
          console.log (pushed)
          coo.editCookie(name,"donesymbols",pushed,5)      
      // console.log(coo.getCookie("ahmed"));
    }

 }

 ////////////////////////////////////////////////
 // count down 

 function countdown(duration, count) {
    if ( currentIndex < count) {
      let minutes, seconds;
      countdownInterval = setInterval(function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
  
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
  
        countdownElement.innerHTML = `${minutes}:${seconds}`;
  
        if (--duration < 0) {
          clearInterval(countdownInterval);
          submitButton.click();
        }
      }, 1000);
    }
  }

  //////////////////////////////////////////////

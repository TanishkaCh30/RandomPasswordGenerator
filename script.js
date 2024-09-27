const passwordDisplay      = document.querySelector(".password");
const pswrdLengthDisplay = document.querySelector(".length");
const pswrdSlider        = document.querySelector(".slider");
const indicator        = document.querySelector(".circle");
const upperCaseChecked = document.querySelector("#uppercase");
const lowerCaseChecked = document.querySelector("#lowercase");
const numbersChecked   = document.querySelector("#numbers");
const symbolsChecked   = document.querySelector("#symbols");
const copied           = document.querySelector(".alt-text");
const copyButton = document.querySelector(".copy");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const generatePasswordBtn = document.querySelector(".btn-1");

let arr = '!@#$%^&*(/.,):{|\}';

let checkCount = 0;
let password    = " ";
let pswrdLength = 10;
handleSlider();
setIndicator("#ccc");

 
function handleSlider(){
    pswrdSlider.value = pswrdLength;
    pswrdLengthDisplay.innerText = pswrdLength;
    const min = pswrdSlider.min;
    const max = pswrdSlider.max;
    const percentage = ((pswrdLength-min) / (max-min)) * 100;
    pswrdSlider.style.background = `linear-gradient(to right, var(--vb-violet) ${percentage}%, var(--lt-violet) ${percentage}%)`;
  }
    
function setIndicator(color){
    indicator.style.background = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`

}

 
function generateRandInteger(min,max){
    return   Math.floor(Math.random()*(max-min))+min;
}


function generateUpperCase(){
     return String.fromCharCode(generateRandInteger(65,90));

}

function generateLowerCase(){
    return String.fromCharCode(generateRandInteger(97,122));
}

function generateRandomNumber(){
    return generateRandInteger(0,9);
}


function generateSymbols(){
    let randNum = generateRandInteger(0,arr.length);
    return arr.charAt(randNum);
}


function calcStrength(){
    let upperCase = false;
    let lowerCase = false;
    let numbers = false;
    let symbols = false;

    if(upperCaseChecked.checked) upperCase = true;
    if(lowerCaseChecked.checked) lowerCase = true;
    if(numbersChecked.checked) numbers = true;
    if(symbolsChecked.checked) symbols = true;


    if(upperCase && lowerCase && (numbers || symbols) && pswrdLength>=8){
        setIndicator("#0f0");
    }

    else if((uppercase||lowerCase) && (numbers || symbols) && pswrdLength>=6){
        setIndicator("#0ff0");
    }

    else{
        setIndicator("#f00");
    }
}
 async function copyContent(){
    try{
         await navigator.clipboard.writeText(passwordDisplay.value);
          copied.innerText = "Copied";
 
    }
    catch(e){
         copied.innerText = "Failed";
    }

       copied.classList.add("active");
       setTimeout(() =>{
         copied.classList.remove("active");
       },2000);
     
 }

 copyButton.addEventListener("click" , () =>{
    if(passwordDisplay.value){
        copyContent();
    }
 });

 pswrdSlider.addEventListener("input" ,(e) => {
    pswrdLength = e.target.value;
    handleSlider();
 });



  function handleCheckBox(){
    checkCount = 0 ; 
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }

        if(pswrdLength < checkCount){
            pswrdLength = checkCount;
            handleSlider();
        }
  });
}

 allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener("change" , handleCheckBox);
 });


 generatePasswordBtn.addEventListener("click" , () =>{


    if(checkCount==0) return;

    if(pswrdLength<checkCount){
        pswrdLength=checkCount;
        handleSlider();
    }

    if(password){
        password = "";
    }

    let funcArr = [];

    if(upperCaseChecked.checked) {
       funcArr.push(generateUpperCase);
    }

    if(lowerCaseChecked.checked){
     funcArr.push(generateLowerCase);
    }
    
    if(symbolsChecked.checked){
        funcArr.push(generateSymbols);

    }

    if(numbersChecked.checked){
        funcArr.push(generateRandomNumber);
    }


    for(let i = 0 ; i<funcArr.length ; i++){
        password+=funcArr[i]();
    }

    for(let i = 0 ; i<pswrdLength-funcArr.length ; i++ ){
        let randInteger = generateRandInteger(0 , funcArr.length);
        password += funcArr[randInteger]();
    }

    password = shuffleArray(Array.from(password));
    passwordDisplay.value = password;
  calcStrength();
 });

 function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }





 





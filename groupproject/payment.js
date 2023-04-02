
let dataArr = []
function localData(e){
    e.preventDefault();
    let randomid = function(length = 5){
        return Math.floor(Math.random() * 1000)
    }
    let phoneNum =  Math.floor(100000000 + Math.random() * 900000000);
    console.log(randomid());
    let obj={
        id: randomid(),
        name : document.getElementById('name').value,
        email: document.querySelector('#email').value,
        phone: phoneNum,
        address : document.querySelector('#address').value,
        city : document.querySelector('#city').value,
        state: document.querySelector('#state').value,
        zip: document.querySelector('#code').value,
        cardName: document.querySelector('#cardname').value,
        cardNumber : document.querySelector('#cardno').value,
        expMonth : document.querySelector('#exp').value,
        expYear : document.querySelector('#expyear').value,
        cvv : document.querySelector('#cvv').value
    };
    userData.push(obj)
    localStorage.setItem("Data-user", JSON.stringify(userData));
}


let submitBtn = document.getElementById('paymentSubmit');
submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); 
    openPopup(event);
    // alert("Order successfully placed"); 
    localData(event); 
   
});


let userData = JSON.parse(localStorage.getItem("Data-user")) || [];

// let obj = {
//      name: userData.nameInput,
//      email: userData.emailInput,
//      address: userData.addressInput,
//      city: userData.cityInput,
//      state: userData.stateInput,
//      code: userData.zipInput,
//      cardName: userData.cardNameInput,
//      cardNumber: userData.cardNumberInput,
//      expMonth: userData.expMonthInput,
//      expYear: userData.expYearInput,
//      cvv: userData.cvvInput
// }



function openPopup(event) {
    // event.preventDefault();
  let popup = document.querySelector('.popup');
  popup.classList.add('open-popup');
}

function closePopup(event) {
    // event.preventDefault();
  let popup = document.querySelector('.popup');
  popup.classList.remove('open-popup');
}
function submitted() {
    // alert("Payment Successfull");
}

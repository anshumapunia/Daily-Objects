let list = document.querySelectorAll(".navigation li");
let userAuth = localStorage.getItem("auth") || null;
let login = "adminLogin.html"
window.addEventListener("load", ()=>{
    if(userAuth == null){
        window.location = login
    }
})

function activeLink(){
    list.forEach(item=>{
        item.classList.remove("hovered")
    })
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover",activeLink))



// Menu toggling Part


let toggle = document.querySelector(".toggle")
let navigation = document.querySelector(".navigation")
let main = document.querySelector(".main")
let cardBox = document.querySelector(".cardBox")
let details = document.querySelector(".details")


toggle.onclick = function(){
    navigation.classList.toggle("active");
    main.classList.toggle("active")
};

// NAVIGATION BAR

let ul = document.querySelectorAll(".navigation li")
let hovered = document.getElementsByClassName("hovered")
let signOut = document.querySelector(".signOut")
let Customer = document.querySelector(".customers")

ul.forEach((item)=>item.addEventListener("mouseover",display))

function display(){
    
    // console.log(this.innerText);
    if(this.innerText=="Dashboard"){
        cardBox.style.display = "grid"
        details.style.display = "grid"
    }
    if(this.innerText=="Customers"){
        cardBox.style.display = "none"
        details.style.display = "none"
    }
    if(this.innerText=="Sign Out"){
        cardBox.style.display = "none"
        details.style.display = "none"
        Customer.style.display = "none"
        signOut.style.display = "block"
        // console.log(signOut);
    }
}


// ============= Customer Page =============

let DData = JSON.parse(localStorage.getItem("paid"));
if(DData === null){
    DData = [];
}



let tbodyEl = document.querySelector("tbody");
display(DData);
function rederCustomer(data){
    tbodyEl.innerHTML = null;
    data.forEach((element,index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        td1.innerText = element.name;
        td2.innerText = element.phone;
        td3.innerText = element.email;
        td4.innerText = element.id;        
        // td5.addEventListener("click",() =>{
        //     DData.push(element);
        //     localStorage.setItem("fav-menu",JSON.stringify(DData));
        // });
        tr.append(td1,td2,td3,td4);
        tbodyEl.append(tr);
    });
}



// ============= Sign Out Page =============

let sgOutBtn = document.getElementById("signOut");

sgOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("auth")
    window.location = login
})
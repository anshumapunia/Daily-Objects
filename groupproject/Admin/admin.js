let apiUrl = `https://63c9b142320a0c4c954daee6.mockapi.io/product`;


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
let orders = document.querySelector(".allOrders")
let manageProducts =document.querySelector(".manageProducts")
let addP = document.getElementById("add");
let editP = document.getElementById("edit");
let allP = document.getElementById("listP")

ul.forEach((item)=>item.addEventListener("mouseover",display))

let DData = JSON.parse(localStorage.getItem("Data-user"));
if(DData === null){
    DData = [];
}



let tbodyEl = document.querySelector(".customers tbody");

function display(){
    
    // console.log(this.innerText);
    if(this.innerText=="Dashboard" || this.innerText==null){
        cardBox.style.display = "grid"
        details.style.display = "grid"
        Customer.style.display = "none"
        manageProducts.style.display = "none"
        signOut.style.display = "none"
        orders.style.display = "none"
        addP.style.display = "none"
        editP.style.display = "none"
        pagination.style.display = "none"
        allP.style.display="none"
    }
    if(this.innerText=="Customers"){
        cardBox.style.display = "none"
        details.style.display = "none"
        Customer.style.display = "grid"
        signOut.style.display = "none"
        manageProducts.style.display = "none"
        addP.style.display = "none"
        orders.style.display = "none"
        editP.style.display = "none"
        pagination.style.display = "none"
        allP.style.display="none"
        rederCustomer(DData);

    }
    if(this.innerText=="Sign Out"){
        cardBox.style.display = "none"
        details.style.display = "none"
        Customer.style.display = "none"
        manageProducts.style.display = "none"
        signOut.style.display = "block"
        addP.style.display = "none"
        orders.style.display = "none"
        editP.style.display = "none"
        pagination.style.display = "none"
        allP.style.display="none"
        // console.log(signOut);
    }
    if(this.innerText=="Orders"){
        cardBox.style.display = "none"
        details.style.display = "none"
        Customer.style.display = "none"
        signOut.style.display = "none"
        manageProducts.style.display = "none"
        addP.style.display = "none"
        orders.style.display = "grid"
        editP.style.display = "none"
        pagination.style.display = "none"
        allP.style.display="none"
    }
    if(this.innerText=="Manage Products"){
        manageProducts.style.display = "grid"
        cardBox.style.display = "none"
        details.style.display = "none"
        Customer.style.display = "none"
        signOut.style.display = "none"
        orders.style.display = "none"
        addP.style.display = "block"
        editP.style.display = "block"
        pagination.style.display = "block"
        allP.style.display="block"
    }
   
}



// ============= Customer Page =============
function rederCustomer(data){
    tbodyEl.innerHTML = null;
    // console.log(data);

    data.forEach((element,index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5= document.createElement("td");
        td1.innerText = element.name;
        td2.innerText = element.phone
        td3.innerText = element.email;
        td4.innerText = element.id  
        td5.innerText = element.state       
        // td5.addEventListener("click",() =>{
        //     DData.push(element);
        //     localStorage.setItem("fav-menu",JSON.stringify(DData));
        // });
        tr.append(td4,td1,td2,td3,td5);
        tbodyEl.append(tr);
    });
}


// <!-- ================ Manage Procucts Section ================ -->
manageProducts.addEventListener("click",(e)=>{
    console.log(e.target.innerText);

})


async function addProduct() {
    try {
         let data = {
            image: document.getElementById("image").value,
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            price: document.getElementById("price").value,
            discription: document.getElementById("description").value,
         };
    //  console.log(data); we are getting;
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        let d = await response.json();
        console.log(d);
        swal("Succesfully Added!", "", "success");
    }
    catch (e) {
        console.log(e);
    }
}

async function updateData() {
    try {
        let replace = {
            image: document.getElementById("eimage").value,
            name: document.getElementById("ename").value,
            category: document.getElementById("ecategory").value,
            price: document.getElementById("eprice").value,
            discription: document.getElementById("edescription").value,
        }
        // console.log(update_data);
        let id = document.getElementById("update-id").value;

        let response = await fetch(`https://63c9b142320a0c4c954daee6.mockapi.io/product/${id}`, {
            method: "PUT",
            body: JSON.stringify(replace),
            headers: {
                "Content-Type": "application/json",
            }
        })
        let d = await response.json();
        console.log(d);
    }
    catch (e) {
        console.log(e);
    }
}







// / <!-- ================ Procucts List Section ================ -->
let appending = document.getElementById("pdata");
let pagination = document.getElementById("pagination");

//appending the data to dom.
//1. GET

async function renderTable(pageNumber) {
    try {
        let response = await fetch(`${apiUrl}?limit=10&page=${pageNumber}`);
        let totalPosts = response.headers.get("X-Total-Count");
        let totalButton = Math.ceil(22 / 10)
        // console.log(response);
        // console.log(totalPosts);
        pagination.innerHTML = null
        appending.innerHTML = null;
        for (let i = 1; i <= totalButton; i++){
           
            pagination.append(domButton(i));
        }
        let data = await response.json();
        fetchitems = data.map(function (data) {
            return{
              img: data.image,
                name: data.name,
                category: data.category,
                price: data.price,
                id: data.id,
                discription: data.discription
            };
        });
     
        // console.log(data);
        data.forEach((e) => {
            let tr = document.createElement("tr");
            let title = document.createElement("td");
            let price = document.createElement("td");
            let des = document.createElement("td");
            let id = document.createElement("td");
            let button = document.createElement("button");
            button.innerText = "Delete"
            let quantity = Math.floor(Math.random() * 10)
            button.addEventListener("click", () => {
                // console.log(e.id)
                deleteProduct(e.id);
            })
            id.innerText = e.id
            title.innerText = e.name
            price.innerText = e.price;
            des.innerText = quantity;
            tr.append(id,title, price, des, button);
            // console.log(tr) 
            appending.append(tr);
        })
    }
    catch (e) {
        console.log(e)
    }
}
function domButton(i) {
    let button = document.createElement("button");
    button.setAttribute("data-id", i);
    button.innerText = i;
    button.addEventListener("click", (e) => {
        // console.log(e);
        // console.log(e.target.dataset.id);
        renderTable(e.target.dataset.id);
    })
    return button;
}

renderTable(1)
async function deleteProduct(id) {
    try {
        let response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        let d = await response.json();
        console.log(d);
    }
    catch (e) {
        console.log(e);
    }
}

let searchForm = document.getElementById("search")
let fetchitems = [];


searchForm.addEventListener("keyup", (e) =>{
    e.preventDefault();
    let searchParams = e.target.value
    if(e.keycode === 13){
    //   console.log(e.target.value);
      let filtered = fetchitems.filter((Products) =>{
        if(Products.id.toUpperCase().includes(e.target.value.toUpperCase())=== true){
            return true;
        }
        else{
            return false;
        }
    });
    displayProduct(filtered);
    }
    else if(e.keycode === null){
        displayProduct()
    }
   
});
// ============= Sign Out Page =============

let sgOutBtn = document.getElementById("signOut");

sgOutBtn.addEventListener("click",()=>{
    localStorage.removeItem("auth")
    window.location = login
})
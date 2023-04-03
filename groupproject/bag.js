let cart = JSON.parse(localStorage.getItem("cart"))||[]
 console.log(cart)

let container= document.getElementById("cart-container")

 function displayData(){
   container.innerHTML=""

  cart.forEach((element) => {
    

    let Card = document.createElement("div");
 let Image = document.createElement("img");
 let name = document.createElement("h3");
 let catagory=document.createElement("h1")
 let Price = document.createElement("h5");
 let Detail = document.createElement("p");
    let increase= document.createElement("button")
     let dicrease= document.createElement("button")
     let quantity= document.createElement("span")
    let remove= document.createElement("button")
     Image.src = element.image;
 name.innerText = element.name;
catagory.innerText=element.catagory;

 Price.innerText = `₹${element.price}`;
 Detail.innerText = element.discription;
     quantity.innerText=element.quantity;
     remove.innerText="Remove"
     increase.innerText="+"
     dicrease.innerText="-"

     remove.addEventListener("click", ()=>{
      cart=cart.filter((ele)=>{
         return ele.id!==element.id
       })
 localStorage.setItem("cart", JSON.stringify(cart))
 displayData()
     
     })
     increase.addEventListener("click", ()=>{
        element=element.quantity++
       localStorage.setItem("cart", JSON.stringify(cart))
       displayData()
     
     })
     dicrease.addEventListener("click", ()=>{
        element=element.quantity--
       localStorage.setItem("cart", JSON.stringify(cart))
       displayData()
   
     })
     let sum=0 
     for (let i=0;i<cart.length;i++){
       sum+=cart[i].price*cart[i].quantity
      
     }
     document.getElementById("cart-total").innerText=sum

    

     Card.append(Image, name, Price, Detail,increase, quantity, dicrease, remove)
 container.append(Card)
    
   });


   console.log("display",data)

 }

 displayData()
// cartArr =JSON.parse(localStorage.getItem("cart")) || []
// console.log(cartArr)

// function displayData(data){
//     product.innerHTML=""
//     data.forEach((element) => {
//       let card =document.createElement("div")
      
//       let image =document.createElement("img")
//       image.src =element.image
//       let name =document.createElement("h3")
//       name.innerText=element.name

//       let category=document.createElement("h1")
//       category.innerText=element.category


//       let des =document.createElement("p")
//       des.innerText=element.discription

//       let price =document.createElement("h5")
//       price.innerText =`₹ ${Number(element.price)}` 

//       let button =document.createElement("button")
//       button.innerText="BUY"
//       button.addEventListener("click",()=>{
//         cartArr.push({...element,quantity:1})
//         localStorage.setItem("cart",JSON.stringify(cartArr))
//         //document.getElementById("alert").innerText="Successfully Added to Cart"

//       })

      
//       card.append(image,name,des,price,button)
//       product.append(card)
//     });
//   }
// displayData()
let product =document.getElementById("products")
h1=document.createElement("h1")

let fD = []
const url = `https://63c9b142320a0c4c954daee6.mockapi.io/product`;


fetchData()
async function fetchData(){
  try {
    let res = await fetch(url)
    res = await res.json();
    console.log(res) 
     
    displayData(res)
  } catch (error) {
    console.log(error)
  }
}
cartArr =JSON.parse(localStorage.getItem("cart")) || []

function displayData(data){
    product.innerHTML=""
    data.forEach((element) => {
      let card =document.createElement("div")
      
      let image =document.createElement("img")
      image.src =element.image
      let name =document.createElement("h3")
      name.innerText=element.name

      let category=document.createElement("h1")
      category.innerText=element.category


      let des =document.createElement("p")
      des.innerText=element.discription

      let price =document.createElement("h5")
      price.innerText =`₹ ${Number(element.price)}` 

      let button =document.createElement("button")
      button.innerText="BUY"
      button.addEventListener("click",()=>{
        cartArr.push({...element,quantity:1})
        localStorage.setItem("cart",JSON.stringify(cartArr))
        //document.getElementById("alert").innerText="Successfully Added to Cart"

      })

      
      card.append(image,name,des,price,button)
      product.append(card)
    });
  }

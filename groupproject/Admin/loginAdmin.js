let baseServerURL = `https://reqres.in/api`
let userAuth = localStorage.getItem("auth") || null;
let submit = document.getElementById("submit");
// let name = document.getElementById("name");
let email =  document.getElementById("email");
let password =  document.getElementById("password");

submit.addEventListener("click",(e)=>{
    e.preventDefault()
    login()
})
let dashboard = "admin.html"
async function login(){
    try {
        if(email.value == "" || password.value==""){
            alert("Enter Correct Credentials")
        }else{
            let obj={
                email: email.value,
                password: password.value
              };
            //   console.log(obj)
              let response = await fetch(`${baseServerURL}/login`,{
                method:"POST",
                headers:{
                  "Content-Type": "application/json"
                },
                body:JSON.stringify(obj)
              })
              let data = await response.json()
              console.log(data);
              localStorage.setItem("auth",JSON.stringify(data.token)); 
              redirect()
            //   console.log(userAuth);
        }        
    } catch (e) {
        console.log(e);
    }
}

function redirect(){
    console.log("redirect")
    console.log(userAuth);
    if(userAuth!=null){
        window.location = dashboard
    }
}


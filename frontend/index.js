// form data 


let ar = document.querySelector(".fa-angle-right");
ar.addEventListener("click",()=>{

    if(document.querySelector(".box").style.display !="flex"){
        document.querySelector(".box").style.display="flex"
        ar.setAttribute("class","fa fa-angle-down");
    ar.style.color="red";
    document.querySelector(".box").style.paddingTop="0px"


    }else{
    document.querySelector(".box").style.display="none"
    ar.setAttribute("class","fa fa-angle-right");
    ar.style.color="black";
    }
});


// popup show and hide 
let show = document.querySelector("#show");

let addDriver = document.querySelector("#adddrv");
addDriver.addEventListener("click",()=>{
  show.style.display="block";

})
    
// Add driver code [POST method]
const form = document.querySelector('form');
let api = "http://localhost:8080"

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let location = document.querySelector("#location").value;
  let driverName = document.querySelector("#driverName").value;
  let mobileNumber = document.querySelector("#mobileNumber").value;
  let licenceNumber = document.querySelector("#licenceNumber").value;
  let aadharNumber = document.querySelector("#aadharNumber").value;
  let driverPhoto = document.querySelector("#driverPhoto").value;

  const formData = {
    location,
    driverName,
    mobileNumber,
    licenceNumber,
    aadharNumber,
    driverPhoto
  }

  document.querySelector("#loader").style.display="flex";
  try {
    const response = await fetch(`${api}/drivers/`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  document.querySelector("#loader").style.display="none";
  window.location.reload();
});


document.querySelector(".close").addEventListener("click",()=>{
  show.style.display="none";
})



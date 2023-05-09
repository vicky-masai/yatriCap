// form data 



// ar.addEventListener("click",()=>{

  // function right() {
  
  // }

   
// });


// popup show and hide 
let show = document.querySelector("#show");

let addDriver = document.querySelector("#adddrv");
addDriver.addEventListener("click",()=>{
  let location = document.querySelector("#location").value;
  let driverName = document.querySelector("#driverName").value=null;
  let mobileNumber = document.querySelector("#mobileNumber").value=null;
  let licenceNumber = document.querySelector("#licenceNumber").value=null;
  let aadharNumber = document.querySelector("#aadharNumber").value=null;
  let driverPhoto = document.querySelector("#driverPhoto").value=null;
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
  let location = document.querySelector("#location").value;
  let driverName = document.querySelector("#driverName").value=null;
  let mobileNumber = document.querySelector("#mobileNumber").value=null;
  let licenceNumber = document.querySelector("#licenceNumber").value=null;
  let aadharNumber = document.querySelector("#aadharNumber").value=null;
  let driverPhoto = document.querySelector("#driverPhoto").value=null;
  show.style.display="none";
})



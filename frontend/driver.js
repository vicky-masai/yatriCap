let main = document.querySelector("#data_js");

const Api = async () => {
  let res = await fetch("http://localhost:8080/drivers");
  let data = await res.json();
  render(data);
  filter(data)
};

function render(data) {
  main.innerHTML=""
  data.forEach((el) => {
    //         aadharNumber: "1234 5678 9012"
    // driverName: "Vicky"
    // driverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOA80vxTGX12zpA_SpuCPWDDXqYDA_79P6j-JNjH3R&s"
    // licenceNumber: "ABC123456789"
    // location: "Lucknow"
    // mobileNumber: "8298262107"

    // table-row
    let row = document.createElement("div");
    row.setAttribute("class", "table-row");

    // table cell group -------------------
    let cell1 = document.createElement("div");
    cell1.setAttribute("class", "table-cell");
    cell1.innerText = el.location;

    let cell2 = document.createElement("div");
    cell2.setAttribute("class", "table-cell");
    cell2.innerText = el.driverName;

    let cell3 = document.createElement("div");
    cell3.setAttribute("class", "table-cell");
    cell3.innerText = el.mobileNumber;

    let cell4 = document.createElement("div");
    cell4.setAttribute("class", "table-cell");
    cell4.innerText = el.licenceNumber;

    let cell5 = document.createElement("div");
    cell5.setAttribute("class", "table-cell");
    cell5.innerText = el.aadharNumber;

    let cell6 = document.createElement("div");
    cell6.setAttribute("class", "table-cell");
    cell6.innerHTML = `<i class="fa fa-angle-right" style="font-size:26px"></i>`;
    cell6.addEventListener("click", (event) => {
      const el = event.currentTarget.querySelector(".fa-angle-right");
      const box = event.currentTarget.parentElement.nextElementSibling;
      if (box.style.display !== "flex") {
        box.style.display = "flex";
        if (el) {
          el.setAttribute("class", "fa fa-angle-down");
          el.style.color = "red";
        }
        box.style.paddingTop = "0px";
      } else {
        box.style.display = "none";
        if (el) {
          el.setAttribute("class", "fa fa-angle-right");
          el.style.color = "black";
        }
      }
    });

    // end group here -----------------

    // box code start here
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    // box code end here
    let div1 = document.createElement("div");
    div1.setAttribute("class", "driver_img");

    let h4 = document.createElement("h4");
    h4.innerText = "Driver Profile Photo";

    let img = document.createElement("img");
    img.src = el.driverPhoto;

    div1.append(h4, img);

    // div 2 code
    let div2 = document.createElement("div");
    div2.setAttribute("class", "action");

    let button1 = document.createElement("button");
    button1.setAttribute("class", "history");
    button1.innerHTML = `<i class="fa fa-history"></i>Ride History`;

    let button2 = document.createElement("button");
    button2.setAttribute("class", "statement");

    button2.innerHTML = `<i class="fa fa-bar-chart"></i>Statement`;

    let button3 = document.createElement("button");
    button3.setAttribute("class", "document");

    button3.innerHTML = `<i class="fa fa-file-text-o"></i>Document List`;

    let button4 = document.createElement("button");
    button4.setAttribute("class", "edit");

    button4.innerHTML = `<i class="fa fa-edit"></i>Edit`;
    button4.addEventListener("click", () => {
      let show = document.querySelector("#show");
      show.style.display = "block";

      document.querySelector("#location").value = el.location;
      document.querySelector("#driverName").value = el.driverName;
      document.querySelector("#mobileNumber").value = el.mobileNumber;
      document.querySelector("#licenceNumber").value = el.licenceNumber;
      document.querySelector("#aadharNumber").value = el.aadharNumber;
      document.querySelector("#driverPhoto").value = el.driverPhoto;

      const form = document.querySelector("form");
      let api = "http://localhost:8080";

      // get the driver ID from the URL parameters
      // const urlParams = new URLSearchParams(window.location.search);
      const driverId = el._id;

      document
        .querySelector("#submit")
        .addEventListener("click", async (event) => {
          event.preventDefault();
          let location = document.querySelector("#location").value;
          let driverName = document.querySelector("#driverName").value;
          let mobileNumber = document.querySelector("#mobileNumber").value;
          let licenceNumber = document.querySelector("#licenceNumber").value;
          let aadharNumber = document.querySelector("#aadharNumber").value;
          let driverPhoto = document.querySelector("#driverPhoto").value;

          const formData = {
            id: driverId,
            location,
            driverName,
            mobileNumber,
            licenceNumber,
            aadharNumber,
            driverPhoto,
          };
          // Edit
          document.querySelector("#loader").style.display = "flex";
          try {
            const response = await fetch(`${api}/drivers/${driverId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
          document.querySelector("#loader").style.display = "none";
          show.display = "none";
          window.location.reload();
        });
    });

    let button5 = document.createElement("button");
    button5.setAttribute("class", "delete");
    // add event listener to delete button
    button5.addEventListener("click", async () => {
      // send delete request to API
      const res = await fetch(`http://localhost:8080/drivers/${el._id}`, {
        method: "DELETE",
      });
      // check response status and update UI accordingly
      location.reload();
    });

    button5.innerHTML = `<i class="fa fa-trash"></i>Delete`;

    div2.append(button1, button2, button3, button4, button5);

    box.append(div1, div2);
    row.append(cell1, cell2, cell3, cell4, cell5, cell6);
    main.append(row, box);
  });
}


// filter by location

// filter by location on select change
function filter(data){
  document.querySelector("#filter").addEventListener("change", () => {
    const selectedLocation = document.getElementById("filter").value;
    let filteredData = data;
    
    if (selectedLocation !== "") {
      filteredData = data.filter(item => item.location === selectedLocation);
    }
  
    // render filtered data
    render(filteredData);
  });
}





Api();

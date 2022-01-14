/*function getParameters(paramaterName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
}

const myUrl = new URL("https://www.youtube.com/");*/

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let mybookingid = urlParams.get("bookingid");
let numberdetails = document.querySelector("#numberdetails");
let customerdetails = document.querySelector("#customerdetails");
let vehicledetails = document.querySelector("#vehicledetails");
let servicedetails = document.querySelector("#servicedetails");
let userid;
let errormechanic = document.querySelector("#errormechanic");
let invoice = document.querySelector("#invoice");
let invoicetotal = document.querySelector("#invoicetotal");
let suppliesselect = document.querySelector("#suppliesselect");
let showprice = document.querySelector("#showprice");
let myunitprice;

document.addEventListener("DOMContentLoaded", () => {
  getBookingDetails();
  getInvoice();
  getSupplies();
});

function getBookingDetails() {
  fetch(`http://localhost:8090/api/bookings/${mybookingid}`)
    .then((response) => response.json())
    .then((data) => {
      userid = data.userid;
      numberdetails.innerHTML = `<p class="headerbooking"><b>Booking Nº ${data.bookingid}</b></p>`;
      vehicledetails.innerHTML = `<div class="parabookingrow">
      <p class="paragbookingtitle"><b>Vehicle Details</b></p>
      <img src="./images/caricon2.png" alt="Car Icon" height="25">
  </div>
  <p class="paragbooking"><b>Registration Nº: </b>${data.vehicleplate}</p>
  <p class="paragbooking"><b>Type: </b>${data.vehicletype}</p>
  <p class="paragbooking"><b>Make: </b>${data.vehiclemake}</p>
  <p class="paragbooking"><b>Model: </b>${data.vehiclemodel}</p>
  <p class="paragbooking"><b>Year: </b>${data.vehicleyear}</p>
  <p class="paragbooking"><b>Engine: </b>${data.vehicleengine}</p>`;
      servicedetails.innerHTML = `<div class="parabookingrow">
    <p class="paragbookingtitle"><b>Service Details</b></p>
    <img src="./images/toolicon.png" alt="Tool Icon" height="25">
</div>

<p class="paragbooking"><b>Service: </b>${data.bookingtype}</p>
<p class="paragbooking"><b>Date: </b>${data.date}</p>
<p class="paragbooking"><b>Mechanic: </b>${data.mechanic}</p>
<p class="paragbooking"><b>Status: </b>${data.bookingstatus}</p>
<p class="paragbooking"><b>Comments: </b>${data.comments}</p>`;

      fetch(`http://localhost:8090/api/users/${userid}`)
        .then((response) => response.json())
        .then((data) => {
          customerdetails.innerHTML = `<div class="parabookingrow">
      <p class="paragbookingtitle"><b>Customer Details</b></p>
      <img src="./images/usericon.png" alt="User Icon" height="25">
  </div>
      <p class="paragbooking"><b>First name: </b>${data.firstname}</p>
      <p class="paragbooking"><b>Last name: </b>${data.lastname}</p>
      <p class="paragbooking"><b>Phone: </b>${data.phone}</p>
      <p class="paragbooking"><b>Email: </b>${data.email}</p>`;
        });
    });
}

function changeBookingStatus() {
  let bookingstatus = document.querySelector("#bookingstatus").value;
  fetch(
    `http://localhost:8090/api/changestatus/${mybookingid}/${bookingstatus}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  window.location.reload(false);
}

function changeBookingMechanic() {
  errormechanic.innerHTML = "";
  let bookingmechanic = document.querySelector("#bookingmechanic").value;
  console.log(`Mech ${bookingmechanic}`);
  fetch(
    `http://localhost:8090/api/changemechanic/${mybookingid}/${bookingmechanic}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data > 4) {
        console.log("Mechanic not available.");
        errormechanic.innerHTML = "<b>Mechanic not available.</b>";
      } else {
        window.location.reload(false);
      }
    });
}

function getInvoice() {
  invoice.innerHTML = "";
  let invoiceprice = 0;
  fetch(`http://localhost:8090/api/findbookingitem/${mybookingid}`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        invoice.innerHTML += `<p class="paraginvoice">${item.productname} -- Qnt: ${item.quantity} -- €${item.totalprice}</p>`;
        invoiceprice += item.totalprice;
        console.log(invoiceprice);
      });
      invoicetotal.innerHTML = `<p class="paraginvoicetotal"><b>Total price ----------------- €${invoiceprice}</b></p>`;
    });
}

function getSupplies() {
  fetch(`http://localhost:8090/api/supplies`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        let newoption = document.createElement("option");
        let optiontext = document.createTextNode(`${item.productname}`);
        newoption.appendChild(optiontext);
        suppliesselect.appendChild(newoption);
      });
    });
}

function getSupplyPrice() {
  showprice.innerHTML = "";
  let supplyselection = document.querySelector("#suppliesselect").value;
  fetch("http://localhost:8090/api/getprice", {
    method: "POST",
    body: `${supplyselection}`,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      myunitprice = data;
      showprice.innerHTML = `€${data}`;
    });
}

function addToInvoice() {
  let supplyselection = document.querySelector("#suppliesselect").value;
  let myquantity = document.querySelector("#quantity").value;
  fetch("http://localhost:8090/api/bookingitem", {
    method: "POST",
    body: JSON.stringify({
      bookingid: mybookingid,
      productname: supplyselection,
      quantity: myquantity,
      totalprice: myquantity * myunitprice,
      unitprice: myunitprice,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      window.location.reload(false);
    });
}

/*function getParameters(paramaterName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
}

const myUrl = new URL("https://www.youtube.com/");*/

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let bookingid = urlParams.get("bookingid");
let numberdetails = document.querySelector("#numberdetails");
let customerdetails = document.querySelector("#customerdetails");
let vehicledetails = document.querySelector("#vehicledetails");
let servicedetails = document.querySelector("#servicedetails");
let userid = 0;

document.addEventListener("DOMContentLoaded", () => {
  getBookingDetails();
});

/*function getBookingDetails() {
  fetch(`http://localhost:8090/api/bookings/${bookingid}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}*/

function getBookingDetails() {
  fetch(`http://localhost:8090/api/bookings/${bookingid}`)
    .then((response) => response.json())
    .then((data) => {
      userid = data.userid;
      console.log(userid);
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
    });

  fetch(`http://localhost:8090/api/users/${userid}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(userid);
      console.log(data);
      customerdetails.innerHTML = `<div class="parabookingrow">
      <p class="paragbookingtitle"><b>Customer Details</b></p>
      <img src="./images/usericon.png" alt="User Icon" height="25">
  </div>
      <p class="paragbooking"><b>First name: </b>${data.firstname}</p>
      <p class="paragbooking"><b>Last name: </b>${data.lastname}</p>
      <p class="paragbooking"><b>Phone: </b>${data.phone}</p>
      <p class="paragbooking"><b>Email: </b>${data.email}</p>`;
    });
}

let bookingscontainer = document.querySelector("#bookingcontainer");
let statuschosed = document.querySelector("#filterstatus").value;

document.addEventListener("DOMContentLoaded", () => {
  bookingByStatus();
});

function bookingByStatus() {
  bookingscontainer.innerHTML = "";
  let statuschosed = document.querySelector("#filterstatus").value;
  console.log(statuschosed);
  fetch(`http://localhost:8090/api/bookingsbystatus/${statuschosed}`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        bookingscontainer.innerHTML += `<div class="booking col-11 col-sm-9 col-md-9 col-lg-9" id="booking" onclick="location.href='./bookingdetails.html?bookingid=${item.bookingid}'">
          <div class="headerrow">
          <img src="./images/caricon.png" alt="Car Icon" height="25">
          <p class="headerbooking"><b>${item.bookingtype} - ${item.date}</b></p>
          </div>
          <p class="paragbooking"><b>${item.vehicletype}: </b>${item.vehiclemake} - ${item.vehiclemodel} - ${item.vehicleyear}</p>
          <p class="paragbooking"><b>Registration: </b>${item.vehicleplate}</p>
      </div>`;
      });
    });
}

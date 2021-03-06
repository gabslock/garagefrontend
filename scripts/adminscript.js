/*Script of adminscript.html page
@name: Gabriel Jucá
*/

/*Actions when page is loaded. Page only appears if admin is logged in*/
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("admintoken") == null) {
    console.log("No token found");
    window.location.href = "./adminlogin.html";
  }
  bookingByStatus();
});

/*Declaring variables*/
let bookingscontainer = document.querySelector("#bookingcontainer");
let statuschosed = document.querySelector("#filterstatus").value;

/*Getting bookings according to selected status*/
function bookingByStatus() {
  bookingscontainer.innerHTML = "";
  let statuschosed = document.querySelector("#filterstatus").value;
  console.log(statuschosed);
  fetch(`http://localhost:8090/api/bookingsbystatus/${statuschosed}`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        let formatDate = new Date(item.date); //Get date to format in the output
        bookingscontainer.innerHTML += `<div class="booking col-11 col-sm-9 col-md-9 col-lg-9" id="booking" onclick="location.href='./bookingdetails.html?bookingid=${
          item.bookingid
        }'">
          <div class="headerrow">
          <img src="./images/caricon.png" alt="Car Icon" height="25">
          <p class="headerbooking"><b>${
            item.bookingtype
          } - ${formatDate.getDate()}/${
          formatDate.getMonth() + 1
        }/${formatDate.getFullYear()}</b></p>
          </div>
          <p class="paragbooking"><b>${item.vehicletype}: </b>${
          item.vehiclemake
        } - ${item.vehiclemodel} - ${item.vehicleyear}</p>
          <p class="paragbooking"><b>Registration: </b>${item.vehicleplate}</p>
      </div>`;
      });
    });
}

/*Script of rostercript.html page
@name: Gabriel Jucá
*/

/*Actions when page is loaded. Page only appears if admin is logged in*/
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("admintoken") == null) {
    console.log("No token found");
    window.location.href = "./adminlogin.html";
  }
});

/*Declaring variables*/
let bookingcontainer = document.querySelector("#bookingcontainer");
let bookingdate = document.querySelector("#date1");
bookingdate.setAttribute("min", mindate);

/*Getting bookings after selction of a date. The function split the output by active mechanic*/
function selectDate() {
  bookingcontainer.innerHTML = "";
  let date = document.querySelector("#date1").value;
  console.log(date);

  fetch(`http://localhost:8090/api/activemechanics/`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item1) => {
        let newmechanicdiv = document.createElement("div");
        newmechanicdiv.setAttribute("id", `${item1.name}`);
        newmechanicdiv.setAttribute(
          "class",
          `col-11 col-sm-9 col-md-9 col-lg-9`
        );
        newmechanicdiv.innerHTML += `<p id="mechname">${item1.name}</p>`;
        bookingcontainer.appendChild(newmechanicdiv);

        fetch(`http://localhost:8090/api/roster/${date}/${item1.name}/`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.length);
            data.map((item) => {
              let bookingofmechanic = document.querySelector(`#${item1.name}`);
              let formatDate = new Date(item.date); //Get date to format in the output
              bookingofmechanic.innerHTML += `<div class="booking" id="booking" onclick="location.href='./bookingdetails.html?bookingid=${
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
                <p class="paragbooking"><b>Registration: </b>${
                  item.vehicleplate
                }</p>
            </div>`;
            });
          });
      });
    });
}

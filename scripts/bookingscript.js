/*Script of booking.html page
@name: Gabriel Jucá
*/

/*Actions when page is loaded. Page only appears if customer is logged in*/
document.addEventListener("DOMContentLoaded", () => {
  getMake();
  getCarType();
  getBookingType();
  createLastDetailsButton();
  if (sessionStorage.getItem("token") == null) {
    console.log("No token found");
    window.location.href = "./login.html";
  }
});

//Logout button
function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("id");
  window.location.href = "./login.html";
}

//Disable sunday in calendar
//Reference: https://stackoverflow.com/questions/49863189/disable-weekends-on-html-5-input-type-date
let picker = document.getElementById("date1");
picker.addEventListener("input", function (e) {
  var day = new Date(this.value).getUTCDay();
  if ([0].includes(day)) {
    e.preventDefault();
    this.value = "";
    msgerrordate.innerHTML = `<p>Ger's Garage is not open on sundays.</p>`;
  }
});

//Disable past dates in calendar
var dt = new Date();
dtyear = dt.getFullYear();
dtmonth = dt.getMonth() + 1;
if (dtmonth < 10) {
  dtmonth = "0" + dtmonth;
}
dtday = dt.getDate();
if (dtday < 10) {
  dtday = "0" + dtday;
}
mindate = dtyear + "-" + dtmonth + "-" + dtday;

let bookingdate = document.querySelector("#date1");
bookingdate.setAttribute("min", mindate);

//Divs that output error message
let msgerrorvehicleplate = document.querySelector("#errorvehicleplate");
let msgerrorvehicletype = document.querySelector("#errorvehicletype");
let msgerrorvehiclemake = document.querySelector("#errorvehiclemake");
let msgerrorvehiclemodel = document.querySelector("#errorvehiclemodel");
let msgerrorvehicleyear = document.querySelector("#errorvehicleyear");
let msgerrorvehicleengine = document.querySelector("#errorvehicleengine");
let msgerrorbookingtype = document.querySelector("#errorbookingtype");
let msgerrordate = document.querySelector("#errordate");

//Booleans to check all the input
let vehicleplatecheck = false;
let vehicletypecheck = false;
let vehiclemakecheck = false;
let vehiclemodelcheck = false;
let vehicleyearcheck = false;
let vehicleenginecheck = false;
let bookingtypecheck = false;
let datecheck = false;

//Function called when button to book is clicked
function book() {
  let myvehicleplate = document.querySelector("#vehicleplate").value;
  let myvehicletype = document.querySelector("#vehicletype").value;
  let myvehiclemake = document.querySelector("#vehiclemake").value;
  let myvehiclemodel = document.querySelector("#vehiclemodel").value;
  let myvehicleyear = document.querySelector("#vehicleyear").value;
  let myvehicleengine = document.querySelector("#vehicleengine").value;
  let mybookingtype = document.querySelector("#bookingtype").value;
  let mydate = document.querySelector("#date1").value;
  let mycomments = document.querySelector("#comments").value;
  let myuserid = sessionStorage.getItem("id");

  console.log(myuserid);

  //Check Vehicle Plate
  if (myvehicleplate != "") {
    msgerrorvehicleplate.innerHTML = "";
    vehicleplatecheck = true;
  } else {
    msgerrorvehicleplate.innerHTML = `<p>Type the registration number (plate).</p>`;
    vehicleplatecheck = false;
  }

  //Check Vehicle Type
  if (myvehicletype != "Vehicle Type") {
    msgerrorvehicletype.innerHTML = "";
    vehicletypecheck = true;
  } else {
    msgerrorvehicletype.innerHTML = `<p>Choose a vehicle type.</p>`;
    vehicletypecheck = false;
  }

  //Check Vehicle Make
  if (myvehiclemake != "Vehicle Make") {
    msgerrorvehiclemake.innerHTML = "";
    vehiclemakecheck = true;
  } else {
    msgerrorvehiclemake.innerHTML = `<p>Choose a vehicle make.</p>`;
    vehiclemakecheck = false;
  }

  //Check Vehicle Model
  if (myvehiclemodel != "") {
    msgerrorvehiclemodel.innerHTML = "";
    vehiclemodelcheck = true;
  } else {
    msgerrorvehiclemodel.innerHTML = `<p>Type a vehicle model.</p>`;
    vehiclemodelcheck = false;
  }

  //Check Vehicle Year
  if (myvehicleyear.match(/^[0-9]{4}$/)) {
    msgerrorvehicleyear.innerHTML = "";
    vehicleyearcheck = true;
  } else {
    msgerrorvehicleyear.innerHTML = `<p>Type a valid year.</p>`;
    vehicleyearlcheck = false;
  }

  //Check Vehicle Engine
  if (myvehicleengine != "Vehicle Engine") {
    msgerrorvehicleengine.innerHTML = "";
    vehicleenginecheck = true;
  } else {
    msgerrorvehicleengine.innerHTML = `<p>Choose a vehicle engine.</p>`;
    vehicleenginelcheck = false;
  }

  //Check Booking Type
  if (mybookingtype != "Booking Type") {
    msgerrorbookingtype.innerHTML = "";
    bookingtypecheck = true;
  } else {
    msgerrorbookingtype.innerHTML = `<p>Choose a booking type.</p>`;
    bookingtypecheck = false;
  }

  //Check date
  if (mydate != "") {
    msgerrordate.innerHTML = "";
    datecheck = true;
  } else {
    msgerrordate.innerHTML = `<p>Choose a date.</p>`;
    datecheck = false;
  }

  if (
    vehicleplatecheck == true &&
    vehicletypecheck == true &&
    vehiclemakecheck == true &&
    vehiclemodelcheck == true &&
    vehicleyearcheck == true &&
    vehicleenginecheck == true &&
    bookingtypecheck == true &&
    datecheck == true
  ) {
    console.log("Ready to fetch");
    console.log(`${mybookingtype}`);
    fetch("http://localhost:8090/api/newbooking", {
      method: "POST",
      body: JSON.stringify({
        userid: myuserid,
        vehicleplate: myvehicleplate,
        vehicletype: myvehicletype,
        vehiclemake: myvehiclemake,
        vehiclemodel: myvehiclemodel,
        vehicleyear: myvehicleyear,
        vehicleengine: myvehicleengine,
        date: mydate,
        bookingtype: mybookingtype,
        comments: mycomments,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data == true) {
          console.log(data);
          let bookingcontainer = document.querySelector("#bookingcontainer");
          let thankscontainer = document.querySelector("#thankscontainer");
          bookingcontainer.classList.add("containerhidden");
          thankscontainer.classList.remove("containerhidden");
        } else {
          console.log("Not working");
        }
      });
  }
}

//Query for getting active car makes, car types and booking types (services)
let vehiclemake = document.querySelector("#vehiclemake");
let vehicletype = document.querySelector("#vehicletype");
let bookingtype = document.querySelector("#bookingtype");

//Function to fetch options of car make from database
function getMake() {
  fetch(`http://localhost:8090/api/activemake/`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        let newoption = document.createElement("option");
        let optiontext = document.createTextNode(`${item.name}`);
        newoption.appendChild(optiontext);
        vehiclemake.appendChild(newoption);
      });
    });
}

//Function to fetch options of car types from database
function getCarType() {
  fetch(`http://localhost:8090/api/activecartype/`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        let newoption = document.createElement("option");
        let optiontext = document.createTextNode(`${item.name}`);
        newoption.appendChild(optiontext);
        vehicletype.appendChild(newoption);
      });
    });
}

//Function to fetch options of booking types (services) from database
function getBookingType() {
  fetch(`http://localhost:8090/api/activeservices/`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        let newoption = document.createElement("option");
        let optiontext = document.createTextNode(`${item.name}`);
        newoption.appendChild(optiontext);
        bookingtype.appendChild(newoption);
      });
    });
}

//Function to create button that remember details of last car booked. Only appears if user has booked a service before
function createLastDetailsButton() {
  let myuserid2 = sessionStorage.getItem("id");
  fetch(`http://localhost:8090/api/userhasbookings/${myuserid2}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data == true) {
        let lastdetailsdiv = document.querySelector("#lastdetailsdiv");
        lastdetailsdiv.innerHTML = `<button id ="lastdetailsbutton" onclick="getLastCarDetails()">Click here to use last car details</button>`;
      }
    });
}

//Function to write details of last car used
function getLastCarDetails() {
  let myuserid = sessionStorage.getItem("id");
  fetch(`http://localhost:8090/api/lastdetails/${myuserid}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#vehicleplate").value = data.vehicleplate;
      document.querySelector("#vehicletype").value = data.vehicletype;
      document.querySelector("#vehiclemake").value = data.vehiclemake;
      document.querySelector("#vehiclemodel").value = data.vehiclemodel;
      document.querySelector("#vehicleyear").value = data.vehicleyear;
      document.querySelector("#vehicleengine").value = data.vehicleengine;
    });
}

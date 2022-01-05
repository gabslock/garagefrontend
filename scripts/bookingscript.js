/*document.addEventListener("DOMContentLoaded", () => {
  console.log("Content loaded");
  if (localStorage.getItem("token") == null) {
    console.log("No token found");
    window.location.href = "./index.html";
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
}*/

/*function checkCookies() {}
console.log("Test script");
if (localStorage.getItem("token") == null) {
  alert("You have to log in");
  window.location.href = "./index.html";
}*/

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
  let myuserid = 2;

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
        } else {
          console.log("Not working");
        }
      });
  }
}

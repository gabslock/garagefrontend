let bookingcontainer = document.querySelector("#bookingcontainer");

let bookingdate = document.querySelector("#date1");
bookingdate.setAttribute("min", mindate);

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
              bookingofmechanic.innerHTML += `<div class="booking" id="booking" onclick="location.href='./bookingdetails.html?bookingid=${item.bookingid}'">
                <div class="headerrow">
                <img src="./images/caricon.png" alt="Car Icon" height="25">
                <p class="headerbooking"><b>${item.bookingtype} - ${item.date}</b></p>
                </div>
                <p class="paragbooking"><b>${item.vehicletype}: </b>${item.vehiclemake} - ${item.vehiclemodel} - ${item.vehicleyear}</p>
                <p class="paragbooking"><b>Registration: </b>${item.vehicleplate}</p>
            </div>`;
            });
          });

        /*bookingcontainer.innerHTML += `<p id="mechanictitle">${item.name}</p>`;
        getBookingsByMechanic(date, item.name);*/
      });
    });
}

/*function getBookingsByMechanic(date, mechanic) {
  fetch(`http://localhost:8090/api/roster/${date}/${mechanic}/`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        bookingcontainer.innerHTML += `<div class="booking col-11 col-sm-9 col-md-9 col-lg-9" id="booking" onclick="location.href='./bookingdetails.html?bookingid=${item.bookingid}'">
            <div class="headerrow">
            <img src="./images/caricon.png" alt="Car Icon" height="25">
            <p class="headerbooking"><b>${item.bookingtype} - ${item.date}</b></p>
            </div>
            <p class="paragbooking"><b>${item.vehicletype}: </b>${item.vehiclemake} - ${item.vehiclemodel} - ${item.vehicleyear}</p>
            <p class="paragbooking"><b>Registration: </b>${item.vehicleplate}</p>
        </div>`;
      });
    });
}*/

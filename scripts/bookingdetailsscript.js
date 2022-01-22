document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("admintoken") == null) {
    console.log("No token found");
    window.location.href = "./adminlogin.html";
  }
});

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
let mechanicsselect = document.querySelector("#bookingmechanic");
let showprice = document.querySelector("#showprice");
let myunitprice;
let errorquantity = document.querySelector("#errorquantity");
let errorproduct = document.querySelector("#errorproduct");
let invoicetable = document.querySelector("#invoicetable");

document.addEventListener("DOMContentLoaded", () => {
  getBookingDetails();
  getInvoice();
  getSupplies();
  getMechanics();
});

function getBookingDetails() {
  fetch(`http://localhost:8090/api/bookings/${mybookingid}`)
    .then((response) => response.json())
    .then((data) => {
      userid = data.userid;
      let formatDate = new Date(data.date); //Get date to format in the output
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
<p class="paragbooking"><b>Date: </b>${formatDate.getDate()}/${
        formatDate.getMonth() + 1
      }/${formatDate.getFullYear()}</p>
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
  invoicetable.innerHTML = "";
  tabletr = document.createElement("tr");
  tableexpense = document.createElement("td");
  tableqnt = document.createElement("td");
  tableprice = document.createElement("td");
  tabledelete = document.createElement("td");
  tableexpense.innerHTML = "<b>Expense</b>";
  tableqnt.innerHTML = "<b>Qnt</b>";
  tableprice.innerHTML = "<b>Price</b>";
  tabledelete.innerHTML = "";
  tabletr.appendChild(tableexpense);
  tabletr.appendChild(tableqnt);
  tabletr.appendChild(tableprice);
  tabletr.appendChild(tabledelete);
  invoicetable.appendChild(tabletr);
  let invoiceprice = 0;
  fetch(`http://localhost:8090/api/findbookingitem/${mybookingid}`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        tabletr = document.createElement("tr");
        tableexpense = document.createElement("td");
        tableqnt = document.createElement("td");
        tableprice = document.createElement("td");
        tabledelete = document.createElement("td");
        tabledelete.setAttribute(
          "onclick",
          `deleteItem(${item.bookingitemid})`
        );
        tabledelete.setAttribute("class", `deletestyle`);
        tableexpense.appendChild(
          document.createTextNode(`${item.productname}`)
        );
        tableqnt.appendChild(document.createTextNode(`${item.quantity}`));
        tableprice.appendChild(document.createTextNode(`€${item.totalprice}`));
        tabledelete.appendChild(document.createTextNode(`Delete`));
        tabletr.appendChild(tableexpense);
        tabletr.appendChild(tableqnt);
        tabletr.appendChild(tableprice);
        tabletr.appendChild(tabledelete);
        invoicetable.appendChild(tabletr);
        /*invoicetable.innerHTML += `<tr>
        <td>Annual service charge</td>
        <td>1</td>
        <td>€39</td>
      </tr>`;*/
        /*invoice.innerHTML += `<p class="paraginvoice">${item.productname} -- Qnt: ${item.quantity} -- €${item.totalprice}</p>`;*/
        invoiceprice += item.totalprice;
        console.log(invoiceprice);
      });
      tabletr = document.createElement("tr");
      tableexpense = document.createElement("td");
      tableqnt = document.createElement("td");
      tableprice = document.createElement("td");
      tabledelete = document.createElement("td");
      tableexpense.innerHTML = "<b>Total</b>";
      tableqnt.innerHTML = "";
      tableprice.innerHTML = `<b>${invoiceprice}</b>`;
      tabledelete.innerHTML = "";
      tabletr.appendChild(tableexpense);
      tabletr.appendChild(tableqnt);
      tabletr.appendChild(tableprice);
      tabletr.appendChild(tabledelete);
      invoicetable.appendChild(tabletr);
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
  errorquantity.innerHTML = ``;
  errorproduct.innerHTML = ``;

  if (supplyselection == "Select product/service") {
    errorproduct.innerHTML = `Select product.`;
  } else if (myquantity <= 0 || myquantity - Math.floor(myquantity) !== 0) {
    errorquantity.innerHTML = `Select valid quantity.`;
  } else {
    fetch("http://localhost:8090/api/bookingitem", {
      method: "POST",
      body: JSON.stringify({
        bookingid: mybookingid,
        productname: supplyselection,
        quantity: myquantity,
        totalprice: null,
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
}

function getMechanics() {
  fetch(`http://localhost:8090/api/activemechanics/`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        let newoption = document.createElement("option");
        let optiontext = document.createTextNode(`${item.name}`);
        newoption.appendChild(optiontext);
        mechanicsselect.appendChild(newoption);
      });
    });
}

function deleteItem(bookingitemid) {
  fetch(`http://localhost:8090/api/bookingitem/${bookingitemid}`, {
    method: "DELETE",
  })
    .then((res) => res.text()) // or res.json()
    .then((res) => console.log(res));
  window.location.reload(false);
}

function openInvoice() {
  window.open(`./invoice.html?bookingid=${mybookingid}`, "_blank");
  /*window.open(url, (href = `./invoice.html?bookingid=${mybookingid}`)).focus();*/
}

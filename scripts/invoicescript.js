/*Script of invoice.html page
@name: Gabriel Jucá
*/

/*Actions when page is loaded. Page only appears if admin is logged in*/
document.addEventListener("DOMContentLoaded", () => {
  getInvoice();
  if (sessionStorage.getItem("admintoken") == null) {
    console.log("No token found");
    window.location.href = "./adminlogin.html";
  }
});

/*Declaring variables*/
let invoicetable = document.querySelector("#invoicetable");
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let mybookingid = urlParams.get("bookingid");

/*Get all the invoice details*/
function getInvoice() {
  tabletr = document.createElement("tr");
  tableexpense = document.createElement("td");
  tableqnt = document.createElement("td");
  tableprice = document.createElement("td");
  tableexpense.innerHTML = "<b>Item</b>";
  tableqnt.innerHTML = "<b>Qnt</b>";
  tableprice.innerHTML = "<b>Price</b>";
  tabletr.appendChild(tableexpense);
  tabletr.appendChild(tableqnt);
  tabletr.appendChild(tableprice);
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
        tableexpense.appendChild(
          document.createTextNode(`${item.productname}`)
        );
        tableqnt.appendChild(document.createTextNode(`${item.quantity}`));
        tableprice.appendChild(document.createTextNode(`€${item.totalprice}`));
        tabletr.appendChild(tableexpense);
        tabletr.appendChild(tableqnt);
        tabletr.appendChild(tableprice);
        invoicetable.appendChild(tabletr);

        invoiceprice += item.totalprice;
      });
      tabletr = document.createElement("tr");
      tableexpense = document.createElement("td");
      tableqnt = document.createElement("td");
      tableprice = document.createElement("td");
      tableexpense.innerHTML = "<b>Total</b>";
      tableqnt.innerHTML = "";
      tableprice.innerHTML = `<b>€${invoiceprice}</b>`;
      tabletr.appendChild(tableexpense);
      tabletr.appendChild(tableqnt);
      tabletr.appendChild(tableprice);
      invoicetable.appendChild(tabletr);
    });
}

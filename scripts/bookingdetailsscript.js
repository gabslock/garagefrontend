/*function getParameters(paramaterName) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(parameterName);
}

const myUrl = new URL("https://www.youtube.com/");*/

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let bookingid = urlParams.get("bookingid");

document.addEventListener("DOMContentLoaded", () => {
  getBookingDetails();
});

function getBookingDetails() {
  fetch(`http://localhost:8090/api/bookings/${bookingid}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

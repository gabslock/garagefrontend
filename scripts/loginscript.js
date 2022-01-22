/*Script of login.html page
@name: Gabriel Jucá
*/

/*Declaring variables*/
let msgerrorlogin = document.querySelector("#errorlogin");

/*Function to login (customer)*/
function loginApi() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("id");
  let myemail = document.querySelector("#email").value;
  let mypassword = document.querySelector("#password").value;

  fetch("http://localhost:8090/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: myemail,
      password: mypassword,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      if (data == "Email not registered.") {
        msgerrorlogin.innerHTML = `<p>${data}</p>`;
      } else if (data == "Wrong password.") {
        msgerrorlogin.innerHTML = `<p>${data}</p>`;
      } else {
        let token = Math.random().toString(16).substring(2);
        console.log(token);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", data);
        window.location.href = "./booking.html";
      }
    });
}

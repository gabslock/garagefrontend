let msgerrorlogin = document.querySelector("#errorlogin");

function adminloginApi() {
  let myemail = document.querySelector("#email").value;
  let mypassword = document.querySelector("#password").value;

  fetch("http://localhost:8090/api/adminlogin", {
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
        console.log(data);
        let admintoken = Math.random().toString(16).substring(2);
        sessionStorage.setItem("admintoken", admintoken);
        window.location.href = "./index.html";
      }
    });
}

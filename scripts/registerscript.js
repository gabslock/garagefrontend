/*Script of register.html page
@name: Gabriel Jucá
*/

//Declaring divs that output error message
let msgerrorlogin = document.querySelector("#errorlogin");
let msgerrorpassword = document.querySelector("#errorpassword");
let msgerrorpasswordrep = document.querySelector("#errorpasswordrep");
let msgerrorfirstname = document.querySelector("#errorfirstname");
let msgerrorlastname = document.querySelector("#errorlastname");
let msgerrorphone = document.querySelector("#errorphone");
let msgerrordupemail = document.querySelector("#errordupemail");

//Booleans to check all the input
let logincheck = false;
let passwordcheck = false;
let passwordrepcheck = false;
let firstnamecheck = false;
let lastnamecheck = false;
let phonecheck = false;

//Function called when button to registrate is clicked
function registerApi() {
  event.preventDefault();
  let myemail = document.querySelector("#email").value;
  let mypassword = document.querySelector("#password").value;
  let mypasswordrep = document.querySelector("#passwordrep").value;
  let myfirstname = document.querySelector("#firstname").value;
  let mylastname = document.querySelector("#lastname").value;
  let myphone = document.querySelector("#phone").value;

  //Check email
  //Regex reference: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  if (
    myemail.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    msgerrorlogin.innerHTML = "";
    logincheck = true;
  } else {
    msgerrorlogin.innerHTML = `<p>Email not valid.</p>`;
    logincheck = false;
  }

  //Check password
  //Regex reference: https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength
  if (
    mypassword.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
    )
  ) {
    msgerrorpassword.innerHTML = "";
    passwordcheck = true;
  } else {
    msgerrorpassword.innerHTML = `<p>Password must have at least 8 characters, one upper case, one lower case, one number and one special character.</p>`;
    passwordcheck = false;
  }

  //Check repeat password
  if (mypasswordrep == mypassword) {
    msgerrorpasswordrep.innerHTML = "";
    passwordrepcheck = true;
  } else {
    msgerrorpasswordrep.innerHTML = `<p>Passwords don't match.</p>`;
    passwordrepcheck = false;
  }

  //Check first name
  //Regex reference: https://stackoverflow.com/questions/41975496/regex-for-names-validation-allow-only-letters-and-spaces
  if (myfirstname.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
    msgerrorfirstname.innerHTML = "";
    firstnamecheck = true;
  } else {
    msgerrorfirstname.innerHTML = `<p>First name can only contain letters and spaces and can't be null.</p>`;
    firstnamecheck = false;
  }

  //Check last name
  //Regex reference: https://stackoverflow.com/questions/41975496/regex-for-names-validation-allow-only-letters-and-spaces
  if (mylastname.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/)) {
    msgerrorlastname.innerHTML = "";
    lastnamecheck = true;
  } else {
    msgerrorlastname.innerHTML = `<p>Last name can only contain letters and spaces and can't be null.</p>`;
    lastnamecheck = false;
  }

  //Check phone number
  //Regex reference: https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript

  if (
    myphone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
  ) {
    msgerrorphone.innerHTML = "";
    phonecheck = true;
  } else {
    msgerrorphone.innerHTML = `<p>Type a valid number.</p>`;
    phonecheck = false;
  }

  if (
    logincheck == true &&
    passwordcheck == true &&
    passwordrepcheck == true &&
    firstnamecheck == true &&
    lastnamecheck == true &&
    phonecheck == true
  ) {
    console.log("Ready to fetch");
    fetch("http://localhost:8090/api/newuser", {
      method: "POST",
      body: JSON.stringify({
        email: myemail,
        firstname: myfirstname,
        lastname: mylastname,
        password: mypassword,
        phone: myphone,
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
          msgerrordupemail.innerHTML = "";
          let registrationcontainer = document.querySelector(
            "#registrationcontainer"
          );
          let confirmationcontainer = document.querySelector(
            "#confirmationcontainer"
          );
          registrationcontainer.classList.add("containerhidden");
          confirmationcontainer.classList.remove("containerhidden");
        } else {
          msgerrordupemail.innerHTML = `<p>Email already registered.</p>`;
        }
      });
  } else {
    console.log("Details are wrong");
  }
}

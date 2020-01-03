const pin = document.querySelector("#pin");
let errorMessage = document.querySelector("#error");
const form = document.querySelector("#form");
const userDetails = document.querySelector("#user-details");

const buttonPin = document.querySelector("#pin-btn");

buttonPin.addEventListener("click", pinSubmit);

const url = "http://localhost:3000/api";

//shows Error messages
function showErrorMessage(message) {
  errorMessage.style.display = "block";
  errorMessage.style.backgroundColor = "orange";
  errorMessage.innerHTML = `<p>${message}</p>`;

  setTimeout(() => {
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "";
  }, 3000);

  return false;
}

//shows success message
function showSuccessMessage(message) {
  errorMessage.style.display = "block";
  errorMessage.style.backgroundColor = "#30A94C";
  errorMessage.innerHTML = `<p>${message}</p>`;

  setTimeout(() => {
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "";
    userDetails.style.display = "block";
  }, 5000);

  return false;
}

//form validation
function validation() {
  if (pin.value === "") {
    showErrorMessage("All fields are required");
  } else if (pin.value.length !== 10) {
    showErrorMessage("Pin number should be 10 digits");
  } else {
    return true;
  }
}

function showUserDetails(user) {
  let details = `
  <div>
    <h2>User Details</h2>
    <p>User ID: <span class="details">${user.id}<span></p>
    <p>Username: <span class="details">${user.username}</span></p>
    <p>Phone Number: <span class="details">${user.phoneNumber}</span></p>
    <p>Email: <span class="details">${user.email}</span></p>
    <p>Pin: <span class="details">${user.pin}</span></p>
  </div>
  `;
  userDetails.innerHTML = details;
}

//disable button
function disableButton() {
  buttonPin.setAttribute("disabled", true);
}

//enable button
function enableButton() {
  buttonPin.removeAttribute("disabled");
}

//on submission of pin
function pinSubmit(e) {
  e.preventDefault();
  userDetails.style.display = "none";
  if (validation()) {
    disableButton();
    fetch(url + `/${pin.value}`)
      .then(resp => resp.json())
      .then(user => {
        enableButton();
        showSuccessMessage("Successfully fetched data!");
        let newUser = {
          ...user[0]
        };
        showUserDetails(newUser);
        form.reset();
      })
      .catch(err => {
        enableButton();
        console.log(err);
        showErrorMessage("Unable to fetch data");
        form.reset();
      });
  }
}

const username = document.querySelector("#username");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const form = document.querySelector("#form");
let errorMessage = document.querySelector("#error");
let emailPreview = document.querySelector("#email-preview");

const button = document.querySelector("#btn");

button.addEventListener("click", formSubmit);

const url = "http://localhost:3000/api";

//shows Error messages
function showErrorMessage(message) {
  errorMessage.style.display = "block";
  errorMessage.style.backgroundColor = "orange";
  errorMessage.innerHTML = `<p>${message}</p>`;

  setTimeout(() => {
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "";
  }, 6000);

  return false;
}

//shows success message and email preview
function showSuccessMessage(message, url) {
  errorMessage.style.display = "block";
  errorMessage.style.backgroundColor = "#30A94C";
  errorMessage.innerHTML = `<p>${message}</p><a href=${url} class='message' target='_blank'>Click here to preview email url</a>`;

  setTimeout(() => {
    errorMessage.style.display = "none";
    errorMessage.innerHTML = "";
  }, 10000);

  return false;
}

//form validation
function validation() {
  if (username.value === "" || phone.value === "" || email.value === "") {
    showErrorMessage("All fields are required");
  } else if (phone.value.length !== 11) {
    showErrorMessage("Phone number should be 11 digits");
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
  ) {
    showErrorMessage("Email format not valid");
  } else {
    return true;
  }
}

function disableButton() {
  button.setAttribute("disabled", true);
}

function enableButton() {
  button.removeAttribute("disabled");
}

//on submitting the form
async function formSubmit(e) {
  e.preventDefault();

  if (validation()) {
    disableButton();
    const User = {
      username: username.value,
      phoneNumber: phone.value,
      email: email.value
    };

    await fetch(url + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(User)
    })
      .then(resp => resp.json())
      .then(user => {
        enableButton();
        let previewUrl = user.previewUrl;
        user.message
          ? showErrorMessage("Unable to insert into database")
          : showSuccessMessage(
              `Successfully inserted into database! An email has been sent to ${user.email}`,
              previewUrl
            );

        form.reset();
      })
      .catch(err => {
        enableButton();
        console.log(err);
        showErrorMessage("Unable to insert data into database");
        form.reset();
      });
  } else {
    return false;
  }
}

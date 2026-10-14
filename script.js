const formwrapper = document.querySelector("#formwrapper");

const create_form_section = document.querySelector("#create_user_account");
const signInFormContainer = document.querySelector("#sign_in_form");

const dashboardPage = document.querySelector("#dashboard");
console.log(dashboardPage);

let currentUserId = localStorage.getItem("userId");

//SCREEN SWITCHING BASED on ROUTER conditions
function router() {
  const router = window.location.hash;

  if (router === "") {
    console.log("router is an empty string");
    create_form_section.style.display = "block";
    signInFormContainer.style.display = "none";

    renderCreateAccountpage();
    console.log(window.location.hash);
  } else if (router === "#/signIn") {
    console.log("were on sign in page");
    create_form_section.style.display = "none";
    signInFormContainer.style.display = "block";
    dashboardPage.style.display = "none";
    getSignInPage();
  } else if (router === "#/dashboard") {
    console.log("youre on dashboard page");

    create_form_section.style.display = "none";
    signInFormContainer.style.display = "none";
    dashboardPage.style.display = "block";
    renderDashBoard();
  }
}
router();

window.addEventListener("hashchange", router);

//function to render the create-account page to the browser
function renderCreateAccountpage() {
  create_form_section.innerHTML = `

<div id="formwrapper">
        <form action="">
          <button class="logo"><h4>Success Unisex Beauty Salon</h4></button>
          <div class="img_container">
            <img
              src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt=""
            />
          </div>
          <br />

          <h4 class="createh4">Create account</h4>

          <input type="text" name="" id="name" placeholder="Name" / required><br />
          <input type="text" name="" id="username" placeholder="Username" / required>
          <br />
          <input type="email" name="" id="email" placeholder="Email" / required> <br />
          <input
            type="password"
            name=""
            id="password"
            placeholder="Enter password"
          />
          <input type="checkbox" /> <span>Remember me?</span>

          <button type="submit" id="createaccount">Create Account</button>

          <p>Already a user ?</p>
          <button id="displaySignInForm">Sign in instead</button>
        </form>
      </div>

`;
  const signInFormClicked = document.querySelector("#displaySignInForm");
  signInFormClicked.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.hash = "/signIn";
    sign_in_form.style.display = "block";
    create_form_section.style.display = "none";
  });
}

//function to render the sign in page to the browser
function getSignInPage() {
  signInFormContainer.innerHTML = `
    <div id="formwrapper">
        <form action="">
          <div class="img_container">
            <img
              src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt=""
            />
          </div>

          <h4>Sign in account</h4>
          <br />

          <input
            type="text"
            name=""
            id="log_in_username"
            placeholder="Username"
          />
          <input
            type="password"
            name=""
            id="log_in_password"
            placeholder="Email"
          />

          <p>Forgot password ?🥲</p>
          <a href="" id="reset_password">Reset password</a>
          <br />
          <button type="submit" id="logIn">Sign In</button>
        </form>
      </div>


    `;
}

//create account form variables

const submitBtn = document.querySelector("#createaccount");
const usersRendered = document.querySelector("#usersRendered");
//sign in form

//create user account on form submit
create_form_section.addEventListener("submit", async function (event) {
  event.preventDefault();
  const name = document.querySelector("#name");
  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const user = {
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
  };

  const response = await fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const userData = await response.json();
  currentUserId = userData._id;
  console.log(currentUserId);
  //render sign in page
  window.location.hash = "/signIn";
});

signInFormContainer.addEventListener("submit", async function (event) {
  //login inside the account
  //login account form variables
  const loginUserName = document.querySelector("#log_in_username");
  const loginUserPassword = document.querySelector("#log_in_password");
  console.log(loginUserName);
  event.preventDefault();
  const signedInUser = {
    username: loginUserName.value,
    password: loginUserPassword.value,
  };

  const response = await fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signedInUser),
  });
  const userData = await response.json();

  if (response.ok && userData && userData._id) {
    currentUserId = userData._id;
    console.log(currentUserId);
    window.location.hash = "/dashboard";
    localStorage.setItem("userId", currentUserId);
  } else {
    console.log("RESPONSE FAILED");
  }
});

async function renderDashBoard() {
  const response = await fetch(`http://localhost:3000/users/${currentUserId}`, {
    method: "GET",
  });
  const user = await response.json();

  currentUserId = user._id;

  dashboardPage.innerHTML = `
      <div class="dashboardContainer" id="dashwrapper">
        <div class="aside_left">
          <div class="left">
            <div id="userProfile">
              <div class="imgContainer">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
                  alt=""
                />
              </div>
              <div class="profileInfo">
                <span>${user.name}</span>
                <p class="email">${user.email}</p>
              </div>
            </div>
            <ul class="nav_items">
              <li class="item active" id="dashboard">
                Dashboard
              </li>
              <li class="item" id="services">Services</li>
              <li class="item" id="gallery">Gallery</li>
              <li class="item" id="reviews">Reviews</li>
            </ul>
          </div>
        </div>
            <div class="right">
              <div id="dahsboard-content">
                  <h2>Welcome back ${user.username}</h2>
                  <br><br>
                  <h3>Upcoming Appointment/s</h3>

                  <section class="appointments">
                      <article class="card">
                        <p></p>
                        <p></p>
                      </article>
                      <article class="card">
                        <p></p>
                        <p></p>
                      </article>
                  </section>
              </div>
            </div>
      </div>

    `;
}

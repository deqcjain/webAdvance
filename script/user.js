const userObj = [];

// Registering User
function registerHandler() {
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  //gender evaluation
  const genderByName = document.getElementsByName("gender");
  let gender = null;
  genderByName.forEach((sex) => {
    if (sex.checked) {
      gender = sex.value;
    }
  });
  const username = document.getElementById("username");

  const email = document.getElementById("email");

  const password = document.getElementById("password");
  const roles = document.getElementsByName("roles");
  let role = null;
  roles.forEach((rol) => {
    if (rol.checked) {
      role = rol.value;
    }
  });
  if (!validation(fname, lname, gender, username, email, password, role)) {
    return;
  }
  const userReg = {};
  userReg["fname"] = fname.value;
  userReg["lname"] = lname.value;
  userReg["gender"] = gender.value;
  userReg["username"] = username.value;
  userReg["email"] = email.value;
  userReg["password"] = password.value;
  userReg["role"] = role.value;
  userObj.push(userReg);
  console.log(userObj);
  localStorage.setItem("fname", fname.value);
  localStorage.setItem("lname", lname.value);
  localStorage.setItem("gender", gender);
  localStorage.setItem("username", username.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
  localStorage.setItem("role", role);
  localStorage.setItem("userObj", JSON.stringify(userObj));
  //switching pages to login after registering
  switchPages("login");
}

//VALIDATION FOR REGISTRATION
function validation(fname, lname, gender, username, email, password, role) {
  if (
    fname.value == "" ||
    lname.value == "" ||
    gender == null ||
    username.value == "" ||
    email.value == "" ||
    password.value == "" ||
    role == null
  ) {
    fname.classList.add("error");
    fname.classList.add("error");
    lname.classList.add("error");
    username.classList.add("error");
    email.classList.add("error");
    password.classList.add("error");
    role.classList.add("error");
    alert("Cannot leave any empty field");
    return false;
  }
  //email check
  if (!email.value.includes("@") || !email.value.includes(".")) {
    email.classList.add("error");
    alert("Please enter a valid email: missing @ or .");
    return false;
  } else {
    if (
      email.value.split(".")[1].length > 3 ||
      email.value.indexOf("@") > email.value.indexOf(".")
    ) {
      email.classList.add("error");
      alert(
        "Please enter a valid email: tld can't be more than 3 letters and @ should come before ."
      );
      return false;
    }
  }

  const storageObj = localStorage.getItem("userObj");

  const userArr = JSON.parse(storageObj);

    for (let index = 0; index < userArr.length; index++) {
      if (email.value === userArr[index].email) {
        email.classList.add("error");
        alert("Email already exists");
        return false;
      }
    } 
  
  //password check
  if (password.value.length > 3 || password.value.length < 10) {
    let flag = false;
    [...password.value].forEach((p) => {
      if (p === p.toUpperCase()) {
        flag = true;
        return;
      }
    });
    if (flag == false) {
      password.classList.add("error");
      alert(
        "Password is invalid: Should include atleast 1 uppercase character"
      );
      return false;
    }
  } else {
    alert("Password is invalid: Between 3 to 10 characters ");
    return false;
  }

  return true;
}

//Login Handler
function loginHandler() {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const inputEmail = document.getElementById("logEmail");
  const inputPassword = document.getElementById("logPassword");
  if (email === inputEmail.value && password === inputPassword.value) {
    document.getElementById("aregister").style.display = "none";
    const listParent = document.getElementById("navList");
    const liLogout = document.createElement("li");
    const logout = document.createElement("a");
    logout.setAttribute("class", "logout");
    logout.setAttribute("href", "#");
    logout.setAttribute("onclick", "logoutHandler()");
    logout.setAttribute("id", "alogout");
    logout.innerHTML = "Logout";
    liLogout.appendChild(logout);
    listParent.appendChild(liLogout);
    switchPages("list");
    listUsers();
  } else {
    alert("email and password are invalid: they do not match");
  }
}

//List Users
function listUsers() {
  document.getElementById("alist").style.display = "block";
  var articles = document.getElementById("content");
  let i = 0;
  var article = document.createElement("div");
  for (const key in localStorage) {
    if (i === localStorage.length) break;
    i++;
    var articleName = document.createElement("h3");
    const element = localStorage[key];
    articleName.innerText = key + " : " + element;
    article.appendChild(articleName);
    articles.appendChild(article);
  }
}

//Logout User
function logoutHandler() {
  document.getElementById("aregister").style.display = "block";
  document.getElementById("alogin").style.display = "block";
  document.getElementById("alogout").style.display = "none";
  switchPages("register");
}

//Switch pages
function switchPages(id2) {
  const currentActive = document.querySelector("nav a.active");
  currentActive.classList.remove("active");
  currentActive.style.display = "none";
  const className = currentActive.classList[0];
  document.getElementById(className).style.display = "none";
  const page2 = document.getElementById(id2);
  document.getElementsByClassName(id2)[0].classList.add("active");
  page2.style.display = "block";
}

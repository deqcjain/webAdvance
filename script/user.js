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
    console.log("Validation failed");
    return;
  }
  const userReg = {};
  userReg["fname"] = fname.value;
  userReg["lname"] = lname.value;
  userReg["gender"] = gender;
  userReg["username"] = username.value;
  userReg["email"] = email.value;
  userReg["role"] = role;
  userObj.push(userReg);
  localStorage.setItem("password", password.value);
  localStorage.setItem("email", email.value);

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
  if(userArr!==null){
  for (let index = 0; index < userArr.length; index++) {
    if (email.value === userArr[index].email) {
      email.classList.add("error");
      alert("Email already exists");
      return false;
    }
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

  if ((email === inputEmail.value && password === inputPassword.value)) {
    const prevSession=localStorage.getItem('session');
    if(prevSession!==null){
      var decodeEmail=decodeSession(prevSession);
    }
    if(decodeEmail!==email){
    const sessionId=createSession(email);
    localStorage.setItem("session",sessionId)
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
    document.getElementById("alogout").style.display = "block";
    listUsers();
    switchPages("list");
    }
    else{
      alert("already logged in");
    }
  } else {
    alert("email and password are invalid: they do not match from the localDB");
  }

}

//List Users
function listUsers() {
  const sessionId = localStorage.getItem('session');
    console.log(sessionId);
    if (sessionId == null) {
      switchPages('register');
    } else {
      const articles = document.getElementById("content");
      const userArr = JSON.parse(localStorage.getItem("userObj"));

      for (let i = 0; i < userArr.length; i++) {
        const user = userArr[i];
        const article = document.createElement("div");

        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            const value = user[key];
            const articleName = document.createElement("h3");
            articleName.innerText = key + " : " + value;
            article.appendChild(articleName);
          }
        }

        articles.appendChild(article);
      }
    }
}

window.addEventListener('load',listUsers());


//Logout User
function logoutHandler() {
  localStorage.removeItem('session');
  document.getElementById("aregister").style.display = "block";
  document.getElementById("alogin").style.display = "block";
  document.getElementById("alogout").style.display = "none";
  switchPages("register");
}

//Create Session
function createSession(email) {
  const sessionId = email + "_" + Math.random().toString(36).substring(2, 9);
  localStorage.setItem("session", sessionId);
  return sessionId;
}

function decodeSession(sessionId) {
  const parts = sessionId.split("_");
  if (parts.length === 2) {
    const email = parts[0];
    return email;
  } else {
    return null;
  }
}

//Switch pages
function switchPages(id2) {
  const currentActive = document.querySelector("nav a.active");
  const nextId='a'+id2;
  if(currentActive.getAttribute('id')== nextId){return;}
  currentActive.classList.remove("active");
  const className = currentActive.classList[0];
  document.getElementById(className).style.display = "none";

  const page2 = document.getElementById(id2);
  document.getElementsByClassName(id2)[0].classList.add("active");
  page2.style.display = "block";
}

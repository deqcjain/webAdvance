const userObj = [];

function registerHandler() {
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  //gender evaluation
  const genderByName = document.getElementsByName("gender");
  // console.log(genderByName);
  let gender = null;
  genderByName.forEach((sex) => {
    if (sex.checked) {
      gender = sex.value;
    }
  });
  const username = document.getElementById("username");

  const email = document.getElementById("email");

  const password = document.getElementById("password");
  if (!validation(fname, lname, gender, username, email, password)) {
    return;
  }

  // console.log(gender);
  localStorage.setItem("fname", fname.value);
  localStorage.setItem("lname", lname.value);
  localStorage.setItem("gender", gender);
  localStorage.setItem("username", username.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password.value);
  const userReg = {};
  userReg["fname"] = fname.value;
  userReg["lname"] = lname.value;
  userReg["gender"] = gender;
  userReg["username"] = username.value;
  userReg["email"] = email.value;
  userReg["password"] = password.value;
  userObj.push(userReg);

  console.log(userObj);

  //switching pages to login after registering
  switchPages("login");
}

function validation(fname, lname, gender, username, email, password) {
  if (
    fname.value == "" ||
    lname.value == "" ||
    gender == null ||
    username.value == "" ||
    email.value == "" ||
    password.value == ""
  ) {
    fname.classList.add("error");
    fname.classList.add("error");
    // genderByName[0].classList.add('error')
    // genderByName[1].classList.add('error')
    lname.classList.add("error");
    username.classList.add("error");
    email.classList.add("error");
    password.classList.add("error");
    alert("Cannot leave any empty field");
    return false;
  }

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

  if (password.value.length > 3 || password.value.length < 10) {
    let flag = false;
    [...password.value].forEach((p) => {
      if (p === p.toUpperCase()) {
        flag = true;
        return;
      }
    });
    if(flag==false){
      password.classList.add('error');
      alert("Password is invalid: Should include atleast 1 uppercase character")
      return false;
    }
  }
  else{
    alert("Password is invalid: Between 3 to 10 characters ")
    return false;
  }

  return true;
}




function switchPages(id2) {
  const currentActive = document.querySelector("nav a.active");
  currentActive.classList.remove("active");
  const className = currentActive.classList[0];
  document.getElementById(className).style.display = "none";
  // document.getElementsByClassName(id1)[0].classList.remove("active");
  // page1.style.display="none";
  const page2 = document.getElementById(id2);
  document.getElementsByClassName(id2)[0].classList.add("active");
  // console.log(page2);
  page2.style.display = "block";
}

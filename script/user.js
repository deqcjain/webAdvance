const userReg={}


const links = document.querySelectorAll("nav a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    const currentActive = document.querySelector("nav a.active");
    currentActive.classList.remove("active");
    let className = currentActive.classList[0];
    document.getElementById(className).style.display = "none";

    className = link.classList[0];
    link.classList.add("active");
    document.getElementById(className).style.display = "block";
  });
});

function registerHandler() {

  const fname = document.getElementById("fname");
  localStorage.setItem("fname", fname);
  const lname = document.getElementById("lname");
  localStorage.setItem("lname", lname);
  const gender = document.getElementById("gender");
  localStorage.setItem("gender", gender);
  const username = document.getElementById("username");
  localStorage.setItem("username", username);
  const email = document.getElementById("email");
  localStorage.setItem("email", email);
  const password = document.getElementById("password");
  localStorage.setItem("password", password);
  userReg[fname]=fname;
  userReg[lname]=lname;
  userReg[gender]=gender;
  userReg[username]=username;
  userReg[email]=email;
  userReg[password]=password;
  console.log(userReg);
  switchPages('register','login')
}

function switchPages(id1,id2){
  const page1=document.getElementById(id1);
  page1.style.display="none";
  const page2=document.getElementById(id2);
  page2.style.display="block";
}
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
  localStorage.setItem("fname", fname.value);
  const lname = document.getElementById("lname");
  localStorage.setItem("lname", lname.value);
  //gender evaluation
  const genderByName = document.getElementsByName("gender");
  console.log(genderByName);
  let gender=null;
  genderByName.forEach((sex)=>{
     if(sex.checked){
      gender=sex.value;
     }
  })
  console.log(gender);
  localStorage.setItem("gender", gender);
  const username = document.getElementById("username");
  localStorage.setItem("username", username.value);
  const email = document.getElementById("email");
  localStorage.setItem("email", email.value);
  const password = document.getElementById("password");
  localStorage.setItem("password", password.value);

  userReg['fname']=fname.value;
  userReg['lname']=lname.value;
  userReg['gender']=gender;
  userReg['username']=username.value;
  userReg['email']=email.value;
  userReg['password']=password.value;
  console.log(userReg);

  //switching pages to login after registering
  switchPages('register','login')
}

function switchPages(id1,id2){
  const page1=document.getElementById(id1);
  document.getElementsByClassName(id1)[0].classList.remove("active");
  page1.style.display="none";
  const page2=document.getElementById(id2);
  document.getElementsByClassName(id2)[0].classList.add("active")
  console.log(page2);
  page2.style.display="block";
}
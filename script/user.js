const userObj=[]

function registerHandler() {

  const fname = document.getElementById("fname");
  localStorage.setItem("fname", fname.value);
  const lname = document.getElementById("lname");
  localStorage.setItem("lname", lname.value);
  //gender evaluation
  const genderByName = document.getElementsByName("gender");
  // console.log(genderByName);
  let gender=null;
  genderByName.forEach((sex)=>{
     if(sex.checked){
      gender=sex.value;
     }
  })
  // console.log(gender);
  localStorage.setItem("gender", gender);
  const username = document.getElementById("username");
  localStorage.setItem("username", username.value);
  const email = document.getElementById("email");
  localStorage.setItem("email", email.value);
  const password = document.getElementById("password");
  localStorage.setItem("password", password.value);
  const userReg={};
  userReg['fname']=fname.value;
  userReg['lname']=lname.value;
  userReg['gender']=gender;
  userReg['username']=username.value;
  userReg['email']=email.value;
  userReg['password']=password.value;
  userObj.push(userReg);
  console.log(userObj);

  //switching pages to login after registering
  switchPages('login')
}

function switchPages(id2){
  const currentActive = document.querySelector("nav a.active");
  currentActive.classList.remove("active");
  const className=currentActive.classList[0];
  document.getElementById(className).style.display = "none";
  // document.getElementsByClassName(id1)[0].classList.remove("active");
  // page1.style.display="none";
  const page2=document.getElementById(id2);
  document.getElementsByClassName(id2)[0].classList.add("active")
  // console.log(page2);
  page2.style.display="block";
}
const links = document.querySelectorAll('nav a');

links.forEach(link => {
  link.addEventListener('click', () => {
    const currentActive = document.querySelector('nav a.active');
    currentActive.classList.remove('active');
    let className=currentActive.classList[0];
    document.getElementById(className).style.display='none';
  
    className=link.classList[0];
    link.classList.add('active');
    document.getElementById(className).style.display='block';

  });
});


function registerHandler(event) {
    const registerForm=document.getElementById('registerForm');
    event.preventDefault();

    const formData=new FormData(registerForm);
    const fname=formData.get('fname');
    
    const lname=formData.get('lname');
    const gender=formData.get('gender');
    const username=formData.get('username')
    const email=formData.get('email')
    const password=formData.get('password')

    localStorage.setItem('fname', fname);
    localStorage.setItem('lname', lname);
    localStorage.setItem('gender', gender);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    document.getElementById('register').style.display='none';
    document.getElementById('login').style.display='block';

}
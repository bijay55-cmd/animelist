var menuappear = document.querySelector('.menubar')

menuappear.addEventListener('click', () => {
    document.querySelector('.navlink').classList.toggle('show');
})

//list of animes are shown in the container from the api
const api = 'https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&page=1';

function getMovies(url){
    
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })

}

getMovies(api);

var result = document.querySelector('.animeshow')


//creating each card by calling the title from api 
function showMovies(data){

    result.innerHTML = "";

    data.forEach(movie => {

       var card= `
       <img src="${movie.image_url}">
        `
      
        result.innerHTML += card;

    });

}

var createaccount = document.querySelector('.createaccount');

var haveaccount = document.querySelector('.haveaccount');

createaccount.addEventListener('click', () => {
    document.querySelector('.Signup').style.display="block";
    document.querySelector('.loginpage').style.display="none";
})

haveaccount.addEventListener('click', () => {
    document.querySelector('.Signup').style.display="none";
    document.querySelector('.loginpage').style.display="block";
})

var loginbtn = document.getElementById('loginbtn')
var signupbtn = document.getElementById('signupbtn')

loginbtn.addEventListener('click', () => {

var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

if(email == ''){
    alert ("Please enter your email")
}else if(password == ''){
    alert('Please enter your password')
}else if(!filter.test(email)){
alert('Enter a valid email id')
}else if(password.length < 6){
    alert('Password')
}
else{
    alert('Thank you for login')
}
})

signupbtn.addEventListener('click', () => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password2').value;
    var passwordcheck = document.getElementById('passwordcheck').value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    if(email == ''){
        alert ("Please enter your email")
    }else if(password == ''){
        alert('Please enter your password')
    }else if(!filter.test(email)){
    alert('Enter a valid email id')
    }else if(password.length < 6){
        alert('Password min is 6')
    }else if(password !== passwordcheck){
        alert('Please check your password again')
    }
    else{
        alert('Thank you for Signup')
        document.querySelector('.loginpage').style.display="block";
        document.querySelector('.Signup').style.display="none";
    }
    })

    function pwdcheck2() {
        var x = document.querySelectorAll(".pwd");
        for(var i=0; i< x.length; i++){
        if (x[i].type === "password") {
          x[i].type = "text";
        } else {
          x[i].type = "password";
        }
      }
      }
      
      function pwdcheck() {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
      
    var userlogin = document.getElementById('userlogin')

    userlogin.addEventListener('click', () => {
        document.querySelector('.loginform').style.display="block";
        document.querySelector('.mainpage').style.display="none";
    })


var homepage = document.getElementById('homepage');

homepage.addEventListener('click', () => {
    document.querySelector('.loginform').style.display="none";
    document.querySelector('.mainpage').style.display="block";
})


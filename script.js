//scrollbar nvabar bg-color change

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("navbar-Color").style.backgroundColor = "black";
      document.getElementById("navbar-Color").style.transition = "0.5s all";
    } else {
        document.getElementById("navbar-Color").style.backgroundColor = "transparent";
        document.getElementById("navbar-Color").style.transition = "0.5s all";
    }
}

//tabs page
function Tabspage(evt, Tabsname) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(Tabsname).style.display = "block";
    evt.currentTarget.className += " active";
  } 
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//anime page collection
//list of animes are shown in the container from the api
const apianime = 'https://api.jikan.moe/v3/search/anime?q=&order_by=members&sort=desc&page=1';

function slidemovies(url){
    
    fetch(url).then(res => res.json()).then(data => {
        resultmovies(data.results);
    })

}

slidemovies(apianime);

var result = document.querySelector('.animeshow')


//creating each card by calling the title from api 
function resultmovies(data){

    result.innerHTML = "";

    data.forEach(movie => {

       var card= `
       <img src="${movie.image_url}">
        `
      
        result.innerHTML += card;

    });

}


//account form

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

// anime collection

const apishow = 'https://api.jikan.moe/v4/seasons/2022/winter';

var container = document.querySelector('.animeshowlist');

var popup = document.querySelector('.movie-list');

function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
    showMovies(data.data);

    })
}
getMovies(apishow);

function showMovies(data){
    
    container.innerHTML = "";


        data.forEach((data) => {

            const movieEl = document.createElement('div');
            movieEl.classList.add('movieEl')
            
            movieEl.innerHTML = `
        
            <img src="${data.images.jpg.image_url}">
            <p>${data.title}</p>

            <div class="rating">
            <p>Rating</p>
            <p class="${getColor(data.score)}">${data.score}</p>
            </div>
            
            `
            
            container.appendChild(movieEl);
            
            movieEl.addEventListener('click', () => {
                showMovieInfo(data)
               
               document.querySelector('.movie-list').style.visibility="visible";
               document.querySelector('nav').style.visibility="hidden";
            })
        });
        
    

}

function getColor(score){
    if(score >= 7){
        return 'green';

    }else if(score >= 5){
        return 'orange';
    }else{
        return 'red';
    }

}

function moviedate(date){
    if(date !== null){
        return date.substring(0,10);
    }else{
        return '0';
    }
}


var container2 = document.querySelector('.movie-list')

function showMovieInfo(data){

    container2.innerHTML = "";

    
    const movieEl = document.createElement('div');
    movieEl.classList.add('movieEl')
    
    movieEl.innerHTML = `
    <img src="${data.images.jpg.image_url}">
    <p>${data.title}</p>
    <p>${data.synopsis}</p>
    <div class="date">
<p>Start Date: ${moviedate(data.aired.from)}</p>
<p>End Date: ${moviedate(data.aired.to)}</p>
</div>
<p>Type: ${data.type}</p>
<p>Full Episodes: ${data.episodes}</p>
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${data.trailer.youtube_id}"></iframe>
    
    <button class="close-btn">X</button>
    `
    
    container2.appendChild(movieEl);

    var closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        document.querySelector('.movie-list').style.visibility="hidden";
        document.querySelector('nav').style.visibility="visible";
        const iframes = document.getElementsByTagName('iframe');
        if(iframes !== null){
            for(let i=0; i<iframes.length; i++){
                iframes[i].src = iframes[i].src;
            }
        }
    })
}

const searchurl = "https://api.jikan.moe/v4/anime?q=";

var input = document.getElementById('input');

var form = document.getElementById('form');
//input search bar were user can search thier specific anime based on title
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const searchTerm = input.value;

    if(searchTerm ){
        getMovies(searchurl+searchTerm)
 
    }else{
        getMovies(apishow)

    }
})

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

const apishow = 'https://api.jikan.moe/v4/anime?q=duel';

const genres = [
    {
        'id':1,
        'name':'Action'
    },
    {
        'id':2,
        'name':'Adventure'
    },
    {
        'id':36,
        'name':'Slice of Life'
    },
    {
        'id':8,
        'name':'Drama'
    },
    {
        'id':43,
        'name':'Josei'
    },
    {
        'id':30,
        'name':'Sports'
    },
]

const searchurl = "https://api.jikan.moe/v4/anime?q=";

var input = document.getElementById('input');

var form = document.getElementById('form');
//input search bar were user can search thier specific anime based on title
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const searchTerm = input.value;


    if(searchTerm ){
        getMovies(searchurl+searchTerm)
        document.body.style.background="coral";
        document.querySelector('.genre').style.display="none";
        
        document.querySelector('.container2').style.display="grid";

        selectedGenre=[];
        
        const tags = document.querySelectorAll('.tag');

        tags.forEach(tag => {
            tag.classList.remove('highlight');
        })

        console.clear()
     
     
    }else{
        document.body.style.background="darkcyan";
        getMovies(v4anime)

        selectedGenre=[];
        
        document.querySelector('.genre').style.display="none";
       
        document.querySelector('.container2').style.display="grid";

        const tags = document.querySelectorAll('.tag');

        tags.forEach(tag => {
            tag.classList.remove('highlight');
        })

        console.clear()
    }
})
var v4anime = "https://api.jikan.moe/v4/seasons/upcoming"

var container2 = document.querySelector('.container2');

function getMovies(url){

    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.data);
        })

}

getMovies(v4anime);


function showMovies(data){

    container2.innerHTML = "";


    data.forEach((data) => {

        const movieEl = document.createElement('div');

        movieEl.classList.add('movieEl')
        
        movieEl.innerHTML = `
        <img src="${data.images.jpg.image_url}">
        <p >${data.title}</p>
        <div class="rating">
        <p>Rating</p>
        <p class="${getColor(data.score)}">${data.score}</p>
        </div>

        
        `
        
        container2.appendChild(movieEl);
        
        movieEl.addEventListener('click', () => {
            showMovieInfo(data)
            document.querySelector('nav').style.visibility="hidden";
            document.querySelector('.movie-list').style.visibility="visible";
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


var movielist = document.querySelector('.movie-list')

function showMovieInfo(data){

    movielist.innerHTML = "";

    var movieEl = document.createElement('div')

    movieEl.innerHTML = `
    
    <img class="Imganime" src="${data.images.jpg.image_url}">

    <p  class="titleanime">${data.title}</p>
    <p class="animedescription">${data.synopsis}</p>
    <div class="date">
    <p>Start Date: ${moviedate(data.aired.from)}</p>
    <p>End Date: ${moviedate(data.aired.to)}</p>
    </div>
    <p class="animetype">Type: ${data.type}</p>
    <p class="animeepisodes">Full Episodes: ${data.episodes}</p>
<button onclick="save()">Save</button>
    <iframe class="iframe" width="100%" height="400" src="https://www.youtube.com/embed/${data.trailer.youtube_id}"></iframe>
    
    
    <button class="close-btn">X</button>
    
    `

    movielist.appendChild(movieEl);

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


var genrecode = 'https://api.jikan.moe/v3/search/anime?q=&genre=';

var genre = 'https://api.jikan.moe/v3/search/anime?q=&genre=1';

var animeapi = 'https://api.jikan.moe/v3/search/anime?q=&page=1&genre=1,10&order_by=start_date&sort=desc';


var genre = document.querySelector('.genre');

function newanime(url){

    fetch(url).then(res => res.json()).then(data => {
        
        genre.innerHTML = "";

        if(data.results){

        data.results.forEach(movie => {

            var card = `
            
            <div class="card">
            <img class="btn" src="${movie.image_url}">
            <p>${movie.title}</p>
            <div class="rating">
        <p>Rating</p>
        <p class="${getColor(movie.score)}">${movie.score}</p>
        </div>

            <div class="info">
            <img src="${movie.image_url}">
            <p>${movie.title}</p>

            <p>${movie.synopsis}</p>
    <div class="date">
<p>Start Date: ${moviedate(movie.start_date)}</p>
<p>End Date: ${moviedate(movie.end_date)}</p>
</div>
<p>Type: ${movie.type}</p>
<p>Full Episodes: ${movie.episodes}</p>
<button class="closebtn">X</button>
</div>

            </div>
            
            `

            genre.innerHTML += card;
        
            const questions = document.querySelectorAll('.card');

            questions.forEach(function (question){
                
            const btn = question.querySelector('.btn');
    
            
            btn.addEventListener('click', function(){
    
        question.querySelector('.info').classList.toggle('show');
        document.querySelector('nav').style.visibility="hidden";

        var closebtn = question.querySelector('.closebtn')

        closebtn.addEventListener('click', function() {
            question.querySelector('.info').classList.remove('show');
            document.querySelector('nav').style.visibility="visible";
            
        })
            
            })
            })


            
        });
        }
    });

}
const tagsEl = document.getElementById('tags')

var selectedGenre = [];

function setGenre(){

tagsEl.innerHTML = '';

genres.forEach(genre => {

    const t = document.createElement('button');

t.classList.add('tag');

t.id = genre.id;

t.innerText = genre.name;

t.addEventListener('click', () => {

    if(selectedGenre.length == 0){
        selectedGenre.push(genre.id);
    }else{
        if(selectedGenre.includes(genre.id)){
            selectedGenre.forEach((id, idx) => {
                if(id == genre.id){
                    selectedGenre.splice(idx, 1)
                }
            })
        }else{
            selectedGenre.push(genre.id);
        }
        
    }
    highlightselect();
})
tagsEl.append(t);
})

}

setGenre()

function highlightselect(){

   const tags = document.querySelectorAll('.tag');

   tags.forEach(tag => {
       tag.classList.remove('highlight');
       console.clear();
   })

    if(selectedGenre.length !=0){
    selectedGenre.forEach(id => {
        const highlightedTag = document.getElementById(id);
        highlightedTag.classList.add('highlight')
        newanime(genrecode+selectedGenre.join(','))
        document.querySelector('.genre').style.display="grid";
       document.querySelector('.container2').style.display="none";
    })
}
}

var result = document.getElementById('result'); 
var input = document.getElementById('input');

//calling and grabbing the api from the site
const api = 'https://api.jikan.moe/v3';

const view = api + '/search/anime?q=letter';

var searchurl = api + '/search/anime?';


function getMovies(url){
    
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

getMovies(view);



//creating each card by calling the title from api 
function showMovies(data){

    result.innerHTML = "";

    data.forEach(movie => {


        var card = `
        
        
        <div class="card">


        <img class="img" src="${movie.image_url}">
<p>${movie.title}</p>

<div class="score">

<p>Rating</p>
<p class="${getColor(movie.score)}">${movie.score}</p>

</div>

<div class="info">${movie.synopsis}</div>

</div>

        `
      
        result.innerHTML += card;

        
        //info slide will pop up when user clicks on the card image
        const animecard = document.querySelectorAll('.card');

        animecard.forEach(function (question){
        const btn = question.querySelector('.img');
        
        
        btn.addEventListener('click', function(){
        
        animecard.forEach(function(item){
        if(item !== question){
            item.querySelector('.info').classList.remove('show');
        }
        
        })
            question.querySelector('.info').classList.toggle('show');
        })
        })
    })

}

//each rating is shown in different color based on popularity
function getColor(score){
    if(score >= 7){
        return 'green'
    }
    else if(score <=5 ){
        return 'orange'
    }
    else{
        return 'red';
    }
}

//input search bar were user can search thier specific anime based on title
input.addEventListener('keyup', () => {

    const searchTerm = input.value;
    if(searchTerm ){
        getMovies(searchurl+'q='+searchTerm)
        document.body.style.background="coral";
        
        
    }else{
        getMovies(view)
        document.body.style.background="darkcyan";
    }

})
var result = document.getElementById('result'); 
var input = document.getElementById('input');

//calling and grabbing the api from the site
const api = 'https://api.jikan.moe/v3';

const view = api + '/search/anime?q=letter';

var searchurl = api + '/search/anime?q=';

var genrecode = '/search/anime?q=&genre=';

var genreapi = api + genrecode;

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

        <div>
        <img class="img" src="${movie.image_url}">
        </div>

        <div>
        <p>${movie.title}</p>
        </div>
        
        
        <div class="score">
        <p>Rating</p>
        <p class="${getColor(movie.score)}">${movie.score}</p>
        </div>

        <div class="info">
        <button class="closebtn">close</button>

        <div>
        <img class="infoimg" src="${movie.image_url}">
        <br>
        <p>${movie.type}</p>
        </div>
        
        <br>
        
        <div class="dates">
        <p>Start Date:${moviedate(movie.start_date)}</p>
        <p>End Date:${moviedate(movie.end_date)}</p>
        </div>

        <br>
        
        <div>

        <p>Episodes ${movie.episodes}</p>
        <br>
        <p>${movie.synopsis}</p>

        </div>

        
        </div>
        

        </div>
        

        `
      
        result.innerHTML += (card);
        
        
        //info slide will pop up when user clicks on the card image
        const animecard = document.querySelectorAll('.card');
        
        animecard.forEach(function (animebtn){
            const btn = animebtn.querySelector('.img');
            
            const btn2 = animebtn.querySelector('button');
            
            
            
            
            btn.addEventListener('click', function(){
                
                
                animecard.forEach(function(item){
                    if(item !== animebtn){
                        item.querySelector('.info').classList.remove('show');
                    }
                })
                animebtn.querySelector('.info').classList.toggle('show');
                
                
            })
            
            btn2.addEventListener('click', function(){
                
                animecard.forEach(function(item){
                    if(item !== animebtn){
                        item.querySelector('.info').classList.remove('show');
            }
            
        })
        animebtn.querySelector('.info').classList.toggle('show');
            })
            
            
            
        })
        
    })
    
}


//start and end date format
function moviedate(date){
    if(date !== null){
        return date.substring(0,10);
    }
}

//each rating is shown in different color based on popularity
function getColor(score){
    if(score >= 7){
        return 'green'
    }
    else if(score <=5 ){
        return 'red'
    }
    else{
        return 'orange';
    }
}

//input search bar were user can search thier specific anime based on title
input.addEventListener('change', () => {

   

    const searchTerm = input.value;
    selectedGenre=[];


    if(searchTerm ){
        getMovies(searchurl+searchTerm)
        document.body.style.background="coral";
        selectedGenre=[];
        
        const tags = document.querySelectorAll('.tag');

        tags.forEach(tag => {
            tag.classList.remove('highlight');
        })
     
    }else{
        document.body.style.background="darkcyan";
        getMovies(view)
        
          const tags = document.querySelectorAll('.tag');

        tags.forEach(tag => {
            tag.classList.remove('highlight');
        })
    }

})

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
       getMovies(genreapi+selectedGenre.join(',')
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
   })

    if(selectedGenre.length !=0){
    selectedGenre.forEach(id => {
        const highlightedTag = document.getElementById(id);
        highlightedTag.classList.add('highlight')
        getMovies(genreapi+selectedGenre.join(','))
    })
}
}


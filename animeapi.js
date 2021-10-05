var menuappear = document.querySelector('.menubar')

menuappear.addEventListener('click', () => {
    document.querySelector('.navlink').classList.toggle('show');
})


var container = document.querySelector('.containerbox')

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


function display(url){

fetch(url).then(res => res.json()).then(json => {
container.innerHTML = "";
if(json.data){
    json.data.forEach(movie => {

var card = `

<div class="card">
<img class="img" src="${movie.images.jpg.image_url}">
<p>${movie.title}</p>

<div class="rating">
<p>Rating</p>
<p class="${getColor(movie.score)}">${movie.score}</p>
</div>

<div class="info">

<img class="infoimg" src="${movie.images.jpg.image_url}">
<p>Type: ${movie.type}</p>
<p>Full Episodes: ${movie.episodes}</p>
<p>Title: ${movie.title}</p>
<div class="date">
<p>Start Date: ${moviedate(movie.aired.from)}</p>
<p>End Date: ${moviedate(movie.aired.to)}</p>
</div>
<br>
<h2>Description</h2>
<p>${movie.synopsis}</p>
<p>Status: ${movie.status}</p>

<br>


<div>

</div> 
<button class="closebtn">Close</button>
</div>


</div>
`
container.innerHTML += card;


const questions = document.querySelectorAll('.card');

questions.forEach(function (question){
    
const btn = question.querySelector('.img');


const btn2 = question.querySelector('.closebtn')


btn.addEventListener('click', function(){

question.querySelector('.info').classList.toggle('show');

})

btn2.addEventListener('click', function(){

        question.querySelector('.info').classList.remove('show');

        const iframes = document.getElementsByTagName('iframe');
        if(iframes !== null){
            for(let i=0; i<iframes.length; i++){
                iframes[i].src = iframes[i].src;
            }
        }
    })

})

    })


}


})


}
display(apishow);

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

const searchurl = "https://api.jikan.moe/v4/anime?q=";

var input = document.getElementById('input');

var form = document.getElementById('form');
//input search bar were user can search thier specific anime based on title
form.addEventListener('submit', (e) => {

    e.preventDefault();

    const searchTerm = input.value;


    if(searchTerm ){
        display(searchurl+searchTerm)
        document.body.style.background="coral";
        document.querySelector('.containerbox').style.display="grid";
        document.querySelector('.container2').style.display="none";

        selectedGenre=[];
        
        const tags = document.querySelectorAll('.tag');

        tags.forEach(tag => {
            tag.classList.remove('highlight');
        })

        console.clear()
     
     
    }else{
        document.body.style.background="darkcyan";
        display(apishow)
           selectedGenre=[];
        
        document.querySelector('.containerbox').style.display="grid";
        document.querySelector('.container2').style.display="none";

        const tags = document.querySelectorAll('.tag');

        tags.forEach(tag => {
            tag.classList.remove('highlight');
        })

        console.clear()
    }
})

var genrecode = 'https://api.jikan.moe/v3/search/anime?q=&genre=';

var genre = 'https://api.jikan.moe/v3/search/anime?q=&genre=1';

var container2 = document.querySelector('.container2');

function newanime(url){

    fetch(url).then(res => res.json()).then(json => {
    container2.innerHTML = "";
    if(json.results){
        json.results.forEach(movie => {
    
    var card = `
    
    <div class="card">
    <img class="img" src="${movie.image_url}">
    <p>${movie.title}</p>
    
    <div class="rating">
    <p>Rating</p>
    <p class="${getColor(movie.score)}">${movie.score}</p>
    </div>
    
    <div class="info">
    <img class="infoimg" src="${movie.image_url}">
    <p>Type: ${movie.type}</p>
    <p>Full Episodes: ${movie.episodes}</p>
    <p>Title: ${movie.title}</p>
    <div class="date">
    <p>Start Date: ${moviedate(movie.start_date)}</p>
    <p>End Date: ${moviedate(movie.end_date)}</p>
    </div>
    <br>
    <h2>Description</h2>
    <p>${movie.synopsis}</p>

    
    
    <div>
    
    </div> 
    <button class="closebtn">Close</button>
    </div>
    
    </div>
    `
    container2.innerHTML += card;
    
    
    const questions = document.querySelectorAll('.card');
    
    questions.forEach(function (question){
        
    const btn = question.querySelector('.img');
    
    
    const btn2 = question.querySelector('.closebtn')
    
    
    btn.addEventListener('click', function(){
    
    question.querySelector('.info').classList.toggle('show');
    
    })
    
    btn2.addEventListener('click', function(){
    
            question.querySelector('.info').classList.remove('show');
        })
    
    
    })
    
        })
    
    
    }
    
    
    })
    
    
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
       document.querySelector('.containerbox').style.display="none";
         document.querySelector('.container2').style.display="grid";
    })
}
}



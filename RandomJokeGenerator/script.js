const joke = document.getElementById("joke");
const btn = document.getElementById("btn");
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"

let getJokes = function(){
    fetch(url).then(data => data.json()).then(item => (joke.innerHTML = item.joke));
}
btn.addEventListener("click",getJokes);
getJokes();
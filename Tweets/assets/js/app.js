const listTweets = document.getElementById('lista-tweets');
eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', addTweets);
    listTweets.addEventListener('click', delTweets);
    document.addEventListener('DOMContentLoaded', chargeLocalStorage);

}

function addTweets(e) {
    e.preventDefault();

    //Obtener el texto del tweet del textarea
    const tweet = document.getElementById('tweet').value;

    //Crear el boton de eliminar X
    const btnborrar = document.createElement('a');
    btnborrar.classList = 'borrar-tweet';
    btnborrar.innerText = 'X';

    //Crear los li de la lista con los tweets 
    const list = document.createElement('li');
    list.innerText = tweet;

    //Agregar el boton de eliminar al li con el tweet 
    //Agregar los li a la lista de tweets
    list.appendChild(btnborrar);
    listTweets.appendChild(list);

    //Agregar los tweets a local storage
    addTweetLoclStorage(tweet);

}

function delTweets(e) {
    e.preventDefault();

    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        delTweetLocalStorage(e.target.parentElement.innerText)
    }
}

function addTweetLoclStorage(tweet) {
    let tweets;
    tweets = getTweetLocalStorage();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));

}
//Comprobar que hayan elementos en local storage
function getTweetLocalStorage() {
    let tweets;
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }
    return tweets;
}

function chargeLocalStorage() {
    let tweets;
    tweets = getTweetLocalStorage();
    tweets.forEach(tweet => {
        const btnborrar = document.createElement('a');
        btnborrar.classList = 'borrar-tweet';
        btnborrar.innerText = 'X';

        //Crear los li de la lista con los tweets 
        const list = document.createElement('li');
        list.innerText = tweet;

        //Agregar el boton de eliminar al li con el tweet 
        //Agregar los li a la lista de tweets
        list.appendChild(btnborrar);
        listTweets.appendChild(list);
    });
}

function delTweetLocalStorage(tweet) {
    let tweets, tweetWithotX;
    tweetWithotX = tweet.substring(0, tweet.length - 1);
    tweets = getTweetLocalStorage();
    tweets.forEach((lala, index) => {
        if (tweetWithotX === lala) {
            tweets.splice(index, 1);
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));

}
// Variables
const tweetsList = document.getElementById('lista-tweets');

// Event Listeners
eventListeners();

function eventListeners() {
  //Cuando se envia el formulario
  document.querySelector('#formulario').addEventListener('submit', addTweet);
  // Borrar Tweets
  tweetsList.addEventListener('click', deleteTweet);
  // Contenido cargado
  document.addEventListener('DOMContentLoaded', localStorageReady);
}

// Funciones
// Añadir tweet del formulario
function addTweet(e) {
  e.preventDefault();
  // leer el valor del textarea
  const tweet = document.getElementById('tweet').value;

  // crear boton de eliminar
  const btnDelete = document.createElement('a');
  btnDelete.classList = 'borrar-tweet';
  btnDelete.innerText = 'X';

  // Crear elemento y añadirle el contenido a la lista
  const li = document.createElement('li');
  li.innerText = tweet;

  // añade el botón de borrar al tweet
  li.appendChild(btnDelete);

  // añade el tweet a la lista
  tweetsList.appendChild(li);

  //llamada a la funcion de Añadir a Local Storage
  addTweetLocalStorage(tweet);
}

// Elimina el Tweet del DOM
function deleteTweet(e) {
  e.preventDefault();
  if(e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    //pasamos parametro y llamamos a la funcion Borrar tweet de local storage
    deleteTweetLocalStorage(e.target.parentElement.innerText);
  }
}

// Mostrar datos de LocalStorage en la lista al entrar en la pagina
function localStorageReady() {
  let tweets;
  //tweets es igual al array de tweets en local Storage
  tweets = getTweetsLocalStorage();

  //creamos la lista a mostrar
  tweets.forEach(function(tweet) {
    // crear boton de eliminar
    const btnDelete = document.createElement('a');
    btnDelete.classList = 'borrar-tweet';
    btnDelete.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;

    // añade el botón de borrar al tweet
    li.appendChild(btnDelete);

    // añade el tweet a la lista
    tweetsList.appendChild(li);
  });
}

// Agrega tweet a local storage
function addTweetLocalStorage(tweet) {
  let tweets;
  // tweets es igual al array de tweets de local storage
  tweets = getTweetsLocalStorage();

  // Añadir el nuevo tweet al array de tweets
  tweets.push(tweet);

  // Convertir de string a arreglo para local storage
  localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function getTweetsLocalStorage() {
  let tweets;

  // Revisamos los valoes del local storage
  if(localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets') );
  }
  return tweets;
}

//Eliminar tweet de local Storage
function deleteTweetLocalStorage(tweet){
  let tweets, tweetDelete ;
  //necesitamos borrar la "X" del boton eliminar
  tweetDelete = tweet.substring(0, tweet.length - 1);

tweets = getTweetsLocalStorage();

tweets.forEach(function(tweet, index) {
  if(tweetDelete === tweet){
    tweets.splice(index, 1);
  }
});
localStorage.setItem('tweets', JSON.stringify(tweets));
}

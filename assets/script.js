var userSearch = ""
var searchHistory = []
var watchModeID = ""
var searchList = document.getElementById('search-list')
var movieQuote = document.getElementById('movie-quote')
var movieQuotePerson = document.getElementById('movie-quote-person')
var movieTitle = document.getElementById('movie-title')
var titleMovie = document.getElementById('title-movie')
var movieRating = document.getElementById('ratings')
var movieSummary = document.getElementById('movie-summary')
var moviePoster = document.getElementById('movie-poster')
var movieAvailability = document.getElementById('movie-availability')
var embeddedTrailer = document.getElementById('embedded-trailer')
var welcomeInfo = document.getElementById('welcome-info')
var apiInfo = document.getElementById('api-info')
var noMovieInput = document.getElementById('no-movie-input')
var alertButton = document.getElementById('alert-button')
var searchBar = document.getElementById('search-bar')
var trailerButton = document.getElementById('trailer-button')
const movieList = document.getElementById("movie-list")

//Get User Input
document.getElementById('search_button').addEventListener('click', userInputComplete)
document.getElementById('search_field').addEventListener('keyup', (e) => e.target.value=e.target.value.trimStart())
$('#search-bar').on('submit', (e) => {e.preventDefault(); return false})


saveSearchHistory()

function userInputComplete(e) {
  e.preventDefault()
    userSearch = document.getElementById('search_field').value
    userSearch = userSearch.trim()

  if (userSearch.length > 0) {
    saveSearchHistory()
    callWatchMode()
  }
  else {
    return noMovieInput.classList.remove('hidden')
  }
}

/*API Calls*/
//WatchMode API Calls
async function callWatchMode() {
  const movieInfoData = getFromCache(userSearch)
  if (movieInfoData) {
    updateSearch(movieInfoData)
  } else {
    const url = (
      'https://api.watchmode.com/v1/autocomplete-search/?apiKey=41QN8oF7JAPUWkq9b0E7Cryxq3hozhGm3Mmr8j6T&' +
      new URLSearchParams({ 
        search_value: userSearch, 
        search_type: 1 }).toString()
    );
    const result = await fetch(url)
      .then(response => response.json())
      .then(function(response) {
        if (response.results.length > 0) {
          var item = response.results[0]
            watchModeID = item.id
          watchModeTitleInfoCall()
        }
    })
  }
}

async function watchModeTitleInfoCall() {
  const url = (
    'https://api.watchmode.com/v1/title/' + watchModeID + '/details/?apiKey=41QN8oF7JAPUWkq9b0E7Cryxq3hozhGm3Mmr8j6T'
    );
  const result = await fetch(url)
    .then(response => response.json())
    .then(function(response) {
      updateSearch(response)
      }
  )
}

function updateSearch(watchModeItem) {
  movieTitle.innerHTML = watchModeItem.title
  titleMovie.innerHTML = watchModeItem.title
  movieRating.innerHTML = watchModeItem.user_rating
  movieSummary.innerHTML = watchModeItem.plot_overview
  moviePoster.src = watchModeItem.poster
  //whereToWatch = watchModeItem.sources.name
  //whereToWatchLink= watchModeItem.sources.web_url
  embeddedTrailer.src = watchModeItem.trailer.replace('watch?v=', 'embed/')
  
  if (watchModeItem.trailer == "") {
    trailerButton.classList.add('hidden')
  } else {
    trailerButton.classList.remove('hidden')
  }
  getMovieQuoteCall()
  hideShowInfo()
  saveToCache(userSearch, watchModeItem)
}

function saveToCache(userSearch, watchModeItem) {
  var cache = localStorage.getItem('cachedMovies')
  if (cache) {
    cache = JSON.parse(cache)
  } else {
    cache = {}
  }
  cache[userSearch.toLowerCase()] = watchModeItem
  console.log(cache)
  localStorage.setItem('cachedMovies', JSON.stringify(cache))
}

function getFromCache(userSearch) {
  var cache = localStorage.getItem('cachedMovies')
  if (cache) {
    cache = JSON.parse(cache)
  } else {
    cache = {}
  }
  console.log(cache)
  return cache[userSearch.toLowerCase()]
}

//MovieQuote API Call
async function getMovieQuoteCall() {
const options = {
	method: 'GET',
	headers: {
		Authorization: 'Token token=5HRYr2S7rgwZVzqbxM5uNAtt',
	}
};
fetch('https://moviequotes.rocks/api/v1/quotes?movie=' + userSearch, options)
	.then(quoteResponseItem => quoteResponseItem.json())
  .then(function(quoteResponseItem) {
    if(quoteResponseItem.length > 0){
        movieQuote.innerHTML = quoteResponseItem[0].content
        movieQuotePerson.innerHTML = quoteResponseItem[0].character.name
      }
      else hideQuoteBox()
  })
  .catch(err => console.error(err));
}

function hideQuoteBox() {
  movieQuote.style.visibility = 'hidden'
  movieQuotePerson.style.visibility = 'hidden'
  document.getElementById('quote-header').style.visibility = 'hidden'
}

function hideShowInfo() {
  welcomeInfo.classList.add('hidden');
  apiInfo.classList.remove('hidden');
}

//Local Storage Stuff

//$(".submit").on("click", function() {
//     var value = $(this).siblings("#search-list").val();
//     var searchedMovies= $(this).parent().attr("id");
//     localStorage.setItem(searchedMovies, value);
// })

// $("#search-list #searched-Movies").val(localStorage.getItem("search-list"));

function saveSearchHistory() {


  if(localStorage["searchHistory"]) {
    searchHistory = JSON.parse(localStorage['searchHistory']);
     console.log(searchHistory);
  }
  if(searchHistory.indexOf(search_field.value) == -1) {
      searchHistory.unshift(userSearch);
  if(searchHistory.length > 10) {
          searchHistory.pop();
      }
      localStorage['searchHistory'] = JSON.stringify(searchHistory);
  }
  

  movieList.innerHTML = searchHistory
  .map( userSearch => {
      return `<li class="search-results"><a>${userSearch}</a><li>`;
  })
  .join("");

  $('li a', userSearch).on('click', (e) => {
    $('#search_field').val(e.target.innerText)
    userSearch = e.target.innerText
    callWatchMode()
    console.log(e.target)
  })

  } 


  /*function getItems() {
    searchList = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchList !== null) {
        searchHistory = searchList;
    };
    for (i = 0; i < searchHistory.length; i++) {
        if (i == 10) {
            break;
        }
    }
} */



  /*function handleFormSubmit(event) {
    event.preventDefault(); 
    var movieItem = $('input[name="search_filed"]').val();
    if(!movieItem) {
      console.log('Nothing entered in search bar');
      return;
    }
    var movieListEl = $('<li>');
    movieListEl.text(movieItem);

  } */
  
  /*$(".submit").on("click", function(){
    var list = $(this).children("#search_filed").val();
    var search = $(this).parent().attr("id");
    localStorage.setItem(search, list);
      
  } )
  
  $("#search_field #searched-movies").val(localStorage.getItem(".movie-list")); */


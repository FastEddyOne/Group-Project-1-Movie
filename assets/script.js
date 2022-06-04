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
const movieList = document.getElementById("movie-list")
/*var movieQuote = REPLACEME //This comes from MovieQuotesAPI*/


saveSearchHistory();

//Get User Input
document.getElementById('search_button').addEventListener('click', userInputComplete)

function userInputComplete(e) {
  e.preventDefault()
    userSearch = document.getElementById('search_field').value
      console.log(userSearch)
  if (userSearch.length > 0) {
    saveSearchHistory()
    callWatchMode()
    noMovieInput.classList.add('hidden')
  }
  else {
    console.log("No User Input")
    return noMovieInput.classList.remove('hidden')
  }
}


/*API Calls*/
//WatchMode API Call
async function callWatchMode() {
  const url = (
    'https://api.watchmode.com/v1/autocomplete-search/?apiKey=41QN8oF7JAPUWkq9b0E7Cryxq3hozhGm3Mmr8j6T&' +
    new URLSearchParams({ 
      search_value: userSearch, 
      search_type: 1 }).toString()
  );

  const result = await fetch(url)
    .then(response => response.json())
    .then(function(response) {
      console.log(response)
      if (response.results.length > 0) {
        var item = response.results[0]
          watchModeID = item.id //This comes from Watchmode
            console.log(item)
            console.log(item.id)
        watchModeTitleInfoCall()
      }
  })
}

async function watchModeTitleInfoCall() {
  const url = (
    'https://api.watchmode.com/v1/title/' + watchModeID + '/details/?apiKey=41QN8oF7JAPUWkq9b0E7Cryxq3hozhGm3Mmr8j6T'
    );
  
    
  const result = await fetch(url)
    .then(response => response.json())
    .then(function(response) {
      //console.log(response)
      var watchModeItem = response
        movieTitle.innerHTML = watchModeItem.title 
        titleMovie.innerHTML = watchModeItem.title
        movieRating.innerHTML = watchModeItem.user_rating //This comes from.user_rating //This comes from watchmode
        movieSummary.innerHTML = watchModeItem.plot_overview //This comes from Watchmode
        moviePoster.src = watchModeItem.poster //This comes from watchmode
        
        //whereToWatch = watchModeItem.sources.name //This comes from Watchmode
        //whereToWatchLink= watchModeItem.sources.web_url //This comes from Watchmode
        embeddedTrailer.src = watchModeItem.trailer.replace('watch?v=', 'embed/') //This comes from Watchmode, turns the link to video to embed
        console.log(watchModeItem);
        getMovieQuoteCall()
        hideShowInfo()
      }
  )
}





//MovieQuote API Call
async function getMovieQuoteCall() {
const options = {
  movie: userSearch,
	method: 'GET',
	headers: {
		Authorization: 'Token token=5HRYr2S7rgwZVzqbxM5uNAtt',
	}
};

fetch('https://moviequotes.rocks/api/v1/quotes', options)
	.then(response => response.json())
  .then(function(response) {
    var quoteResponseItem = (response)    
        movieQuote.innerHTML = quoteResponseItem.content
        movieQuotePerson.innerHTML = quoteResponseItem.character
          console.log(quoteResponseItem)
      }
  )

  .catch(err => console.error(err));
}

function hideShowInfo() {
  welcomeInfo.classList.add('hidden');
  apiInfo.classList.remove('hidden');
}

//Local Storage Stuff

//Local Storage Stuff


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
      return `<li class="search-results">${userSearch}<li>`;
  })
  .join("");

  } 




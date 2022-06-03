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

//Get User Input
document.getElementById('search_button').addEventListener('click', userInputComplete)
function userInputComplete(e) {
  e.preventDefault()
    userSearch = document.getElementById('search_field').value
      console.log(userSearch)
  if (userSearch.length > 0) {
    saveSearchHistory()
    callWatchMode()
  }
  else {
    console.log("No User Input")
  }
}


/*API Calls*/
//WatchMode API Call
async function callWatchMode() {
  const url = (
    'https://api.watchmode.com/v1/autocomplete-search/?apiKey=R4p1DztdqOo4OnAVqProfjk203wluPqWA2esGkj0&' +
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
    'https://api.watchmode.com/v1/title/' + watchModeID + '/details/?apiKey=R4p1DztdqOo4OnAVqProfjk203wluPqWA2esGkj0'
    );
    
  const result = await fetch(url)
    .then(response => response.json())
    .then(function(response) {
      //console.log(response)
      var watchModeItem = response
        movieTitle.innerHTML = watchModeItem.title 
        titleMovie.innerHTML = watchModeItem.title
        movieRating.innerHTML = watchModeItem.user_rating 
        movieSummary.innerHTML = watchModeItem.plot_overview
        moviePoster.src = watchModeItem.poster 
        //whereToWatch = watchModeItem.sources.name
        //whereToWatchLink= watchModeItem.sources.web_url
        movieTrailer = watchModeItem.trailer 
          console.log(watchModeItem);
        getMovieQuoteCall()
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

fetch('https://movie-quotes-app.herokuapp.com/api/v1/quotes', options)
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
}
//$(".submit").on("click", function(){
    
//} )

// $("#search-list").val(localStorage.getItem("search-list"));
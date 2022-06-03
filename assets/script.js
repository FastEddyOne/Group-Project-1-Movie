//Variable Placeholders
var userSearch = ""
var searchHistory = []
var watchModeID = ""
var searchList = document.getElementById('search-list')
var movieQuote = document.getElementById('movie-quote')
var movieTitle = document.getElementById('movie-title')
var titleMovie = document.getElementById('title-movie')
var movieRating = document.getElementById('ratings')
var movieSummary = document.getElementById('movie-summary')
var moviePoster = document.getElementById('movie-poster')
var movieAvailability = document.getElementById('movie-availability')
var embeddedTrailer = document.getElementById('embedded-trailer')
/*var movieQuote = REPLACEME //This comes from MovieQuotesAPI*/

document.getElementById('search_button').addEventListener('click', userInputComplete)
function userInputComplete(e) {
  e.preventDefault()
  userSearch = document.getElementById('search_field').value
  console.log(userSearch)
  if (userSearch.length > 0) {
    saveSearchHistory()
    doAsyncTask()
  }
  else {
    console.log("No User Input")
  }
}


/*//Watchmode API Refactored*/
async function doAsyncTask() {
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
        watchModeID = item.id //This comes from watchmode
        console.log(item)
        console.log(item.id)
        movieInfo()
      }
  })
  console.log('Fetched from: ' + url);
  //console.log(result);
}

async function movieInfo() {
  const url = (
    'https://api.watchmode.com/v1/title/' + watchModeID + '/details/?apiKey=R4p1DztdqOo4OnAVqProfjk203wluPqWA2esGkj0'
    );
    
  const result = await fetch(url)
    .then(response => response.json())
    .then(function(response) {
      //console.log(response)
      var watchModeItem = response
        movieTitle.innerHTML = watchModeItem.title //This comes from watchmode
        titleMovie.innerHTML = watchModeItem.title
        movieRating.innerHTML = watchModeItem.user_rating //This comes from.user_rating //This comes from watchmode
        movieSummary.innerHTML = watchModeItem.plot_overview //This comes from Watchmode
        moviePoster.src = watchModeItem.poster //This comes from watchmode
        //whereToWatch = watchModeItem.sources.name //This comes from Watchmode
        //whereToWatchLink= watchModeItem.sources.web_url //This comes from Watchmode
        embeddedTrailer.src = watchModeItem.trailer.replace('watch?v=', 'embed/') //This comes from Watchmode, turns the link to video to embed
        console.log(watchModeItem);
      }
  )
  console.log('Fetched from: ' + url);
  
}

//doAsyncTask(); Triggers api on page load 
//Movie Quotes API --- Got API Key, and response working. Still need to pass in userSearch for movie title
/*const options = {
  movie: userSearch,
	method: 'GET',
	headers: {
		Authorization: 'Token token=5HRYr2S7rgwZVzqbxM5uNAtt',
	}
};

fetch('https://movie-quotes-app.herokuapp.com/api/v1/quotes?movie=', options)
	.then(response => response.json())
  .then(function(response) {
      console.log(response)
      if (response.results.length > 0) {
        var item = response.results[0]
        movieTitle = item.name //This comes from watchmode
        movieRating = item.user_rating //This comes from watchmode
        movieSummary = item.plot_overview //This comes from Watchmode
        moviePoster = item.image_url //This comes from watchmode
        whereToWatch = item.sources //This comes from Watchmode
        movieTrailer = item.trailer //This comes from Watchmode
        console.log(item)
      }
  })
  
	.catch(err => console.error(err));
*/
  

function searchInputChanged() {
	console.log("searchInputChanged");
  }

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
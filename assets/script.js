//Variable Placeholders
var userSearch = "Star Wars"
/*var movieTitle = results.name //This comes from watchmode
var movieRating = results.user_rating //This comes from watchmode
var movieSummary = results.plot_overview //This comes from Watchmode
var moviePoster = results.image_url //This comes from watchmode
var whereToWatch = results.sources //This comes from Watchmode
var movieTrailer = results.trailer //This comes from Watchmode
var movieQuote = REPLACEME //This comes from MovieQuotesAPI
*/

/*//Watchmode API Refactored
/*Testing Refactored API Functions -Eddie*/
async function doAsyncTask() {
  const url = (
    'https://api.watchmode.com/v1/autocomplete-search/?apiKey=R4p1DztdqOo4OnAVqProfjk203wluPqWA2esGkj0&' +
    new URLSearchParams({ 
      search_value: userSearch, 
      search_type: 1 }).toString()
  );

  const result = await fetch(url)
    .then(response => response.json());

  console.log('Fetched from: ' + url);
  console.log(result);
}

doAsyncTask();

//Movie Quotes API --- Got API Key, and response working. Still need to pass in userSearch for movie title
const options = {
  movie: userSearch,
	method: 'GET',
	headers: {
		Authorization: 'Token token=5HRYr2S7rgwZVzqbxM5uNAtt',
	}
};

fetch('https://movie-quotes-app.herokuapp.com/api/v1/quotes?movie=', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

  
/*This function is just a test to see if the input has changed on the search form -Eddie */
function searchInputChanged() {
	console.log("searchInputChanged");
  }

  /*WE NEED TO FIGURE OUT HOW TO PULL IN THE USER INPUTTED TEXT AND PASS IT INTO THE GLOBAL VARIABLE "userSearch" -Eddie */


//$(".submit").on("click", function() {
//     var value = $(this).siblings("#search-list").val();
//     var searchedMovies= $(this).parent().attr("id");
//     localStorage.setItem(searchedMovies, value);
// })

// $("#search-list #searched-Movies").val(localStorage.getItem("search-list"));

var searchHistory = [];

if(localStorage["searchHistory"]) {
  searchHistory = JSON.parse(locatStorage['searchHistory']);
   console.log(searchHistory);
}
if(searchHistory.indexOf(search_field.value) == -1) {
    searchHistory.unshift(search);
if(searchHistory.length > 10) {
        searchHistory.pop();
    }
    localStorage['searchHistory'] = JSON.stringify(searchHistory);
}
//$(".submit").on("click", function(){
    
//} )

// $("#search-list").val(localStorage.getItem("search-list"));
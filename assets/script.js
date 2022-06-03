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


let url = 'https://api.watchmode.com//v1/title/345534/details/?apiKey=R4p1DztdqOo4OnAVqProfjk203wluPqWA2esGkj0';
    
fetch(url, { method: 'Get' })
     .then((res) => res.json())
     .then((json) => {
        console.log(json);
    });    

  
/*This function is just a test to see if the input has changed on the search form -Eddie */
function searchInputChanged() {
	console.log("searchInputChanged");
  }

  /*WE NEED TO FIGURE OUT HOW TO PULL IN THE USER INPUTTED TEXT AND PASS IT INTO THE GLOBAL VARIABLE "userSearch" -Eddie */

/* local storage */
$(".submit").on("click", function() {
    var value = $(this).siblings("search_field").val();
    var movies = $(this).parent().attr("id");
    localStorage.setItem(movies, value);
})



//Variable Placeholders
var userSearch = userSearchInput //Search Value Placeholder
var movieTitle = results.name //This comes from watchmode
var movieRating = results.user_rating //This comes from watchmode
var movieSummary = results.plot_overview //This comes from Watchmode
var moviePoster = results.image_url //This comes from watchmode
var whereToWatch = results.sources //This comes from Watchmode
var movieTrailer = results.trailer //This comes from Watchmode
var movieQuote = REPLACEME //This comes from MovieQuotesAPI

//Watchmode API
fetch('https://api.watchmode.com/v1/autocomplete-search/?apiKey=R4p1DztdqOo4OnAVqProfjk203wluPqWA2esGkj0' + '&search_value=Breaking%20bad&search_type=1') //This is just a default search from Watchmode Autocomplete search using our API Key - search_type=1 will return both tittles and people in the results
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

document.getElementById('search_field').value = ''; //Placeholder for search field

function userSearch() {

};

function startSearch() {
    document.getElementById('search_button').addEventListener('click')
    userSearchInput(document.getElementById('search_field').value)
    console.log(userSearch)
}   //This is just a test/placeholder function experimenting with logic


//Movie Quotes API 
const options = {
	method: 'GET',
	headers: {
		Authorization: 'Token token=yd8WzkWNEEzGtqMSgiZBrwtt',
		'X-RapidAPI-Host': 'juanroldan1989-moviequotes-v1.p.rapidapi.com',
		'X-RapidAPI-Key': '6f6dc5803cmsh078b476bc8fb6c4p10615ajsnd51b1ddcc2c7'
	}
};

fetch('https://juanroldan1989-moviequotes-v1.p.rapidapi.com/api/v1/quotes?actor=Al%20Pacino', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


 $(".submit").on("click", function() {
     var = value = $(this).siblings("#search-list").val();
     var searchedMovies = $(this).parent().attr("id");
     localStorage.setItem(searchedMovies, value);
 })

 $("#search-list").val(localStorage.getItem("search-list"));

//if(localStorage["searchHistory"]) {
  //  searchHistory = JSON.parse(locatStorage['searchHistory']);
    //console.log(searchHistory);
//}
//if(searchHistory.indexOf(search) == -1) {
  //  searchHistory.unshift(search);
    //if(searchHistory.length > 10) {
//        searchHistory.pop();
//    }
//    localStorage['searchHistory'] = JSON.stringify(searchHistory);
//}
//$(".submit").on("click", function(){
    
//} )

// $("#search-list").val(localStorage.getItem("search-list"));   

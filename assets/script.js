var searchHistory = [];

if(localStorage["searchHistory"]) {
    searchHistory = JSON.parse(locatStorage['searchHistory']);
}
if(searchHistory.indexOf(search) == -1) {
    searchHistory.unshift(search);
    if(searchHistory.length > 10) {
        searchHistory.pop();
    }
    localStorage['searchHistory'] = JSON.stringify(searchHistory);
}
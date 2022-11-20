"use strict";

// ---------
// display 50 shows
// ---------

function show50shows() {
    fetch('https://api.tvmaze.com/shows')
        .then((response) => response.json())
        .then((shows) => filterResults(shows, 50))
        // ovako kad se parametar samo prosledjuje moze da se i izostavi npr ".then(displayShows)"
        .then((filteredShows) => displayShows(filteredShows));
}

function filterResults(results, num) {
    if (results.length >= num) {
        return results.slice(0, num);
    }

    return results;
}

function displayShows(shows) {
    // todo: prikazi serije na strani, ja ih ovde samo listam

    console.log(shows.reduce((acc, show, ind) => `${acc} ${ind}. ${show.name} ${show.id} ${show.image}` + "\n", ""));
}

// run!!
//show50shows();

// ---------
// display show details
// ---------

function showDetails(id) {
    fetch('https://api.tvmaze.com/shows/' + id)
        .then((response) => response.json())
        .then(filterShows)
        .then(displayShowDetails); // .then((showData) displayShowDetails(showData));
}

function displayShowDetails(show) {
    console.log(`${show.name} ${show.id} ${show.image.medium}`);
}

// run!!
//showDetails(5);

// ---------
// display 10 search results
// ---------

function searchShows(input) {
    fetch('https://api.tvmaze.com/search/shows?q=' + input)
        .then((response) => response.json())
        .then((results) => filterResults(results, 10))
        .then((filteredResults) => displaySearchResults(filteredResults));
}

function displaySearchResults(searchResults) {
    displayShows(
        searchResults.map((result) => result.show));
}

// run!!
// searchShows("Blood");

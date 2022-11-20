"use strict";

(function () {
    console.log("Hi!");
})();


function Genre(ime) {

    this.name = ime;
}

Genre.prototype.getData = function () {
    const firstLetter = this.name.charAt(0);
    const lastLetter = this.name.charAt(this.name.length - 1);

    return (firstLetter + lastLetter).toUpperCase();
}

function Movie(title, genre, length) {

    this.genre = genre;
    this.title = title;
    this.length = length;
}

Movie.prototype.getData = function () {

    return `${this.title}, ${this.length}, ${this.genre.getData()}`;
}

/**
 * 
 * @param {string} date Date in following format `year-month-day` for example 2022-11-20
 * @param {Array.<Movie>} listOfMovies List of movies
 * @param {number} totalMovies Total number of movies
 */
function Program(date, listOfMovies = [], totalMovies = 0) {

    this.date = new Date(date);
    // this.listOfMovies = listOfMovies || []; 2. nacin
    this.listOfMovies = listOfMovies;
    this.totalMovies = totalMovies;
}

Program.prototype.addMovie = function (movie) {

    // za dodavanje u key, mora ispred THIS
    this.totalMovies = this.listOfMovies.push(movie);
}

Program.prototype.getData = function () {

    const sumLength = this.listOfMovies.reduce(
        (accumulator, movie) => accumulator + movie.length,
        0);

    const printMovies = this.listOfMovies.reduce(
        (accumulator, movie) => accumulator + "\t" + movie.getData() + "\n",
        "");

    return `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}, `
        + `program length from all the movies is ${sumLength}min \n${printMovies}`
}

function Festival(name, listOfPrograms = [], numberOfMoviesInAllPrograms = 0) {

    this.name = name;
    this.listOfPrograms = listOfPrograms;
    this.numberOfMoviesInAllPrograms = numberOfMoviesInAllPrograms;
}

Festival.prototype.addProgram = function (program) {

    this.listOfPrograms.push(program);
    this.numberOfMoviesInAllPrograms += program.totalMovies;
}

Festival.prototype.getData = function () {

    const sumMovies = this.listOfPrograms.reduce(
        (accumulator, program) => accumulator + program.totalMovies,
        0); // must set initial value to get primitive value result, returns object otherwise

    const sumPrograms = this.listOfPrograms.reduce(
        (accumulator, program) => accumulator + "\t" + program.getData() + "\n",
        "");

    return `${this.name} festival has ${sumMovies} movie titles \n${sumPrograms}`;
}

function createMovie(title, genre, length) {
    return new Movie(title, new Genre(genre), length)
}

function createProgram(date) {
    return new Program(date);
}

const noviFilm = createMovie("titanik", "romance", 200);
const mara = createMovie("Marija", "action", 190);
const nemanja = createMovie("Nemanja", "romantic", 90);
const marko = createMovie("Marko", "drama", 50);

const exit = createProgram("2022-07-15");
const fest = createProgram("2022-07-16");

const leto = new Festival("leto");

exit.addMovie(mara);
exit.addMovie(nemanja);
fest.addMovie(marko);

leto.addProgram(exit);
leto.addProgram(fest);

console.log(leto.getData());

"use strict";

(function () {
    console.log("Hi!");
})();


function Genre(ime) {

    this.name = ime;

}

function Movie(title, ime, length) {

    Genre.call(this, ime);

    this.title = title;
    this.length = length;

}

Movie.prototype = Object.create(Genre.prototype);
Movie.prototype.constructor = Movie;



function Program(date, listOfMovies = [], totalMovies = 0) {
    this.date = new Date();
    // this.listOfMovies = listOfMovies || []; 2. nacin
    this.listOfMovies = listOfMovies;
    this.totalMovies = totalMovies;
}



function Festival(name, listOfPrograms = [], numberOfMoviesInAllPrograms = 0) {
    this.name = name;
    this.listOfPrograms = listOfPrograms;
    this.numberOfMoviesInAllPrograms = numberOfMoviesInAllPrograms;
}

Genre.prototype.getData = function () {
    //   let firstLetter = this.name[0];
    //   let lastLetter = this.name[this.name.length-1];
    //   let result = firstLetter + lastLetter;
    //   return result;

    //   return (this.name[0] + this.name[this.name.length-1]).toUpperCase();

    return (this.name.charAt(0) + this.name.charAt(this.name.length - 1)).toUpperCase();
}



Movie.prototype.getData = function () {

    // pri dodavanju jedne metode u drugu moramo koristiti: ime konstruktroske funkcije + prototip + ime funkcije + call + this u zagradi
    return `${this.title}, ${this.length}, ` + Genre.prototype.getData.call(this);

}


Program.prototype.addMovie = function (Movie) {

    // za dodavanje u key, mora ispred THIS
    return this.listOfMovies.push(Movie);
}



Festival.prototype.addProgram = function (Program) {
    return this.listOfPrograms.push(Program)
}


Program.prototype.getData = function () {

    let sumLength = 0;

    for (let i = 0; i < this.listOfMovies.length; i++) {
        //pravimo varijablu koja sadrzi sve mouvije i njihove metode, zatim koristimo key length iz liste objekata.
        let movie = this.listOfMovies[i];
        sumLength = sumLength + movie.length;

    }

    let printMovies = "";

    for (let i = 0; i < this.listOfMovies.length; i++) {
        //pravimo varijablu koja sadrzi sve mouvije i njihove metode, zatim koristimo metodu koju smo pomocu prototipa vec vezali za nasu konstr funkciju Movie.
        let movie = this.listOfMovies[i];
        printMovies += "\t" + movie.getData() + "\n";
    }


    return `${this.date.getDate()}.${this.date.getMonth() + 1}.${this.date.getFullYear()}, program length from all the movies is ${sumLength}min \n${printMovies}`

}

Festival.prototype.getData = function () {

    // return name + " festival has " numMovies + "movie titles" 
    // "output" for()


    let sumMovies = 0;

    for (let i = 0; i < this.listOfPrograms.length; i++) {
        let program = this.listOfPrograms[i];
        sumMovies += program.listOfMovies.length;
    }


    let sumPrograms = "";
    for (let i = 0; i < this.listOfPrograms.length; i++) {
        let naziv = this.listOfPrograms[i];
        sumPrograms += "\t" + naziv.getData() + "\n";
    }


    return `${this.name} festival has ${sumMovies} movie titles \n${sumPrograms}`
}


function createMovie(title, genre, length) {

    return new Movie(title, genre, length)

}

function createProgram(date) {
    return new Program(date);
}



var noviFilm = createMovie("titanik", "romance", 200);
console.log(noviFilm);

const mara = new Movie("Marija", "action", 190);
const nemanja = new Movie("Nemanja", "romantic", 90);
console.log(mara.getData());

const marko = new Movie("Marko", "drama", 50)

const exit = new Program("15.07.2022", []);
const fest = new Program("16.07.2022", []);


const leto = new Festival("leto");


exit.addMovie(mara);
exit.addMovie(nemanja);
fest.addMovie(marko);

leto.addProgram(exit);
leto.addProgram(fest);

console.log(leto.getData());

// console.log(exit.getData());

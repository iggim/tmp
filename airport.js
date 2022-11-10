"use strict";

(function (){
    console.log("a");
}) ();

function Person (name,surname) {
    this.name = name;
    this.surname = surname;
    this.getData = function() {
        return this.name + " " + this.surname;
    }
    
}

function Seat (number, category = "e") {
    this.number = number || Math.floor(Math.random() * 90) + 10;
    this.category = category;
    this.getData = function () {
        return `${this.number}, ${(this.category).toLocaleUpperCase()}`;
    }
}

function Passenger (person, seat) {
    
    if (person instanceof Person) {
    this.person = person; }
    if (seat instanceof Seat) {
    this.seat = seat; }
    this.getData = function () {
        return seat.gatData() + ", " + person.getData(); 
    }
}

function Flight (relation, date, listOfPassenger = []) {
    this.relation = relation;
    this.listOfPassenger = listOfPassenger;
    this.date = date;
    // function() {
       
    //     var datum = new Date();

    //     var day = datum.getDate();
    //     var month = datum.getMonth() + 1;
    //     var year = datum.getFullYear();

    //     var currentDate = `${day}.${month}.${year}`;
    //     return currentDate;

    // } ;
    this.addPassenger = function (passenger) {
        if(passenger instanceof Passenger) {
        return this.listOfPassenger.push(passenger);
        }
    }
    this.getData = function() {
        var str = "";
        for (var i = 0; i < this.listOfPassenger.length; i++) {
            // obrati paznju
            str = str + "\t \t" + this.listOfPassenger[i].getData() + "\n" ;
        }
        return currentDate + `, ${this.relation} \n ${str} `;
    }
}

function Airport (){ 
    this.name = "Nikola Tesla";
    this.listOfFlights = [];
    
    this.addFlight = function(flight) { 
        if (flight instanceof Flight) {
        return this.listOfFlights.push(flight);
        }
    }
    this.getData = function() {
        return `Airport: ${this.name},  \n ${flight.getData}` //total passengers: ${}
    }
}

function createFlight(relation, date) {

    return new Flight(relation, date);
}

function createPassenger (firstName, lastName,  seatNumber, category) {

    var person = new Person (firstName, lastName);
    var seat = new Seat (seatNumber, category);


    return new Passenger (person,  seat);
}

var flight1 = createFlight("Belgrade - New York", "Oct 25 2017");
flight1.addPassenger(createPassenger("John", "Snow", 1, "b"));

Airport.addFlight(flight1);
console.log(airport.getData());

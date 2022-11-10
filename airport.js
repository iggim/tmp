"use strict";

// main execution
(function () {
    // builder functions
    function createFlight(relation, date) {
        return new Flight(relation, date);
    }
    function createPassenger(firstName, lastName, seatNumber, category) {
        return new Passenger(
            new Person(firstName, lastName),
            new Seat(seatNumber, category)
        );
    }

    //
    var airportNikolaTesla = new Airport();

    var flightNewYork = createFlight("Belgrade - New York", "Oct 25 2017");
    flightNewYork.addPassenger(createPassenger("John", "Snow", 1, "b"));

    airportNikolaTesla.addFlight(flightNewYork);

    console.log(airportNikolaTesla.getData());
})();


// -- Classes --

function Person(name, surname) {
    this.name = name;
    this.surname = surname;

    this.getData = function () {
        return this.name + " " + this.surname;
    }
}

function Seat(number, category = "e") {
    this.number = number || Math.floor(Math.random() * 90) + 10;
    this.category = category;

    this.getData = function () {
        return `${this.number}, ${(this.category).toLocaleUpperCase()}`;
    }
}

function Passenger(person, seat) {
    if (person instanceof Person) {
        this.person = person;
    }
    if (seat instanceof Seat) {
        this.seat = seat;
    }

    this.getData = function () {
        return this.seat.getData() + ", " + this.person.getData();
    }
}

function Flight(relation, date, listOfPassenger = []) {
    this.relation = relation;
    this.listOfPassenger = listOfPassenger;
    this.date = date;

    this.addPassenger = function (passenger) {
        if (passenger instanceof Passenger) {
            return this.listOfPassenger.push(passenger);
        }
    }
    this.getData = function () {
        var str = "";
        for (var i = 0; i < this.listOfPassenger.length; i++) {
            // obrati paznju
            str = str + "\t \t" + this.listOfPassenger[i].getData() + "\n";
        }
        return `${this.date}, ${this.relation} \n ${str} `;
    }
}

function Airport() {
    this.name = "Nikola Tesla";
    this.listOfFlights = [];

    this.addFlight = function (flight) {
        if (flight instanceof Flight) {
            return this.listOfFlights.push(flight);
        }
    }
    this.getData = function () {
        var flightsData = "";
        var passengersCount = 0;
        for (const flight of this.listOfFlights) {
            flightsData += flight.getData() + "\n";
            passengersCount += flight.listOfPassenger.length;
        }

        return `Airport: ${this.name}, total passengers: ${passengersCount} \n${flightsData}`;
    }
}

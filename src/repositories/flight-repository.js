const { Op, Sequelize } = require('sequelize');
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        })
        return response;
    }

    async updateSeats(flightId, seats, dec = true) {
        const flight = await Flight.findByPk(flightId);
        if(parseInt(dec)) {
            await flight.decrement('totalSeats', {by: seats});
        } else {
            await flight.increment('totalSeats', {by: seats});
        }
        return flight;
    }
}

module.exports = FlightRepository;
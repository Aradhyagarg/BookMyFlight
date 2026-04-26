const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize')
const { FlightRepository } = require('../repositories');
const flightRepository = new FlightRepository();

const  AppError = require('../utils/errors/app-error');

async function createFlight(data) {
    if (data.departureAirportId === data.arrivalAirportId) {
        throw new AppError('Departure and Arrival Airport cannot be same', StatusCodes.BAD_REQUEST);
    }
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(error.message || 'Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    const endOfDate = " 23:59:59";
    
    // trips=MUM-DEL-2026-05-11
    if(query.trips){
        const [departureAirportId, arrivalAirportId, date] = query.trips.split("-");
        if (departureAirportId === arrivalAirportId) {
            throw new AppError('Departure and Arrival Airport cannot be same', StatusCodes.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        if(date) {
            customFilter.departureTime = {
                [Op.between]: [date, date + endOfDate]
            }
        }
    }

    // price=1000-5000
    if(query.price) {
        const [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice === undefined) ? 1000000 : maxPrice]
        }
    }

    // travellers=2
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    // sort=price_asc,departureTime_desc
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }

    try{
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    }catch(error){
        throw new AppError(error.message || 'Cannot fetch the data of all the Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        throw new AppError('Cannot fetch the data of the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        throw new AppError('Cannot update seats of the Flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}
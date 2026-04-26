const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse } = require("../utils/common");

/**
 * POST /flights
 * Create a new flight
 */
async function createFlight(req, res, next) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
    SuccessResponse.message = "Successfully created a flight";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /flights
 * Get all flights with filters
 */
async function getAllFlights(req, res, next) {
  try {
    const flights = await FlightService.getAllFlights(req.query);
    SuccessResponse.data = flights;
    SuccessResponse.message = "Successfully fetched all flights";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /flights/:id
 * Get a single flight by ID
 */
async function getFlight(req, res, next) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    SuccessResponse.message = "Successfully fetched the flight";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /flights/:id/seats
 * Update flight seats
 */
async function updateSeats(req, res, next) {
    try {
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        SuccessResponse.message = "Successfully updated seats of the flight";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}

module.exports = {
  createFlight,
  getAllFlights,
  getFlight,
  updateSeats
};

const express = require("express");
const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       required:
 *         - flightNumber
 *         - airplaneId
 *         - departureAirportId
 *         - arrivalAirportId
 *         - arrivalTime
 *         - departureTime
 *         - price
 *         - totalSeats
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the flight
 *         flightNumber:
 *           type: string
 *           description: The flight number
 *         airplaneId:
 *           type: integer
 *           description: ID of the airplane used for the flight
 *         departureAirportId:
 *           type: string
 *           description: IATA code of the departure airport
 *         arrivalAirportId:
 *           type: string
 *           description: IATA code of the arrival airport
 *         arrivalTime:
 *           type: string
 *           format: date-time
 *           description: Expected arrival time
 *         departureTime:
 *           type: string
 *           format: date-time
 *           description: Expected departure time
 *         price:
 *           type: integer
 *           description: Price of the flight ticket
 *         boardingGate:
 *           type: string
 *           description: Boarding gate number
 *         totalSeats:
 *           type: integer
 *           description: Total seats available in the flight
 *       example:
 *         flightNumber: UK 812
 *         airplaneId: 1
 *         departureAirportId: BLR
 *         arrivalAirportId: BOM
 *         arrivalTime: '2023-12-01T12:00:00.000Z'
 *         departureTime: '2023-12-01T10:00:00.000Z'
 *         price: 5500
 *         boardingGate: 12A
 *         totalSeats: 180
 */

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: The flights managing API
 */

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       201:
 *         description: Successfully created a flight
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: trips
 *         schema:
 *           type: string
 *         description: Search by departure and arrival airport (e.g. BLR-BOM)
 *     responses:
 *       200:
 *         description: Successfully fetched all flights
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", FlightMiddlewares.validateCreateRequest, FlightController.createFlight);
router.get("/", FlightController.getAllFlights);

module.exports = router;
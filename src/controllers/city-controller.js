const { StatusCodes } = require('http-status-codes')
const CityService = require('../services/city-service');
const { ErrorResponse, SuccessResponse } = require('../utils/index')

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        SuccessResponse.message = 'Successfully created an city';
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity
}
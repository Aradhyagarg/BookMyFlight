const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const swaggerSpec = require('./config/swagger-config');
const errorHandler = require('./middlewares/error-handler');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server at PORT : ${ServerConfig.PORT}`);
    console.log(`Swagger documentation available at http://localhost:${ServerConfig.PORT}/api-docs`);
    Logger.info("Successfully run server", {});
});
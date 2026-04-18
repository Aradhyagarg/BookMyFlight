const express = require("express");

const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', apiRoutes);
app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server at PORT : ${ServerConfig.PORT}`);
    Logger.info("Successfully run server", {});
    /*const { City, Airport } = require('./models');

  const bengaluru = await City.findByPk(1);
  console.log(bengaluru);*/

  /*if (!bengaluru) {
    console.log("City not found");
    return;
  }*/

  //const bengaluru = await City.create({
    name: 'Bengaluru'
  //});

  // create airport via association (best way)
  /*const airport = await bengaluru.createAirport({
    name: 'Kempegowda Airport',
    code: 'BLR',
    address: 'Bangalore'
  });*/

  //console.log("Created Airport:", airport);

  // fetch all airports of this city
  /*const airportsInBlr = await bengaluru.getAirports();
  console.log("Airports in BLR:", airportsInBlr);*/

})
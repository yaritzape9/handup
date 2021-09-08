module.exports = app => {
    const sectors = require("../controllers/sector.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new Sector
    // router.post("/", function(req, res) {
    //     sectors.create
    // });

    router.post("/", sectors.create);
  
    // // Retrieve all Sectors
    // router.get("/", function(req, res) {
    //     sectors.findAll
    // });

    router.get("/", sectors.findAll);
  
    // // Retrieve a single Sector with id
    // router.get("/:id", function(req, res) {
    //     sectors.findOne
    // });

    router.get("/:id", sectors.findOneByID);
  
    // // Update a Sector with id
    // router.put("/:id", function(req, res) {
    //     sectors.update
    // });
    
    router.put("/:id", sectors.update);
    
    // // Delete a Sector with id
    // router.delete("/:id", function(req, res) {
    //     sectors.delete
    // });

    router.delete("/:id", sectors.delete);
  
    // // Delete all sectors
    // router.delete("/", sectors.deleteAll);
  
    app.use('/api/sectors', router);
};
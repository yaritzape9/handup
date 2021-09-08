module.exports = app => {
    const volunteers = require("../controllers/volunteer.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new volunteer
    // router.post("/", function(req, res) {
    //     volunteers.create
    // });

    router.post("/", volunteers.create);

    router.post("/signin", volunteers.signin);

    // // Add Sector to Volunteer
    // router.post("/:volunteer_id/sectors/:sector_id", function(req, res) {
    //     volunteers.createVolunteerSector
    // });

    router.post("/:volunteer_id/sectors/:sector_id", volunteers.createVolunteerSector); 
  
    // // Retrieve all volunteers
    // router.get("/", function(req, res) {
    //     volunteers.findAll
    // });

    router.get("/", volunteers.findAll);
  
    // // Retrieve a single volunteer with id
    // router.get("/:id", function(req, res) {
    //     volunteers.findOne
    // });

    router.get("/:id", volunteers.findOneByID);
  
    // // Update a volunteer with id
    // router.put("/:id", function(req, res) {
    //     volunteers.update
    // });

    router.put("/:id", volunteers.update);
  
    // // Delete a volunteer with id
    // router.delete("/:id", function(req, res) {
    //     volunteers.delete;
    // });

    router.delete("/:id", volunteers.delete);

    // // Get all Sectors from volunteer
    // router.get("/:volunteer_id/sectors", function(req, res) {
    //     volunteers.findAllVolunteerSectors;
    // });

    router.get("/:volunteer_id/sectors", volunteers.findAllVolunteerSectors);

    // // Get one sector from volunteer
    // router.get("/:volunteer_id/sectors/:sector_id", function(req, res) {
    //     volunteers.findOneVolunteerSectors;
    // });

    router.get("/:volunteer_id/sectors/:sector_id", volunteers.findOneVolunteerSectors);
  
    // // Delete all volunteers
    // router.delete("/", volunteers.deleteAll);
  
    app.use('/api/volunteers', router);
};
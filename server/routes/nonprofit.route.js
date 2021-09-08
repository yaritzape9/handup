module.exports = app => {
    const nonprofits = require("../controllers/nonprofit.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new Nonprofit
    // router.post("/", function(req, res){
    //     console.log("POSTING");
    //     console.log("******************")
    //     // console.log(res);
    //     nonprofits.create;
    //     console.log(nonprofits.create)
    // });

    router.post("/", nonprofits.create);

    router.post("/signin", nonprofits.signin);

    // // Retrieve all Nonprofit
    // router.get("/", function(req, res) {
    //     nonprofits.findAll;
    // });

    router.get("/", nonprofits.findAll);
    
    // // Add Resource to Nonprofit
    // router.post("/:nonprofit_id/resources/:resource_id", function(req, res) { 
    //     nonprofits.createNonprofitResource;
    // });

    // router.post("/:nonprofit_id/resources/:resource_id", nonprofits.createNonprofitResource);

    // // Add Sector to Nonprofit
    // router.post("/:nonprofit_id/sectors/:sector_id", function(req, res) { 
    //     nonprofits.createNonprofitSector;
    // });

    router.post("/:nonprofit_id/sectors/:sector_id", nonprofits.createNonprofitSector);

    // // Add resource to Nonprofit
    // router.post("/:nonprofit_id/resources/:resource_id", function(req, res) { 
    //     nonprofits.createNonprofitResource;
    // });

    router.post("/:nonprofit_id/resources", nonprofits.createNonprofitResource);

  
    // // Retrieve a single Nonprofit with id
    // router.get("/:id", function(req, res) { 
    //     nonprofits.findOne;
    // });

    router.get("/:nonprofit_id", nonprofits.findOneByID); 

    // // Get all Resources from nonprofit
    // router.get("/:nonprofit_id/resources", function(req, res) { 
    //     nonprofits.findAllNonprofitResources;
    // });

    router.get("/:nonprofit_id/resources", nonprofits.findAllNonprofitResources);

    // // Get one resource from nonprofit
    // router.get("/:nonprofit_id/resources/:resource_id", function(req, res) { 
    //     nonprofits.findOneVolunteerResources;
    // });

    router.get("/:nonprofit_id/resources/:resource_id", nonprofits.findOneNonprofitResources);

    // // Get all Sectors from nonprofit
    // router.get("/:nonprofit_id/sectors", function(req, res) { 
    //     nonprofits.findAllNonprofitSectors;
    // });

    router.get("/:nonprofit_id/sectors", nonprofits.findAllNonprofitSectors);

    // // Get one sector from nonprofit
    // router.get("/:nonprofit_id/sectors/:sector_id", function(req, res) { 
    //     nonprofits.findOneVolunteerSectors;
    // });

    router.get("/:nonprofit_id/sectors/:sector_id", nonprofits.findOneNonprofitSectors);

    // // Update a Nonprofit with id
    // router.put("/:id", function(req, res) { 
    //     nonprofits.update;
    // });

    router.put("/:id", nonprofits.update);
  
    // // Delete a Nonprofit with id
    // router.delete("/:id", function(req, res) { 
    //     nonprofits.delete;
    // });

    router.delete("/:id", nonprofits.delete);
  
    // // Delete all nonprofits
    // router.delete("/", nonprofits.deleteAll);
  
    app.use('/api/nonprofits', router);
};
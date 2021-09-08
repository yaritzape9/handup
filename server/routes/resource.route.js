module.exports = app => {
    const resources = require("../controllers/resource.controller.js");
  
    var router = require("express").Router();
  
    // // Create a new Resource
    // router.post("/", function(req, res) {
    //     resources.create
    // });

    router.post("/", resources.create);
  
    // // Retrieve all resources
    // router.get("/", function(req, res) {
    //     resources.findAll
    // });

    router.get("/", resources.findAll);
  
    // // Retrieve a single Resource with id
    // router.get("/:id", function(req, res) {
    //     resources.findOne
    // });

    router.get("/:id", resources.findOneByID);
  
    // // Update a Resource with id
    // router.put("/:id", function(req, res) {
    //     resources.update
    // });

    router.put("/:id", resources.update);
  
    // // Delete a Resource with id
    // router.delete("/:id", function(req, res) {
    //     resources.delete
    // });

    router.delete("/:id", resources.delete);
  
    // // Delete all resources
    // router.delete("/", resources.deleteAll);
  
    app.use('/api/resources', router);
};
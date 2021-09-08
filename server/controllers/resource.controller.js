const db = require("../models");
const Resource = db.resources;
const Op = db.Sequelize.Op;

// Create and Save a new resource
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resource_name) {
    res.status(400).send({
      message: "Nonprofit name can not be empty!"
    });
    return;
  }

  // Create a resource
  const resource = {
    resource_name: req.body.sector_name
  };

  // Save resource in the database
  Resource.create(resource)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a Sector."
      });
    });
};

// Retrieve all Resources from the database.
exports.findAll = (req, res) => {
    const resource_name = req.query.resource_name;
    var condition = resource_name ? { resource_name: { [Op.like]: `%${resource_name}%` } } : null;

    Resource.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Resource by id
exports.findOneByID = (req, res) => {
    exports.findOne = (req, res) => {
        const id = req.params.id;
        Resource.findByPk(id)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
            });
        };
};

// Update a Nonprofit by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Resource.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sector was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Sector with id=${id}. Maybe Sector was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Sector with id=" + id
        });
      });
};

// Delete a Nonprofit with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Resource.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Sector was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Sector with id=${id}. Maybe Sector was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Sector with id=" + id
        });
      });
};

// Delete all Sectors from the database.
exports.deleteAll = (req, res) => {
    Resource.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Sectors were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Sectors."
          });
        });
};


// import axios from './axios';
// const db = require("../models");
// const Resource = db.Resource;
// const Op = db.Sequelize.Op;

// class ResourceService {
//     getAll() {
//       return axios.get("/resources");
//     }

//     get(id) {
//       return axios.get(`/resources/${id}`);
//     }
  
//     create(data) {
//       return axios.post("/resources", data);
//     }
  
//     update(id, data) {
//       return axios.put(`/resources/${id}`, data);
//     }
  
//     delete(id) {
//       return axios.delete(`/resources/${id}`);
//     }
  
//     deleteAll() {
//       return axios.delete(`/resources`);
//     }
  
//     findByResource(name) {
//       return axios.get(`/resources?resource_name=${name}`);
//     }
//   }
  
// export default new ResourceService();

// // Create and Save a new Tutorial
// exports.create = (req, res) => {
  
// };

// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
  
// };

// // Find a single Tutorial with an id
// exports.findOne = (req, res) => {
  
// };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };

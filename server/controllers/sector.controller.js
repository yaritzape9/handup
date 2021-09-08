const db = require("../models");
const Sector = db.sectors;
const Op = db.Sequelize.Op;

// Create and Save a new Nonprofit
exports.create = (req, res) => {
  // Validate request
  if (!req.body.sector_name) {
    res.status(400).send({
      message: "Sector name can not be empty!"
    });
    return;
  }

  // Create a Nonrpofit
  const sector = {
    sector_name: req.body.sector_name
  };

  // Save Nonprofit in the database
  Sector.create(sector)
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

// Retrieve all Sectors from the database.
exports.findAll = (req, res) => {
    const sector_name = req.query.sector_name;
    var condition = sector_name ? { sector_name: { [Op.like]: `%${sector_name}%` } } : null;

    Sector.findAll({ where: condition })
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

// Find a single Sector by id
exports.findOneByID = (req, res) => {
  const id = req.params.id;
  Sector.findByPk(id)
    .then(data => {
            res.send(data);
          })
    .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
    });
};

// Update a Nonprofit by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Sector.update(req.body, {
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

    Sector.destroy({
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
    Sector.destroy({
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
// const Nonprofit = db.Nonprofit;
// const Op = db.Sequelize.Op;

// class SectorService {
//     getAll() {
//       return axios.get("/sectors");
//     }

//     get(id) {
//       return axios.get(`/sectors/${id}`);
//     }
  
//     create(data) {
//       return axios.post("/sectors", data);
//     }
  
//     update(id, data) {
//       return axios.put(`/sectors/${id}`, data);
//     }
  
//     delete(id) {
//       return axios.delete(`/sectors/${id}`);
//     }
  
//     deleteAll() {
//       return axios.delete(`/sectors`);
//     }
  
//     findBySector(name) {
//       return axios.get(`/sectors?sector_name=${name}`);
//     }

//   }
  
// export default new SectorService();

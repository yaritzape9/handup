const db = require("../models");
const Nonprofit = db.nonprofits;
const Resource = db.resources;
const Sector = db.sectors;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create and Save a new Nonprofit
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nonprofit_name) {
    res.status(400).send({
      message: "Nonprofit name can not be empty!"
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!"
    });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({
      message: "Description can not be empty!"
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Password can not be empty!"
    });
    return;
  }

  // Create a Nonrpofit
  const nonprofit = {
    nonprofit_name: req.body.nonprofit_name,
    email: req.body.email,
    description: req.body.description,
    password: bcrypt.hashSync(req.body.password, 8),
    // password: req.body.password,
    money_need: req.body.money_need > 0 ? req.body.money_need : 0
  };

  // Save Nonprofit in the database
  Nonprofit.create(nonprofit)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Nonprofit."
      });
    });
};

exports.signin = (req, res) => {
  Nonprofit.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Nonprofit Not found......" });
      }

      const payload = {
        user: {
          nonprofit_id: user.nonprofit_id
        }
      };
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            user
          });
        }
      );

      // const token = jwt.sign(payload, "randomString", {
      //   expiresIn: 86400 // 24 hours
      // });

      // res.send(token)
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


// Create new sector for a nonprofit
exports.createNonprofitSector = (req, res) => {
  // Validate request
  if (!req.params.nonprofit_id) {
      res.status(400).send({
          message: "Nonprofit can not be empty!"
      });
      return;
  }
  if (!req.params.sector_id) {
      res.status(400).send({
          message: "Sector can not be empty!"
      });
      return;
  }
  let nonprofit_id = req.params.nonprofit_id;
  let sector_id = req.params.sector_id;
  Nonprofit.findByPk(nonprofit_id)
    .then((nonprofit) => {
      if (!nonprofit) {
        console.log("Nonprofit not found!");
        return null;
      }
      Sector.findByPk(sector_id).then((sector) => {
        if (!sector) {
          console.log("sector not found!");
          return null;
        }
        nonprofit.addSector(sector);
        res.send(nonprofit);
        // nonprofit.addSector(sector);
        console.log(`>> added Sector id=${sector_id} to Nonprofit id=${nonprofit_id}`);
        return nonprofit;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Sector to Nonprofit: ", err);
  });
};

// Create new resource for a nonprofit
exports.createNonprofitResource = (req, res) => {
  // Validate request
  if (!req.params.nonprofit_id) {
      res.status(400).send({
          message: "Nonprofit can not be empty!"
      });
      return;
  }

  if (!req.body.resource_name) {
      res.status(400).send({
          message: "Resource can not be empty!"
      });
      return;
  }

  if (!req.body.description) {
    res.status(400).send({
        message: "Description can not be empty!"
    });
    return;
}

  let id = req.params.nonprofit_id;
  const resource = {
    resource_name: req.body.resource_name,
    description: req.body.description,
    nonprofit_id: req.params.nonprofit_id
  };

  return Nonprofit.findByPk(id)
    .then((nonprofit) => {
      if (!nonprofit) {
        console.log("Nonprofit not found!");
        return null;
      }
      Resource.create(resource) 
        .then(data => {
          nonprofit.addResources(data);
          res.send(data);
          console.log(`>> added Resource id=${data.resource_id} to Nonprofit id=${id}`);

        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Nonprofit."
          });
        });

    })
    .catch((err) => {
      console.log(">> Error while adding Sector to Nonprofit: ", err);
  });
};

// Retrieve all Nonprofits from the database.
exports.findAll = (req, res) => {
    const nonprofit_name = req.query.nonprofit_name;
    var condition = nonprofit_name ? { nonprofit_name: { [Op.like]: `%${nonprofit_name}%` } } : null;

    Nonprofit.findAll({ where: condition })
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

// Find a single Nonprofit by id
exports.findOneByID = (req, res) => {
    const id = req.params.nonprofit_id;    
    Nonprofit.findOne({
      where: {
        nonprofit_id: id
      }
    }).then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message: "Error retrieving Nonprofit with id=" + id
      });
      }); 
};

// Update a Nonprofit by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Nonprofit.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Nonprofit was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Nonprofit with id=${id}. Maybe Nonprofit was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Nonprofit with id=" + id
        });
      });
};

// Delete a Nonprofit with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Nonprofit.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Nonprofit was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Nonprofit with id=${id}. Maybe Nonprofit was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Nonprofit with id=" + id
        });
      });
};

// Delete all Nonprofits from the database.
exports.deleteAll = (req, res) => {
    Nonprofit.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Nonprofits were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Nonprofits."
          });
        });
};

// Find all Nonprofit resources
exports.findAllNonprofitResources = (req, res) => {
    const id = req.params.nonprofit_id;
    Resource.findAll({ where: { nonprofit_id: id } })
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

// Find one Nonprofit resource
exports.findOneNonprofitResources = (req, res) => {
  const id = req.params.nonprofit_id;
  const resoruce = req.params.resource_id;
  Resource.findAll({ where: { nonprofit_id: id, resource_id: resoruce } })
      .then(data => {
          res.send(data);
  })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving Resources."
      });
  });
};

// Find all Nonprofit sectors
exports.findAllNonprofitSectors = (req, res) => {
    const id = req.params.nonprofit_id;
    Nonprofit.findAll(
        { 
        where: { nonprofit_id: id },
        include: [
          {
            model: Sector,
            as: "sectors",
            attributes: ["sector_id", "sector_name"]
          }
        ]
        })
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

// Find one Nonprofit sector ***** MAY NOT NEED THIS, BUT WILL COME TO IT  ************** //
exports.findOneNonprofitSectors = (req, res) => {
  const id = req.params.nonprofit_id;
  const sector_id = req.params.sector_id;
  Nonprofit.findAll(
      { where: { nonprofit_id: id },
        include: {
          model: Sector,
          as: "sectors",
          attributes: ["sector_id", "sector_name"],
          through: {
            attributes: [id, sector_id]
          }
        }
      
      })
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


// import axios from './axios';
// const db = require("../models");
// const Nonprofit = db.Nonprofit;
// const Op = db.Sequelize.Op;

// class NonprofitService {
//     getAll() {
//       return axios.get("/nonprofits");
//     }

//     get(id) {
//       return axios.get(`/nonprofits/${id}`);
//     }
  
//     create(data) {
//       return axios.post("/nonprofits", data);
//     }
  
//     update(id, data) {
//       return axios.put(`/nonprofits/${id}`, data);
//     }
  
//     delete(id) {
//       return axios.delete(`/nonprofits/${id}`);
//     }
  
//     deleteAll() {
//       return axios.delete(`/nonprofits`);
//     }
  
//     findByTitle(name) {
//       return axios.get(`/nonprofits?nonprofit_name=${name}`);
//     }

//     getNonprofitResources(nonprofit_id) {
//       return axios.get(`/nonprofits/${nonprofit_id}/resources`);
//     }
  
//     getOneNonprofitResources(nonprofit_id, resource_id) {
//       return axios.get(`/nonprofits/${nonprofit_id}/resources/${resource_id}`);
//     }
  
//     getNonprofitSectors(nonprofit_id) {
//       return axios.get(`/nonprofits/${nonprofit_id}/sectors`);
//     }
  
//     getOneNonprofitSector(nonprofit_id, sector_id) {
//       return axios.get(`/sectors/${nonprofit_id}/sectors/${sector_id}`);
//     }

//   }
  
// export default new NonprofitService();
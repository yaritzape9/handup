const db = require("../models");
const Volunteer = db.volunteers;
const Sector = db.sectors;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create and Save a new Volunteer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fname) {
    res.status(400).send({
      message: "First name can not be empty!"
    });
    return;
  }

  if (!req.body.lname) {
    res.status(400).send({
      message: "Last name can not be empty!"
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty!"
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      message: "Password can not be empty!"
    });
    return;
  }

  if (!req.body.username) {
    res.status(400).send({
      message: "Username can not be empty!"
    });
    return;
  }

  // Create a Nonrpofit
  const volunteer = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    username: req.body.username
  };

  // Save Nonprofit in the database
  Volunteer.create(volunteer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating Volunteer."
      });
    });
};

exports.signin = (req, res) => {
  Volunteer.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Volunteer Not found." });
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

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Create new sector for a volunteer
exports.createVolunteerSector = (req, res) => {
  // Validate request
  if (!req.params.volunteer_id) {
      res.status(400).send({
          message: "Volunteer can not be empty!"
      });
      return;
  }
  if (!req.params.sector_id) {
      res.status(400).send({
          message: "Sector can not be empty!"
      });
      return;
  }
  let volunteer_id = req.params.volunteer_id;
  let sector_id = req.params.sector_id;
  Volunteer.findByPk(volunteer_id)
    .then((volunteer) => {
      if (!volunteer) {
        console.log("Volunteer not found!");
        return null;
      }
      Sector.findByPk(sector_id).then((sector) => {
        if (!sector) {
          console.log("sector not found!");
          return null;
        }
        volunteer.addSector(sector);
        res.send(volunteer);
        console.log(`>> added Sector id=${sector_id} to Volunteer id=${volunteer_}`);
        return volunteer;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding Sector to Volunteer: ", err);
  });
};

// Retrieve all Volunteers from the database.
exports.findVolunteerByUsername = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

    Volunteer.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving volunteers."
        });
      });
};

// Retrieve all Volunteers from the database.
exports.findAll = (req, res) => {
  Resource.findAll({ })
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

// Find a single Volunteer by id
exports.findOneByID = (req, res) => {
    exports.findOne = (req, res) => {
        const id = req.params.id;
        
        Volunteer.findByPk(id)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message: "Error retrieving Volunteer with id=" + id
            });
            });
        };
};

// Update a Volunteer by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Volunteer.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Volunteer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Volunteer with id=${id}. Maybe Volunteer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Volunteer with id=" + id
        });
      });
};

// Delete a Volunteer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Volunteer.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Volunteer was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Volunteer with id=${id}. Maybe Volunteer was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Volunteer with id=" + id
        });
      });
};

// Delete all Volunteer from the database.
exports.deleteAll = (req, res) => {
    Volunteer.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Volunteers were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Volunteers."
          });
        });
};

// Find all Nonprofit sectors
exports.findAllVolunteerSectors = (req, res) => {
    const id = req.params.volunteer_id;
    Volunteer.findAll(
      { 
        where: { volunteer_id: id },
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

// Find one Volunteer sector ***** MAY NOT NEED THIS, BUT WILL COME TO IT  ************** //
exports.findOneVolunteerSectors = (req, res) => {
  const id = req.params.id;
  const sector_id = req.params.id;
  Volunteer.findAll(
    { 
      where: { volunteer_id: id },
      include: [
        {
          model: Sector,
          as: "sectors",
          attributes: ["sector_id", "sector_name"],
          through: {
            attributes: [id, sector_id]
          }
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

// import axios from './axios';
// const db = require("../models");
// const Volunteer = db.Volunteer;
// const Op = db.Sequelize.Op;

// class VolunteerService {
//     getAll() {
//       return axios.get("/volunteers");
//     }
    
//     get(id) {
//       return axios.get(`/volunteers/${id}`);
//     }
  
//     create(data) {
//       return axios.post("/volunteers", data);
//     }
  
//     update(id, data) {
//       return axios.put(`/volunteers/${id}`, data);
//     }
  
//     delete(id) {
//       return axios.delete(`/volunteers/${id}`);
//     }
  
//     deleteAll() {
//       return axios.delete(`/volunteers`);
//     }
  
//     findByFName(fname) {
//       return axios.get(`/volunteers?fname=${fname}`);
//     }

//     findByFName(lname) {
//       return axios.get(`/volunteers?lname=${lname}`);
//     }

//     findByEmail(email) {
//       return axios.get(`/volunteers?email=${email}`);
//     }

//     findByFUsername(username) {
//         return axios.get(`/volunteers?username=${username}`);
//     }

//     getVolunteerSector(nonprofit_id) {
//         return axios.get(`/sectors/${nonprofit_id}/sectors`);
//     }

//     getOneVolunteerSector(nonprofit_id, sector_id) {
//         return axios.get(`/sectors/${nonprofit_id}/sectors/${sector_id}`);
//     }
//   }
  
// export default new VolunteerService();

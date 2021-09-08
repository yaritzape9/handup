import axios from "../axios";
// import authHeader from "./auth-header";

class NonprofitDataService {
  getAll() {
    return axios.get("/nonprofit/resources");
  }

  get(id) {
    return axios.get(`/resources/${id}`);
  }

//   profile(id) {
//     return axios.get(`/nonprofits/${id}/profile`);
//   }

  create(data) {
    return axios.post("/resources", data);
  }

  update(id, data) {
    return axios.put(`/resources/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/resources/${id}`);
  }

//   deleteAll() {
//     return axios.delete(`/nonprofits`);
//   }

  findByName(name) {
    return axios.get(`/nonprofits?name=${name}`);
  }
}

export default new NonprofitDataService();
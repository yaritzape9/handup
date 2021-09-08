import axios from "../axios";
import authHeader from "./auth-header";

class NonprofitDataService {
  getAll() {
    return axios.get("/nonprofits");
  }

  get(id) {
    return axios.get(`/nonprofits/${id}`);
  }

  getResource(id, resource_id) {
    return axios.get(`/nonprofits/${id}/resources/${resource_id}`);
  }

  getAllResource(id) {
    return axios.get(`/nonprofits/${id}/resources`);
  }

  addSector(nonprofit_id, sector_id) {
    return axios.post(`/nonprofits/${nonprofit_id}/sectors/${sector_id}`)
  }

  createResource(id, data) {
    return axios.post(`/nonprofits/${id}/resources`, data);
  }

  getAllSector(id) {
    return axios.get(`/nonprofits/${id}/sectors`);
  }

  addSector(id, sector_id) {
    return axios.post(`/nonprofits/${id}/sectors/${sector_id}`);
  }

  profile(id) {
    return axios.get(`/nonprofits/${id}/profile`);
  }

  create(data) {
    return axios.post("/nonprofits", data);
  }

  signin(data) {
    return axios.post("/nonprofits/signin", data);
  }

  update(id, data) {
    return axios.put(`/nonprofits/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/nonprofits/${id}`);
  }

//   deleteAll() {
//     return axios.delete(`/nonprofits`);
//   }

  findByName(name) {
    return axios.get(`/nonprofits?name=${name}`);
  }
}

export default new NonprofitDataService();

import axios from "../axios";
import authHeader from "./auth-header";

class VolunteerDataService {
  getAll() {
    return axios.get("/volunteers");
  }

  get(id) {
    return axios.get(`/volunteers/${id}`);
  }

  profile(id) {
    return axios.get(`/volunteers/${id}/profile`);
  }

  create(data) {
    return axios.post("/volunteers", data);
  }

  getAllSector(id) {
    return axios.get(`/volunteers/${id}/sectors`);
  }

  addSector(id, sector_id) {
    return axios.post(`/volunteers/${id}/sectors/${sector_id}`);
  }

  signin(data) {
    return axios.post("/volunteers/signin", data);
  }

  update(id, data) {
    return axios.put(`/volunteers/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/volunteers/${id}`);
  }

//   deleteAll() {
//     return axios.delete(`/volunteers`);
//   }

  findByName(name) {
    return axios.get(`/volunteers?name=${name}`);
  }
}

export default new VolunteerDataService();

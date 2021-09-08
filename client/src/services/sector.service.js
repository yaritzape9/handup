import axios from "../axios";
import authHeader from "./auth-header";

class SectorDataService {
  getAll() {
    return axios.get("/sectors");
  }

  get(id) {
    return axios.get(`/sectors/${id}`);
  }

  create(data) {
    return axios.post("/sectors", data);
  }

  update(id, data) {
    return axios.put(`/sectors/${id}`, data);
  }

  delete(id) {
    return axios.delete(`/sectors/${id}`);
  }

//   deleteAll() {
//     return axios.delete(`/sectors`);
//   }

}

export default new SectorDataService();

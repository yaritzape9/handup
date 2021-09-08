export default axios.create({
    baseUrl: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});
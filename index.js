const app = require("./app");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

app.listen(port, () => {
    console.log("Server running on port:  " + port);
});




const express = require("express");
const cors = require("cors");

const app = express();

const corOptions = {
  origin: "*",
};

//middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// routers
const router_customer = require("./routes/CompanyRoutes");
app.use("/api", router_customer);


const PORT = 5000;

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});

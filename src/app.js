const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swagger = require("swagger-ui-express");
const swaggerFile = require("./swagger-file.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));

module.exports = { app };

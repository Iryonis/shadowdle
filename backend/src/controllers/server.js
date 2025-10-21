import connectDb from "../config/db.js";
import express from "express";
import routes from "../routes/index.js";
import swaggerJsDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shadowdle REST API",
      description: "A REST API built with Express and MongoDB.",
      version: "0.1",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const openapiSpecification = swaggerJsDoc(options);

const app = express();
app.use(express.json());
app.use("/api", routes);
app.use("/docs", serve, setup(openapiSpecification));
connectDb();

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `✅ Serveur démarré sur http://${process.env.HOST}:${process.env.PORT}`
  );
});

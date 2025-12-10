const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["../app.ts", "../routes/index.routes.ts"];

const doc = {
  info: {
    title: "API Docs",
    description: "Auto-generated with swagger-autogen",
  },
  host: "localhost:3000", // ganti dengan domain kamu
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);

const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    proxy("/api", {
      target: process.env.API_HOST || "http://localhost:8000/"
    })
  );
};

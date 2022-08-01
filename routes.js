const routes = require("next-routes")();

routes
  .add("/collections/new", "/collections/new")
  .add("/user", "/user")
  .add("/collections/mint", "/collections/mint");

module.exports = routes;

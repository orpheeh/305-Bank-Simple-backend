const UserHandler = require("./controllers/user.controller");

const index = (app, db) => {

    "use strict";

    const userHandler = new UserHandler();

    //User
    app.post("/user", userHandler.register);
    app.get("/user/transactions/:user", userHandler.getAllTransaction);
    app.post("/user/transactions", userHandler.createTransaction);
    app.get("/user/:user", userHandler.getUser);

    return app;
};

module.exports = index;
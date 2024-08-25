const bcryptjs = require("bcryptjs");
const userRepository = require("../../data/repository/user.repository");

module.exports = {

    async login(userName, password) {
        // Helper function to compare passwords
        const comparePassword = (fromDB, fromUser) => {
            // Fix for A2-Broken Auth
            // compares decrypted password stored in this.addUser()
            return bcryptjs.compareSync(fromDB, fromUser);
        };
        const loginResponse = { err: null, user: null };
        const user = await userRepository.findOneWhere({ email: userName });
        if (user) {
            if (comparePassword(password, user.password)) {
                loginResponse.user = user;
            } else {
                const invalidPasswordError = new Error("Invalid password");
                // Set an extra field so we can distinguish this from a db error
                invalidPasswordError.invalidPassword = true;
                loginResponse.err = invalidPasswordError;
            }
        } else {
            const noSuchUserError = new Error("User: " + user + " does not exist");
            // Set an extra field so we can distinguish this from a db error
            noSuchUserError.noSuchUser = true;
            loginResponse.err = noSuchUserError;
        }
        return loginResponse;
    }
}
const {
    environmentalScripts
} = require("../../../config/config");
const transactionRepository = require("../../data/repository/transaction.repository");
const userRepository = require("../../data/repository/user.repository");

function UserHandler() {
    "use strict";

    this.register = async (req, res, next) => {
        try {
            const user = await userRepository.create(req.body);
            return res.send(user);
        } catch (err) {
            res.status(500).send({ err: err.toString() })
        }
    }

    this.getUser = async (req, res, next) => {
        try {
            const user = await userRepository.findOneWhere({ userKey: req.params.user});
            return res.send(user);
        } catch (err) {
            res.status(500).send({ err: err.toString() })
        }
    }

    this.getAllTransaction = async (req, res, next) => {
        try {
            const transaction = await transactionRepository.findWhere({ user: req.params.user });
            return res.send(transaction);
        } catch (err) {
            res.status(500).send({ err: err.toString() })
        }
    }

    this.createTransaction = async (req, res, next) => {
        try {
            const user = await userRepository.findOneWhere({ userKey: req.body.user})
            const transaction = await transactionRepository.create(req.body);
            if(req.body.type == 'ADD') {
                user.balance += req.body.amount;
            } else if(req.body.type == 'REMOVE') {
                user.balance -= req.body.amount;
            } else if(req.body.type == 'TRANSFER') {
                user.balance -= req.body.amount;
                const dst = await userRepository.findOneWhere({ userKey: req.body.name})
                dst.balance += req.body.amount;
                await userRepository.update(dst._id, dst);
            }
            await userRepository.update(user._id, user)
            return res.send(transaction);
        } catch (err) {
            res.status(500).send({ err: err.toString() })
        }
    }

}

module.exports = UserHandler;
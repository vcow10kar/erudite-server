const mongoose = require('mongoose');

require('dotenv').config();

const connect = () => {
    return mongoose.connect(
        `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@erudite-cluster.hhqxq.mongodb.net/erudite`
        );
};

module.exports = connect;
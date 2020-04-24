'use strict';

module.exports = {
    dbPath: `mongodb://localhost:27017/carsDB`,
    dbOption: { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    server: {
        PORT: process.env.PORT || 5000
    }
};

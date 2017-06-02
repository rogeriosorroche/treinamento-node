const mysql = require('mysql');

class Db {

    createConnection() {

        const connection = mysql.createConnection({
            host    : process.env.DB_HOST,
            user    : process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB
        });
                
        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };

        return connection;
    }

    run(callback) {

        const conn = this.createConnection();
        try {
            callback(conn);
        } finally {
            conn.end();
        }
    }

}

module.exports = function(app) {
    return new Db(app);
}
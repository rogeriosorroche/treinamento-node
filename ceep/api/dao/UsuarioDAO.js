class UsuarioDAO {

    constructor(app) {
        this.db = app.infra.db;
    }

    get(id, callback) {
        this.db.run((connection) => {
            connection.query('select id, nome, email from usuario where id=:id', {id}, (err, results, fields) => {
                callback(err, results);
            });
        });
    }

    insira(usuario, callback) {
        this.db.run((connection) => {
            connection.query('insert into usuario (nome, email, senha) values (:nome, :email, :senha)', usuario, (err, results, fields) => {
                callback(err);
            });
        });
    }

    atualize(usuario, callback) {
        this.db.run((connection) => {
            connection.query('update usuario set nome = :nome, email = :email, senha = :senha where id = :id', usuario, (err, results, fields) => {
                callback(err);
            });
        });
    }

    remova(id, callback) {
        this.db.run((connection) => {
            connection.query('delete from usuario where id = :id', id, (err, results, fields) => {
                callback(err);
            });
        });
    }

    liste(callback) {
        this.db.run((connection) => {
            connection.query('select id, nome, email from usuario', (err, results, fields) => {
                callback(err, results);
            });
        });
    }

}

module.exports = function(app) { 
    return new UsuarioDAO(app);
};
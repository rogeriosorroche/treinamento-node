class UsuarioController {

    constructor(app) {
        this.app = app;
        this.dao = app.dao.UsuarioDAO;
    }

    show() {
        return (req, res) => {
            res.render('usuario/cadastro', {usuario:{}});
        }
    }

    showId() {
        return (req, res, next) => {

            const id = req.params.id || null;

            this.dao.get(id, (err, results) => {
                if (err) return next(err);
                res.render('usuario/cadastro', {usuario: results[0]}); 
            });

        }
    }

    salve() {
        return (req, res, next) => {

            const usuario = req.body;

            req.assert('nome', 'Nome deve ser preenchido')
               .notEmpty();

            let errors = req.validationErrors();

            if (errors) {
                res.format({
                    html:() => {
                        res.status(400)
                           .render('usuario/cadastro', {usuario:{}, validationErros:errors});
                    },
                    json:() => {
                        res.status(400)
                           .send(errors);
                    }
                });
                return;
            }

            if (usuario.id) {

                this.dao.atualize(usuario, (err) => {
                    if (err) return next(err);

                    // msg por websocket
                    this.app.get('io').emit('usuarioAtualizado', usuario);

                    res.format({
                        html:() => {
                            res.render('usuario/sucesso', {usuario});
                        },
                        json:() => {
                            res.end();
                        }
                    });
                });

            } else {

                this.dao.insira(usuario, (err) => {
                    if (err) return next(err);

                    // msg por websocket
                    this.app.get('io').emit('usuarioInserido', usuario);
                    
                    res.format({
                        html:() => {
                            res.render('usuario/sucesso', {usuario});
                        },
                        json:() => {
                            res.end();
                        }
                    });
                });

            }

        }
    }

    remova() {
        return (req, re, next) => {

            const id = req.body;

            this.dao.remova(id, (err) => {
                if (err) return next(err);
                res.status(200)
                   .json({status:'OK', id:id});
            });

        }
    }

    liste() {
        return (req, res, next) => {
            this.dao.liste((err, results) => {
                if (err) return next(err);
                res.format({
                    html:() => {
                        res.render('usuario/lista', {usuarios: results});
                    },
                    json:() => {
                        res.json(results);
                    }
                });
            });
        }
    }

}

module.exports = function(app) { 
    return new UsuarioController(app) 
};
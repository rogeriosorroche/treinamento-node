module.exports = function(app) {

    const controller = app.controller.UsuarioController;

    app.post('/usuario', controller.salve());
    app.delete('/usuario', controller.remova());
    
    app.get('/usuario/lista', controller.liste());
    app.get('/usuario/:id', controller.showId());
    app.get('/usuario', controller.show());

    return this;
}
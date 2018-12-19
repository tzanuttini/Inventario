module.exports = function (app) {
    const rubro = require('../controllers/rubro.controller');

    app.get('/api/rubros/iniciar', rubro.init);

    app.get('/api/rubros/', rubro.findAll);

    app.get('/api/rubro/:id', rubro.findById);

    app.delete('/api/rubroborrar/:id', rubro.destroy);

    app.post('/api/rubronuevo/', rubro.create);

    app.put('/api/rubroupdate/:id', rubro.update);
}
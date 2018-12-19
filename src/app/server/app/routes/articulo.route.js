module.exports = function(app) {
 
    const articulos = require('../controllers/articulo.controller.js');

    app.get('/api/articulos/iniciar', articulos.init);

    app.get('/api/articulos', articulos.findAll);

    app.get('/api/stock', articulos.findAllStock);

    app.get('/api/articulo/:id', articulos.findById);

     app.delete('/api/articuloborrar/:id', articulos.destroy);

    app.post('/api/articulonuevo/', articulos.create);

    app.put('/api/articuloupdate/:id', articulos.update);
}
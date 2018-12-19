module.exports = function (app) {

    const cliente = require('../controllers/cliente.controller.js');

    app.get('/api/clientes/iniciar', cliente.init);

    app.get('/api/clientes/', cliente.findAll);

    app.get('/api/cliente/:id', cliente.findById);

    app.delete('/api/clienteborrar/:id', cliente.destroy);

    app.post('/api/clientenuevo/', cliente.create);

    app.put('/api/clienteupdate/:id', cliente.update);

    app.post('/api/clientenuevafactura/', cliente.nuevafactura);

    app.get('/api/facturasventas/', cliente.findAllfacturas);

    app.get('/api/clientefactura/:id', cliente.findfacturaById);

    app.get('/api/ultimaFacturaVenta', cliente.findultimafactura);


}
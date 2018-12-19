module.exports = function (app) {

    const proveedor = require('../controllers/proveedor.controller');

    app.get('/api/proveedores/iniciar', proveedor.init);

    app.get('/api/proveedores/', proveedor.findAll);

    app.get('/api/proveedor/:id', proveedor.findById);

    app.delete('/api/proveedorborrar/:id', proveedor.destroy);

    app.post('/api/proveedornuevo/', proveedor.create);

    app.put('/api/proveedorupdate/:id', proveedor.update);

    app.post('/api/proveedornuevafactura/', proveedor.nuevafactura);

    app.get('/api/facturascompras/', proveedor.findAllfacturas);

    app.get('/api/proveedorfactura/:id', proveedor.findfacturaById);

    app.get('/api/ultimaFacturaCompra', proveedor.findultimafactura);
    

}
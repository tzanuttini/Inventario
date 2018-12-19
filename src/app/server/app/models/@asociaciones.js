module.exports = (db, sequelize, Sequelize) => {

    db.proveedor = require('../models/proveedor.model')(sequelize, Sequelize);
    db.cliente = require('../models/cliente.model')(sequelize, Sequelize);
    db.rubro = require('../models/rubro.model')(sequelize, Sequelize);
    db.articulo = require('../models/articulo.model')(sequelize, Sequelize);
    db.facturacompra = require('../models/facturacompra.model')(sequelize, Sequelize);
    db.facturaventa = require('../models/facturaventa.model')(sequelize, Sequelize);
    db.itemcompra = require('../models/itemcompra.model')(sequelize, Sequelize);
    db.itemventa = require('../models/itemventa.model')(sequelize, Sequelize);

    db.rubro.hasMany(db.articulo, {
        as: 'articulos'
    });
    db.articulo.belongsTo(db.rubro, {
        as: 'rubro'
    });

    db.facturacompra.hasMany(db.itemcompra, {
        as: 'items',
        onDelete: 'cascade'
    });

    db.facturaventa.hasMany(db.itemventa, {
        as: 'items',
        onDelete: 'cascade'
    });

    db.proveedor.hasMany(db.facturacompra, {
        as: 'facturas',
        onDelete: 'cascade'
    })


    db.cliente.hasMany(db.facturaventa, {
        as: 'facturas',
        onDelete: 'cascade'
    })

    return db;
}
module.exports = (sequelize, Sequelize) => {
    const Facturacompra = sequelize.define('facturacompra', {
        fecha: {
            type: Sequelize.DATE
        },
        puntoventa: {
            type: Sequelize.INTEGER
        },
        numero: {
            type: Sequelize.INTEGER
        },
        tipo: {
            type: Sequelize.CHAR
        }
    }, {
        indexes: [{
            unique: true,
            fields: ['proveedorId', 'puntoventa', 'numero', 'tipo']
        }],
        tableName: 'facturascompras',
        timestamps: true,
    });
    return Facturacompra;
}
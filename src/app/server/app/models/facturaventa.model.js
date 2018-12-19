module.exports = (sequelize, Sequelize) => {
    const Facturaventa = sequelize.define('facturaventa', {
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
            fields: ['tipo', 'puntoventa', 'numero']
        }],
        tableName: 'facturasventas',
        timestamps: true,
    });
    return Facturaventa;
}
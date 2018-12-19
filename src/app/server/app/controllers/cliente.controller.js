const db = require('../configs/db.config.js');
const Cliente = db.cliente;
const Telefono = db.telefono;
const Facturaventa = db.facturaventa;
const Itemventa = db.itemventa;

exports.init = (req, res) => {

	Cliente.create({
		razonsocial: 'Zanuttini Gastón',
		cuit: '20-38369258-0',
		condicioniva: 'Consumidor Final'
	});

	Cliente.create({
		razonsocial: 'CompuGamers',
		cuit: '30-12345678-8',
		condicioniva: 'Responsable Inscripto'
	});
};

exports.findAll = (req, res) => {
	Cliente.findAll({
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva']
	}).then(clientes => {
		res.json(clientes);
	});
};

exports.findById = (req, res) => {
	Cliente.findByPk(req.params.id, {
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva']
	}).then(cli => res.json(cli))
};

exports.destroy = (req, res) => {
	Cliente.destroy({
		where: {
			id: req.params.id
		}
	}).then(response => res.json(response))
}

exports.create = (req, res) => {
	Cliente.create({
		razonsocial: req.body.razonsocial,
		cuit: req.body.cuit,
		condicioniva: req.body.condicioniva
	}).then(cli => {
		res.json(cli)
		console.log(cli.get())
	})

}

exports.update = (req, res) => {
	Cliente.update({
			razonsocial: req.body.razonsocial,
			cuit: req.body.cuit,
			condicioniva: req.body.condicioniva
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Clientes actualizados: ' + count);
			res.json(Cliente.findByPk(req.params.id))
		})

}

exports.nuevafactura = (req, res) => {
	const body = req.body;

	const items = body.facturas[0].items.map(item => Itemventa.findOrCreate({
			where: {
				id: item.id
			},
			defaults: {
				idarticulo: item.idarticulo,
				renglon: item.renglon,
				cantidad: item.cantidad,
				codigoproducto: item.codigoproducto,
				descripcion: item.descripcion,
				preciounitario: item.preciounitario,
				iva: item.iva,
				subtotal: item.subtotal
			}
		})
		.spread((item, created) => item));

	Cliente.findByPk(body.id)
		.then(() => Facturaventa.create({
			fecha: req.body.facturas[0].fecha,
			puntoventa: req.body.facturas[0].puntoventa,
			numero: req.body.facturas[0].numero,
			tipo: req.body.facturas[0].tipo.trim(),
			clienteId: req.body.id
		}))
		.then(factura => Promise.all(items).then(storedItems => factura.addItems(storedItems)).then(() => factura))
		.then(factura => Facturaventa.findOne({
			where: {
				id: factura.id
			}
		}))
		.then(facturacompleta => res.status(201).json(facturacompleta), error => res.status(400).json(error));

}

exports.findAllfacturas = (req, res) => {
	Facturaventa.findAll({
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'clienteId']
	}).then(facturas => {
		res.json(facturas);
	});
};

exports.findfacturaById = (req, res) => {
	Facturaventa.findByPk(req.params.id, {
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'clienteId'],
		include: [{
			model: Itemventa,
			as: 'items',
			attributes: ['id', 'idarticulo', 'renglon', 'cantidad', 'codigoproducto', 'descripcion', 'preciounitario', 'iva', 'subtotal']
		}]
	}).then(factura => {
		res.json(factura);
	});
};

exports.findultimafactura = (req, res) => {
	Facturaventa.findAll({
		limit: 1,
		order: [
			['createdAt', 'DESC']
		]
	}).then(function (factura) {
		res.json(factura);
	});
};
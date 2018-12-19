const db = require('../configs/db.config');
const Proveedor = db.proveedor;
const Telefono = db.telefono;
const Facturacompra = db.facturacompra;
const Itemcompra = db.itemcompra;

exports.init = (req, res) => {

	Proveedor.create({
		razonsocial: 'Compu Intel',
		cuit: '32-25413698-5',
		condicioniva: 'Responsable Inscripto'
	});

	Proveedor.create({
		razonsocial: 'San PCs',
		cuit: '31-32456987-5',
		condicioniva: 'Responsable Inscripto'
	});

};

exports.findAll = (req, res) => {
	Proveedor.findAll({
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva']
	}).then(proveedores => {
		res.json(proveedores);
	});
};

exports.findById = (req, res) => {
	Proveedor.findByPk(req.params.id, {
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva']
	}).then(pro => res.json(pro))
};

exports.destroy = (req, res) => {
	Proveedor.destroy({
		where: {
			id: req.params.id
		}
	}).then(response => res.json(response))
}

exports.create = (req, res) => {
	Proveedor.create({
		razonsocial: req.body.razonsocial,
		cuit: req.body.cuit,
		condicioniva: req.body.condicioniva
	}).then(pro => {
		res.json(pro)
		console.log(pro.get())
	})

}

exports.update = (req, res) => {
	Proveedor.update({
			razonsocial: req.body.razonsocial,
			cuit: req.body.cuit,
			condicioniva: req.body.condicioniva
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Proveedores actualizados: ' + count);
			res.json(Proveedor.findByPk(req.params.id))
		})

}

exports.nuevafactura = (req, res) => {
	const body = req.body;

	const items = body.facturas[0].items.map(item => Itemcompra.findOrCreate({
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

	Proveedor.findByPk(body.id)
		.then(() => Facturacompra.create({
			fecha: req.body.facturas[0].fecha,
			puntoventa: req.body.facturas[0].puntoventa,
			numero: req.body.facturas[0].numero,
			tipo: req.body.facturas[0].tipo.trim(),
			proveedorId: req.body.id
		}))
		.then(factura => Promise.all(items).then(storedItems => factura.addItems(storedItems)).then(() => factura))
		.then(factura => Facturacompra.findOne({
			where: {
				id: factura.id
			}
		}))
		.then(facturacompleta => res.status(201).json(facturacompleta), error => res.status(400).json(error));
}

exports.findAllfacturas = (req, res) => {
	Facturacompra.findAll({
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'proveedorId']
	}).then(facturas => {
		res.json(facturas);
	});
};

exports.findfacturaById = (req, res) => {
	Facturacompra.findByPk(req.params.id, {
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'proveedorId'],
		include: [{
			model: Itemcompra,
			as: 'items',
			attributes: ['id', 'idarticulo', 'renglon', 'cantidad', 'codigoproducto', 'descripcion', 'preciounitario', 'iva', 'subtotal']
		}]
	}).then(factura => {
		res.json(factura);
	});
};

exports.findultimafactura = (req, res) => {
	Facturacompra.findAll({
		limit: 1,
		order: [
			['createdAt', 'DESC']
		]
	}).then(function (factura) {
		res.json(factura);
	});
};
const db = require('../configs/db.config.js');
const Op = db.Sequelize.Op;
const Articulo = db.articulo;
const Rubro = db.rubro;

exports.init = (req, res) => {

	Articulo.create({
		codigo: 'HDD',
		nombre: 'Hard Disk Drive Seagate 1Tb',
		descripcion: 'Disco Rigido',
		preciocompra: 1200,
		precioventa: 2000,
		cantidad: 3
	}).then(articulo => {
		Rubro.create({
				nombre: 'Discos Rigidos'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

	Articulo.create({
		codigo: 'MOT',
		nombre: 'Monitor Led 19" Samsung',
		descripcion: 'Monitor LED 19"',
		preciocompra: 3000,
		precioventa: 4500,
		cantidad: 5
	}).then(articulo => {
		Rubro.create({
				nombre: 'Monitores'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

	Articulo.create({
		codigo: 'MOG',
		nombre: 'Mouse GAMER Logitech M100',
		descripcion: 'Mouse Optico GAMER Logitech M. M100',
		preciocompra: 1000,
		precioventa: 1700,
		cantidad: 34
	}).then(articulo => {
		Rubro.create({
				nombre: 'Mouses'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

};

exports.findAll = (req, res) => {
	Articulo.findAll({
		attributes: ['id', 'codigo', 'nombre', 'descripcion', 'preciocompra', 'precioventa', 'cantidad'],
		include: [{
			model: Rubro,
			attributes: ['id', 'nombre'],
			as: 'rubro',
		}]
	}).then(articulos => {
		res.json(articulos);
	});
};

exports.findAllStock = (req, res) => {
	Articulo.findAll({
		attributes: ['id', 'codigo', 'nombre', 'descripcion', 'preciocompra', 'precioventa', 'cantidad'],
		include: [{
			model: Rubro,
			attributes: ['id', 'nombre'],
			as: 'rubro',
		}],
		where: {
			cantidad: {
				[Op.gt]: 1
			}
		}
	}).then(articulos => {
		res.json(articulos);
	});
};

exports.findById = (req, res) => {
	Articulo.findByPk(req.params.id, {
		attributes: ['id', 'codigo', 'nombre', 'descripcion', 'preciocompra', 'precioventa', 'cantidad'],
		include: [{
			model: Rubro,
			attributes: ['id', 'nombre'],
			as: 'rubro',
		}]
	}).then(art => res.json(art))
};

exports.destroy = (req, res) => {
	Articulo.destroy({
		where: {
			id: req.params.id
		}
	}).then(response => res.json(response))
}

exports.create = (req, res) => {
	Articulo.create({
		codigo: req.body.codigo,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		preciocompra: req.body.preciocompra,
		precioventa: req.body.precioventa,
		cantidad: req.body.cantidad
	}).then(art => {
		art.setRubro(req.body.rubro.id)
		res.send(art)
		console.log(art.get())
	})

}

exports.update = (req, res) => {
	Articulo.update({
			codigo: req.body.codigo,
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			preciocompra: req.body.preciocompra,
			precioventa: req.body.precioventa,
			cantidad: req.body.cantidad,
			rubroId: req.body.rubro.id
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Artículos actualizados: ' + count);
			res.json(Articulo.findByPk(req.params.id))
		})

}
const db = require('../configs/db.config');
const Rubro = db.rubro;

exports.init = (req, res) => {
	Rubro.create({
		nombre: 'Sin Rubro',
	});
}

exports.findAll = (req, res) => {
	Rubro.findAll({
		attributes: ['id', 'nombre'],
	}).then(rubros => {
		res.json(rubros);
	});
}

exports.findById = (req, res) => {
	Rubro.findByPk(req.params.id, {
		attributes: ['id', 'nombre']
	}).then(rub => res.json(rub))
};


exports.destroy = (req, res) => {
	if (req.params.id > 1) {
		Rubro.destroy({
			where: {
				id: req.params.id
			}
		}).then(response => {
			db.sequelize.query('UPDATE articulos SET "rubroId" = 1 WHERE "rubroId" IS NULL');
			res.json(response)})
	} else {
		res.sendStatus(405);
	}
}

exports.create = (req, res) => {
	Rubro.create({
		nombre: req.body.nombre
	}).then(rub => {
		res.send(rub)
		console.log(rub.get())
	})

}

exports.update = (req, res) => {
	Rubro.update({
			nombre: req.body.nombre
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Rubros actualizados: ' + count);
			res.json(Rubro.findByPk(req.params.id))
		})
}
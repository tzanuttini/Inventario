var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-auth, Content-Type');
  next();
});

const db = require('./app/configs/db.config');

const proveedores = require('./app/controllers/proveedor.controller');
const clientes = require('./app/controllers/cliente.controller');
const rubros = require('./app/controllers/rubro.controller');
const articulos = require('./app/controllers/articulo.controller');

db.sequelize.sync({
  force: true
}).then(() => {
  console.log('**** Dropado todo y Resync con { force: true } ****');
  proveedores.init();
  clientes.init();
  rubros.init();
  articulos.init();
  console.log('**** Datos iniciales generados con exito ****');
});

require('./app/routes/route.js')(app);

db.env.listenOn
var server = app.listen(db.env.puerto, db.env.listenOn, function () {
  console.log("Server corriendo en http://%s:%s", server.address().address, server.address().port)
});
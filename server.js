require('./model/db');

const express = require('express');

const maquinarioController = require('./controllers/maquinarioController');

const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json()); //tranforma em json
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

const port = 8008;
app.listen(port, () => {
  console.log(`Express server started at port: ${port}`)
})

app.use('/maquinario', maquinarioController);

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/TractianDB", {useNewUrlParser: true}, err =>{
  if(!err) { console.log(`MongoDB connection succeeded.`)}
  else { console.log(`Error in DB connection ${err}`)}
});

require('./maquinario.model');

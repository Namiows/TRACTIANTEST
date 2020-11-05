const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/tractianDB", {useNewUrlParser: true});

mongoose.connection
  .once('open', () => console.log('Connected'))
  .on('error', err => {
    console.log(`Your Error: ${err}`)
  });


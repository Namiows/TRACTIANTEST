const mongoose = require('mongoose');

var MaquinarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Need something here',
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  modelo: {
    type: String,
  },
  responsableId: {
    type: String,
  },
  status: {
    type: String,
  }
});

//fazer validacao se der tempo
MaquinarioSchema.path('image').validate((val) => {
  imgRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp|jpg)$/i;
  return imgRegex.test(val);
}, 'Invalid image.')

mongoose.model('Maquinario', MaquinarioSchema);
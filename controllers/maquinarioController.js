const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Maquinario = mongoose.model('Maquinario')

//Create
router.get('/', (req, res) => {
  res.render('maquinario/addOrEdit', {
    viewTitle: "Insira os dados do Maquinario"
  });
});

//for create and update
router.post('/', (req, res) => {
  if (req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res)
});

const updateRecord = () => {
  Maquinario.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
    if(!err) {
      res.redirect('maquinario/list');
    }else {
      if(err.name == 'validationError') {
        handleValidationError(err, req.body);
        res.render('maquinario/addOrEdit', {
          viewTitle:'Atualizar Maquina',
          maquinario: req.body
        });
      }
      else
          console.log(`Erro durante a atualizacao: ${err}`)
    }
  });
}

const insertRecord = (req, res) => {
  var maquinario = new Maquinario();
  maquinario.name = req.body.name;
  maquinario.image = req.body.image;
  maquinario.description = req.body.description;
  maquinario.responsableId = req.body.responsableId;
  maquinario.modelo = req.body.modelo;
  maquinario.status = req.body.status;
  maquinario.save((err, doc) => {
    if(!err)
      res.redirect('maquinario/list');
    else {
      if(err.image == 'validationError') {
        handleValidationError(err, req.body);
        res.render('maquinario/addOrEdit', {
          viewTitle: "Insira os dados do Maquinario",
          maquinario: req.body
        });
      }
      else{
        console.log(`Error during record insertion: ${err}`);
      }
    };
  });
};

router.get('/list', (req,res) => {
  Maquinario.find((err, docs) => {
    if(!err) {
      res.render('maquinario/list', {
        list: docs
      });
    }
    else {
      console.log(`Retrieving maquinario list error: ${err}`)
    }
  })
});

const handleValidationError = (err, body) => {
  for(field in err.errors)
  {
    switch (err.errors[field].path) {
      case 'name':
        body ['nameError'] = err.errors[field].message;
        break;
      case 'image':
        body ['imageError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

//update
router.get('/:id', (req, res) => {
  Maquinario.findById(req.params.id,(err, doc) => {
    if(!err) {
      res.render('maquinario/addOrEdit', {
        viewTitle: "Atualizar Maquina",
        maquinario: doc
      })
    }
  })
});

//delete
router.get('/delete/:id', (req, res) => {
  Maquinario.findByIdAndRemove(req.params.id, (err, doc) => {
    if(!err) {
      res.redirect('/maquinario/list');
    }
    else { console.log(`Erro ao deletar maquinario: ${err}`); }
  });
})

module.exports = router;
'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../constrollers/usuario-controller');
const auth = require('../middlewares/authentication');

let _ctrl = new controller();

//autenticação e registro de usuários, não seve exigir o token, pois ele ainda não existe
router.post('/autenticar', _ctrl.autenticar);
router.post('/register', _ctrl.post);

//Token auth required
router.get('/', auth, _ctrl.get);
router.get('/:id', auth, _ctrl.getById);
router.post('/', _ctrl.post);
router.put('/:id', auth, _ctrl.put);
router.delete('/:id', auth,  _ctrl.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controller/usuario_controller');
const { validaToken } = require('../controller/auth_controller');

//Rotas sem autenticação
router.post('/', controller.inserir);

// A partir daqui, rotas com autenticação
router.use((req, res, next) => {
    validaToken(req, res, next);
});

router.get('/', controller.listar);
router.get('/search', controller.buscarUsuario);
router.put('/', controller.atualizar);
router.delete('/', controller.deletar);
// router.get('/:id', controller.buscarPorId);

module.exports = router;
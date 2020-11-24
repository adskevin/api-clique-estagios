const express = require('express');
const router = express.Router();
const controller = require('../controller/vaga_controller');
const { validaToken } = require('../controller/auth_controller');

// A partir daqui, rotas com autenticação
router.use((req, res, next) => {
    validaToken(req, res, next);
});

router.get('/', controller.listar);
router.post('/', controller.inserir);
router.get('/getByCompany', controller.buscarVagaCNPJ);
router.get('/search', controller.buscarVaga);
router.put('/', controller.atualizar);
router.delete('/:id', controller.deletar);
// router.get('/:id', controller.buscarPorId);

module.exports = router;
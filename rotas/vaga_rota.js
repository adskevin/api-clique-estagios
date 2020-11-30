const express = require('express');
const router = express.Router();
const controller = require('../controller/vaga_controller');
const { validaToken } = require('../controller/auth_controller');

router.get('/', controller.listar);
router.get('/search', controller.buscarVaga);

// A partir daqui, rotas com autenticação
router.use((req, res, next) => {
    validaToken(req, res, next);
});

router.post('/', controller.inserir);
router.get('/getByCompany', controller.buscarVagaCNPJ);
router.get('/getByPerson', controller.buscarVagaCPF);
router.post('/interesse', controller.interesseVaga);
router.get('/interessados', controller.interessados);
router.put('/', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
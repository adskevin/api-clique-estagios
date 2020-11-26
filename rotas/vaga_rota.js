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
router.get('/getByPerson', controller.buscarVagaCPF);
router.post('/interesse', controller.interesseVaga);
router.get('/interessados', controller.interessados);
router.get('/search', controller.buscarVaga);
router.put('/', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controller/empresa_controller');
const { validaToken } = require('../controller/auth_controller');

//Rotas sem autenticação
router.post('/', controller.inserir);
// router.post('/auth', controller.validaEmpresa);

// A partir daqui, rotas com autenticação
router.use((req, res, next) => {
    validaToken(req, res, next);
    console.log(req.isUser);
});

router.get('/', controller.listar);
//Adicionado search para buscar empresa pelo nome
router.get('/search', controller.buscarEmpresa);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controller/usuario_controller');
const { validaToken } = require('../controller/auth_controller');

//Rotas sem autenticação
router.post('/', controller.inserir);
// router.post('/auth', controller.validaUsuario);

// A partir daqui, rotas com autenticação
router.use((req, res, next) => {
    validaToken(req, res, next);
});

router.get('/', controller.listar);
//Adicionado search para buscar usuario pelo nome
router.get('/search', controller.buscarUsuario);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
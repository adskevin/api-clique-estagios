const express = require('express');
const router = express.Router();
const controller = require('../controller/vaga_controller');
const { validaToken } = require('../controller/auth_controller');

// A partir daqui, rotas com autenticação
router.use((req, res, next) => {
    validaToken(req, res, next);
    console.log(req.isUser);
    if(req.isUser === true) {
        res.send(403, 'Não autorizado');
    }
});

router.get('/', controller.listar);
router.post('/', controller.inserir);
//Adicionado search para buscar vaga pelo nome
router.get('/search', controller.buscarVaga);
router.get('/:id', controller.buscarPorId);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
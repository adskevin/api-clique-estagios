const express = require('express');
const router = express.Router();
const controller = require('../controller/vaga_controller');
const { validaToken } = require('../controller/auth_controller');
const Usuario = require('../model/usuario');

router.get('/', controller.listar);
router.get('/search', controller.buscarVaga);

// A partir daqui, rotas com autenticação
router.use((req, res, next) => {
    validaToken(req, res, next);
});

router.post('/', controller.inserir);
router.get('/getByCompany', controller.buscarVagaCNPJ);
router.get('/getByPerson', controller.buscarVagaCPF);

router.use('/interesse', (req, res, next) => {
    let idVaga = req.body.idVaga;
    let idUsuario = req.id;
    let vagaIgual = false;

    Usuario.findById(idUsuario, (err, usuario) => {
        var arrayVagas = usuario.informacoes.vagasInteresse;
        arrayVagas.map((vaga) => {
            if (vaga == idVaga) {
                vagaIgual = true;
            }
        });
    }).then(() => {
        if (vagaIgual) {
            res.status(400).send({
                code: 1,
                message: "Usuario já cadastrado nessa vaga"
            });
            return;
        }
        next();
    });
});
router.post('/interesse', controller.interesseVaga);

router.get('/interessados', controller.interessados);
router.put('/', controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
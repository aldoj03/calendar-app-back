/*
    Rutas de utenticacion
    host + /api/auth/
*/

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const { validarJWT } = require('../helpers/validar-token')
const { validarCampos } = require('../middlewares/validarCampos')


router.post('/register', [
    check('name').not().isEmpty().withMessage("El nombre es obligatorio"),
    check('email').isEmail().withMessage("El email es obligatorio"),
    check('password').isLength({ min: 6 }).withMessage("El password es obligatorio"),
    validarCampos
], authController.register)


router.post('/', [
    check('email').isEmail().withMessage("El email es obligatorio"),
    check('password').not().isEmpty().withMessage("La contrase;a"),
    validarCampos
], authController.login)


router.get('/renew',validarJWT, authController.renewToken)

module.exports = router
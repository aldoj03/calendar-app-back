const { Router } = require('express')
const { check } = require('express-validator')
const eventsController = require('../controllers/eventsController')
const isDate = require('../helpers/isDateValidator')
const { validarJWT } = require('../helpers/validar-token')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()

router.use(validarJWT)

router.get('/', [
    check('title').not().isEmpty().isString().withMessage('El titulo es obligatorio'),
    check('start').custom(isDate).withMessage('Fecha de inicio es obligatoria'),
    check('end').custom(isDate).withMessage('Fecha de fin es obligatoria'),
    validarCampos
], eventsController.getEvents)


router.post('/', eventsController.createEvent)
router.put('/:id', eventsController.updateEvent)
router.delete('/:id', eventsController.deleteEvent)

module.exports = router
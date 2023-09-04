import { body } from "express-validator";

export const cuponesDTO = [
    body('cupon')
        .notEmpty().withMessage('El cupon es obligatorio')
        .isString().withMessage('El cupon debe ser string'),
    body('expiration')
        .notEmpty().withMessage('La expiration es obligatoria')
        .isString().withMessage('La expiration debe ser string y cumplir este formato "YYYY-MM-DDTHH:mm:ssZ"')
        .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/).withMessage('La expiracion debe tener formato "YYYY-MM-DDTHH:mm:ssZ"'),
    body('discount')
        .notEmpty().withMessage('El discount es obligatorio')
        .isNumeric().withMessage('El discount debe ser tipo numérico'),
    body('validation')
        .notEmpty().withMessage('El validation es obligatorio')
        .isBoolean().withMessage('El validation debe ser tipo boolean'),
    body('id_ConsumeUser')
        .optional()
        .isNumeric().withMessage('El id_ConsumeUser debe ser tipo numérico')
]
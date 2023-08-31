import { body } from "express-validator";

export const direccionesDTO = [
    body('id_user')
        .notEmpty().withMessage('id_user es obligatorio')
        .isNumeric().withMessage('id_user debe ser de tipo númerico'),
    body('address')
        .notEmpty().withMessage('address es obligatorio')
        .isString().withMessage('address debe ser de tipo string')
]
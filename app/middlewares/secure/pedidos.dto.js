import { body } from "express-validator";

export const pedidosDTO = [
    body('id_restaurant')
        .notEmpty().withMessage('id_restaurant es obligatorio')
        .isNumeric().withMessage('id_restaurant debe ser de tipo numérico'),
    body('products')
        .notEmpty().withMessage('products es obligatorio')
        .isArray().withMessage('products debe ser un array'),
    body('address')
        .notEmpty().withMessage('address es obligatorio')
        .isString().withMessage('address debe ser de tipo string')
]
import { body } from "express-validator";

export const pedidosDTO = [
    body('id_restaurant')
        .notEmpty().withMessage('id_restaurant es obligatorio')
        .isNumeric().withMessage('id_restaurant debe ser de tipo numérico'),
    body('id_seller')
        .notEmpty().withMessage('id_seller es obligatorio')
        .isNumeric().withMessage('id_seller debe ser de tipo numérico'),
    body('id_user')
        .notEmpty().withMessage('id_user es obligatorio')
        .isNumeric().withMessage('id_user debe ser de tipo numérico'),
    body('products')
        .notEmpty().withMessage('products es obligatorio')
        .isArray().withMessage('products debe ser un array'),
    body('address')
        .notEmpty().withMessage('address es obligatorio')
        .isNumeric().withMessage('address debe ser de tipo numérico')
]
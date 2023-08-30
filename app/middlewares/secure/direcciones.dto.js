import { body } from "express-validator";

export const direccionesDTO = [
    body('usuario_id')
        .notEmpty().withMessage('usuario_id es obligatorio')
        .isNumeric().withMessage('usuario_id debe ser de tipo númerico'),
    body('direccion')
        .notEmpty().withMessage('La direccion es obligatorio')
        .isString().withMessage('La direccion debe ser de tipo string')
]
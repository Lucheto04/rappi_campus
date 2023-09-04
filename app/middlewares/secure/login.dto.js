import { body } from "express-validator";

export const loginDTO = [
    body('email')
        .notEmpty().withMessage('El "email" es obligatorio')
        .isEmail().withMessage('El "email" debe estar en formato email '),
    body('password')
        .notEmpty().withMessage('El "password" es obligatorio')
        .isString().withMessage('El "password" debe ser tipo string')
]
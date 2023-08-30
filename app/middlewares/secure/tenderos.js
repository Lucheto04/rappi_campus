import { body } from "express-validator";




let tendero = {
    entidad1: "name",
    entidad2: "email_tendero",
    entidad3: "password_tendero",
    entidad4: "movil_number"
}
let {entidad1: t1, entidad2: t2, entidad3: t3, entidad4: t4} = tendero

export const tenderoDto = [
    body(`${t1}`)
    .notEmpty().withMessage(`El ${t1} es obligatorio.`)
    .isString().withMessage(`El ${t1} debe ser un string.`),

    body(`${t2}`)
    .notEmpty().withMessage(`El ${t2} es obligatorio.`)
    .isString().withMessage(`El ${t2} debe ser un string.`),

    body(`${t3}`)
    .notEmpty().withMessage(`El ${t3} es obligatorio.`)
    .isString().withMessage(`El ${t3} debe ser un string.`),


    body(`${t4}`)
    .notEmpty().withMessage(`El ${t4} es obligatorio.`)
    .isString().withMessage(`El ${t4} debe ser un string.`),
]
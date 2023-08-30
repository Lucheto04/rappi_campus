import { body } from "express-validator";

let restaurante = {
    entidad1: "name",
    entidad2: "address",
    entidad3: "qualification"
}
let {entidad1: r1, entidad2: r2, entidad3: r3} = restaurante

export const postRestauranteDto = [
    body(`${r1}`)
    .notEmpty().withMessage(`El ${r1} es obligatorio.`)
    .isString().withMessage(`El ${r1} debe ser un string.`),

    body(`${r2}`)
    .notEmpty().withMessage(`El ${r2} es obligatorio.`)
    .isString().withMessage(`El ${r2} debe ser un string.`),

    body(`${r3}`)
    .notEmpty().withMessage(`El ${r3} es obligatorio.`)
    .isInt().withMessage(`El ${r3} debe ser el numero del id de un rol.`),
]
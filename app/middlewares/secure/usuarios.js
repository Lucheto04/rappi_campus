import { body } from "express-validator";

let trainer = {
    entidad1: "user",
    entidad2: "name",
    entidad3: "email_user",
    entidad4: "password_user",
    entidad5: "movil_number",
    entidad6: "level"
}
let {entidad1: u1, entidad2: u2, entidad3: u3, entidad4: u4, entidad5: u5, entidad6: u6} = trainer

export const postUsuarioDto = [
    body(`${u1}`)
    .notEmpty().withMessage(`El ${u1} es obligatorio.`)
    .isString().withMessage(`El ${u1} debe ser un string.`),

    body(`${u2}`)
    .notEmpty().withMessage(`El ${u2} es obligatorio.`)
    .isString().withMessage(`El ${u2} debe ser un string.`),

    body(`${u3}`)
    .notEmpty().withMessage(`El ${u3} es obligatorio.`)
    .isString().withMessage(`El ${u3} debe ser un string.`),

    body(`${u4}`)
    .notEmpty().withMessage(`El ${u4} es obligatorio.`)
    .isString().withMessage(`El ${u4} debe ser un string.`),

    body(`${u5}`)
    .notEmpty().withMessage(`El ${u5} es obligatorio.`)
    .isString().withMessage(`El ${u5} debe ser un string.`),

    body(`${u6}`)
    .notEmpty().withMessage(`El ${u6} es obligatorio.`)
    .isInt().withMessage(`El ${u6} debe ser el numero del id de un rol.`),
]
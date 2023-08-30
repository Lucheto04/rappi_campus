import { check } from "express-validator";

let trainer = {
    entidad1: "usuario",
    entidad2: "nombre",
    entidad3: "correo",
    entidad4: "contraseña",
    entidad5: "telefono",
    entidad6: "nivel"
}
let {entidad1: u1, entidad2: u2, entidad3: u3, entidad4: u4, entidad5: u5, entidad6: u6} = trainer

export const postUsuarioDtoV1 = () => [
    check(`${u1}`)
    .notEmpty().withMessage(`El ${t1} es obligatorio.`)
    .isString().withMessage(`El ${t1} debe ser un string.`),

    check(`${u2}`)
    .notEmpty().withMessage(`El ${t1} es obligatorio.`)
    .isString().withMessage(`El ${t1} debe ser un string.`)
    .matches(/^[a-zA-Z]+$/).withMessage(`El ${t1} solo resive letras.`),

    check(`${u3}`)
    .notEmpty().withMessage(`El ${t1} es obligatorio.`)
    .isString().withMessage(`El ${t1} debe ser un string.`),

    check(`${u4}`)
    .notEmpty().withMessage(`El ${t1} es obligatorio.`)
    .isString().withMessage(`El ${t1} debe ser un string.`),

    check(`${u5}`)
    .notEmpty().withMessage(`El ${t1} es obligatorio.`)
    .isString().withMessage(`El ${t1} debe ser un string.`),

    check(`${u6}`)
    .notEmpty().withMessage(`El ${i1} es obligatorio.`)
    .isNumeric().withMessage(`El ${i1} debe ser el numero del id de un rol.`),
]
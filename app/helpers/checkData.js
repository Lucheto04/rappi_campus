export function chekData(dbNames, body, check) {
    let json = {};
    //Cambia las propiedades manejadas por el usuario a las establecidas en la base de datos 
    for (const [fronted, backend] of Object.entries(dbNames)) {
        json[backend] = body[fronted];
    }
    if (check) {
        //Elimina valores en undefined del objeto
        for (const clave in json) {
            if (json[clave] === undefined) {
                delete json[clave];
            }
        }
        return json;
    } else {
        return json;
    }
}
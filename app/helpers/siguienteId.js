import { conexion } from "../../config/db/atlas.js";


export default async function siguienteId(coleccionName) {
    let db = await conexion();
    let countersCollection = db.collection('counters');

    const sequenceDocument = await countersCollection.findOneAndUpdate(
        { counter: `${coleccionName}Id` },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after" }
    );
    return sequenceDocument.value.sequence_value;
}
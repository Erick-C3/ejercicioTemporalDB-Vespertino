const { createConnection } = require("mysql2/promise");
/* const modulo = require("modulo"); */
const leer = require("prompt-sync")();

async function main() {
    const conexionDB = await crearConexion();
    let opcionMenu = 0;
    console.log("1 - Mostrar todos los pokemons");
    console.log("2 - Seleccionar un pokemon por id");
    opcionMenu = Number(leer());
    switch (opcionMenu) {
        case 1:
            const [resultado] = await conexionDB.query("SELECT * FROM pokemon");
            console.table(resultado);
            break;
        case 2:
            console.log("Ingresa el id del pokemon buscado");
            const pokemonId = Number(leer());
            const [resultadoPokemonBuscado] = await conexionDB.query("SELECT * FROM pokemon WHERE id = ?", [pokemonId]);
            console.table(resultadoPokemonBuscado);
            break;
        default:
            console.log("Opcion no encontrada");
    }
    conexionDB.end();
}

main();

async function crearConexion() {
    return await createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "juego"
    });
}

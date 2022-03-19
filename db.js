const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'cursos',
    password: '1234',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

async function getCursos() {
    const client = await pool.connect()
    const res = await client.query(
        "select * from cursos"
    )
    client.release()
    return res.rows
}

async function newCurso(nombre, nivel, fecha, duracion) {
    const client = await pool.connect()
    await client.query(
        "insert into cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) returning *",
        [nombre, nivel, fecha, duracion]
    )
    client.release()
    return
}

async function editCurso (nombre, nivel, fecha, duracion, id) {
    const client = await pool.connect()

    await client.query({
        text: "update cursos set nombre=$1, nivel=$2, fecha=$3, duracion=$4 where id=$5",
        values: [nombre, nivel, fecha, duracion, id]
    })

    client.release()
    return
}



module.exports = { getCursos, newCurso, editCurso }
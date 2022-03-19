const express = require('express')
const nunjucks = require('nunjucks')
const { getCursos, newCurso, editCurso } = require('./db.js')

const app = express()

app.use(express.static('static'))

nunjucks.configure('templates', {
    express: app,
    autoescape: true
})

app.get('/', async (req, res) => {

    res.render('index.html')
})

app.get('/cursos', async (req, res) => {
    const cursos = await getCursos()
    res.send(cursos)
})

app.post('/curso', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async () => {
        const datos = JSON.parse(body);
        await newCurso(datos.nombre, datos.nivelTecnico, datos.fechaInicio, datos.duracion)
        res.send('Curso registrado de manera exitosa')
    })
})

app.put('/curso', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async () => {
        const datos = JSON.parse(body);
        await editCurso(datos.nombre, datos.nivelTecnico, datos.fechaInicio, datos.duracion, datos.id)
        res.send('Curso modificado de manera exitosa')
    })
})

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))
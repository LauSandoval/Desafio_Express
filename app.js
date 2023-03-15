const fs = require('fs');
const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log("El Servidor Está Encendido!!")
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.json())

app.post('/canciones', (req, res) => {
  const canciones = JSON.parse(fs.readFileSync('./repertorio.json'))
  const cancion = req.body
  canciones.push(cancion)
  fs.writeFileSync('./repertorio.json', JSON.stringify(canciones))
  res.send('Cancion agregada')
})



app.get('/canciones', (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync('./repertorio.json'))
  res.send(repertorio)
})

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params
  const cancion = req.body
  const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
  const index = canciones.findIndex(p => p.id == id)
  canciones[index] = cancion
  fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
  res.send("canción modificada con éxito")
  })
  


app.delete('/canciones/:id', (req, res) => {
  const {id} = req.params.id
  const repertorio = JSON.parse(fs.readFileSync('./repertorio.json'))
  repertorio.splice(id, 1)
  fs.writeFileSync('./repertorio.json', JSON.stringify(repertorio))
  res.send('Producto eliminado')
})


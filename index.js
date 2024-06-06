import express from "express" 
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
  res.send("Hello world")
})

app.post("/leitura", async (req, res) => {
  let leituraSensor = req.body
  console.log(leituraSensor)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log("App iniciado na porta " + port)
})
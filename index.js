import express from "express" 
import bodyParser from "body-parser"
import fs, { write } from "node:fs"

const app = express()
const port = 3000

const csvExiste = () => {
  if (!fs.existsSync("./dados_arcomp.csv")) {
    let linhaHeaders = []
    let headers = ["data", "leitura", "\n"]
    linhaHeaders.push(headers.join(","))

    linhaHeaders = Buffer.from(linhaHeaders[0])

    fs.writeFile("dados_arcomp.csv", linhaHeaders, (err) => {
      if (err) throw (err)
      console.log("Arquivo criado")
    })
  }
  return true
}

const addDadosSensor = (leituraSensor) => {
  if (csvExiste()) {
    let data = new Date()
    let leitura = leituraSensor["sensor"]

    let linhaCsv = []
    linhaCsv.push([data, leitura, "\n"].join(","))

    linhaCsv = Buffer.from(linhaCsv[0])

    fs.appendFile("dados_arcomp.csv", linhaCsv, (err) => {
      if (err) throw (err)
      console.log("Dados salvos")
    })
  }
}

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
  res.send("Hello world")
})

app.post("/leitura", async (req, res) => {
  let leituraSensor = req.body

  addDadosSensor(leituraSensor)

  res.sendStatus(200)
})

app.listen(port, () => {
  console.log("App iniciado na porta " + port)
})
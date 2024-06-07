import express from "express" 
import bodyParser from "body-parser"
import fs from "node:fs"

const app = express()
const port = 3000

const csvExiste = () => {
  if (!fs.existsSync("./dados_arcomp.csv")) {
    let linhaHeaders = []
    let headers = ["data", "hora", "leitura", "\n"]
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
    let dataObj = new Date()
    let data = String(dataObj.getDate()) + "/" + String(dataObj.getMonth() + 1) + "/" + String(dataObj.getFullYear())
    let hora = String(dataObj.getHours()) + ":" + String(dataObj.getMinutes()) + ":" + String(dataObj.getSeconds())

    let leitura = leituraSensor["sensor"]
    leitura = converterParaPressao(leitura / 1000)

    let linhaCsv = []
    linhaCsv.push([data, hora, leitura, "\n"].join(","))

    linhaCsv = Buffer.from(linhaCsv[0])

    fs.appendFile("dados_arcomp.csv", linhaCsv, (err) => {
      if (err) throw (err)
      console.log("Dados salvos")
    })
  }
}

const converterParaPressao = (leituraSensor) => {
  return ((leituraSensor - 0.3) / 0.27)
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
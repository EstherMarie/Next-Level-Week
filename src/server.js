const express = require("express")
const server = express() // a variável "express" recebeu uma função, então é possível executar a função express()
// a variável server será um objeto de servidor que poderá ser usado para várias coisas, como ligar o servidor

// configurar pasta pública 
server.use(express.static("public")) // use tb é uma configuração do servidor. | static é uma função tb e espera um argumento.


// configurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html")
})

// Importante: ajustar os links dos arquivos html. Será necessário tirar o ".html" do final dos links, pois a partir de agora não estaremos mais chamando arquivos (ex: create-point.html), mas sim rotas (create-point).


// ligar o servidor
server.listen(3000)
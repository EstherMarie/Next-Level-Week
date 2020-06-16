const express = require("express")
const server = express() // a variável "express" recebeu uma função, então é possível executar a função express()
// a variável server será um objeto de servidor que poderá ser usado para várias coisas, como ligar o servidor

// configurar pasta pública 
server.use(express.static("public")) // use tb é uma configuração do servidor. | static é uma função tb e espera um argumento.


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da minha aplicação
// página inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"}) // está enviando a variável title (feita no h1) do index.html para o nunjucks.
}) // após a instalação do nunjucks houve uma série de alterações. 
// A primeira: res.sendFile foi alterado para res.render
//A segunda: (__dirname + "/views/index.html") foi alterado para apenas "index.html". Isso se deve ao "src/views" no nunjucks.configure ali de cima.

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})


server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

// Importante: ajustar os links dos arquivos html. Será necessário tirar o ".html" do final dos links, pois a partir de agora não estaremos mais chamando arquivos (ex: create-point.html), mas sim rotas (create-point).


// ligar o servidor
server.listen(3000)
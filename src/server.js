const express = require("express")
const server = express() 
/* Anotações:
    a variável "express" recebeu uma função, então é possível executar a função express()
    a variável server será um objeto de servidor que poderá ser usado para várias coisas, como ligar o servidor
*/

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta pública 
server.use(express.static("public")) // use tb é uma configuração do servidor. | static é uma função tb e espera um argumento.

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


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
    /* esta é a rota onde serão recebidos os dados formulário pelo back-end */
    // req.query: query strings da nossa url (ex: ?name=)
    
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    /* com a alteração do method do create-point.html 
    de GET para POST (que impede que os dados do form fiquem expostos no link)
    o req.query deixou de funcionar. */

    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)

    
})


server.get("/search", (req, res) => {
    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total})
    })

    /* o return res.render("search-results.html") estava aqui. Foi movido para dentro da função para poder utilizar o "rows" */
    
})

// Importante: ajustar os links dos arquivos html. Será necessário tirar o ".html" do final dos links, pois a partir de agora não estaremos mais chamando arquivos (ex: create-point.html), mas sim rotas (create-point).


// ligar o servidor
server.listen(3000)
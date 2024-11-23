import express from 'express';
// Importa o framework Express para criar a aplicação web.
import routes from './src/routes/postsroutes.js';


// Array de posts de exemplo (será substituído pelos dados do banco de dados posteriormente).
const posts = [
    {
        id: 1,
        descricao: "Foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato fazendo yoga",
        imagem: "https://placekitten.com/400/300"
    },
    {
        id: 3,
        descricao: "Gatinho dormindo",
        imagem: "https://placekitten.com/200/200"
    },
    {
        id: 4,
        descricao: "Gatos brincando com um novelo de lã",
        imagem: "https://placekitten.com/500/400"
    },
    {
        id: 5,
        descricao: "Gato olhando pela janela",
        imagem: "https://placekitten.com/300/250"
    },
    {
        id: 6,
        descricao: "Gato com uma caixa",
        imagem: "https://placekitten.com/450/350"
    }
];

// Cria uma instância do aplicativo Express.
const app = express();
app.use(express.static("uploads"))
routes(app)


app.listen(3000, () => {
    console.log("servidor escutando...");
});
// Inicia o servidor na porta 3000 e exibe uma mensagem no console.



/*function buscarpostID(id){
    return posts.findIndex((post) => {
        return post.id == Number(id)
    })
}

app.get("/posts/:id", (req, res) =>{
    const index = buscarpostID(req.params.id)
    res.status(200).json(posts[index]);
});*/
import express from "express"; // Importa o framework Express.js
import multer from "multer"; // Importa o middleware Multer para manipular uploads de arquivos
import cors from "cors";

const corsoptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Importa funções controladoras de posts do arquivo postscontrollers.js
import { listarposts, postarnovopost, uploadimagem, atualizarnovopost } from "../controllers/postscontrollers.js";

// Configura o armazenamento para uploads de arquivos usando diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Função para definir o diretório de destino
    cb(null, 'uploads/'); // Define o diretório 'uploads/' para armazenar arquivos
  },
  filename: function (req, file, cb) { // Função para definir o nome do arquivo
    cb(null, file.originalname); // Usa o nome original do arquivo enviado
  }
});

// Cria uma instância do middleware Multer com as configurações de armazenamento
const upload = multer({ storage }); // Utiliza o storage configurado anteriormente

// Função para definir rotas da aplicação
const routes = (app) => {
  app.use(express.json()); // Habilita o middleware para analisar requisições JSON
  app.use(cors(corsoptions))

  // Rota GET para listar todos os posts (implementação na função listarposts)
  app.get("/posts", listarposts);

  // Rota POST para criar um novo post (implementação na função postarnovopost)
  app.post("/posts", postarnovopost);

  // Rota POST para upload de imagem utilizando o middleware upload.single("imagem")
  // (implementação na função uploadimagem)
  app.post("/upload", upload.single("imagem"), uploadimagem);

  app.put("/upload/:id", atualizarnovopost)
};

export default routes; // Exporta a função routes para uso em outros arquivos
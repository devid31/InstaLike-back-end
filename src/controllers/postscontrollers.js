import { gettodosposts, criarpost, atualizarpost } from "../models/postmodels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiservice.js"

/**
 * Lista todos os posts existentes no banco de dados.
 *
 * @param {object} req - Objeto de requisição HTTP.
 * @param {object} res - Objeto de resposta HTTP.
 */
export async function listarposts(req, res) {
  // Chama a função do modelo para buscar todos os posts.
  const posts = await gettodosposts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso).
  res.status(200).json(posts);
}

/**
 * Cria um novo post no banco de dados.
 *
 * @param {object} req - Objeto de requisição HTTP.
 * @param {object} res - Objeto de resposta HTTP.
 */

export async function postarnovopost(req, res) {
  const novopost = req.body; // Obtém os dados do novo post do corpo da requisição.

  try {
    const postcriado = await criarpost(novopost); // Cria o novo post no banco de dados.
    res.status(200).json(postcriado); // Retorna o post criado como resposta.
  } catch (erro) {
    console.error(erro.message); // Loga a mensagem de erro no console.
    res.status(500).json({ Erro: "Falha na requisição" }); // Retorna um erro 500 com uma mensagem genérica.
  }
}

/**
 * Cria um novo post com uma imagem e renomeia o arquivo da imagem.
 *
 * @param {object} req - Objeto de requisição HTTP.
 * @param {object} res - Objeto de resposta HTTP.
 */
export async function uploadimagem(req, res) {
  // Cria um objeto com as informações básicas do novo post, incluindo o caminho da imagem.
  const novopost = {
    descricao: "",
    imgUrl: req.file.path,
    alt: "",
  };

  try {
    const postcriado = await criarpost(novopost); // Cria o novo post no banco de dados.
    // Constrói o novo nome do arquivo da imagem, incluindo o ID do post.
    const imagematualizada = `uploads/${postcriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome.
    fs.renameSync(req.file.path, imagematualizada);
    res.status(200).json(postcriado); // Retorna o post criado como resposta.
  } catch (erro) {
    console.error(erro.message); // Loga a mensagem de erro no console.
    res.status(500).json({ Erro: "Falha na requisição" }); // Retorna um erro 500 com uma mensagem genérica.
  }
}

export async function atualizarnovopost(req, res) {
  const id = req.params.id;
  const urlimagem = `http://localhost:3000/${id}.png`
  

  try {
    const imgbuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgbuffer)
    const post = {
      imgUrl: urlimagem,
      descricao: descricao,
      alt: req.body.alt
  }  

    const postcriado = await atualizarpost(id, post); // Cria o novo post no banco de dados.
    res.status(200).json(postcriado); // Retorna o post criado como resposta.
  } catch (erro) {
    console.error(erro.message); // Loga a mensagem de erro no console.
    res.status(500).json({ Erro: "Falha na requisição" }); // Retorna um erro 500 com uma mensagem genérica.
  }
}
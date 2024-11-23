import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbconfig.js';
// Importa a função para conectar ao banco de dados, definida em outro arquivo.


const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados usando a string de conexão obtida da variável de ambiente.
// O resultado da conexão é armazenado na variável 'conexao'.

// Função assíncrona para obter todos os posts do banco de dados.
export async function gettodosposts() {
    // Obtém o banco de dados 'Imersão-InstaLike'.
    const db = conexao.db("Imersão-InstaLike")
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts")
    // Executa uma consulta para encontrar todos os documentos da coleção e retorna um array.
    return colecao.find().toArray()
}

export async function criarpost(novopost) {
    // Obtém o banco de dados 'Imersão-InstaLike'.
    const db = conexao.db("Imersão-InstaLike")
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts")
    // Executa uma consulta para encontrar todos os documentos da coleção e retorna um array.
    return colecao.insertOne(novopost)
}

export async function atualizarpost(id, novopost) {
    // Obtém o banco de dados 'Imersão-InstaLike'.
    const db = conexao.db("Imersão-InstaLike")
    // Obtém a coleção 'posts' dentro do banco de dados.
    const colecao = db.collection("posts")
    // Executa uma consulta para encontrar todos os documentos da coleção e retorna um array.
    const objid = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objid)}, {$set:novopost})
}
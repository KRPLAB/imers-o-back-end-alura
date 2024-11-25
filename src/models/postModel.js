import 'dotenv/config';
import { ObjectId } from "mongodb";
import { conectarAoBanco } from "../config/dbConfig.js";

// Conecta ao banco de dados MongoDB
const conexao = await conectarAoBanco(process.env.STR_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instabytes'
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção 'posts'
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: post});
}
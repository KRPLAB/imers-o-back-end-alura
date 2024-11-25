import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModel.js";
import { gerarDescricaoComGemini } from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Busca todos os posts
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        // Cria um novo post no banco de dados
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Cria um novo post com a imagem
        const postCriado = await criarPost(novoPost);
        // Renomeia a imagem com o ID do post e move para a pasta de uploads
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        // Cria um novo post no banco de dados
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt,
        }
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.log(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}
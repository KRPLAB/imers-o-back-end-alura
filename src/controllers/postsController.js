import { getTodosPosts } from "../models/postModel.js";

export async function listarPosts (req, res) {
    // Busca todos os posts
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON
    res.status(200).json(posts);
}
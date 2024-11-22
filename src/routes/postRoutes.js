import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

const upload = multer({
    dest: "./uploads"
});

export const routes = (app) => {
    // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());
    
    // Rota para buscar todos os posts
    app.get("/posts", listarPosts);

    // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    // Rota para criar um novo post
    app.post("/upload", upload.single("imagem"), uploadImagem);
}
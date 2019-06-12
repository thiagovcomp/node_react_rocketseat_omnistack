const Post  = require('../models/Post');
const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');


module.exports = {

    //Route index responsável por retornar todos os posts
    async index(req, res) {
        // '-createdAt' ordendando pelo último inserido
        const posts = await Post.find().sort('-createdAt');

        //Retorna os dados via json
        return res.json(posts);
    },

    //Route store responsável por salvar Post
    async store(req, res) {
        
        //adicionando os dados enviado pelo backend para
        // as váriaveis dentro {}
        const { author, place, description, hashtags } = req.body;
       
        
        //enviando o dado do file->filename para a váriavel image
        const { filename: image } = req.file;

        // return res.json({'ok':image});
        // return res.json(req.file);
        

        const [name]      = image.split('.');
        const filename  = `${name}.jpg`;
        //Redimensionando a imagem e 
        //alterando pro formato desejado
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', filename)
            )

        //Excluir o arquivo original   
        fs.unlinkSync(req.file.path)

        //Inserindo os dados do backend para o banco de dados
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: filename
        })

        //Envia uma informação em tempo real a todos os clientes conectados
        // que foi inserido um novo post, através do io(Criado e passado no arquivo index)
        req.io.emit('post', post);

        //Retorno dos dados salvos
        return res.json(post);
    }
}
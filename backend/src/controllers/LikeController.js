const Post = require('../models/Post');

module.exports = {
   
    async store(req, res) {

        //Realiza a busca no banco de dados através do id
        // passado pelo backend
        const post = await Post.findById( req.params.id );

        //Adiciona +1 ao like
        post.likes += 1;

        //Salva a alteração no banco de dados
        await post.save();

        // Envia uma requisição em tempo real, para todos os clientes conectados
        req.io.emit('like', post);

        //Retorno via json
        return res.json(post);
    }
}
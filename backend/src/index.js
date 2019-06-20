//importação das dependencias
const express   = require('express');
const mongoose  = require('mongoose');
const path      = require('path');
const cors      = require('cors');

//Permite acessar os routes, parametros e respostas para os clientes
const app = express();

// Permite o protocolo http e websocket que permite a comunicação em tempo real
const server = require('http').Server(app);
const io     = require('socket.io')(server);

//Conexão banco de dados
mongoose.connect(
    'mongodb+srv://root:250684Thi$@cluster0-wjibf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

//Método para passar a informação do io para todos os routes
//Criação de middleware(pois são interceptadores)
//Para evitar a interrupção por uma rota passar o parâmetro nex e chamar a função next()
app.use((req, res, next) => {
    req.io = io;

    next();
})

//Permite que diferentes urls acessem o backend
app.use(cors());
    
//Permite que o front acesse as imagens(arquivos fisícos) do backend
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

//Arquivo separado de routes
app.use(require('./routes'))

server.listen(3333);


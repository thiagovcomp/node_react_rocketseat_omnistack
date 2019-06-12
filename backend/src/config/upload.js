const multer = require('multer');
const path   = require('path');

//Configuração do destino de envio dos arquivos anexados
// definição do nome do aquivo file.originalname
module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })
}
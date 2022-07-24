const multer = require('multer');
const fs = require('fs')

// Vamos exportar nosso módulo multer, executando com as nossas configurações em um objeto.
module.exports = (multer({

	// Como deve ser feito o armazenamento dos arquivos?
  storage: multer.diskStorage({

    // Qual deve ser o destino deles?
    destination: (req, file, cb) => {

      let evento_titulo = req.body.evento_titulo


      // Na criação de um evento novo, o req.body.pasta vem null, então estamos criando uma pasta undefined. Além de salvar as imagens lá.
      // let dir2 = './public/images/'+req.body.pasta
      let dir_salva = './public/images/img_eventos_originais/'
      if (!fs.existsSync(dir_salva)) fs.mkdirSync(dir_salva)

      // Setamos o destino como segundo paramêtro do callback
      cb(null, dir_salva)
    },

    // E como devem se chamar?
    filename: (req, file, cb) => {

      // Setamos o nome do arquivo que vai ser salvado no segundo paramêtro
      // Apenas concatenei a data atual com o nome original do arquivo, que a biblioteca nos disponibiliza.
      let newPath = file.originalname.split('.')[0] + '.webp'
      // E salvamos alí com o nome original. Mas pra que salvamos ele aĺí??
      cb(null, file.originalname)
    },
  }), // FIM DA CONFIGURAÇÃO DE ARMAZENAMENTO


  // Como esses arquivos serão filtrados, quais formatos são aceitos/esperados?
  fileFilter: (req, file, cb) => {

    // Procurando o formato do arquivo em um array com formatos aceitos
    // A função vai testar se algum dos formatos aceitos do ARRAY é igual ao formato do arquivo.
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatoAceito => formatoAceito == file.mimetype )

    if (isAccepted) return cb(null, true) // (validação aceita)
    if (!isAccepted) return cb(null, false) // (validação falhouo)
  }

}))

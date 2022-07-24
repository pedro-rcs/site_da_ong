const multer = require('multer');
const fs = require('fs')

// Vamos exportar nosso módulo multer, executando com as nossas configurações em um objeto.
module.exports = (multer({

	// Como deve ser feito o armazenamento dos arquivos?
    storage: multer.diskStorage({
      
        // Qual deve ser o destino deles?
        destination: (req, file, cb) => {
            console.log("TA IDNOOO")
            let dir2 = './public/imgs'

            if (!fs.existsSync(dir2)){
                fs.mkdirSync(dir2);
            }
            
            // Setamos o destino como segundo paramêtro do callback
            //cb(null, './public/images');
            cb(null, dir2)
        },
        
        // E como devem se chamar?
        filename: (req, file, cb) => {
            
            // Setamos o nome do arquivo que vai ser salvado no segundo paramêtro
            // Apenas concatenei a data atual com o nome original do arquivo, que a biblioteca nos disponibiliza.
            let newPath = file.originalname.split('.')[0] + '.webp';
            
            /*
            let pre_nome
            if (req.body.input_tipo == "vai"){
               pre_nome = "miniatura-"  
            }
            if (req.body.input_tipo == "confirma"){
                pre_nome = "real-"
            }
            */

            // console.log("O req.body.input_tipo é "+req.body.input_tipo+" então o pre_nome é"+pre_nome)
            // cb(null, Date.now().toString() + '-' + file.originalname);
            cb(null, file.originalname);
            
        },

        
    }), // FIM DA CONFIGURAÇÃO DE ARMAZENAMENTO


    // Como esses arquivos serão filtrados, quais formatos são aceitos/esperados?
    fileFilter: (req, file, cb) => {
     
            // Procurando o formato do arquivo em um array com formatos aceitos
      	     // A função vai testar se algum dos formatos aceitos do ARRAY é igual ao formato do arquivo.
            const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find( formatoAceito => formatoAceito == file.mimetype );

            // O formato do arquivo bateu com algum aceito?
            if(isAccepted){
                // Executamos o callback com o segundo argumento true (validação aceita)
                return cb(null, true);
            }
            
            // Se o arquivo não bateu com nenhum aceito, executamos o callback com o segundo valor false (validação falhouo)
            return cb(null, false);
    }
  
}))
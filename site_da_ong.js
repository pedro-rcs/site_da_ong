// Colocar todo o backend nesse documento aqui, mesmo que fique grande, para uma vizualização completa da parada.
// Colocr um multer apenas
// Talvez deixar só os modelos em um documento separado.


/* 1 - Carregamos os módulos, certificado ssl, funções e o esqueleto padrão. */
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const MongoStore = require('connect-mongo')
const http = require('http')
const https = require('https')
const cors = require('cors')
const fs = require('fs-extra')
const sharp = require('sharp')
const util = require('util')
const fetch = require('node-fetch')
const multer = require('./middleware/multer') // IMPORTAMOS NOSSO MIDDLEWARE
const multer2 = require('./middleware/multer2') // IMPORTAMOS NOSSO MIDDLEWARE
// const oi = require('./funcoes/oi.js')
const pombo = require('./funcoes/pombo.js')
const funcoes = require('./funcoes/funcoes.js')
const conexoes = require('./subscribers/conexoes.js')
const modelos = require('./models/modelos')


// SSL
let privateKey
let certificate
let ca
let credentials

if (process.env.NODE_ENV === 'producao') {
  
  privateKey = fs.readFileSync('/etc/letsencrypt/live/sitedaong.ddns.net/privkey.pem', 'utf8')
  certificate = fs.readFileSync('/etc/letsencrypt/live/sitedaong.ddns.net/cert.pem', 'utf8')
  ca = fs.readFileSync('/etc/letsencrypt/live/sitedaong.ddns.net/chain.pem', 'utf8')
  
  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  }
}



const esqueleto_padrao = require('./public/esqueleto_padrao.json')

/* 2 - Coisas do MongoDB */
const modeloEventos = require('./models/modelos').modeloEventos

mongoose.connect(`${process.env.CONEXAO_MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })


/* 3 - Coisas do Express */
const app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

const jsonParser = bodyParser.json()

/* 4 - Configurações das sessions, usadas para login. */
const TWO_HOURS = 1000 * 60 * 60 * 2
const {
  SESS_NAME = 'sessao',
  SESS_SECRET = 'segredo_da_sessao',
  SESS_LIFETIME = TWO_HOURS
} = process.env
const IN_PROD = process.env.NODE_ENV === 'production'

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: false,
    secure: true,
    httpOnly: true

  },
  store: MongoStore.create({ mongoUrl: `${process.env.CONEXAO_MONGODB}` })
}))

/* 5 - Redirecionamentos */
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {

    console.log("redirect to Index")
    const dados =  { tela: 'index' }
    res.render('index', {'dados': JSON.stringify(dados)})
  } else {
    next()
  }
}

const redirectHome = (req, res, next) => {
  if (req.session.userId) {

    console.log("redirect to Home")
    const dados = { tela: 'sistema_home' }
    res.render('index', {'dados': JSON.stringify(dados)})
  } else {
    next()
  }
}

/* 6 - Iniciamos o servidor https */
const server = (process.env.NODE_ENV === 'development') ? http.createServer(app) : https.createServer(credentials, app)


server.listen(process.env.PORTA_SERVIDOR, () => {
  console.log(`Servidor HTTP rodando em https://${process.env.IP_SERVIDOR}:${process.env.PORTA_SERVIDOR}`)
  console.log('Para derrubar o servidor: ctrl + c')
  console.log('........................................................')
  console.log("Coming hoooome")
})

/* 7 - ROTAS */

// As rotas seguem um padrão de 3 etapas.
// 1 - Recebe os valores das contantes do cliente.
// 2 - Passa estes valores para alguma função, que retorna respostas.
// 3 - Dependendo das respostas, realizam alguma outra ação ou geralmente mandam a resposta para o cliente.






app.get('/', redirectHome, (req, res) => {
  const dados =  { tela: 'index' }
  res.render('index', {'dados': JSON.stringify(dados)})
})
app.get('/index', redirectHome, (req, res) => {
  const dados =  { tela: 'index' }
  res.render('index', {'dados': JSON.stringify(dados)})
})

/* equeceu_senha tem na biblioteca oi, mas não tem no Site da Ong pois tá tudo no index */
/*
app.get('/esqueceu_senha', (req, res) => {
  const dados =  { tela: 'esqueceu_senha' }
  res.render('index', {'dados': JSON.stringify(dados)})
})
*/

/* Oi */
app.post('/login', jsonParser, async (req, res) => { 

  const { login, senha } = req.body

  const busca_usuario = await modelos.usuarios.findOne({login: login})

  if (!busca_usuario) {
    return res.send({msg:'nao_achou_ninguem'})
  }

  if (busca_usuario) {
    const testa_senha = await this.testa_senha(busca_usuario, senha)
    if (testa_senha === 'senha_errada') return res.send({msg:'senha_errada'})
    if (testa_senha === 'senha_correta') {

      req.session.userId = busca_usuario._id
      req.session.usuario_nome = busca_usuario.nome
      req.session.usuario_email = busca_usuario.login
      req.session.usuario_verificada = busca_usuario.verificada

      return res.send({ msg: 'senha_correta', nome: busca_usuario.nome, status_confirma: busca_usuario.verificada, email: busca_usuario.login })
    }
  }
})


app.post('/esqueceu_senha', jsonParser, (req, res) => { oi.esqueceu_senha_v(email, req, res) })
app.get('/confirma', (req, res) => { oi.confirma_cadastro(req, res) })
app.post('/reenvia_token', (req, res) => { oi.reenvia_token(req, res) })
app.get('/altera_senha', (req, res) => { oi.altera_senha_get(req, res) })
app.post('/altera_senha', (req, res) => { oi.altera_senha_post(req, res) })

// Construtor de sites
app.get('/construtor_site', redirectHome, function (req, res) {
  const dados =  { tela: 'construtor_site' }
  res.render('index', {'dados': JSON.stringify(dados)})
})
app.post('/verifica_end', jsonParser, async function (req, res) {
  const { site_end } = req.body
  funcoes.verifica_end(site_end, req, res)
})
app.post('/faz_site', jsonParser, async function (req, res) {
  const { plano, nome_ong, endereco_web, historia, visao, missao, valores, email, senha, telefone, rua, numero, bairro, cidade, estado, cep, nome_pix, chave_pix, image_logo, image_capa } = req.body

  await funcoes.faz_site(plano, nome_ong, endereco_web, historia, visao, missao, valores, email, senha, telefone, rua, numero, bairro, cidade, estado, cep, nome_pix, chave_pix, image_logo, image_capa, req, res)
})
app.post('/ver_nome', jsonParser, async function (req, res) {
  const { nome_ong } = req.body
  await funcoes.testa_nome(nome_ong, req, res)
})


app.post('/mensagem_SDO', async function (req, res) {
  const { msg_nome, msg_email, msg_mensagem } = req.body
  await pombo.dispara_email('contato_sdo', { nome: msg_nome, email: msg_email, mensagem: msg_mensagem })

  return res.redirect('/')
})

app.post('/msg_site_cliente', async function (req, res) {
  const { msg_nome, msg_email, msg_mensagem, msg_site } = req.body
  console.log("msg_site: " + msg_site)
  await pombo.dispara_email('msg_site_cliente', { nome: msg_nome, email: msg_email, mensagem: msg_mensagem })

  return res.redirect(`/${msg_site}`)
})



/* Sistema */
// Sistema Home
app.get('/sistema_home', redirectLogin, (req, res) => {
  const dados =  { tela: 'sistema_home' }
  res.render('index', {'dados': JSON.stringify(dados)})
})

app.post('/puxa_sistema_home', (req, res) => {
  funcoes.puxa_usuario(req, res)  // Puxa as informações do usuario recém logado
})

// Sistema Altera
app.get('/sistema_altera', redirectLogin, (req, res) => {
  const dados =  { tela: 'sistema_altera' }
  res.render('index', {'dados': JSON.stringify(dados)})
})
app.post('/salva_alteracoes_site', jsonParser, (req, res) => {

  const id_site = req.body.id_site

  const obj = {
    nome_ong: req.body.nome_ong,
    endereco_web: req.body.endereco_web,
    historia: req.body.historia,
    image_logo: req.body.image_logo,
    image_capa: req.body.image_capa,
    missao: req.body.missao,
    visao: req.body.visao,
    valores: req.body.valores,
    email: req.body.email,
    telefone: req.body.telefone,
    rua: req.body.rua,
    bairro: req.body.bairro,
    numero: req.body.numero,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado,
    nome_pix: req.body.nome_pix,
    chave_pix: req.body.chave_pix
  }

  funcoes.salva_alteracoes_site(req, res, obj, id_site)
})

// Sistema fotos e videos
app.get('/sistema_fotos_videos', redirectLogin, (req, res) => {
  const dados = { tela: 'sistema_fotos_videos' }
  res.render('index', {'dados': JSON.stringify(dados)})
})
app.post('/sistema_fotos_videos', [multer.array('image'), jsonParser], async (req, res, next) => {

  console.log(req.body)

  // A metodologia é a seguinte.
  // 1 - Chega um req.body.tipo === 'novo'. Neste caso, criamos as pastas para o novo evento. Só.
  // 2 - Se colocar mais

  // NOVO EVENTO - Sem imagens, só clicou no 'Adicionar Evento'.
  if (req.body.tipo === 'novo') {

    /* Aqui criaremos as pastas para o evento. */
    const pasta_deste_evento = Date.now().toString()

    // Criamos constantes para armazenar o endereço de toda árvore de pastas deste evento.
    const dir_todos_eventos = './public/sites/' + req.body.endereco_web + '/eventos'
    const dir_o_evento = dir_todos_eventos + '/' + pasta_deste_evento
    const dir_imgs_evento = dir_o_evento + '/images'
    const dirMiniaturas = dir_imgs_evento + '/miniaturas'
    const dirGrandes = dir_imgs_evento + '/grandes'

    // Se for o primeiro evento deste site, criamos a pasta para abrigar eventos.
    if (!fs.existsSync(dir_todos_eventos)) fs.mkdirSync(dir_todos_eventos)

    // Se não existir pasta para este evento específico, criamos ela e as subpastas.
    if (!fs.existsSync(dir_o_evento)) {
      fs.mkdirSync(dir_o_evento)
      fs.mkdirSync(dir_imgs_evento)
      fs.mkdirSync(dirMiniaturas)
      fs.mkdirSync(dirGrandes)
    }

    // Mandamos a resposta de evento criado e o nome da pasta deste evento.
    return res.send({ tipo: 'criandoNovoEvento', pasta_deste_evento: pasta_deste_evento })
  }

  // CONFIRMA
  if (req.body.tipo === 'confirma') {
    console.log("Confirrrrma")

    const pasta_grandes = 'public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/grandes/'
    const pasta_miniaturas = 'public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/miniaturas/'

    // Se fotos foram apagadas.
    // Aqui apagamos fisicamente as imagens marcadas como deletadas.
    if (req.body.tabelaApagadas) {

      const tabelaApagadas = JSON.parse(req.body.tabelaApagadas)

      for (let i = 0; i < tabelaApagadas.length; i++) {

        const imgDeletadaWebp = tabelaApagadas[i].split('.')[0] + '.webp'

        if (req.body.estadoTela === 'novoEvento') {

          // Apagamos a miniatura e já handlemos o erro, sem throw
          fs.unlink(pasta_miniaturas + imgDeletadaWebp, err => {
            if (err) console.log(err)
          })

          // Apagamos tb a foto grande e já handlemos o erro, sem throw
          fs.unlink(pasta_grandes + imgDeletadaWebp, err => {
            if (err) console.log(err)
          })
        }

        if (req.body.estadoTela === 'editarEvento') {

          console.log("Confirma que editará evento.")

          await modeloEventos.findOne({ nome: req.body.titulo }, (err, item) => {
            if (err) {
              console.log('Algo de errado não está certo com a busca!')
            } else {
              // Se não encontramos nada.
              if (item === null) {
                console.log('Evento não encontrado.')
                // return res.redirect('/login') // Volta pra tela de login
              }

              // Se encontramos o que buscamos.
              if (item != null) {
                // let fotosSemAApagada
                const arrItemFotos = []

                // Preenchemos cada arraya com o grupo respectivo
                for (let i = 0; i < item.fotos.length; i++) {
                  arrItemFotos.push(item.fotos[i].nome)
                }

                const indiceImgDeletada = arrItemFotos.findIndex(element => element === imgDeletadaWebp)
                item.fotos.splice(indiceImgDeletada, 1)

                item.save(function (err, itemNovo) {
                  if (err) {
                    console.log(err)
                  }
                })

                // Apagamos a miniatura e já handlemos o erro, sem throw
                fs.unlink(pasta_miniaturas + imgDeletadaWebp, err => {
                  if (err) console.log(err)
                })

                // Apagamos tb a foto grande e já handlemos o erro, sem throw
                fs.unlink(pasta_grandes + imgDeletadaWebp, err => {
                  if (err) console.log(err)
                })
              }
            }
          }).catch(function (e) {
            console.log(e) // "Ah, não!"
          }).then(() => {
            // return res.send({ tipo: 'imgExcluida' })
          })
        }
      }
    }

    // Salvamos no banco de dados
    const tabelaDados = JSON.parse(req.body.tabela)
    const tabelaVideos = JSON.parse(req.body.tabelaVideos)

    let fotos = []
    for (let i = 0; i < tabelaDados.length; i++) {

      const newName = tabelaDados[i].nome.split('.')[0] + '.webp'

      let enderecoMiniatura = pasta_miniaturas + newName
      let enderecoGrande = pasta_grandes + newName

      fotos.push({ nome: newName, miniatura: enderecoMiniatura, real: enderecoGrande })
    }

    let busca_evt = await modeloEventos.findOne({ pasta: req.body.pasta })

    if (busca_evt === null) {

      const novoEvento = new modeloEventos({ id_site: req.session.userId, nome: req.body.titulo, pasta: req.body.pasta, data: req.body.data, capaAlbum: req.body.capaAlbum, fotos: fotos, videos: tabelaVideos })

      await conexoes.salva('eventos', novoEvento)
      return res.send({ tipo: 'novoEventoCadastrado', files: req.files })
    }

    if (busca_evt != null) {

      busca_evt.nome = req.body.titulo
      busca_evt.data = req.body.data
      busca_evt.fotos = fotos
      busca_evt.capaAlbum = req.body.capaAlbum
      busca_evt.videos = tabelaVideos

      await conexoes.salva('eventos', busca_evt)
      return res.send({ tipo: 'alteraçãoBemSucedida'})
    }
  }

  // Se houve sucesso no armazenamento
  if (req.files) {

    const pasta_grandes = 'public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/grandes/'
    const pasta_miniaturas = 'public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/miniaturas/'

    // DELETA EVENTO
    if (req.body.tipo === 'deletaEvento') {
      console.log('Deleeeta')

      modeloEventos.findOneAndDelete({ pasta: req.body.pasta }, (err, item) => {
        if (err) {
          console.log('Algo de errado não está certo com a busca!')
          throw err
        }
        if (item === null) console.log('Evento não encontrado.')
        if (item) {

          console.log('Evento encontrado, será deletado em 3, 2, 1...')

          fs.access('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta, (erro) => {
            if (!erro) {
              fs.remove('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta, erro => {
                if (err) {
                  console.log(err)
                } else {
                  return res.send({ tipo: 'eventoAntigoDeletado' })
                }
              })
            }
          })

        }
      })
    }



    // CANCELA - Cancela um novo cadastro de evento
    if (req.body.tipo === 'cancela') {

      // Deletando o arquivo antigo
      // O fs.acess serve para testar se o arquivo realmente existe, evitando bugs
      fs.access('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta, (err) => {
        // Um erro significa que a o arquivo não existe, então não tentamos apagar
        if (!err) {
          // Se não houve erros, tentamos apagar
          fs.remove('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta, err => {
            // Não quero que erros aqui parem todo o sistema, então só vou imprimir o erro, sem throw.
            if (err) {
              console.log(err)
            } else {
              console.log('Vai retornar')
              return res.send({ tipo: 'novoEventoCancelado' }) // ...enviamos a resposta ao cliente.
            }
          })
        }
      })
    }

    // DELETA - Apaga alguma foto. Se veio esta variavel, é pq ela alguma img acaba de ser deletada
    if (req.body.imgDeletada) {
      console.log("vamos a deletar alguma cosia aqui")
      console.log('req.body.imgDeletada: ' + req.body.imgDeletada)
      // Ajeitamos o nome da dita-cuja para a extensão correta
      const imgDeletadaWebp = req.body.imgDeletada.split('.')[0] + '.webp'

      if (req.body.estadoTela === 'novoEvento') {

        // Apagamos a miniatura e já handlemos o erro, sem throw
        fs.unlink('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/miniaturas/' + imgDeletadaWebp, err => {
          if (err) console.log(err)
        })

        // Apagamos tb a foto grande e já handlemos o erro, sem throw
        fs.unlink('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/grandes/' + imgDeletadaWebp, err => {
          if (err) console.log(err)
        })

        return res.send({ tipo: 'imgExcluida' }) // ...enviamos a resposta ao cliente.
      }

      if (req.body.estadoTela === 'editarEvento') {
        modeloEventos.findOne({ nome: req.body.eventoTitulo }, (err, item) => {
          if (err) {
            console.log('Algo de errado não está certo com a busca!')
          } else {
            // Se não encontramos nada.
            if (item === null) {
              console.log('Evento não encontrado.')
              // return res.redirect('/login') // Volta pra tela de login
            }

            // Se encontramos o que buscamos.
            if (item != null) {
              // let fotosSemAApagada
              const arrItemFotos = []

              // Preenchemos cada arraya com o grupo respectivo
              for (let i = 0; i < item.fotos.length; i++) {
                arrItemFotos.push(item.fotos[i].nome)
              }

              const indiceImgDeletada = arrItemFotos.findIndex(element => element === imgDeletadaWebp)

              item.fotos.splice(indiceImgDeletada, 1)

              console.log('indiceImgDeletada: ' + indiceImgDeletada)
              item.save(function (err, itemNovo) {
                if (err) {
                  console.log(err)
                }
              })

              // Apagamos a miniatura e já handlemos o erro, sem throw
              fs.unlink('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/miniaturas/' + imgDeletadaWebp, err => {
                if (err) console.log(err)
              })

              // Apagamos tb a foto grande e já handlemos o erro, sem throw
              fs.unlink('public/sites/' + req.body.endereco_web + '/eventos/' + req.body.pasta + '/images/grandes/' + imgDeletadaWebp, err => {
                if (err) console.log(err)
              })
            }
          }
        }).catch(function (e) {
          console.log(e) // "Ah, não!"
        }).then(() => { return res.send({ tipo: 'imgExcluida' }) })
      }
    }

    // DAQUI PRA BAIXO É DEPOIS DO UPLOAD.
    // NÃO QUANDO SE APERTA O CONFIRMA, MAS QUANDO SE UPA AS MINIATURAS MESMO.
    // Depóis de upar, hai que apagar as images originais, para não pesar, entende...

    let cont = 0 // cont é importante pq quando for igual ao req.files.length é pq a última imagem foi upada, então é hora de enviar ao cliente os dados das imagens upadas.

    for (let i = 0; i < req.files.length; i++) {
      // const newPath = req.files[i].path.split('.')[0] + '.webp'
      const novoFile = req.files[i].originalname.split('.')[0] + '.webp'

      const newPathMiniatura = pasta_miniaturas + novoFile
      const newPathGrandes = pasta_grandes + novoFile

      // Salvamos a Miniatura
      sharp(req.files[i].path).resize(250).toFormat('webp')
        .webp({
          quality: 80
        })
        .toBuffer()
        .then(data => {
          // Agora vamos armazenar esse buffer no novo caminho
          fs.writeFile(newPathMiniatura, data, err => {
            if (err) {
              // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
              throw err
            }
          })
        })

      // Salvamos a imagem Grande
      sharp(req.files[i].path).resize(500).toFormat('webp')
        .webp({
          quality: 80
        })
        .toBuffer()
        .then(data => {
          // Agora vamos armazenar esse buffer no novo caminho
          fs.writeFile(newPathGrandes, data, err => {
            if (err) {
              // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
              throw err
            }
          })

          console.log("Apagará o arquivo orixinal.: " + req.files[i].path)
          fs.unlink('./'+req.files[i].path, err => { if (err) console.log(err) })
          // Ta apagando no upload mas ta gravando denovo no confirma. Hmmmm...

          // Se o código chegou até aqui, deu tudo certo, então vamos retornar o novo caminho
          cont++

          // Se cont === req.files.length, ou seja, se for a última imagem upada...
          if (cont === req.files.length) {
            if (req.body.input_tipo === 'confirma') {
              console.log("ta vuundo por esta macaminoooo.")
            } else {

              console.log('Foram upadas ' + req.files.length + ' imagens. Miniaturas e grandes.')
              return res.send({ tipo: 'req.files', files: req.files }) // ...enviamos a resposta ao cliente.
            }
          }
        })



    }
  } else {
    console.log('nem pegou')
    return res.send({ tipo: 'nemPegou' }) // ...enviamos a resposta ao cliente.
  }
})

// Sistema Logout
app.get('/logout', redirectHome, function (req, res) {
  const dados =  { tela: 'index' }
  res.render('index', {'dados': JSON.stringify(dados)})
})
app.post('/logout', function (req, res) {
  req.session.destroy(err => {
    if (err) {
      // return res.redirect('/')
    }

    res.clearCookie(SESS_NAME)
    console.log("ta deslogando")
    return res.send({'msg': 'saiu'})
  })
})

/* Outros */
// Serve pra o construtor de sites e para o alterador de sites.
app.post('/altera_logo_capa', jsonParser, multer2.array('imagem'), async (req, res, next) => {

  const { tipo, end_ong, qual } = req.body
  console.log("qual: " + qual)
  let tipo_vai
  let tamanho_resize

  if (qual === 'altera_capa') {
    tipo_vai = 'altera_capa_upada'
    tamanho_resize = 1500
  }
  if (qual === 'altera_logo') {
    tipo_vai = 'altera_logo_upada'
    tamanho_resize = 250
  }

  if (qual === 'upa_capa') {
    tipo_vai = 'capa_upada'
    tamanho_resize = 1500
  }
  if (qual === 'upa_logo') {
    tipo_vai = 'logo_upada'
    tamanho_resize = 250
  }

  // NOVO LOGO
  if (tipo == 'novo') {
    // Se a seguinte pasta não existe, criamo-la
    const dir = './public/sites/' + end_ong + '/images/'
    const dir_sem_public = 'sites/' + end_ong + '/images/' // Necessario sem o public para o frontend ler

    if (!fs.existsSync(dir)) { fs.mkdir(dir, { recursive: true }, err => {}) }

    // Se houve sucesso no armazenamento
    if (req.files) {
      // Aqui iniciamos o sharp, para tratamento da imagem.

      const novo_file = req.files[0].originalname.split('.')[0] + '.webp'
      const newPath = dir + novo_file
      const newPath_vai = dir_sem_public + novo_file // Essa bendita let vai pro frontend, precisa ser sem o public

      // Salvamos a Miniatura

      let data_arq = await sharp(req.files[0].path).resize(tamanho_resize).toFormat('webp')
        .webp({
          quality: 80
        })
        .toBuffer()

      fs.writeFile(newPath, data_arq, err => {

        if (err) {
          // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
          throw err
        } else {
          console.log('oaisa: ' + newPath_vai)
          return res.send({ tipo: tipo_vai, newPath: newPath_vai, files: req.files }) // ...enviamos a resposta ao cliente.
        }
      })
    }
  }
})

app.get('/altera_senha', async function (req, res) {

  console.log("token: " + req.query.token)
  const alt_senha_get_res = await oi.altera_senha_get(req.query.token)

  if (alt_senha_get_res.msg === 'nao_achou_token') {
    const dados =  { tela: 'altera_senha', msg: 'nao_achou_token' }
    return res.render('index', {'dados': JSON.stringify(dados)})
  }

  if (alt_senha_get_res.msg === 'achou_token_mas_nao_achou_usuario') {
    const dados =  { tela: 'altera_senha', msg: 'achou_token_mas_nao_achou_usuario' }
    return res.render('index', {'dados': JSON.stringify(dados)})
  }

  if (alt_senha_get_res.msg === 'vai_alterar') {
    const dados =  { tela: 'altera_senha', msg: 'vai_alterar', id_usuario: alt_senha_get_res.id_usuario, id_token: alt_senha_get_res.id_token }
    return res.render('index', {'dados': JSON.stringify(dados)})
  }
})

app.post('/altera_senha', jsonParser, async (req, res) => {

  const { nova_senha, id_usuario, id_token } = req.body

  const alt_senha_post_res = await oi.altera_senha_post_v(nova_senha, id_usuario, id_token)
  if (alt_senha_post_res.msg === 'nao_achou_ninguem') {
    console.log("nada encontrado")
  }
  if (alt_senha_post_res.msg === 'nova_senha_criada') {
    return res.send({msg: 'nova_senha_criada'})
  }
})


app.post('/puxa_site', jsonParser, function (req, res) {
  console.log("puxando site")
  const { site_end, id_site } = req.body
  funcoes.puxa_site(site_end, id_site, req, res)
})


// Site do cliente
app.get('/:endereco_web', async function (req, res) {
  console.log("eje")
  const end_cadastrado = await funcoes.confere_endereco_web(req.params.endereco_web, req, res)

  if (end_cadastrado) {

    console.log("Encontrou o endereco")

    const dados =  { tela: 'site', 'endereco_web': req.params.endereco_web, 'id_site': end_cadastrado._id}
    res.render('index', {'dados': JSON.stringify(dados)})
  }

  if (!end_cadastrado) {

    console.log("nAO achou nada")

    const dados =  { tela: 'site', 'endereco_web': 'end_site_nao_existe' }
    res.render('index', {'dados': JSON.stringify(dados)})
  }

})
app.get('/design_system', (req, res) => {
  const dados = {tela : 'design_system'}
  res.render('index', {'dados': JSON.stringify(dados)})
})

app.get('/guia_de_estilo', (req, res) => {
  const dados = { tela: 'guia_de_estilo' }
  res.render('index', { 'dados': JSON.stringify(dados) })
})

app.get('/biblioteca_de_componentes', (req, res) => {
  const dados = { tela: 'biblioteca_de_componentes' }
  res.render('index', { 'dados': JSON.stringify(dados) })
})

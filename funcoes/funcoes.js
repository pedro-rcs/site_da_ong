require('dotenv').config()
const bcrypt = require('bcrypt')
const cryptoRandomString = require('crypto-random-string')
const util = require('util')

const conexoes = require('../subscribers/conexoes.js')
const esqueleto_padrao = require('../public/esqueleto_padrao.json')

const oi = require('./oi')
const pombo = require('./pombo')

module.exports = {

  confere_endereco_web: async function (endereco_web) {
    const busca_site = await conexoes.busca_um('sites', { endereco_web: endereco_web })
    return busca_site
  },

  puxa_eventos: async function (req, res) {

  },

  salva_alteracoes_site: async function (req, res, obj, id_site) {
    const busca_site = await conexoes.busca_um('sites', { _id: id_site })

    if (busca_site) {

      busca_site.nome = obj.nome_ong
      busca_site.historia = obj.historia

      busca_site.missao = obj.missao
      busca_site.visao = obj.visao
      busca_site.valores = obj.valores

      busca_site.rua = obj.rua
      busca_site.numero = obj.numero
      busca_site.bairro = obj.bairro
      busca_site.cidade = obj.cidade
      busca_site.estado = obj.estado
      busca_site.cep = obj.cep
      busca_site.email = obj.email

      busca_site.nome_pix = obj.nome_pix
      busca_site.chave_pix = obj.chave_pix

      busca_site.telefone = obj.telefone
      busca_site.image_logo = obj.image_logo
      busca_site.image_capa = obj.image_capa

      console.log("salvou e vai volar")
      const salva_site = await conexoes.salva('sites', busca_site)

      return res.send({msg: 'salva_alteracoes_site_ok'})
    }

    if (!busca_site) {

      console.log("nao achou nada")
      return res.send({msg: 'salva_alteracoes_site_deu_ruim'})
    }

  },

  puxa_usuario: async function (req, res) {

    let item_usuario = {
      _id: req.session.userId,
      nome: req.session.usuario_nome,
      login : req.session.usuario_email,
      verificada: req.session.usuario_verificada
    }

    const busca_site = await conexoes.busca_um('sites', { email: req.session.usuario_email })
    let busca_eventos = await conexoes.busca('eventos', { id_site: req.session.userId })

    console.log("busca_eventos:")
    console.log(util.inspect(busca_eventos, false, null, true /* enable colors */))


    return res.send({ msg: 'puxa_sistema_home', item_usuario: item_usuario, item_site: busca_site, item_eventos: busca_eventos })
  },

  puxa_site: async function (site_end, id_site, req, res) {

    const busca_site = await conexoes.busca_um('sites', { endereco_web: site_end })
    const busca_eventos = await conexoes.busca('eventos', { id_site: req.session.userId })

    let esta_logado
    if (req.session.userId) {
      esta_logado = "sim"
    }
    if (!req.session.userId) {
      esta_logado = "nao"
    }

    return res.send({msg: 'puxa_site', item_site: busca_site, item_eventos: busca_eventos, esta_logado: esta_logado})
  },

  busca_site: async function (nome_ong, req, res) {
    const cons_busca_site = await conexoes.busca_um('sites', { nome_ong: nome_ong })
    if (cons_busca_site) {
      return res.render('site', { item_site: cons_busca_site })
    }
  },

  altera_site_post: async function (nome_original, nome, historia, missao_tudo, visao_tudo, valores_tudo, rua, numero, bairro, cidade, estado, cep, email, telefone, req, res) {
    const busca_site = await conexoes.busca_um('sites', { nome_ong: nome_original })
    busca_site.nome = nome
    busca_site.historia = historia
    busca_site.missao = missao_tudo
    busca_site.visao = visao_tudo
    busca_site.valores = valores_tudo
    busca_site.rua = rua
    busca_site.numero = numero
    busca_site.bairro = bairro
    busca_site.cidade = cidade
    busca_site.estado = estado
    busca_site.cep = cep
    busca_site.email = email
    busca_site.telefone = telefone

    const salva_site = await conexoes.salva('sites', busca_site)
    return res.redirect('/sistema_altera_site')

    // return res.json({ tipo: "site_atualizado", novo_nome: nome })
  },

  verifica_end: async function (site_end, req, res) {

    const busca_site = await conexoes.busca_um('sites', { endereco_web: site_end })

    if (busca_site) {
      return res.send({msg: 'verifica_end_ja_tem', item: busca_site})
    }
    if (!busca_site) {
      return res.send({msg: 'verifica_end_vago', item: busca_site})
    }
  },


  testa_nome: async function (nome_ong, req, res) {
    const busca_nome = await conexoes.busca_um('sites', { nome_ong: nome_ong })

    if (busca_nome) {
      res.json({ tipo: 'ja_tem_esse_nome' })
    }
    if (!busca_nome) {
      const nome_ong_minusculas = nome_ong.toLowerCase()
      console.log('Esse nome aqui, moço.: ' + nome_ong)
      res.json({ tipo: 'nome_inedito', endereco_web: nome_ong_minusculas })
    }

  },

  faz_site: async function (plano, nome_ong, endereco_web, historia, visao, missao, valores, email, senha, telefone, rua, numero, bairro, cidade, estado, cep, nome_pix, chave_pix, image_logo, image_capa, req, res) {

    // Primeiro cadastramos o usuário. Usuário, não a ONG.
    const cadastro_usuario = await oi.cadastro(nome_pix, email, senha)
    if (cadastro_usuario.msg === 'usuario_ja_existe') {
      return res.render('/cadastro', { msg: 'usuario_ja_existe' }) // Usuário já foi cadastrado
    }

    // Buscamos o cadastrado anteriormente. Se já existe algum site cadastrado com esse nome.
    const busca_site = await conexoes.busca_um('sites', { nome_ong: nome_ong })

    // Se achar alguma coisa, altera o objeto achado com os valores upados e salva.
    if (!busca_site) {

      const obj_salva = {
        id_usuario: cadastro_usuario.id,
        plano: plano,
        nome_ong: nome_ong,
        endereco_web: endereco_web,
        historia: historia,
        visao: visao,
        missao: missao,
        valores: valores,
        email: email,
        telefone: telefone,
        rua: rua,
        numero: numero,
        cidade: cidade,
        bairro: bairro,
        estado: estado,
        cep: cep,
        nome_pix: nome_pix,
        chave_pix: chave_pix,
        image_logo: image_logo,
        image_capa: image_capa
      }

      const salva_site = await conexoes.salva('sites', obj_salva)

      console.log("oia o id" + salva_site.id)

      // Retorna com o endereço do site.
      return res.json({ tipo: 'novo_site_salvo', endereco_web: endereco_web, id_site: salva_site.id })

    } else {
      res.json({msg: 'erro_ao_salvar'})
    }
  },

  nova_senha: async function (tipo, coisas) {
    if (tipo == 'esqueceu_senha') {
      await oi.esqueceu_senha(coisas.email, coisas.req, coisas.res)
    }

    if (tipo == 'altera_senha_get') {
      await oi.altera_senha_get(coisas.token_que_chegou, coisas.req, coisas.res)
    }

    if (tipo == 'altera_senha_post') {
      await oi.altera_senha_post(coisas.senha_nova, coisas.id_usuario_escondido, coisas.id_token_escondido, coisas.req, coisas.res)
    }
  },

  login: async function (login, senha, req, res) {
    await oi.login(login, senha, req, res)
  },

  reenvia_token: async function (email, req, res) {
    await oi.reenvia_token(email, req, res)
  },

  confirma: async function (token_que_chegou, req, res) {
    await oi.confirma_cadastro(token_que_chegou, req, res)
  },

  chama_eventos: async function (req, res) {
    const busca_eventos = await conexoes.busca('eventos', { id_site: req.session.userId })

    return res.render('sistema/sistema_fotos_videos_novo', { nome: req.session.usuario_nome, status_confirma: req.session.usuario_verificada, email: req.session.usuario_email, itemEventos: busca_eventos })
  },

  altera_site: async function (req, res) {
    const busca_site = await conexoes.busca_um('sites', { email: req.session.usuario_email })

    return res.render('sistema/sistema_altera_site', { nome: req.session.usuario_nome, status_confirma: req.session.usuario_verificada, email: req.session.usuario_email, itemSites: busca_site })
  }


  // BLOG
  /*
  posta_publicacao: async function (miniatura, titulo, subtitulo, conteudo, req, res) {
    console.log('Ta vino')
    const busca_publicacao = await conexoes.busca_um('blog_publicacoes', { titulo: titulo })
    // PRecisa de um error handler para se ja tiver a msm publicacao

    const obj_salva_publicacao = {
      miniatura: miniatura,
      titulo: titulo,
      subtitulo: subtitulo,
      conteudo: conteudo
    }

    console.log('vai salvar')
    const salva_publicacao = await conexoes.salva('blog_publicacoes', obj_salva_publicacao)

    console.log('salvou, ta mandando a msg')
    return res.send({ msg: 'salvou_publicacao' })
  },

  blog_puxa_publicacoes: async function (req, res) {
    const busca_publicacoes = await conexoes.busca('blog_publicacoes')
    return res.send({ msg: 'blog_puxa_publicacoes', item: busca_publicacoes })
  },

  puxa_publicacoes: async function (req, res) {
    const busca_posts = await conexoes.busca('blog_publicacoes')
    return res.render('blog', { msg: 'puxa_publicacoes', item: busca_posts })
  },

  adm_puxa_publicacoes: async function (req, res) {
    const busca_publicacoes = await conexoes.busca('blog_publicacoes')
    const busca_sites = await conexoes.busca('adm_sites', { tipo: 'Teste' })
    console.log(busca_publicacoes)
    return res.send({ msg: 'adm_puxa_publicacoes', item: busca_publicacoes })
  }
  */
}

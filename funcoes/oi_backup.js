require('dotenv').config()
const util = require('util')

const bcrypt = require('bcrypt')
const pombo = require('./pombo')
var mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuariosSchema = new Schema({
  login: { type: String, unique: true },
  nome: String,
  senha: String,
  verificada: { type: Boolean, default: false }
})
const tokensSchema = new Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'sdo_usuarios' },
  tipo_token: String,
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
})

const modelo_usuarios = mongoose.model('usuarios', usuariosSchema)
const modelo_tokens = mongoose.model('tokens', tokensSchema)


module.exports = {

  login_v: async function (obj) {
    console.log("vai buscar")
    console.log(util.inspect(obj, false, null, true /* enable colors */))

    // Primeiramente, procuramos se tem este usuário cadastrado em nosso banco de dados.
    const busca_usuario = await modelo_usuarios.findOne({login: obj.login})

    if (!busca_usuario) {
      console.log("não encontrou ninguem")
      return {msg: 'nao_achou_ninguem'}
    }

    if (busca_usuario) {
      console.log("encontrou e segue o jogo")

      const testa_senha = await this.testa_senha(busca_usuario, obj.senha)
      if (testa_senha === 'senha_errada') return { msg: 'senha_errada' }
      if (testa_senha === 'senha_correta') return { msg: 'senha_correta', item: busca_usuario }
    }
  },

  testa_senha: async function (busca_usuario, senha_digitada) {
    // Senha bateu
    if (bcrypt.compareSync(senha_digitada, busca_usuario.senha)) {
      return 'senha_correta'
    } else {
      return 'senha_errada'
    }
  },

  cadastro: async function (nome, login, senha) {
    // Hashamos a senha.
    const hash = bcrypt.hashSync(senha, 10)

    // Buscamos no banco pra ver se usuário já existe.
    const busca_usuario = await modelo_usuarios.findOne({login: login})

    if (busca_usuario) return { msg: 'usuario_ja_existe' }

    // Montamos o objeto e salvamos ele.
    const obj_salva_usuario = {
      nome: nome,
      login: login,
      senha: hash
    }

    const salvamento = new modelo_usuarios(obj_salva_usuario)
    await salvamento.save()

    const token_email = this.makeid(16) // Criamos um token para confirmação.

    // Montamos um obj com o token recém criado e o id do usuário recém salvado.
    const obj_salva_token = {
      _userId: salva_usuario.id,
      token: token_email,
      tipo_token: 'confirma_email'
    }

    // Salvamos o token.
    const salvamento_2 = new modelo_tokens(obj_salva_token)
    await salvamento_2.save()

    // Montamos um obj para o pombo criar um e-mail com estas informações e enviar o token para o usuário.
    const obj_confirma = {
      nome: nome,
      email: login,
      token: token_email
    }
    pombo.dispara_email('confirma_cadastro', obj_confirma)

    // Não precisa retornar nada agora.
    // Precisa sim
    return salva_usuario
  },

  confirma_cadastro: async function (token_que_chegou, req, res) {

    const busca_token = await modelo_tokens.findOne({token: token_que_chegou})
    const busca_usuario = await modelo_usuarios.findOne({_id: busca_token._userId})

    busca_usuario.verificada = true

    modelo_tokens.deleteOne({ token: token_que_chegou }, (err) => {
      if (err) return handleError(err);
      // deleted at most one document
    });

    const salvamento = new modelo_tokens(busca_usuario)
    await salvamento.save()

    if (salva_usuario.status == 'erro') res.render('sistema/cadastro_confirma', { msg: 'confirmacao_negada' })
    if (salva_usuario.status == 'sucesso') {
      const obj_coisas = {
        nome: busca_usuario.nome,
        email: busca_usuario.login
      }
      pombo.dispara_email('cadastro_confirmado_bem_vindo', obj_coisas)
      return res.render('sistema/cadastro_confirma', { msg: 'confirmacao_confirmada' })
    }
  },

  esqueceu_senha_v: async function (email) {

    // Busca pelo usuário em questã.
    const busca_usuario = await modelo_usuarios.findOne({login: email})
    if (busca_usuario == null) return { msg: 'nao_achou_ninguem' }

    // Criamos um token para a troca de senha.
    const token_senha = this.makeid(16)
    const obj_salva_token = {
      _userId: busca_usuario.id,
      token: token_senha,
      tipo_token: 'esqueceu_senha'
    }
    // Salvamos o token novíssimo.
    const salvamento = new modelo_tokens(obj_salva_token)
    await salvamento.save()


    // Mandamos um e-mail para o usuário, com o token criado para o usuário trocar a senha.
    const coisas = {
      nome: busca_usuario.nome,
      email: email,
      token_senha: token_senha
    }
    pombo.dispara_email('altera_senha', coisas)

    return { msg: 'token_enviado' }
  },

  altera_senha_get: async function (token_que_chegou) {

    const busca_token = await modelo_tokens.findOne({token: token_que_chegou})
    if (busca_token == null) return { msg: 'nao_achou_token' }

    const busca_usuario = await modelo_usuarios.findOne({_id: busca_token._userId})
    if (busca_usuario == null) return { msg: 'achou_token_mas_nao_achou_usuario' }

    return {msg: 'vai_alterar', id_usuario: busca_usuario._id, id_token: busca_token._id}
  },

  altera_senha_post_v: async function (nova_senha, id_usuario, id_token) {

    // Busca pelo usuário em questã.
    const busca_usuario = await modelo_usuarios.findOne({_id: id_usuario})
    if (busca_usuario == null) return { msg: 'nao_achou_ninguem' }

    const hash = bcrypt.hashSync(nova_senha, 10)
    busca_usuario.senha = hash

    const salvamento = new modelo_usuarios(busca_usuario)
    await salvamento.save()

    modelo_tokens.deleteOne({ _id: id_token }, (err) => {
      if (err) return handleError(err);
      // deleted at most one document
    })

    return {msg: 'nova_senha_criada'}
  },

  altera_senha_post: async function (senha_nova, id_usuario_escondido, id_token_escondido, req, res) {
    console.log('senha_nova: ' + senha_nova)
    console.log('id_token_escondido: ' + id_token_escondido)

    const busca_usuario = await modelo_usuarios.findOne({_id: id_usuario_escondido})
    // console.log(util.inspect(busca_usuario, false, null, true /* enable colors */))

    const hash = bcrypt.hashSync(senha_nova, 10)

    busca_usuario.senha = hash
    const salvamento = new modelo_usuarios(busca_usuario)
    await salvamento.save()

    modelo_tokens.deleteOne({ _id: id_token_escondido }, (err) => {
      if (err) return handleError(err);
      // deleted at most one document
    })

    return res.render('sistema/altera_senha', { msg: 'nova_senha_criada' })
  },

  reenvia_token: async function (email, req, res) {

    const busca_usuario = await modelo_usuarios.findOne({login: email})

    if (busca_usuario == null) return res.render('sistema/esqueceu_senha', { msg: 'nao_achou_ninguem' })

    modelo_tokens.deleteOne({ _userId: busca_usuario._id, tipo_token: 'confirma_email' }, (err) => {
      if (err) return handleError(err);
      // deleted at most one document
    })

    const token_email = this.makeid(16)
    const obj_salva_token = {
      _userId: busca_usuario.id,
      token: token_email,
      tipo_token: 'confirma_email'
    }

    const salvamento = new modelo_tokens(obj_salva_token)
    await salvamento.save()

    const obj_confirma = {
      nome: busca_usuario.nome,
      email: email,
      token: token_email
    }

    pombo.dispara_email('confirma_cadastro', obj_confirma)
    return res.render('sistema/reenviou_token_confirmacao', { nome: req.session.usuario_nome, msg: 'token_enviado' })
  },
  makeid: (length) => {

    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return result.join('');
  }
}

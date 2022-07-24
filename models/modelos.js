var mongoose = require('mongoose')

const Schema = mongoose.Schema
const historicoDoacoesSchema = new Schema({
  tipo: String,
  dados: String
})
const historicoParcelasSchema = new Schema({
  tipo: String,
  dados: String
})
const admSitesSchema = new Schema({
  plano: String,
  nome_ong: String,
  endereco_web: String,
  image_logo: String,
  email: String,
  telefone: String,
  rua: String,
  numero: String,
  bairro: String,
  cidade: String,
  estado: String,
  cep: String,
  chave_pix: String,
  tipo_chave_pix: String,
  historico_doacoes: [historicoDoacoesSchema],
  historico_parcelas: [historicoParcelasSchema]
})
// Postagens
const conteudoPostSchema = new Schema({
  tipo: String,
  dados: String
})
const sdoBlogPublicacoesSchema = new Schema({
  tipo: String,
  titulo: String,
  subtitulo: String,
  miniatura: String,
 // conteudoPost: [conteudoPostSchema]
  conteudo: String
})

// Galeria
const fotosSchema = new Schema({
  nome: String,
  miniatura: String,
  real: String
})
const videosSchema = new Schema({
  idVideo: String,
  tituloVideo: String
})
const eventosSchema = new Schema({
  // Na verdade esse id_site é o id_usuario.
  id_site: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'sites' },
  nome: String,
  data: Date,
  pasta: String,
  capaAlbum: String,
  fotos: [fotosSchema],
  videos: [videosSchema]
})

/* Schemas da biblioteca Oi - Início */
/*
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
*/
/* Schemas da biblioteca Oi - Fim */

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

/* Schemas específicos Site da Ong - Início */
const sitesSchema = new Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'usuarios' },
  nome_ong: String,
  endereco_web: String,
  image_logo: String,
  image_capa: String,
  historia: String,
  missao: String,
  visao: String,
  valores: String,
  exp_anjo: String,

  proj_1_nome: String,
  proj_1_img: String,
  proj_1_descricao: String,

  proj_2_nome: String,
  proj_2_img: String,
  proj_2_descricao: String,

  proj_3_nome: String,
  proj_3_img: String,
  proj_3_descricao: String,

  ajuda_missao: String,
  email: String,
  telefone: String,
  rua: String,
  numero: String,
  bairro: String,
  cidade: String,
  estado: String,
  cep: String,

  nome_pix: String,
  chave_pix: String

})
/* Schemas específicos Site da Ong - Fim */

module.exports = {
  modeloSites: mongoose.model('sites', sitesSchema),
  usuarios: mongoose.model('usuarios', usuariosSchema),
  // modeloAdmUsuarios: mongoose.model('adm_usuarios', usuariosSchema),
  modeloAdmSites: mongoose.model('adm_sites', admSitesSchema),
  tokens: mongoose.model('tokens', tokensSchema),
  modeloEventos: mongoose.model('eventos', eventosSchema),
  modeloSdoBlogPublicacoes: mongoose.model('blog_publicacoes', sdoBlogPublicacoesSchema)
}

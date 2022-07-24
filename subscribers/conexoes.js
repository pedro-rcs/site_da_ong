const fetch = require('node-fetch')
const modeloUsuarios = require('../models/modelos').modeloUsuarios
const modeloAdmUsuarios = require('../models/modelos').modeloAdmUsuarios
const modeloAdmSites = require('../models/modelos').modeloAdmSites
const modeloTokens = require('../models/modelos').modeloTokens
const modeloSites = require('../models/modelos').modeloSites
const modeloEventos = require('../models/modelos').modeloEventos
const modeloSdoBlogPublicacoes = require('../models/modelos').modeloSdoBlogPublicacoes

async function salva (modelo, itens) {
  console.log(`salva () - Está salvando ${modelo}`)

  let modelo_find
  if (modelo == 'adm_usuarios') modelo_find = modeloAdmUsuarios
  if (modelo == 'adm_sites') modelo_find = modeloAdmSites
  if (modelo == 'blog_publicacoes') modelo_find = modeloSdoBlogPublicacoes

  if (modelo == 'usuarios') modelo_find = modeloUsuarios
  if (modelo == 'tokens') modelo_find = modeloTokens
  if (modelo == 'sites') modelo_find = modeloSites
  if (modelo == 'eventos') modelo_find = modeloEventos

  // Para salvar com await no mongoose, só sei fazer com try/catch
  // Diferentemente do findOne. Acho que da pra padronizar os dois
  // Em um futuro próximo.
  try {
    const paraSalvar = new modelo_find(itens)
    const objSalvo = await paraSalvar.save()

    const retorna = {
      id: objSalvo._id,
      status: 'sucesso'
    }

    return retorna
  } catch (err) {
    console.log('Algo de errado está muito errado com a salvação no BD.')
    console.log('err' + err)

    return { status: 'erro' }
  }
}

async function busca (modelo, obj) {
  console.log('busca () - buscando por: ' + modelo)

  let modelo_find
  if (modelo == 'adm_usuarios') modelo_find = modeloAdmUsuarios
  if (modelo == 'adm_sites') modelo_find = modeloAdmUsuarios
  if (modelo == 'blog_publicacoes') modelo_find = modeloSdoBlogPublicacoes

  if (modelo == 'usuarios') modelo_find = modeloUsuarios
  if (modelo == 'tokens') modelo_find = modeloTokens
  if (modelo == 'sites') modelo_find = modeloSites
  if (modelo == 'eventos') modelo_find = modeloEventos

  const obj_busca = await modelo_find.find(obj, (err, item) => {
    if (err) {
      console.log('Algo de errado não está certo com a busca!')
      throw err
      return 'erro_ao_buscar'
    }

    if (item == null) {
      console.log('Usuario não encontrado.')
    }
    return item
  })

  return obj_busca
}

async function busca_um (modelo, obj) {
  console.log('busca_um () - buscando por: ' + modelo)

  let modelo_find
  if (modelo == 'adm_usuarios') modelo_find = modeloAdmUsuarios
  if (modelo == 'adm_sites') modelo_find = modeloAdmUsuarios
  if (modelo == 'blog_publicacoes') modelo_find = modeloSdoBlogPublicacoes

  if (modelo == 'usuarios') modelo_find = modeloUsuarios
  if (modelo == 'tokens') modelo_find = modeloTokens
  if (modelo == 'sites') modelo_find = modeloSites
  if (modelo == 'eventos') modelo_find = modeloEventos

  const obj_busca = await modelo_find.findOne(obj, (err, item) => {
    if (err) {
      console.log('Algo de errado não está certo com a busca!')
      throw err
      return 'erro_ao_buscar'
    }
    if (item === null) {
      console.log('Usuario não encontrado.')
    }
    return item
  })

  return obj_busca
}

async function apaga_um (modelo, obj) {
  console.log('Apagando: ' + modelo)

  let modelo_find
  if (modelo == 'adm_usuarios') modelo_find = modeloAdmUsuarios
  if (modelo == 'adm_sites') modelo_find = modeloAdmUsuarios
  if (modelo == 'blog_publicacoes') modelo_find = modeloSdoBlogPublicacoes

  if (modelo == 'usuarios') modelo_find = modeloUsuarios
  if (modelo == 'tokens') modelo_find = modeloTokens
  if (modelo == 'sites') modelo_find = modeloSites
  if (modelo == 'eventos') modelo_find = modeloEventos

  const obj_apaga = await modelo_find.deleteOne(obj, (err, item) => {
    if (err) {
      console.log('Algo de errado não está certo com a deletação!')
      throw err
      return 'erro_ao_deletar'
    }
    if (item === null) {
      console.log('Elemento não encontrado.')
    }
    return item
  })

  return obj_apaga
}

module.exports.salva = salva
module.exports.busca = busca
module.exports.busca_um = busca_um
module.exports.apaga_um = apaga_um

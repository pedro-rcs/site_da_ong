// Se for desenvolvimento, const recebe 'desenvolvimento', se for produção, recebe 'produção'.
// Desconfio que escrever direto na variável cada vez que alterar o escopo do projeto não seja a solução mais eficaz mas situações desesperadoras requerem medidas desesperadas.

const ambiente = 'desenvolvimento'

let env
if (ambiente === 'desenvolvimento') {

  env = {
    servidor: 'http://localhost:8001'
  }

} else if (ambiente === 'producao') {

  env = {
    servidor: 'http://0.0.0.0:8003'
  }

}


window.onpopstate = function (event) {
  // Se o event.state não for nulo, ou seja, se não for um click num link de rolagem.
 	if (event.state) {
    if (event.state.tela_ativa == 'index') monta_index('popstate')
	  if (event.state.tela_ativa == 'construtor_site') monta_construtor_site('popstate')
	  if (event.state.tela_ativa == 'sistema_home') monta_sistema_home('popstate')
	  if (event.state.tela_ativa == 'sistema_altera') monta_sistema_altera('popstate')
	  if (event.state.tela_ativa == 'sistema_fotos_videos') monta_sistema_fotos_videos('popstate')
	  if (event.state.tela_ativa == 'sistema_aulas') monta_sistema_aulas('popstate')
	  if (event.state.tela_ativa == 'sistema_recarregar') monta_sistema_recarregar('popstate')
	  if (event.state.tela_ativa == 'site') monta_site(event.state.endereco_web, 'popstate')

    if (event.state.tela_ativa === 'design_system') monta_design_system('popstate')
    if (event.state.tela_ativa === 'guia_de_estilo') monta_guia_de_estilo('popstate')
    if (event.state.tela_ativa === 'biblioteca_de_componentes') monta_biblioteca_de_componentes('popstate')
 	}
}

function inicio (dados) {

  dados = JSON.parse(dados)

  if (dados.tela === 'index') monta_index()
  if (dados.tela === 'construtor_site') monta_construtor_site()
  if (dados.tela === 'sistema_home') monta_sistema_home()
  if (dados.tela === 'sistema_altera') monta_sistema_altera()
  if (dados.tela === 'sistema_fotos_videos') monta_sistema_fotos_videos()
  if (dados.tela === 'sistema_aulas') monta_sistema_aulas()
  if (dados.tela === 'sistema_recarregar') monta_sistema_recarregar()
  if (dados.tela === 'site')  monta_site(dados)
  if (dados.tela === 'altera_senha') monta_altera_senha(dados)

  if (dados.tela === 'design_system') monta_design_system()
  if (dados.tela === 'guia_de_estilo') monta_guia_de_estilo()
  if (dados.tela === 'biblioteca_de_componentes') monta_biblioteca_de_componentes()

}

var glob_usuario
var glob_site
var glob_eventos
var estado_galeria = 'sumida' // var da visualizar_galeria()
var qtd_elm_geral // var da visualizar_galeria()
var glob_evts // parece que essa var é mais, ou somente usada no monta_site()
var qrcode // var da gera_qr_estatico()
var payload_atual // var da gera_qr_estatico()
var end_valido = false
var esta_logado // var global usada só no monta_site()

// Função que vai e volta do servidor.
async function vai_filhao_2 (missao, parametro) {

  let dados_vai
  let destino
  let metodo =	'POST'

  // index
  if (missao == 'login') {
    dados_vai = {
  		login: document.getElementById('login_index').value,
  		senha: document.getElementById('senha_index').value
  	}

  	destino = `${env.servidor}/login`
  }

  if (missao === 'esqueceu_senha') {
    dados_vai = { email: parametro }
    destino = `${env.servidor}/esqueceu_senha`
  }

  if (missao === 'nova_senha') {
    dados_vai = {
      nova_senha: parametro.nova_senha,
      id_usuario: parametro.id_usuario,
      id_token: parametro.id_token
    }

    destino = `${env.servidor}/altera_senha`
  }

  // sistema_home
  if (missao === 'puxa_sistema_home') {
    destino = `${env.servidor}/puxa_sistema_home`
  }

  if (missao === 'logout') {
    destino = `${env.servidor}/logout`
  }

  // sistema_fotos_videos
  if (missao === 'adiciona_video') {

  	if (tabelaVideosOficial) {
	    for (let i = 0; i < tabelaVideosOficial.length; i++) {
	      if (parametro == tabelaVideosOficial[i].parametro) {
	        // Ja tem esse video aqui na galeraia
	        alert('Este vídeo já está nesta seleção.')
	        return false
	      }
	    }
	  }

	  const conteudoMiniaturas = document.getElementById('contMiniaturasVideos').innerHTML
	  // const idVideo = 'zlvw3VpNfqM'
	  const enderecoVideo = `https://img.youtube.com/vi/${parametro}/default.jpg`
	  const apiYoutube = 'AIzaSyDcSoKYHZzbBVmxiOCPIcSD4nLCyTbnH2A'
	  const urlPegaInfo = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${parametro}&key=${apiYoutube}`
	  metodo = 'GET'
	  destino = urlPegaInfo
  }

  // site
  if (missao === 'puxa_site') {
  	dados_vai = {
  		site_end: parametro.endereco_web,
  		id_site: parametro.id_site
   	}
  	destino = `${env.servidor}/puxa_site`
  }

  // sistema_altera
  if (missao === 'salva_alteracoes_site') {
  	const end_image_logo = document.getElementById('altera_img_logo').src.replace(`${env.servidor}/`, '')
  	const end_image_capa = document.getElementById('altera_img_capa').src.replace(`${env.servidor}/`, '')

    const cont_mis = document.getElementById('cont_altera_missao')
    const cont_vis = document.getElementById('cont_altera_visao')
    const cont_val = document.getElementById('cont_altera_valores')

    const n_missao = cont_mis.getElementsByTagName('textarea').length
    const n_visao = cont_vis.getElementsByTagName('textarea').length
    const n_valores = cont_val.getElementsByTagName('textarea').length

    let concat_missao = ''
  	for (let i = 0; i < n_missao; i++) {
  		const id = 'alt_mis_' + i
  		if (document.getElementById(id).value) {
        concat_missao += '<p>•' + document.getElementById(id).value + '</p>'
      }
  	}

  	let concat_visao = ''
  	for (let i = 0; i < n_visao; i++) {
  		const id = 'alt_vis_' + i
  		if (document.getElementById(id).value) {
        concat_visao += '<p>•' + document.getElementById(id).value + '</p>'
      }
  	}

  	let concat_valores = ''
  	for (let i = 0; i < n_valores; i++) {
  		const id = 'alt_val_' + i
  		if (document.getElementById(id).value) {
  			concat_valores += '<p>•' + document.getElementById(id).value + '</p>'
  		}
  	}

  	let val_alt_cidade = document.getElementById('altera_cidade').value
		let alt_cidade_limpa = remover_acentos_espaco(val_alt_cidade)
		let val_alt_nome = document.getElementById('altera_nome_pix').value
		let alt_nome_limpo = remover_acentos_espaco(val_alt_nome)

  	dados_vai = {
  		id_site: glob_site._id,
  		nome_ong: document.getElementById('altera_nome_ong').value,
  		endereco_web: document.getElementById('altera_end_site').value,
  		historia: document.getElementById('altera_historia').value,
  		image_logo: end_image_logo,
  		image_capa: end_image_capa,
  		missao: concat_missao,
  		visao: concat_visao,
  		valores: concat_valores,
  		email: document.getElementById('altera_email').value,
  		telefone: document.getElementById('altera_telefone').value,
  		rua: document.getElementById('altera_rua').value,
  		bairro: document.getElementById('altera_bairro').value,
  		numero: document.getElementById('altera_numero').value,
  		cidade: alt_cidade_limpa,
  		cep: document.getElementById('altera_cep').value,
  		estado: document.getElementById('altera_estado').value,
  		nome_pix: alt_nome_limpo,
  		chave_pix: document.getElementById('altera_chave_pix').value
   	}

  	destino = `${env.servidor}/salva_alteracoes_site`
  }

  // construtor_site
  if (missao == 'verifica_end') {
  	// Aqui verificamos se o campo do ong_end está nos trinques.
  	// Essa verificação precisa ficar em uma função separada, aqui tá poluindo.
  	// Mas por enquanto funciona e é o que importa até ter um MVP.

  	// Aqui vê se tem espaço vazio.
  	// Acho que ao invés de só ver se tem espaço, essa parada tem que verificar por regex se...
  	// ...tem caracteres especiais.
  	if (parametro.includes(' ')) {
  		end_valido = false
  		alert('No endereço pode-se usar apenas letras, números e tracinhos -')
  		document.getElementById('end_ong').value = ''

    	document.getElementById('div_end_vago').style.display = 'none'
    	document.getElementById('div_end_ja_tem').style.display = 'none'
    	valida_proximo('nome_ong')

  		return false

  	// aqui vê se tá vazio.
  	} else if (!parametro) {
  		end_valido = false

  		alert('O campo de endereço do site não pode ficar vazio.')

    	document.getElementById('div_end_vago').style.display = 'none'
    	document.getElementById('div_end_ja_tem').style.display = 'none'
    	valida_proximo('nome_ong')

      return false
  	}

  	dados_vai = {
  		site_end: parametro
   	}
  	destino = `${env.servidor}/verifica_end`
  }

  // monta_site
  if (missao === 'carrega_site') {
  	destino = `${env.servidor}/carrega_site`
  }

  try {
    const resultado = await fetch(destino, {
      method: metodo,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dados_vai)
    })
    const json = await resultado.json()

    if (json.kind) {
	      // loading('carregou')
	      const divMiniatura = ''
	      const miniaturaPronta = setaVideo(parametro, json.items[0].snippet.title)
	      document.getElementById('contMiniaturasVideos').appendChild(miniaturaPronta)
    }

    // Login
    console.log(json.msg)
    if (json.msg == 'nao_achou_ninguem') {
      document.getElementById('div_mensagens_sistema').style.display = 'flex'
    	document.getElementById('div_mensagens_sistema').innerHTML = 'Usuário não encontrado!'
    }

    if (json.msg == 'senha_errada') {
      document.getElementById('div_mensagens_sistema').style.display = 'flex'
    	document.getElementById('div_mensagens_sistema').innerHTML = 'Usuário encontrado mas senha não confere.'
    }
    if (json.msg == 'senha_correta') {
    	monta_sistema_home()
    }

    if (json.msg === 'troca_senha_nao_achou_ninguem') {
    	alert("E-mail não encontrado")
    }
    if (json.msg === 'troca_senha_token_enviado') {
    	alert("Enviamos o link de troca de senha ao seu e-mail. Por favor, cheque também em sua caixa de spams.")
    	window.location.assign('/')
    }

    if (json.msg === 'nova_senha_criada') {
    	alert("Sua senha nova foi criada!")
    	window.location.assign('/')
    }


    if (json.msg === 'verifica_end_ja_tem') {
    	end_valido = false
    	document.getElementById('div_end_vago').style.display = 'none'
    	document.getElementById('div_end_ja_tem').style.display = 'flex'
    	valida_proximo('nome_ong')
    }

    if (json.msg === 'verifica_end_vago') {
    	end_valido = true
    	document.getElementById('div_end_ja_tem').style.display = 'none'
    	document.getElementById('div_end_vago').style.display = 'flex'
    	valida_proximo('nome_ong')
    }

    // Construtor de sites
    if (json.msg == 'puxa_site') {

      const dados_veio = {
        item_site: json.item_site,
        item_eventos: json.item_eventos
      }

      // json.esta_logado será sim ou nao
      if (json.esta_logado === 'sim') {
        esta_logado = 'sim'
      }
      if (json.esta_logado === 'nao') {
        esta_logado = 'nao'
      }

      // glob_site_2 = json.item_site
      glob_site = json.item_site
      return dados_veio
    }

    // sistema_home
    if (json.msg === 'puxa_sistema_home') {
      console.log("Brauooemo dady")
    	glob_site = json.item_site
    	glob_usuario = json.item_usuario
    	glob_eventos = json.item_eventos
      return glob_site
    }

    if (json.msg === 'saiu') {
    	document.location.reload(true)
    }

    // sistema_altera
    if (json.msg === 'salva_alteracoes_site_ok') {
    	alert('Alterações salvas com sucesso!')
    	// document.location.reload(true) // Hard reload da página atual
    	monta_sistema_home()
    }
  } catch (e) { console.error(e) }
}

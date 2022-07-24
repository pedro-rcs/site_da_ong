const servidor = 'http://localhost:8001'
// const servidor = 'https://sitedaong.ddnsking.com'


// monta_index.js
// Talvez aqui precise colocar um onbody load para esperar carregar tudo antes de chamar o document
// document.getElementById('bto_index_voltar').onclick = window.location.assign('/')


function vaza_brota (obj) {

	for (let i = 0; i < obj.vazam.length; i++) {
		document.getElementById(`${obj.vazam[i].id}`).style.display = 'none'
	}

	for (let i = 0; i < obj.brotam.length; i++) {
		document.getElementById(`${obj.brotam[i].id}`).style.display = 'flex'
	}

}











function prepara_esqueceu_senha () {
	alert("eueieui")
  const email = document.getElementById('email_troca_senha').value

  if (!email) {
    alert('Primeiro escreva seu e-mail.')
    return false
  }

  if (email) {
    vai_filhao_2('esqueceu_senha', email)
  }
}

// O menú some ao ativar esta função.
function some_menu_drop () {
	document.getElementById('cont_drop_down').className = 'menu_inativo'
	document.getElementById('div_corpo').style.webkitFilter = 'grayScale(0) blur(0px)'
	document.getElementById('anti_cliques').style.display = 'none'
}

// Função que, se o onfocus está no input do login ou no input da senha, os demais elementos da tela somem.
// Além disso, deixa o sublinhado laranja, toda vez que está on focus.
// foca_input é uma função de firula específica da tela index deste webapp.
function foca_input (qual, acao) {

	let elementos = [
		document.getElementById('span_scroll_1'),
		document.getElementById('i_scroll'),
		document.getElementById('navbar'),
		document.getElementById('recip_creditos_img')
	]


  if (acao === 'in') {
  		function some_elm (elm, index) {
  			elm.style.display = 'none'
  		}

    document.getElementById(qual).style.borderBottom = '2px solid var(--laranja)'
    document.getElementById(qual).style.background = 'rgba(0, 0, 0, 0.5)'

    elementos.forEach(some_elm)
  }

  if (acao == 'out') {
	function aparece_elm (elm, index) {
		elm.style.display = 'flex'
	}

  	 elementos.forEach(aparece_elm)

    if (!document.getElementById(qual).value) {
      document.getElementById(qual).style.background = 'transparent'
      document.getElementById(qual).style.borderBottom = '2px solid white'
    }
  }
}

function troca_senha (acao) {

	if (acao === 'vai') {
		document.getElementById('recipiente_login').style.display = 'none'
		document.getElementById('recipiente_troca_senha').style.display = 'flex'
	}
	// Esse volta não está funcinando. Parece que é algo a ver com o css do autocomplete, fica feião.
	// Ao invés disso, ta voltando acessando o window.location('/')
	if (acao === 'volta') {
		document.getElementById('recipiente_troca_senha').style.display = 'none'
		document.getElementById('recipiente_login').style.display = 'flex'
	}
}

// Quando o usuário clica nas 3 barrinhas do menu mobile, ativa essa função.
function menu_drop () {

	document.getElementById('cont_drop_down').className = 'menu_ativo'
	document.getElementById('div_corpo').style.webkitFilter = 'grayScale(1) blur(3px)'
	document.getElementById('anti_cliques').style.display = 'flex'
}



















const barras_navegacao_sistema = `
	<!-- Barra Cima - PC -->
    <div class="flex_row T1 center barra_fixa exclusivo_pc" >
      <div class="flex_row largura_interna T1 center" style="justify-content: flex-start; font-size: 17pt;">
      	<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 150px; font-size: 23pt;" onclick="monta_sistema_home()"></i>

        <div class="T1"></div>
        <i class="icon-edit_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('edit', 'entra')" onmouseleave="hover('edit', 'sai')" onclick="monta_sistema_altera()"></i>
        <i class="icon-gallery_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')" onclick="monta_sistema_fotos_videos()"></i>
				<i class="icon-casa_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('casa', 'entra')" onmouseleave="hover('casa', 'sai')" onclick="window.location.assign('');"></i>
        <i class="icon-logout_vazio clicavel" onclick="vai_filhao_2('logout')" onmouseenter="hover('logout', 'entra')" onmouseleave="hover('logout', 'sai')"></i>
      </div>
    </div>

    <!-- Barra Cima - Celular -->
    <div class="flex_row T1 center barra_fixa exclusivo_mobile" style="height: 40px;">
      <div class="flex_row largura_interna center" style="font-size: 17pt;padding-left: 10px; padding-right: 10px;">
      	<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 100px; font-size: 17pt;" onclick="monta_sistema_home()"></i>
      </div>
    </div>

    <!-- Barra Baixo - Celular -->
    <div class="flex_row T1 center barra_fixa_mobile exclusivo_mobile" style="bottom: 0;">
      <div class="flex_row largura_interna center" style="font-size: 17pt; justify-content: space-between; padding-left: 20px; padding-right: 20px;">
				<i class="icon-edit_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('edit', 'entra')" onmouseleave="hover('edit', 'sai')" onclick="monta_sistema_altera()"></i>
        <i class="icon-gallery_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')" onclick="monta_sistema_fotos_videos()"></i>
				<i class="icon-casa_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('casa', 'entra')" onmouseleave="hover('casa', 'sai')" onclick="window.location.assign('');"></i>
        <i class="icon-logout_vazio clicavel" onclick="vai_filhao_2('logout')" onmouseenter="hover('logout', 'entra')" onmouseleave="hover('logout', 'sai')" ></i>
      </div>
    </div>
`

const barras_navegacao_site = `
	<!-- Barra Cima - PC -->
    <div class="flex_row T1 center barra_fixa exclusivo_pc" style="z-index: 6;" >
      <div class="flex_row largura_interna T1 center" style="justify-content: flex-start; font-size: 17pt;">
      	<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 150px; font-size: 23pt;" onclick="monta_sistema_home()"></i>

        <div class="T1"></div>
        <i class="icon-editar_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('editar', 'entra')" onmouseleave="hover('editar', 'sai')" onclick="monta_sistema_altera()"></i>
        <i class="icon-gallery_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')" onclick="monta_sistema_fotos_videos()"></i>
        <i class="icon-opcoes_vazio clicavel" onclick="caixa_opcoes('aparece')" onmouseenter="hover('opcoes', 'entra')" onmouseleave="hover('opcoes', 'sai')"></i>
      </div>
    </div>

    <!-- Barra Cima - Celular -->
    <div class="flex_row T1 center barra_fixa exclusivo_mobile" style="height: 40px;">
      <div class="flex_row largura_interna center" style="font-size: 17pt;padding-left: 10px; padding-right: 10px;">
      	<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 100px; font-size: 17pt;" onclick="monta_sistema_home()"></i>
      </div>
    </div>

    <!-- Barra Baixo - Celular -->
    <div class="flex_row T1 center barra_fixa_mobile exclusivo_mobile" style="bottom: 0;">
      <div class="flex_row largura_interna center" style="font-size: 17pt; justify-content: space-between; padding-left: 20px; padding-right: 20px;"><i class="icon-editar_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('editar', 'entra')" onmouseleave="hover('editar', 'sai')" onclick="monta_sistema_altera()"></i>
        <i class="icon-gallery_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')" onclick="monta_sistema_fotos_videos()"></i>
        <i class="icon-opcoes_vazio clicavel" onclick="caixa_opcoes('aparece')" onmouseenter="hover('opcoes', 'entra')" onmouseleave="hover('opcoes', 'sai')" ></i>
      </div>
    </div>
`

const linha_horizontal_divisoria = `
	<div class="flex_row largura_interna T1" style="margin-top: 25px; margin-bottom: 25px;">
		<div class="flex_col T1" style="padding: 10px;">

			<div class="flex_row T1 center largura_interna" style=" height: 1px; background: #e8e8e8; border-radius: 1px;"></div>

		</div>
	</div>
`


/* monta_index */






// Essa função hover_scroll deixa tudo laranja quando um dos elementos está onhover.
// hover_scroll também é uma função de firula específica da tela index deste webapp.
function hover_scroll (acao) {

  if (acao == 'entra') {
    console.log('entrou')
    document.getElementById('span_scroll_1').style.color = 'var(--index_fundo_letras)'
    // document.getElementById('span_scroll_2').style.color = 'var(--laranja)'
    document.getElementById('i_scroll').style.color = 'var(--index_fundo_letras)'
  }

  if (acao == 'sai') {
    console.log('saiu')
    document.getElementById('span_scroll_1').style.color = 'var(--index_letras)'
    // document.getElementById('span_scroll_2').style.color = 'var(--neve)'
    document.getElementById('i_scroll').style.color = 'var(--index_letras)'
  }
}




// A função abaixo faz o banner sumir e aparecer, mas só na /index
let prevScrollpos = window.pageYOffset
window.onscroll = function () {
	var currentScrollPos = window.pageYOffset
	const altura_tela = window.innerHeight

	// Se for a index
	if (location.pathname == '/index') {

		if (currentScrollPos + 110 > altura_tela) {
		  document.getElementById('navbar').style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))'
		  document.getElementById('navbar_mobile').style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))'
		} else {
		  document.getElementById('navbar').style.background = 'none'
		  document.getElementById('navbar_mobile').style.background = 'none'
		  document.getElementById('anti_cliques').style.display = 'none'
		}

		if (prevScrollpos > currentScrollPos) {
		  document.getElementById('navbar').style.top = '0'
		 	document.getElementById('navbar_mobile').style.top = '0'
		 	document.getElementById('anti_cliques').style.display = 'none'
		} else {
			cont_drop_down.className = 'menu_inativo'
	    document.getElementById('div_corpo').style.webkitFilter = 'grayScale(0) blur(0px)'

			document.getElementById('navbar').style.top = '-110px'
	    document.getElementById('navbar_mobile').style.top = '-110px'
		  document.getElementById('anti_cliques').style.display = 'none'
		}
	  prevScrollpos = currentScrollPos
	}
}
/* index - Fim */


/* funcoes_construtor - Início */

function valida_proximo (cont) {

	if (cont === 'nome_ong') {

			let input_campo_nome = document.getElementById('nome_ong')
			let input_campo_end = document.getElementById('end_ong')

			if (input_campo_nome.value && end_valido == true) {

				document.getElementById('div_proximo_nome_ong').innerHTML = `
					<div id="proximo_nome_ong" class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="valida_construtor('nome_ong');">Próximo</div>
				`
			}
			if (!input_campo_nome.value || end_valido == false) {

				document.getElementById('div_proximo_nome_ong').innerHTML = `
					<div id="proximo_nome_ong" class="flex_col center clicavel botao bot_cinza bot_construtor">Próximo</div>
				`
			}
	}
}

	var image_logo
	var image_capa

	var endereco_web
	var link_post = `${servidor}` // Produção

	function prepara_senha_forte (tipo, tela) {

		// Pega a senha e a repetição digitada pelo usuário.
		let senha_1
		let senha_2

		let senhas_iguais
		let senhas_diferentes
		let tamanho_fraco
		let tamanho_forte
		let let_num_sim
		let let_num_nao
		let senha_forte_sim
		let senha_forte_nao

		// Se a tela que for utilizada a função for a de alterar senha.
		if (tela === 'altera') {

			senha_1 = document.getElementById('senha_1_altera').value
			senha_2 = document.getElementById('senha_2_altera').value

			let_num_nao = () => {
				document.getElementById('span_num_let_altera').style.color = "grey"
				document.getElementById('check_num_let_altera').style.display = "none"
			}
			let_num_sim = () => {
				document.getElementById('span_num_let_altera').style.color = "var(--neve)"
				document.getElementById('check_num_let_altera').style.display = "inline"
			}

			tamanho_fraco = () => {
				document.getElementById('span_8_char_altera').style.color = "grey"
				document.getElementById('check_8_char_altera').style.display = "none"
			}
			tamanho_forte = () => {
				document.getElementById('span_8_char_altera').style.color = "var(--neve)"
				document.getElementById('check_8_char_altera').style.display = "inline"
			}

			senha_forte_sim = () => {
				document.getElementById('forca_senha_altera').style.color = "green"
        document.getElementById('forca_senha_altera').style.fontSize = "14pt"
				document.getElementById('forca_senha_altera').innerHTML = "Senha forte"
			}
			senha_forte_nao = () => {
				document.getElementById('forca_senha_altera').style.color = "red"
				document.getElementById('forca_senha_altera').style.fontSize = "14pt"
				document.getElementById('forca_senha_altera').innerHTML = "Senha fraca"
			}

			// Deixa inativo o botão de alterar senha.
			senhas_diferentes = () => {
				let botao = document.getElementById('botao_altera_senha')
				if (botao.classList.contains('bot_ativo')) {
					botao.classList.remove("bot_ativo")
					botao.classList.add("bot_inativo")
				}
			}

			// Deixa ativo o botão de alterar senha.
			senhas_iguais = () => {
				let botao = document.getElementById('botao_altera_senha')
				if (botao.classList.contains('bot_inativo')) {
					botao.classList.remove("bot_inativo")
					botao.classList.add("bot_ativo")
				}
			}

		// Senão, é porque a tela é a de fazer a senha, no contrutor de sites.
		} else {
			senha_1 = document.getElementById('senha_1').value
			senha_2 = document.getElementById('senha_2').value

			tamanho_fraco = () => {
				document.getElementById('span_8_char').style.color = "var(--neve)"
				document.getElementById('check_8_char').style.display = "none"
			}
			tamanho_forte = () => {
				document.getElementById('span_8_char').style.color = "#e6e3e5" // neve escurinha
				document.getElementById('check_8_char').style.display = "inline"
			}

			let_num_nao = () => {
				document.getElementById('span_num_let').style.color = "var(--neve)"
				document.getElementById('check_num_let').style.display = "none"
			}
			let_num_sim = () => {
				document.getElementById('span_num_let').style.color = "#e6e3e5" // neve escurinha
				document.getElementById('check_num_let').style.display = "inline"
			}

			senha_forte_sim = () => {
				document.getElementById('forca_senha').style.color = "green"
				document.getElementById('forca_senha').innerHTML = "Senha forte"
			}
			senha_forte_nao = () => {
				document.getElementById('forca_senha').style.color = "red"
				document.getElementById('forca_senha').innerHTML = "Senha fraca"
			}

			senhas_diferentes = () => {
				let conteudo_divs = `
					<div class="flex_row T1 center largura_interna">
						<div style="margin: 5px;">
							<div class="flex_col center clicavel botao bot_laranja bot_construtor"  onclick="proximo('contatos')">Voltar</div>
						</div>
						<div style="margin: 5px;">
							<div class="flex_col center clicavel botao bot_cinza bot_construtor">Publicar seu site</div>
						</div>
					</div>
				`
				document.getElementById('div_botoes_senha').innerHTML = conteudo_divs
			}

			senhas_iguais = () => {
				let conteudo_divs = `
					<div class="flex_row T1 center largura_interna">
						<div style="margin: 5px;">
							<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('contatos')">Voltar</div>
						</div>
						<div style="margin: 5px;">
							<div class="flex_col center clicavel botao bot_laranja bot_construtor"  onclick="vai_novo_site('publicar')">Publicar seu site</div>
						</div>
					</div>
				`
				document.getElementById('div_botoes_senha').innerHTML = conteudo_divs
			}
		}
		// Fim da configuração das telas.



		// Agora sim começa a função de verdade.
		// Chama a verificação.
		const forca_da_senha = senha_forte(tipo, senha_1, senha_2)

		// Age de acordo com o tamanho da senha.
		if (forca_da_senha.tamanho_bom === 'nao') tamanho_fraco()
		if (forca_da_senha.tamanho_bom === 'sim') tamanho_forte()

		// Age de acordo se a senha é só letras e números.
		if (forca_da_senha.letras_e_numeros === 'nao') let_num_nao()
		if (forca_da_senha.letras_e_numeros === 'sim') let_num_sim()

		// Age de acorde se a senha é igual à repetição.
		if (forca_da_senha.senhas_iguais === 'nao') senhas_diferentes()
		if (forca_da_senha.senhas_iguais === 'sim') senhas_iguais()

		// Se todos os quesitos estão ok.
		if (forca_da_senha.tamanho_bom === 'sim' & forca_da_senha.letras_e_numeros === 'sim') {
			senha_forte_sim()
		} else {
			senha_forte_nao()
		}

	}

	// Verifica de fato se as senhas estão 100%.
	function senha_forte(tipo, senha_1, senha_2) {

		const numeros = /[0-9]/
		const letras = /[a-zA-Z]/

		let obj_resposta = {
			tamanho_bom: '',
			letras_e_numeros: '',
			senhas_iguais: ''
		}
		// Verifica tamanho da senha.
		if (senha_1.length < 8) obj_resposta.tamanho_bom = 'nao'
		if (senha_1.length >= 8) obj_resposta.tamanho_bom = 'sim'

		// Verifica se são só letras e números.
		if(senha_1.match(numeros) && senha_1.match(letras)) {
				obj_resposta.letras_e_numeros = 'sim'
		} else {
			obj_resposta.letras_e_numeros = 'nao'
		}

		// Verifica se as duas senhas são iguais.
		if (senha_1 != senha_2) obj_resposta.senhas_iguais = 'nao'
		if (senha_1 == senha_2) obj_resposta.senhas_iguais = 'sim'

		return obj_resposta
	}

	function valida_arquivos() {

		if (document.getElementById('image_logo').files.length === 0) {
			alert("É necessário carregar uma imagem para a logo da sua ONG.")
			return false
		}

		if (document.getElementById('image_capa').files.length === 0) {
			alert("É necessário carregar uma imagem para a capa do site da sua ONG.")
			return false
		}

		if (document.getElementById('image_logo').files.length != 0 && document.getElementById('image_capa').files.length != 0) {
			proximo('historia')
		}
	}


	function sendForm_construtor(parametro, outro_parametro){

		let link_post
		let form1
		let image
		let data

		let end_ong

		if (outro_parametro == 'altera_logo') {
			link_post = `${servidor}/altera_logo_capa`
			form1 = document.getElementById('altera_form_logo')
			image = document.getElementById('altera_image_logo')
			data = new FormData(form1)
			end_ong = glob_site.endereco_web

			data.delete("qual")
			data.append("qual", 'altera_logo')
		}

		if (outro_parametro == 'altera_capa') {
			link_post = `${servidor}/altera_logo_capa`
			form1 = document.getElementById('altera_form_capa')
			image = document.getElementById('altera_image_capa')
			data = new FormData(form1)
			end_ong = glob_site.endereco_web

			data.delete("qual")
			data.append("qual", 'altera_capa')
		}

		if (outro_parametro != 'altera_logo' & outro_parametro != 'altera_capa') {
			end_ong = document.getElementById('end_ong').value
		}

		if (outro_parametro == "logotipo") {
			link_post = `${servidor}/altera_logo_capa`
			form1 = document.getElementById('form_logo')
			image = document.getElementById('image_logo')
			data = new FormData(form1)

			data.delete("qual")
			data.append("qual", 'upa_logo')
		}

		if (outro_parametro == "capa") {
			link_post = `${servidor}/altera_logo_capa`
			form1 = document.getElementById('form_capa')
			image = document.getElementById('image_capa')
			data = new FormData(form1)

			data.delete("qual")
			data.append("qual", 'upa_capa')
		}

		event.preventDefault() // Não vai para uma outra página, importante esse negócio aqui, acho que nem funciona mais, talvez de para retirá-lo em alguma função futura.

		// Acho que da pra excluir estas paradas de baixo, já que repete das de cima.
		// Pegamos algumas informações importantes para toda a operação

		let ajax = new XMLHttpRequest()

		data.delete("tipo")
		data.append("tipo", parametro)

		// NOVO
		if (parametro == "novo"){
			data.delete("nome_ong")
			data.append("end_ong", end_ong)
		}

		// DELETA - Apagamos o evento todo
		if (parametro == "deleta_evento"){
			data.delete("image")
			data.delete("tipo")

			data.append("tipo", "deleta_evento")
		}

		// CANCELA - Interrompemos o cadastramento de um novo evento
		if (parametro == 'cancela'){
			data.delete("image")
			data.delete("tipo")
			data.delete("titulo_cancela")

			data.append("tipo", "cancela")
			data.append("titulo_cancela", outro_parametro)
		}

		// DELETA - Apagamos uma imagem
		if (parametro == "deleta"){
			for (let i = 0; i < tabela.length; i++){
				if (tabela[i].name == outro_parametro){
					console.log("em cima. "+tabela[i])
					console.log("Óia, foi essa a cortada: "+tabela[i].name)
					tabela.splice(i, 1)
				}
			}

			data.delete("estado_tela") // Deletamos todas a fotos anteriores, ou seja, não vai foto alguma para o servidor, apenas o nome da foto a ser deletada, no append acima
			data.append("estado_tela", estado_altera_eventos)

			data.append("img_deletada", outro_parametro)
			data.delete("image") // Deletamos todas a fotos anteriores, ou seja, não vai foto alguma para o servidor, apenas o nome da foto a ser deletada, no append acima
		}

		// Se é a var tabela ainda não foi preenchida, ou seja, é a primeira vez que o usuário está selecionando fotos para upar nesta rodada.
 		//	if (!tabela) tabela = tabela_fotos

 		// Será que precisa abrir essa linha de baixo sempre?
		ajax.open('POST', link_post)

		// Também não sei se toda vêz tem que rodar esse negócio aqui.
		ajax.onreadystatechange = function(){

			if (ajax.status === 200 && ajax.readyState === 4){

				let jsondata = eval("("+ajax.responseText+")") //retrieve result as an JavaScript object
				let div_logo = ""
				let div_capa = ""

				if (jsondata.tipo == "logo_upada"){
					div_logo =  `<img src="${jsondata.newPath}" class="mini_capa" style="max-width: 100%;" />`
					document.getElementById('cont_miniatura_logo').innerHTML = div_logo
					console.log(div_logo)
					image_logo = jsondata.newPath

					const_valida_imagens()
				}

				if (jsondata.tipo == "capa_upada"){
					div_capa =  `<img src="${jsondata.newPath}" class="mini_capa" style="max-width: 100%;" />`
					document.getElementById('cont_miniatura_capa').innerHTML = div_capa
					console.log(div_logo)

					image_capa = jsondata.newPath
					const_valida_imagens()

				}

				if (jsondata.tipo == "altera_capa_upada") {

					document.getElementById('altera_img_capa').src = jsondata.newPath
				}

				if (jsondata.tipo == "altera_logo_upada") {
					document.getElementById('altera_img_logo').src = jsondata.newPath
				}


				else if (jsondata.tipo == "img_excluida"){
					div_miniatura = ''
				}
			}
		}

		//loading('loading...')

		ajax.send(data)
	}

function const_valida_imagens () {

	if (document.getElementById('image_logo').files.length != 0 || document.getElementById('image_capa').files.length != 0) {

	document.getElementById('div_proximo_imagens').innerHTML = `
		<div id="proximo_imagens" class="flex_col center clicavel botao bot_laranja" style="width: 150px;" onclick="valida_arquivos()">Próximo</div>
	`
	}
}

function valida_construtor(parametro) {

	if (parametro == "nome_ong") {
		if (!document.getElementById('nome_ong').value) {
			alert("É necessário preencher o nome da ONG antes de continuar.")
		} else {
			document.getElementById('nome_da_ong_escrito').innerHTML = "Muito que bem, daqui a pouco o site da "+document.getElementById('nome_ong').value+" já estará pronto!"

			vai_novo_site('ver_nome')
		}
	}
}

			function remover_acentos_espaco(str) {
			    return str.normalize("NFD").replace(/[^a-zA-Zs ]/g, "");
			}

	function mais_linha(parametro){

		let cont_vez

		if (parametro == "mis") {
			cont_vez = document.getElementById('cont_linhas_missao')
		}
		if (parametro == "vis") {
			cont_vez = document.getElementById('cont_linhas_visao')
		}
		if (parametro == "val") {
			cont_vez = document.getElementById('cont_linhas_valores')
		}

		var nodelist = cont_vez.getElementsByTagName("textarea").length;
		let cont_arm = ""

		for (let i = 1; i <= nodelist; i++) {
			console.log("nodelist: "+nodelist)
			console.log("i: "+i)
			let id = parametro+"_"+i
			let conteudo_textarea = document.getElementById(id).value
			cont_arm = cont_arm + "<textarea class='linha_caixa' style='outline: none; resize: none;' id='"+parametro+"_"+i+"'>"+conteudo_textarea+"</textarea>"
		}

		nodelist++
		cont_arm = cont_arm + "<textarea class='linha_caixa' style='outline: none; resize: none;' id='"+parametro+"_"+nodelist+"'></textarea>"

 		cont_vez.innerHTML = cont_arm
	}

	function proximo(parametro){

		console.log("Ta vindo, proximooo: " + parametro)
		window.scroll(0, 0) // Volta pro começo da página, horizontal e verticalmente
	 	// document.getElementById('cont_plano').style.display = 'none'
	 	document.getElementById('cont_nome_ong').style.display = 'none'
	 	document.getElementById('cont_imagens').style.display = 'none'
	 	document.getElementById('cont_historia').style.display = 'none'
	 	document.getElementById('cont_mis_vis_val').style.display = 'none'
	 	document.getElementById('cont_cidade').style.display = 'none'
	 	document.getElementById('cont_pix').style.display = 'none'
	 	document.getElementById('cont_endereco').style.display = 'none'
	 	document.getElementById('cont_contatos').style.display = 'none'
	 	document.getElementById('cont_senha').style.display = 'none'
	 	document.getElementById('cont_finale').style.display = 'none'

	 	document.getElementById('cont_'+parametro).style.display = 'flex'
	}

	function vai_novo_site(parametro){

		let link_post_comp
		let dados_vai

		if (parametro == "ver_nome") {
			console.log("ta caminhando")
			link_post_comp = '/ver_nome'

			dados_vai = {
				nome_ong: document.getElementById('nome_ong').value
			}

		} else {

			link_post_comp = '/faz_site'

			let total_missao = ""
			let total_visao = ""
			let total_valores = ""

			let missao = document.getElementById('cont_linhas_missao')
			let visao = document.getElementById('cont_linhas_visao')
			let valores = document.getElementById('cont_linhas_valores')

			let n_missao = missao.getElementsByTagName("textarea").length
			let n_visao = visao.getElementsByTagName("textarea").length
			let n_valores = valores.getElementsByTagName("textarea").length

			for (let i = 1; i <= n_missao; i++) {
				let id = "mis_"+i
				total_missao = total_missao + "<p>•" + document.getElementById(id).value + "</p>"
			}

			for (let i = 1; i <= n_visao; i++) {
				let id = "vis_"+i
				total_visao = total_visao + "<p>•" + document.getElementById(id).value + "</p>"
			}

			for (let i = 1; i <= n_valores; i++) {
				let id = "val_"+i
				total_valores = total_valores + "<p>•" + document.getElementById(id).value + "</p>"
			}

			image_logo = image_logo.replace("sites/"+endereco_web+"/images/", "")
			image_capa = image_capa.replace("sites/"+endereco_web+"/images/", "")

			let valor_cidade = document.getElementById('cidade').value
			let val_cidade_limpa = remover_acentos_espaco(valor_cidade)

			let valor_nome = document.getElementById('nome_pix').value
			let val_nome_limpo = remover_acentos_espaco(valor_nome)

			dados_vai= {

				plano: 'gratis',
				nome_ong: document.getElementById('nome_ong').value,
				endereco_web: document.getElementById('end_ong').value,
				image_logo: image_logo,
				image_capa: image_capa,
				historia: document.getElementById('historia').value,
				visao: total_visao,
				missao: total_missao,
				valores: total_valores,
				email: document.getElementById('email').value,
				senha: document.getElementById('senha_1').value,
				telefone: document.getElementById('telefone').value,
				rua: document.getElementById('rua').value,
				numero: document.getElementById('numero').value,
				bairro: document.getElementById('bairro').value,
				estado: document.getElementById('estado').value,
				cidade: val_cidade_limpa,
				cep: document.getElementById('cep').value,
				nome_pix: val_nome_limpo,
				chave_pix: document.getElementById('chave_pix').value
			}

		}

		let request = new XMLHttpRequest()
		request.open("POST", link_post+link_post_comp)
		request.setRequestHeader('Content-Type', 'application/json')

		request.onreadystatechange = function(){

			if (request.status === 200 && request.readyState === 4){
					//loading("carregou")
					let jsondata = eval("("+request.responseText+")") //retrieve result as an JavaScript object

					if (jsondata.tipo == "cadastro_sucesso"){
						location.reload(true)
					}

					if (jsondata.tipo == "ja_tem_esse_nome"){
						alert("Nome de ONG já cadastrado.")
					}

					if (jsondata.tipo == "nome_inedito"){
						endereco_web = jsondata.endereco_web
						proximo('imagens')
					}

					if (jsondata.tipo == "novo_site_salvo") {

						document.getElementById('div_link_site_novo').innerHTML = `<a href="${servidor}/${jsondata.endereco_web}" target="_blank">sitedaong.ddnsking.com/${jsondata.endereco_web}</a>`

						document.getElementById('div_botoes_sistema_site').innerHTML = `
              <div id="div_botoes_sistema_site" class="flex_row">

  							<div class="flex_row T1 center largura_interna recip_botoes">
  								<div style="margin: 5px;">
  									<a href="/login" target="_blank">
  										<div class="flex_col center clicavel botao bot_laranja bot_construtor">Acessar o Sistema</div>
  									</a>
  								</div>
  								<div style="margin: 5px;">
  									<div class="flex_col center clicavel botao bot_laranja bot_construtor"  onclick="monta_site({endereco_web: '${jsondata.endereco_web}', id_site: '${jsondata.id_site}'});">Acessar o seu Site</div>
  								</div>
  							</div>

  							</div>
  						</div>
            `

						proximo('finale')
					}

					if (jsondata.tipo == "usuario_ja_cadastrado"){

						alert("Usuário já cadastrado com este número de telefone!")

					}

				}
			}

			//loading("loading...")
			request.send(JSON.stringify(dados_vai))
		}

/* funcoes_construtor - Fim */

/* funcoes_site - Início */

/* funcoes_site - Fim */

/* sistema_home - Início */
function hover (nome, acao) {
  // const statusElem = document.querySelector('.page-status')
  console.log("nome: " + nome)
  console.log("acao: " + acao)

  if (acao === 'entra') {
    const nome_classe = `icon-${nome}_vazio`
    let elm = document.querySelector(`.${nome_classe}`)
    elm.style.color = 'var(--laranja)'
    elm.classList.remove(`icon-${nome}_vazio`)
    elm.classList.add(`icon-${nome}_cheio`)
  }
  if (acao === 'sai') {
    const nome_classe = `icon-${nome}_cheio`
    let elm = document.querySelector(`.${nome_classe}`)
    elm.style.color = 'var(--cinzao)'

    elm.classList.remove(`icon-${nome}_cheio`)
    elm.classList.add(`icon-${nome}_vazio`)
  }
}

function caixa_opcoes (acao) {

	if (acao === 'aparece') {
		document.getElementById('div_caixa_opcoes').style.display = 'flex'
	}

	if (acao === 'some') {
		// document.getElementById('div_caixa_opcoes').style.display = 'none'
	}

}
/* sistema_home - Fim */



/* sistema_fotos_videos - Início */
var form1
var image
var data
var tabelaOficial = []
var tabelaApagadas = []
var tabelaVideosOficial = []
var tabelaVideosApagados = []
var pasta
var capaAlbum = 0
var estadoAlteraEventos = 'nenhum'


function loading (parametro) {
  if (parametro == 'loading...') {
    document.getElementById('cont_loading_sist_fotos_videos').style.display = 'flex'
  }
  if (parametro == 'carregou') {
    document.getElementById('cont_loading_sist_fotos_videos').style.display = 'none'
  }
}



function deletaFoto (parametro1, nomeFoto, posicao) {
	// alert("uem oemrah")
	if (posicao == capaAlbum) {
		capaAlbum = 0
	}
	if (posicao < capaAlbum) {
		capaAlbum--
	}

	tabelaApagadas.push(nomeFoto)

	for (let i = 0; i < tabelaOficial.length; i++) {
		if (tabelaOficial[i].name == nomeFoto) {
			tabelaOficial.splice(i, 1)
		}
	}
	atualizaMiniaturas(capaAlbum)

}

function fotoPrincipal (parametro) {
	atualizaMiniaturas (parametro)
}


function atualizaMiniaturas (parametro) {
	capaAlbum = parametro
				let divMiniatura = ''
				// Esse aqui é igual ao negócio de baixo.
        for (let i = 0; i < tabelaOficial.length; i++) {
        	let newPath = tabelaOficial[i].name.split('.')[0] + '.webp'
          // newPath = 'images/' + pasta + '/miniaturas/' + newPath
          newPath = 'sites/' + glob_site.endereco_web + '/eventos/' + pasta + '/images/miniaturas/' + newPath

        	if (i == parametro) {
        		 divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="border: 4px solid red; align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + newPath + "'" + ');" onclick="fotoPrincipal(' + i + ');" ></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + tabelaOficial[i].name + "'" + ', ' + i + ');" class="xizinho fas fa-times-circle"></i></div>'


        	} else {
        		 divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + newPath + "'" + ');" onclick="fotoPrincipal(' + i + ');" ></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + tabelaOficial[i].name + "'" + ', ' + i + ');" class="xizinho fas fa-times-circle"></i></div>'


        	}

          }

    document.getElementById('contMiniaturas').innerHTML = divMiniatura

}


							function dataAtualFormatada_2(data, formato){
								data = new Date(data)
						    var dia  = data.getDate().toString(),
					        diaF = (dia.length == 1) ? '0'+dia : dia,
				  	      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
				    	    mesF = (mes.length == 1) ? '0'+mes : mes,
				      	  anoF = data.getFullYear();
								if (formato == 'inteira'){
									return diaF+"/"+mesF+"/"+anoF
								}
								if (formato == 'mobile'){
									return diaF+"/"+mesF
								}
							}


// Esta função deixa a data no jeito, para ser mostrada no campo <input type="date">
function dataAtualFormatada (data) {
  data = new Date(data)
  var dia = data.getDate().toString()
  var diaF = (dia.length == 1) ? '0' + dia : dia
  var mes = (data.getMonth() + 1).toString() // +1 pois no getMonth Janeiro começa com zero.
  var mesF = (mes.length == 1) ? '0' + mes : mes
  var anoF = data.getFullYear()

  return anoF + '-' + mesF + '-' + diaF
}

// Função que altera coisas. Tem que dar um jeito de deixá-la mais genérica
function alteraEventos (parametro, items, i) {

	if (glob_eventos) {
		items = glob_eventos[i]
	}

  if (parametro == 'novoEvento') {
    estadoAlteraEventos = parametro

    document.getElementById('botaoDeletaEvento').style.display = 'none'
    document.getElementById('contListaEventos').style.display = 'none'
    document.getElementById('contNovoEvento').style.display = 'flex'

    // Zeramos o eventoTitulo, eventoData e contMiniaturas
    document.getElementById('eventoTitulo').value = ''
    document.getElementById('eventoData').value = ''
    document.getElementById('contMiniaturas').innerHTML = ''
  }

  if (parametro == 'editarEvento') {
    estadoAlteraEventos = parametro
    capaAlbum = Number(items.capaAlbum)

    form1 = document.getElementById('formMiniaturas')
    image = document.getElementById('image')
    data = new FormData(form1)

    tabelaOficial = data.getAll('image')

    document.getElementById('botaoDeletaEvento').style.display = 'inline'
    document.getElementById('contListaEventos').style.display = 'none'
    document.getElementById('contNovoEvento').style.display = 'flex'

    const dataPronta = dataAtualFormatada(items.data) // Deixamos a data no djeito, para ser mostrada

    document.getElementById('eventoTitulo').value = items.nome
    document.getElementById('eventoData').value = dataPronta

    let divMiniatura = ''

    data.delete('image') // Apagamos tudo

    /*
      // E appendamos somente a tabela depois
      for (let j = 0; j < tabelaOficial.length; j++){
        data.append("image", tabelaOficial[j])
      }
    */

    for (let v = 0; v < items.videos.length; v++) {
      console.log("foi " + v)
      let miniaturaPronta = setaVideo(items.videos[v].idVideo, items.videos[v].tituloVideo)
    document.getElementById('contMiniaturasVideos').appendChild(miniaturaPronta)

    }

    for (let j = 0; j < items.fotos.length; j++) {
      tabelaOficial[j] = { name: items.fotos[j].nome }
      items.fotos[j].miniatura = items.fotos[j].miniatura.replace('public/', '')
      pasta = items.pasta

      console.log("items.fotos[j].miniatura: " + items.fotos[j].miniatura)

      if (capaAlbum == j) {
      	divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="border: 4px solid red; align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + items.fotos[j].miniatura + "'" + ');" onclick="fotoPrincipal(' + j + ');"></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + items.fotos[j].nome + "'" + ', ' + i + ');" class="xizinho fas fa-times-circle"></i></div>'

      } else {
      	divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + items.fotos[j].miniatura + "'" + ');" onclick="fotoPrincipal(' + j + ');"></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + items.fotos[j].nome + "'" + ', ' + j + ');" class="xizinho clicavel fas fa-times-circle"></i></div>'
      }

    }

    document.getElementById('contMiniaturas').innerHTML = divMiniatura
  }

  if (parametro == 'voltaPraLista') {
    if (estadoAlteraEventos == 'novoEvento') {
      estadoAlteraEventos = parametro
      const eventoTitulo = document.getElementById('eventoTitulo').value
      sendForm('cancela', eventoTitulo)
      console.log('mandou o send forme')
    }

    // DELETA TUDO antes de voltar pra lista

    form1 = ''
    image = ''
    data = ''
    tabelaOficial = []
    tabelaApagadas = []
    tabelaVideosOficial = []
    document.getElementById('contMiniaturasVideos').innerHTML = ""

    document.getElementById('inputInsereImgs').value= null;

    document.getElementById('contNovoEvento').style.display = 'none'
    document.getElementById('contListaEventos').style.display = 'flex'
  }
}


// Quero em breve juntar estas funções de validação em apenas uma única função de validação, que poderá ser utilizada em outros códigos. Uma função valida_geral()

function setaVideo(idVideo, tituloVideo) {
  const enderecoVideo = `https://img.youtube.com/vi/${idVideo}/default.jpg`

  let contThumb = document.createElement('div')
      contThumb.className = 'flex_col miniaturaVideo'
      contThumb.setAttribute('style', 'justify-content: flex-start; align-content: flex-start;')
      contThumb.setAttribute('id', idVideo)

      let contImg = document.createElement("div")
      contImg.className = 'flex_row'
      contImg.setAttribute('style', 'justify-content: flex-start; align-content: flex-start;')

      let miniatura = document.createElement("img")
      miniatura.setAttribute('src', enderecoVideo)
      let xizinho = document.createElement("i")
      xizinho.className = 'fas fa-times-circle xizinho clicavel'
			xizinho.setAttribute('style', 'margin-left: 95px;')
      xizinho.setAttribute('onclick', `apagaVideo('${idVideo}')`)

      let divTitulo = document.createElement('div')
      divTitulo.className = 'tituloMiniaturaVideo'
      divTitulo.innerHTML = tituloVideo

      contImg.appendChild(miniatura)
      contImg.appendChild(xizinho)

      contThumb.appendChild(contImg)
      contThumb.appendChild(divTitulo)

      tabelaVideosOficial.push({'idVideo': idVideo, 'tituloVideo': tituloVideo})

      return contThumb
}

function adicionaVideo(idVideo) {
	console.log("Iniciou o adicionaVideo()")
  if (tabelaVideosOficial) {
    for (let i = 0; i < tabelaVideosOficial.length; i++) {
      if (idVideo == tabelaVideosOficial[i].idVideo) {
        // Ja tem esse video aqui na galeraia
        alert("Este vídeo já está nesta seleção.")
        return false
      }
    }
  }

  let conteudoMiniaturas = document.getElementById('contMiniaturasVideos').innerHTML
  //const idVideo = 'zlvw3VpNfqM'
  const enderecoVideo = `https://img.youtube.com/vi/${idVideo}/default.jpg`
  const apiYoutube = 'AIzaSyDcSoKYHZzbBVmxiOCPIcSD4nLCyTbnH2A'
  const urlPegaInfo = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${idVideo}&key=${apiYoutube}`

  // https://www.googleapis.com/youtube/v3/videos?part=snippet&id=zlvw3VpNfqM&key=AIzaSyDcSoKYHZzbBVmxiOCPIcSD4nLCyTbnH2A

  console.log("ta criando uma nova conexao ajax. hmmm, pode ser isso.")
  const ajax_V = new XMLHttpRequest()
  ajax_V.open('GET', urlPegaInfo)
  ajax_V.overrideMimeType("application/json")

  ajax_V.onreadystatechange = function () {

    if (ajax_V.status === 200 && ajax_V.readyState === 4) {
    	console.log("Acabou de retornar a conexao ajax do youtube.")

      loading('carregou')

      const jsondata = eval('(' + ajax_V.responseText + ')')
      let divMiniatura = ''
     // alert(jsondata.items[0].snippet.title)

      let miniaturaPronta = setaVideo(idVideo, jsondata.items[0].snippet.title)

      document.getElementById('contMiniaturasVideos').appendChild(miniaturaPronta)

    }
  }
  loading('loading...')
  ajax_V.send()
}

function apagaVideo(idVideo) {
  const miniaturaDeletada = document.getElementById(idVideo);
  document.getElementById('contMiniaturasVideos').removeChild(miniaturaDeletada);

  for (let i = 0; i < tabelaVideosOficial.length; i++) {
    if (idVideo == tabelaVideosOficial[i].idVideo) {
      tabelaVideosOficial.splice(i, 1)
    }
  }

  console.dir(tabelaVideosOficial)
}

function encontraIdVideo() {
	console.log("Iniciou o encontraIdVideo()")
    const urlVideoYoutube = document.getElementById('urlVideoYoutube').value
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = urlVideoYoutube.match(regExp);

    if (match&&match[7].length==11){
      // adicionaVideo(match[7])
      vai_filhao_2('adiciona_video', match[7])
    } else {
      alert("Endereço invalido, por favor, tente novamente.")
      document.getElementById('urlVideoYoutube').focus
      return false
    }
}

function validaTitulo () {
  if (!document.getElementById('eventoTitulo').value) {
    alert('É preciso primeiramente digitar o Título do evento.')
    event.preventDefault()
    return false
  }
}

function validaConfirma () {
  if (!document.getElementById('eventoTitulo').value || !document.getElementById('eventoData').value) {
    alert('É preciso preencher todos os campos para salvar um novo evento.')
    event.preventDefault()
    return false
  }
}

function validaDeletaEvento () {
  const a = confirm('Deseja mesmo excluir este evento?')
  if (a) sendForm('deletaEvento', 'segundoParametro')
  if (!a) return false
}

// Função que comanda a seta de voltar para a lista.
// Outra função valida, que deveria ser incorporada na função valida_geral()
function validaVoltar () {
  if (estadoAlteraEventos == 'novoEvento') {
    const a = confirm('Se voltar para a lista, este evento que estás criando não será publicado. Quer voltar à lista de eventos?')
    if (a) {
      alteraEventos('voltaPraLista')
    } else {
      return false
    }
  }

  if (estadoAlteraEventos == 'editarEvento') {
    alteraEventos('voltaPraLista')
  }
}

// Este sendForm deve ser uma função geral também, função de comunicação Ajax entre um servidor e um cliente.
// Neste caso, esta função deve se tornar mais genérica.
function sendForm (parametro, outroParametro) {
	console.log("Ta operando um sendForm(), função da monta_sistema_fotos_videos")
  // const linkPost = "https://www.ascar.org.br/sistema_fotos_videos" // Produção
  const linkPost = `${servidor}/sistema_fotos_videos` // Sandbox
  event.preventDefault()
  form1 = document.getElementById('formMiniaturas')
  image = document.getElementById('image')
  data = new FormData(form1)
  const tabelaFotos = data.getAll('image')
  data.delete('pasta')	// Esta pasta deve ser appendida uma única vez, não precisa de tantas.
  data.append('pasta', pasta)

  data.delete('endereco_web')
  data.append('endereco_web', glob_site.endereco_web)

  data.append('tabelaVideos', JSON.stringify(tabelaVideosOficial))

  const ajax = new XMLHttpRequest()

  // NOVO
  if (parametro == 'novo' && estadoAlteraEventos == 'novoEvento' || parametro == 'novo' && estadoAlteraEventos == 'nenhum') {
    data.append('tipo', 'novo')
  }

  // DELETA - Apagamos o evento todo
  if (parametro == 'deletaEvento') {
    data.delete('image')
    data.append('tipo', 'deletaEvento')
  }

  // CANCELA - Interrompemos o cadastramento de um novo evento
  if (parametro == 'cancela') {
    data.delete('image')
    data.append('tipo', 'cancela')
    data.append('tituloCancela', outroParametro)
  }

  // VAI - Selecionamos MAIS imagens para a galeria que já existe imagens.
  if (tabelaOficial && parametro == 'vai') {
    // Se a tabelaOficial (final) ja foi preenchida, ou seja, não é a primeira vez que o usuário está selecionando fotos para upar nesta rodada.

    // Criamos duas arrayas para comparação delas
    const arrTabelaOficial = []
    const arrTabelaFotos = []
    const tabelaNovasFotos = []

    // Preenchemos cada arraya com o grupo respectivo
    for (let i = 0; i < tabelaOficial.length; i++) {
      arrTabelaOficial.push(tabelaOficial[i].originalname)
    }
    for (let j = 0; j < tabelaFotos.length; j++) {
      arrTabelaFotos.push(tabelaFotos[j].originalname)
    }

    // Damos um loop na arraya da tabela que acabou de ser carregada
    for (let k = 0; k < arrTabelaFotos.length; k++) {
      // Através do find, procuramos se tem na arraya arr_req_files o valor de arrTabela_original[k]
      const found = arrTabelaOficial.find(element => element == arrTabelaFotos[k])

      // Se NÃO encontrar...
      if (!found) {
        // ...é pq é uma foto nova, então colocamos no objeto tabela (que vai ser upada) o valor correspondente do obj tabelaFotos
        tabelaOficial[tabelaOficial.length] = tabelaFotos[k]
        tabelaNovasFotos.push(tabelaFotos[k])
      }
    }

    data.delete('image') // Deletamos todas a fotos anteriores, para em seguida...

    // ...criarmos um novo data("image") com os dados novos, além dos antigos também, tudo já devidamente salvo no obj tabela
    for (let j = 0; j < tabelaNovasFotos.length; j++) {
      data.append('image', tabelaNovasFotos[j])
    }
  }

  // DELETA - Apagamos uma imagem
  if (parametro == 'deleta') {

    for (let i = 0; i < tabelaOficial.length; i++) {
      if (tabelaOficial[i].name == outroParametro) {
        console.log('em cima. ' + tabelaOficial[i])
        console.log('Óia, foi essa a cortada: ' + tabelaOficial[i].name)
        tabelaOficial.splice(i, 1)
      }
    }

    data.delete('estadoTela') // Deletamos todas a fotos anteriores, ou seja, não vai foto alguma para o servidor, apenas o nome da foto a ser deletada, no append acima
    data.append('estadoTela', estadoAlteraEventos)

    data.append('imgDeletada', outroParametro)
    data.delete('image') // Deletamos todas a fotos anteriores, ou seja, não vai foto alguma para o servidor, apenas o nome da foto a ser deletada, no append acima
  }

  // Se é a var tabela ainda não foi preenchida, ou seja, é a primeira vez que o usuário está selecionando fotos para upar nesta rodada.
  if (!tabelaOficial) tabelaOficial = tabelaFotos
  ajax.open('POST', linkPost)

	// CONFIRMA - Salvamos um evento
	if (parametro == 'confirma') {

		const tabelaNomes = []
		for (let i = 0; i < tabelaOficial.length; i++) {
			tabelaNomes.push({ nome: tabelaOficial[i].name })
		}

		data = JSON.stringify({
			tipo: 'confirma',
			pasta: pasta,
			endereco_web: glob_site.endereco_web,
			data: document.getElementById('eventoData').value,
			titulo: document.getElementById('eventoTitulo').value,
			capaAlbum: capaAlbum,
			estadoTela: estadoAlteraEventos,
			tabelaApagadas: JSON.stringify(tabelaApagadas),
			tabela: JSON.stringify(tabelaNomes),
			tabelaVideos: JSON.stringify(tabelaVideosOficial)
		})

		console.log(data)
		ajax.setRequestHeader('Content-Type', 'application/json');

		/*
		data.delete('tabela')
		data.append('tipo', 'confirma')

		data.delete('data')
		data.delete('titulo')
		data.append('data', document.getElementById('eventoData').value)
		data.append('titulo', document.getElementById('eventoTitulo').value)

		data.delete('capaAlbum')
		data.append('capaAlbum', capaAlbum)

		data.delete('estadoTela')
		data.append('estadoTela', estadoAlteraEventos)

		data.delete('tabelaApagadas')

		if (tabelaApagadas) {
			data.append('tabelaApagadas', JSON.stringify(tabelaApagadas))
		}

		const tabelaNomes = []
		for (let i = 0; i < tabelaOficial.length; i++) {
			tabelaNomes.push({ nome: tabelaOficial[i].name })
		}

		data.append('tabela', JSON.stringify(tabelaNomes))
		*/
	}

  ajax.onreadystatechange = function () {
    if (ajax.status === 200 && ajax.readyState === 4) {
      loading('carregou')
      const jsondata = eval('(' + ajax.responseText + ')')
      let divMiniatura = ''

      if (jsondata.tipo == 'criandoNovoEvento') {
        console.log('recebeu, criandoNovoEvento')
        loading('carregou')
        pasta = jsondata.pasta_deste_evento
        console.log("Essa é a pasta deste evento: " + pasta)

      } else if (jsondata.tipo === 'novoEventoCancelado') {
      	data.delete('tituloCancela')
        loading('carregou')
				window.location.reload();
      } else if (jsondata.tipo == 'novoEventoCadastrado') {
        alert('Evento cadastrado com sucesso!')
        window.location.replace(linkPost)

      } else if (jsondata.tipo == 'eventoAntigoDeletado') {
        alert('Evento deletado com sucesso!')
        window.location.replace(linkPost)

      } else if (jsondata.tipo == 'alteraçãoBemSucedida') {
        alert('Alteração bem sucedida!')
        window.location.replace(linkPost)

      } else if (jsondata.tipo == 'imgExcluida') {
      	data.delete('imgDeletada')

        // Esse aqui é igual ao negócio de baixo.
        for (let i = 0; i < tabelaOficial.length; i++) {
          let newPath = tabelaOficial[i].name.split('.')[0] + '.webp'
         // newPath = 'images/' + pasta + '/miniaturas/' + newPath
          newPath = 'sites/' + glob_site.endereco_web + '/eventos/' + pasta + '/images/miniaturas/' + newPath

          if (i === capaAlbum) {
          	divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="border: 4px solid red; align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + newPath + "'" + ');" onclick="fotoPrincipal('+ i +');" ></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + tabelaOficial[i].name + "'" + ', ' + i + ');" class="xizinho fas fa-times-circle"></i></div>'
          } else {
          	divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + newPath + "'" + ');" onclick="fotoPrincipal('+ i +');" ></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + tabelaOficial[i].name + "'" + ', ' + i + ');" class="xizinho fas fa-times-circle"></i></div>'
          }

        }
      } else {

        for (let i = 0; i < tabelaOficial.length; i++) {
          let newPath = tabelaOficial[i].name.split('.')[0] + '.webp'

          newPath = 'sites/' + glob_site.endereco_web + '/eventos/' + pasta + '/images/miniaturas/' + newPath

          if (i === capaAlbum) {
          	divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="border: 4px solid red; align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + newPath + "'" + ');" onclick="fotoPrincipal('+ i +');" ></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + tabelaOficial[i].name + "'" + ', ' + i + ');" class="xizinho fas fa-times-circle"></i></div>'
          } else {
          	divMiniatura = divMiniatura + '<div class="flex_row"><div class="flex_row cont_thumb clicavel" style="align-items: flex-start; justify-content: flex-end; background-image: url(' + "'" + newPath + "'" + ');" onclick="fotoPrincipal('+ i +');" ></div><i onclick="deletaFoto(' + "'" + 'deleta' + "'" + ', ' + "'" + tabelaOficial[i].name + "'" + ', ' + i + ');" class="xizinho fas fa-times-circle"></i></div>'
          }

        }
      }
			if (data.tipo) data.delete('tipo')

      document.getElementById('contMiniaturas').innerHTML = divMiniatura
    }
  }

  loading('loading...')

  ajax.send(data)
}
/* sistema_fotos_videos - Fim */

/* Outras que precisam se alocar */


function ajeita_nova_senha (msg, id_usuario, id_token) {

	// Só faz alguma coisa se o botao de alterar a senha estiver ativo.
	// Se estiver inativo (cinza) dá calado por resposta.
	let botao = document.getElementById('botao_altera_senha')
	if (botao.classList.contains('bot_ativo')) {
		console.log("dados.id_token: " + id_usuario)

		const nova_senha = document.getElementById('senha_1_altera').value
		if (!nova_senha) {
			alert("Por favor, digite sua nova senha.")
			return false
		}

		const obj = {
			nova_senha: nova_senha,
			id_usuario: id_usuario,
			id_token: id_token
		}

		console.log("furico")

		console.log("obj.nova_senha: " + obj.nova_senha)
		console.log("obj.id_usuario: " + obj.id_usuario)
		console.log("obj.id_token: " + obj.id_token)

		vai_filhao_2('nova_senha', obj)
	}
}







function pix_copia () {
  console.log('indo normal')
  const input_payload_escondido = document.getElementById('input_payload_escondido')
  input_payload_escondido.value = payload_atual


	//console.log(input_payload_escondido.value)
		navigator.clipboard.writeText(payload_atual).then(function() {
		  /* clipboard successfully set */
		  alert('Pix Copiado: ' + payload_atual)
		}, function() {
		  /* clipboard write failed */
		});
}


function aumenta_misvisval (tipo) {
  if (tipo === 'missao') {
    const cont_vez = document.getElementById('cont_altera_missao')
    const nodelist = cont_vez.getElementsByTagName('textarea').length

    const mais_div_misvisval = document.createElement('textarea')
    mais_div_misvisval.innerHTML = ''
    mais_div_misvisval.className = 'flex_row T1 input_texto_sistema'

    mais_div_misvisval.setAttribute('id', `alt_mis_${nodelist}`)
    mais_div_misvisval.setAttribute('style', 'margin: 0px; margin-top: 5px; margin-bottom: 5px; height: 100px; resize: none;')

    document.getElementById('cont_altera_missao').appendChild(mais_div_misvisval)
  }

  if (tipo === 'visao') {
    const cont_vez = document.getElementById('cont_altera_visao')
    const nodelist = cont_vez.getElementsByTagName('textarea').length

    const mais_div_misvisval = document.createElement('textarea')
    mais_div_misvisval.innerHTML = ''
    mais_div_misvisval.className = 'flex_row T1 input_texto_sistema'

    mais_div_misvisval.setAttribute('id', `alt_vis_${nodelist}`)
    mais_div_misvisval.setAttribute('style', 'margin: 0px; margin-top: 5px; margin-bottom: 5px; height: 100px; resize: none;')

    document.getElementById('cont_altera_visao').appendChild(mais_div_misvisval)
  }

  if (tipo === 'valores') {
    const cont_vez = document.getElementById('cont_altera_valores')
    const nodelist = cont_vez.getElementsByTagName('textarea').length

    const mais_div_misvisval = document.createElement('textarea')
    mais_div_misvisval.innerHTML = ''
    mais_div_misvisval.className = 'flex_row T1 input_texto_sistema'

    mais_div_misvisval.setAttribute('id', `alt_val_${nodelist}`)
    mais_div_misvisval.setAttribute('style', 'margin: 0px; margin-top: 5px; margin-bottom: 5px; height: 100px; resize: none;')

    document.getElementById('cont_altera_valores').appendChild(mais_div_misvisval)
  }
}



function nav_lista_adiciona_eventos (acao) {
  if (acao === 'adiciona') {
    document.getElementById('contListaEventos').style.display = 'none'
    document.getElementById('contNovoEvento').style.display = 'flex'
  }

  if (acao === 'lista') {
    document.getElementById('contNovoEvento').style.display = 'none'
    document.getElementById('contListaEventos').style.display = 'flex'
  }
}



/**
 * Stop an iframe or HTML5 <video> from playing
 * @param  {Element} element The element that contains the video
 */

var paraVideo = () => {
	for (let k = 0; k < qtd_elm_geral; k++) {
		if (document.getElementById(`iframe_video_${k}`)) {
			const src_original = document.getElementById(`iframe_video_${k}`).src
			document.getElementById(`iframe_video_${k}`).src = ''
			document.getElementById(`iframe_video_${k}`).src = src_original
		}
		if (document.getElementById(`iframe_video_mob_${k}`)) {
			const src_original = document.getElementById(`iframe_video_mob_${k}`).src
			document.getElementById(`iframe_video_mob_${k}`).src = ''
			document.getElementById(`iframe_video_mob_${k}`).src = src_original
		}
	}
}

/*
function galeria_vai_volta (i, acao) {
  const qtd_fotos = glob_evts[i].fotos.length
  const qtd_videos = glob_evts[i].videos.length
  const qtd_elementos = Number(qtd_fotos) + Number(qtd_videos)

  if (acao === 'vai') {
    i_galeria++
  }
  if (acao === 'volta') {
    i_galeria--
  }

  if (i_galeria === 0) {
    i_galeria = 1
  }

  console.log('i_galeria: ' + i_galeria)
  console.log('qtd_fotos: ' + qtd_fotos)
  console.log('qtd_videos: ' + qtd_videos)
  console.log('qtd_elementos: ' + qtd_elementos)

  let elemento_a_mostrar
  if (i_galeria <= qtd_fotos) {
    const conteudo = glob_evts[i].fotos[i_galeria - 1].real.replace('public/', '')
    elemento_a_mostrar = `<img src="${conteudo}" style="max-height: 100%; height: 100%;" class="sombrinha">`
  }
  if (i_galeria > qtd_fotos & i_galeria <= qtd_elementos) {
    const conteudo = glob_evts[i].videos[i_galeria - qtd_fotos - 1].idVideo.replace('public/', '')
    elemento_a_mostrar = `<iframe id="iframe_video" class="sombrinha" width="560" height="315" src="https://www.youtube.com/embed/${conteudo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>`
  }
  if (i_galeria > qtd_elementos & qtd_videos == 0) {
    i_galeria--
    const conteudo = glob_evts[i].fotos[i_galeria - 1].real.replace('public/', '')
    elemento_a_mostrar = `<img src="${conteudo}" class="sombrinha" style="max-height: 100%; height: 100%;">`
  }
  if (i_galeria > qtd_elementos & qtd_videos != 0) {
    i_galeria--
    const conteudo = glob_evts[i].videos[i_galeria - qtd_fotos - 1].idVideo.replace('public/', '')
    elemento_a_mostrar = `<iframe id="iframe_video" class="sombrinha" width="560" height="315" src="https://www.youtube.com/embed/${conteudo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }

  document.getElementById('span_id_galeria').innerHTML = i_galeria
  document.getElementById('recipiente_conteudo_lightbox').innerHTML = `${elemento_a_mostrar}`
}
*/
/*
function visualizar_galeria (i) {
  const qtd_fotos = glob_evts[i].fotos.length
  const qtd_videos = glob_evts[i].videos.length
  const qtd_elementos = Number(qtd_fotos) + Number(qtd_videos)

  let galeria = ''
  for (let j = 0; j < qtd_fotos; j++) {
  	const elem_a_mostrar = glob_evts[i].fotos[j].real.replace('public/', '')

  	galeria = galeria + `
  		<div class="flex_row center T1" style="min-width: 100%; background-color: red;">
	  		<img src="${elem_a_mostrar}" class="sombrinha" style="max-height: 100%; height: 100%;">
	 		</div>
  	`
  }

  // const elemento_a_mostrar = glob_evts[i].fotos[0].real.replace('public/', '')

  document.getElementById('recipiente_lightbox').innerHTML = `

  		<div class="flex_row T1 largura_interna" style="margin-bottom: 5px;">

				<div id="div_numeracao" class="flex_row" style="align-items: flex-end; font-size: 20pt; min-width: 200px;">
					<span id="span_id_galeria">${i_galeria}</span> / ${qtd_elementos}
				</div>
				<div class="flex_row T1 center">

				</div>
				<div style="text-align: right; min-width: 50px;">
					<i class="far fa-times-circle clicavel" style="font-size: 35pt;" onclick="fecha_galeria();"></i>
  			</div>

  		</div>

  		<div class="flex_row center T1" style="max-height: calc(100% - 150px); height: 90%; width: 2000px; background: orange;">

  			<div class="flex_row center" style="width: 200px;">
					<i class="fas fa-angle-left clicavel" style="font-size: 75pt;" onclick="galeria_vai_volta_2(${i}, 'volta')"></i>
	  			</div>

	  			<div id="recipiente_conteudo_lightbox" class="flex_row T1 largura_interna" style="padding: 0; background-color: green; overflow:auto;" ontouchend="soltou()">

	  				${galeria}

	  			</div>

	  			<div class="flex_row center" style="width: 200px;">
	  				<i class="fas fa-angle-right clicavel" style="font-size: 75pt; color: var(--neve);" onclick="galeria_vai_volta_2(${i}, 'vai')"></i>
	  			</div>
  			</div>
  		</div>
  `

  document.getElementById('fundo_lightbox').style.display = 'flex'
}
*/

function setas (e) {
	console.log("apertou")
}





/*
function apertou (i, j) {

	console.log("aprietou")
	let obj_atual = document.getElementById(`galeria_${i}_foto_${j}`)
	var style = window.getComputedStyle(obj_atual)
 	var matrix = new WebKitCSSMatrix(style.transform)



	obj_atual.addEventListener('touchstart', function(e) {
		console.log("apertou dentro")
		pos_apertou = e.touches[0].clientX
	}, false)

	// document.getElementById(`galeria_${i}_foto_${j}`)
}
*/

var pos_apertou

function deslizou (i, j) {

	let obj_atual = document.getElementById(`galeria_${i}_foto_${j}`)
	let largura = document.getElementById(`galeria_${i}_foto_${j}`).offsetWidth

	console.log("coprimiiro")
	obj_atual.addEventListener('touchmove', function(e) {

		var style = window.getComputedStyle(obj_atual)
 		var matrix = new WebKitCSSMatrix(style.transform)

		// Cache the client X/Y coordinates
	  clientX = e.touches[0].clientX // horizontal do ponteiro do dedo

	  let pos_obj = (clientX - pos_apertou) - (largura * (j_galeria_atual - 1))
		console.log("pos_obj::: " + pos_obj)

	  // Se for o primeiro elemento da galeria em questã.
	  if (j === 0) {
	  	// Essas var style e matrix servem para ver a posição translateX do elemento clicado,
	  	// Neste caso, o 0.

 			// Esse matrix.m41 é a posição translateX do elemento em questã.
 			// Se for menor ou igual à zero, o código segue normalmente,
 			// arrastando toda a galeria.
	  	if (matrix.m41 <= 0) {
	  		// Se pos_obj for negativo, ou seja, se o usuário puxou pra trás, para ver os elementos seguintes.
	  		// Se puxou para ver os anteriores, como é o primeiro item, não faz nada.
	  		if (pos_obj < 0) {
	  			// Movimenta o elemento pressionado e os outros todos elementos desta galeria i.
				  for (let k_sobe = 0; (j + k_sobe) < qtd_elm_geral; k_sobe++) {
				  	document.getElementById(`galeria_${i}_foto_${j+k_sobe}`).style.transform = `translateX(${pos_obj}px)`
				  }
	  		}
	  	}

	  // Se for o último elemento da galeria em questã.
	  } else if (j != 0 & j === qtd_elm_geral - 1) {

	  	// Se pos_obj for maior que essa equação cabulosa abaixo, quer dizer que a...
	  	// ...última imagem foi puxada pra trás, então voltamos para o item anterior normalmente.
	  	// Se o usuário puxou para a direita, não tem mais itens para mostrar, logo,
	  	// o código não faz nothing.
	  	if (pos_obj > ((largura * qtd_elm_geral) - largura) * -1) {

	  		for (let k_sobe = 0; k_sobe <= j; k_sobe++) {
			  	document.getElementById(`galeria_${i}_foto_${k_sobe}`).style.transform = `translateX(${pos_obj}px)`
	  		}
	  	}

	  // Movimenta os elementos à esquerda.
	  } else {

	  	for (let k = 0; k < qtd_elm_geral; k++) {
	  		//console.log("move tudo")
	  		document.getElementById(`galeria_${i}_foto_${k}`).style.transform = `translateX(${pos_obj}px)`
	  	}

	  }

	}, false)
}

async function soltou (i, j) {

  const qtd_fotos = glob_evts[i].fotos.length
  const qtd_videos = glob_evts[i].videos.length
  const qtd_elementos = Number(qtd_fotos) + Number(qtd_videos)
  console.log("largou")

  if (event.cancelable) event.preventDefault();

	let obj_atual = document.getElementById(`galeria_${i}_foto_${j}`)
	let largura =	obj_atual.offsetWidth

	// Esse largura_dec é importante pois quando o usuário desliza um décimo da imagem, o sistema já reconhece que ele quer trocar, então passa para a próxima.
	// Se ele deslizar um décimo da imagem para frente, mostra o proxima item.
	// Se ele deslizar um décimo da imagem para trás, mostra o item anterior.
	let largura_dec = largura / 10

	// É nessa let posicao_elm que vamos colocar a posição final de cada um dos elementos da galeria em questã.
	// No início, todos os elementos recebem a posicao_elm == 0. TODOS ELES.
	// Se estivermos visualizando o segundo elemento, então TODOS os elementos recebem posicao_elm = largura (largura do elemento atual, mas uma vez que todos os elementos tem a mesma largura, que é a largura da tela, tá tudo em casa).
	let posicao_elm

	// Esse style serve para calcular a matrix, que na matrix.m41 temos o valor da translateX do elemento. Se o elemento já foi movimentado, é nesse translateX que está o novo da posição horizontal dele.
	var style = window.getComputedStyle(obj_atual)
 	var matrix = new WebKitCSSMatrix(style.transform)

 	// Esses ifs e elses servem só para calcular o posicao_elm (que é o mesmo valor para todos os elementos, independente da posição deles) e para alterar o valor da j_galeria_atual, que é uma var global utilizada por outras funções (programação funcional? Oi?? ).

 	// Se for o primeiro elemento da galeria.
 	// LEMBRANDO que o primeiro j_galeria_atual é 1 e não 0. O primeiro j sim é 0, mas o primeiro j_galeria_atual é 1.
 	if (j_galeria_atual === 1) {

 		// Se arrastou pra esquerda a primeira imagem e passou mais de um décimo da largura...
 		// ...da imagem para fora da tela do mobile.
 		if ( matrix.m41 < largura_dec * -1 ) {
 			posicao_elm = largura * -1
 			j_galeria_atual++
 			paraVideo()
 		// Arrastou mas não foi tudo isso, volta pra posição original.
 		} else {
 			posicao_elm = 0 // Posição original para todos os elementos. Uíí!!
 		}

 	// Se for o último elemento da galeria.
 	} else if (j_galeria_atual === qtd_elm_geral) {

 		// Quando o cabra desliza o elemento pra direita e larga DEPOIS de um décimo já rolado.
 		// Ou seja, passa para o item anterior.
 		if ( matrix.m41 > ((largura * (j_galeria_atual - 1)) - largura_dec) * -1 ) {

 			j_galeria_atual--
 			// Nova posição para todos os elementos.
 			posicao_elm = (largura * (j_galeria_atual - 1)) * -1
 			paraVideo()
 		// Else, quando o cabra solta ANTES do décimo, ou seja, não passa para o item anterior.
 		// Ou seja, volta a mostrar esse mesmo item, bem centralizado.
 		} else {

			posicao_elm = (largura * (j_galeria_atual - 1)) * -1
 		}

 	// Se for um dos elementos do meio da galeria.
 	} else {

		// Se rolar para frente (indo para o item ANTERIOR).
		if ( matrix.m41 > (largura * (j_galeria_atual - 1)) * -1 + largura_dec ) {

 			j_galeria_atual--
 			posicao_elm = (largura * (j_galeria_atual - 1) ) * -1
 			paraVideo()
 		// Se rolar para trás (indo para o PŔOXIMO item).
 		// Aqui somamos mais 9 décimos da largura na conta final, para dar pro cabra puxar um décimo da imagem e já rolar.
		} else if (matrix.m41 < ((largura * (j_galeria_atual)) * -1 + largura_dec * 9)) {

 			j_galeria_atual++
			posicao_elm = (largura * (j_galeria_atual - 1)) * -1
			paraVideo()
		// Se deslizou a imagem mas não o suficiente para trocar a imagem mostrada.
		} else {
			posicao_elm = (largura * (j_galeria_atual - 1)) * -1
		}

 	}

 	// Se for o primeiro item da galeria.
 	if (j_galeria_atual === 1) {

 		// Deixa só a seta de vai.
		document.getElementById('seta_mobile_vai').style.display = 'flex'
		document.getElementById('seta_mobile_volta').style.display = 'none'

	// Se for o último.
	} else if (j_galeria_atual === qtd_elm_geral) {

 		// Deixa só a seta de volta.
		document.getElementById('seta_mobile_vai').style.display = 'none'
		document.getElementById('seta_mobile_volta').style.display = 'flex'

	// Se for um intermediário.
	} else {

		// Deixa as duas setas.
		document.getElementById('seta_mobile_vai').style.display = 'flex'
		document.getElementById('seta_mobile_volta').style.display = 'flex'

	}


	for (let k = 0; k < qtd_elm_geral; k++) {

		let player = document.getElementById(`galeria_${i}_foto_${k}`).animate([
		  // keyframes
		  { transform: `translateX(${posicao_elm}px)` }
		], {
		  // timing options
		  duration: 100
		})

		player.onfinish = function(e) {
		  console.log('per aspera ad terra!');
		  document.getElementById(`galeria_${i}_foto_${k}`).style.transform = `translateX(${posicao_elm}px)`

		}

	}

  document.getElementById('span_id_galeria').innerHTML = j_galeria_atual
}

function setas_mobile (i, acao) {
	console.log("j_galeria_atual: " + j_galeria_atual)
	let obj_atual = document.getElementById(`galeria_${i}_foto_${j_galeria_atual - 1}`)
	let largura =	obj_atual.offsetWidth

	var style = window.getComputedStyle(obj_atual)
 	var matrix = new WebKitCSSMatrix(style.transform)
	// falta comentar e sumir com as setas que nao sao utilizadas.

	if (acao === 'vai') j_galeria_atual++ // Se vai pra frente.
	if (acao === 'volta') j_galeria_atual-- // Se volrta pra trás.

 	// Se for o primeiro item da galeria.
 	if (j_galeria_atual === 1) {

 		// Deixa só a seta de vai.
		document.getElementById('seta_mobile_vai').style.display = 'flex'
		document.getElementById('seta_mobile_volta').style.display = 'none'

	// Se for o último.
	} else if (j_galeria_atual === qtd_elm_geral) {

 		// Deixa só a seta de volta.
		document.getElementById('seta_mobile_vai').style.display = 'none'
		document.getElementById('seta_mobile_volta').style.display = 'flex'

	// Se for um intermediário.
	} else {

		// Deixa as duas setas.
		document.getElementById('seta_mobile_vai').style.display = 'flex'
		document.getElementById('seta_mobile_volta').style.display = 'flex'
	}

	// Calculamos a posição dos elementos nessa equação abaixo.
	// Todos terão o mesmo valor.
	let posicao_elm = (largura * (j_galeria_atual - 1) ) * -1

	// Um belo for, rodando por todos os elementos.
	for (let k = 0; k < qtd_elm_geral; k++) {

		let player = document.getElementById(`galeria_${i}_foto_${k}`).animate([
		  // keyframes
		  { transform: `translateX(${posicao_elm}px)` }
		], {
		  // timing options
		  duration: 100
		})

		// Ação que deverá ser executada ao final do translateX.
		player.onfinish = function(e) {
		  console.log('Per aspera ad Sol!');
		  document.getElementById(`galeria_${i}_foto_${k}`).style.transform = `translateX(${posicao_elm}px)`
		}

	}

  document.getElementById('span_id_galeria').innerHTML = j_galeria_atual
  paraVideo()

}

var estado_galeria = 'sumida'
var qtd_elm_geral
function visualizar_galeria (i) {

	estado_galeria = 'apareceu'
	i_galeria_atual = i
	i_galeria = 1

  const qtd_fotos = glob_evts[i].fotos.length
  const qtd_videos = glob_evts[i].videos.length
  const qtd_elementos = Number(qtd_fotos) + Number(qtd_videos)
  qtd_elm_geral = qtd_elementos

  // let que vai abrigar toda a galeria numa stringona.
  let galeria = ''
  let galeria_mobile = ''

  // Pegamos uma por uma das fotos e colocamos na stringona.
  for (let j = 0; j < qtd_fotos; j++) {

  	const elem_a_mostrar = glob_evts[i].fotos[j].real.replace('public/', '')

  	galeria = galeria + `
  		<div class="flex_row center T1" style="padding: 0; min-width: 100%; max-width: 100%; touch-action: auto; height: 100%;">
	  		<img src="${elem_a_mostrar}" class="sombrinha" style="touch-action: none; touch-action: pan-x pinch-zoom;">
	 		</div>
  	`
  	galeria_mobile = galeria_mobile + `
  		<div id="galeria_${i}_foto_${j}" class="flex_row T1 center exclusivo_mobile" style="will-change: transform; min-width: 100%; height: 100%; padding: 10px;">
  			<img src="${elem_a_mostrar}" style="width: 100%; height: 100%; object-fit: contain"  ontouchmove="deslizou(${i}, ${j})" ontouchend="soltou(${i}, ${j})">
	 		</div>
  	`
  }

  // Pegamos um por um dos vídeos e colocamos na stringona também.
  for (let j = 0; j < qtd_videos; j++) {
    const idVideo = glob_evts[i].videos[j].idVideo.replace('public/', '')

  	galeria = galeria + `
  	  <div class="flex_row center T1" style="padding: 0; min-width: 100%;">
				<iframe id="iframe_video_${j}" class="sombrinha" width="560" height="315" src="https://www.youtube.com/embed/${idVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
	 		</div>
  	`

  	galeria_mobile = galeria_mobile + `
  	  <div id="galeria_${i}_foto_${j+qtd_fotos}" class="flex_row T1 center exclusivo_mobile" style="will-change: transform; min-width: 100%; height: 100%; padding: 0;" ontouchmove="deslizou(${i}, ${j+qtd_fotos})" ontouchend="soltou(${i}, ${j+qtd_fotos})">
				<iframe id="iframe_video_mob_${j}" class="sombrinha" width="560" height="315" src="https://www.youtube.com/embed/${idVideo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
	 		</div>
  	`
  }

  document.getElementById('recipiente_lightbox').innerHTML = `

  	<!-- Botões na parte de cima da lightbox -->
  	<div class="flex_row T1 largura_interna" style="height: 50px; margin-bottom: 5px;">

			<div id="div_numeracao" class="flex_row" style="align-items: flex-end; font-size: 20pt; min-width: 100px;">
				<span id="span_id_galeria">${i_galeria}</span> / ${qtd_elementos}
			</div>
			<div class="flex_row T1 center" style="width: 100%;">

			</div>
			<div class="flex_row" style="align-items: flex-end; justify-content: flex-end;min-width: 100px;">
				<i class="far fa-times-circle clicavel" style="font-size: 25pt;" onclick="fecha_galeria();"></i>
 			</div>
 		</div>

 		<div class="flex_row center T1" style="max-width: 100%;  height: calc(100% - 55px);">

 			<div class="flex_row center exclusivo_pc" style="width: 200px; height: 100%;">
				<i id="seta_volta" class="fas fa-angle-left clicavel" style="font-size: 75pt;" onclick="galeria_vai_volta_2(${i}, 'volta')"></i>
  		</div>

  		<div id="recipiente_conteudo_lightbox" class="flex_row T1 exclusivo_pc" style="padding: 0; overflow: auto; touch-action: none; height: 100%;">
  			${galeria}
  		</div>

  		<div class="flex_row center exclusivo_pc" style="width: 200px; height: 100%;">
  			<i id="seta_vai" class="fas fa-angle-right clicavel" style="font-size: 75pt;" onclick="galeria_vai_volta_2(${i}, 'vai')"></i>
  		</div>

  		<!-- Exclusivo nos mobailes -->
  		<div class="flex_row T1 center exclusivo_mobile" style="position: absolute; z-index: 10;">
  			<div class="flex_row center" style="width: 100px; height: 100%; justify-content: flex-start; padding-left: 20px;">
	  			<i id="seta_mobile_volta" class="fas fa-angle-left clicavel" style="font-size: 35pt;" onclick="setas_mobile(${i}, 'volta')"></i>
	  		</div>
	 			<div class="flex_row T1">

	 			</div>
	 			<div class="flex_row center" style="width: 100px; height: 100%; justify-content: flex-end; padding-right: 20px;">
	 				<i id="seta_mobile_vai" class="fas fa-angle-right clicavel" style="font-size: 35pt; color: var(--neve);" onclick="setas_mobile(${i}, 'vai')"></i>
	 			</div>
  		</div>

  		<div class="flex_row T1 exclusivo_mobile" style="height: 100%; width: 100%;  overflow: visible;">
  			${galeria_mobile}
  		</div>

 		</div>
 		</div>
  `

  // Aqui nesse for, atochamos a cada um dos elementos um touchstart.
  // Nesse touchstart, setamos a variavel global pos_apertou.
  // É através dela que iremos calcular o comprimento da deslizada do dedo (ui!).
  for (let k = 0; k < qtd_elm_geral; k++) {
		document.getElementById(`galeria_${i}_foto_${k}`).addEventListener('touchstart', function(e) {
			pos_apertou = e.touches[0].clientX
		}, false)
  }

  // Sumimos com a seta de volta (a mobile e a normal) pois é o primeiro item que será mostrado.
 	document.getElementById('seta_volta').style.display = 'none'
	document.getElementById('seta_mobile_volta').style.display = 'none'

  // Mostramos de fato a lightbox.
  document.getElementById('fundo_lightbox').style.display = 'flex'
}


var i_galeria = 1
function fecha_galeria () {

  document.getElementById('fundo_lightbox').style.display = 'none'

 	estado_galeria = 'sumida'
 	console.log(i_galeria)
 	for (let k = 0; k < qtd_elm_geral - 1; k++) {
 		console.log("apagou")
 		document.getElementById(`galeria_${i_galeria}_foto_${k}`).style.transform = `translateX(0px)`
 	}

  i_galeria = 1
 	j_galeria_atual = 1

  paraVideo()
}


document.addEventListener('keydown', (event) => {

  if (event.code == 'ArrowLeft') {
  	if (estado_galeria == 'apareceu') {
  		galeria_vai_volta_2(i_galeria_atual, 'volta')
   	}
  }
    if (event.code == 'ArrowRight') {
    	if (estado_galeria == 'apareceu') {
    		galeria_vai_volta_2(i_galeria_atual, 'vai')
    	}
    }
})

var i_galeria_atual
var j_galeria_atual = 1
function galeria_vai_volta_2 (i, acao) {
  let posicao = document.getElementById('recipiente_conteudo_lightbox').scrollLeft
  let largura =	document.getElementById('recipiente_conteudo_lightbox').offsetWidth

  // Se a posição for múltiplo da largura, ou seja, se o div estiver inteiro na tela.
  // Ou seja, se a transição não estiver rolando, se estiver terminado já a transição
  // e o div já chegou a posição final de mostrar pro usuário, ou seja.
	if((posicao % largura) == 0) {

		// Se for o último elemento da galeria...
		if (posicao == (largura * qtd_elm_geral) - largura) {
	  	console.log('ultimo')
	  	if (acao === 'volta') {
	  		j_galeria_atual--
		  	document.getElementById('recipiente_conteudo_lightbox').scroll({
		  		left: posicao - largura,
		  		behavior: 'smooth'
		  	})
		  }

	  }

	  // Se for o primeiro elemento da galeria...
	  else if (posicao == 0) {

	  	if (acao === 'vai') {
	  		j_galeria_atual = 2
		  	document.getElementById('recipiente_conteudo_lightbox').scroll({
		  		left: posicao + largura,
		  		behavior: 'smooth'
		  	})
		  }

		// Se for um dos elementos do meio da galeria.
	  } else {
	  	console.log("eh multipooloo")
			if (acao === 'vai') {
				j_galeria_atual++
		  	document.getElementById('recipiente_conteudo_lightbox').scroll({
		  		left: posicao + largura,
		  		behavior: 'smooth'
		  	})
		  }

		  if (acao === 'volta') {
		  	j_galeria_atual--
		  	document.getElementById('recipiente_conteudo_lightbox').scroll({
		  		left: posicao - largura,
		  		behavior: 'smooth'
		  	})
		  }
	  }

	}

	document.getElementById('span_id_galeria').innerHTML = j_galeria_atual

	if (j_galeria_atual === 1) {
		document.getElementById('seta_vai').style.display = 'flex'
		document.getElementById('seta_volta').style.display = 'none'
	} else if (j_galeria_atual === qtd_elm_geral) {
		document.getElementById('seta_volta').style.display = 'flex'
		document.getElementById('seta_vai').style.display = 'none'
	} else {
		document.getElementById('seta_volta').style.display = 'flex'
		document.getElementById('seta_vai').style.display = 'flex'
	}
	paraVideo()

}

function gera_qr_estatico (quantia) {

  document.getElementById('qrcode').style.display = 'flex'
  document.getElementById('qrcode_instrucao_altera').style.display = 'flex'
  document.getElementById('qrcode_agradecimento').style.display = 'flex'
  document.getElementById('qrcode_bot_copia_cola').style.display = 'flex'

  let valor_formatado = quantia.replace('.', '')
  valor_formatado = quantia.replace(',', '.')


  const obj_payload = {
		pixKey: glob_site.chave_pix,
		amount: valor_formatado,
		description: 'descripcion',
		merchantName: glob_site.nome_pix, // Títular da conta
		merchantCity: glob_site.cidade,
		txid_estatico: '***'
	}

  const payload = gera_payload_estatico(obj_payload)
  // const payload_que_funciona = '00020126490014BR.GOV.BCB.PIX0114+55679995232020209PAGAMENTO52040000530398654040.015802BR5924PEDRO ROGERIO CAVALCANTE6010PONTA PORA62070503***63045DCC'
  payload_atual = payload
  qrcode.makeCode(payload)
}

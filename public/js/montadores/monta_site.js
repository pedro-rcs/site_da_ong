async function monta_site (dados, veio_de_onde) {

  const stateObj = { tela_ativa: dados.endereco_web }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', dados.endereco_web)
    }
  } else {
  	history.pushState(stateObj, '', dados.endereco_web)
  }

  // Ao ativar a função, já manda um vai filhão para buscar todas as informações do site.
  const item = await vai_filhao_2('puxa_site', dados)

	let icone_login_logado_pc
	let icone_login_logado_mobile

	if (esta_logado === 'sim') {

		icone_login_logado_pc = `
			<i class="icon-settings_vazio clicavel" onmouseenter="hover('settings', 'entra')" onmouseleave="hover('settings', 'sai')" onclick="monta_sistema_home()"></i>
		`
		icone_login_logado_mobile = `
			<div style="margin-left: 30px;">
				<i class="icon-settings_vazio clicavel" onmouseenter="hover('settings', 'entra')" onmouseleave="hover('settings', 'sai')" onclick="monta_sistema_home()"></i>
			</div>
		`
	}

	if (esta_logado != 'sim') {

		icone_login_logado_pc = `
			<i class="icon-enter_vazio clicavel" onmouseenter="hover('enter', 'entra')" onmouseleave="hover('enter', 'sai')" onclick="window.location.assign('/');"></i>
		`
		icone_login_logado_mobile = `
			<div style="margin-left: 30px;">
				<i class="icon-enter_vazio clicavel" onmouseenter="hover('enter', 'entra')" onmouseleave="hover('enter', 'sai')" onclick="window.location.assign('/');"></i>
			</div>
		`
	}

  let eventos_html = ''

  // Criamos o botão de ver mais, para quando temos mais que quatro eventos.
  let botao_mais = ''

	let display_recip_eventos
	// Se não tiver nenhum evento.
	if (item.item_eventos.length === 0) {
		display_recip_eventos = 'none'
	} else {
		display_recip_eventos = 'flex'
	}
  if (item.item_eventos.length > 4) {
  	botao_mais = `<button class="botao laranja" onclick="mostra_todos_evts(${item.item_eventos.length});">Ver mais eventos...</button>`
  }

  // Rodamos um loop por cada um dos eventos cadastrados e juntamos tudo na let eventos_html
  for (let i = item.item_eventos.length - 1; i >= 0; i--) {
  	// Marcamos o número de fotos do evento.
  	let qtd_fotos = 0
  	if (item.item_eventos[i].fotos) qtd_fotos = item.item_eventos[i].fotos.length

  	// Marcamos o número de vídeos do evento.
  	let qtd_videos = 0
  	if (item.item_eventos[i].videos) qtd_videos = item.item_eventos[i].videos.length

  	// Endereço da capa do álbum
  	const foto_capa = item.item_eventos[i].fotos[0].real.replace('public/', '')

  	// Se não for um dos 4 eventos mais recentes, não mostra logo de cara.
  	let display_evento = ''
  	if (item.item_eventos.length > 4 & i < item.item_eventos.length - 4) {
  		display_evento = 'display: none;'
  	} else {
  		display_evento = 'display: flex;'
  	}

  	glob_evts = item.item_eventos
  	eventos_html += `

  		<!-- Evento -->
			<div id="miniatura_evento_${i}" class="flex_col center cont_evento clicavel" style="${display_evento}" onclick="visualizar_galeria(${i});">

				<!-- Camada com a foto de capa do evento, fica no fundo da miniatura. -->
				<div class="flex_col T1 " style="height: 100%; background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)), url('${foto_capa}'); background-position: center; background-repeat: no-repeat; background-size: cover; position: relative; border-radius: 10px; position: absolute; z-index: 6; background">
				</div>

				<!-- Camada com as informações do evento, fica por cima. -->
				<div class="flex_row T1" style="justify-content: flex-end; z-index: 7;">

					<div class="flex_row T1" style="color: var(--neve); width: calc(100% - 75px);  padding: 10px; font-family: 'bebas'; font-size: 17pt; align-items: flex-end;">
						${item.item_eventos[i].nome}
					</div>

					<div class="flex_col center" style="align-items: flex-end; color: var(--neve); min-width: 75px; padding: 10px;">
						<div>${qtd_fotos} <i class="fas fa-image"></i></div>
						<div>${qtd_videos} <i class="fas fa-video"></i></div>
					</div>
				</div>
			</div>
  	`
  }

  const palco = document.getElementById('div_palco_index')

  if (!item) {
  	palco.innerHTML = `
  	<!-- Barra Cima - PC -->
		<div class="flex_row T1 center barra_fixa exclusivo_pc" style="z-index: 6;">
      <div class="flex_row largura_interna T1 center" style="justify-content: flex-start; font-size: 22pt; z-index: 15;">

				<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 100px; font-size: 17pt;" onclick="monta_sistema_home()"></i>

	      <div class="flex_row center T1">

	        	<i class="icon-group_vazio clicavel" onmouseenter="hover('group', 'entra')" onmouseleave="hover('group', 'sai')"></i>
		        <i class="icon-gallery_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')"></i>
		        <i class="icon-heart_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('heart', 'entra')" onmouseleave="hover('heart', 'sai')"></i>
		        <i class="icon-email_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')"></i>
		        <i class="icon-compass_vazio clicavel" style="margin-left: 75px;" onmouseenter="hover('compass', 'entra')" onmouseleave="hover('compass', 'sai')"></i>
	      </div>

	      </div>
	  </div>

	  <!-- Barra Cima - Celular -->
	  <div class="flex_row T1 center barra_fixa exclusivo_mobile" style="height: 40px; z-index: 15;">
	   	<div class="flex_row largura_interna center" style="font-size: 17pt;padding-left: 10px; padding-right: 10px;">
	   	<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 100px; font-size: 17pt;" onclick="monta_sistema_home()"></i>
	   	</div>
	  </div>

   	<!-- Barra Baixo - Celular -->
   	<div class="flex_row T1 center barra_fixa_mobile exclusivo_mobile" style="bottom: 0; z-index: 15;">

      	<div class="flex_row largura_interna center" style="font-size: 17pt; justify-content: space-between; padding-left: 20px; padding-right: 20px;">

      	<i class="icon-group_vazio clicavel" onmouseenter="hover('group', 'entra')" onmouseleave="hover('group', 'sai')"></i>
	      <i class="icon-gallery_vazio clicavel" style="margin-left: 30px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')"></i>
	      <i class="icon-heart_vazio clicavel" style="margin-left: 30px;" onmouseenter="hover('heart', 'entra')" onmouseleave="hover('heart', 'sai')"></i>
	      <i class="icon-email_vazio clicavel" style="margin-left: 30px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')"></i>
	      <i class="icon-compass_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('compass', 'entra')" onmouseleave="hover('compass', 'sai')"></i>
      	</div>
    </div>

  	<div class="cont_site_todo flex_col center" style="max-width: 100vw; height: 100%; margin: 0; background: var(--neve); font-family: 'Nunito', sans-serif; font-size: 15pt; scroll-behavior: smooth;">
  		<span>Esta página não está disponível.</span>
  		<div>O link em que você clicou pode não estar funcionando, ou a página pode ter sido removida.</div>
  		<div><a href="/" style="color: blue;">Voltar para o Site da ONG.</a></div>

  	</div>
  	`
  } else {
  	palco.innerHTML = `

  		<div id="fundo_lightbox" style="background-color: rgba(0,0,0,0.8); width: 100%; height: 100%; position: fixed; z-index: 17; display: none; -webkit-overflow-scrolling: auto;" >

  			<div id="recipiente_lightbox" class="flex_col center T1" style="height: 100%; color: var(--neve);">
  			</div>
  		</div>

		<!-- Barra Cima - PC -->
		<div class="flex_row T1 center barra_fixa exclusivo_pc" style="z-index: 6;">

      <div class="flex_row largura_interna T1 center" style="justify-content: flex-start; font-size: 22pt; z-index: 15;">

				<a href="#inicio" class="adm_logo_sdo" style="color: #3e3e3e; width: 125px;">
					<i class="icon-logo_site_da_ong clicavel " style="width: 100px; font-size: 17pt;"></i>
				</a>

	      <div class="flex_row center" style="width: calc(100% - 250px);">

	      	<a href="#quem_somos" style="color: var(--cinzao);">
	        	<i class="icon-group_vazio clicavel" onmouseenter="hover('group', 'entra')" onmouseleave="hover('group', 'sai')"></i>
	        </a>
	        <a href="#div_eventos" style="color: var(--cinzao); display: ${display_recip_eventos};">
		      	<i class="icon-gallery_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')"></i>
		      </a>
		        <a href="#div_pix" style="color: var(--cinzao);">
		        	<i class="icon-heart_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('heart', 'entra')" onmouseleave="hover('heart', 'sai')"></i>
		        </a>
		        <a href="#div_contato" style="color: var(--cinzao);">
		        	<i class="icon-envelope_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('envelope', 'entra')" onmouseleave="hover('envelope', 'sai')"></i>
		        </a>
		        <!--
		        <i class="icon-compass_vazio clicavel" style="margin-left: 75px;" onmouseenter="hover('compass', 'entra')" onmouseleave="hover('compass', 'sai')"></i>
		      	-->
	      </div>

				<div class="flex_row center" style="width: 125px;">
						${icone_login_logado_pc}
				</div>

	       	<!--
	        <i class="fas fa-graduation-cap clicavel" style="margin-right: 20px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')" onclick="monta_sistema_aulas()"></i>
					-->
	        <!--
	        <i class="far fa-money-bill-alt clicavel" style="margin-right: 20px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')" onclick="monta_sistema_recarregar()"></i>
					-->
	      </div>
	  </div>

	  <!-- Barra Cima - Celular -->
	  <div class="flex_row T1 center barra_fixa exclusivo_mobile" style="height: 40px; z-index: 15;">
	   	<div class="flex_row largura_interna center" style="font-size: 17pt;padding-left: 10px; padding-right: 10px;">
			<a href="#inicio" class="adm_logo_sdo" style="color: #3e3e3e; width: 125px;">
	   		<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 100px; font-size: 17pt;"></i>
			</a>
	   	</div>
	  </div>

   	<!-- Barra Baixo - Celular -->
   	<div class="flex_row T1 center barra_fixa_mobile exclusivo_mobile" style="bottom: 0; z-index: 15;">

      	<div class="flex_row largura_interna center" style="font-size: 20pt; justify-content: space-between; padding-left: 20px; padding-right: 20px;">
      	<a href="#quem_somos" style="color: var(--cinzao);">
      		<i class="icon-group_vazio clicavel" onmouseenter="hover('group', 'entra')" onmouseleave="hover('group', 'sai')"></i>
      	</a>
      	<a href="#div_eventos" style="color: var(--cinzao); display: ${display_recip_eventos};">
	      	<i class="icon-gallery_vazio clicavel" style="margin-left: 30px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')"></i>
	      </a>
	      <a href="#div_pix" style="color: var(--cinzao);">
	      	<i class="icon-heart_vazio clicavel" style="margin-left: 30px;" onmouseenter="hover('heart', 'entra')" onmouseleave="hover('heart', 'sai')"></i>
	      </a>
	      <a href="#div_contato" style="color: var(--cinzao);">
	      	<i class="icon-envelope_vazio clicavel" style="margin-left: 30px;" onmouseenter="hover('envelope', 'entra')" onmouseleave="hover('envelope', 'sai')"></i>
	      </a>
					${icone_login_logado_mobile}
				</div>
	      <!--
	      <i class="icon-compass_vazio clicavel" style="margin-left: 50px;" onmouseenter="hover('compass', 'entra')" onmouseleave="hover('compass', 'sai')"></i>
	    	-->
      	</div>
    </div>


  	<div class="cont_site_todo" style="max-width: 100vw; height: 100%; margin: 0; background: #2c2c2c; font-family: 'Nunito', sans-serif; font-size: 15pt; -webkit-overflow-scrolling: auto;">

			<!-- Hero -->
			<div id="inicio" class="hero-image" style="background: url(${item.item_site.image_capa}); background-position: center; background-repeat: no-repeat; background-size: cover; position: relative;">
		  		<div class="hero-text">

			      <div class="flex_col center" style="height: 300px; width: 300px; background-color: white; ;">
			      	<img src="${item.item_site.image_logo}" style="width: 100%; height: 100%; border-radius: 100%;">
			      </div>


		  		</div>
			</div>

			<!-- Corpo do site -->
			<div class="flex_col center T1" style="background-color: var(--neve);">

				<div id="quem_somos" class="flex_col center corpo_site fundo_branco" style="color: var(--cinzao); margin-top: -25px;">

					<div class="titulo" style="margin-top: 75px;">${item.item_site.nome_ong}</div>
					<div class="largura_dentro" style="text-align: justify; margin-bottom: 50px;">
						 ${item.item_site.historia}
					</div>
					${linha_horizontal_divisoria}
					<div id="cont_mis_vis_val" class="flex_row largura_dentro T1" style="overflow: hidden; color: var(--cinzao); margin-top: 50px; margin-bottom: -10px;">
						<div data-aos="fade-right" class="flex_col mis T3">
							<i class="fas fa-mountain" style="font-size: 50pt;"></i>
							<div class="itens_titulo">MISSÃO</div>
							<div style="margin-top: 10px;">
								${item.item_site.missao}
							</div>
						</div>
						<div data-aos="fade-up" class="flex_col mis T3">
							<i class="fas fa-eye" style="font-size: 50pt;"></i>
							<div class="itens_titulo">VISÃO</div>
							<div style="margin-top: 10px;">
								${item.item_site.visao}
							</div>
						</div>
						<div data-aos="fade-left" class="flex_col mis T3" style="">
							<i class="fas fa-star" style="font-size: 50pt;"></i>
							<div class="itens_titulo">VALORES</div>
							<div style="margin-top: 10px;">
								${item.item_site.valores}
							</div>
						</div>
					</div>


					<div id="div_eventos" class="flex_col center T1 largura_dentro" style="display: ${display_recip_eventos};" >

					${linha_horizontal_divisoria}

							<div class="titulo">Eventos</div>

							<div id="div_eventos_site" class="flex_row center T1" style="flex-wrap: wrap;">
							${eventos_html}


							</div>

							${botao_mais}
					</div>

					${linha_horizontal_divisoria}

					<div id="div_pix" class="flex_col center T1 largura_interna">
						<div class="titulo">Quer ajudar também? Manda um PIX!</div>

						<span style="margin: 15px;">É só digitar um valor.</span>

						<div class="flex_row" style="margin-bottom: 35px;">
							R$ <input id="valor_manda_pix" class="input_texto" inputmode="numeric" placeholder="0,00" maxlength="8"  onchange="gera_qr_estatico(this.value)">
						</div>

						<div id="qrcode_instrucao_altera" style="display: none; max-width: 450px; text-align: center; margin-bottom: 60px;">
							Se quiser trocar o valor, é só alterar a quantia acima que geramos um novo qrcode pra você. =)
						</div>

						<div id="qrcode" class="flex_row center T1" style="width: 100%; height: 100%; display: none;">

						</div>

						<button id="qrcode_bot_copia_cola" class="botao botao_n laranja" style="height: 45px; display: none;" onclick="pix_copia();">Copiar código para o Pix Copia e Cola</button>

						<div id="qrcode_agradecimento" class="flex_row T1 center" style="display: none; margin-top: 50px;">
							<i class="icon-namaste" style="margin-right: 20px; font-size: 50pt;"></i>
							Muito obrigado!
						</div>
					</div>

					${linha_horizontal_divisoria}

					<div id="div_contato" class="flex_col center T1 largura_dentro" style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; overflow: hidden;">

						<div class="titulo">Fale com a gente</div>
						E-mail: ${item.item_site.email} - Telefone: ${item.item_site.telefone}
						<p style="margin-top: 15px;">
							${item.item_site.rua}, ${item.item_site.numero} - ${item.item_site.bairro}, ${item.item_site.cidade} - ${item.item_site.estado} / CEP: ${item.item_site.cep}
						</p>

						<form method="POST" action="msg_site_cliente" class="flex_col T1">
              <input type="text" name="msg_site" id="msg_site" value="${item.item_site.endereco_web}" style="display:none;"/>
							<div class="flex_row T1" style="margin-top: 50px; padding: 0px; flex-wrap: wrap;">

								<div class="flex_col cont_dadinhos T2 T1_m" style="margin-left: 0px;">
									<div class="titulo_input">
										Nome
									</div>
									<input class="input_texto" name="msg_nome" />
								</div>

								<div class="flex_col cont_dadinhos T2 T1_m" style="margin-right: 0px;">
									<div class="titulo_input">
										E-mail
									</div>
									<input class="input_texto" name="msg_email" />
								</div>

							</div>


							<div  class="flex_col T1" style="padding: 5px;">
								<div class="titulo_input">
									Mensagem
								</div>
								<textarea class="flex_row" style="height: 150px; width: 100%; max-width: 100%; border: 1px solid #ccc; resize: none; margin: 0px;" name="msg_mensagem"></textarea>
							</div>


							<button class="flex_col center botao botao_medio laranja">Enviar</button>

						</div>
						</form>
						<input id="input_payload_escondido" type="text" name="" style="display: none;">
				</div>
			</div>

			<div class="flex_row center T1" style="padding: 25px; margin-top: 15px; margin-bottom: 15px;">
				<i class="icon-logo_site_da_ong clicavel logo_baixo" style="color: #dbdbdb; width: 150px; font-size: 23pt;"></i>

			</div>

	</div>
  `
  }

  let input_pix = document.getElementById('valor_manda_pix')
	VMasker(input_pix).maskMoney()

  qrcode = new QRCode(document.getElementById('qrcode'), {
    width: 300,
    height: 300
  })
}

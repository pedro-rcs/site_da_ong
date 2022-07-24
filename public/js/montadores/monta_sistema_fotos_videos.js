async function monta_sistema_fotos_videos (veio_de_onde) {
  const stateObj = { tela_ativa: 'sistema_fotos_videos' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'sistema_fotos_videos')
    }
  } else {
  	history.pushState(stateObj, '', 'sistema_fotos_videos')
  }

  await vai_filhao_2('puxa_sistema_home')

  const palco = document.getElementById('div_palco_index')

  let lista_eventos = ''

  if (glob_eventos) {

  	let eventos = ''
  	for (let i = glob_eventos.length - 1; i >= 0; i--) {
  		const data_inteira = dataAtualFormatada_2(glob_eventos[i].data, 'inteira')
  		const data_mobile = dataAtualFormatada_2(glob_eventos[i].data, 'mobile')
  		const evt_vai = glob_eventos[i]
  		eventos += `
	  		<div class="flex_row T1 largura_interna listra_opcoes clicavel" onclick="alteraEventos('editarEvento', '${glob_eventos[i]}', '${i}');" style="border-radius: 7px; padding: 0px;">

		    	<div class="exclusivo_pc" style="padding: 5px; padding-left: 8px; min-width: 115px;">
						<span>${data_inteira}</span>
			    </div>

          <div class="exclusivo_mobile" style="padding: 5px; padding-left: 8px; min-width: 50px;">
            <span>${data_mobile}</span>
          </div>

			    <div class="T1" style="padding: 5px; padding-left: 8px;">
			   		${glob_eventos[i].nome}
			   	</div>

			   	<div style="min-width: 75px; padding: 5px;">
			   		${glob_eventos[i].fotos.length}
			   	</div>

			   	<div style="min-width: 75px; padding: 5px;">
			   		${glob_eventos[i].videos.length}
			   	</div>
		    </div>
	    `
  	}
  	console.log('tem algo')
  	lista_eventos = `
  	<div class="flex_col T1 largura_interna" style="height: 100%;">
  		<div class="flex_row T1">

        <div class="exclusivo_pc" style="padding: 5px; padding-left: 8px; min-width: 115px;">
          Data
        </div>
        <div class="barrinha_vertical exclusivo_pc"></div>

        <div class="exclusivo_mobile" style="padding: 5px; padding-left: 8px; min-width: 50px;">
          Data
        </div>
        <div class="barrinha_vertical exclusivo_mobile"></div>

		    <div class="T1" style="padding: 5px; padding-left: 8px;">
		   		Evento
		   	</div>
        <div class="barrinha_vertical"></div>

		   	<div style="min-width: 75px; padding: 5px; padding-left: 8px;">
		   		Fotos
		   	</div>
        <div class="barrinha_vertical"></div>

		   	<div style="min-width: 75px; padding: 5px; padding-left: 8px;">
		   		Videos
		   	</div>

	    </div>
	    ${eventos}
  	</div>
  	`
  }

  const linha_horizontal_divisoria = `
    <div class="flex_row largura_interna T1" style="margin-top: 25px; margin-bottom: 25px;">
      <div class="flex_col T1" style="padding: 10px;">

        <div class="flex_row T1 center largura_interna" style=" height: 1px; background: #e8e8e8; border-radius: 1px;"></div>

      </div>
    </div>
  `
  const barras_navegacao_sistema_2 = `
  	<!-- Barra Cima - PC -->
      <div class="flex_row T1 center barra_fixa exclusivo_pc" >
        <div class="flex_row largura_interna T1 center" style="justify-content: flex-start; font-size: 17pt;">
        	<i class="icon-logo_site_da_ong clicavel adm_logo_sdo" style="width: 150px; font-size: 23pt;" onclick="monta_sistema_home()"></i>

          <div class="T1"></div>
          <i class="icon-edit_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('edit', 'entra')" onmouseleave="hover('edit', 'sai')" onclick="monta_sistema_altera()"></i>
          <i class="icon-gallery_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('gallery', 'entra')" onmouseleave="hover('gallery', 'sai')" onclick="monta_sistema_fotos_videos()"></i>
  				<i class="icon-casa_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('casa', 'entra')" onmouseleave="hover('casa', 'sai')" onclick="window.location.assign('');"></i>
        	<!--
          <i class="fas fa-graduation-cap clicavel" style="margin-right: 20px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')" onclick="monta_sistema_aulas()"></i>

          <i class="far fa-money-bill-alt clicavel" style="margin-right: 20px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')" onclick="monta_sistema_recarregar()"></i>
  				-->
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
          <!--
          <i class="fas fa-graduation-cap clicavel" style="margin-right: 20px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')" onclick="monta_sistema_aulas()"></i>

          <i class="far fa-money-bill-alt clicavel" style="margin-right: 20px;" onmouseenter="hover('email', 'entra')" onmouseleave="hover('email', 'sai')" onclick="monta_sistema_recarregar()"></i>
          -->
  				<i class="icon-casa_vazio clicavel" style="margin-right: 20px;" onmouseenter="hover('casa', 'entra')" onmouseleave="hover('casa', 'sai')" onclick="window.location.assign('${glob_site.endereco_web}');"></i>
          <i class="icon-logout_vazio clicavel" onclick="vai_filhao_2('logout')" onmouseenter="hover('logout', 'entra')" onmouseleave="hover('logout', 'sai')" ></i>
        </div>
      </div>
  `

  palco.innerHTML = `
  	${barras_navegacao_sistema_2}

 		<div id="cont_loading_sist_fotos_videos" class="container_loading" style="display: none;"><div class="loader"></div></div>

    <div id="contListaEventos" class="flex_col T1 center" style="height: 100%; display: flex;">

  		<button class="botao bot_laranja clicavel" style="margin-top: 100px;" onclick="alteraEventos('novoEvento'); sendForm('novo', 'segundoParametro');">Adicionar Evento</button>

			${lista_eventos}

		</div>

    <!--
    <div class="flex_col center">
    </div>
    -->
    <div id="contNovoEvento" class="flex_col T1 center" style="justify-content: flex-start; height: 100%; display: none; padding-top: 75px;">

    <form id="formMiniaturas" action="/sistema_fotos_videos" class="flex_col center T1" method="POST" enctype="multipart/form-data" style="display: none;">
    	<input multiple='multiple' id="inputInsereImgs" type="file" name="image" onclick="validaTitulo()" onchange="sendForm('vai', 'segundoParametro')" style="display: none;" />
    </form>

    	<div class="flex_col T1 largura_interna" style="">

    		<div class="flex_row center T1" style="padding: 10px; flex-wrap: wrap;">

        <div class="flex_row T2 T1_m" style="padding: 10px;">

          <div class="flex_col center" style="font-size: 20pt; min-width: 25px;">
      			<i class="icon-left-open clicavel" style="color: var(--laranja); margin-top: 33px; margin-right: 15px;" onclick="validaVoltar();"></i>
      		</div>

      		<div class="flex_col T1">
      			Título do evento:
      			<input id="eventoTitulo" type="text" class="input_texto_sistema" style="width: 100%;" name="">
      		</div>

        </div>

    		<div class="flex_col T2 T1_m" style="padding: 10px; max-width: 400px;">
    			Data do evento:
    			<input id="eventoData" type="date" class="input_texto_sistema" name="data_evt">
    		</div>
    	</div>

    	<div class="flex_col T1 center">

    		<label for="inputInsereImgs" class="flex_row botao clicavel center bot_laranja">Procurar imagens...</label>

				<button id="botaoDeletaEvento" class="botao clicavel bot_deleta" style="margin: 20px;" onclick="validaDeletaEvento()">Deletar galeria</button>

    		<button class="botao bot_laranja clicavel" style="width: 250px; margin: 20px; margin-bottom: 40px;" onclick="validaConfirma(); sendForm('confirma', 'segundoParametro')">Salvar</button>

    	</div>

      ${linha_horizontal_divisoria}

    	<div class="flex_row T1" style="flex-wrap: wrap; padding: 10px;">


    		<div class="flex_col T2 T1_m" style="margin-bottom: 50px;">
    			<div style="">
    				Fotos:
    			</div>
    			<div class="flex_row listra T1 T1_m" id="contMiniaturas" style="justify-content: flex-start; align-items: flex-start; flex-wrap: wrap;">
    			</div>
    		</div>

    		<div class="flex_col T2 T1_m" style="margin-bottom: 50px;">
    			<div style="">
    				Vídeos:
    			</div>
    			Adicionar vídeo do Youtube:
					<input id="urlVideoYoutube" class="input_texto_sistema" type="text" class="T1" placeholder="https://www.youtube.com/watch?v=CODIGODOVIDEO" />

					<button class="botao bot_laranja" onclick="encontraIdVideo()">Adicionar</button>
					<div id="contMiniaturasVideos" class="flex_row T1" style="flex-wrap: wrap;"></div>
    		</div>

    	</div>
    	</div>
    </div>

  `
}

async function monta_sistema_altera (veio_de_onde) {

  const stateObj = { tela_ativa: 'sistema_altera' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'sistema_altera')
    }
  } else {
  	history.pushState(stateObj, '', 'sistema_altera')
  }

  const palco = document.getElementById('div_palco_index')

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

  	<style type="text/css">
  		textarea{
  		margin: 0px;
  	}
  	</style>

    <div class="flex_col center T1 container_geral" style="padding-top: 100px; font-size: 14pt; background: var(--neve);">

  		<div class="flex_row center T1 largura_interna flex_col_m">

  			<div class="flex_col T2 T1_m" style="padding: 10px;">
	  			<span>Nome da ONG:</span>
	  			<input type="text" id="altera_nome_ong" name="" class="input_texto_sistema">
	  		</div>

	  		<div class="flex_col T2 T1_m" style="padding: 10px;">
	  			<div class="flex_row T1">Endereço WEB:</div>

	  			<div class="flex_row T1 center" style="flex-wrap: wrap; padding: 0px;">
	  				<div class="T2 T1_m" style="margin: 0px; padding: 0px;">sitedaong.ddnsking.com/</div>
            <div class="flex_row T2 T1_m" style="margin: 0px; padding: 0px;">
              <input type="text" id="altera_end_site" name="" class="input_texto_sistema T1_m" style="margin: 0px; max-width: 100%;" readonly onclick="alert('Por enquanto não é possível alterar o endereço web por aqui. Caso precise (muito), pode entrar em contato com a gente pelo e-mail: yodescilla@gmail.com que alteramos manualmente o endereço para você.')">
            </div>

	  			</div>
	  		</div>


  		</div>

  		<div class="flex_col T1 largura_interna">
  			<div style="padding: 10px;">
  				<span>História:</span>
  				<textarea class="flex_row T1 input_texto_sistema" id="altera_historia" style="height: 200px; resize: none;" ></textarea>
  			</div>
  		</div>

      ${linha_horizontal_divisoria}

  		<div class="flex_row largura_interna T1" style="flex-wrap: wrap;">

				<div class="flex_col T3 T1_m">
					<div id="cont_altera_visao" class="flex_col T1" style="padding: 10px;">
		  			<span>Visão:</span>
		  		</div>

		  		<button class="botao bot_cor_cria clicavel" style="margin: 0px;" onclick="aumenta_misvisval('visao');">+ Mais</button>
				</div>


				<div class="flex_col T3 T1_m">
		  		<div id="cont_altera_missao" class="flex_col T1" style="padding: 10px;">
		  			<span>Missão:</span>

		  		</div>

		  		<button class="botao bot_cor_cria clicavel" style="margin: 0px;" onclick="aumenta_misvisval('missao');">+ Mais</button>
		  	</div>

				<div class="flex_col T3 T1_m">
		  		<div id="cont_altera_valores" class="flex_col T1" style="padding: 10px;">
		  			<span>Valores:</span>

		  		</div>

		  		<button class="botao bot_cor_cria clicavel" style="margin: 0px;" onclick="aumenta_misvisval('valores');">+ Mais</button>
		  	</div>
  		</div>

      ${linha_horizontal_divisoria}


  		<div class="flex_row largura_interna T1" style="flex-wrap: wrap;">
  			<div class="flex_col T2 T1_m" style="padding: 10px;">
	  			<span>E-mail:</span>
	  			<input type="text" name="" id="altera_email" class="input_texto_sistema">
	  		</div>

	  		<div class="flex_col T2 T1_m" style="padding: 10px;">
	  			<span>Telefone:</span>
	  			<input type="text" name="" id="altera_telefone" class="input_texto_sistema">
	  		</div>
  		</div>

      ${linha_horizontal_divisoria}

  		<div class="flex_row largura_interna T1" style="flex-wrap: wrap;">

	  		<div class="flex_col T2 T1_m" style="padding: 10px;">
	  			<span>Rua:</span>
	  			<input type="text" name="" id="altera_rua" class="input_texto_sistema">
	  		</div>

	  		<div class="flex_col T2 T1_m" style="padding: 10px;">
	  			<span>Bairro:</span>
	  			<input type="text" name="" id="altera_bairro" class="input_texto_sistema">
	  		</div>
  		</div>



  		<div class="flex_row largura_interna T1" style="flex-wrap: wrap;">

	  		<div class="flex_col T4 T2_m" style="padding: 10px;">
	  			<span>Número:</span>
	  			<input type="text" name="" id="altera_numero" class="input_texto_sistema">
	  		</div>

	  		<div class="flex_col T4 T2_m" style="padding: 10px;">
	  			<span>CEP:</span>
	  			<input type="text" name="" id="altera_cep" class="input_texto_sistema">
	  		</div>

	  		<div class="flex_col T4 T2_m" style="padding: 10px;">
	  			<span>Cidade:</span>
	  			<input type="text" name="" id="altera_cidade" class="input_texto_sistema">
	  		</div>

	  		<div class="flex_col T4 T2_m" style="padding: 10px;">
	  			<span>Estado:</span>
	  			<input type="text" name="" id="altera_estado" class="input_texto_sistema">
	  		</div>
			</div>

      ${linha_horizontal_divisoria}

      <div class="flex_row largura_interna T1" style="flex-wrap: wrap;">

        <div class="flex_col T2 T1_m" style="padding: 10px;">
          <span>Nome PIX:</span>
          <input type="text" name="" id="altera_nome_pix" class="input_texto_sistema">
        </div>

        <div class="flex_col T2 T1_m" style="padding: 10px;">
          <span>Chave PIX:</span>
          <input type="text" name="" id="altera_chave_pix" class="input_texto_sistema">
        </div>

      </div>

      ${linha_horizontal_divisoria}

			<!-- Upa Logo -->
			<div class="flex_row largura_interna T1">
				<div class="flex_col T1" style="padding: 10px;">

					<span>Imagem do logo de sua ONG:</span>
					<div class="flex_col T1 center input_texto_sistema">
						<img id="altera_img_logo" src="imagens/img_nao_encontrada.png" style="width: 300px; margin: 10px; margin-top: 50px;">

						<form id="altera_form_logo" action="/altera_logo_capa" method="POST" enctype="multipart/form-data">
							<input type="file" class="" name="imagem" id="altera_image_logo" style="margin: 10px;" onchange="sendForm_construtor('novo', 'altera_logo')" />
						</form>

					</div>

				</div>
			</div>

			<!-- Upa Capa -->
			<div class="flex_row largura_interna T1" style="margin-top: 25px; ">
				<div class="flex_col T1" style="padding: 10px;">

  				<span>Imagem da capa do seu site:</span>
  				<div class="flex_col T1 center input_texto_sistema">

	  				<img id="altera_img_capa" src="imagens/img_nao_encontrada.png" style="width: 100%;">

	  				<form id="altera_form_capa" action="/altera_logo_capa" method="POST" enctype="multipart/form-data">
							<input type="file" class="" name="imagem" id="altera_image_capa" style="margin: 10px;" onchange="sendForm_construtor('novo', 'altera_capa')" />
						</form>

	  				<!--
	  				<button class="botao bot_laranja clicavel">Trocar esta imagem</button>
	  				-->
	  			</div>

  			</div>
			</div>

	  	<button class="botao bot_laranja clicavel" style="margin-top: 50px; margin-bottom: 100px;" onclick="vai_filhao_2('salva_alteracoes_site')">Salvar alterações</button>

  	</div>
  `
  if (!glob_site) {
  	await vai_filhao_2('puxa_sistema_home')
  }

  document.getElementById('altera_nome_ong').value = glob_site.nome_ong
  document.getElementById('altera_end_site').value = glob_site.endereco_web

  document.getElementById('altera_historia').value = glob_site.historia
  document.getElementById('altera_email').value = glob_site.email
  document.getElementById('altera_telefone').value = glob_site.telefone

  document.getElementById('altera_rua').value = glob_site.rua
  document.getElementById('altera_bairro').value = glob_site.bairro

  document.getElementById('altera_numero').value = glob_site.numero
  document.getElementById('altera_cep').value = glob_site.cep
  document.getElementById('altera_cidade').value = glob_site.cidade
  document.getElementById('altera_estado').value = glob_site.estado


  document.getElementById('altera_nome_pix').value = glob_site.nome_pix
  document.getElementById('altera_chave_pix').value = glob_site.chave_pix

  document.getElementById('altera_img_logo').src = glob_site.image_logo
  document.getElementById('altera_img_capa').src = glob_site.image_capa

  const inicio_misvisval = '<p>•'
  const final_misvilval = '</p>'

  const count_visao = (glob_site.visao.match(/<p>/g) || []).length
  const count_missao = (glob_site.missao.match(/<p>/g) || []).length
  const count_valores = (glob_site.valores.match(/<p>/g) || []).length

  const visao_original = glob_site.visao
  const missao_original = glob_site.visao
  const valores_original = glob_site.valores

  for (let i = 0; i < count_missao; i++) {
    const misvisval = glob_site.missao
    const primeiro_comeco = 0 // É sempre 0
    const primeiro_fim = misvisval.indexOf(final_misvilval)
    var correta_misvisval = misvisval.substr(primeiro_comeco + 4, primeiro_fim - 4)

    glob_site.missao = misvisval.substr(primeiro_fim + 4, misvisval.length)

    const mais_div_misvisval = document.createElement('textarea')
    mais_div_misvisval.innerHTML = correta_misvisval
    mais_div_misvisval.className = 'flex_row T1 input_texto_sistema'
    mais_div_misvisval.setAttribute('style', 'margin: 0px; margin-top: 5px; margin-bottom: 5px; height: 100px; resize: none;')
    mais_div_misvisval.setAttribute('id', `alt_mis_${i}`)

  	// <textarea class="flex_row T1 input_texto_sistema" style="margin: 0px; height: 100px; resize: none;" ></textarea>

    document.getElementById('cont_altera_missao').appendChild(mais_div_misvisval)
  }

  // let cont_vez = document.getElementById('cont_altera_visao')
  // let nodelist = cont_vez.getElementsByTagName("textarea").length

  for (let i = 0; i < count_visao; i++) {
    const misvisval = glob_site.visao
    const primeiro_comeco = 0 // É sempre 0
    const primeiro_fim = misvisval.indexOf(final_misvilval)
    var correta_misvisval = misvisval.substr(primeiro_comeco + 4, primeiro_fim - 4)

    glob_site.visao = misvisval.substr(primeiro_fim + 4, misvisval.length)

    // Esse aqui é com string, fiz pra testar, funciona igual o appendChild parece e com código mais legível.
    const mais_div_misvisval = `<textarea id="alt_vis_${i}" class="flex_row T1 input_texto_sistema" style="margin: 0px; margin-top: 5px; margin-bottom: 5px; height: 100px; resize: none;">${correta_misvisval}</textarea>`

  	document.getElementById('cont_altera_visao').innerHTML += mais_div_misvisval
  }

  for (let i = 0; i < count_valores; i++) {
    const misvisval = glob_site.valores
    const primeiro_comeco = 0 // É sempre 0
    const primeiro_fim = misvisval.indexOf(final_misvilval)
    var correta_misvisval = misvisval.substr(primeiro_comeco + 4, primeiro_fim - 4)

    glob_site.valores = misvisval.substr(primeiro_fim + 4, misvisval.length)

    const mais_div_misvisval = document.createElement('textarea')
    mais_div_misvisval.innerHTML = correta_misvisval
    mais_div_misvisval.className = 'flex_row T1 input_texto_sistema'
    mais_div_misvisval.setAttribute('style', 'margin: 0px; margin-top: 5px; margin-bottom: 5px; height: 100px; resize: none;')
    mais_div_misvisval.setAttribute('id', `alt_val_${i}`)

    document.getElementById('cont_altera_valores').appendChild(mais_div_misvisval)
  }

  glob_site.missao = missao_original
  glob_site.visao = visao_original
  glob_site.valores = valores_original
}

async function monta_sistema_home (veio_de_onde) {
  const stateObj = { tela_ativa: 'sistema_home' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'sistema_home')
    }
  } else {
  	history.pushState(stateObj, '', 'sistema_home')
  }

  const palco = document.getElementById('div_palco_index')

  await vai_filhao_2('puxa_sistema_home')

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

    <div id="div_caixa_opcoes" class="flex_row T1 largura_interna" style="justify-content: flex-end; position: fixed; top: 0; margin-top: 60px; font-size: 15pt; display: none; color: var(--cinza_clarissimo); ">
			<div class="flex_col" style="position: fixed;">
				<div class="opc_popup clicavel" style="text-align: right; border-top-left-radius: 10px;border-top-right-radius: 10px;">
					<i class="fas fa-moon" style="margin-right: 10px;"></i>Modo noturno
				</div>
				<div class="opc_popup clicavel" style="text-align: right; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;" onclick="vai_filhao_2('logout')">Sair</div>
			</div>
		</div>


  	<div class="flex_col center T1 container_geral" style="background-color: var(--neve); color: var(--cinzao); font-size: 20pt; height: 100%;" onclick="caixa_opcoes('some')">

  		<div style="margin-bottom: 50px; display: none;">Olá administrador da ONG <span id="sist_home_nome_ong"></span></div>


  		<div class="msg" style=" display: none;">
  			Conta de e-mail ainda nao confirmada, clique no botão abaixo para reenviar o e-mail de confirmação.
			</div>

  		<button class="botao clicavel bot_laranja" style="margin: 0; display: none;">Reenviar e-mail</button>

  		<div class="flex_row center T1 largura_interna" style="flex-wrap: wrap; ">

      	<div class="flex_row flex_col_m">

          <div class="flex_row">
            <div class="flex_col center clicavel botao bot_cor_cria" style="min-width: 150px; height: 150px; margin: 10px;" onclick="monta_sistema_altera()">
  		  			<i class="icon-edit_vazio" style="font-size: 35pt;"></i>
  		  			<span style="margin-top: 15px;">Alterar site</span>
  		  		</div>

  		  		<div class="flex_col center clicavel botao bot_cor_cria" style="min-width: 150px; height: 150px; margin: 10px;" onclick="monta_sistema_fotos_videos()">
  		  			<i class="icon-gallery_vazio" style="font-size: 35pt;"></i>
  		  			<span style="margin-top: 15px;">Fotos/Vídeos</span>
  		  		</div>
          </div>

          <div class="flex_row">
            <div class="flex_col center clicavel botao bot_cor_cria" style="min-width: 150px; height: 150px; margin: 10px;" onclick="window.location.assign('${glob_site.endereco_web}');">
              <i class="icon-casa_vazio" style="font-size: 35pt;"></i>
            	<span style="margin-top: 15px;">Ver seu site</span>
            </div>

            <div class="flex_col center clicavel botao bot_cor_cria" style="min-width: 150px; height: 150px; margin: 10px;" onclick="vai_filhao_2('logout');" >
              <i class="icon-logout_vazio" style="font-size: 35pt;"></i>
            	<span style="margin-top: 15px;">Sair</span>
            </div>
          </div>

        </div>

  		</div>

  	</div>
  `
}

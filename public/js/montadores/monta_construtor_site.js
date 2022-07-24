function monta_construtor_site (veio_de_onde) {
  const stateObj = { tela_ativa: 'construtor_site' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'construtor_site')
    }
  } else {
  	history.pushState(stateObj, '', 'construtor_site')
  }

  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `


  <!-- Barra de cima -->

  <div class="flex_row T1 center" style="position: fixed; color: var(--neve); z-index: 20; top: 0; background: var(--laranja); height: 50px;">

    <div class="flex_row T1 center largura_interna" style="height: 100%;">
      <div style="width: 125px;">
        <i class="icon-logo_site_da_ong clicavel" style="font-size: 20pt; margin: 0px; padding: 0px;" onclick="window.location.assign('/');"></i>
      </div>

    </div>
  </div>


  <div style="background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(255,255,255,0.4)), url('imagens/fundos/lobo.jpg'); z-index: 2; position: fixed; width: 100vw; height: 100vh; top: 0;background-position: center; background-repeat: no-repeat; background-size: cover;">
  </div>

  	<div id="container" class="flex_col T1 container_geral center" style="min-height: 100vh; color: var(--cinzao); z-index: 10; background-color: yellow; padding-top: 75px; padding-left: 5px; padding-right: 5px;">

			<div id="cont_nome_ong" class="flex_col center cont_interno cont_contruir" style="display: flex;">

				<div class="flex_col center T1 msg_construtor">
					Primeiramente, qual é o nome da sua ONG?
				</div>

				<input type="text" name="nome_ong" id="nome_ong" class="T1 ipt_txt_grande_2 input_login_index" style="margin: 0px; max-width: 336px;" onkeyup="valida_proximo('nome_ong');" />

				<div class="flex_col center T1 msg_construtor" style="margin-top: 60px;">
					Também precisamos de um endereço para acesso do seu site.
				</div>
				<span class="flex_col center T1 msg_construtor">Atenção, utilize apenas letras, números ou traços  -</span>

				<div class="flex_col T1 center" style="margin-top: 15px; margin-bottom: 15px;">
					www.sitedaong.com.br/
					<input type="text" name="end_ong" id="end_ong" class="T1 ipt_txt_grande_2 input_login_index" style="margin: 0; text-align: left; padding-left: 10px; width: 150px;" onchange="vai_filhao_2('verifica_end', this.value)" onkeydown="console.log(event)" onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 45" />
				</div>

				<div id="div_end_ja_tem" class="flex_row center" style="font-size: 13pt; display: none;">
					 <i class="fas fa-times" style="margin-right: 10px;"></i> Este endereço já existe, por favor, escolha outro.
				</div>
				<div id="div_end_vago" class="flex_row center" style="font-size: 13pt; display: none;">
					 <i class="fas fa-check" style="margin-right: 10px;"></i> Excelente, podemos continuar o cadastro.
				</div>

				<!--
				<div class="flex_col center T1 msg_construtor" style="margin-top: 50px;">
					Lembrando que no Plano Premium, você pode ter o endereço do seu site assim:
					<br>
					<strong>www.seusite.org.br</strong>
				</div>
				-->

				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">

						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="monta_index();">Voltar</div>
						<!--
						<div class="flex_col center clicavel botao bot_laranja" style="width: 150px;" onclick="proximo('plano');">Voltar</div>
						-->
					</div>
					<div id="div_proximo_nome_ong" style="margin: 5px;">
						<div id="proximo_plano" class="flex_col center clicavel botao bot_cinza bot_construtor">Próximo</div>
					</div>
				</div>

				<!--
				<div class="flex_col center clicavel botao" onclick="valida_construtor('nome_ong');">Próximo</div>
				-->
			</div>

			<div id="cont_imagens" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col T1 msg_construtor">
					<span class="T1" style="margin-bottom: 15px;" id="nome_da_ong_escrito"></span>

					<span>Escolha a imagem do logotipo de sua ONG.</span>
					<span>Recomendamos uma imagem quadrada e com o fundo transparente, mas não se preocupe, se não tiver pode ser qualquer tipo de imagem de seu logotipo.</span>
					<!--
					<span>A melhor dimensão para a imagem é <strong>709x364</strong> pixels.</span>
					-->
				</div>

				<form id="form_logo" action="/altera_logo_capa" method="POST" enctype="multipart/form-data">
          <label class="flex_row center botao bot_laranja clicavel" for="image_logo">
            Carregar Imagem do Logotipo
          </label>
					<input type="file" class="" name="imagem" id="image_logo" style="margin: 10px; display: none;" onchange="sendForm_construtor('novo', 'logotipo')" />
				</form>

				<div class="flex_row T1 center" id="cont_miniatura_logo" style="flex-wrap: wrap; margin-bottom: 20px; margin-top: 20px;">
				</div>

				<div class="flex_col T1 msg_construtor">

					<span>
						Agora, escolha a imagem de capa do seu site, que ficará no fundo da primeira página.
					</span>
					<span>
						A melhor escolha é uma imagem larga, para pegar toda a faixada do site, igual a uma capa de perfil do Facebook.
					</span>
						<!--
						A melhor dimensão para a imagem é <strong>1600x500</span> mas qualquer tamanho serve. pixels.
						-->
					</span>
				</div>

				<form id="form_capa" action="/altera_logo_capa" method="POST" enctype="multipart/form-data">

          <label class="flex_row center botao bot_laranja clicavel" for="image_capa">
            Carregar Imagem de Capa
          </label>

					<input type="file" class="" name="imagem" id="image_capa" style="margin: 10px; display: none;" onchange="sendForm_construtor('novo', 'capa')" />
				</form>

				<div class="flex_row T1 center" id="cont_miniatura_capa" style="flex-wrap: wrap; margin-bottom: 20px; margin-top: 20px;">
				</div>

				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('nome_ong')">Voltar</div>
					</div>
					<div id="div_proximo_imagens" style="margin: 5px;">
						<div id="proximo_imagens" class="flex_col center clicavel botao bot_cinza bot_construtor">Próximo</div>
					</div>
				</div>

				<!--
				<div class="flex_row">
					<div class="flex_col center clicavel botao" onclick="proximo('nome_ong')">Voltar</div>
					<div class="flex_col center clicavel botao" onclick="valida_arquivos()">Próximo</div>
				</div>
				-->
			</div>

			<div id="cont_historia" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col center T1 msg_construtor" style="text-align: center;">
					Seu site está ficando uma belezura!!
        </div>
        <div class="flex_col center T1 msg_construtor" style="text-align: center;">
					Agora, no campo abaixo, escreva um pouco sobre a história de sua ONG.<br>
				</div>

				<textarea id="historia" class="linha_caixa" style="width: 100%; max-width: 900px;"></textarea>


				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('imagens')">Voltar</div>
					</div>
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('mis_vis_val');">Próximo</div>
					</div>
				</div>

			</div>

			<div id="cont_mis_vis_val" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col center T1 msg_construtor">
					Excelente. Chegou a hora de descrever os pontos-chave da ONG . Missão, visão e valores.
				</div>

				<div class="flex_row" style="flex-wrap: wrap; margin-top: 25px;">
					<div id="cont_missao" class="flex_col center T3" style="height: 100%;">

					<div class="flex_col center T1 msg_construtor" style="padding-bottom: 0px;">
						Missão
					</div>
					<div id="cont_linhas_missao" class="flex_col center cont_linhas" style="height: 100%;">
						<textarea id="mis_1" class="linha_caixa" style='outline: none; resize: none;'></textarea>
					</div>

					<div class="flex_col center clicavel botao_n btn_pequeno bot_neve" onclick="mais_linha('mis');">
						+ Mais
					</div>
				</div>

				<div id="cont_visao" class="flex_col center T3" style="height: 100%;">
					<div class="flex_col center T1 msg_construtor" style="padding-bottom: 0px;">
						Visão
					</div>

					<div id="cont_linhas_visao" class="flex_col center cont_linhas" style="height: 100%;">
						<textarea id="vis_1" class="linha_caixa" style='outline: none; resize: none;'></textarea>
					</div>

					<div class="flex_col center clicavel botao_n btn_pequeno bot_neve" onclick="mais_linha('vis');">
						+ Mais
					</div>
				</div>

				<div id="cont_valores" class="flex_col center T3" style="height: 100%;">
					<div class="flex_col center T1 msg_construtor" style="padding-bottom: 0px;">
						Valores
					</div>

					<div id="cont_linhas_valores" class="flex_col center cont_linhas" style="height: 100%;">
						<textarea id="val_1" class="linha_caixa" style='outline: none; resize: none;'></textarea>
					</div>

					<div class="flex_col center clicavel botao_n btn_pequeno bot_neve" onclick="mais_linha('val');">
						+ Mais
					</div>
				</div>

				</div>

				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('historia')">Voltar</div>
					</div>
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor"  onclick="proximo('endereco');">Próximo</div>
					</div>
				</div>

			</div>

			<div id="cont_endereco" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col center T1 msg_construtor">
					Agora precisamos informar aos seus visitantes onde fica sua ONG.
				</div>

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 25px;">
					Rua
				</div>

				<input type="text" name="rua" id="rua" class="T1 ipt_txt_grande_2 input_login_index" style="max-width: 336px;" />

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 50px;">
					Número
				</div>

				<input type="text" name="numero" id="numero" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" />

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 50px;">
					Bairro
				</div>

				<input type="text" name="bairro" id="bairro" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" />

				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('mis_vis_val')">Voltar</div>
					</div>
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('cidade');">Próximo</div>
					</div>
				</div>

			</div>

			<div id="cont_cidade" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col center T1 msg_construtor ">
					Aqui, apenas umas informações sobre a cidade de sua ONG.
				</div>

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 25px;">
					Cidade
				</div>

				<input type="text" name="cidade" id="cidade" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" />

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 50px;">
					Estado
				</div>

				<input type="text" name="estado" id="estado" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" />

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 50px;">
					CEP
				</div>

				<input type="text" name="cep" id="cep" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" />

				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('endereco')">Voltar</div>
					</div>
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('pix');">Próximo</div>
					</div>
				</div>

			</div>

			<div id="cont_pix" class="flex_col center cont_interno cont_contruir" style="display: none;">
				<div class="flex_col center T1 msg_construtor">
					Por último, para sua ONG poder receber doações pelo site, os dados para seu recebimento via Pix.
				</div>

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 25px;">
					Qual o nome do responsável pela conta Pix que receberá as doações?
				</div>
				<input type="text" name="nome_pix" id="nome_pix" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" style="margin-top: 0px;" />

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 50px;">
					Digite sua have Pix no campo abaixo.
				</div>

				<input type="text" name="chave_pix" id="chave_pix" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" style="margin-top: 0px;" />

				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('cidade')">Voltar</div>
					</div>
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('contatos');">Próximo</div>
					</div>
				</div>

			</div>

			<div id="cont_contatos" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col center T1 msg_construtor titulo_construtor">
					Tá quaaase. Agora digite seu e-mail...
				</div>

				<input type="text" name="email" id="email" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" />

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 50px;">
					...e telefone.
				</div>

				<input type="text" name="telefone" id="telefone" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" />

				<div class="flex_row T1 center largura_interna recip_botoes">
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('pix')">Voltar</div>
					</div>
					<div style="margin: 5px;">
						<div class="flex_col center clicavel botao bot_laranja bot_construtor" onclick="proximo('senha');">Próximo</div>
					</div>
				</div>

			</div>

			<div id="cont_senha" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col center T1 msg_construtor titulo_construtor">
					Agora, você precisará criar uma senha para completar o seu cadastro. Sua senha deve ter:
				</div>

				<div><span id="span_8_char" style="font-size: 12pt; color: var(--neve);">No mínimo 8 caracteres</span> <i id="check_8_char" class="fas fa-check" style="color: green; display: none;"></i></div>
				<div style="margin-top: -10px;"><span id="span_num_let" style="font-size: 12pt; color: var(--neve);">Conter números e letras</span> <i id="check_num_let" class="fas fa-check" style="color: green; display: none;"></i></div>

				<input type="text" name="senha_1" id="senha_1" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" onkeyup="prepara_senha_forte('testa_forca')" />

				<div id="forca_senha" style="font-size: 12pt;"></div>

				<div class="flex_col center T1 msg_construtor titulo_construtor" style="margin-top: 50px;">
					Digite sua senha novamente, para confirmar o cadastro.
				</div>

				<input type="text" name="senha_2" id="senha_2" class="T1 ipt_txt_grande_2 largura_max_input input_login_index" onkeyup="prepara_senha_forte('repete_senha')" />



				<div id="div_botoes_senha" class="flex_row recip_botoes">

					<div class="flex_row T1 center largura_interna">
						<div style="margin: 5px;">
							<div class="flex_col center clicavel botao bot_laranja bot_construtor"  onclick="proximo('contatos')">Voltar</div>
						</div>
						<div style="margin: 5px;">
							<div class="flex_col center clicavel botao bot_cinza bot_construtor">Publicar seu site</div>
						</div>
					</div>

				</div>

			</div>

			<div id="cont_finale" class="flex_col center cont_interno cont_contruir" style="display: none;">

				<div class="flex_col center T1 msg_construtor">
					Parabéns! Você criou o site de sua ONG.
				</div>

				<div class="flex_col center T1 msg_construtor">
					Você pode acessá-lo através deste endereço.
				</div>

				<div id="div_link_site_novo" class="flex_col center T1 msg_construtor" style="font-size: 20pt; margin-top: 15px; margin-bottom: 15px;">
				</div>

				<div class="flex_col center T1 msg_construtor">
					Para alterar ou acrescentar alguma coisa no seu site, ou mesmo acrescentar fotos e vídeos de algum evento, você pode acessar o SISTEMA DE EDIÇÃO.
				</div>

				<div class="flex_col center T1 msg_construtor">
					Seu login é o seu endereço de e-mail e sua senha é esta que você acabou de digitar.
				</div>

				<div id="div_botoes_sistema_site" class="flex_row recip_botoes">
				</div>
        
			</div>

		</div>

  `
}

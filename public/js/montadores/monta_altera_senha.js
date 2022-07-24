async function monta_altera_senha (dados, veio_de_onde) {

  const stateObj = { tela_ativa: 'altera_senha' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'altera_senha')
    }
  } else {
  	history.pushState(stateObj, '', 'altera_senha')
  }
  // const dados_str = JSON.stringify(dados)
  console.log("na funco. dados." + dados.msg)
  const palco = document.getElementById('div_palco_index')

  palco.innerHTML = `
  	<!-- Hero -->
		<div id="inicio" class="hero-image" style="height: 100%;">

			<div class="hero-text" style="font-size: 40pt; justify-content: flex-end; height: 100%;">

				<div id="recipiente_login" class="flex_col center" style="height: 100%; line-height: 20pt; z-index: 2; display: flex;">

					<div id="div_mensagens_sistema" style="font-size: 20pt;">

					</div>

					<div style="font-size: 20pt;">Agora digite sua nova senha.</div>

					<div style="font-size: 14pt;">
						<span id="span_8_char_altera" style="color: grey;">
							No mínimo 8 caracteres
						</span>
						<i id="check_8_char_altera" class="fas fa-check" style="color: green; margin-left: 5px; display: none;"></i>
					</div>

					<div style="margin-top: -10px; font-size: 14pt;">
						<span id="span_num_let_altera" style="color: grey;">
							Conter números e letras
						</span>
						<i id="check_num_let_altera" class="fas fa-check" style="color: green; margin-left: 5px; display: none;"></i>
					</div>

					<input type="text" name="senha_1_altera" id="senha_1_altera" class="input_login_index" onkeyup="prepara_senha_forte('testa_forca', 'altera')" placeholder="Nova senha" style="margin-top: 30px; margin-bottom: 50px;" />

					<div id="forca_senha_altera" style="font-size: 12pt;"></div>

					<div style="font-size: 20pt;">
						Digite sua senha novamente, para confirmar o cadastro.
					</div>

					<input type="text" name="senha_2_altera" id="senha_2_altera" class="input_login_index" onkeyup="prepara_senha_forte('repete_senha', 'altera')" placeholder="Repita a senha" style="margin-top: 35px;" />

			    <button id="botao_altera_senha" class="flex_row center botao clicavel bot_inativo" style="margin: 0; margin-top: 50px;" onclick="ajeita_nova_senha('${dados.msg}', '${dados.id_usuario}', '${dados.id_token}');">Alterar a senha</button>

				</div>
			</div>
		</div>
  `
}

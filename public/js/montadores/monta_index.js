function monta_index (veio_de_onde) {

  const stateObj = { tela_ativa: 'index' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'index')
    }
  } else {
  	history.pushState(stateObj, '', 'index')
  }



  const palco = document.getElementById('div_palco_index')
  	
  palco.innerHTML = `

		<div id="anti_cliques" class="flex_col anti_cliques">
		</div>

		<div class="fundo_img">
		</div>

		
		<div id="div_login" class="flex_col T1 recip_landing" >

			<div class="flex_col center menu_lateral">


			  <a href="#div_login" class="flex_row center">
						<i class="icon-entra_vazio"></i>
				</a>
			  
			  <a href="#div_o_que_e" class="flex_row center">
						<i class="icon-casa_vazio"></i>
			  </a>
				
			  <a href="#div_contato" class="flex_row center">
						<i class="icon-envelope_vazio"></i>
				</a>

			  <a href="#div_contato" class="flex_row center">

						<i class="icon-sol_vazio"></i>
				</a>
	    </div>
			
			<div class="flex_row T1 center" style="position: absolute; height: 100%; align-items: flex-start; padding-top: 30px;">
				<div id="div_mensagens_sistema" class="msg sumido">
					
				</div>
			</div>

			<div class="flex_col T1 recip_landing_login">

			  <div style="height: 100vh;  width: 25%; z-index: 0;">
			  	<img src="imagens/logo_e_simbolo_escuro.png" style="width: 120px; position: absolute; margin: 10px;">

			  </div>
		
				<div class="flex_col T1" style="padding-left: 10px; align-items: flex-end;">

					<div id="recipiente_login" class="flex_col center popup popup_translucido" onclick="popup_opacidade()">

					<input id="login_index" type="text" class="input_popup input_popup_translucido" placeholder="Login">
					<input id="senha_index" type="password" class="input_popup input_popup_translucido" placeholder="Senha">

					<div class="flex_row T1">

						<div class="flex_row T2 botao_transparente">
					  		
					 		<a href="PleaseEnableJavascript.html" onclick="
						  		vaza_brota({vazam: [{id: 'recipiente_login'}], brotam: [{ id: 'recipiente_troca_senha'}] });
						  		return false;" id="bto_troca_senha_vai">
					  			Esqueceu a senha?
					  		</a>

					  	</div>

					  	<div class="flex_row T2 flex_end">
					   		<button id="bto_index_entrar" class="flex_row center botao_popup" onclick="vai_filhao_2('login')">Entrar</button>
					   	</div>

						</div>

						<div class="flex_row T1">

							<div class="flex_row center T2">
								<hr>
							</div>

							<span class="ou">ou</span>

							<div class="flex_row center T2">
								<hr>
							</div>

						</div>

						<div class="flex_row T1">
							<button class="flex_row center T2 botao_facebook">Login com Facebook</button> 
						<button class="flex_row center T2 botao_google">Login com Google</button> 
						</div>
						

						<div class="flex_row T1 center">
							Ainda não tem uma conta? <span style="font-weight: bold; margin-left: 10px;">Cadastre-se aqui</span>.
						</div>
					</div>

				<div id="recipiente_troca_senha" class="flex_col center popup sumido">

	        <span class="titulo_popup">Esqueceu a senha?</span>

       		<div class="texto_popup">
	          Nada temas! Digite seu e-mail que enviaremos um link para você trocar sua senha.
	        </div>

	  				<input id="email_troca_senha" type="text" class="input_popup input_popup_translucido" placeholder="E-mail">

	  				<div class="flex_row T1 center">
	  			    
	  			    <div class="flex_row T2 botao_transparente">

					  		<a href="PleaseEnableJavascript.html" onclick="
						  		vaza_brota({
						  				vazam: [
						  					{
							  					id: 'recipiente_troca_senha'
							  				}
							  			],
						  				brotam: [
							  				{
							  					id: 'recipiente_login'
							  				}
											]						  				
						  			});
						  		return false;">
	                Voltar
	              </a>
	  			    </div>
	  			    	
	  			   	<div class="flex_row center T2 flex_end">
	  			   		<button class="flex_row botao_popup">
	  			   			Enviar
	  			   		</button>
	  			   	</div>
	  			  </div>

					</div>

				</div>

			</div>



				<!-- Faixa de créditos da imagem de fundilho -->
			  <div class="flex_col T1 center rodape">

			    <a href="#div_o_que_e" class="recip_seta">
			    	
			    </a>

			    <div id="recip_creditos_img" class="flex_row T1 recip_creditos exclusivo_pc">
	          
	          Imagem de
		        <a href="https://pixabay.com/pt/users/randyrmm-11051907/" class="span_link">
		        	Randy Rodriguezssa
		        </a>
	         	do site
		      	<a href="https://www.pixabay.com" class="span_link">
		        	Pixabay
		        </a>
		      
		      </div>
			  
			  </div>

	
			<div id="div_o_que_e" class="flex_col T1 center">

				<div class="titulo T1 largura_interna" style="">O que é</div>

				<div class="T1 largura_interna">
					O Site da ONG é um serviço grátis na web onde você pode ajudar uma ONG, ou então receber ajuda para a instituição que você faz parte.
					<br>
					Gente que quer ajudar ajudando gente que já ajuda. Confuso? Naaada. Mais simples que taboáda do 1.<br>

					Vamos mudar o mundo!!<br><br>
					Fique à vontade.

					<button class="flex_row center botao_popup">Ver alguns sites de ONGs já criados por aqui</button>
					<button class="flex_row center botao_popup" onclick="monta_construtor_site()">
						Criar um site para sua ONG
					</button>


				</div>

				
			</div>


			<div id="div_tres_itens" class="flex_col T1 A1 center">
				<div class="titulo T1 largura_interna" style="">				Aqui, o site de sua ONG terá:
</div>


				<div class="flex_row T1 largura_interna div_natural">
					<div class="flex_row center T1 div_natural_1">
						<i class="icon-bussola_vazio"></i>
					</div>
					<div class="flex_col T1 div_natural_2">
						<div class="div_natural_2a">
							• Galeria de fotos / vídeos
						</div>
						<div>
							Compartilhe no site os eventos de sua ONG.
						</div>
					</div>
				</div>

				<div class="flex_row T1 largura_interna div_natural">
					<div class="flex_row center T1 div_natural_1">
						<i class="icon-envelope_vazio"></i>
					</div>
					<div class="flex_col T1 div_natural_2">
						<div class="div_natural_2a">
							• Email para contato
						</div>
						<div>
							Através do site, seus visitantes podem enviar mensagens de contato para seu e-mail.
						</div>
					</div>
				</div>

				<div class="flex_row T1 largura_interna div_natural">
					<div class="flex_row center T1 div_natural_1">
						<i class="icon-doacao_vazio"></i>
					</div>
					<div class="flex_col T1 div_natural_2">
						<div class="div_natural_2a">
							• Receba e envie PIX
						</div>
						<div>
							Uma forma rápida de ajudar e receber ajuda.
						</div>
					</div>
				</div>
			</div>

			<div id="div_contato" class="flex_col T1 A1 center">

				<div id="recipiente_contato" class="flex_col popup">
					<span class="titulo_popup">Fale com a gente</span>
					<span class="texto_popup">Ficou com alguma dúvida?</span>
					<span class="texto_popup">Não se acanhe em perguntar, estamos aqui para esclarecer tudo.</span>

					<input id="nome_msg" type="text" class="input_popup input_popup_translucido" placeholder="Nome">
					<input id="email_msg" type="text" class="input_popup input_popup_translucido" placeholder="E-mail">
					<textarea id="mensagem_msg" class="input_popup input_popup_translucido" placeholder="Escreva sua mensagem aqui..."></textarea>

					<button class="botao_popup">Enviar</button>
				</div>

			</div>
		</div>

	`



	// On focusin e onfocusout não funcionam tão bem no Chrome se declarados como os onclick, fora da tag html. Por isso estamos a utilizaire o addEventListener o pá.


}

  function popup_opacidade (onde) {

  	const popup_recip = document.getElementById('recipiente_login')
  	const inputs = document.getElementsByClassName('input_popup')

  	if (popup_recip.classList.contains('popup_translucido')) {
  		popup_recip.classList.remove('popup_translucido')
  		popup_recip.classList.add('popup_opaco')

  		for (let i = 0; i < inputs.length; i++) {
			  inputs[i].classList.remove('input_popup_translucido')
			  inputs[i].classList.add('input_popup_opaco')
			}
  	
  	}

  }

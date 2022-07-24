async function monta_sistema_aulas (veio_de_onde) {
  const stateObj = { tela_ativa: 'sistema_aulas' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'sistema_aulas')
    }
  } else {
  	history.pushState(stateObj, '', 'sistema_aulas')
  }

  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `
    ${barras_navegacao_sistema}
  	<div class="flex_col center T1" style="height: 100%; padding-bottom: 250px;">
  		<div class="largura_interna center" style=" margin-top: 250px; height: 100%; max-width: 100%;">
  			<span>Bem-vindo à plataforma de cursos do site da ONG.</span>
  				<br>
  				Emissión en directo.<br>
  				<button id="btn">Emitir</button><br>
  				<video autoplay="true" id="video" style="width: 500px; height: 375px; background: orange;">

					</video><br>


					<!-- Esse canvas é o que vai ser mandado pro cliente -->
					<canvas id="preview" style="display: none;"></canvas><br>
					<div class="status"></div>+<br>

  		<!--
  		<div style="margin-top: 50px;">Estes são os alunos de sua ONG:</div>
  		<div class="flex_col T1" style="border-radius: 5px; border: 1px solid #d6d6d6; height: 150px; color: #a6a6a6;~height: 100%; overflow:auto;">

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>

  			  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>

  			]<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>


  			  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>


  			  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>

  			  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>Aline Barros</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
  				<div>João da Silveira</div>
  			</div>

  			<div class="flex_row center T1 clicavel listra_opcoes">
   				<div>Marthir Luterquingue</div>
  			</div>

  			<span style="display: none;">Xii, ainda não tem nenhum.</span>
  		</div>
			-->

  		<!--
  		<div style="margin-top: 50px;">Estes são os cursos disponíveis no site de sua ONG:</div>
  		<div class="flex_row T1 center" style="justify-content: flex-start; border-radius: 5px; border: 1px solid #d6d6d6; height: 200px; color: #a6a6a6; overflow:auto;">

  			<img src="imagens/cursos/miniaturas_cursos/php_fundamental.jpg" style="margin: 5px;">
				<img src="imagens/cursos/miniaturas_cursos/office_fundamental.jpg" style="margin: 5px;">

  			<div class="flex_col center" style="width: 320px; height: 180px; border-radius: 5px; border: 1px solid #d6d6d6; margin: 5px;">
					<i class="fas fa-plus" style="font-size: 35pt; margin-bottom: 10px;"></i>
  				Crie um curso
  			</div>

  			<div style="display: none;">Xii, ainda não tem nenhum.</div>

  		</div>
			-->

			<!--
  		<div style="margin-top: 50px;">Cursos disponíveis. "Lista tipo Netflix":</div>
  		<div class="flex_row T1" style="overflow:auto;">
  			<img src="imagens/cursos/miniaturas_cursos/computacao_basica.jpg">
  			<img src="imagens/cursos/miniaturas_cursos/php_fundamental.jpg">
  			<img src="imagens/cursos/miniaturas_cursos/css_fundamental.jpg">

  			<img src="imagens/cursos/miniaturas_cursos/html_fundamental.jpg">
  			<img src="imagens/cursos/miniaturas_cursos/mysql_fundamental.jpg">
  			<img src="imagens/cursos/miniaturas_cursos/digitacao.jpg">
  			<img src="imagens/cursos/miniaturas_cursos/office_fundamental.jpg">

  		</div>
			-->
  		</div>
  	</div>
  `

  var canvas = document.querySelector("#preview")
  var context = canvas.getContext('2d')
  var btn = document.querySelector("#btn")

  canvas.width = 150
  canvas.height = 100

  context.width = canvas.width
  context.height = canvas.height

  var video = document.querySelector("#video");


  var socket = io()

  function publicarMensaje (msg) {
  	document.querySelector('.status').innerText = msg
  }

  function loadCamara (stream) {
  	video.srcObject = stream
  	socket.emit('audio', audio.srcObject)

  	publicarMensaje('Camara funcionando')
  }

  function errorCamara () {
  	publicarMensaje('Camara ha fallado.')
  }

  function verVideo (video, context) {
  	context.drawImage(video, 0, 0, context.width, context.height)
  	console.log("vai estremar")
  	socket.emit('stream', canvas.toDataURL('image/webp'))
  }

  function vaiAudio () {

  }

  btn.addEventListener('click', () => {
  	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)

  	if (navigator.getUserMedia) {
  		navigator.getUserMedia({audio: true, video: true}, loadCamara, errorCamara)
  	}
  })

  var intervalo = setInterval( () => {
  	verVideo(video, context)
  }, 30)
}
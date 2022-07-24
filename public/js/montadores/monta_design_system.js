function monta_design_system (veio_de_onde) {

  const stateObj = { tela_ativa: 'design_system' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'design_system')
    }
  } else {
  	history.pushState(stateObj, '', 'design_system')
  }

  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `
  	<div class="flex_col T1 center" style="height: 100vh;">
  		<h1>SITE DA ONG</h1>
  		<button id="bto_guia_estilo" onclick="monta_guia_de_estilo()">Guia de Estilo</button>
  		<button id="bto_biblio_compon" onclick="monta_biblioteca_de_componentes()">Biblioteca de Componentes</button>
  	</div>

	`

  document.getElementById('bto_guia_estilo').onclick = () => monta_guia_de_estilo()
  document.getElementById('bto_biblio_compon').onclick = () => monta_biblioteca_de_componentes()

}
function monta_biblioteca_de_componentes (veio_de_onde) {

  const stateObj = { tela_ativa: 'biblioteca_de_componentes' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'biblioteca_de_componentes')
    }
  } else {
  	history.pushState(stateObj, '', 'biblioteca_de_componentes')
  }

  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `
  	<div class="flex_col T1 center" style="height: 100vh;">
      <h1>Biblioteca de Componentes</h1>
      <h1>Componentes</h1>

      <span>Botões</span>
      <span>Checkboxes</span>
      <span>Radio Buttons</span>
      <span>Cartões</span>
      <span>Avisos popups</span>
      <span>Inputs de Texto</span>
      <span>Links</span>
      <span>Barras de Mensagens</span>
      <span>Radio Buttons</span>
      <span>Abas</span>

      <h1>Recursos</h1>

  		<button id="bto_guia_estilo" onclick="monta_guia_de_estilo()">Guia de Estilo</button>
  		<button id="bto_biblio_compon" onclick="monta_biblioteca_de_componentes()">Biblioteca de Componentes</button>
  	</div>

	`

  document.getElementById('bto_guia_estilo').onclick = () => monta_guia_de_estilo()
  document.getElementById('bto_biblio_compon').onclick = () => monta_biblioteca_de_componentes()

}
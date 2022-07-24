function monta_guia_de_estilo (veio_de_onde) {

  const stateObj = { tela_ativa: 'guia_de_estilo' }

  if (veio_de_onde) {
    if (veio_de_onde == 'popstate') {
  		history.replaceState(stateObj, '', 'guia_de_estilo')
    }
  } else {
  	history.pushState(stateObj, '', 'guia_de_estilo')
  }

  const palco = document.getElementById('div_palco_index')
  palco.innerHTML = `
  	<div class="flex_col T1 center" style="">
  		<h1>SITE DA ONG</h1>
      <h2>Guia de Estilo</h2>

      <span id="bto_sobre"> * Sobre </span>
      <div id="recip_sobre" class="flex_col T1 center recip_guia_estilo">
        <h1>Nossa plataforma de marca</h1>
        <h2>
          Posicionamento da Marca
        </h2>
        <div class="flex_col center T1 largura_interna">
          Um lugar onde quem precisa de ajuda, pode facilmente expor seus trabalhos e um lugar onde quem quer ajudar, pode facilmente encontrar pessoas dedicadas e, ao alcance de um clique, fazer a diferença nestas ações positivas.
        </div>
        <h2>
          Propósito da Marca
        </h2>
        <div class="flex_col center T1 largura_interna">
          Unir quem quer ajudar a quem já está ajudando.
        </div>
         <h2>
          Promessa de Marca
        </h2>
        <div class="flex_col center T1 largura_interna">
          Salve o mundo.
        </div>

        <h1>Nossa audiência</h1>
        <h2>
          Quem já meteu as caras
        </h2>
        <div class="flex_col center T1 largura_interna">
          Pessoas que já começaram a ajudar outras pessoas, e querem a ajuda de mais gente para suas causas. A estas pessoas disponibilizamos um meio para elas receberem ajuda com apenas um clique.
        </div>
        <h2>
          Quem quer meter as caras
        </h2>
        <div class="flex_col center T1 largura_interna">
          Pessoas que sentem uma vontade interior de ajudar mas não sabem como começar. Para estas pessoas oferecemos a possibilidade de ajudar com apenas um clique.
        </div>
      </div>

      <span id="bto_personalidade"> * Personalidade </span>
      <div id="recip_personalidade" class="flex_col T1 center recip_guia_estilo">
        <h1>Nossa plataforma de marca</h1>
        <div class="flex_col center T1 largura_interna">
          Nosso trabalho é focado em três palavrinhas. Amor, responsabilidade e sonhos. Veremos muito elas em toda nosso guia.
        </div>

        <h2>
          Amor
        </h2>
        <div class="flex_col center T1 largura_interna">
          O trabalho voluntário tem como força motriz o amor. É somente a vontade de ver o outro bem que move estes trabalhadores, e é também este mesmo sentimento que move aquele que doa para projetos com foco na ajuda a outros seres. E nós, do Site da ONG temos este mesmo sentimento pela plataforma que une estes dois elos da corrente do bem.
        </div>
        <h2>
          Responsabilidade
        </h2>
        <div class="flex_col center T1 largura_interna">
          Lidar com vidas é de extrema responsabilidade pois outros dependem da gente e é com a máxima responsabilidade que lidamos também com nosso trabalho, para manter esta plataforma sempre funcionando, para a ajuda chegar onde precisa.
        </div>
         <h2>
          Sonhos
        </h2>
        <div class="flex_col center T1 largura_interna">
          A insatisfação com o presente é o que nos faz mudar. Sonhamos com um mundo perfeito, onde nao haja mais dor. É por isso que trabalhamos, construindo este mundo, um tijolinho de cada vez.
        </div>

      <h1>Tom e Voz da Marca</h1>
        <h2>
          Amor
        </h2>
        <div class="flex_col center T1 largura_interna">
          Sempre o bem estar do próximo deve ser uma prioridade.
        </div>
        <div class="flex_row T1 center">
          <div class="flex_col center T2 largura_interna">
            <h4>Sim</h4>
            Nós ajudamos a te ajudar.
          </div>
          <div class="flex_col center T2 largura_interna">
            <h4>Não</h4>
            Exponha seu trabalho aqui e consiga dinheiro.
          </div>
        </div>

        <h2>
          Responsabilidade
        </h2>
        <div class="flex_col center T1 largura_interna">
          Comprometimento com as pessoas, logo, com o trabalho.
        </div>
        <div class="flex_row T1 center">
          <div class="flex_col center T2 largura_interna">
            <h4>Sim</h4>
            Trabalho disciplinado em pról de um mundo perfeito.
          </div>
          <div class="flex_col center T2 largura_interna">
            <h4>Não</h4>
            Aqui a gente mata a culebra e mostra el palo.
          </div>
        </div>

        <h2>
          Sonhos
        </h2>
        <div class="flex_col center T1 largura_interna">
          Sem medo de sonhar. Sonhar grande mesmo, em uma utopia de amor incondicional e felicidade entre todos os habitantes do planeta terra.
        </div>
        <div class="flex_row T1 center">

          <div class="flex_col center T2 largura_interna">
            <h4>Sim</h4>
            Rumo a um mundo perfeito.
          </div>
          <div class="flex_col center T2 largura_interna">
            <h4>Não</h4>
            Rumo a um mundo melhor.
          </div>
        </div>
        
        


        
      </div>

      <span id="bto_logos"> * Logos e aplicação </span>
      <div id="recip_logos" class="flex_col T1 center recip_guia_estilo">
      </div>

      <span id="bto_cores"> * Cores </span>
      <div id="recip_cores" class="flex_col T1 center recip_guia_estilo">
      </div>

      <span id="bto_visual"> * Visual </span>
      <div id="recip_visual" class="flex_col T1 center recip_guia_estilo">
      </div>

      <span id="bto_tipografia"> * Tipografia </span>
      <div id="recip_tipografia" class="flex_col T1 center recip_guia_estilo">
      </div>


  		<button id="bto_biblio_compon" onclick="monta_biblioteca_de_componentes()">Biblioteca de Componentes</button>
  	</div>

	`

  function fecha_tudo () {

    document.getElementById('recip_sobre').style.display = 'none'
    document.getElementById('recip_personalidade').style.display = 'none'
    document.getElementById('recip_logos').style.display = 'none'
    document.getElementById('recip_cores').style.display = 'none'
    document.getElementById('recip_visual').style.display = 'none'
    document.getElementById('recip_tipografia').style.display = 'none'
  }

  document.getElementById('bto_biblio_compon').onclick = () => monta_biblioteca_de_componentes()


  document.getElementById('bto_sobre').onclick = () => {
    fecha_tudo()
    document.getElementById('recip_sobre').style.display = 'flex'
  }

  document.getElementById('bto_personalidade').onclick = () => {
    fecha_tudo()
    document.getElementById('recip_personalidade').style.display = 'flex'
  }
}
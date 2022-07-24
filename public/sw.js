
const cacheName = 'cache-v1'
const resourcesToPrecache = [
  '/',
  'offline.html',
  'imagens/fundos/lobo.jpg',
  'imagens/fundos/fundo_praia.jpg',
  'favicon.ico',
  'imagens/spash-screen.png',
  'adm_manifest/manifest.webmanifest',
  'css/simples.css',
  'css/landing_page.css',
  'css/fontello.css',
  'font_fontello/bebas_regular.otf',
  'font_fontello/fontello.eot',
  'font_fontello/fontello.svg',
  'font_fontello/fontello.ttf',
  'font_fontello/fontello.woff',
  'font_fontello/fontello.woff2',
  'js/funcoes_operacionais/funcoes_gerais.js',
  'js/bibliotecas_terceiros/qrcode/qrcode.js',
  'js/bibliotecas_terceiros/vanilla-masker/vanilla-masker.js',
  'js/bibliotecas_proprias/gera_qr_pix/gera_payload_estatico.js',
  'js/montadores/monta_index.js',
  'js/montadores/monta_altera_senha.js',
  'js/montadores/monta_construtor_site.js',
  'js/montadores/monta_site.js',
  'js/montadores/monta_sistema_home.js',
  'js/montadores/monta_sistema_altera.js',
  'js/montadores/monta_sistema_fotos_videos.js',
  'js/montadores/monta_sistema_aulas.js',
  'js/roteamento.js'
]

self.addEventListener('install', event => {
  console.log("Install event")

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(resourcesToPrecache)
      })
  )
})

self.addEventListener('activate', event => {
  console.log("Evento ativado!!")
})

self.addEventListener('fetch', async event => {
  /*
  event.respondWith(caches.match(event.request))
    .then(cachedResponse => {
      return cachedResponse || fetch(event.request)
    }, error => {
      console.log("oia o erro: " , error)
      console.log(error)
    })
  */
  console.log("Seu nabuuuco#3!1")
  console.log("event.request.url: " + event.request.url)

    const busca = async () => {

      // Se for um html na busca, trazer o offline, que está programado para ser mostrado só se o usuário estiver offline.
      if (event.request.headers.get('Accept').includes('text/html')) {
        const cache_do_html = await caches.open(cacheName)
        const cachedResponse = await cache_do_html.match('offline.html')
        return cachedResponse
      }
      if (event.request.headers.get('Accept').includes('application/json')) {
        console.log("biruuuta")
      }

      const busca_no_cache = await caches.match(event.request, { ignoreSearch: true })
      return busca_no_cache || fetch(event.request)
    }

  event.respondWith(busca())
})

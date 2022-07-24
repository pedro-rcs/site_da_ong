// const CACHE_NAME = 'sw-cache-example_2'
// const OFFLINE_VERSION = 1;
// const ca = require('esqueleto_padrao.js')
// import { arr } from 'esqueleto_padrao.js'

const CACHE_NAME = 'offline_4'
const cacheName = 'bancu-v1'
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html'

const versao = '1_0_1'
// const esqueleto_padrao = 'esqueleto_padrao_' + versao + '.json'

self.addEventListener('install', async event => {
  self.skipWaiting()
  console.log('Instalando service worker...')

  const bota_cache = async () => {
    // Caça o 
    const resposta = await fetch('esqueleto_padrao.json')
    const json = await resposta.json()
    let cache_antigo = await caches.open(CACHE_NAME)

    return cache_antigo.addAll(json.itens)
  }

  event.waitUntil(bota_cache())
})

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!')
})

self.addEventListener('fetch', function (event) {
  // Bug fix
  // https://stackoverflow.com/a/49719964
  // if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return

  const busca = async () => {
    // Busca o fetch em todos os caches
    const busca_no_cache = await caches.match(event.request)

    // Se for um html na busca, trazer o offline, que está programado para ser mostrado só se o usuário estiver offline.
    if (event.request.headers.get('Accept').includes('text/html')) {
      const cache_do_html = await caches.open(CACHE_NAME)
      const cachedResponse = await cache_do_html.match('offline.html')
      return cachedResponse
    }

    // Cache hit - return response
    console.log('Achou no cache: ', event.request.url)
    return busca_no_cache || fetch(event.request)
    
    // If we didn't find a match in the cache, use the network.
  }

  event.respondWith(busca())
})
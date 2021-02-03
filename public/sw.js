/* eslint-disable no-restricted-globals */

self.addEventListener('install', () => {
  self.skipWaiting()
})

const syncStore = {}

self.addEventListener('message', event => {
  if (event.data.type === 'sync') {
    syncStore[event.data.name] = event.data

    self.registration.sync.register(event.data.name)
  }
})

async function fetchPokemon(name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await response.json()

  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        ...data,
        image: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
      })
    })
  })
}

self.addEventListener('sync', event => {
  const { name } = syncStore[event.tag]

  event.waitUntil(
    setTimeout(function () {
      fetchPokemon(name)
    }, 2000)
  )
})

function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.')

  const { image, tag, url, title, text } = event.data.json()

  const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag,
    image,
    badge: 'https://spyna.it/icons/favicon.ico',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: 'https://via.placeholder.com/128/ff0000',
      },
    ],
  }
  event.waitUntil(self.registration.showNotification(title, options))
}

function openPushNotification(event) {
  console.log(
    '[Service Worker] Notification click Received.',
    event.notification.data
  )

  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data))
}

self.addEventListener('push', receivePushNotification)
self.addEventListener('notificationclick', openPushNotification)

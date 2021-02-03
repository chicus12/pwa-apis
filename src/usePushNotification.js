import React from 'react'
import http from './http'

const pushServerPublicKey =
  'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8'

function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window
}

async function askUserPermission() {
  return Notification.requestPermission()
}

function sendNotification() {
  const img = '/images/soinLabs.png'
  const text = 'Esto es un ejemplo para el techtalk'
  const title = 'Avoiding Chaos Demo'
  const options = {
    body: text,
    icon: '/images/soinLabs.png',
    vibrate: [200, 100, 200],
    tag: 'demo',
    image: img,
    badge: 'https://spyna.it/icons/android-icon-192x192.png',
    actions: [
      {
        action: 'Detail',
        title: 'View',
        icon: 'https://via.placeholder.com/128/ff0000',
      },
    ],
  }
  navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options)
  })
}

function registerServiceWorker() {
  return navigator.serviceWorker.register('/sw.js')
}

async function createNotificationSubscription() {
  const serviceWorker = await navigator.serviceWorker.ready
  return serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  })
}

function getUserSubscription() {
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      return serviceWorker.pushManager.getSubscription()
    })
    .then(function (pushSubscription) {
      return pushSubscription
    })
}

const pushNotificationSupported = isPushNotificationSupported()

export default function usePushNotifications() {
  const [userConsent, setSuserConsent] = React.useState(Notification.permission)
  const [userSubscription, setUserSubscription] = React.useState(null)
  const [
    pushServerSubscriptionId,
    setPushServerSubscriptionId,
  ] = React.useState()
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (pushNotificationSupported) {
      setLoading(true)
      setError(false)
      registerServiceWorker().then(() => {
        setLoading(false)
      })
    }
  }, [])

  React.useEffect(() => {
    setLoading(true)
    setError(false)
    const getExixtingSubscription = async () => {
      const existingSubscription = await getUserSubscription()
      setUserSubscription(existingSubscription)
      setLoading(false)
    }
    getExixtingSubscription()
  }, [])

  const onClickAskUserPermission = () => {
    setLoading(true)
    setError(false)
    askUserPermission().then(consent => {
      setSuserConsent(consent)
      if (consent !== 'granted') {
        setError({
          name: 'Consent denied',
          message: 'You denied the consent to receive notifications',
          code: 0,
        })
      }
      setLoading(false)
    })
  }
  //

  const onClickSusbribeToPushNotification = () => {
    setLoading(true)
    setError(false)
    createNotificationSubscription()
      .then(function (subscrition) {
        setUserSubscription(subscrition)
        setLoading(false)
      })
      .catch(err => {
        console.error(
          "Couldn't create the notification subscription",
          err,
          'name:',
          err.name,
          'message:',
          err.message,
          'code:',
          err.code
        )
        setError(err)
        setLoading(false)
      })
  }

  const onClickSendSubscriptionToPushServer = () => {
    setLoading(true)
    setError(false)
    http
      .post('/subscription', userSubscription)
      .then(function (response) {
        setPushServerSubscriptionId(response.id)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        setError(err)
      })
  }

  const onClickSendNotification = async () => {
    setLoading(true)
    setError(false)
    await http.get(`/subscription/${pushServerSubscriptionId}`).catch(err => {
      setLoading(false)
      setError(err)
    })
    setLoading(false)
  }

  return {
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading,
    sendNotification,
  }
}

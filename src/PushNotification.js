/* eslint-disable react/jsx-one-expression-per-line */
import usePushNotifications from './usePushNotification'

export default function PushNotification() {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    sendNotification,
  } = usePushNotifications()

  const isConsentGranted = userConsent === 'granted'

  return (
    <main style={{ padding: 40 }}>
      <h1>Push Notification Demo</h1>

      <p>
        Consentimiento del usuario para recibir push notification es{' '}
        <strong>{userConsent}</strong>.
      </p>

      <button
        type="button"
        disabled={!pushNotificationSupported || isConsentGranted}
        onClick={onClickAskUserPermission}
        style={{ marginBottom: 20 }}
      >
        {isConsentGranted
          ? 'Permiso concebido'
          : ' Solicitar permisos al usuario'}
      </button>
      <br />
      <button
        type="button"
        disabled={
          !pushNotificationSupported || !isConsentGranted || userSubscription
        }
        onClick={onClickSusbribeToPushNotification}
        style={{ marginBottom: 20 }}
      >
        {userSubscription
          ? 'Suscripción a push creada'
          : 'Crear suscripción a los push'}
      </button>
      <br />
      <button
        type="button"
        disabled={!userSubscription || pushServerSubscriptionId}
        onClick={onClickSendSubscriptionToPushServer}
        style={{ marginBottom: 20 }}
      >
        {pushServerSubscriptionId
          ? 'Subscripción enviada al server'
          : 'Enviar una solicitud al server para suscribirse'}
      </button>
      <br />
      {pushServerSubscriptionId && (
        <div>
          <button type="button" onClick={sendNotification}>
            Enviar una notificación de prueba
          </button>
        </div>
      )}
    </main>
  )
}

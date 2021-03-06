/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'

const isSupported = 'wakeLock' in navigator && 'request' in navigator.wakeLock

export default function WakeLock() {
  const [seconds, setSeconds] = React.useState(15)
  const [isWakeLocked, setIsWakeLocked] = React.useState(false)
  const [interval, setIntervalTimer] = React.useState(true)
  const wakeLock = React.useRef(null)

  React.useEffect(() => {
    if (interval) {
      const timer = setInterval(() => {
        setSeconds(sec => (isWakeLocked ? sec + 1 : sec - 1))
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [interval, isWakeLocked])

  React.useEffect(() => {
    if (seconds === 0 && !isWakeLocked) {
      setIntervalTimer(false)
    }
  }, [seconds, isWakeLocked])

  const requestWakeLock = React.useCallback(async () => {
    try {
      wakeLock.current = await navigator.wakeLock.request('screen')
    } catch (e) {
      console.error(`${e.name}, ${e.message}`)
    }
  }, [])

  const onWakeLockCheckboxChange = React.useCallback(
    async evt => {
      if (!isSupported) {
        console.error(
          'Llamar a la función `requestWakeLock` no tiene ningún efecto, la API de Wake Lock Screen no es compatible con el navegador'
        )

        return
      }

      setIntervalTimer(true)
      setIsWakeLocked(locked => !locked)

      if (evt.target.checked) {
        await requestWakeLock()
        setSeconds(0)
      } else {
        await wakeLock.current.release()
        setSeconds(15)
      }
    },
    [requestWakeLock]
  )

  return (
    <div style={{ padding: 40 }}>
      <h1>Screen Wake Lock API Demo</h1>
      <label htmlFor="wakeLockCheckbox">
        <input
          type="checkbox"
          id="wakeLockCheckbox"
          onChange={onWakeLockCheckboxChange}
        />{' '}
        Evitar que la <code>pantalla</code> se apague
      </label>
      {isWakeLocked ? (
        <h2>La pantalla NO se apagará. Tiempo transcurrido {seconds}</h2>
      ) : (
        <h2>Esta pantalla se apagará en {seconds}</h2>
      )}
    </div>
  )
}

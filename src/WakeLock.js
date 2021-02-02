/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'

export default function WakeLock() {
  const [secondsToSleep, setSecondsToSleep] = React.useState(15)
  const [isWakeLocked, setIsWakeLocked] = React.useState(true)
  const [interval, setIntervalTimer] = React.useState(true)
  const wakeLock = React.useRef(null)

  React.useEffect(() => {
    if (interval) {
      const timer = setInterval(() => {
        setSecondsToSleep(seconds => seconds - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [interval])

  React.useEffect(() => {
    if (secondsToSleep === 0) {
      setIntervalTimer(false)
    }
  }, [secondsToSleep])

  const requestWakeLock = React.useCallback(async () => {
    try {
      wakeLock.current = await navigator.wakeLock.request('screen')
    } catch (e) {
      console.error(`${e.name}, ${e.message}`)
    }
  }, [])

  const onWakeLockCheckboxChange = React.useCallback(async evt => {
    if (evt.target.checked) {
      await requestWakeLock()
    } else {
      setIntervalTimer(true)
      setSecondsToSleep(15)
      await wakeLock.current.release()
    }

    setIsWakeLocked(locked => !locked)
  }, [])

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
        <h2>Esta pantalla se apagará en {secondsToSleep}</h2>
      ) : (
        <h2>La pantalla NO se apagará</h2>
      )}
    </div>
  )
}

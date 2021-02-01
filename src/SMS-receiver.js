import React from 'react'

export default function SMSReceiver() {
  const [verified, setVerified] = React.useState(false)
  const [otpCode, setOtpCode] = React.useState(false)
  const formRef = React.useRef(null)

  React.useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController()
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal,
        })
        .then(otp => {
          setOtpCode(otp.code)
          formRef.current.submit()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  return verified ? (
    <SuccesfulOTPReceived />
  ) : (
    <>
      <h1>Demo de un OTP</h1>
      <div>
        Enviar un SMS que incluya lo siguiente:
        <pre>
          <code>@pwa-apis.vercel.app #12345</code>
        </pre>
        a este teléfono.
      </div>
      <div
        style={{ border: '1px solid', padding: '5px 10px', margin: '10px 0' }}
      >
        <form
          ref={formRef}
          onSubmit={() => {
            setVerified(true)
          }}
        >
          Ingresar el OTP aqui:
          <input
            value={otpCode}
            onChange={evt => {
              setOtpCode(evt.target.value)
            }}
            type="text"
            autoComplete="one-time-code"
            inputMode="numeric"
            name="one-time-code"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
}

function SuccesfulOTPReceived() {
  return (
    <div>
      <h1>Hemos verificado exitosamente su cuenta!!</h1>
    </div>
  )
}

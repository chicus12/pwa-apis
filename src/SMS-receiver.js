import React from 'react'

export default function SMSReceiver() {
React.useEffect(() => {
  if ('OTPCredential' in window) {

        // const input = document.querySelector('input[autocomplete="one-time-code"]');
        // if (!input) return;
        const ac = new AbortController();
        // const form = input.closest('form');
        // if (form) {
        //   form.addEventListener('submit', e => {
        //     ac.abort();
        //   });
        // }
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then(otp => {
          // input.value = otp.code;
          // if (form) form.submit();
          alert(otp.code)
        }).catch(err => {
          console.log(err);
        });
      }

}, [])

  return (
    <>
      <h1>
        Demo de un OTP
      </h1>
      <div>
        Enviar un SMS que incluya lo siguiente:
        <pre><code>@pwa-apis.vercel.app #12345</code></pre>
        a este teléfono.
      </div>
      <div style={{ border: '1px solid', padding: '5px 10px', margin: '10px 0' }}>
        <form action="/post" method="post">
          Ingresar el OTP aqui:
          <input type="text" autoComplete="one-time-code" inputMode="numeric" name="one-time-code" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default function SMSReceiver() {
  return (
    <>
      <h1>
        Demo de un OTP
      </h1>
      <div>
        Enviar un SMS que incluya lo siguiente:
        <pre><code>@web-otp.glitch.me #12345</code></pre>
        {' '}
        to this phone.
      </div>
      <div style={{ border: '1px solid', padding: '5px 10px', margin: '10px 0' }}>
        <form action="/post" method="post">
          Enter OTP here:
          <input type="text" autoComplete="one-time-code" inputMode="numeric" name="one-time-code" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

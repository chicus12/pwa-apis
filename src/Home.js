import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>PWA API Ejemplos</h1>
      <nav>
        <ul
          style={{ display: 'flex', flexDirection: 'row', listStyle: 'none' }}
        >
          <li style={{ marginRight: 10 }}>
            <Link to="/otp-credential">OTP Credential</Link>
          </li>
          <li style={{ marginRight: 10 }}>
            <Link to="/contact-picker">Contact Picker</Link>
          </li>
          <li style={{ marginRight: 10 }}>
            <Link to="/wake-lock">Wake Lock</Link>
          </li>
          <li style={{ marginRight: 10 }}>
            <Link to="/background-sync">Background Sync</Link>
          </li>
          <li>
            <Link to="/push-notification">Push Notifications</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

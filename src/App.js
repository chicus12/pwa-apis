import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import SMSReceiver from './SMSReceiver'
import ContactPicker from './ContactPicker'
import PushNotification from './PushNotification'
import WakeLock from './WakeLock'
import BackgroundSync from './BackgroundSync'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/otp-credential">
            <SMSReceiver />
          </Route>
          <Route path="/contact-picker">
            <ContactPicker />
          </Route>
          <Route path="/wake-lock">
            <WakeLock />
          </Route>
          <Route path="/background-sync">
            <BackgroundSync />
          </Route>
          <Route path="/push-notification">
            <PushNotification />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

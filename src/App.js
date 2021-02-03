import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import Home from './Home'
// import SMSReceiver from './SMSReceiver'
// import ContactPicker from './ContactPicker'
// import PushNotification from './PushNotification'
// import WakeLock from './WakeLock'
// import BackgroundSync from './BackgroundSync'

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './Home'))
const SMSReceiver = React.lazy(() =>
  import(/* webpackChunkName: "SMSReceiver" */ './SMSReceiver')
)
const ContactPicker = React.lazy(() =>
  import(/* webpackChunkName: "ContactPicker" */ './ContactPicker')
)
const PushNotification = React.lazy(() =>
  import(/* webpackChunkName: "PushNotification" */ './PushNotification')
)
const WakeLock = React.lazy(() =>
  import(/* webpackChunkName: "WakeLock" */ './WakeLock')
)
const BackgroundSync = React.lazy(() =>
  import(/* webpackChunkName: "BackgroundSync" */ './BackgroundSync')
)

function App() {
  return (
    <div>
      <React.Suspense fallback={<div>loading</div>}>
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
      </React.Suspense>
    </div>
  )
}

export default App

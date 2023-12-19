import {Switch, Route} from 'react-router-dom'

import ProtectedRouter from './Components/ProtectedRouter'

import Login from './Components/Login'

import HomePage from './Components/HomePage'

import JobsRoute from './Components/JobsRoute'

import DetailedRoute from './Components/DetailedRoute'

import NotFound from './Components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRouter exact path="/" component={HomePage} />
    <ProtectedRouter exact path="/jobs" component={JobsRoute} />
    <ProtectedRouter exact path="/jobs/:id" component={DetailedRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App

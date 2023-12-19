import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    submitError: false,
  }

  homeRouteCall = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  errorMsgesFunctionCall = msg => {
    this.setState({submitError: true, errorMsg: msg})
  }

  submitted = async event => {
    event.preventDefault()
    console.log('OkaySubmitted')
    const {username, password} = this.state
    const userObject = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userObject),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      console.log('Yes Granted!!')
      this.homeRouteCall(data.jwt_token)
    } else {
      console.log('No')
      this.errorMsgesFunctionCall(data.error_msg)
    }
  }

  username = event => {
    this.setState({username: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, submitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="aboveSmallCon">
        <form className="loginCon" onSubmit={this.submitted}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="webLogo"
          />
          <div className="inputElementsCon">
            <div className="inputCon">
              <label className="name" htmlFor="userName">
                {' '}
                USERNAME{' '}
              </label>
              <br />
              <input
                value={username}
                onChange={this.username}
                className="input"
                type="text"
                id="userName"
              />
            </div>
            <div>
              <label className="name" htmlFor="Password">
                {' '}
                PASSWORD{' '}
              </label>{' '}
              <br />
              <input
                onChange={this.password}
                value={password}
                className="input"
                type="Password"
                id="Password"
              />{' '}
              <br />
              <div className="buttonCon">
                <button type="submit" className="buttonSubmitted">
                  {' '}
                  Login{' '}
                </button>
              </div>
              {submitError ? <p className="errorMsg"> *{errorMsg} </p> : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login

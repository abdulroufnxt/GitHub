import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const HeaderSection = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    console.log('logout')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="overallHeaderCon">
      <div className="small">
        <div className="smallHeaderContainer">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="headerLogo"
            />
          </Link>
          <ul className="iconsCon">
            <li>
              <Link to="/">
                <AiFillHome className="home" />
              </Link>
            </li>

            <li>
              <Link to="/jobs">
                <BsFillBriefcaseFill className="home" />
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="buttonLogout"
                type="button"
                aria-label="logot button"
              >
                <FiLogOut className="home" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="large">
        <div className="lgHeader">
          <Link to="/" className="headerLogo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="headerLogo"
            />
          </Link>
          <div className="homeAndJobs">
            <Link to="/" className="homeAndJobButton">
              {' '}
              Home{' '}
            </Link>
            <Link to="/jobs" className="homeAndJobButton">
              {' '}
              Jobs{' '}
            </Link>
          </div>
          <button type="button" onClick={logout} className="largeLogoutButton">
            {' '}
            <Link to="/logout" className="logout">
              {' '}
              Logout{' '}
            </Link>{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(HeaderSection)

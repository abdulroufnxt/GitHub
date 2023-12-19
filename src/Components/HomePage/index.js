import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'

import HeaderSection from '../HeaderSection'

import './index.css'

const HomePage = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="overallHomeContainer">
      <HeaderSection />
      <div className="matterCon">
        <div className="home-page-content">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button className="find-jobs-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage

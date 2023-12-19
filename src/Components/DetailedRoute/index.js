import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import {FiExternalLink} from 'react-icons/fi'

import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import HeaderSection from '../HeaderSection'

import './index.css'

const loaderStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  process: 'PROCESS',
  failure: 'FAILURE',
}

class DetailedRoute extends Component {
  state = {
    particularJobDetails: {},
    relatedJobs: [],
    skills: [],
    lifeAtCompanyMatter: {},
    apiStatus: loaderStatus.initial,
  }

  componentDidMount() {
    this.callingTheBriefDataFromAPi()
  }

  callingTheBriefDataFromAPi = async () => {
    this.setState({apiStatus: loaderStatus.process})
    const {match} = this.props
    const {params} = match

    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // console.log(data)

    if (response.ok === true) {
      const jobDetails = data.job_details

      const skillsFromJobDetails = data.job_details.skills

      const skillsConvert = skillsFromJobDetails.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const lifAtCompany = data.job_details.life_at_company
      console.log(lifAtCompany)

      const lifeAtCompanyObject = {
        imageUrl: lifAtCompany.image_url,
        description: lifAtCompany.description,
      }

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        packagePerAnnum: jobDetails.package_per_annum,
      }

      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        particularJobDetails: updatedJobDetails,
        relatedJobs: similarJobs,
        skills: skillsConvert,
        lifeAtCompanyMatter: lifeAtCompanyObject,
        apiStatus: loaderStatus.success,
      })
    } else {
      this.setState({apiStatus: loaderStatus.failure})
    }
  }

  callingTheDataAgain = () => {
    this.callingTheBriefDataFromAPi()
  }

  callFailSection = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong </h1>
      <p> We cannot seem to find the page you are looking for </p>
      <button onClick={this.callingTheDataAgain} type="button">
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  successCalling = () => {
    const {
      relatedJobs,
      particularJobDetails,
      skills,
      lifeAtCompanyMatter,
    } = this.state

    // console.log(relatedJobs)
    // console.log(lifeAtCompanyMatter)

    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
      packagePerAnnum,
      companyWebsiteUrl,
    } = particularJobDetails
    return (
      <div className="con">
        <div className="adjustEachCardInDetailed">
          <div className="logoCon">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo"
            />
            <div className="mar">
              <div>
                <h1 className="title"> {title} </h1>
                <div className="starCon">
                  <AiFillStar className="yellow" />
                  <p className="title"> {rating} </p>
                </div>
              </div>
            </div>
          </div>
          <div className="nextCon">
            <div className="finalAdjust">
              <div className="eachAddressCon">
                <IoLocationSharp />
                <p className="names"> {location} </p>
              </div>

              <div className="eachAddressCon">
                <BsFillBriefcaseFill />
                <p className="names"> {employmentType} </p>
              </div>
            </div>
            <p> {packagePerAnnum} </p>
          </div>
          <hr />
          <div className="DesAndVisitCon">
            <h1> Description </h1>
            <a href={companyWebsiteUrl} className="visitCon">
              <p> Visit </p>
              <FiExternalLink />
            </a>
          </div>
          <p> {jobDescription} </p>
          <h1> Skills </h1>
          <ul className="skillsContainer">
            {skills.map(each => {
              const {imageUrl, name} = each

              return (
                <li key={each.name} className="skillsCon">
                  <img className="skillImage" src={imageUrl} alt={name} />
                  <p> {name} </p>
                </li>
              )
            })}
          </ul>

          <h1> Life at Company </h1>
          <div className="adjustBasedONDevices">
            <p> {lifeAtCompanyMatter.description} </p>
            <img
              className="image"
              src={lifeAtCompanyMatter.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <div className="pading">
          <div className="headingCon">
            <h1 className="white"> Similar Jobs </h1>
          </div>
          <>
            <ul className="adjustEachCardInDetailed1">
              {relatedJobs.map(each => (
                <li key={each.id} className="adjustEachCard">
                  <div className="logoCon">
                    <img
                      className="logoImage"
                      src={each.companyLogoUrl}
                      alt="similar job company logo"
                    />
                    <div className="mar">
                      <h1 className="title"> {each.title} </h1>
                      <div className="starCon">
                        <AiFillStar className="yellow" />
                        <p className="title"> {each.rating} </p>
                      </div>
                    </div>
                  </div>
                  <div className="nextCon">
                    <div className="finalAdjust">
                      <div className="eachAddressCon">
                        <IoLocationSharp />
                        <p className="names"> {each.location} </p>
                      </div>

                      <div className="eachAddressCon">
                        <BsFillBriefcaseFill />
                        <p className="names"> {each.employmentType} </p>
                      </div>
                    </div>
                  </div>
                  <h1> Description </h1>
                  <p className="text"> {each.jobDescription} </p>
                </li>
              ))}
            </ul>
          </>
        </div>
      </div>
    )
  }

  renderBasedOnFetching = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case loaderStatus.process:
        return (
          <div className="jobs-loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case loaderStatus.success:
        return this.successCalling()
      case loaderStatus.failure:
        return this.callFailSection()
      default:
        return null
    }
  }

  render() {
    // console.log(skills)

    return (
      <div className="overallCon">
        <HeaderSection />
        {this.renderBasedOnFetching()}
      </div>
    )
  }
}

export default DetailedRoute

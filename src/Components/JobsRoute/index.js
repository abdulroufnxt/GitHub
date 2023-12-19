import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {IoIosSearch} from 'react-icons/io'

import HeaderSection from '../HeaderSection'

import ProfileComponent from '../ProfileComponent'

import SelectingTheDataCheckBoxAndRadioType from '../SelectingTheDataCheckBoxAndRadioType'

import EachJob from '../EachJob'

import './index.css'

const loaderStatus = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    search: '',
    jobsList: [],
    profileStatus: loaderStatus.initial,
    jobsStatus: loaderStatus.initial,
    typesOfEmployeeMent: [],
    salaryRanges: '',
    profileObject: {},
  }

  componentDidMount() {
    this.profileDetails()
    this.jobsDetails()
  }

  jobsDetails = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({jobsStatus: loaderStatus.progress})
    const {search, salaryRanges, typesOfEmployeeMent} = this.state

    const employType = typesOfEmployeeMent.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employType}&minimum_package=${salaryRanges}&search=${search}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)

    const allJobs = data.jobs

    const allJobsListConvertsTheCamelSale = allJobs.map(each => ({
      id: each.id,
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({
      jobsList: allJobsListConvertsTheCamelSale,
      jobsStatus: loaderStatus.success,
    })
  }

  profileDetails = async () => {
    this.setState({profileStatus: loaderStatus.progress})
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const profileData = data.profile_details

      const updatedData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }

      this.setState({
        profileObject: updatedData,
        profileStatus: loaderStatus.success,
      })
    }
  }

  clickingTheSearch = () => {
    const {search} = this.state

    console.log(search)
    this.jobsDetails()
  }

  changingTheInput = event => {
    this.setState({
      search: event.target.value,
    })
  }

  callingTheLoading = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileWillDisplayCall = () => {
    const {profileObject} = this.state
    return <ProfileComponent passTheProfileInfo={profileObject} />
  }

  profileDataWillCall = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case loaderStatus.progress:
        return this.callingTheLoading()
      case loaderStatus.success:
        return this.profileWillDisplayCall()
      case loaderStatus.failure:
        return <h1 className="white"> Yes fail </h1>
      default:
        return null
    }
  }

  jobsDataCalled = () => {
    const {jobsList} = this.state
    const lengthOfJobsList = jobsList.length
    console.log(lengthOfJobsList)
    const check = lengthOfJobsList > 0
    return check ? (
      <ul className="eachJobCard">
        {jobsList.map(each => (
          <EachJob key={each.id} eachJobDataPass={each} />
        ))}
      </ul>
    ) : (
      <div className="noJobsCon">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1> No Jobs Found </h1>
        <p> We Could not find any jobs.Try other filters.</p>
      </div>
    )
  }

  callingTheJobsList = () => {
    const {jobsStatus} = this.state

    switch (jobsStatus) {
      case loaderStatus.progress:
        return this.callingTheLoading()
      case loaderStatus.success:
        return this.jobsDataCalled()
      case loaderStatus.failure:
        return <p> Fail </p>
      default:
        return null
    }
  }

  selectingCheckBox = value => {
    const {typesOfEmployeeMent} = this.state
    let updatedList = typesOfEmployeeMent
    if (typesOfEmployeeMent.includes(value)) {
      updatedList = typesOfEmployeeMent.filter(eachType => eachType !== value)
    } else {
      updatedList = [...updatedList, value]
    }

    this.setState({typesOfEmployeeMent: updatedList}, this.jobsDetails)
  }

  selectingRadioButton = value =>
    this.setState({salaryRanges: value}, this.jobsDetails)

  render() {
    return (
      <div className="blackCon">
        <HeaderSection />
        <div className="overallConOfJobs">
          <div className="creativeFirstSmallDevices">
            <div className="searchCon">
              <input
                type="search"
                className="searchInput"
                placeholder="Search"
                onChange={this.changingTheInput}
              />
              <button
                onClick={this.clickingTheSearch}
                type="button"
                aria-label="search"
                className="searchIcon"
                data-testid="searchButton"
              >
                <IoIosSearch />
              </button>
            </div>
          </div>
          <div className="eachCon">
            <div className="profileContainerSetInLarge">
              <div>{this.profileDataWillCall()}</div>{' '}
              <div>
                <hr className="line" />
              </div>
              <div>
                <div className="fixed">
                  <SelectingTheDataCheckBoxAndRadioType
                    passTheFunction={this.selectingCheckBox}
                    passTheFunctionToSelectTheRadioButton={
                      this.selectingRadioButton
                    }
                  />
                </div>
              </div>
            </div>
            <div className="adjustJobsWidthInLarge">
              <div className="creativeFirstLargerDevices">
                <div className="searchCon">
                  <input
                    type="search"
                    className="searchInput"
                    placeholder="Search"
                    onChange={this.changingTheInput}
                  />
                  <button
                    onClick={this.clickingTheSearch}
                    type="button"
                    aria-label="search"
                    className="searchIcon"
                  >
                    <IoIosSearch />
                  </button>
                </div>
              </div>
              {this.callingTheJobsList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute

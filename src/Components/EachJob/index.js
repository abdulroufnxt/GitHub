import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const EachJob = props => {
  const {eachJobDataPass} = props

  return (
    <Link to={`/jobs/${eachJobDataPass.id}`} className="linkDecoration">
      <li className="adjustEachCard">
        <div className="logoCon">
          <img
            className="logoImage"
            src={eachJobDataPass.companyLogoUrl}
            alt=""
          />
          <div className="mar">
            <h1 className="title"> {eachJobDataPass.title} </h1>
            <div className="starCon">
              <AiFillStar className="yellow" />
              <p className="title"> {eachJobDataPass.rating} </p>
            </div>
          </div>
        </div>
        <div className="nextCon">
          <div className="finalAdjust">
            <div className="eachAddressCon">
              <IoLocationSharp />
              <p className="names"> Location </p>
            </div>

            <div className="eachAddressCon">
              <BsFillBriefcaseFill />
              <p className="names"> {eachJobDataPass.employmentType} </p>
            </div>
          </div>
          <p> {eachJobDataPass.packagePerAnnum} </p>
        </div>
        <hr className="line" />
        <p className="des"> Description </p>
        <p className="text"> {eachJobDataPass.jobDescription} </p>
      </li>
    </Link>
  )
}

export default EachJob

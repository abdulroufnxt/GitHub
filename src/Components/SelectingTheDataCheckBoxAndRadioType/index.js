import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const SelectingTheDataCheckBoxAndRadioType = props => {
  const {passTheFunction, passTheFunctionToSelectTheRadioButton} = props

  const passTheValue = event => passTheFunction(event.target.value)

  const selectingRadio = event =>
    passTheFunctionToSelectTheRadioButton(event.target.value)
  // console.log(event.target.value)

  return (
    <>
      <div>
        <h1 className="white"> Type of Employment </h1>
        <ul>
          {' '}
          {employmentTypesList.map(each => (
            <li className="listCon">
              <input
                type="checkbox"
                id={each.employmentTypeId}
                onChange={passTheValue}
                value={each.employmentTypeId}
              />
              <label
                className="change"
                key={each.label}
                htmlFor={each.employmentTypeId}
              >
                {' '}
                {each.label}{' '}
              </label>
            </li>
          ))}{' '}
        </ul>
      </div>
      <hr className="line" />
      <div>
        <h1 className="white"> Salary Range </h1>
        <ul>
          {' '}
          {salaryRangesList.map(each => (
            <li className="listCon">
              <input
                value={each.salaryRangeId}
                type="radio"
                id={each.salaryRangeId}
                name="salaryRange"
                onChange={selectingRadio}
              />
              <label
                className="change"
                key={each.label}
                htmlFor={each.salaryRangeId}
              >
                {' '}
                {each.label}{' '}
              </label>
            </li>
          ))}{' '}
        </ul>
      </div>
    </>
  )
}

export default SelectingTheDataCheckBoxAndRadioType

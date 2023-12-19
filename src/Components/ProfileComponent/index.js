import './index.css'

const ProfileComponent = props => {
  const {passTheProfileInfo} = props
  return (
    <div className="profileCon">
      <img
        src={passTheProfileInfo.profileImageUrl}
        alt={passTheProfileInfo.name}
      />
      <h1 className="profileHeading"> {passTheProfileInfo.name} </h1>
      <p> {passTheProfileInfo.shortBio} </p>
    </div>
  )
}

export default ProfileComponent

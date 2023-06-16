// Write your code here
const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarted} = props
  const {id, title, date, isStarted} = appointmentDetails

  const starImgUrl = isStarted
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarted(id)
  }

  return (
    <li className="total-element">
      <div>
        <p>{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem

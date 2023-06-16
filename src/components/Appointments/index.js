// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],

    isFilterActive: false,
  }

  toggleIsStarted = id => {
    this.setState(pevState => ({
      appointmentsList: pevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarted: !eachAppointment.isStarted}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarted: false,
    }

    this.setState(pevState => ({
      appointmentsList: [...pevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeNameInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarted === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="total-container">
        <h1>Add appointment</h1>
        <div className="block-1">
          <form className="form" onSubmit={this.onAddAppointment}>
            <div className="sub-container">
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeNameInput}
                placeholder="Title"
                autoComplete="OFF"
              />
              <label htmlFor="date">DATE</label>
              <input
                type="date"
                id="date"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />
              <button type="button">Add</button>
            </div>
          </form>
          <div className="image-1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
        </div>

        <hr />
        <div>
          <h1>Appointments</h1>
          <button
            type="button"
            className={`filter-style  ${filterClassName}`}
            onClick={this.onClickFilter}
          >
            Starred
          </button>
        </div>

        <ul className="block-2">
          {filteredAppointmentsList.map(eachAppointment => (
            <AppointmentItem
              key={eachAppointment.id}
              appointmentDetails={eachAppointment}
              toggleIsStarted={this.toggleIsStarted}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Appointments

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import './index.css'
import CourseItem from '../CourseItem'

class Home extends Component {
  state = {coursesList: [], isLoading: true, isSuccess: false, isFailed: false}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    const URL = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    const {courses} = data

    if (response.ok === true) {
      const updatedData = courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))

      this.setState({
        isSuccess: true,
        isLoading: false,
        isFailed: false,
        coursesList: updatedData,
      })
    } else {
      this.setState({isFailed: true, isLoading: false, isSuccess: false})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <h1>Oops! Something Went Wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <button type="submit" onClick={this.getCoursesList}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Tail-spin" color="black" height={80} width={80} />
    </div>
  )

  renderCoursesList = () => {
    const {coursesList} = this.state

    return (
      <ul className="courses-list">
        {coursesList.map(eachCourse => (
          <CourseItem eachCourseDetails={eachCourse} key={eachCourse.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, isFailed, isSuccess} = this.state
    return (
      <div className="app-container">
        <h1>Courses</h1>
        <div className="courses-list-container">
          {isLoading && this.renderLoader()}
          {isFailed && this.renderFailureView()}
          {isSuccess && this.renderCoursesList()}
        </div>
      </div>
    )
  }
}

export default Home

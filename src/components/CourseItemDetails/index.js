import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

class CourseItemDetails extends Component {
  state = {
    courseDetails: [],
    isLoading: true,
    isFailureView: false,
    isSuccessView: false,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const URL = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(URL)
    const data = await response.json()

    const courseDetails = data.course_details

    if (response.ok === true) {
      const updateData = {
        id: courseDetails.id,
        imageUrl: courseDetails.image_url,
        name: courseDetails.name,
        description: courseDetails.description,
      }

      this.setState({
        courseDetails: updateData,
        isLoading: false,
        isFailureView: false,
      })
    } else {
      this.setState({isFailureView: true})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="black" height={80} width={80} />
    </div>
  )

  renderCourseDetailView = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails
    return (
      <div className="course-detail-view">
        <img src={imageUrl} alt={name} className="course-detail-image" />
        <div className="course-details">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <>
      <h1>Oops! Something Went Wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <button type="submit" onClick={this.getCourseDetails()}>
        Retry
      </button>
    </>
  )

  render() {
    const {isLoading, isFailureView, isSuccessView} = this.state

    return (
      <div className="course-detail-view-container">
        {isLoading && this.renderLoader()}
        {isSuccessView && this.renderCourseDetailView()}
        {isFailureView && this.renderFailureView()}
      </div>
    )
  }
}

export default CourseItemDetails

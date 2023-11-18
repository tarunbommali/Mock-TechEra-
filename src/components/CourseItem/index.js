import './index.css'
import {Link} from 'react-router-dom'

const CourseItem = props => {
  const {eachCourseDetails} = props
  const {id, name, logoUrl} = eachCourseDetails

  return (
    <Link to={`courses/${id}`} className="link-item">
      <li className="course-item">
        <img className="course-img" src={logoUrl} alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem

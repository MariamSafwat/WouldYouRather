import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import ErrorPage from './ErrorPage'

class Question extends Component {
  render() {

    const { question } = this.props

    if(question === null){
      return <ErrorPage/>
    }
    const { name, id, timestamp, avatar, text1, votes1, text2, votes2 } = question

    console.log(this.props)
    return(
      <Link to={`/questions/${id}`} className='tweet' style={{textDecoration: 'none'}}>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
        
        <div className='tweet-info'>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          <p className='center' style={{color:'#212529'}}>{text1} Or ...</p>
          
          
        </div>
        
      </Link>
    )
    
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  
  const question = questions[id]

  return {
    
    authedUser,
    question: question
    ? formatQuestion(question, users[question.author], authedUser)
    : null
  }
}

export default connect(mapStateToProps)(Question)

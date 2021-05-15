import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'

class UserCard extends Component {
  render() {
    const { user } = this.props
    
    const { name, avatarURL, answers, questions } = user
    

    console.log(this.props)
    return(

      <div className='tweet'>
        <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
        <span>{name}</span>
        
        <div className='tweet-info'>
          <div>Answered Questions: {Object.keys(answers).length}</div>
          <div>Created Questions: {questions.length}</div>
        </div>
        <div className='center' style={{color:'green'}}>Score: {Object.keys(answers).length + questions.length}</div>
        
      </div>
    )
    
  }
}

function mapStateToProps ({users}, {id}){
    return {
        user: users[id]
    }
}

export default connect(mapStateToProps)(UserCard) 

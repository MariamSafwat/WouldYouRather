import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'

class LeaderBoard extends Component {
  
  render() {
      const { userIDs } = this.props
    return (
        <div>
            { userIDs.map((id) => (
                <li key={id} >
                    <UserCard key={id} id={id}/>
                </li>
            ))}
        </div>
    )
      
    }
}

function mapStateToProps({users}){
    const sortedUsers = Object.keys(users).sort((a,b)=>{
      const aScore = Object.keys(users[a].answers).length + users[a].questions.length;
      const bScore = Object.keys(users[b].answers).length + users[b].questions.length;
      return bScore - aScore;
    });

    
    return {
      userIDs: sortedUsers
    }
  }
  

export default connect(mapStateToProps)(LeaderBoard) 
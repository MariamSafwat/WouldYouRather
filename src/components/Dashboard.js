import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Tab, Tabs } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Dashboard extends Component {
  render() {
    //console.log(this.props)    
      return(
        <div>
          
          <Tabs defaultActiveKey="unAns" id="uncontrolled-tab-example">
            <Tab eventKey="unAns" title="Un Answered Questions">
            {this.props.unAnsweredQuestionIds.map((id) => (
              <li key={id}>
                <Question id={id}/>
              </li>
            ))}
            </Tab>
            <Tab eventKey="Ans" title="Answered Questions">
            {this.props.answeredQuestionIds.map((id) => (
              <li key={id}>
                <Question id={id}/>
              </li>
            ))}
            </Tab>
          </Tabs>
        </div>
        
      )    
  }
}

function mapStateToProps ({ questions, authedUser }) {
  return {
    answeredQuestionIds: Object.keys(questions)
      .filter((i) =>(
        questions[i].optionOne.votes.includes(authedUser) || questions[i].optionTwo.votes.includes(authedUser)
      ))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),

    unAnsweredQuestionIds: Object.keys(questions)
    .filter((i) =>(
      !questions[i].optionOne.votes.includes(authedUser) && !questions[i].optionTwo.votes.includes(authedUser)
    ))
    .sort((a,b) => questions[b].timestamp - questions[a].timestamp)


  }
}

export default connect(mapStateToProps)(Dashboard)
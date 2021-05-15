import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'

import { Badge, Button, Form, ProgressBar } from 'react-bootstrap'
import { handleAddAnswer } from '../actions/questions'

import 'bootstrap/dist/css/bootstrap.min.css'
import ErrorPage from './ErrorPage'

class QuestionPage extends Component {
  state = {
    selected: ''
  }

  handleChange = (e) => {
    const selected = e.target.value
    this.setState(() => ({
      selected
    }))
  }


  handleSubmit = (e) => {
    e.preventDefault()

    const { selected } = this.state
    const {dispatch,authedUser,id} = this.props
    if(selected !== null){
      dispatch(handleAddAnswer({
        authedUser:authedUser,
        questionId: id,
        answer: selected
        
      }))

    }
    
  }


  render() {
    const {question} = this.props
    if(question === null){
      return <ErrorPage/>
    }
    const { answer } = this.props
    

    const { name,  timestamp, avatar, text1, votes1, text2, votes2 } = question

    const totalVotes = votes1 + votes2
    console.log('v1:', votes1)
    console.log('v2:', votes2)
    console.log('total:', totalVotes)

    let notAnswered = true
    if (answer !== null){
      notAnswered = false

    }

    return (
      <div>
      
        {notAnswered === true ?
        (
          <div className='tweet'>
              <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
            
              <div className='tweet-info'>
                <span>{name}</span>
                <div>{formatDate(timestamp)}</div>
                <h3 className='center'>Would You Rather</h3>
                <Form>
                  <Form.Check type='radio' label={text1} value='optionOne' name="radio" id="radioOne" checked={this.state.selected === 'optionOne'} onChange={this.handleChange}/>
                  <Form.Check type='radio' label={text2} value='optionTwo' name="radio" id="radioTwo" checked={this.state.selected === 'optionTwo'} onChange={this.handleChange}/>
                  <Button type="submit" onClick={this.handleSubmit}>Vote</Button>
                  
                </Form>

              </div>
          </div>
          
        ) : (
          <div className='tweet'>
              <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
            
              <div className='tweet-info'>
                <span>{name}</span>
                <div>{formatDate(timestamp)}</div>
                <h3 className='center'>Result</h3>
                <div>                 
                    {answer === 'optionOne' && 
                      <div> 
                        <div style={{marginBottom:'25px'}}>                    
                          <p>{text1} <Badge pill variant="success">Your Vote</Badge></p> 
                          <ProgressBar now={((votes1 / totalVotes) * 100).toFixed(2)} label={`${((votes1 / totalVotes) * 100).toFixed(2)}%`}></ProgressBar>
                          <p style={{color:'black'}}>{votes1} out of {totalVotes} votes</p>
                        </div>
                        <div>
                          <p>{text2}</p>
                          <ProgressBar now={((votes2 / totalVotes) * 100).toFixed(2)} label={`${((votes2 / totalVotes) * 100).toFixed(2)}%`}></ProgressBar>
                          <p style={{color:'black'}}>{votes2} out of {totalVotes} votes</p>
                        </div>
                      </div>  
                    }

                    {answer === 'optionTwo' && 
                      <div> 
                        <div style={{marginBottom:'30px'}}>                    
                          <p>{text1} </p> 
                          <ProgressBar now={((votes1 / totalVotes) * 100).toFixed(2)} label={`${((votes1 / totalVotes) * 100).toFixed(2)}%`}></ProgressBar>
                          <p style={{color:'black'}}>{votes1} out of {totalVotes} votes</p>
                        </div>
                        <div>
                          <p>{text2} <Badge pill variant="success">Your Vote</Badge></p>
                          <ProgressBar now={((votes2 / totalVotes) * 100).toFixed(2)} label={`${((votes2 / totalVotes) * 100).toFixed(2)}%`}></ProgressBar>
                          <p style={{color:'black'}}>{votes2} out of {totalVotes} votes</p>
                        </div>
                      </div>  
                    }
 
                </div>

                          
                
              </div>

          </div>
          
        )
        }
        </div>
        
      
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  
  const question = questions[id]
  
  
  
  let answer = ''
  if (question){
    if(question.optionOne.votes.includes(authedUser)){
      answer = 'optionOne'
    }
    else if (question.optionTwo.votes.includes(authedUser)){
      answer = 'optionTwo'
    }
    else {
      answer = null
    }

  }
  

  return {
    
    id,
    authedUser,
    question: question ?  formatQuestion(question, users[question.author], authedUser): null,
    answer
    
  }
}

export default connect(mapStateToProps)(QuestionPage)
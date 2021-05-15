import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText:'',
    optionTwoText:'',
    toHome: false,
  }

  handleChangeOne = (e) => {
    const optionOneText = e.target.value
    
    this.setState(() => ({
      optionOneText
    }))
  }

  handleChangeTwo = (e) => {
    const optionTwoText = e.target.value
    

    this.setState(() => ({
      optionTwoText
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
    console.log('New question:', optionOneText,optionTwoText)
    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state
    
    if (toHome === true) {
      return <Redirect to='/' />
    }
    

    return (
      <div>
        <h3 className='center'>Would You Rather</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter first option"
            value={optionOneText}
            onChange={this.handleChangeOne}
            className='textarea'
          />
          <textarea
            placeholder="Enter second option"
            value={optionTwoText}
            onChange={this.handleChangeTwo}
            className='textarea'
          />
          
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' && optionTwoText === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
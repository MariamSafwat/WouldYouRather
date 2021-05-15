import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends Component {
  
  
  handleChange = (e) => {
    const userId = e.target.value
    
    this.setState(() =>({
      userId
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const  userId  = this.userId.value
    const { dispatch } = this.props
    dispatch(setAuthedUser(userId))

  }

  render() {
    const { userNames } = this.props
    
    return (
      <div>
        <h3 className='center'>Please select user name to login</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select" ref={(id) => (this.userId = id)} htmlSize={3} size="lg" custom >
            {userNames.map((user) => (
              <option value={user.value} key={user.value}>{user.label}</option>
            ))}
              
            </Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit' >Login</Button>
          
        </Form>
      </div>
    )
  }
}

function mapStateToProps({users}){
  return {
    userNames: Object.keys(users).map((id) => ({
			value: id,
			label: users[id].name
		}))
  };
}

export default connect(mapStateToProps)(Login) 
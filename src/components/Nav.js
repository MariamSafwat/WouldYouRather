
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

import 'bootstrap/dist/css/bootstrap.min.css'


class Nav extends Component{
  handleLogout = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }

  render(){
    const { authedUser, users } = this.props

    return (
      <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            LeaderBoard
          </NavLink>
        </li>
        <li>
        <span>Signed in as: {users[authedUser].name}</span>
        </li>
        <li>
          <button onClick={this.handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>



      

    )
  }
}
function mapStateToProps({users, authedUser}){
  return {
    authedUser,
    users
  }
}
export default connect(mapStateToProps)(Nav)
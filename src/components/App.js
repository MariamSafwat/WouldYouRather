import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import Login from './Login'
import LeaderBoard from './LeaderBoard'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
        <Router>
          <Fragment>
            <LoadingBar />
            <div className='container'>
              {this.props.authedUser === null
              ? (
                <Route 
                  render = {
                    () => (
                      <Login />
                    )
                  }
                />
              ) : (
                <Fragment>
                  <Nav />
                  <div>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/questions/:id" component={QuestionPage} />
                  <Route exact path="/add" component={NewQuestion} />
                  <Route exact path="/leaderboard" component={LeaderBoard} />
                  </div>

                </Fragment>
                
              )

              }
              
            </div>
          </Fragment>         
        </Router>
        
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)

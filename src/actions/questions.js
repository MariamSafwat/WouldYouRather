import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS '
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText ) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
      
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

 

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addAnswer({ authedUser,questionId , answer }){
  return {
    type: ADD_ANSWER,
    authedUser,
    questionId,
    answer
  }
}

export function handleAddAnswer( {authedUser, questionId, answer} ) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(addAnswer({authedUser:authedUser, questionId:questionId,answer:answer}))

    return saveQuestionAnswer({authedUser:authedUser, qid:questionId,answer:answer})
    .then(() => dispatch(hideLoading()))
    
  }
}
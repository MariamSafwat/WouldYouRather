export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
  const { id, optionOne,optionTwo, timestamp } = question
  const {text, votes} = optionOne
  const { name, avatarURL } = author
  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    text1: text,
    votes1 : votes.length,
    text2 : optionTwo.text,
    votes2 : optionTwo.votes.length
    
  }
}
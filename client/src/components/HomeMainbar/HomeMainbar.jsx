import React from 'react'
import { useLocation , useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
const HomeMainbar = () => {
  const user = 1
  const navigate = useNavigate()
  const checkAuth=() => {
    if(user===null)
    {
      alert("login or signup to ask a question")
      navigate('/Auth')
    }
    else
    {
      navigate('/AskQuestion')
    }
  }
  const questionList = useSelector( (state) => (state.questionsReducer))

  const location = useLocation()
  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionList.data === null ?
          <h1>Loading...</h1> :
          <>
            <p>{questionList.data.length} questions</p>
            <QuestionList questionList={questionList.data}/>
          </>
        }
      </div>
      
    </div>
  )
}

export default HomeMainbar
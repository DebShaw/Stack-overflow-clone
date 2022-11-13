import React from 'react'
import QuestionDisplay from './QuestionDisplay'
const QuestionList = ({questionList}) => {
  return (
    <>
        {
            questionList.map((question) => (
                <QuestionDisplay question={question} key={question._id}/>
            ))
        }
    </>
  )
}

export default QuestionList
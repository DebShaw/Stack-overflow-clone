import React , {useState} from 'react'
import {useParams , Link , useNavigate, useLocation} from 'react-router-dom'
import {useSelector ,useDispatch} from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assets/sort-up-solid.svg'
import downvote from '../../assets/sort-down-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswers from './DisplayAnswers'
import {deleteQuestion, postAnswer, voteQuestion} from '../../actions/question.js'
import './Question.css'

const QuestionDetails = () => {

    const {id} = useParams()
    const questionList = useSelector( (state) => (state.questionsReducer))
    const User = useSelector((state) => (state.currentUserReducer))
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'http://localhost:3000'
    const [Answer, setAnswer] = useState('')
    
    const handlePost = (e , answerLength) => {
        e.preventDefault()
        if(User === null) {
            alert("Login or Signup to answer a question")
            Navigate('/Auth')
        }
        else {
            if(Answer === '') {
                alert("Answer before submitting")
            }
            else {
                dispatch(postAnswer( {id , noOfAnswers: answerLength +1 , answerBody: Answer, userAnswered: User.result.name, userId:User.result._id}))
            }
        }
        e.target.reset()
    }
    const handleShare = () => {
        
        copy(url + location.pathname)
        alert("Copied URL : " + url + location.pathname)
    }
    const handleDelete = () => {
        dispatch(deleteQuestion(id,Navigate))
    } 
    const handleUpVote= () => {
        if(User === null) {
            alert("Login or Signup to Vote")
            Navigate('/Auth')
        }
        else {
            dispatch(voteQuestion(id, 'upVote' , User.result._id))
        }
    } 
    const handleDownVote = () => {
        if(User === null) {
            alert("Login or Signup to answer a question")
            Navigate('/Auth')
        }
        else {
            dispatch(voteQuestion(id, 'downVote', User.result._id))
        }
    }
  return (
    <div className='question-detail-page'>
        {
            questionList.data === null ?
            <h1>Loading...</h1>:
            <>
                {
                    questionList.data.filter(question => question._id === id).map(question => (
                        <div key={question._id}>
                            <section className='question-detail-container'>
                                <div>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='container-1'>
                                        <div className="question-votes">
                                            <img src={upvote} alt="up-arrow" width='18px' className='votes-icon' onClick ={ handleUpVote }/>
                                            <p>{question.upVote.length - question.downVote.length}</p>
                                            <img src={downvote} alt="down-arrow" width='18px' className='votes-icon' onClick ={ handleDownVote }/>
                                        </div>
                                        <div style={{width: '100%'}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className="question-tags">
                                                {
                                                    question.questionTags.map(tag => (
                                                        <p key={tag}> {tag} </p>
                                                    ))
                                                }
                                            </div>
                                            <div className="question-action-user">
                                                <div>
                                                    <button type='button' onClick={handleShare}>Share</button>
                                                    {
                                                        User?.result?._id === question?.userId && (
                                                            <button type='button' onClick={handleDelete}>Delete</button>
                                                        )
                                                    }
                                                    
                                                </div>    
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color: '#0086d8'}}>
                                                        <Avatar backgroundColor='orange' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers !== 0 && (
                                <section>
                                    <h3>{question.noOfAnswers} Answers</h3>
                                    <DisplayAnswers key={question._id} question={question} handleShare={handleShare}/>
                                </section>
                                )
                            }
                            <section className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit = { (e) => { handlePost( e, question.answer.length ) } }>
                                    <textarea name="" id="" cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea><br/>
                                    <input type="submit" value='Post Your Answer' className='post-ans-btn'/>
                                </form>
                                <p>Browse other question tagged 
                                    {
                                        question.questionTags.map(tag => (
                                            <Link to='/Tags' key={tag} className='ques-tag' style={{textDecoration:'none'}}> {tag} </Link>
                                        ))
                                    }
                                    or <Link to='/AskQuestion' style={{textDecoration: 'none' , color: '#009dff'}}>ask your own <br/>question.</Link>
                                </p>
                            </section>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default QuestionDetails
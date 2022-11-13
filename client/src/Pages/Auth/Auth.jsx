import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import logo from '../../assets/download-removebg-preview.png'
import AboutAuth from './AboutAuth'
import './Auth.css'
import { signup, login } from '../../actions/auth'

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false)

  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email) {
      alert("Enter email")
    }
    if(!password) {
      alert("Enter password")
    }
    if(isSignup) {
      if(!name) {
        alert("Enter your name to continue")
      }
      else if(password.length < 8) {
        alert("Passwords must contain at least eight characters.")
      }
      else if((password.search(/[0-9]/) === -1) && ((password.search(/[a-z]/) === -1) || (password.search(/[A-Z]/) === -1)))
      {
        alert("Password must contain at least 1 number & at least 1 letter")
      }
      else {
        dispatch(signup({name,email,password},navigate))
      }
    }
    else {
      dispatch(login({email,password},navigate))
    }
  }

  return (
    <section className='auth-section'>
      <div>
      {
        isSignup && <AboutAuth/>
      }
      </div>
      <div className='auth-container-2'>
      {
        !isSignup && <img src={logo} alt="stack overflow" className='login-logo' width="50px" />
      }
      
      <form onSubmit={handleSubmit}>
        {
          isSignup && (
            <label htmlFor='name'>
              <h4>Display Name</h4>
              <input type="text" name='name' id='name' onChange={(e)=>{setName(e.target.value)}}/>
            </label>
          )
        }
        <label htmlFor="email">
          <h4>Email</h4>
          <input type="email" name='email' id='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </label>
        <label htmlFor='password'>
          <div style={{display:'flex',  justifyContent:'space-between'}} className='forgot'>
            <h4>Password</h4>
            {
              !isSignup && <p style={{color:'#007ac6', fontSize:'13px'}}>Forgot password</p>
            }
          </div>
          <input type="password" name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </label>
        <label>
          {
            isSignup && <p style={{color:'#666767', fontSize:'13px'}}>Passwords must contain at least eight<br/> characters, including at least 1 letter and 1 <br/>number.</p>
          }
        </label>
        {
        isSignup && (
          <label htmlFor='check'>
            <input type="checkbox" id='check' required/>
            <p style={{ fontSize:'13px'}}>Opt-in to receive occasional<br/> product updates, user research invitations,<br/> company announcements, and digests.</p>
          </label>)
        }
        <button type='submit' className='auth-btn'>{isSignup ? 'Sign up' : 'Log in'}</button>
        {
          isSignup && <p style={{color:'#666767', fontSize:'13px'}}>By clicking “Sign up”, you agree to our 
            <span style={{color:'#007ac6'}}> terms of<br/> service</span>, 
            <span style={{color:'#007ac6'}}> privacy policy</span> and 
            <span style={{color:'#007ac6'}}> cookie policy</span></p>
        }
      </form>
      <p>
        { isSignup ? 'Already have an account' : "Don't have an account" }
          <button type='button' className='handle-switch' onClick={handleSwitch}>
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
      </p>
      </div>
    </section>
  )
}

export default Auth
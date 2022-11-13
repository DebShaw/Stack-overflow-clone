import React , {useState} from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import moment from 'moment'

import BirthDay from '../../assets/cake-candles-solid.svg'
import pen from '../../assets/pen-solid.svg'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from "../../components/Avatar/Avatar"
import EditProfilePage from './EditProfilePage'
import ProfileBio from './ProfileBio'
import './UserProfile.css'

const UserProfile = () => {
    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => (state.currentUserReducer))
    const [Switch, setSwitch] = useState(false)
  return (
    <div className='home-container-1'>
        <LeftSideBar/>
        <div className="home-container-2">
            <section>
                <div className="user-details-container">
                    <div className="user-details">
                        <Avatar backgroundColor="purple" px="40px" py="30px" fontSize="50px" color="white">
                            {currentProfile?.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <div className="user-name">
                            <h1>{currentProfile?.name}</h1>
                            <p><img src={BirthDay} alt="Birth-Day" style={{width: '18px'}}/> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                        </div>
                        
                    </div>
                    {
                        currentUser?.result?._id === id && (
                            <button type='button' onClick={()=>setSwitch(true)} className="edit-profile-btn"><img src={pen} alt="pen" style={{width : '13px', paddingTop: '4px'}}/> Edit Profile</button>
                        )
                    }
                </div>
                <>
                    {
                        Switch ?
                        ( <EditProfilePage currentUser={currentUser} setSwitch={setSwitch}/> ) :
                        ( <ProfileBio currentProfile={currentProfile}/> )
                    }
                </>
            </section>
        </div>

    </div>
  )
}

export default UserProfile
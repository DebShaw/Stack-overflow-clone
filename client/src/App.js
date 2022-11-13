
import {BrowserRouter as Router} from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.css';
import Navbar from './components/Navbar/Navbar';
import AllRoutes from './AllRoutes';
import { fetchAllQuestion } from './actions/question';
import { fetchAllUsers } from './actions/users'

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllQuestion())
    dispatch(fetchAllUsers())
  }, [dispatch])
  
  return (
    <div className="App">
      <Router>  
        <Navbar/>
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;

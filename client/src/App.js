import {BrowserRouter} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAllAgents } from './actions/users';
import { getAllCompartmentSeats } from './actions/compartmentAuth';

import AllRoutes from './AllRoutes';
import Navbar from './Components/Navbar/Navbar';

import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllAgents())
    dispatch(getAllCompartmentSeats())
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <AllRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;

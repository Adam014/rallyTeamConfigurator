import React from 'react';
import './App.sass'
import { Routes, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TeamMembers from './components/teamMembers';
import RacingTeams from './components/racingTeams';

function App() {

  return (
    <div className='app'>  
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TeamMembers />} />
        <Route exact path="/racing-teams" element={<RacingTeams />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

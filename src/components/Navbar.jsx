import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
  // state for the activeLink
  const [activeLink, setActiveLink] = useState(localStorage.getItem('activeTab'));

  // Update localStorage with the active tab when it changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeLink);
  }, [activeLink]);

  // changing the activeLink
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };  

  return (
    <nav>
        <h1><span>Rally</span> Team Configurator</h1>
        <div className='navbar-link'>
          <Link to="/" onClick={() => handleLinkClick('team')} className={activeLink === 'team' ? 'active' : ''}>
            <h2>team members</h2>
          </Link>
          <Link to="/racing-teams" onClick={() => handleLinkClick('racing-teams')} className={activeLink === 'racing-teams' ? 'active' : ''}>
            <h2>racing teams</h2>
          </Link>
        </div>
    </nav>   
  )
}

export default Navbar

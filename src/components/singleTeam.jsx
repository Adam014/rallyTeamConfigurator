import React from 'react';

// custom element for the members
const TeamMemberList = ({ members, title }) => (
  <div className="team-member-section">
    <h4>{title}:</h4>
    {members.map((member) => (
      <div key={member.id}>
        <p className='member'>{member.label}</p>
      </div>
    ))}
  </div>
);

const singleTeam = (props) => {
  // props 
  const { name, Racer, Passenger, Technician, Manager, Photograph } = props.racingTeam

  return (
     <div className='team'>
      <div className='racing-team'>
        <hr />
        <h2>Name: {name}</h2>
        {/* custom element for all the members in the team by type */}
        <TeamMemberList members={Racer} title="Racers" />
        <TeamMemberList members={Passenger} title="Passengers" />
        <TeamMemberList members={Technician} title="Technicians" />
        <TeamMemberList members={Manager} title="Managers" />
        <TeamMemberList members={Photograph} title="Photographs" />
        <hr />
      </div>
    </div>
  )
}

export default singleTeam
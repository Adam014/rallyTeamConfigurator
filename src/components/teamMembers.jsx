import React, { useState } from 'react'
import { addDoc, serverTimestamp, doc, deleteDoc} from "firebase/firestore"
import { teamMembersCollection, db } from '../firebase/firebase';

import { useTeamMembersData } from '../data/teamMembersData';

import SingleMember from './singleMember';

const teamMembers = () => {

  const [teamMember, setTeamMember] = useState({
    firstName: "",
    lastName: "",
    type: "",
    date: "",
  });

  const members = useTeamMembersData();

  const handleTeamMembersChange = (event) => {
    const { name, value } = event.target;

    // Use a regular expression to check if the input contains only letters and spaces
    if (/^[A-Za-z\s]+$/.test(value)) {
      setTeamMember((prevMember) => ({
        ...prevMember,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMember = {
      ...teamMember,
      date: serverTimestamp(), // Store server timestamp
    };

    addDoc(teamMembersCollection, newMember)
      .then(() => {
          setTeamMember({
            firstName: "",
            lastName: "",
            type: "",
          });
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const handleDeleteMember = async (teamMemberId) => {
    const docRef = doc(db, "teamMembers", teamMemberId);
    await deleteDoc(docRef);
  }
  return (
    <main>
      <div className='team-members-container'>
        <div className='form-member-container'>
          <h1>Create a new <span>member</span> of the team</h1>
          {/* form for submitting the new team members */}
          <div className='form-container'>
            <form onSubmit={handleSubmit}>
              <label>
                <p>First Name</p>
                <input type='text' value={teamMember.firstName} placeholder='Enter the member first name' name='firstName' onChange={handleTeamMembersChange} required/>
              </label>
              <label>
                <p>Last Name</p>
                <input type='text' value={teamMember.lastName} placeholder='Enter the member last name' name='lastName' onChange={handleTeamMembersChange} required/>
              </label>
              <label>
                <p>Type</p>
                <select className='select' value={teamMember.type} name='type' onChange={handleTeamMembersChange} required>
                  <option value="" disabled selected>Select a type</option>
                  <option>Racer</option>
                  <option>Technician</option>
                  <option>Manager</option>
                  <option>Passenger</option>
                  <option>Photograph</option>
                </select>
              </label><br /><br />
              <button>Create</button>
            </form>
          </div>
        </div>
        <div className='showcase-member-container'>
          <h1>All <span>members</span></h1>
          {/* div for showing from the db every team member that is created */}
          <div>
            {members.length === 0 ? (
                <div className='no-members'>
                  <p>You don't seem to have any members...</p>
                </div>
            ) : (
              <div className='all-members-container'>
                {members.map((member) => (
                  <SingleMember 
                    key={member.id}
                    teamMember={member}
                    onDelete={() => handleDeleteMember(member.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default teamMembers;

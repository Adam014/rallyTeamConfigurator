import React, {useState} from 'react'
import { useTeamMembersData, useRacingTeamData } from '../data/teamMembersData';
import Select from 'react-select'
import { racingTeamsCollection } from '../firebase/firebase';
import { addDoc, serverTimestamp} from "firebase/firestore"

import SingleTeam from './singleTeam';

// types for the members
const memberTypes = ["Racer", "Technician", "Manager", "Passenger", "Photograph"];

// max selected options for diff types
const maxSelectedOptions = {
  Racer: 3,
  Technician: 2,
  Manager: 1,
  Passenger: 3,
  Photograph: 1,
};

const racingTeams = () => {

  // getting all the members data
  const members = useTeamMembersData();
  const racingTeams = useRacingTeamData();

  console.log(racingTeams)

  // state for the single racingTeam
  const [racingTeam, setRacingTeam] = useState({
    name: "",
    Racer: [],
    Passenger: [],
    Technician: [],
    Manager: [],
    Photograph: [],
    date: "",
  })  

  // func for the input change and setting it into state
  const handleRacingTeamChange = (event) => {
    const { name, value } = event.target;
    setRacingTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }));
  };

  // func for saving the members to array
  const handleOptionChange = (type, selectedOptions) => {
    setRacingTeam((prevTeam) => ({
      ...prevTeam,
      [type]: selectedOptions,
    }));
  };

  // func for submitting the form, saving it into racingTeamsCollection and then reseting the form
  const handleSubmit = (event) => {
    event.preventDefault();

    const newTeam = {
      ...racingTeam,
      date: serverTimestamp(),
    };

    addDoc(racingTeamsCollection, newTeam)
      .then(() => {
        setRacingTeam({
          name: '',
          Racer: [],
          Passenger: [],
          Technician: [],
          Manager: [],
          Photograph: [],
          date: '',
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='racing-teams-container'>
      <div className='  form-container'>
        <h1>Create a new <span>racing</span> team</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Name</p>
            <input type='text' value={racingTeam.name} onChange={handleRacingTeamChange} placeholder='Enter the racing team name' name='name' required/>
          </label>
          {memberTypes.map((type) => (
            <div key={type}>
              <p>{type}s</p>
              <Select
                value={racingTeam[type]}
                className="select"
                // filtering the members via type
                options={members
                  .filter((member) => member.type === type)
                  .map((member) => ({
                    value: member.id,
                    label: `${member.firstName} ${member.lastName}`,
                  }))}
                isMulti

                // saving the selectedOptions to array
                onChange={(selectedOptions) =>
                  handleOptionChange(type, selectedOptions)
                }
                // for diff types different max selected members for the type
                isOptionDisabled={() =>
                  racingTeam[type].length >= maxSelectedOptions[type]
                }
                // for type photograph there is not required to fill
                required={type !== 'Photograph'}
                // type of the member
                name={type}
              />
              <br />
            </div>
          ))}
          <button>Create Team</button>
        </form>
      </div>
      <div className='racing-teams-showcase'>
        <h1>All <span>Racing</span> teams</h1>
        <div>
          {racingTeams.length === 0 ? (
              <div className='no-members'>
                  <p>You don't seem to have racing teams...</p>
              </div>
          ) : (
              <div className='all-teams-container'>
                {racingTeams.map((team) => (
                  <SingleTeam
                    key={team.id}
                    racingTeam={team}
                  />
                ))}
              </div>)}
        </div>
      </div>
    </div>
  )
}

export default racingTeams

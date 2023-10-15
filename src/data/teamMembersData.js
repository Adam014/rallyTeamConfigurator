import { useState, useEffect } from 'react';
import { onSnapshot } from "firebase/firestore";
import { racingTeamsCollection, teamMembersCollection } from '../firebase/firebase';

// function for getting the data from the db
export function useTeamMembersData() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(teamMembersCollection, (snapshot) => {
      const membersArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMembers(membersArray);
    });
    return unsub;
  }, []);

  return members;
}

// function for getting the data from the db
export function useRacingTeamData() {
  const [racingTeams, setRacingTeams] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(racingTeamsCollection, (snapshot) => {
      const racingTeamsArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRacingTeams(racingTeamsArray);
    });
    return unsub;
  }, []);

  return racingTeams;
}
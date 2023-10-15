import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3t8q6g3rQbDsLQp0_D88M3O7ljbtkoIU",
  authDomain: "rally-team-configurator.firebaseapp.com",
  projectId: "rally-team-configurator",
  storageBucket: "rally-team-configurator.appspot.com",
  messagingSenderId: "708876838480",
  appId: "1:708876838480:web:a48a14b17df11f90e39355"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const teamMembersCollection = collection(db, "teamMembers");
export const racingTeamsCollection = collection(db, "racingTeams");
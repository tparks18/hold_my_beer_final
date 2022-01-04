
import { createContext, useEffect, useState } from "react";
import {apiGetUserVotesVerbose, apiPostVote} from "../api/apiVote"
export const UserContext = createContext();

const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState({});
  const [votes, setVotes] = useState([]);
  const [castVote, setCastVote] = useState({});



  useEffect(() => {
      const runHook= async ()=>{
        await apiPostVote({video_id:castVote.video_id, vote:castVote.vote},user.token)
        setCastVote({})
        const res = await apiGetUserVotesVerbose(user.user_id)
        setVotes(res.data)
      }
      if (!castVote?.video_id || !user.token) return
    runHook()
    return
  },
    [castVote]
  )

  useEffect(
    ()=>{
      const runHook=async ()=>{
        const res = await apiGetUserVotesVerbose(user.user_id)
        setVotes(res.data)
      }
      if (!user.user_id) return;
      runHook();
      return
    }
    ,[user.user_id]
  )

  const values = {
    user,
    setUser,
    votes,
    setCastVote
  };

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};

export default AppContextProvider;
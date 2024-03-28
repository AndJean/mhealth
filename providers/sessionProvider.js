/** @format */

import { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "../supabase";
import moment from "moment";



const SessionContext = createContext(null);
export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);

  //function to get all user informations
  async function getUserInfos() {
    //first get the session informations to retrieve the user id
    const currentSession = await supabase.auth.getSession();
    const userId = (await supabase.auth.getSession()).data.session.user.id;

    //make a request with the user id to retrieve all the corresponding informations from the database
    const getUser = await supabase.from("profiles").select("*").eq("id", userId);

    //and then if there is no errors, store these informations into our state "user"
    if (getUser.error) {
      console.log(getUser.error.message);
    } else {
      setUser({
        ...getUser.data[0],
        email: currentSession.data.session.user.email,
      });
    }
  }

  //executed once when the user is connected
  useEffect(() => {
    if(user){
      supabase
      .channel('profile-changes')
      .on('postgres_changes', {event: '*', schema: 'public'}, (payload) => {
          if(payload.table === 'profiles' && payload.new.id === user.id){
            setUser(payload.new)
          }
        }
      )
      .subscribe()      
    }
  }, [user])

  //executed everytime the user state change
  useEffect(() => {
    if(user){
      getUserInfos()      
    }
  }, [user])


  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}

      {/*Show a modal at the top of all screens*/}
      {/*showModal.consultationReminder && <ConsultationReminderModal />*/}
    </SessionContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(SessionContext);
}



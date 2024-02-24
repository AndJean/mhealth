/** @format */

import { useState, createContext, useContext, useEffect } from "react";
import { supabase } from "../supabase";

const SessionContext = createContext(null);
export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);

  //function to get all user informations
  async function getUserInfos() {
    //first get the session informations to retrieve the user id
    const currentSession = await supabase.auth.getSession();
    const userId = (await supabase.auth.getSession()).data.session.user.id;

    //make a request with the user id to retrieve all the corresponding informations from the database
    const getUser = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);
    //SELECT * FROM "profiles" WHERE id = userId

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

  //launch once when the user is connected
  useEffect(() => {
    getUserInfos();
  }, []);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(SessionContext);
}

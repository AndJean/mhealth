/** @format */

import { useState, createContext, useContext, useEffect } from "react";
import ConsultationReminderModal from "../components/modals/consultationReminderModal";
import { supabase } from "../supabase";
import moment from "moment";


const SessionContext = createContext(null);
export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState({
    consultationReminder: false
  })
  const [consultations, setConsultations] = useState([])

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

  async function getConsultations(){
    //get all consultations with supabase
    try {
      let req = null
      if(user.type === 'Patient'){
        req = await supabase.from('consultations').select('*').eq('patient_id', user.id)
      }else{
        req = await supabase.from('consultations').select('*').eq('doctor_id', user.id)
      }

      if(req){
        if(req.error){
          throw Error(req.error.message)
        }
        setConsultations(req.data)        
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function getScheduledConsultations(){
    consultations.map((consultation, index)=> {
      const currentDate = new Date()
      const currentHour = moment().hour()+'h'
      const consultationDate = new Date(consultation.date.appointmentDate)
      const consultationHour = consultation.date.appointmentTime

      if(currentDate.toLocaleDateString() === consultationDate.toLocaleDateString() && currentHour === consultationHour){
        setShowModal(prev => ({...prev, consultationReminder: true}))
      }

      console.log(consultation)
    })
  }

  //get all the consultations
  useEffect(()=>{
    if(consultations.length === 0 && user){
      getConsultations()        
    }
  }, [user])

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

  //check inside the consultations array if there is one corresponding to the actual hour and date
  useEffect(()=>{
    if(consultations.length > 0 && user){
      getScheduledConsultations()      
    }
  }, [consultations])


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



import { createContext, useContext, useState, useEffect } from "react"
import { useCurrentUser } from "./sessionProvider"
import { supabase } from "../supabase"
import moment from "moment"

const ConsultationContext = createContext(null)
export function ConsultationProvider({children}){
    const [consultations, setConsultations] = useState(null)
    const [showConsultationReminder, setConsultationReminder] = useState(false)
    const {user} = useCurrentUser()
    
    //get all consultations with supabase
    async function getConsultations(){
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
    
    //check if there is a consultation for the current date and time
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

    useEffect(()=>{
        getConsultations()
    }, [])

    useEffect(()=>{
        if(consultations){
            getScheduledConsultations()            
        }
    }, [consultations])

    //listen to the consultations table changes
    useEffect(() => {
        supabase
        .channel('consultations-changes')
        .on('postgres_changes', {event: '*', schema: 'public'}, (payload) => {
            if(payload.table === 'consultations' && payload.new.doctor_id === user.id || payload.new.patient_id === user.id){
                setConsultations(payload.new)
            }
            }
        )
        .subscribe()      
    }, [])

    return (
        <ConsultationContext.Provider value={{consultations, setConsultations}}>
            {children}
        </ConsultationContext.Provider>
    )
}


export function useConsultationProvider(){
    return useContext(ConsultationContext)
}

import { IAddUser, TError } from "../model/AddUserModel"
export const UserValidation = (inputFields:IAddUser, fullDetails:string, tech:object[]):TError => {
    const errMsg: TError = {}
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

    if(!inputFields.uname.trim()){
        errMsg.uname = "Name is required"
    }else if(inputFields.uname.length < 3){
        errMsg.uname = "Minimum 3 character required"
    }
    if(!inputFields.uemail.trim()){
        errMsg.uemail = "Email is Require"
    } else if(!emailPattern.test(inputFields.uemail)){
        errMsg.uemail = "Email not correct"
    }
    if(!inputFields.uphone.trim()){
        errMsg.uphone = "Phone is Require"
    } else if(!phonePattern.test(inputFields.uphone)){
        errMsg.uphone = "Phone not correct"
    }
    if(!inputFields.ugender){
        errMsg.ugender = "Please select gender"
    }
    if(tech.length === 0){
        errMsg.tech = "Please select technology"
    }
    if(!inputFields.uperformance){
        errMsg.uperformance = "Performance is Require"
    }
    if(!inputFields.udetails.trim()){
        errMsg.udetails = "User details is Require"
    }
    if(!fullDetails.trim() || fullDetails === '<p><br></p>'){
        errMsg.fullDetails = "User full details is Require"
    }
    return errMsg
}

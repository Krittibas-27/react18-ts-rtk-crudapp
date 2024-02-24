import { TOption } from "../../model/AddUserModel"

export interface IUserModel  {
    id: number | string
    username: string
    email : string
    phone : string
    active : boolean
}
export interface ISingleUserModel {
    active: boolean
    email: string
    fullDetails: string
    gender: string
    id: number | string
    performance:string
    phone:string
    technology:TOption[]
    userdetails:string
    username:string
}
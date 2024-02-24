export interface TOption  {
    value: string
    label: string
}
export interface IAddUser {
    id?: string | number
    uname: string;
    uemail: string;
    uphone: string;
    ugender: string;
    uperformance: string;
    ustatus: boolean;
    udetails: string;
}
export interface IALLFields extends IAddUser {
    fullDetails: string
}

export interface TError {
    [key: string]: string;
}

export interface TTouched {
    [key: string]: boolean;
}
export interface IEditUser {
    id?: string | number
    username: string;
    uemail: string;
    uphone: string;
    ugender: string;
    uperformance: string;
    ustatus: boolean;
    udetails: string;
    fullDetails: string
    technology: TOption[]
}

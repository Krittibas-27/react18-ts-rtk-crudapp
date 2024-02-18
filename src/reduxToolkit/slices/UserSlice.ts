import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserModel } from "../models/UserModel";
import { addNewUser, getAllUser, viewUser } from "../actions/UserActions";
import { IALLFields } from "../../model/AddUserModel";

interface IinitialState {
    isLoading : boolean
    allUser : IUserModel[]
    singleUser : IUserModel
    adduser : IALLFields
}

const initialState : IinitialState = {
    isLoading: false,
    allUser : [],
    singleUser: {
        id: "",
        username: "",
        email : "",
        phone : "",
        active : false 
    },
    adduser:{
        id:"",
        uname: "",
        uemail: "",
        uphone: "",
        ugender: "",
        uperformance: "",
        ustatus: false,
        udetails: "",
        fullDetails:""
    }
}
const UserSlice = createSlice({
    name: 'UserSlice',
    initialState: initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllUser.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(getAllUser.fulfilled, (state, actions:PayloadAction<IUserModel[]>)=>{
            state.isLoading = false
            state.allUser = actions.payload
        })
        builder.addCase(getAllUser.rejected, (state)=>{
            state.isLoading = false
            state.allUser = []
        })
        // single user
        builder.addCase(viewUser.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(viewUser.fulfilled, (state, actions:PayloadAction<IUserModel>)=>{
            state.isLoading = false
            state.singleUser = actions.payload
        })
        builder.addCase(viewUser.rejected, (state)=>{
            state.isLoading = false
        })
        // add user
        builder.addCase(addNewUser.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(addNewUser.fulfilled, (state, actions:PayloadAction<IALLFields>)=>{
            state.isLoading = false
            state.adduser = actions.payload
        })
        builder.addCase(addNewUser.rejected, (state)=>{
            state.isLoading = false
        })
    }
})

export default UserSlice.reducer
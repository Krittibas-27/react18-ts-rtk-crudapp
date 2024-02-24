import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISingleUserModel, IUserModel } from "../models/UserModel";
import { addNewUser, deletetUser, editUser, getAllUser, viewUser } from "../actions/UserActions";
import { IALLFields, IEditUser } from "../../model/AddUserModel";

interface IinitialState {
    isLoading : boolean
    allUser : IUserModel[]
    singleUser : ISingleUserModel
    adduser : IALLFields
    editSingleuser: IEditUser
}

const initialState : IinitialState = {
    isLoading: false,
    allUser : [],
    singleUser: {
        id: "",
        active: false,
        email: "",
        fullDetails: "",
        gender: "",
        performance:"",
        phone:"",
        technology:[],
        userdetails:"",
        username:"",
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
    },
    editSingleuser:{
        id:"",
        username: "",
        uemail: "",
        uphone: "",
        ugender: "",
        uperformance: "",
        ustatus: false,
        udetails: "",
        fullDetails:"",
        technology:[]
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
        builder.addCase(viewUser.fulfilled, (state, actions:PayloadAction<ISingleUserModel>)=>{
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
        // edit user
        builder.addCase(editUser.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(editUser.fulfilled, (state, actions:PayloadAction<any>)=>{
            state.isLoading = false
            state.editSingleuser = actions.payload
        })
        builder.addCase(editUser.rejected, (state)=>{
            state.isLoading = false
        })
        // delete user
        builder.addCase(deletetUser.pending, (state)=>{
            state.isLoading = true
        })
        builder.addCase(deletetUser.fulfilled, (state, actions:PayloadAction<any>)=>{
            state.isLoading = false
            state.allUser = [...state.allUser]
        })
        builder.addCase(deletetUser.rejected, (state)=>{
            state.isLoading = false
        })
    }
})

export default UserSlice.reducer
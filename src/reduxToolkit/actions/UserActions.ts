import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserModel } from "../models/UserModel";
import { BaseApiJson } from "../../RouteApi";
import { IALLFields } from "../../model/AddUserModel";


export const getAllUser = createAsyncThunk<IUserModel[]>('get/alluser', async()=>{
    const res = await BaseApiJson.get('/userdata')
    return res.data
})

export const viewUser = createAsyncThunk<IUserModel,{}>('get/single-user', async({vid}: any)=>{
    const res = await BaseApiJson.get(`/userdata/${vid}`)
    return res.data
})
export const addNewUser = createAsyncThunk('post/user', async({newData}:any )=>{
    //console.log('newData',newData)
    const res = await BaseApiJson.post('/userdata', newData)
    console.log('res', res.data)
    return res.data
})
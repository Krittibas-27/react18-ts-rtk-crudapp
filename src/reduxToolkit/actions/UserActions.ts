import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISingleUserModel, IUserModel } from "../models/UserModel";
import { BaseApiJson } from "../../RouteApi";
import { IALLFields, IEditUser } from "../../model/AddUserModel";


export const getAllUser = createAsyncThunk<IUserModel[]>('get/alluser', async()=>{
    const res = await BaseApiJson.get('/userdata')
    return res.data
})

export const viewUser = createAsyncThunk<ISingleUserModel,{}>('get/single-user', async({vid}: any)=>{
    const res = await BaseApiJson.get(`/userdata/${vid}`)
    return res.data
})
export const addNewUser = createAsyncThunk('post/user', async({newData}:any )=>{
    //console.log('newData',newData)
    const res = await BaseApiJson.post('/userdata', newData)
    console.log('res', res.data)
    return res.data
})
export const editUser = createAsyncThunk<ISingleUserModel,{}>('edit/single-user', async({newData, eid}:any)=>{
    const res = await BaseApiJson.put(`/userdata/${eid}`, newData)
    return res.data
})
export const deletetUser = createAsyncThunk<ISingleUserModel,{}>('delete/single-user', async({deleteId}:any)=>{
    const res = await BaseApiJson.delete(`/userdata/${deleteId}`)
    return res.data
})
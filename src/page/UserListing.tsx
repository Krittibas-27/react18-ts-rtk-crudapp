import React, { useEffect } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../reduxToolkit/hooks'
import { getAllUser } from '../reduxToolkit/actions/UserActions'
import SpinerLoading from '../components/SpinerLoading'
import { IUserModel } from '../reduxToolkit/models/UserModel'
import { useNavigate } from 'react-router-dom'

type TViewUser = {
    id: number | string
    username: string
    email : string
    phone : string
    active : boolean
}

const UserListing = () => {
    const dispatch = useAppDispatch()
    const { isLoading, allUser } = useAppSelector(state => state.users)
    const navigate = useNavigate()

    const viewUser=(viewData : TViewUser)=>{
        navigate(`/user/${viewData.id}`)
    }
    const addNewUser = ()=>{
        navigate('/user/addnewuser')
    }
    useEffect(() => {
        dispatch(getAllUser())
    }, [])
    
    return (
        <div className="my-4">
            <Container>
                <h1 className='text-center'>All User Listing</h1>
                <div className="text-center my-4">
                    <Button variant="primary" size='sm' className='mx-1' onClick={()=>addNewUser()}>Add New User</Button> 
                </div>
                {
                    isLoading ? <SpinerLoading /> :
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allUser.length === 0 ? 
                                    <tr>
                                        <td colSpan={6}><h2>User not found</h2></td>
                                    </tr>
                                    :
                                    allUser.map((item:IUserModel, index: number)=>{
                                        return (
                                            <tr key={item.id}>
                                                <td>{index+1}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.active ? <div className='text-success'>Active</div> : <div className='text-danger'>Inactive</div>}</td>
                                                <td>
                                                    <Button variant="primary" size='sm' className='mx-1' onClick={()=>viewUser(item)}>View</Button>
                                                    <Button variant="success"  size='sm' className='mx-1'>Edit</Button>
                                                    <Button variant="danger" size='sm' className='mx-1'>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>
                        </Table>
                }

            </Container>
        </div>
    )
}

export default UserListing
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../reduxToolkit/hooks'
import { viewUser } from '../reduxToolkit/actions/UserActions'
import { Button, Container, Table } from 'react-bootstrap'
import SpinerLoading from '../components/SpinerLoading'

const ViewSingleUser = () => {
    const { vid } = useParams()
    const dispatch = useAppDispatch()
    const { isLoading, singleUser} = useAppSelector(state => state.users)
    const navigate = useNavigate()

    const singleUserView = () => {
        dispatch(viewUser({ vid: vid }))
    }
    useEffect(() => {
        singleUserView()

        return () => {
            singleUserView()
        }
    }, [])
    return (
        <div className="my-4">
            <h3 className='text-center my-4'>View details -  {`${singleUser.username}`} </h3>
            <Container>
                    {
                        isLoading ? <SpinerLoading /> :
                        <Table bordered>
                        <tbody>
                            {
                                singleUser.username &&
                                <tr>
                                    <td>User Name</td>
                                    <td>{singleUser.username}</td>
                                </tr>
                            }
                            {
                                singleUser.email &&
                                <tr>
                                    <td>Email</td>
                                    <td>{singleUser.email}</td>
                                </tr>
                            }
                            {
                                singleUser.phone &&
                                <tr>
                                    <td>Phone</td>
                                    <td>{singleUser.phone}</td>
                                </tr>
                            }
                            {
                                <tr>
                                    <td>Status</td>
                                    <td>{singleUser.active ? <div className='text-success'>Active</div> : <div className='text-danger'>Inactive</div>}</td>
                                </tr>
                            }
                            
                        </tbody>
                    </Table>
                    }
                    <Button variant="primary" size='sm' className='mx-1' onClick={()=>navigate('/')}>Back</Button> 
            </Container>
        </div>
    )
}

export default ViewSingleUser
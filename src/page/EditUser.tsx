import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { IAddUser, IEditUser, TError, TTouched } from '../model/AddUserModel'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import ReactQuill from 'react-quill';

import { UserValidation } from '../validation/UserValidation';
import { useAppDispatch, useAppSelector } from '../reduxToolkit/hooks';
import { addNewUser, editUser, viewUser } from '../reduxToolkit/actions/UserActions';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
type  TOption = {
    value: string
    label: string
}
const techOptions:TOption[] = [
    {
        value: "angular",
        label: "Angular",
    },
    {
        value: "node",
        label: "Node",
    },
    {
        value: "react",
        label: "React",
    },
    {
        value: "vue",
        label: "Vue",
    },
];

const EditUser = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {eid} = useParams()
    const state = useLocation()

    const {isLoading, singleUser, editSingleuser } = useAppSelector(state=>state.users)
    const animatedComponents = makeAnimated();
    const [editdata, seteditdata]=useState<any>(state.state.editSingleUser)
    const [inputFields, setInputFields] = useState<IAddUser>({
        uname: editdata.username || '',
        uemail: editdata.email  || '',
        uphone: editdata.phone || '',
        ugender: editdata.gender || '',
        uperformance: editdata.performance || '',
        ustatus: editdata.active || false,
        udetails: editdata.userdetails  || '',
    })
    const [tech, setTech] = useState<TOption[]>(editdata.technology || []);
    const [fullDetails, setFullDetails] = useState<string>(editdata.fullDetails || "")
    const [errMsg, setErrMsg] = useState<TError>(UserValidation(inputFields,fullDetails,tech))
    const [touched, setTouched] = useState<TTouched>({})
    

    const handelChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const { name, value, type, checked } = e.target;
        setInputFields(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        setErrMsg(UserValidation({...inputFields, [e.target.name] : e.target.value}, fullDetails, tech ))
    }
    const techHandeler = (options: TOption[] | null) => {
        options ? setTech(options) : setTech([])
    }

    const SubmitHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        setTouched({uname:true, uemail:true, uphone:true, ugender:true, tech:true, uperformance:true, udetails:true, fullDetails :true })
        setErrMsg(UserValidation(inputFields,fullDetails, tech))
        if(Object.keys(UserValidation(inputFields,fullDetails,tech)).length===0){
            const newData = {
                username: inputFields.uname,
                email: inputFields.uemail,
                phone: inputFields.uphone,
                active: inputFields.ustatus,
                gender: inputFields.ugender,
                technology: tech,
                performance: inputFields.uperformance,
                userdetails : inputFields.udetails,
                fullDetails : fullDetails
            }
            dispatch(editUser({newData, eid}))
            setInputFields({
                uname: "",
                uemail: "",
                uphone: "",
                ugender: "",
                uperformance: "",
                ustatus: false,
                udetails: "",
            })
            setFullDetails('')
            setTech([])
            navigate('/')
        }
        
    }

    console.log('state=>', state.state.editSingleUser)
  return (
    <div className="my-4">
        <h1 className='text-center'>Edit Listing</h1>
        <Container>
                <Col md={{ span: 8, offset: 2 }}>
                    <Card body className='p-4'>
                        <Form onSubmit={SubmitHandler}>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name" name='uname' value={inputFields.uname} onChange={handelChange} 
                                        onBlur={()=>setTouched({ ...touched, uname: true })}
                                        />
                                        {errMsg.uname && touched.uname  ? <span className='text-danger'>{errMsg.uname}</span> : null}
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" placeholder="Email" name='uemail' value={inputFields.uemail} onChange={handelChange} 
                                        />
                                        {errMsg.uemail && touched.uemail  ? <span className='text-danger'>{errMsg.uemail}</span> : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" placeholder="Phone" name='uphone' value={inputFields.uphone} onChange={handelChange} 
                                        />
                                        {errMsg.uphone && touched.uphone  ? <span className='text-danger'>{errMsg.uphone}</span> : null}
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select aria-label="Default select example" name='ugender' value={inputFields.ugender} onChange={(e: ChangeEvent<HTMLSelectElement>) => {setInputFields({ ...inputFields, ugender: e.target.value })
                                        setErrMsg(UserValidation({ ...inputFields, ugender: e.target.value },fullDetails,tech))
                                    }}
                                        onBlur={()=>setTouched({ ...touched, ugender: true })}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Form.Select>
                                        {errMsg.ugender && touched.ugender  ? <span className='text-danger'>{errMsg.ugender}</span> : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Technology</Form.Label>
                                        <Select
                                            isMulti
                                            options={techOptions}
                                            components={animatedComponents}
                                            value={tech}
                                            name="utechnology"
                                            onChange={(options: any ) => techHandeler(options)}
                                            onBlur={()=>setTouched({ ...touched, tech: true })}
                                        />
                                        {errMsg.tech && touched.tech  ? <span className='text-danger'>{errMsg.tech}</span> : null}
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>User Performance</Form.Label> <br />
                                        <Form.Check
                                            inline
                                            label="Good"
                                            name="good"
                                            id='good'
                                            type="radio"
                                            value="good"
                                            checked={inputFields.uperformance === 'good' ? true : false}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                setInputFields({ ...inputFields, uperformance: e.target.value })
                                                setErrMsg(UserValidation({ ...inputFields, uperformance: e.target.value },fullDetails, tech))
                                            }}
                                            onBlur={()=>setTouched({ ...touched, uperformance: true })}
                                        />
                                        <Form.Check
                                            inline
                                            label="Better"
                                            name="better"
                                            id='better'
                                            type="radio"
                                            value="better"
                                            checked={inputFields.uperformance === 'better' ? true : false}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                setInputFields({ ...inputFields, uperformance: e.target.value })
                                                setErrMsg(UserValidation({ ...inputFields, uperformance: e.target.value },fullDetails, tech))
                                            }}
                                            onBlur={()=>setTouched({ ...touched, uperformance: true })}
                                        />
                                        <Form.Check
                                            inline
                                            label="Best"
                                            name="best"
                                            id='best'
                                            type="radio"
                                            value="best"
                                            checked={inputFields.uperformance === 'best' ? true : false}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                setInputFields({ ...inputFields, uperformance: e.target.value })
                                                setErrMsg(UserValidation({ ...inputFields, uperformance: e.target.value },fullDetails, tech))
                                            }}
                                            onBlur={()=>setTouched({ ...touched, uperformance: true })}
                                        />
                                        {errMsg.uperformance && touched.uperformance  ? <span className='text-danger'>{errMsg.uperformance}</span> : null}
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>User Status</Form.Label> <br />
                                        <Form.Check
                                            inline
                                            label={inputFields.ustatus ? "Active" : "Inactive"}
                                            name="ustatus"
                                            id='ustatus'
                                            type="checkbox"
                                            checked={inputFields.ustatus}
                                            onChange={handelChange} 
                                            onBlur={()=>setTouched({ ...touched, ustatus: true })}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>User Details</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="User details here"
                                            style={{ height: '100px' }}
                                            name='udetails'
                                            value={inputFields.udetails}
                                            onChange={handelChange} 
                                            onBlur={()=>setTouched({ ...touched, udetails: true })}
                                        />
                                        {errMsg.udetails && touched.udetails  ? <div className='text-danger'>{errMsg.udetails}</div> : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>User Full Details</Form.Label>
                                        <ReactQuill theme="snow" placeholder='User full details'  value={fullDetails} onChange={setFullDetails}  
                                        onBlur={()=>setTouched({ ...touched, fullDetails: true })} 
                                        />
                                        {errMsg.fullDetails && touched.fullDetails  ? <div className='text-danger'>{errMsg.fullDetails}</div> : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Button className='mx-2' variant="primary" type="submit"> Submit</Button>
                                    <Button variant="secondary" type="button">
                                        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
                                            Back
                                        </Link>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Container>
    </div>
  )
}

export default EditUser
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProjectService from '../services/ProjectService'
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import GroupService from '../services/GroupService'
const AddProjectComponent = () => {

    const [number, setNumber] = useState('')
    const [name, setName] = useState('')
    const [customer, setCustomer] = useState('')
    const [visaLeader, setVisaLeader] = useState('')
    const [members, setMembers] = useState([])
    const [status, setStatus] = useState('NEW')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const navigate = useNavigate();
    const { id } = useParams();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            saveOrUpdateProject(event);
        }
        setValidated(true);

    };

    const saveOrUpdateProject = (e) => {
        e.preventDefault();

        const project = { number, name, customer, visaLeader, members, status, startDate, endDate }

        if (id) {
            ProjectService.updateProject(id, project).then((response) => {
                navigate('/projects')
            }).catch(error => {
                console.log(error)
            })

        } else {
            project.number = parseInt(project.number);
            ProjectService.createProject(project).then((response) => {

                console.log(response.data)

                navigate('/projects');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {

        ProjectService.getProjectById(id).then((response) => {
            setNumber(response.data.number)
            setName(response.data.name)
            setCustomer(response.data.customer)
            setVisaLeader(response.data.visaLeader)
            setMembers(response.data.members)
            setStatus(response.data.status)
            setStartDate(response.data.startDate)
            setEndDate(response.data.endDate)
        }).catch(error => {
            setNumber('')
            setName('')
            setCustomer('')
            setVisaLeader('')
            setMembers([])
            setStatus("NEW")
            setStartDate('')
            setEndDate('')
        })


    }, [id])

    const title = <h2>{id != 'new' ? 'Edit Project information' : 'New Project'}</h2>;
    const action = <div>{id != 'new' ? 'Edit Project' : 'Create Project'}</div>


    const [groups, setGroups] = useState([]);
    useEffect(() => {
        GroupService.getAllGroups().then((response) => { setGroups(response.data) });
    }, [])
    console.log("group", groups)
    const groupList = groups.map(group => {
        return<option value={group}>{group}</option>
    });

    return (
        <div>
            <div className="content project">
                <Container fluid>
                    <Row>
                        <Col xl={11}>
                            <p className="name-project">
                                <h1>{title}</h1>
                            </p>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <div className="container">
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Project Number</div>
                                    <div class="col-md-3">
                                        <input type="text reset" class="form-control" disabled={id !== 'new' ? true : false} value={number}
                                            onChange={(e) => setNumber(e.target.value)} required></input>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>
                                <div class="row form-group ">
                                    <div class="col-md-2 template required">Project name</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={name}
                                            onChange={(e) => setName(e.target.value)} required></input>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Customer</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={customer}
                                            onChange={(e) => setCustomer(e.target.value)} required></input>
                                        <div class="valid-feedback">Valid.</div>
                                        <div class="invalid-feedback">Please fill out this field.</div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Group</div>
                                    <div class="col-md-3">
                                        <select name="group" id="group" class="form-control" value={visaLeader}
                                            onChange={(e) => setVisaLeader(e.target.value)}>
                                                {groupList}
                                            {/* <option value="new">New</option> */}
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template ">Members</div>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" value={members}
                                            onChange={(e) => setMembers(e.target.value)}></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Status</div>
                                    <div class="col-md-3">
                                        <select name="status" id="status" class="form-control" value={status}
                                            onChange={(e) => setStatus(e.target.value)} disabled={id !== 'new' ? false : true} >
                                            <option value="NEW">NEW</option>
                                            <option value="PLA">Planned</option>
                                            <option value="INP">In progress</option>
                                            <option value="FIN">Finished</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col-md-2 template required">Start date</div>
                                    <div class="col-md-3"><input type="date" class="form-control" value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)} required></input></div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2 template ">End date</div>
                                    <div class="col-md-3"><input type="date" class="form-control" value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}></input></div>
                                </div>
                            </div>
                        </Row>
                        <hr></hr>
                        <Row>
                            <div class="container">
                                <div class="row">
                                    <div className="col-md-7"></div>
                                    <div class="col-md-2">
                                        <Link to={"/projects/" + id} className="btn btn-light"> Cancel </Link>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button submit" class="btn btn-primary" >{action}</button>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default AddProjectComponent
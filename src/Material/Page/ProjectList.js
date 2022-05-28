import React, { Component } from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Style/ProjectList.css';
import { format } from 'date-fns';
import { Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ProjectService from '../services/ProjectService'
const ProjectList = () => {

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        ProjectService.getAllProjects().then((response) => { setProjects(response.data) });
    }, [])

    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState('');

    function handleInputChange(e) {
        setKeyword(e.target.value)
    }
    async function handleSearch() {
        const { data } = await ProjectService.getProjectByKeyWordAndStatus(keyword,status);
        console.log(data)
        setProjects(data)
    }
    const projectList = projects.map(project => {
        return <tr key={project.id}>
            <td><input type="checkbox"></input></td>
            <td style={{ whiteSpace: 'nowrap' }}><Link to={"/projects/" + project.id} >{project.id}</Link></td>
            <td>{project.name}</td>
            <td>{project.status}</td>
            <td>{project.customer}</td>
            <td>{project.startDate ? format(new Date(project.startDate), 'dd.MM.yyyy') : project.startDate}</td>
            <td>
                {project.status == "NEW" ? <Button className='btn-delete' onClick={() => this.remove(project.id)}><Trash /></Button> : ""}
            </td>
        </tr>
    });

    return (
        <div className="content">
            <Container fluid>
                <Row>
                    <Col xl={11}>
                        <p className="name">
                            <h1>Projects List</h1>
                        </p>
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col xl={11} className="search">
                        <div class="container">
                            <div class="row">
                                <div className="col-md-5">
                                    <input className='form-control' value={keyword} onChange={handleInputChange} placeholder='Project number, name, customer' >
                                    </input>
                                </div>
                                <div className="col-md-3">
                                    <select name="status" id="status" class="form-control" value={status}
                                            onChange={(e) => setStatus(e.target.value)}>
                                        <option value="" disabled selected hidden >Projects status</option>
                                        <option value="NEW">NEW</option>
                                        <option value="PLA">Planned</option>
                                        <option value="INP">In progress</option>
                                        <option value="FIN">Finished</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <button type="button submit" class="btn btn-primary" onClick={handleSearch}>Search Project</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-light">Reset Search</button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xl={11}>
                        <Table className="col-md-12" bordered>
                            <thead>
                                <tr>
                                    <th width="5%"></th>
                                    <th width="10%">Number</th>
                                    <th width="40%">Name</th>
                                    <th width="10%">Status</th>
                                    <th width="20%">Customer</th>
                                    <th width="15%">Start Date</th>
                                    <th width="10%">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}
export default ProjectList;
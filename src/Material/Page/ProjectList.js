import React, { Component } from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Style/ProjectList.css';
import { format } from 'date-fns';
import { Trash } from 'react-bootstrap-icons';
class ProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = { projects: [] };
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/projects')
            .then(response => response.json())
            .then(data => this.setState({ projects: data }));
    }
    async remove(id) {
        await fetch(`/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProjects = [...this.state.projects].filter(i => i.id !== id);
            this.setState({ projects: updatedProjects });
        });
    }
    render() {
        const { projects, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
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
                                        <input className='form-control' placeholder='Project number, name, customer, name'>
                                        </input>
                                    </div>
                                    <div className="col-md-3">
                                        <select name="status" id="status" class="form-control">
                                            <option value="" disabled selected hidden>Projects status</option>
                                            <option value="NEW">NEW</option>
                                            <option value="PLA">Planned</option>
                                            <option value="INP">In progress</option>
                                            <option value="FIN">Finished</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button submit" class="btn btn-primary">Search Project</button>
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
                            {/* <div class="container"> */}
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
                        {/* </div> */}
                    </Row>

                </Container>
            </div>
        );
    }
}
export default ProjectList;
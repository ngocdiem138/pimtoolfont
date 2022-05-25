import React, { Component } from 'react';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
                <td style={{ whiteSpace: 'nowrap' }}>{project.number}</td>
                <td>{project.name}</td>
                <td>{project.status}</td>
                <td>{project.customer}</td>
                <td>{project.startDate}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/projects/" + project.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(project.id)}>Delete</Button>
                    </ButtonGroup>
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
                        <div class="container">
                            <div class="row">
                                <div className="col-md-5">
                                    <input>
                                    </input>
                                </div>
                                <div className="col-md-3">
                                    <input>
                                    </input>
                                </div>
                                <div class="col-md-2">
                                    <button type="button submit" class="btn btn-primary">Search Project</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-light">Reset Search</button>
                                </div>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        {/* <div class="container"> */}
                            <Table className="mt-4">
                                <thead>
                                    <tr>
                                        <th width="5%"></th>
                                        <th width="15%">Number</th>
                                        <th width="40%">Name</th>
                                        <th width="10%">Status</th>
                                        <th width="20%">Customer</th>
                                        <th width="10%">Start Date</th>
                                        <th width="10%">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projectList}
                                </tbody>
                            </Table>
                        {/* </div> */}
                    </Row>

                </Container>
            </div>
        );
    }
}
export default ProjectList;
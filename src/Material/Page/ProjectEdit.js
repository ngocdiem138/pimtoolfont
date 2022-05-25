import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Translate from 'react-translate-component';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import counterpart from 'counterpart';
import { Button,  FormGroup, Input, Label } from 'reactstrap';
import en from '../lang/en';
import '../Style/Project.css';
import { withRouter } from '../../withRouter';
const FeaturedProducts = () => {
    const [projects, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = () => {
        axios
            .get('http://localhost:3000/projects')
            .then((res) => {
                console.log(res);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // const { item } = projects;
    const title = <h2>{item.id ? 'Edit Project information' : 'New Project'}</h2>;
    return (
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
                <Form noValidate >
                    <Row>
                        <div className="container">
                            <div class="row form-group">
                                <div class="col-md-2 template required">Project Number</div>
                                <div class="col-md-3">
                                    <Input type="text" class="form-control" value={item.number || ''}
                                        onChange={this.handleChange} autoComplete="number" required></Input>
                                    <div class="valid-feedback">Valid.</div>
                                    <div class="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div class="row form-group ">
                                <div class="col-md-2 template required">Project name</div>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" required></input>
                                    <div class="valid-feedback">Valid.</div>
                                    <div class="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-2 template required">Customer</div>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" required></input>
                                    <div class="valid-feedback">Valid.</div>
                                    <div class="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-2 template required">Group</div>
                                <div class="col-md-3">
                                    <select name="group" id="group" class="form-control">
                                        <option value="new">New</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-2 template ">Members</div>
                                <div class="col-md-9">
                                    <input type="text" class="form-control"></input>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-2 template required">Status</div>
                                <div class="col-md-3">
                                    <select name="status" id="status" class="form-control">
                                        <option value="new">New</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row form-group">
                                <div class="col-md-2 template required">Start date</div>
                                <div class="col-md-3"><input type="date" class="form-control" required></input></div>
                                <div class="col-md-1"></div>
                                <div class="col-md-2 template ">End date</div>
                                <div class="col-md-3"><input type="date" class="form-control"></input></div>
                            </div>
                        </div>
                    </Row>
                    <hr></hr>
                    <Row>
                        <div class="container">
                            <div class="row">
                                <div className="col-md-7"></div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-light" tag={Link} to="/projects">Cancel</button>
                                </div>
                                <div class="col-md-2">
                                    <button type="button submit" class="btn btn-primary">Create Project</button>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Form>
            </Container>
        </div>

    );
};
export default FeaturedProducts;
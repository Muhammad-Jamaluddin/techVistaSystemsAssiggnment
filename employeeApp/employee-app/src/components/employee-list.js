import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

class EmployeeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            showAdd: false,

            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            salary: 0,
        }

        this.getEmployees();
    }

    getEmployees() {
        axios.get("http://localhost:8090/employee/getAll?pageSize=100&pageNumber=1")
            .then(response => {
                console.log(response);
                this.setState({ employees: response.data.content });
                console.log(this.state.employees);
            })
            .catch(error => {
                console.log(error);
                this.setState({ employees: [] });
            })
    }

    getRows() {
        var employees = this.state.employees;//this.getEmployees();
        var indents = [];
        for (var i = 0; i < employees.length; i++) {
            indents.push(
                <tr>
                    <td>{employees[i].employeeId}</td>
                    <td>{employees[i].firstName + " " + employees[i].lastNme}</td>
                    <td>{employees[i].email}</td>
                    <td>{employees[i].phoneNumber}</td>
                </tr>
            );
        }
        return indents;
    }

    openAddModal = e => {
        var check = this.state.showAdd
        this.setState({ showAdd: !check });
    }

    getAddShowCheck() {
        return this.state.showAdd;
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    submitHandler = e => {
        // e.preventDefault();

        var employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phone,
            salary: Number(this.state.salary),
        }

        console.log(employee);


        axios.post("http://localhost:8090/employee/create", employee)
            .then(response => {
                console.log(response);
                this.setState({ showAdd: false });
                console.log(this.state.employees);
                this.getEmployees();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email,
                    phone: employee.phoneNumber,
                    salary: employee.salary,
                })
                // this.setState({ showAdd: true });
            })

    }

    render() {

        const { firstName, lastName, email, phone, salary } = this.state

        return <div>

            {!this.getAddShowCheck() ?
                <Container className="container">
                    <Row>
                        <Col lg={10}>
                            <h1>Employee List</h1>
                        </Col>
                        <Col lg={2}>
                            <Button variant="primary" size="lg" onClick={this.openAddModal}>Add</Button>
                        </Col>

                    </Row>

                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getRows()}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
                : <Container></Container>
            }

            {this.getAddShowCheck() ?
                <Container>
                    <Row>
                        <Form onSubmit={this.submitHandler}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridFirstName">
                                    <Form.Label>FirstName</Form.Label>
                                    <Form.Control type="text" name="firstName" value={firstName} onChange={this.changeHandler} placeholder="Enter firstName" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control type="text" name="lastName" value={lastName} onChange={this.changeHandler} placeholder="Enter lastName" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={email} onChange={this.changeHandler} placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" name="phone" value={phone} onChange={this.changeHandler} placeholder="Enter phone" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridSalary">
                                    <Form.Label>Salary</Form.Label>
                                    <Form.Control type="number" name="salary" value={salary} onChange={this.changeHandler} placeholder="Enter salary" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridManager">
                                    <Form.Label>Manager</Form.Label>
                                    <Form.Control type="text" placeholder="Enter manager" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" placeholder="Enter department" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Row>

                        </Form>
                    </Row>
                </Container>
                : <Container></Container>}
        </div>

    }
}

export default EmployeeList
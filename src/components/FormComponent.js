import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

const required = (val) => val && val.length;
const maxLength = (length) => (val) => !(val) || (val.length <= length);
const minLength = (length) => (val) => (val) && (val.length >= length);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class FormComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandeler = this.onChangeHandeler.bind(this);

    }

    handleSubmit = async (event) => {
        console.log("submit : ", this.state);
        alert("pdf will be downloaded!!!");
        event.preventDefault();
        console.log(document.body);
        await html2canvas(document.body)
            .then(async (canvas) => {
                console.log("started");
                const imgData = await canvas.toDataURL('image/png');
                console.log(imgData);
                const pdf = await new jsPDF();
                await pdf.addImage(imgData, 'PNG', 0, 40,350, 180);
                await pdf.save("download.pdf");
                console.log("finished");
            });
    }

    onChangeHandeler = (event) => {
        let name = event.target.name;
        let val = event.target.value;
        console.log(name + " : " + val);
        this.setState({ [name]: val });
    }

    render() {
        return (
            <div className="container">
                <div className="row row-contact mt-1" >
                    <div className="col-12">
                        <h3>Send us Your Details</h3>
                    </div>
                    <div className="col-12 col-md-9" >
                        <form id='inputForm' onSubmit={this.handleSubmit}>
                            <Row className="form-group" >
                                <Label htmlFor="firstName" md={2} >First Name</Label>
                                <Col md={10}>
                                    <input
                                        type='text'
                                        name='firstName'
                                        onChange={this.onChangeHandeler}
                                    />
                                </Col>
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <input
                                        type='text'
                                        name='lastName'
                                        onChange={this.onChangeHandeler}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="phoneNumber" md={2}>Tel. Number</Label>
                                <Col md={10}>
                                    <input
                                        type='n'
                                        name='phoneNumber'
                                        onChange={this.onChangeHandeler}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <input
                                        type='text'
                                        name='email'
                                        onChange={this.onChangeHandeler}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button color="primary" type="submit">
                                        Submit Form
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default FormComponent;
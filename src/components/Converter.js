import React, { Component } from 'react'

import { Container, Button, Row, Col, Badge, Form, FormControl, InputGroup, Card} from 'react-bootstrap';

export default class Converter extends Component {

    constructor(props){
        super(props);

        this.state = {
            base_value: 0,
            second_value: 0,
        }

        this.currencyConverter = this.currencyConverter.bind(this);
        this.onchangeHandler = this.onchangeHandler.bind(this);

    }
  

    onchangeHandler(event) {
        this.setState({base_value:event.target.value});
        this.currencyConverter();  
    }


    currencyConverter() {

        let from_to = `${this.props.baseCurrency}_${this.props.secondCurrency}`; // this line concatenates the props name
        let apiKey = "6859149d9f02452fac0c"; //Change this code to your apiKey | Get your apiKey at: https://free.currencyconverterapi.com/free-api-key
        let apiURL = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=${apiKey}`;

        fetch(apiURL).then(res=>{

            return res.json(); 
        })
        .then(json=>{

            let conversionValue = json[from_to];
            let second_value= (parseFloat(this.state.base_value) * conversionValue).toFixed(2);
            this.setState({second_value});
            
        })
    }

    render() {
        return (
            <div>
                <Currencies />
                <Container fluid>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col md={12}><h3>Simple Currency Converter made with React</h3></Col>
                            </Row>
                            <Row>
                                <Col md={12}><h4>From <Badge bg="primary">{this.props.baseCurrency}</Badge> to <Badge bg="primary">{this.props.secondCurrency}</Badge></h4></Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md>
                                    <Form.Label htmlFor="Amount">Amount</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl aria-describedby="Amount" onChange={this.onchangeHandler.bind(this)}/>
                                    </InputGroup>
                                </Col>
                                <Col md>
                                    <Form.Label htmlFor="From">From</Form.Label>
                                    <Form.Select aria-label="From">
                                        <option></option>
                                        <option value="1">EUR</option>
                                    </Form.Select>
                                </Col>
                                <Col md>
                                    <Form.Label htmlFor="To">To</Form.Label>
                                    <Form.Select aria-label="To">
                                        <option></option>
                                        <option value="1">BRL</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}><h2>{this.state.base_value} {this.props.baseCurrency} = {this.state.second_value} {this.props.secondCurrency} </h2></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
                    
            </div>
        )
    }
}

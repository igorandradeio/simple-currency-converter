import './App.css';
import React, { useEffect, useState } from 'react';
import CurrencyItem from './components/CurrencyItem';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Alert, Form, FormControl, InputGroup, Card} from 'react-bootstrap';

import api from './services/api';

function App() {

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [amountValue, setAmountValue] = useState(1);
    const [rateValue, setRateValue] = useState();
    const [conversionValue, setConversionValue] = useState();
    const [fromCurrency, setFromCurrency] = useState("BRL");
    const [toCurrency, setToCurrency] = useState("EUR");

    
    useEffect(() => {
        api.get('').then(({data}) => {
            
            const dataArray = Object.keys(data); 
            setCurrencyOptions(dataArray);
        })
    }, []);

        
    useEffect(() => {

        if((amountValue && fromCurrency && toCurrency) && (fromCurrency != toCurrency) && (amountValue > 0)) {

            let apiURL = `https://api.frankfurter.app/latest?amount=${amountValue}&from=${fromCurrency}&to=${toCurrency}`;
            fetch(apiURL)
            .then(res => res.json())
            .then(data => {

                let rates = (data.rates[toCurrency]/amountValue).toFixed(2);
                setRateValue(rates)

                let result = (parseFloat(amountValue) * rates).toFixed(2);
                setConversionValue(result);
        
            })
        }
    }, [fromCurrency, toCurrency, amountValue ]);
    
    function onchangeHandler(e) {
        setAmountValue(e.target.value)
    }
    
  return (
    <div>
    <Container fluid>
        <Card>
            <Card.Header>
                <Row>
                    <Col md={12}><h3>Simple Currency Converter made with React</h3></Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md>
                        <Form.Label htmlFor="Amount">Amount</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl aria-describedby="Amount" type="number" step="0.1" value={amountValue} onChange={ onchangeHandler }/>
                        </InputGroup>
                    </Col>
                    <Col md>
                        <Form.Label htmlFor="From">From</Form.Label>
                        <CurrencyItem 
                          currencyOptions={currencyOptions}
                          selectedCurrency={fromCurrency}
                          onChangeCurrency={e => setFromCurrency(e.target.value)}
                        ></CurrencyItem>
                    </Col>
                    <Col md>
                        <Form.Label htmlFor="To">To</Form.Label>
                        <CurrencyItem 
                          currencyOptions={currencyOptions}
                          selectedCurrency={toCurrency}
                          onChangeCurrency={e => setToCurrency(e.target.value)}
                        ></CurrencyItem>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Alert variant='success'>
                            <h3> {amountValue} {fromCurrency} = {conversionValue} {toCurrency}</h3>
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Alert variant='info'>
                            <h4>1 {fromCurrency} = {rateValue} {toCurrency}</h4>
                        </Alert>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </Container>
</div>
  );
}

export default App;

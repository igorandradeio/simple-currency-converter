import React, { Component, useEffect, useState } from 'react';
import { Form, FormControl} from 'react-bootstrap';
import './Converter.css';


export default function CurrencyItem(props) {

    const {
        currencyOptions,
        onChangeCurrency,
        selectedCurrency
    } = props 

    return (
        <div>
            {
            <Form.Select aria-label="From" value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </Form.Select>            
             }
        </div>
    )
}
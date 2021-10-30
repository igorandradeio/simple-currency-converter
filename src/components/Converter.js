import React, { Component } from 'react'

export default class Converter extends Component {

    constructor(props){
        super(props);

        this.state = {
            base_value: "",
            second_value: 0,
        }
        
        this.currencyConverter = this.currencyConverter.bind(this);
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
            this.setState({second_value})
        })
    }

    render() {
        return (
            <div>
                <h2>From {this.props.baseCurrency} to {this.props.secondCurrency}</h2>
                <input type="text" placeholder="Amount" onChange={(event)=>{this.setState({base_value:event.target.value})}}></input>
                <input type="button" value="Converter" onClick={this.currencyConverter}></input>
                <h2>Result: {this.state.second_value} {this.props.secondCurrency}</h2>
            </div>
        )
    }
}

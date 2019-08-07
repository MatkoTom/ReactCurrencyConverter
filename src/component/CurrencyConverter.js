import React, {Component} from "react"
import './CurrencyConverter.css'

class CurrencyConverter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: 1,
            currencyFrom: "EUR",
            currencyTo: "EUR",
            amount : 1,
            currencies: ["EUR"],
            currentRate: 1
        };
    }

    componentDidMount() {
        fetch("https://api.ratesapi.io/api/latest")
        .then(response => response.json())
        .then (data => {
           const currenyArray = ["EUR"]
           for (const currency in data.rates) {
               currenyArray.push(currency)
           }
           this.setState({ currencies: currenyArray })
        })
    }

    conversion = () => {
        if ( this.state.currencyTo !== this.state.currencyFrom ) {
            fetch (`https://api.ratesapi.io/api/latest?base=${this.state.currencyFrom}&symbols=${this.state.currencyTo}`)
            .then(response => response.json())
            .then(data => {
                const result = this.state.amount * data.rates[this.state.currencyTo]
                this.setState({ result: result.toFixed(4)})
                const rate = data.rates[this.state.currencyTo]
                this.setState({ currentRate: rate.toFixed(4)})
            })
        } else {
            this.setState({ result: "Please select different currencies!"})
        }
    }

    selection = func => {
        if (func.target.name === "from") {
            this.setState({ currencyFrom: func.target.value })
        } else {
            if (func.target.name === "to") {
                 this.setState({ currencyTo: func.target.value })
            }
        }
    }
    
    render() {
        return (
            <div className="converter_page">   
                <h1 className="title">Currency converter!</h1>   
                <p>Amount: </p>          
               <input className="field" name="amount" type="text" value={this.state.amount} onChange={ func => this.setState({ amount: func.target.value })}></input>
               <p>From:</p>
               <select className="selector" name="from" value={this.state.currencyFrom} onChange={func => this.selection(func)} onClick={this.conversion}> 
                   {this.state.currencies.map( item => (
                       <option currency={item}>{item}</option>
                   ))}
               </select>
               <p>To:</p>
               <select className="selector" name="to" value={this.state.currencyTo}  onChange={func => this.selection(func)} onClick={this.conversion}>
                   {this.state.currencies.map( item => (
                       <option currency={item}>{item}</option>
                   ))}
               </select>
               <text className="current">Current rate: 1 {this.state.currencyFrom} = {this.state.currentRate} {this.state.currencyTo}</text>
               <p>Results: </p>
               {this.state.result && <h3>{this.state.result}</h3>}
            </div>
        )
    }
}

export default CurrencyConverter
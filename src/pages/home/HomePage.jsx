import React, { Component } from 'react'
import { Spring, Transition, animated } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row } from "react-bootstrap";
// import CurrencyInput from 'react-currency-masked-input'
// import CurrencyInput from 'react-currency-input'
import CurrencyFormat from 'react-currency-format';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cop_cash: 0,
            btc_cash: 0,
            ves_cash: 0,
            btc_percent: 0,
            ves_percent: 0,
            totalRate: 0,
            realRate: 0,
            btc_profits: 0,
            ves_profits: 0,
            calculateOption: "by_percentage", // "by_rate"
            optionValue: 0,
            percentage: 0,
            showRate: false
        }
        
    }

    render() {
        return (
            <Container className="home">
                <Row>
                    <Col md={{ span: 4, offset: 4 }} className="mt-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">COP</span>
                            </div>
                            <CurrencyFormat className="form-control" thousandSeparator={"."} decimalSeparator={","} allowNegative={false} 
                                onChange={ e => {
                                    const valor = e.target.value.replace(/\./g, "").replace(/,/g, ".")
                                    this.setState({cop_cash: valor, showRate: false})
                                    this.calculateRate();
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">BTC</span>
                            </div>
                            <CurrencyFormat className="form-control" thousandSeparator={"."} decimalSeparator={","} allowNegative={false} 
                                onChange={ e => {
                                    const valor = e.target.value.replace(/\./g, "").replace(/,/g, ".")
                                    this.setState({btc_cash: valor, showRate: false})
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">VES</span>
                            </div>
                            <CurrencyFormat className="form-control" thousandSeparator={"."} decimalSeparator={","} allowNegative={false} 
                                onChange={ e => {
                                    const valor = e.target.value.replace(/\./g, "").replace(/,/g, ".")
                                    this.setState({ves_cash: valor, showRate: false})
                                    this.calculateRate();
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-2">
                        <div className="input-group">
                        <select 
                            className="form-control text-white bg-primary"
                            name="calculateOption"
                            onChange={this.onChange}
                            value={this.state.calculateOption}
                        >
                            <option className="text-white" value="by_percentage">Por porcentaje</option>
                            <option className="text-white" value="by_rate">Por tasa fija</option>
                        </select>
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">{this.state.calculateOption === "by_percentage" ? "%" : (<FontAwesomeIcon icon={faChartLine} className="text-white" />)}</span>
                            </div>
                            <CurrencyFormat className="form-control" thousandSeparator={"."} decimalSeparator={","} allowNegative={false} 
                                onChange={ e => {
                                    const valor = e.target.value.replace(/\./g, "").replace(/,/g, ".")
                                    this.setState({optionValue: valor, showRate: false})
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-1">
                        <div className="rateResult mt-3">
                            <div>
                                <FontAwesomeIcon icon={faChartLine} className="icon" />
                            </div>
                            <div className="content">
                                <div className="title">
                                    Tasa neta
                                </div>
                                <div className="value">
                                    <span className={this.state.totalRate === 0 ? "text-danger" : "text-primary"}>{this.state.totalRate}</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-3">
                        <div className="input-group">
                            <button className="btn btn-secondary btn-block" 
                                onClick={this.calculate}
                                disabled={
                                    this.state.cop_cash === "" || this.state.cop_cash === "0" || this.state.cop_cash === 0 || this.state.cop_cash < 0.000000000000000001 ||
                                    this.state.btc_cash === "" || this.state.btc_cash === "0" || this.state.btc_cash === 0 || this.state.btc_cash < 0.000000000000000001 ||
                                    this.state.ves_cash === "" || this.state.ves_cash === "0" || this.state.ves_cash === 0 || this.state.ves_cash < 0.000000000000000001 ||
                                    this.state.optionValue === "" || this.state.optionValue === "0" || this.state.optionValue === 0 || this.state.optionValue < 0.000000000000000001 ||
                                    isNaN(this.state.cop_cash) || isNaN(this.state.btc_cash) ||
                                    isNaN(this.state.ves_cash) || isNaN(this.state.optionValue)
                                }
                            >
                                Calcular
                            </button>
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-5">
                        <Transition
                            native
                            items={this.state.showRate}
                            from={{ opacity: 0, transform: "translateY(0px)" }}
                            enter={{ opacity: 1, transform: "translateY(-30px)" }}
                            leave={{ opacity: 0, transform: "translateY(0px)" }}
                            // config={{delay: this.state.showRate ? 500 : 0}}
                        >
                            {show => show && (props => (
                                <>
                                    <animated.div style={props}>
                                        <Spring from={{opacity: 0}} to={{opacity: 1}} >
                                            {props => (
                                                <div style={props} className="rateResult mt-3">
                                                    <div className="bg-primary px-1 m-2 rounded">
                                                        {/* <FontAwesomeIcon icon={faChartLine} className="icon" /> */}
                                                    </div>
                                                    <div className="content">
                                                        <div>
                                                            <span className="title">Tasa del {this.state.percentage}%: </span>
                                                            <span className="value"><CurrencyFormat value={this.state.realRate} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} allowNegative={false} /></span>
                                                        </div>
                                                        <div>
                                                            <span className="title">BTC a vender: </span>
                                                            <CurrencyFormat value={this.state.btc_percent} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} allowNegative={false} /> btc
                                                        </div>
                                                        <div>
                                                            <span className="title">VES a entregar: </span>
                                                            {this.state.ves_percent}
                                                        </div>
                                                        <div>
                                                            <span className="title">Ganancia en BTC: </span>
                                                            <CurrencyFormat value={this.state.btc_profits} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} allowNegative={false} /> btc
                                                        </div>
                                                        <div>
                                                            <span className="title">Ganancia en VES: </span>
                                                            {this.state.ves_profits}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Spring>
                                    </animated.div>
                                </>
                            ))}
                        </Transition>
                    </Col>
                </Row>
            </Container>
        )
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            showRate: false
        });
    }

    onChangeSelect = e => {
        this.onChange(e)
        
    }

    calculateRate = () => {
        this.setState(prevState => ({
            totalRate: (prevState.cop_cash === "" || prevState.cop_cash === "0" || 
            prevState.cop_cash === 0 || prevState.cop_cash < 0 ||
            prevState.ves_cash === "" || prevState.ves_cash === "0" || 
            prevState.ves_cash === 0 || prevState.ves_cash < 0 ||
            isNaN(prevState.cop_cash) || isNaN(prevState.ves_cash)) ? 0 : prevState.cop_cash / prevState.ves_cash
        }))


    }

    calculate = () => {
        const cop_cash = parseFloat(this.state.cop_cash)
        const btc_cash = parseFloat(this.state.btc_cash)
        const ves_cash = parseFloat(this.state.ves_cash)
        
        if(this.state.calculateOption === "by_percentage") {
            const percentage = this.state.optionValue
            const totalRate = cop_cash / ves_cash
            const btc_percent = btc_cash - (btc_cash * (percentage / 100))
            const ves_percent = btc_percent * ves_cash / btc_cash
            const realRate = cop_cash / ves_percent
            const btc_profits = btc_cash - btc_percent
            const ves_profits = ves_cash - ves_percent
            this.setState({totalRate, percentage, btc_percent, 
                ves_percent: new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(ves_percent),
                ves_profits: new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(ves_profits),
                realRate, btc_profits, showRate: true})
        }

        if(this.state.calculateOption === "by_rate") {
            const realRate = parseFloat(this.state.optionValue)
            const totalRate = cop_cash / ves_cash
            const ves_percent = cop_cash / realRate
            const btc_percent = ves_percent * btc_cash / ves_cash
            const btc_profits = btc_cash - btc_percent
            const ves_profits = ves_cash - ves_percent
            const percentage = ves_profits * 100 / ves_cash;            
            this.setState({totalRate, percentage, btc_percent, 
                ves_percent: new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(ves_percent),
                ves_profits: new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(ves_profits),
                realRate, btc_profits, showRate: true})
        }

        


        
        
    }
}

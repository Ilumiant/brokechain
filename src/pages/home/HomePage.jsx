import React, { Component } from 'react'
import { Spring, Transition, animated } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row } from "react-bootstrap";

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
                            <input type="text" name="cop_cash" className="form-control" onChange={ e => { this.onChange(e); this.calculateRate(); }} />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">BTC</span>
                            </div>
                            <input type="text" name="btc_cash" className="form-control" onChange={this.onChange} />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-2">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">VES</span>
                            </div>
                            <input type="text" name="ves_cash" className="form-control" onChange={ e => { this.onChange(e); this.calculateRate(); }} />
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
                            <input type="text" name="optionValue" className="form-control" onChange={this.onChange} />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-2">
                        <div className="rateResult mt-3">
                            <div>
                                <FontAwesomeIcon icon={faChartLine} className="icon" />
                            </div>
                            <div className="content">
                                <div className="title">
                                    Tasa neta
                                </div>
                                <div className="value">
                                    {this.state.totalRate}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-3">
                        <div className="input-group">
                            <button className="btn btn-secondary btn-block" 
                                onClick={this.calculate}
                                disabled={
                                    this.state.cop_cash === "" || this.state.cop_cash === "0" || this.state.cop_cash === 0 || this.state.cop_cash < 0 ||
                                    this.state.btc_cash === "" || this.state.btc_cash === "0" || this.state.btc_cash === 0 || this.state.btc_cash < 0 ||
                                    this.state.ves_cash === "" || this.state.ves_cash === "0" || this.state.ves_cash === 0 || this.state.ves_cash < 0 ||
                                    this.state.optionValue === "" || this.state.optionValue === "0" || this.state.optionValue === 0 || this.state.optionValue < 0 ||
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
                                                    <div>
                                                        <FontAwesomeIcon icon={faChartLine} className="icon" />
                                                    </div>
                                                    <div className="content">
                                                        <div className="title">
                                                            Tasa del {this.state.percentage}%
                                                        </div>
                                                        <div className="value">
                                                            {this.state.realRate}
                                                        </div>
                                                        <div>
                                                            <span className="title">BTC a vender: </span>
                                                            {this.state.btc_percent} btc
                                                        </div>
                                                        <div>
                                                            <span className="title">VES a entregar: </span>
                                                            {this.state.ves_percent.toFixed(2)} Bs.
                                                        </div>
                                                        <div>
                                                            <span className="title">Ganancia en BTC: </span>
                                                            {this.state.btc_profits} btc
                                                        </div>
                                                        <div>
                                                            <span className="title">Ganancia en VES: </span>
                                                            {this.state.ves_profits.toFixed(2)} Bs.
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
            this.setState({totalRate, percentage, btc_percent, ves_percent, realRate, ves_profits, btc_profits, showRate: true})
        }

        if(this.state.calculateOption === "by_rate") {
            const realRate = parseFloat(this.state.optionValue)
            const totalRate = cop_cash / ves_cash
            const ves_percent = cop_cash / realRate
            const btc_percent = ves_percent * btc_cash / ves_cash
            const btc_profits = btc_cash - btc_percent
            const ves_profits = ves_cash - ves_percent
            const percentage = ves_profits * 100 / ves_cash;            
            this.setState({totalRate, percentage, btc_percent, ves_percent, realRate, ves_profits, btc_profits, showRate: true})
        }

        


        
        
    }
}

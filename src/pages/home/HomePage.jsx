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
            btc_15: 0,
            ves_15: 0,
            totalRate: 0,
            realRate: 0,
            btc_profits: 0,
            ves_profits: 0,
            showRate: false
        }
        
    }

    render() {
        return (
            <Container className="home">
                <Row>
                    <Col md={{ span: 4, offset: 4 }} className="mt-5">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">COP</span>
                            </div>
                            <input type="text" name="cop_cash" className="form-control" onChange={this.onChange} />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">BTC</span>
                            </div>
                            <input type="text" name="btc_cash" className="form-control" onChange={this.onChange} />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} className="mt-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">VES</span>
                            </div>
                            <input type="text" name="ves_cash" className="form-control" onChange={this.onChange} />
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
                                    isNaN(this.state.cop_cash) || isNaN(this.state.btc_cash) ||
                                    isNaN(this.state.ves_cash)
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
                        >
                            {show => show && (props => (
                                <>
                                    <animated.div style={props}>
                                        <Spring from={{opacity: 0}} to={{opacity: 1}}>
                                            {props => (
                                                <div style={props} className="rateResult mt-3">
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
                                            )}
                                        </Spring>
                                    </animated.div>
                                </>
                            ))}
                        </Transition>
                        <Transition
                            native
                            items={this.state.showRate}
                            from={{ opacity: 0, transform: "translateY(0px)" }}
                            enter={{ opacity: 1, transform: "translateY(-30px)" }}
                            leave={{ opacity: 0, transform: "translateY(0px)" }}
                            config={{delay: this.state.showRate ? 500 : 0}}
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
                                                            Tasa - 15%
                                                        </div>
                                                        <div className="value">
                                                            {this.state.realRate}
                                                        </div>
                                                        <div>
                                                            <span className="title">BTC a vender: </span>
                                                            {this.state.btc_15} btc
                                                        </div>
                                                        <div>
                                                            <span className="title">VES a entregar: </span>
                                                            {this.state.ves_15.toFixed(2)} Bs.
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

    calculate = () => {
        const cop_cash = this.state.cop_cash
        const btc_cash = this.state.btc_cash
        const ves_cash = this.state.ves_cash
        
        const totalRate = cop_cash / ves_cash
        const btc_15 = btc_cash - (btc_cash * 0.15)
        const ves_15 = btc_15 * ves_cash / btc_cash
        const realRate = cop_cash / ves_15
        const btc_profits = btc_cash - btc_15
        const ves_profits = ves_cash - ves_15
        this.setState({totalRate, btc_15, ves_15, realRate, ves_profits, btc_profits, showRate: true})
    }
}

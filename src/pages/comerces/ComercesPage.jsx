import React, { Component } from 'react'
import axios from "axios";
import { Spring, Transition, animated } from 'react-spring/renderprops';
import { Col, Container, Row } from "react-bootstrap";
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faRedoAlt } from '@fortawesome/free-solid-svg-icons'

export default class ComercesPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cop_cash: 0,
            buyers: {},
            sellers: {},
            rates: []
        }
    }

    componentDidMount() {
        this.getBuy();
        this.getSell();
    }

    getBuy = () => axios
        .get("https://brokechain-api-node.herokuapp.com/show-buy-bitcoins-online-cop")
        .then(response => this.setState({buyers: response.data}))
        .catch(err => alert(err));

    getSell = () => axios
        .get("https://brokechain-api-node.herokuapp.com/show-sell-bitcoins-online-ves")
        .then(response => this.setState({sellers: response.data}))
        .catch(err => alert(err));

    compareCommerces = () => {
        let buyers = this.state.buyers.data.ad_list
            .filter(element => element.data.min_amount < this.state.cop_cash && element.data.max_amount > this.state.cop_cash)
            .sort((a,b) => {
                if (a.data.temp_price < b.data.temp_price) {
                    return -1;
                }
                if (a.data.temp_price < b.data.temp_price) {
                    return 1;
                }
                return 0;
            })

        let sellers = this.state.sellers.data.ad_list

        let rates = []

        let id = 0;
        for (let i = 0; i < buyers.length; i++) {
            let buyer = buyers[i]
            id++
            for (let j = 0; j < sellers.length; j++) {
                let seller = sellers[j]
                let btc = this.state.cop_cash / buyer.data.temp_price
                let ves = btc * seller.data.temp_price
                if(parseFloat(seller.data.min_amount) < ves && parseFloat(seller.data.max_amount) > ves) {
                    let data = {id, buyer, seller, cop: this.state.cop_cash, btc, ves,
                        rate: this.state.cop_cash / ves, isShown: false
                    }
                    rates.push(data)
                }
                id++
            }
        }

        this.setState({rates});
    }

    render() {
        return (
            <Container className="commerces">
                <Row>
                    <Col xs={2} className="mt-3">
                        <button 
                            onClick={() => {this.setState({buyers: {}, sellers: {}}); this.getBuy(); this.getSell(); }}
                        className="btn btn-primary">
                            <FontAwesomeIcon icon={faRedoAlt} className="icon" />
                        </button>
                    </Col>
                    <Col xs={10} className="mt-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-primary text-white">COP</span>
                            </div>
                            <CurrencyFormat className="form-control" thousandSeparator={","} allowNegative={false} 
                                onChange={ e => {
                                    const valor = e.target.value.replace(/,/g, "")
                                    this.setState({cop_cash: parseFloat(valor), rates: []})
                                }}
                            />
                        </div>
                    </Col>
                    <Col xs={12} className="mt-3">
                        <div className="input-group">
                            <button className="btn btn-secondary btn-block" 
                                onClick={this.compareCommerces}
                                disabled={
                                    this.state.cop_cash === "" || this.state.cop_cash === "0" || this.state.cop_cash === 0 || this.state.cop_cash < 0.000000000000000001 ||
                                    isNaN(this.state.cop_cash) || Object.entries(this.state.buyers).length === 0 || Object.entries(this.state.sellers).length === 0
                                }
                            >
                                {Object.entries(this.state.buyers).length === 0 || Object.entries(this.state.sellers).length === 0 ? "Cargando comercios..." : "Buscar comercios"}
                            </button>
                        </div>
                    </Col>
                    <Col xs={12} className="mt-3">
                        <Container fluid={true}>
                            <Row>
                                {this.state.rates.sort((a,b) => {
                                    // let dateBuyerA = new Date(a.buyer.data.profile.last_online)
                                    // let dateBuyerB = new Date(b.buyer.data.profile.last_online)
                                    // let dateSellerA = new Date(a.seller.data.profile.last_online)
                                    // let dateSellerB = new Date(b.seller.data.profile.last_online)
                                    // if (dateBuyerA.getTime() > dateBuyerB.getTime()) {
                                    //     return -1;
                                    // }
                                    // if (dateBuyerA.getTime() < dateBuyerB.getTime()) {
                                    //     return 1;
                                    // }
                                    if (a.rate < b.rate) {
                                        return -1;
                                    }
                                    if (a.rate > b.rate) {
                                        return 1;
                                    }
                                    return 0;
                                }).map((rate, index) => (
                                    <Col key={index} xs={12} className="mt-1">
                                        <div className="rateResult">
                                            <div className="flex">
                                                <div className="m-1">
                                                    <button onClick={() => {
                                                        let rates = [...this.state.rates];
                                                        rates.forEach(element => {
                                                            if (rate.id === element.id) {
                                                                rate.isShown  = !rate.isShown
                                                            }
                                                        })
                                                        this.setState({rates})
                                                    }} className="btn btn-primary">
                                                        <FontAwesomeIcon icon={faEye} className="icon" />
                                                    </button>
                                                </div>
                                                <div className="content">
                                                    <div>
                                                        <span className="title">Tasa: </span>
                                                        <span className="value"><CurrencyFormat value={rate.rate} displayType={'text'} thousandSeparator={","} decimalSeparator={"."} /></span>
                                                    </div>
                                                </div>
                                            </div>
                                                <Transition
                                                    native
                                                    items={rate.isShown}
                                                    from={{ opacity: 0, transform: "translateY(30px)" }}
                                                    enter={{ opacity: 1, transform: "translateY(0px)" }}
                                                    leave={{ opacity: 0, transform: "translateY(30px)" }}
                                                >
                                                    {show => show && (props => (
                                                        <animated.div style={props}>
                                                            <Spring from={{opacity: 0}} to={{opacity: 1}} >
                                                                {props => (
                                                                    <div style={props} className="result">
                                                                        <div>
                                                                            <span className="title">BTC: </span>
                                                                            {rate.btc}
                                                                        </div>
                                                                        <div>
                                                                            <span className="title">VES: </span>
                                                                            {rate.ves}
                                                                        </div>
                                                                        <div>
                                                                            <span className="title">Compra COP: </span>
                                                                            <a href={rate.buyer.actions.public_view} rel="noopener noreferrer" target="_blank">ver compra</a>
                                                                        </div>
                                                                        <div>
                                                                            <span className="title">Venta VES: </span>
                                                                            <a href={rate.seller.actions.public_view} rel="noopener noreferrer" target="_blank">ver venta</a>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Spring>
                                                        </animated.div>
                                                    ))}
                                                </Transition>
                                        </div>                 
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        )
    }
}

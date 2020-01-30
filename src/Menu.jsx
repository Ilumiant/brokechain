import React, { Component } from 'react'
import ReactLogo from './logo.svg';
import hamburgerMenuIcon from './images/hamburger-menu-icon-white.png'

export default class Menu extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center justify-content-sm-between position-relative bg-secondary px-5">
                <div className="position-absolute" style={{left: 0}}>
                    <button className="btn btn-primary px-2 m-1" 
                        onClick={() => this.props.onSetSidebarOpen(true)}
                    >
                        <img src={hamburgerMenuIcon} alt="hamburgerMenuIcon" height="25" />
                    </button>
                </div>
                <div className="text-white">
                    <img src={ReactLogo} className="React-logo" alt="logo"/>
                    Brokechain APP
                </div>
                <div className="m-1 d-none d-sm-block">
                    <button className="btn btn-primary" 
                        onClick={() => {}}
                    >
                        login
                    </button>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import './styles/bootstrap.css'
import './App.css';
import './styles/layout.scss'
import Sidebar from "react-sidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage"
import Menu from './Menu';

const mql = window.matchMedia(`(min-width: 800px)`);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Sidebar
            sidebar={<b>Sidebar content</b>}
            open={this.state.sidebarOpen}
            // docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
          >{""}</Sidebar>
          <Menu onSetSidebarOpen={this.onSetSidebarOpen} />
          <Switch>
            <Route>
              {/* <Route path="/" exact component={HomePage}/> */}
            </Route>
          </Switch>
        </BrowserRouter>
        <HomePage/>
      </>
    );
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
}

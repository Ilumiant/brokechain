import React, { Component } from 'react';
import './styles/bootstrap.css'
import './App.css';
import './styles/layout.scss'
import Sidebar from "react-sidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage"
import Menu from './Menu';
import { Col, Container, Nav, Row, Tab } from "react-bootstrap"
import ComercesPage from './pages/comerces/ComercesPage';

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
        <Container fluid={true}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col md={{ span: 4, offset: 4 }} className="mt-2">
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Calculadora</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Imagen</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Comercios</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={{ span: 4, offset: 4 }} className="mt-2">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <HomePage/>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    Imagen
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <ComercesPage/>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
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

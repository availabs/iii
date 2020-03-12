import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';
import theme from 'components/common/themes/light_new';
import Layout from './layouts/Layout';
import Routes from './routes';
import Messages from './components/messages';

import './App.css';
import Redirect from "react-router/Redirect";

export const history = createBrowserHistory({basename: process.env.PUBLIC_URL});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: false
    };
    this.getUrlVars = this.getUrlVars.bind(this)
  }


  componentDidUpdate(prevProps) {
    //console.log('update',prevProps, this.props.user.attempts)
    if (this.state.isAuthenticating && this.props.user.attempts ) {
      this.setState({ isAuthenticating: false });
    }
  }

  componentWillMount(prevProps) {
    //alert('getItem: ' + localStorage.getItem('userToken'));
    //console.log('update',prevProps, this.props.user.attempts)
    if (this.state.isAuthenticating && this.props.user.attempts ) {
      this.setState({ isAuthenticating: false });
    }
  }
  getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  render() {
    //console.log('app render user',this.props.user)
    return (
      <ThemeProvider theme={theme}>
        <div className="all-wrapper solid-bg-all">
          <BrowserRouter basename={'/womeningov/iii/newPortal/build/'}>
            <Switch>
              {
                  Routes.routes.map((route, i) => {
                    return (
                        <Layout
                            {...route}
                            breadcrumbs={route.breadcrumbs}
                            key={i}
                            menuSettings={route.menuSettings ? route.menuSettings : {}}
                            menus={Routes.routes}
                            router={this.props.router}
                            routes={Routes.routes}
                        />
                    );
                  })
              }
            </Switch>
          </BrowserRouter>
          <Messages />
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return ({
    router: state.router,
    token: state.router.location.search ? state.router.location.search : null
  });
}

const mapDispatchToProps = { createBrowserHistory };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

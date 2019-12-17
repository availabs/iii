import React from 'react';
import Element from "../../../components/light-admin/containers/Element";
import DROPDOWN from './dropdown'
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import {object} from "prop-types";
import {connect} from "react-redux";
class DataExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    setStateOnChange(state){
        this.setState(Object.assign(this.state, state))
    }
    render() {
        console.log('state', this.state)
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <ElementBox>
                        <DROPDOWN
                            {...this.state}
                            setState={this.setStateOnChange.bind(this)}
                        />
                    </ElementBox>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('DE state', state)
    return {
        router: state.router
    };
};

const mapDispatchToProps = {};
export default [{
    icon: 'os-icon-home',
    path: '/data',
    exact: true,
    name: 'Data Explorer',
    auth: false,
    mainNav: true,
    breadcrumbs: [
        {name: 'Data', path: '/data'},
        {param: 'year', path: '/data/'}
    ],
    menuSettings: {
        image: 'none',
        scheme: 'color-scheme-dark',
        position: 'menu-position-top',
        layout: 'menu-layout-full',
        style: 'color-style-default'
    },
    component: connect(mapStateToProps, mapDispatchToProps)(DataExplorer)
}];


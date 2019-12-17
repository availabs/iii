import React from 'react';
import Element from "../../../components/light-admin/containers/Element";
import DROPDOWN from './dropdown'
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import {connect} from "react-redux";
import get from 'lodash.get'
import {config, measures} from './data_config'

class DataExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',indicator: '',nativity:'',education:''
        }
    }
    setStateOnChange(state){
        this.setState(Object.assign(this.state, state, {}))
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

                        selected state: {this.state.year} {this.state.indicator } {this.state.nativity} {this.state.education}
                        {this.state.measure}

                        selected file: {get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null)}
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


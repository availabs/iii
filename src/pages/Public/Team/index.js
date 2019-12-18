import React from 'react';
import Element from "../../../components/light-admin/containers/Element";
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import team_config from "./team_config";
import {TEXT} from "../theme/componentsNew";

const backgroundCSS = {
    height:'100vh',
    width: '100vw',
    position: 'relative',
    top: '0px',
    left: '0px',
    '-webkit-box-pack': 'center',
    'justify-content': 'center',
    '-webkit-box-align': 'center',
    'align-items': 'center'
};

class Team extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    renderTeamMember({name, title1, title2, location, email, phone, desc}){
        return (
            <div>
                <ElementBox>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        'alignItems': 'center'}}>
                        <div style={{'textTransform': 'uppercase','letterSpacing': '2px'}}>
                            <h5>{name} ({title1})</h5>
                        </div>
                        <div style={{flex: '0 0 220px', 'textAlign': 'right'}}>
                            {email ? <div className='os-icon os-icon-mail' style={{padding:5}}>
                                <a href={'mailto:DRefki@albany.edu'}>
                                    {email}
                                </a>
                            </div> : null}
                            {phone ? <div className='os-icon os-icon-phone' style={{padding:5}}>
                                <a href={'tel:+1' + phone}>
                                    {phone}
                                </a>
                            </div> : null}
                        </div>
                    </div>
                    <div>
                        <TEXT style={{color:'#000', fontSize: 'inherit', paddingBottom: 0}}>
                            {title2}</TEXT>
                        <TEXT style={{color:'#000',fontSize: 'inherit', paddingTop:0}}>
                            {location}</TEXT>
                        <TEXT style={{color:'#000',  fontWeight: 150, fontSize: 'large'}}>
                            {desc}
                        </TEXT>
                    </div>
                </ElementBox>
            </div>
        )
    }

    renderTable({name, desc, fields}){
        return (

            <ElementBox>
                <div style={{'textTransform': 'uppercase','letterSpacing': '2px'}}>
                    <h5>{name}</h5>
                </div>
                <TEXT style={{color:'#000',  fontWeight: 150, fontSize: 'large'}}>
                    {desc}
                </TEXT>
                <div className='table-responsive'>
                    <table className='table table-lightborder'>
                        <tbody>
                        {
                            Object.keys(fields).map(row => {
                                return (
                                    <tr>
                                        {fields[row].map(data =>
                                            <td style={{textAlignLast: 'center'}}>
                                                <TEXT style={{color:'#000',  fontWeight: 150, fontSize: 'large'}}>
                                                    {data}
                                                </TEXT>
                                        </td>)}
                                    </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </ElementBox>
        )
    }
    render() {
        return (
            <div className='container'>
                <Element>
                    <div className='row'>
                        <div className='col-sm-12'>
                            {
                                team_config.map(block => {
                                    if (block.type !== 'table'){
                                        return this.renderTeamMember(block)
                                    }else{
                                        return this.renderTable(block)
                                    }
                                })
                            }
                        </div>
                    </div>
                </Element>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        router: state.router
    };
};

const mapDispatchToProps = {};
export default [{
    icon: 'os-icon-home',
    path: '/team',
    exact: true,
    name: 'Team',
    auth: false,
    mainNav: true,
    breadcrumbs: [
        {name: 'Team', path: '/team'}
    ],
    menuSettings: {
        image: 'none',
        scheme: 'color-scheme-dark',
        position: 'menu-position-top',
        layout: 'menu-layout-full',
        style: 'color-style-default'
    },
    component: Team
}];


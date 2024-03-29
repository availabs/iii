import React from 'react';
import styled from "styled-components";
import config from 'pages/Public/DataExplorer/data_config'
import Element from "../../../components/light-admin/containers/Element";
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import {Link} from "react-router-dom";
const background = process.env.PUBLIC_URL + '/img/iii.jpg';
const backgroundCSS = {
    backgroundImage:'url(' + background + ')',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height:'100vh',
    width: '100vw',
    position: 'relative',
    top: '0px',
    left: '0px',
    display: 'flex',
    '-webkit-box-pack': 'center',
    'justify-content': 'center',
    '-webkit-box-align': 'center',
    'align-items': 'center'
};
const HEADER = styled.div`
                color: rgb(239, 239, 239);
                font-size: 5em;
                font-weight: 500;
                font-family: "Proxima Nova W01";
                font-variant: small-caps;
                line-height: 1.5em;
                text-shadow: rgb(68, 68, 102) -1px -1px 0px, rgb(68, 68, 102) 1px -1px 0px, rgb(68, 68, 102) -1px 1px 0px, rgb(68, 68, 102) 1px 1px 0px;
                text-align: center;
                margin-bottom: 10px;
                padding: 0px 40px;
                `;
const TEXT = styled.div`
                font-weight: 500;
                font-size: x-large;  
                color: rgb(239, 239, 239);
                text-align: justify;
                padding: 10px;
                `;
const CONTAINER = styled.div`
                max-width: 520px;
                color: rgb(239, 239, 239);
                display: flex;
                flex-wrap: wrap;
                -webkit-box-pack: center;
                justify-content: center;
                margin: 0px auto;
                background: rgba(0, 0, 0, 0.3);
                   `
class Public extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
           <div className='container'>
               <Element>
                   {Object.keys(config).sort(function(a, b){return b-a}).map(year => {
                       return (
                           <ElementBox>
                               <h4>{year}</h4>
                               {Object.keys(config[year]).map(indicator => {
                                   return (
                                       <ElementBox>
                                           <h5>{indicator}</h5>
                                           {
                                               Object.keys(config[year][indicator])
                                                   .filter(f => f !== 'info')
                                                   .map(nativity => {
                                                       return (
                                                           <React.Fragment>
                                                               <h6>
                                                                   <ul>
                                                                       <li>{nativity}</li>
                                                                       {Object.keys(config[year][indicator][nativity]).map(education =>
                                                                           <div><Link to={{
                                                                               pathname: '/data/',
                                                                               oldState: {
                                                                                   year,
                                                                                   indicator,
                                                                                   nativity,
                                                                                   education
                                                                               }
                                                                           }}>{education}</Link></div>
                                                                       )}
                                                                   </ul>

                                                               </h6>
                                                           </React.Fragment>
                                                       )
                                                   })
                                           }
                                       </ElementBox>
                                   )
                               })}
                           </ElementBox>
                       )

                   })}
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
    path: '/navigator',
    exact: true,
    name: 'Navigator',
    auth: false,
    mainNav: true,
    breadcrumbs: [
        {name: 'Analysis', path: '/navigator'}
    ],
    menuSettings: {
        image: 'none',
        scheme: 'color-scheme-dark',
        position: 'menu-position-top',
        layout: 'menu-layout-full',
        style: 'color-style-default'
    },
    component: Public
}];


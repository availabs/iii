import React from 'react';
import styled from "styled-components";
import Introduction from '../Introduction/'
import About from '../About/'
const background = '/img/iii.jpg';
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
           <div>
               <Introduction/>
               <About/>
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
    path: '/',
    exact: true,
    name: 'Home',
    auth: false,
    mainNav: true,
    breadcrumbs: [
        {name: 'Home', path: '/'},
        {param: 'geoid', path: '/'}
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


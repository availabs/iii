import React from 'react';
import {CONTAINER} from "../theme/componentsNew";
import ElementBox from "../../../components/light-admin/containers/ElementBox";

const background = '/img/Methodology.jpg';
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
class Methodology extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={backgroundCSS}>
                <ElementBox style={{width:'100%', height:`calc('100%'-'100px)`, padding:0}}>
                    <img style={{width: '100vw', boxShadow: '0px 1px 5px grey'}} src={background}/>
                </ElementBox>
                <CONTAINER style={{maxWidth: '100vw', marginBottom:'20px'}}>
                    <div style={{display:'flex', bottom:0,
                        width: '100vw',height:'100px',
                        justifyContent: 'space-around', background:'#ffffff'}}>
                        <img src={'/img/CWG_LOGO.png'} style={{height:'100px'}}/>
                        <div><img src={'/img/logo-task-force-logo-color.jpg'} style={{height:'100px'}}/>
                        </div>
                        <div><img src={'/img/seal-assembly-logo.jpg'} style={{height:'100px'}}/></div>
                    </div>
                </CONTAINER>
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
    path: '/research',
    exact: true,
    name: 'Methodology',
    auth: false,
    mainNav: true,
    breadcrumbs: [
        {name: 'Methodology', path: '/research'},
    ],
    menuSettings: {
        image: 'none',
        scheme: 'color-scheme-dark',
        position: 'menu-position-top',
        layout: 'menu-layout-full',
        style: 'color-style-default'
    },
    component: Methodology
}];


import React from 'react';
import {
    HEADER, CONTAINER, TEXT
} from '../theme/componentsNew'
import styled from "styled-components";
const background = process.env.PUBLIC_URL + '/img/iii.jpg';
const backgroundCSS = {
    backgroundImage:'url(' + background + ')',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height:'85vh',
    width: '100vw',
    position: 'relative',
    top: '0px',
    left: '0px',
    display: 'flex',
    '-webkit-box-pack': 'left',
    'justify-content': 'left',
    '-webkit-box-align': 'left',
    'align-items': 'left'
};
class Introduction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={backgroundCSS}>
                <div style={{height: '100%'}}>
                    <div style={{height:'400px', float: 'left', marginTop: '100px'}}>
                        <HEADER>
                            Immigrant Integration Index
                        </HEADER>
                        <CONTAINER>
                            <TEXT>
                                The Immigrant Integration Index seeks to deepen the understanding of the moderating effects of
                                nativity status, race/ethnicity and gender in shaping the economic outcomes of foreign-born
                                New York State residents.
                            </TEXT>
                        </CONTAINER>
                    </div>

                    <div style={{display:'flex', marginTop: 'calc(85vh - 100px)',
                        width: '100vw',height:'100px',
                        justifyContent: 'space-around', background:'#ffffff'}}>
                        <img src={process.env.PUBLIC_URL + '/img/CWG_LOGO.png'} style={{height:'100px'}}/>
                        <div><img src={process.env.PUBLIC_URL + '/img/logo-task-force-logo-color.jpg'} style={{height:'100px'}}/>
                        </div>
                        <div><img src={process.env.PUBLIC_URL + '/img/seal-assembly-logo.jpg'} style={{height:'100px'}}/></div>
                    </div>

                </div>
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
export default Introduction


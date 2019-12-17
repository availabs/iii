import React from 'react';
import {
    HEADER, CONTAINER, TEXT
} from '../theme/componentsNew'
import styled from "styled-components";
const background = '/img/iii.jpg';
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
    '-webkit-box-pack': 'center',
    'justify-content': 'center',
    '-webkit-box-align': 'center',
    'align-items': 'center'
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
                <div style={{height:'400px'}}>
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


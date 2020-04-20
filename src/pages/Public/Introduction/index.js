import React from 'react';
import {CONTAINER, HEADER, TEXT} from '../theme/componentsNew'

const background = process.env.PUBLIC_URL + '/img/iii.jpg';
const backgroundCSS = {
    backgroundImage: 'url(' + background + ')',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height: '95vh',
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
        this.state = {}
    }

    render() {
        return (
            <div style={backgroundCSS}>
                <div style={{height: '100%'}}>
                    <div style={{height: '400px', float: 'left', marginTop: '100px'}}>
                        <HEADER>
                            Immigrant Integration Index
                        </HEADER>
                        <CONTAINER>
                            <TEXT>
                                The Immigrant Integration Index seeks to deepen the understanding of the moderating
                                effects of
                                nativity status, race/ethnicity and gender in shaping the economic outcomes of
                                foreign-born
                                New York State residents.
                            </TEXT>
                        </CONTAINER>
                    </div>
                    <div className="col-md-12"
                         style={{
                             color: 'rgb(239, 239, 239)', overflow: 'hidden auto',
                             padding: '10px', top:'25px', fontSize: '11px', textAlign: 'right', backgroundColor: `rgb(255, 255, 255)`
                         }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-10" style={{width: '100%'}}>
                                    <img className="img-fluid"
                                         src={process.env.PUBLIC_URL + '/img/CWG_LOGO.png'}
                                         style={{float: 'left', paddingTop: '45px'}}/>
                                    <img className="img-fluid"
                                         src={process.env.PUBLIC_URL + '/img/seal-assembly-logo.jpg'}
                                         style={{float: 'right', height: '150px', padding: '5px'}}/>
                                    <img className="img-fluid"
                                         src={process.env.PUBLIC_URL + '/img/logo-task-force-logo-color.jpg'}
                                         style={{float: 'right', height: '150px', padding: '5px'}}/>

                                </div>
                            </div>
                        </div>
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


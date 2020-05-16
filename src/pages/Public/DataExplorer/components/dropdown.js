import React from "react";
import styled from "styled-components";
import config,{measures, chartmeasures} from '../data_config'
import {connect} from "react-redux";
import get from 'lodash.get'
const DIV = styled.div`
            * {
            width: 200px;
            height: 100px;
            white-space: pre-wrap;           
            text-align-last: center;
            
           
            -ms-word-break: break-all;
            word-break: break-all;
            -webkit-hyphens: auto;
            -moz-hyphens: auto;
             hyphens: auto;
            }
`;
const selectStyle = { border:'none', backgroundColor: '#5a6a92', color: '#fff', fontSize:'16px',width: '100%', maxWidth: '350px',
    margin: '10px'}
class Dropdown extends React.Component{
    render(){
        console.log('check',this.props.year)
        return (
            <DIV style={{display: 'flex', width:'100vw', justifyContent: 'space-evenly', backgroundColor: '#5a6a92', boxShadow: '0px 1px 5px grey', marginBottom: '7px'}}>
                {this.props.showYear ?
                    <select
                        className='dropdown-toggle'
                        style={selectStyle}
                        id='year'
                        data-error="Please select a year"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({year: e.target.value/*, indicator: '',nativity:'',education:''*/})
                            }
                        }}
                        value={this.props.year}
                    >
                        <option key={0} value={'none'} style={{fontSize:'16px'}}>-- Year --</option>
                        {Object.keys(config).sort(function(a, b){return b-a}).map((h,h_i) => <option key={h_i+1} value={h} style={{fontSize:'16px'}}>{h}</option>)}
                    </select> : null}

                {this.props.showIndicator ?
                    <select
                        className="btn-white dropdown-toggle"
                        style={selectStyle}
                        id='indicator'
                        data-error="Please select an indicator"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({indicator: e.target.value/*,nativity:'',education:''*/})
                            }
                        }}
                        value={this.props.indicator}
                    >
                        <option key={0} value={'none'} style={{fontSize:'16px'}}>-- Analysis By Variable --</option>
                        {this.props.year && config[this.props.year] ?
                            Object.keys(config[this.props.year]).map((h,h_i) => <option key={h_i+1} value={h} style={{fontSize:'16px'}}>{h}</option>)
                            : null
                        }
                    </select> : null}

                {this.props.showNativity ?
                    <select
                        className="btn-white dropdown-toggle"
                        style={selectStyle}
                        id='nativity'
                        data-error="Please select Nativity"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({nativity: e.target.value/*,education:''*/})
                            }
                        }}
                        value={this.props.nativity}
                    >
                        <option key={0} value={'none'} style={{fontSize:'16px'}}>-- Analysis By Group --</option>
                        {this.props.year && this.props.indicator && config[this.props.year][this.props.indicator]?
                            Object.keys(config[this.props.year][this.props.indicator])
                                .filter(k => k !== 'info')
                                .map((h,h_i) => <option key={h_i+1} value={h} style={{fontSize:'16px'}}>{h}</option>)
                            : null
                        }
                    </select> : null}

                {this.props.showEdu ?
                    <select
                        className="btn-white dropdown-toggle"
                        style={selectStyle}
                        id='education'
                        data-error="Please select education"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({education: e.target.value})
                            }
                        }}
                        value={this.props.education}
                    >
                        <option key={0} value={'none'} style={{fontSize:'16px'}}>-- Analysis By Educational Attainment --</option>
                        {this.props.year && this.props.indicator && this.props.nativity && get(config,`${this.props.year}.${this.props.indicator}.${this.props.nativity}`, null) ?
                            Object.keys(config[this.props.year][this.props.indicator][this.props.nativity]).map((h,h_i) => <option key={h_i+1} value={h} style={{fontSize:'16px'}}>{h}</option>)
                            : null
                        }
                    </select> : null}

                {this.props.showMeasure ?
                    <select
                        className="btn-white dropdown-toggle"
                        style={selectStyle}
                        id='measure'
                        data-error="Please select measure"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({measure: e.target.value})
                            }
                        }}
                        value={this.props.measure}
                    >
                        <option key={0} value={'none'} style={{fontSize:'16px'}}>-- Indicator --</option>
                        {Object.keys(measures).map((h,h_i) => <option key={h_i+1} value={measures[h]} style={{fontSize:'16px'}}>{h}</option>)}
                    </select> : null}

                    {this.props.showChartMeasure ?
                    <select
                        className="btn-white dropdown-toggle"
                        style={selectStyle}
                        id='measure'
                        data-error="Please select measure"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                console.log('e', e.target)
                                this.props.setState({chartmeasure: e.target.value})
                            }
                        }}
                        value={this.props.chartmeasure}
                    >
                        <option key={0} value={'none'} style={{fontSize:'16px'}}>-- Measure --</option>
                        {chartmeasures.map((h,h_i) => <option key={h_i+1} value={h} style={{fontSize:'16px'}}>{h}</option>)}
                    </select> : null}

                {this.props.showDownload ?
                    <a className="el-buttons-list full-width"
                       style={{cursor: 'pointer'}}
                       onClick={() => {
                           this.props.onDownloadClick()
                       }}>
                        <img style={{width:'50px', height: '67px', paddingTop:'7px'}}
                             className="img-fluid" src={process.env.PUBLIC_URL + "/img/doc_thumb.png"} />
                        <div className="btn btn-bg">
                            <span style={{color:'#fff'}}>Download Report as PDF</span>
                        </div>
                    </a> : null}
            </DIV>
        )
    }
}

Dropdown.defaultProps = {
    showYear: true,
    showIndicator: true,
    showNativity: true,
    showEdu: true,
    showMeasure: true,
    showChartMeasure: true,
    showDownload: true
}

const mapStateToProps = (state, ownProps) => {
    return {
        router: state.router
    };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)
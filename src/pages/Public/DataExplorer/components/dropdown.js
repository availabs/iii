import React from "react";
import styled from "styled-components";
import config,{measures} from '../data_config'
import {connect} from "react-redux";
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
const selectStyle = { border:'none', backgroundColor: '#5a6a92', color: '#fff', fontSize:'1.1rem'}
class Dropdown extends React.Component{
    render(){
        return (
            <DIV style={{display: 'flex', width:'100vw', justifyContent: 'space-evenly', backgroundColor: '#5a6a92', boxShadow: '0px 1px 5px grey', marginBottom: '7px'}}>
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
                        <option key={0} value={'none'}>-- Year --</option>
                        {Object.keys(config).map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)}
                    </select>

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
                        <option key={0} value={'none'}>-- Indicator --</option>
                        {this.props.year && config[this.props.year] ?
                            Object.keys(config[this.props.year]).map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)
                            : null
                        }
                    </select>

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
                        <option key={0} value={'none'}>-- Nativity --</option>
                        {this.props.year && this.props.indicator && config[this.props.year][this.props.indicator]?
                            Object.keys(config[this.props.year][this.props.indicator])
                                .filter(k => k !== 'info')
                                .map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)
                            : null
                        }
                    </select>

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
                        <option key={0} value={'none'}>- Education Level --</option>
                        {this.props.year && this.props.indicator && this.props.nativity && config[this.props.year][this.props.indicator][this.props.nativity] ?
                            Object.keys(config[this.props.year][this.props.indicator][this.props.nativity]).map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)
                            : null
                        }
                    </select>

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
                        <option key={0} value={'none'}>-- Measure --</option>
                        {Object.keys(measures).map((h,h_i) => <option key={h_i+1} value={measures[h]}>{h}</option>)}
                    </select>

                <a className="el-buttons-list full-width"
                   style={{cursor: 'pointer'}}
                   onClick={() => {
                       this.props.onDownloadClick()
                   }}>
                    <img style={{width:'50px', paddingTop:'7px'}}
                         className="img-fluid" src={"/img/doc_thumb.png"} />
                    <div className="btn btn-bg">
                        <span style={{color:'#fff'}}>Download Report as PDF</span>
                    </div>
                </a>
            </DIV>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        router: state.router
    };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)
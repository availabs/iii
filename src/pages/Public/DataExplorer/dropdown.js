import React from "react";
import styled from "styled-components";
import {config, measures} from './data_config'
import {connect} from "react-redux";
const STICKYDROPDOWN = styled.div`
                       select {
                       z-index:100;
                       position:flex;
                       }
                        `;
class Dropdown extends React.Component{
    render(){
        return (
            <div style={{display: 'flex', width:'100vw', justifyContent: 'space-evenly'}}>
                    <select
                        className='btn btn-white dropdown-toggle'
                        style={{ border:'none'}}
                        id='year'
                        data-error="Please select a year"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                console.log('e.target.value',e.target.value)
                                this.props.setState({year: e.target.value, indicator: '',nativity:'',education:''})
                            }
                        }}
                        value={this.props.year}
                    >
                        <option key={0} value={'none'}>--Select Year--</option>
                        {Object.keys(config).map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)}
                    </select>

                    <select
                        className="btn btn-white dropdown-toggle"
                        id='indicator'
                        data-error="Please select an indicator"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({indicator: e.target.value,nativity:'',education:''})
                            }
                        }}
                        value={this.props.indicator}
                    >
                        <option key={0} value={'none'}>--Select Indicator--</option>
                        {this.props.year && config[this.props.year] ?
                            Object.keys(config[this.props.year]).map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)
                            : null
                        }
                    </select>

                    <select
                        className="btn btn-white dropdown-toggle"
                        id='nativity'
                        data-error="Please select Nativity"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({nativity: e.target.value,education:''})
                            }
                        }}
                        value={this.props.nativity}
                    >
                        <option key={0} value={'none'}>--Select Nativity--</option>
                        {this.props.year && this.props.indicator && config[this.props.year][this.props.indicator]?
                            Object.keys(config[this.props.year][this.props.indicator]).map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)
                            : null
                        }
                    </select>

                    <select
                        className="btn btn-white dropdown-toggle"
                        id='education'
                        data-error="Please select education"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({education: e.target.value})
                            }
                        }}
                        value={this.props.education}
                    >
                        <option key={0} value={'none'}>--Select Education Level--</option>
                        {this.props.year && this.props.indicator && this.props.nativity && config[this.props.year][this.props.indicator][this.props.nativity] ?
                            Object.keys(config[this.props.year][this.props.indicator][this.props.nativity]).map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)
                            : null
                        }
                    </select>

                    <select
                        className="btn btn-white dropdown-toggle"
                        id='measure'
                        data-error="Please select measure"
                        onChange={(e) => {
                            if (e.target.value !== 'none') {
                                this.props.setState({measure: e.target.value})
                            }
                        }}
                        value={this.props.measure}
                    >
                        <option key={0} value={'none'}>--Select Measure--</option>
                        {measures.map((h,h_i) => <option key={h_i+1} value={h}>{h}</option>)}
                    </select>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log('DD state', state)
    return {
        router: state.router
    };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown)
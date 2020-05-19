import React from 'react';
import Element from "../../../components/light-admin/containers/Element";
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import DROPDOWN from "../DataExplorer/components/dropdown";
import {connect} from "react-redux";
import StackedBarChart from "./components/charts/bar/stackedBarChart";
import GroupedTripleStackedBarChart from "./components/charts/bar/groupedTripleStackedBarChart";
import BarChart from "./components/charts/bar/simpleBarChart";
import SimpleStackedBarChart from "./components/charts/bar/simpleStackedBarChart";
import {TEXT} from "../theme/componentsNew";
import get from "lodash.get";
import config from "../DataExplorer/data_config";
class DataSnapshots extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year : '2018',
            chartmeasure:'Demographics'
        }
    }

    setStateOnChange(state){
        this.setState(Object.assign(this.state, state))
    }
    render() {
        return (
            <div className='row' style={{marginTop:'15px'}}>
                <div className='col-sm-12'>
                        <DROPDOWN
                            showIndicator ={false}
                            showNativity={false}
                            showEdu={false}
                            showDownload={false}
                            showMeasure={false}
                            {...this.state}
                            setState={this.setStateOnChange.bind(this)}
                        />

                    {
                        this.state.year === '' || this.state.chartmeasure === '' ?
                            <ElementBox>
                                <div style={{display: 'flex',width: '100vw', justifyContent: 'center'}}>
                                    {
                                        <TEXT style={{color:'black', textTransform: 'uppercase'}}> Please make Selection to view charts. </TEXT>

                                    }

                                </div>
                            </ElementBox> :
                            <div>
                                {/*Unemployment*/}
                                {
                                    ['2014','2015','2016','2017','2018'].includes(this.state.year) && this.state.chartmeasure === 'Unemployment' ?
                                        <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                            <StackedBarChart type={['UnEmp']} nativity={["Foreign Born","Native Born"]} year={[this.state.year]}
                                                             title={'Unemployment rate (%) of Foreign(English Proficient) and Native Born -'}
                                                             maxRange ={[50]}
                                                             minRange={[-50]}
                                            />
                                            <StackedBarChart type={['UnEmp']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                                                             year={[this.state.year]}
                                                             title={'Unemployment rate (%) of Foreign Born people of color(English proficient) and Native Born White Non Hispanic - '}
                                                             maxRange ={[100]}
                                                             minRange={[-100]}
                                            />
                                            <StackedBarChart type={['UnEmp']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                                             year={[this.state.year]}
                                                             title={'Unemployment rate (%) of Foreign Born (English proficient) both Male and Female - '}
                                                             maxRange ={[100]}
                                                             minRange={[-100]}
                                            />
                                        </div>
                                        :
                                        this.state.year === 'HISPANIC New Yorkers 5 year Estimate(2013-2017)' && this.state.chartmeasure === 'Unemployment' ?
                                            <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                                <StackedBarChart type={['UnEmp']} nativity={["Foreign Born Hispanic","Native Born Hispanic"]} year={[this.state.year]}
                                                                 title={'Unemployment rate (%) of Foreign(English Proficient) Hispanic and Native Born Hispanic New Yorkers-'}
                                                                 maxRange ={[100]}
                                                                 minRange={[-100]}
                                                />
                                                <StackedBarChart type={['UnEmp']} nativity={["Foreign Born Hispanic People of Color","Foreign Born White Non Hispanic"]}
                                                                 year={[this.state.year]}
                                                                 title={'Unemployment rate (%) of Foreign Born Hispanic people of color(English proficient) and Foreign Born White Non Hispanic - '}
                                                                 maxRange ={[100]}
                                                                 minRange={[-100]}
                                                />
                                                <StackedBarChart type={['UnEmp']} nativity={["Foreign Born Hispanic Male","Foreign Born Hispanic Female"]}
                                                                 year={[this.state.year]}
                                                                 title={'Unemployment rate (%) of Foreign Born Hispanic (English proficient) both Male and Female - '}
                                                                 maxRange ={[100]}
                                                                 minRange={[-100]}
                                                />
                                            </div>
                                            :
                                        null
                                }
                                {/* Average Income*/}
                                {
                                    ['2014','2015','2016','2017','2018'].includes(this.state.year) && this.state.chartmeasure === 'Income' ?
                                        <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                            <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born","Native Born"]} year={[this.state.year]}
                                                             title={'Income level of Foreign(English Proficient) and Native born - '}/>
                                            <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                                                             year={[this.state.year]}
                                                             title={'Income level of Foreign born prople of color(English Proficient) and Native born white non hispanic - '}/>
                                            <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                                             year={[this.state.year]}
                                                             title={'Income level of Foreign(English Proficient) born Male and Female  - '}/>
                                        </div>
                                        :
                                        this.state.year === 'HISPANIC New Yorkers 5 year Estimate(2013-2017)' && this.state.chartmeasure === 'Income'?
                                            <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                                <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born Hispanic","Native Born Hispanic"]} year={[this.state.year]}
                                                                 title={'Income level of Foreign(English Proficient) born Hispanic and Native born Hispanic- '}/>
                                                <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born Hispanic People of Color","Foreign Born White Non Hispanic"]}
                                                                 year={[this.state.year]}
                                                                 title={'Income level of Foreign born Hispanic people of color(English Proficient) and Foreign born white non hispanic - '}/>
                                                <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born Hispanic Male","Foreign Born Hispanic Female"]}
                                                                 year={[this.state.year]}
                                                                 title={'Income level of Foreign(English Proficient) born Hispanic Male and Female  - '}/>
                                            </div>
                                            :
                                        null
                                }

                                {/*Poverty*/}
                                {
                                    ['2014','2015','2016','2017','2018'].includes(this.state.year) && this.state.chartmeasure === 'Poverty' ?
                                        <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                            <StackedBarChart type={['Poverty']} nativity={["Foreign Born","Native Born"]} year={[this.state.year]}
                                                             title={'Poverty rate (%) of Foreign(English Proficient) and Native born  - '}/>
                                            <StackedBarChart type={['Poverty']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                                                             year={[this.state.year]}
                                                             title={'Poverty rate (%) of Foreign born people of color(English Proficient) and Native born white non hispanic - '}/>
                                            <StackedBarChart type={['Poverty']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                                             year={[this.state.year]}
                                                             title={'Poverty rate (%) of Foreign(English Proficient) born Male and Female  - '}/>
                                        </div>
                                        :
                                        this.state.year === 'HISPANIC New Yorkers 5 year Estimate(2013-2017)' && this.state.chartmeasure === 'Poverty'?
                                            <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                                <StackedBarChart type={['Poverty']} nativity={["Foreign Born Hispanic","Native Born Hispanic"]} year={[this.state.year]}
                                                                 title={'Poverty rate (%) of Foreign(English Proficient) and Native born Hispanic New Yorkers  - '}
                                                                 maxRange ={[100]}
                                                                 minRange={[-100]}
                                                />
                                                <StackedBarChart type={['Poverty']} nativity={["Foreign Born Hispanic People of Color","Foreign Born White Non Hispanic"]}
                                                                 year={[this.state.year]}
                                                                 title={'Poverty rate (%) of Foreign born Hispanic people of color(English Proficient) and Foreign born white non hispanic - '}
                                                                 maxRange ={[100]}
                                                                 minRange={[-100]}
                                                />
                                                <StackedBarChart type={['Poverty']} nativity={["Foreign Born Hispanic Male","Foreign Born Hispanic Female"]}
                                                                 year={[this.state.year]}
                                                                 title={'Poverty rate (%) of Foreign(English Proficient) born Hispanic Male and Female  - '}
                                                                 maxRange ={[100]}
                                                                 minRange={[-100]}
                                                />
                                            </div>
                                            :
                                        null
                                }

                                {/*Educational Attainment*/}
                                {
                                    ['2014','2015','2016','2017','2018'].includes(this.state.year) && this.state.chartmeasure === 'Educational Attainment' ?
                                        <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                            <GroupedTripleStackedBarChart
                                                type={['Edu_percent']} nativity={["Foreign Born","Native Born"]} year={[this.state.year]}
                                                title={'% of Educational Attainment of Foreign(English Proficient) and Native born - '}
                                            />
                                            <GroupedTripleStackedBarChart type={['Edu_percent']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                                                                          year={[this.state.year]}
                                                                          title={'% of Educational Attainment of Foreign born people of color(English Proficient) and Native born white non hispanic - '}/>
                                            <GroupedTripleStackedBarChart type={['Edu_percent']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                                                          year={[this.state.year]}
                                                                          title={'% of Educational Attainment of  Foreign(English Proficient) born Male and Female  - '}/>
                                        </div>
                                        :
                                        this.state.year === 'HISPANIC New Yorkers 5 year Estimate(2013-2017)' && this.state.chartmeasure === "Educational Attainment" ?
                                            <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                                <GroupedTripleStackedBarChart
                                                    type={['Edu_percent']} nativity={["Foreign Born Hispanic","Native Born Hispanic"]} year={[this.state.year]}
                                                    title={'% of Educational Attainment of Foreign(English Proficient) and Native born Hispanic New Yorkers - '}
                                                />
                                                <GroupedTripleStackedBarChart type={['Edu_percent']} nativity={["Foreign Born Hispanic People of Color","Foreign Born White Non Hispanic"]}
                                                                              year={[this.state.year]}
                                                                              title={'% of Educational Attainment of Foreign born Hispanic people of color(English Proficient) and Foreign  born white non hispanic - '}/>
                                                <GroupedTripleStackedBarChart type={['Edu_percent']} nativity={["Foreign Born Hispanic Male","Foreign Born Hispanic Female"]}
                                                                              year={[this.state.year]}
                                                                              title={'% of Educational Attainment of  Foreign(English Proficient) born  Hispanic Male and Female  - '}/>
                                            </div>
                                            :
                                            null

                                }
                                {/*Demographics*/}
                                {
                                    ['2014','2015','2016','2017','2018'].includes(this.state.year) && this.state.chartmeasure === 'Demographics' ?
                                        <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                            <BarChart
                                                type={['Demographics']} year={[this.state.year]}
                                                nativity={["Foreign Born"]}
                                                title={'Foreign born population across New York state region - '}
                                            />
                                        </div>
                                        :
                                        this.state.year === 'HISPANIC New Yorkers 5 year Estimate(2013-2017)' && this.state.chartmeasure === 'Demographics' ?
                                            <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                                <div>
                                                    <BarChart
                                                        type={['Demographics']} year={[this.state.year]}
                                                        nativity={["Foreign Born"]}
                                                        title={'Foreign born Hispanic population across New York state region - '}
                                                    />
                                                </div>
                                                <div>
                                                    <BarChart
                                                        type={['Demographics']} year={[this.state.year]}
                                                        nativity={["Foreign Born Hispanic People of Color"]}
                                                        title={'Foreign born Hispanic People of Color population across New York state region - '}
                                                    />
                                                </div>
                                            </div>
                                            :
                                            null
                                }

                                {/*English Proficiency*/}
                                {
                                    ['2014','2015','2016','2017','2018'].includes(this.state.year) && this.state.chartmeasure === 'English Proficiency' ?
                                        <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                            <SimpleStackedBarChart
                                                type={['Eng_Prof']} year ={[this.state.year]}
                                                nativity={["Foreign Born","Foreign Born People of Color"]}
                                                title={'English Proficiency (%) among Foreign born residents across regions of New York state - '}
                                            />
                                            <br/>
                                            <SimpleStackedBarChart
                                                type={["Eng_Prof"]} year ={[this.state.year]}
                                                nativity={["Foreign Born Male","Foreign Born Female"]}
                                                title={'English Proficiency (%) among Foreign born Men and Women of New York state - '}
                                            />
                                        </div>
                                        :
                                        this.state.year === 'HISPANIC New Yorkers 5 year Estimate(2013-2017)' && this.state.chartmeasure === 'English Proficiency' ?
                                            <div style = {{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center'}}>
                                                <SimpleStackedBarChart
                                                    type={['Eng_Prof']} year ={[this.state.year]}
                                                    nativity={["Foreign Born Hispanic","Native Born Hispanic"]}
                                                    title={'English Proficiency (%) among Foreign born Hispanic and Native born Hispanic residents across regions of New York state - '}
                                                />
                                                <br/>
                                                <SimpleStackedBarChart
                                                    type={["Eng_Prof"]} year ={[this.state.year]}
                                                    nativity={["Foreign Born Hispanic People of Color","Foreign Born White Non Hispanic"]}
                                                    title={'English Proficiency (%) among Foreign born Hispanic People of color and Foreign Born White Non Hispanic New York state - '}
                                                />
                                                <br/>
                                                <SimpleStackedBarChart
                                                    type={["Eng_Prof"]} year ={[this.state.year]}
                                                    nativity={["Foreign Born Hispanic Male","Foreign Born Hispanic Female"]}
                                                    title={'English Proficiency (%) among Foreign born Hispanic Men and Women of New York state - '}
                                                />
                                            </div>
                                            :
                                        null
                                }

                                }
                            </div>

                    }


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
export default [{
    icon: 'os-icon-home',
    path: '/charts',
    exact: true,
    name: 'Data Snapshots',
    auth: false,
    mainNav: true,
    breadcrumbs: [
        {name: 'Snapshots', path: '/charts'},
        {param: 'year', path: '/charts/'}
    ],
    menuSettings: {
        image: 'none',
        scheme: 'color-scheme-dark',
        position: 'menu-position-top',
        layout: 'menu-layout-full',
        style: 'color-style-default'
    },
    component: connect(mapStateToProps, mapDispatchToProps)(DataSnapshots)
}];


import React from 'react';
import Element from "../../../components/light-admin/containers/Element";
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import DROPDOWN from "../DataExplorer/components/dropdown";
import {connect} from "react-redux";
import StackedBarChart from "./components/charts/bar/stackedBarChart";
import GroupedTripleStackedBarChart from "./components/charts/bar/groupedTripleStackedBarChart";
import PieChart from "./components/charts/pie/pieChart";
import SimpleStackedBarChart from "./components/charts/bar/simpleStackedBarChart";
class DataSnapshots extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    setStateOnChange(state){
        this.setState(Object.assign(this.state, state))
    }
    render() {
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <ElementBox>
                        <DROPDOWN
                            {...this.state}
                            setState={this.setStateOnChange.bind(this)}
                        />
                    </ElementBox>
                    {/*Unemployment*/}
                    <StackedBarChart type={['UnEmp']} nativity={["Foreign Born","Native Born"]} year={[2014]} title={'Unemployment rate (%) of Foreign(English Proficient) and Native Born -'}/>
                    <StackedBarChart type={['UnEmp']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                    year={[2014]}
                    title={'Unemployment rate (%) of Foreign Born people of color(English proficient) and Native Born White Non Hispanic - '}/>
                    <StackedBarChart type={['UnEmp']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                     year={[2014]}
                                     title={'Unemployment rate (%) of Foreign Born (English proficient) both Male and Female - '}/>

                    {/* Average Income*/}
                    <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born","Native Born"]} year={[2014]}
                                     title={'Income level of Foreign(English Proficient) and Native born - '}/>
                    <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                                     year={[2014]}
                                     title={'Income level of Foreign born prople of color(English Proficient) and Native born white non hispanic - '}/>
                    <StackedBarChart type={['Avg_PINCP']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                     year={[2014]}
                                     title={'Income level of Foreign(English Proficient) born Male and Female  - '}/>
                    {/*Poverty*/}
                    <StackedBarChart type={['Poverty']} nativity={["Foreign Born","Native Born"]} year={[2014]}
                                     title={'Poverty rate (%) of Foreign(English Proficient) and Native born  - '}/>
                    <StackedBarChart type={['Poverty']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                                     year={[2014]}
                                     title={'Poverty rate (%) of Foreign born people of color(English Proficient) and Native born white non hispanic - '}/>
                    <StackedBarChart type={['Poverty']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                     year={[2014]}
                                     title={'Poverty rate (%) of Foreign(English Proficient) born Male and Female  - '}/>
                    {/*Educational Attainment*/}
                    <GroupedTripleStackedBarChart
                        type={['Edu_percent']} nativity={["Foreign Born","Native Born"]} year={[2014]}
                        title={'% of Educational Attainment of Foreign(English Proficient) and Native born - '}
                    />
                    <GroupedTripleStackedBarChart type={['Edu_percent']} nativity={["Foreign Born People of Color","Native Born White Non Hispanic"]}
                                     year={[2014]}
                                     title={'% of Educational Attainment of Foreign born people of color(English Proficient) and Native born white non hispanic - '}/>
                    <GroupedTripleStackedBarChart type={['Edu_percent']} nativity={["Foreign Born Male","Foreign Born Female"]}
                                     year={[2014]}
                                     title={'% of Educational Attainment of  Foreign(English Proficient) born Male and Female  - '}/>
                    {/*Demographics*/}
                    <PieChart
                        type={['Demographics']} year={[2014]}
                        nativity={["Foreign Born"]}
                        title={'Foreign born population across New York state region - '}
                    />
                    {/*English Proficiency*/}
                    <SimpleStackedBarChart
                        type={['Eng_Prof']} year ={[2014]}
                        nativity={["Foreign Born","Foreign Born People of Color"]}
                        title={'English Proficiency (%) among Foreign born residents across regions of New York state - '}
                    />
                    <br/>
                    <SimpleStackedBarChart
                    type={["Eng_Prof"]} year ={[2014]}
                    nativity={["Foreign Born Male","Foreign Born Female"]}
                    title={'English Proficiency (%) among Foreign born Men and Women of New York state - '}
                    />
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


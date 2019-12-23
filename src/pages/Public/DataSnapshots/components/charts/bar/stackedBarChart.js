import { ResponsiveBar } from '@nivo/bar'
import React from "react";
import config from 'pages/Public/DataSnapshots/csv_config.js'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import Element from "../../../../../../components/light-admin/containers/Element";
import ElementBox from "../../../../../../components/light-admin/containers/ElementBox";


const regions = ['Western NY', 'Southern NY', 'North Country', 'New York City', 'Mohawk Valley', 'Mid-Hudson', 'Long Island',
    'Finger Lakes', 'Central NY', 'Capital Region']
class StackedBarChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            width: 100,
            height: 100,
            data : []
        };
        this.transformData = this.transformData.bind(this)
    }
    componentDidUpdate(oldProps){
        if (oldProps.year[0] !== this.props.year[0]){
            this.componentDidMount()
        }
    }
    componentDidMount(){
        this.transformData().then(d =>{
            this.setState({
                data : d[0]
            })
        })
    }

    transformData(){
        let FB_ALL_CSV = '';
        let NB_ALL_CSV = '';
        let male_csv = '';
        let female_csv='';
        let MALE_DATA = [];
        let FEMALE_DATA = [];
        let FB_ALL_data = [];
        let NB_ALL_data = [];
        let obj = {};
        let axis_data_foreign = [];
        let stack_data_foreign = [];
        let axis_data_native = [];
        let stack_data_native = [];
        let axisData = [];
        let stackData = [];
        config[this.props.year][this.props.type].forEach(item =>{
            if(this.props.nativity[0].includes('Male')){
                if(item[this.props.nativity[0]]) {
                    male_csv = item[this.props.nativity[0]]
                    female_csv = item[this.props.nativity[1]]
                }
            }
            else {
                if(item[this.props.nativity[0]]) {
                    FB_ALL_CSV = item[this.props.nativity[0]]
                    NB_ALL_CSV = item[this.props.nativity[1]]
                }
            }
        });
        let type = this.props.type[0]
        if(male_csv.length > 0 && female_csv.length > 0){
            if(this.props.type.includes('Avg_PINCP')){
                return Promise.all([d3.csv(male_csv), d3.csv(female_csv)])
                    .then(function(files) {
                        MALE_DATA = files[0];
                        FEMALE_DATA = files[1];
                        MALE_DATA.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_m']),
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_m']),

                                })
                                stack_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_m']),
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_m']),

                                })
                            }
                        })
                        FEMALE_DATA.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_f']),
                                    "High School Diploma some college native":-parseFloat(item['BABS_Avg_PINCP_f']),
                                })
                                stack_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_m']),
                                    "High School Diploma some college native":-parseFloat(item['BABS_Avg_PINCP_m']) ,
                                })
                            }
                        })
                        Object.values(axis_data_native).forEach(function (axis_data_native, i) {
                            obj = {...axis_data_foreign[i], ...axis_data_native}
                            axisData.push(obj)
                        })

                        Object.values(stack_data_native).forEach(function(stack_data_native,i) {
                            obj = {...stack_data_foreign[i], ...stack_data_native}
                            stackData.push(obj)
                        })

                        return ([axisData,stackData])
                    }).catch(function(err) {
                        // handle error here
                    })
            }else{
                return Promise.all([d3.csv(male_csv), d3.csv(female_csv)])
                    .then(function(files) {
                        MALE_DATA = files[0];
                        FEMALE_DATA = files[1];
                        MALE_DATA.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                if(parseFloat(item['BABS_'+type+'_Total']) && parseFloat(item['HS_'+type+'_Total']) < 1){
                                    axis_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_M']) * 100,
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_M']) * 100,

                                    })
                                    stack_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_M']) * 100,
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_M']) * 100,

                                    })
                                }else{
                                    axis_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_M']),
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_M']),

                                    })
                                    stack_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_M']),
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_M']),

                                    })
                                }

                            }
                        })
                        FEMALE_DATA.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                if(parseFloat(item['BABS_'+type+'_Total']) && parseFloat(item['HS_'+type+'_Total']) < 1){
                                    axis_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_F']) * 100,
                                        "High School Diploma some college native":-parseFloat(item['BABS_'+type+'_F']) * 100,
                                    })
                                    stack_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_F']) * 100,
                                        "High School Diploma some college native":-parseFloat(item['BABS_'+type+'_F']) * 100 ,
                                    })
                                }else{
                                    axis_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_F']),
                                        "High School Diploma some college native":-parseFloat(item['BABS_'+type+'_F']),
                                    })
                                    stack_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_F']),
                                        "High School Diploma some college native":-parseFloat(item['BABS_'+type+'_F']) ,
                                    })
                                }

                            }
                        })
                        Object.values(axis_data_native).forEach(function (axis_data_native, i) {
                            obj = {...axis_data_foreign[i], ...axis_data_native}
                            axisData.push(obj)
                        })

                        Object.values(stack_data_native).forEach(function(stack_data_native,i) {
                            obj = {...stack_data_foreign[i], ...stack_data_native}
                            stackData.push(obj)
                        })

                        return ([axisData,stackData])
                    }).catch(function(err) {
                        // handle error here
                    })
            }

        }else{
            // write here
            if(this.props.type.includes('Avg_PINCP')){
                return Promise.all([d3.csv(FB_ALL_CSV), d3.csv(NB_ALL_CSV)])
                    .then(function(files) {
                        FB_ALL_data = files[0];
                        NB_ALL_data = files[1];

                        FB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_mf_t']),
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_mf_t']),

                                })
                                stack_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_mf_t']),
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_mf_t']),

                                })
                            }
                        })
                        NB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_mf_t']),
                                    "High School Diploma some college native":-parseFloat(item['HS_Avg_PINCP_mf_t']),
                                })
                                stack_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_mf_t']),
                                    "High School Diploma some college native":-parseFloat(item['HS_Avg_PINCP_mf_t']) ,
                                })
                            }
                        })
                        Object.values(axis_data_native).forEach(function (axis_data_native, i) {
                            obj = {...axis_data_foreign[i], ...axis_data_native}
                            axisData.push(obj)
                        })

                        Object.values(stack_data_native).forEach(function(stack_data_native,i) {
                            obj = {...stack_data_foreign[i], ...stack_data_native}
                            stackData.push(obj)
                        })

                        return ([axisData,stackData])
                    }).catch(function(err) {
                        // handle error here
                    })
            }else{
                return Promise.all([d3.csv(FB_ALL_CSV), d3.csv(NB_ALL_CSV)])
                    .then(function(files) {
                        FB_ALL_data = files[0];
                        NB_ALL_data = files[1];

                        FB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                if(parseFloat(item['BABS_'+type+'_Total']) && parseFloat(item['HS_'+type+'_Total']) < 1){
                                    axis_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_Total']) * 100,
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_Total']) * 100,

                                    })
                                    stack_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_Total']) * 100,
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_Total']) * 100,

                                    })
                                }else{
                                    axis_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_Total']),
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_Total']),

                                    })
                                    stack_data_foreign.push({
                                        "region":item['puma'],
                                        "College Degree or better foreign":parseFloat(item['BABS_'+type+'_Total']),
                                        "High_School_Diploma_some_college_foreign":parseFloat(item['HS_'+type+'_Total']),

                                    })
                                }

                            }
                        })
                        NB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                if(parseFloat(item['BABS_'+type+'_Total']) && parseFloat(item['HS_'+type+'_Total']) < 1){
                                    axis_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_Total']) * 100,
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_Total']) * 100,
                                    })
                                    stack_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_Total']) * 100,
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_Total'])* 100,
                                    })
                                }else{
                                    axis_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_Total']),
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_Total']),
                                    })
                                    stack_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_Total']),
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_Total']) ,
                                    })
                                }

                            }
                        })
                        Object.values(axis_data_native).forEach(function (axis_data_native, i) {
                            obj = {...axis_data_foreign[i], ...axis_data_native}
                            axisData.push(obj)
                        })

                        Object.values(stack_data_native).forEach(function(stack_data_native,i) {
                            obj = {...stack_data_foreign[i], ...stack_data_native}
                            stackData.push(obj)
                        })

                        return ([axisData,stackData])
                    }).catch(function(err) {
                        // handle error here
                    })
            }

        }





    }


    render(){
        const style={
            height: 400,
            width: 1000,
            padding: 20
        };
        return (
            <ElementBox style={style}>
                <h6 style={{textAlign:'center'}}>{this.props.title}{this.props.year}</h6>
                {this.props.type.includes('Avg_PINCP') ?
                    <ResponsiveBar
                        data={this.state.data}
                        margin={{
                            top: 50,
                            right: 250,
                            bottom: 60,
                            left: 180
                        }}
                        indexBy="region"
                        keys={["College Degree or better foreign", "High_School_Diploma_some_college_foreign", "College Degree or better native", "High School Diploma some college native"]}
                        padding={0.3}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#000000',
                                size: 1,
                                padding: 1,
                                stagger: true
                            },

                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'College Degree or better native'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'High School Diploma some college native'
                                },
                                id: 'dots'
                            },

                        ]}
                        layout="horizontal"
                        groupMode="stacked"
                        labelTextColor="inherit:darker(1.6)"
                        labelSkipWidth={16}
                        labelSkipHeight={16}
                        labelFormat=".0s"
                        maxValue={8000000}
                        minValue={-8000000}
                        enableGridX={true}
                        enableGridY={true}
                        enableLabel={false}
                        axisTop={{
                            tickSize: 0,
                            tickPadding: 12,
                            format: v => `${Math.abs(v)}`
                        }}
                        axisBottom={{
                            legendOffset: 50,
                            tickSize: 0,
                            tickPadding: 12,
                            format: v => `${Math.abs(v)}`
                        }}
                        axisLeft={{
                            "orient": "right",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legendPosition": "end",
                            "legendOffset": -50,

                        }}
                        markers={[
                            {
                                axis: 'x',
                                value: 0,
                                textStyle: {fill: '#000000'},
                                legend: this.props.nativity[1],
                                legendPosition: 'top-left',
                                legendOrientation: 'horizontal',
                                legendOffsetY: -40,
                            },
                            {
                                axis: 'x',
                                value: 0,
                                textStyle: {fill: '#000000'},
                                legend: this.props.nativity[0],
                                legendPosition: 'top-right',
                                legendOrientation: 'horizontal',
                                legendOffsetY: -40,
                            },
                        ]}
                        /*
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,

                            },
                        ]}
                        */
                        tooltipFormat={value => '$'+`${Math.abs(value)}`
                        }
                    /> :
                    <ResponsiveBar
                        data={this.state.data}
                        margin={{
                            top: 50,
                            right: 250,
                            bottom: 60,
                            left: 180
                        }}
                        indexBy="region"
                        keys={["College Degree or better foreign", "High_School_Diploma_some_college_foreign", "College Degree or better native", "High School Diploma some college native"]}
                        padding={0.3}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#000000',
                                size: 1,
                                padding: 1,
                                stagger: true
                            },

                        ]}
                        fill={[
                            {
                                match: {
                                    id: 'College Degree or better native'
                                },
                                id: 'dots'
                            },
                            {
                                match: {
                                    id: 'High School Diploma some college native'
                                },
                                id: 'dots'
                            },

                        ]}
                        layout="horizontal"
                        groupMode="stacked"
                        labelTextColor="inherit:darker(1.6)"
                        labelSkipWidth={16}
                        labelSkipHeight={16}
                        labelFormat=".0s"

                        enableGridX={true}
                        enableGridY={true}
                        enableLabel={false}
                        axisTop={{
                            tickSize: 0,
                            tickPadding: 12,
                            format: v => `${Math.abs(v)}`
                        }}
                        axisBottom={{
                            legendOffset: 50,
                            tickSize: 0,
                            tickPadding: 12,
                            format: v => `${Math.abs(v)}`
                        }}
                        axisLeft={{
                            "orient": "right",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legendPosition": "end",
                            "legendOffset": -50,

                        }}
                        markers={[
                            {
                                axis: 'x',
                                value: 0,
                                textStyle: {fill: '#000000'},
                                legend: this.props.nativity[1],
                                legendPosition: 'top-left',
                                legendOrientation: 'horizontal',
                                legendOffsetY: -40,
                            },
                            {
                                axis: 'x',
                                value: 0,
                                textStyle: {fill: '#000000'},
                                legend: this.props.nativity[0],
                                legendPosition: 'top-right',
                                legendOrientation: 'horizontal',
                                legendOffsetY: -40,
                            },
                        ]}
                        /*
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,

                            },
                        ]}
                        */
                        tooltipFormat={value => `${Math.abs(value)}` + '%'
                        }
                    />
                }
            </ElementBox>

        )


    }
}

const mapDispatchToProps = { };

const mapStateToProps = (state,ownProps) => {
    return {
        geoid:ownProps.geoid,
        graph: state.graph // so componentWillReceiveProps will get called.
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(StackedBarChart)


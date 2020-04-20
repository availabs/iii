import { ResponsiveBar } from '@nivo/bar'
import React from "react";
import config from 'pages/Public/DataSnapshots/csv_config.js'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import Element from "../../../../../../components/light-admin/containers/Element";
import ElementBox from "../../../../../../components/light-admin/containers/ElementBox";
import get from "lodash.get";
import { fnum } from "utils/sheldusUtils"

const regions = ['Western NY', 'Southern Tier', 'North Country', 'New York City', 'Mohawk Valley', 'Mid-Hudson', 'Long Island',
    'Finger Lakes', 'Central NY', 'Capital Region']
let regionMappings = {
    'Capital Region' : [2001,2002,2100,1900,1801,1802,1700,300],
    'Central NY' : [704, 1500, 701, 702, 703, 600],
    'Finger Lakes' : [1000,1300,901,902,903,904,905,906,1400,800],
    'Long Island' : [3201,3202,3203,3204,3205,3206,3207,3208,3209,3210,3211,3212,3301,3302,3303,3304,3305,3306,3307,3308,3309,3310,3311,3312,3313],
    'Mid-Hudson' : [2801,2802,2901,2902,2903,3101,3001,3002,3003,2701,2702,3102,3103,3104,3105,3106,3107],
    'Mohawk Valley' : [1600,401,402,403],
    'New York City' : [3701,3702,3703,3704,3705,3706,3707,3708,3709,3710,3801,3802,3803,3804,3805,3806,3807,3808,3809,3810,3901,3902,3903,4001,4002,4003,4004,4005,4006,4007,4008,4009,4010,4011,4012,4013,4014,4015,4016,4017,4018,4101,4102,4103,4104,4105,4106,4107,4108,4109,4110,4111,4112,4113,4114],
    'North Country' : [200,500,100],
    'Southern Tier' : [2201,2202,2401,2203,2402,2300],
    'Western NY': [2500,2600,1201,1202,1203,1204,1205,1206,1207,1101,1102]
}
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
            console.log('stackedBarChart data?', d)
            d =  d[0].map(f => {
                Object.keys(f).forEach(fKey => {
                    if (typeof f[fKey] === 'number'){
                        f[fKey] = get(f, fKey, 0).toFixed(0);
                    }
                })
                return f;
            })
            this.setState({
                data : d
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
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_m'])/regionMappings[item['puma']].length,
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_m'])/regionMappings[item['puma']].length,

                                })
                                stack_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_m'])/regionMappings[item['puma']].length,
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_m'])/regionMappings[item['puma']].length,

                                })
                            }
                        })
                        FEMALE_DATA.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_f'])/regionMappings[item['puma']].length,
                                    "High School Diploma some college native":-parseFloat(item['HS_Avg_PINCP_f'])/regionMappings[item['puma']].length,
                                })
                                stack_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_m'])/regionMappings[item['puma']].length,
                                    "High School Diploma some college native":-parseFloat(item['HS_Avg_PINCP_m'])/regionMappings[item['puma']].length ,
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
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_F']) * 100,
                                    })
                                    stack_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_F']) * 100,
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_F']) * 100 ,
                                    })
                                }else{
                                    axis_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_F']),
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_F']),
                                    })
                                    stack_data_native.push({
                                        "region":item['puma'],
                                        "College Degree or better native":-parseFloat(item['BABS_'+type+'_F']),
                                        "High School Diploma some college native":-parseFloat(item['HS_'+type+'_F']) ,
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
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length,
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length,

                                })
                                stack_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":parseFloat(item['BABS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length,
                                    "High_School_Diploma_some_college_foreign":parseFloat(item['HS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length,

                                })
                            }
                        })
                        NB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length,
                                    "High School Diploma some college native":-parseFloat(item['HS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length,
                                })
                                stack_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-parseFloat(item['BABS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length,
                                    "High School Diploma some college native":-parseFloat(item['HS_Avg_PINCP_mf_t'])/regionMappings[item['puma']].length ,
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
                        console.log('axis,stack', axisData, stackData)
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
                        maxValue={350000}
                        minValue={-350000}
                        enableGridX={true}
                        enableGridY={true}
                        enableLabel={false}
                        axisTop={{
                            tickSize: 0,
                            tickPadding: 12,
                            format: v => `${fnum(Math.abs(v))}`
                        }}
                        axisBottom={{
                            legendOffset: 50,
                            tickSize: 0,
                            tickPadding: 12,
                            format: v => `${fnum(Math.abs(v))}`
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
                        tooltipFormat={value => `${parseFloat(Math.abs(value)).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })}` + ' Income'
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
                        tooltipFormat={value => `${Math.abs(value)}` + '% Population'
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


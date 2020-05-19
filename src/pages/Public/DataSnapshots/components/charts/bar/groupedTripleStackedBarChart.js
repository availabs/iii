import { ResponsiveBar } from '@nivo/bar'
import React from "react";
import config from 'pages/Public/DataSnapshots/csv_config.js'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import ElementBox from "../../../../../../components/light-admin/containers/ElementBox";
import get from "lodash.get";
import { fnum } from "utils/sheldusUtils"
const regions = ['Western NY', 'Southern Tier', 'North Country', 'New York City', 'Mohawk Valley', 'Mid-Hudson', 'Long Island',
    'Finger Lakes', 'Central NY', 'Capital Region'];

class GroupedTripleStackedBarChart extends React.Component{
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
            console.log('groupedTripleStacked data?', d, d[0])
            d =  d[0].map(f => {
                Object.keys(f).forEach(fKey => {
                    if (typeof f[fKey] === 'number'){
                        f[fKey] = get(f, fKey, 0);
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
                return Promise.all([d3.csv(male_csv), d3.csv(female_csv)])
                    .then(function(files) {
                        MALE_DATA = files[0];
                        FEMALE_DATA = files[1];
                        MALE_DATA.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":(item['BABS_m']),
                                    "High School Diploma some college foreign":(item['HS_m']),
                                    "Without High School diploma foreign":(item['HSINC_m'])

                                })
                                stack_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":(item['BABS_m']),
                                    "High School Diploma some college foreign":(item['HS_m']),
                                    "Without High School diploma foreign":(item['HSINC_m'])

                                })
                            }
                        })
                        FEMALE_DATA.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-(item['BABS_f']),
                                    "High School Diploma some college native":-(item['HS_f']),
                                    "Without High School diploma native":-(item['HSINC_f'])
                                })
                                stack_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-(item['BABS_f']),
                                    "High School Diploma some college native":-(item['HS_f']) ,
                                    "Without High School diploma native":-(item['HSINC_f'])
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
            // write here
                return Promise.all([d3.csv(FB_ALL_CSV), d3.csv(NB_ALL_CSV)])
                    .then(function(files) {
                        FB_ALL_data = files[0];
                        NB_ALL_data = files[1];

                        FB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":(item['BABS_mf_t']),
                                    "High School Diploma some college foreign":(item['HS_mf_t']),
                                    "Without High School diploma foreign":(item['HSINC_mf_t'])

                                })
                                stack_data_foreign.push({
                                    "region":item['puma'],
                                    "College Degree or better foreign":(item['BABS_mf_t']),
                                    "High School Diploma some college foreign":(item['HS_mf_t']),
                                    "Without High School diploma foreign":(item['HSINC_mf_t'])

                                })
                            }
                        })
                        NB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-(item['BABS_mf_t']),
                                    "High School Diploma some college native":-(item['HS_mf_t']),
                                    "Without High School diploma native":-(item['HSINC_mf_t'])
                                })
                                stack_data_native.push({
                                    "region":item['puma'],
                                    "College Degree or better native":-(item['BABS_mf_t']),
                                    "High School Diploma some college native":-(item['HS_mf_t']) ,
                                    "Without High School diploma foreign":-(item['HSINC_mf_t'])
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
            }

        }


    render(){
        const style={
            height: '70vh',
            width: '95vw'
        };
        return (
            <ElementBox style={style}>
                <h6 style={{textAlign:'center'}}>{this.props.title}{this.props.year}</h6>
                    <ResponsiveBar
                        data={this.state.data}
                        margin={{
                            top: 50,
                            right: 255,
                            bottom: 80,
                            left: 180
                        }}
                        indexBy="region"
                        keys={["College Degree or better foreign", "High School Diploma some college foreign",
                            "Without High School diploma foreign",
                            "College Degree or better native", "High School Diploma some college native",
                            "Without High School diploma native"
                        ]}
                        padding={0.4}
                        colors={{ scheme: 'paired' }}
                        layout="horizontal"
                        groupMode="stacked"
                        labelTextColor="black"
                        labelSkipWidth={0}
                        labelSkipHeight={0}
                        labelFormat={d=> `${Math.abs(d).toFixed(0)}` + '%'}
                        enableGridX={true}
                        enableGridY={false}
                        enableLabel={true}
                        axisTop={{
                            tickSize: 0,
                            tickPadding: 12,
                            format: v => `${Math.abs(v)}`
                        }}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 12,
                            tickRotation: 0,
                            legend: 'Population Percentage',
                            legendPosition: 'middle',
                            legendOffset: 60
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 12,
                            tickRotation: 0,
                            legend: 'Regions',
                            legendPosition: 'middle',
                            legendOffset: -110
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
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}

                        tooltipFormat={value => `${Math.abs(value)}` + '% Population'
                        }
                    />
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

export default connect(mapStateToProps,mapDispatchToProps)(GroupedTripleStackedBarChart)
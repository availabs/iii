import { ResponsiveBar } from '@nivo/bar'
import React from "react";
import config from 'pages/Public/DataSnapshots/csv_config.js'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import get from 'lodash.get'
import ElementBox from "../../../../../../components/light-admin/containers/ElementBox";


const regions = ['Western NY', 'Southern Tier', 'North Country', 'New York City', 'Mohawk Valley', 'Mid-Hudson', 'Long Island',
    'Finger Lakes', 'Central NY', 'Capital Region'];

class SimpleStackedBarChart extends React.Component{
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
            d =  d.map(f => {
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
        let MALE_DATA = [];
        let FB_ALL_data = [];
        let NB_ALL_data = [];
        let axis_data_foreign = [];
        config[this.props.year][this.props.type].forEach(item =>{
            if(this.props.nativity[0].includes('Male')){
                if(item[this.props.nativity[0]]) {
                    male_csv = item[this.props.nativity[0]]
                    //female_csv = item[this.props.nativity[1]]
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
        if(male_csv.length > 0){
            return Promise.all([d3.csv(male_csv)])
                .then(function(files) {
                    MALE_DATA = files[0];
                    MALE_DATA.forEach((item,i) =>{
                        if(regions.includes(item['puma'])){
                            axis_data_foreign.push({
                                "region":item['puma'],
                                "Foreign Born Male":parseFloat(item['ENG_prof_m']),
                                "Foreign Born Female":parseFloat(item['ENG_prof_f']),

                            })
                        }
                    });

                    return (axis_data_foreign)
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
                                "Foreign Born All":parseFloat(item['ENG_prof_mf_t']),
                                "Foreign Born People of Color":parseFloat(NB_ALL_data[i]['ENG_prof_mf_t']),
                            })

                        }
                    })


                    return (axis_data_foreign)
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
                {this.props.nativity[0].includes('Male') ?
                    <ResponsiveBar
                        data={this.state.data}
                        keys={["Foreign Born Male","Foreign Born Female"]}
                        indexBy="region"
                        margin={{ top: 50, right: 150, bottom: 100, left: 60 }}
                        padding={0.5}
                        colors={{ scheme: 'paired' }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 12,
                            tickRotation: -20,
                            legend: 'Regions',
                            legendPosition: 'middle',
                            legendOffset: 70
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 12,
                            tickRotation: 0,
                            legend: 'Population Percent',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={0}
                        labelTextColor="black"
                        labelFormat={d=> `${d}` + '%'}
                        enableLabel={true}
                        groupMode="grouped"
                        layout="vertical"
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
                        tooltipFormat={
                            value => `${Math.abs(value)}` + '%'
                        }
                    />
                    :
                    <ResponsiveBar
                        data={this.state.data}
                        keys={["Foreign Born All","Foreign Born People of Color"]}
                        indexBy="region"
                        margin={{ top: 50, right: 200, bottom: 100, left: 100 }}
                        padding={0.5}
                        colors={{ scheme: 'paired' }}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -20,
                            legend: 'Regions',
                            legendPosition: 'middle',
                            legendOffset: 70
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Population Percent',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={0}
                        labelTextColor="black"
                        labelFormat={d=> `${d}` + '%'}
                        enableLabel={true}
                        groupMode="grouped"
                        layout="vertical"
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

export default connect(mapStateToProps,mapDispatchToProps)(SimpleStackedBarChart)
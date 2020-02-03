import { ResponsivePie } from '@nivo/pie'
import React from "react";
import config from 'pages/Public/DataSnapshots/csv_config.js'
import * as d3 from 'd3';
import { connect } from 'react-redux';
import ElementBox from "../../../../../../components/light-admin/containers/ElementBox";


const regions = ['Western NY', 'Southern Tier', 'North Country', 'New York City', 'Mohawk Valley', 'Mid-Hudson', 'Long Island',
    'Finger Lakes', 'Central NY', 'Capital Region'];

class PieChart extends React.Component{
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
                data : d
            })
        })
    }

    transformData(){
        let FB_ALL_CSV = '';
        let FB_Hispanic_POC_csv = ''

        let FB_ALL_data = [];
        let FB_hispanic_POC_data = [];

        let axis_data = []

        config[this.props.year][this.props.type].forEach(item =>{
                if(this.props.nativity[0] === 'Foreign Born') {
                    FB_ALL_CSV = item[this.props.nativity[0]]
                    //NB_ALL_CSV = item[this.props.nativity[1]]
                }
                else if(this.props.nativity[0] === 'Foreign Born Hispanic People of Color'){
                    FB_Hispanic_POC_csv = item[this.props.nativity[0]]
                }

        });
        let type = this.props.type[0]
            if(this.props.nativity[0] === 'Foreign Born'){
                return Promise.all([d3.csv(FB_ALL_CSV)])
                    .then(function(files) {
                        FB_ALL_data = files[0];
                        //NB_ALL_data = files[1];

                        FB_ALL_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data.push({
                                    "region":item['puma'],
                                    "id": item['puma'],
                                    "label": item['puma'],
                                    "value": item['Percentage_mf_t'],
                                    "color": "hsl(221, 70%, 50%)"
                                })
                            }
                        })

                        return (axis_data)
                    }).catch(function(err) {
                        // handle error here
                    })
            }
            if(this.props.nativity[0] === 'Foreign Born Hispanic People of Color'){
                return Promise.all([d3.csv(FB_Hispanic_POC_csv)])
                    .then(function(files) {
                        FB_hispanic_POC_data = files[0];
                        //NB_ALL_data = files[1];

                        FB_hispanic_POC_data.forEach((item,i) =>{
                            if(regions.includes(item['puma'])){
                                axis_data.push({
                                    "region":item['puma'],
                                    "id": item['puma'],
                                    "label": item['puma'],
                                    "value": item['Percentage_mf_t'],
                                    "color": "hsl(221, 70%, 50%)"
                                })
                            }
                        })

                        return (axis_data)
                    }).catch(function(err) {
                        // handle error here
                    })
            }
            // write here



    }


    render(){
        const style={
            height: '100vh',
            width: '95vw'
        };
        return (
            <ElementBox style={style}>
                <h6 style={{textAlign:'center'}}>{this.props.title}{this.props.year}</h6>
                <ResponsivePie
                    data={this.state.data}
                    margin={{ top: 80, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'nivo' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    radialLabelsSkipAngle={5}
                    radialLabelsTextXOffset={8}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={5}
                    radialLabelsLinkDiagonalLength={40}
                    radialLabelsLinkHorizontalLength={40}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    enableSlicesLabels={false}
                    enableRadialLabels={true}
                    motionStiffness={90}
                    motionDamping={15}
                    legend={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateY: 56,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}

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

export default connect(mapStateToProps,mapDispatchToProps)(PieChart)
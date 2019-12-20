import { ResponsivePie } from '@nivo/pie'
import React from "react";
import config from 'pages/Public/DataSnapshots/csv_config.js'
import * as d3 from 'd3';
import { connect } from 'react-redux';


const regions = ['Western NY', 'Southern NY', 'North Country', 'New York City', 'Mohawk Valley', 'Mid-Hudson', 'Long Island',
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

    componentDidMount(){
        this.transformData().then(d =>{
            this.setState({
                data : d
            })
        })
    }

    transformData(){
        let FB_ALL_CSV = '';

        let FB_ALL_data = [];

        let axis_data = []

        config[this.props.year][this.props.type].forEach(item =>{
                if(item[this.props.nativity[0]]) {
                    FB_ALL_CSV = item[this.props.nativity[0]]
                    //NB_ALL_CSV = item[this.props.nativity[1]]
                }

        });
        let type = this.props.type[0]

            // write here
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
                    console.log('axis_data',axis_data)
                    return (axis_data)
                }).catch(function(err) {
                    // handle error here
                })


    }


    render(){
        const style={
            height: 500,
            width: 500
        };
        return (
            <div style={style}>
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
                    radialLabelsSkipAngle={2}
                    radialLabelsTextXOffset={8}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={5}
                    radialLabelsLinkDiagonalLength={20}
                    radialLabelsLinkHorizontalLength={0}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    enableSlicesLabels={false}
                    enableRadialLabels={false}
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
            </div>

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
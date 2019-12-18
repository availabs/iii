import React from 'react';
import Element from "../../../components/light-admin/containers/Element";
import DROPDOWN from './components/dropdown'
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import * as d3 from 'd3'
import * as topojson from 'topojson'
import {connect} from "react-redux";
import get from 'lodash.get'
import config,{measures} from './data_config'
import ResponsiveMap from "./components/ResponsiveMap";
import jsonData from './components/json'
import regions from './components/geo/regions'
import ny from './components/geo/ny_puma_geo.json'

const Blues = ['rgb(5,48,97)', 'rgb(33,102,172)', 'rgb(67,147,195)', 'rgb(146,197,222)', 'rgb(209,229,240)',
    'rgb(253,219,199)', 'rgb(244,165,130)', 'rgb(214,96,77)', 'rgb(178,24,43)', 'rgb(103,0,31)']
const gradeScale = d3.scaleOrdinal()
    .domain(['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E'])
    .range(Blues);

const cats = {
    'Overall': {
        name: 'Overall',
        desc: 'Aggregated score for all categories.',
        type: 'activeCategory'
    },
    'Full Time': {
        name: 'Full-Time Employment',
        desc: 'Percentage of full time workers who were employed full time during the last 12 months (25-64 years old)',
        type: 'activeCategory'
    },
    'Poverty': {
        name: 'Poverty',
        desc: 'Percentage of residents whose household income fell below 150% of federal poverty line (25-64 years old)',
        type: 'activeCategory'
    },
    'Working Poor': {
        name: 'Working Poor',
        desc: 'Percentage of full time workers with income to poverty ratio lower than or equal to 150% of federal poverty line (25-64 years old)',
        type: 'activeCategory'
    },
    'Homeownership': {
        name: 'Homeownership',
        desc: 'Percentage of residents who own their own homes (25-64 years old)',
        type: 'activeCategory'
    },
    'Rent Burden': {
        name: 'Rent Burden',
        desc: 'Percentage of residents who spent 50% or more of their income on rent. (25-64 years old)',
        type: 'activeCategory'
    },
    'Unemployment': {
        name: 'Unemployment',
        desc: 'Percentage of workers who are unemployed (25-64 years old)',
        type: 'activeCategory'
    },
    'Income': {
        name: 'Income Level for Full-Time Workers',
        desc: 'Income level of full time workers during the last 12 months (25-64 years old)',
        type: 'activeCategory'
    }
};

const calc = ['Ratio', 'Rank', 'Grade'];

const education = {
    'Bachelor’s Degree or More': {
        name: 'Bachelor’s Degree or More',
        desc: 'Holds Bachelor’s degree or better; speaks English well.',
        type: 'educationLevel',
        subcats: cats
    },
    'High School Diploma / Some College' : {
        name: 'High School Diploma / Some College',
        desc: 'Has High School diploma or some college; speaks English well.',
        type: 'educationLevel',
        subcats: cats
    }
};

class DataExplorer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '2014',indicator: 'The Effects of Nativity Status',nativity:'Foreign-Born and Native-Born',
            education:'Bachelor’s Degree or More',
            activeRegions: null,
            geoData: null,
            childGeo: null,
            regionGeo: null,
            display: 'map'
        }
        this.mapClick = this.mapClick.bind(this)
        this.renderLegend = this.renderLegend.bind(this)
    }
    componentDidMount () {
        console.log('check this. component did mount')
        let geodata = ny;
        console.log('geodata')
        //if (err) console.log('error in file', err)
        let regionGeo = {
            'type': 'FeatureCollection',
            'features': []
        };

        regionGeo.features = Object.keys(regions).map(region => {
            console.log('regions', region, geodata);
            return {
                'type': 'Feature',
                'properties': {
                    region: region,
                    geoType: 'region',

                },
                'geometry': topojson.merge(
                    geodata, geodata.objects.collection.geometries
                        .filter((d) => {
                            return regions[region].indexOf(d.properties.NAMELSAD10) !== -1
                        })
                )
            }
        });
        this.setState({
            geoData: geodata,
            childGeo: topojson.feature(geodata, geodata.objects.collection),
            regionGeo: regionGeo
        })
    }
    numberFormat (val) {
        if (!val || val.indexOf('#') !== -1) return 'N/A'
        if (val.indexOf('%') !== -1) return val
        return (+val).toFixed(2)
    }
    gradeFormat (val) {
        if (!val || val.indexOf('#') !== -1) return 'N/A'
        return val
    }
    educationClick (level) {
        if (level !== this.state.educationLevel) {
            this.setState({
                display:level
            })
        }
    }
    renderLegend (scale) {
        if (!this.state.measure) return null
        var colors = scale.domain().map(grade => {
            return (
                <div
                    key={grade}
                    style={{backgroundColor: scale(grade), width: (100 / scale.domain().length) + '%', height: 20}}
                />
            )
        })

        var grades = scale.domain().map(grade => {
            return (
                <div
                    key={grade}
                    style={{textAlign: 'center', width: (100 / scale.domain().length) + '%', height: 20}}
                >
                    {grade}
                </div>
            )
        })


        return (
            <div className='legendContainer'>
                <div className='row'>
                    <div className='col-md-5' style={{ backgroundColor:'#efefef',minHeight:171, borderRadius: 5, padding:10 }}>
                        <h5>
                            {cats[this.state.measure].name}
                            <span style={{ float: 'right' }}>{this.state.activeRegion}</span>
                        </h5>
                        <br />
                        <div style={{ marginTop: -15 }}>
                            <div className='legendRow'>
                                {colors}
                            </div>
                            <div className='legendRow'>
                                {grades}
                            </div>
                        </div>
                        {cats[this.state.measure].desc}
                    </div>
                    <div className='col-md-1' />
                    <div className='col-md-6' style={{ backgroundColor:'#efefef', borderRadius: 5, padding:10 }}>
                        <h4>{this.state.indicator}</h4>
                        {['race'].indexOf(this.state.activeAnalysis) !== -1 ? <strong>Foreign Born people of color and Native Born white non-hispanic<br /></strong> : ''}
                        {['race_women'].indexOf(this.state.activeAnalysis) !== -1? <strong>Foreign Born Women of color And Native Born Women white non-hispanic<br /></strong> : ''}
                        {['nativity', 'nativity_women'].indexOf(this.state.activeAnalysis) !== -1 ? <strong>{}<br /></strong> : ''}

                        {this.state.activeAnalysis !== 'vulnerable' ?
                            (
                                <span>
                                    <strong>
                                        {education[this.state.education].name}<br />
                                    </strong>
                                    {education[this.state.education].desc}
                                </span>
                            )
                            : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
    mapClick (d) {
        var nextRegion = null
        d3.selectAll('.mapActive').classed('mapActive', false)
        if (this.state.activeRegion === d.properties.region) {
            nextRegion = null
            d3.selectAll('.mapActive').classed('mapActive', false)
        } else if (d.properties.geoType === 'region') {
            nextRegion = d.properties.region
            d3.selectAll('.region').sort(d => {
                return d.properties.region === nextRegion ? 1 : 0
            })
            d3.select('.' + d.properties.region.split(' ').join('_')).classed('mapActive', true)
        }

        this.setState({
            activeRegion:nextRegion
        })
    }
    renderMap () {
        if (!get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null) ||
            !this.state.regionGeo || !this.state.measure) {
            return <div style={{ minHeight:'100vh' }}> Loading ... {this.state.indicator}</div>
        }
        console.log('data group1', jsonData)
        var data = jsonData[this.state.year][
            get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null)
            ];
        var regionGeo = {
            'type': 'FeatureCollection',
            'features': []
        }
        console.log('this.state', this.state)
        regionGeo.features = this.state.regionGeo.features
            .sort((a, b) => data[a.properties.region][this.state.measure].Rank - data[b.properties.region][this.state.measure].Rank)
            .map((d,i) => {
                var regionGrade = data[d.properties.region] &&
                data[d.properties.region][this.state.measure] &&
                data[d.properties.region][this.state.measure].Grade
                    ? data[d.properties.region][this.state.measure].Grade : 'E'

                // regionGrade = gradeScale.domain().indexOf(regionGrade) !== -1 ? regionGrade : 'E-'
                d.properties.fillColor = regionGrade.includes('#') ? 'url(#crosshatch) #fff' : gradeScale(regionGrade)
                d.properties.grade = this.gradeFormat(regionGrade)
                d.properties.rank = this.gradeFormat(regionGrade) == 'N/A' ? 'N/A' : (i+1)
                return d
            });

        var childGeo = {
            'type': 'FeatureCollection',
            'features': []
        }
        if (this.state.activeRegion) {
            childGeo.features = this.state.childGeo.features
                .filter(puma => regions[this.state.activeRegion] &&
                    regions[this.state.activeRegion].includes(puma.properties.NAMELSAD10))
                .map(d => {
                    var region = d.properties.NAMELSAD10
                    var regionGrade = data[region] &&
                    data[region][this.state.measure] &&
                    data[region][this.state.measure].Grade
                        ? data[region][this.state.measure].Grade : 'E-'

                    d.properties.fillColor = regionGrade.includes('#') ? 'url(#crosshatch) #fff' : gradeScale(regionGrade)
                    d.properties.grade = this.gradeFormat(regionGrade)
                    d.properties.rank = data[region][this.state.measure].Rank
                    d.properties.geoType = 'puma'
                    d.properties.region = region
                    return d
                })
        }
        return (
            <div>
                <ResponsiveMap
                    geo={regionGeo}
                    click={this.mapClick}
                    activeRegion={this.state.activeRegion}
                    activeCategory={this.state.measure}
                    activeAnalysis={this.state.activeAnalysis}
                    educationLevel={this.state.educationLevel}
                    childGeo={childGeo}
                />
            </div>
        )
    }

    setStateOnChange(state){
        this.setState(Object.assign(this.state, state, {}))
    }
    render() {
        console.log('state', this.state)
        return (
            <div className='row' style={{marginTop:'15px'}}>
                <div className='col-sm-12'>
                    <DROPDOWN
                        {...this.state}
                        setState={this.setStateOnChange.bind(this)}
                    />
                    <ElementBox>
                        {
                            (!get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null) ||
                            !this.state.regionGeo || !this.state.measure) ?
                             <div style={{ minHeight:'100vh' }}> Loading ... {this.state.indicator}</div> : (
                                    <div>
                                        {/*{this.renderLegend(gradeScale)}*/}
                                        {this.renderMap()}
                                    </div>
                                )

                        }

                    </ElementBox>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('DE state', state)
    return {
        router: state.router
    };
};

const mapDispatchToProps = {};
export default [{
    icon: 'os-icon-home',
    path: '/data',
    exact: true,
    name: 'Data Explorer',
    auth: false,
    mainNav: true,
    breadcrumbs: [
        {name: 'Data', path: '/data'},
        {param: 'year', path: '/data/'}
    ],
    menuSettings: {
        image: 'none',
        scheme: 'color-scheme-dark',
        position: 'menu-position-top',
        layout: 'menu-layout-full',
        style: 'color-style-default'
    },
    component: connect(mapStateToProps, mapDispatchToProps)(DataExplorer)
}];


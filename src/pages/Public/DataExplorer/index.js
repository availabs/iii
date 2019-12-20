import React from 'react';
import Element from "../../../components/light-admin/containers/Element";
import DROPDOWN from './components/dropdown'
import ElementBox from "../../../components/light-admin/containers/ElementBox";
import * as d3 from 'd3'
import * as topojson from 'topojson'
import {connect} from "react-redux";
import get from 'lodash.get'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';
import config,{measures} from './data_config'
import ResponsiveMap from "./components/ResponsiveMap";
import jsonData from './components/json'
import regions from './components/geo/regions'
import ny from './components/geo/ny_puma_geo.json'
import {CONTAINER, TEXT} from "../theme/componentsNew";
import styled from "styled-components";

const Blues = ['rgb(5,48,97)', 'rgb(33,102,172)', 'rgb(67,147,195)', 'rgb(146,197,222)', 'rgb(209,229,240)',
    'rgb(253,219,199)', 'rgb(244,165,130)', 'rgb(214,96,77)', 'rgb(178,24,43)', 'rgb(103,0,31)']
const gradeScale = d3.scaleOrdinal()
    .domain(['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E'])
    .range(Blues);
const LEGENDROW = styled.div`
                    display: -ms-flexbox;
                    display: flex;
                    -ms-flex-pack: center;
                    justify-content: center;
                    -ms-flex-direction: row;
                    flex-direction: row;
                    `
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
            // year: '2014',indicator: 'The Effects of Nativity Status',nativity:'Foreign-Born and Native-Born', education:'Bachelor’s Degree or More',
            year: '',indicator: '',nativity:'', education:'',
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
        let geodata = ny;
        let regionGeo = {
            'type': 'FeatureCollection',
            'features': []
        };

        regionGeo.features = Object.keys(regions).map(region => {
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
    makePDF () {
        let quotes = [
            //document.getElementById('DataViewer1'),
            //document.getElementById('DataViewer2'),
            document.getElementById('DataViewerMain')
        ];
        let images = []
        let nodes = []
        let pdf = new jsPDF('p', 'pt', 'letter')
        let allPromise = []
        quotes.forEach((q, q_i) => {
            let ele = q.getElementsByClassName('element-box')
            for(let tmpI = ele.length-1; tmpI >= 0; tmpI-- ){
                //ele[tmpI].style.backgroundColor = 'transparent';
                ele[tmpI].classList.replace('element-box', 'element-box-none')
            }


            let svgElem = q.querySelectorAll('#mapSVG');
            svgElem.forEach(function(node) {
                let parent = node.parentNode

                let svg = node.innerHTML
                let image = new Image();
                let open = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="'+ node.width.baseVal.value + '" height="' + node.height.baseVal.value + '">'
                image.src = 'data:image/svg+xml,' + escape(open + svg + '</svg>')
                parent.appendChild(image);
                node.style.display = 'none'
                if (document.getElementById('toolTipDiv'))
                document.getElementById('toolTipDiv').style.display = 'none';
                images.push(image)
                nodes.push(node)


                image.onload = function() {
                    image.onload = function() {}
                    let canvas = document.createElement('canvas')
                    canvas.width = image.width;
                    canvas.height = image.height;
                    let context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0);
                    image.src = canvas.toDataURL();
                }
            })
            // At this point the container has no SVG, it only has HTML and Canvases.
            window.scrollTo(0, 0);
            allPromise.push(
                html2canvas(q, {allowTaint: true})
                    .then((canvas) =>  {
                        /*if (q_i > 0) {
                            pdf.addPage(612, 791) // 8.5" x 11" in pts (in*72)
                        }*/
                        //allowTaint: true,
                        //! MAKE YOUR PDF
                        let start_width = q.clientWidth * 1.5
                        //x += q.clientWidth;
                        let start_height = 1400
                        for (let i = 0; i <= (q.clientHeight*2) / start_height; i++) {
                            //! This is all just html2canvas stuff
                            let srcImg = canvas
                            let sX = 0
                            let sY = start_height * i // start start_height pixels down for every new page
                            let sWidth = start_width
                            let sHeight = start_height
                            let dX = 0
                            let dY = 0
                            let dWidth = start_width
                            let dHeight = start_height + 200

                            window.onePageCanvas = document.createElement('canvas')
                            window.onePageCanvas.setAttribute('width', start_width)
                            window.onePageCanvas.setAttribute('height', start_height)
                            let ctx = window.onePageCanvas.getContext('2d')
                            // details on this usage of this function:
                            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                            ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight)
                            // document.body.appendChild(canvas);
                            let canvasDataURL = window.onePageCanvas.toDataURL('image/png', 1.0)

                            let width = window.onePageCanvas.width
                            let height = window.onePageCanvas.clientHeight

                            //! If we're on anything other than the first page,
                            // add another page
                            if (i > 0) {
                                pdf.addPage(612, 791) // 8.5" x 11" in pts (in*72)
                            }
                            //! now we declare that we're working on that page
                            pdf.setPage(i + 1)
                            //! now we add content to that page!
                            pdf.addImage(canvasDataURL, 'PNG', 10, 10, (width * (700 / width)), (height * 0.32))
                        }
                        //! after the for loop is finished running, we save the pdf.
                        nodes.forEach(node => {
                            node.style.display = 'block'
                        })
                        images.forEach(node => {
                            node.style.display = 'none'
                        })
                        if (document.getElementById('toolTipDiv'))
                            document.getElementById('toolTipDiv').style.display = 'block';

                        let ele = q.getElementsByClassName('element-box-none')
                        for(let tmpI = ele.length-1; tmpI >= 0; tmpI-- ){
                            //ele[tmpI].style.backgroundColor = 'transparent';
                            ele[tmpI].classList.replace('element-box-none', 'element-box')
                        }
                    })
            )

        });

        Promise.all(allPromise)
            .then(() => pdf.save('immigration_index.pdf'))


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
    dataTable () {
        if (!get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null) ||
            !this.state.regionGeo || !this.state.measure) {
            return <span />
        }
        let data = jsonData[this.state.year][
            get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null)
            ];
        if (!data) return <div style={{ minHeight:'100vh' }}> Data not available for {this.state.indicator}</div>

        let regionFilter = this.state.activeRegion &&
        regions[this.state.activeRegion]
            ? regions[this.state.activeRegion] : Object.keys(regions)
        let rows = Object.keys(data)
            .filter(region => regionFilter.indexOf(region) !== -1)
            .sort((a, b) => {
                return data[a][this.state.measure].Rank - data[b][this.state.measure].Rank
            })
            .map((region, i) => {
                return (
                    <tr key={region}>
                        <td>{region}</td>
                        {this.state.measure === 'Overall' ? null
                            : <td>{this.numberFormat(data[region][this.state.measure].Ratio)}</td>}
                        <td>{this.state.activeRegion ? data[region][this.state.measure].Rank : this.gradeFormat(data[region][this.state.measure].Grade) == 'N/A' ? 'N/A' : (i+1) }</td>
                        <td>{this.gradeFormat(data[region][this.state.measure].Grade)}</td>
                    </tr>
                )
            })

        return (
            <div style={{padding: 10}}>
                <table className='table table-hover' style={{ backgroundColor: '#fff', marginTop: 40, }}>
                    <thead>
                    <tr>
                        <th>Region</th>
                        {
                            calc
                                .filter(header => {
                                    return !(this.state.measure === 'Overall' && header === 'Ratio')
                                })
                                .map(header => <th key={header}>{header}</th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        )
    }
    renderLegend (scale) {
        if (!this.state.measure) return null;
        let colors = scale.domain().map(grade => {
            return (
                <div
                    key={grade}
                    style={{backgroundColor: scale(grade), width: (100 / scale.domain().length) + '%', height: 20}}
                />
            )
        })

        let grades = scale.domain().map(grade => {
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
                    <div className='col-sm-5' style={{minHeight:171, borderRadius: 5, padding:10 }}>
                        <h5>
                            {cats[this.state.measure].name}
                            <span style={{ float: 'right' }}>{this.state.activeRegion}</span>
                        </h5>
                        <br />
                        <div style={{ marginTop: -15 }}>
                            <LEGENDROW>
                                {colors}
                            </LEGENDROW>
                            <LEGENDROW>
                                {grades}
                            </LEGENDROW>
                        </div>
                        {cats[this.state.measure].desc}
                    </div>
                    <div className='col-sm-1' />
                    <div className='col-sm-6' style={{borderRadius: 5, padding:10 }}>
                        <h4>{this.state.indicator}</h4>
                        {['race'].indexOf(this.state.indicator) !== -1 ? <strong>Foreign Born people of color and Native Born white non-hispanic<br /></strong> : ''}
                        {['race_women'].indexOf(this.state.indicator) !== -1? <strong>Foreign Born Women of color And Native Born Women white non-hispanic<br /></strong> : ''}
                        {['nativity', 'nativity_women'].indexOf(this.state.indicator) !== -1 ? <strong>{}<br /></strong> : ''}

                        {this.state.indicator !== 'vulnerable' ?
                            (
                                <span>
                                    <strong>
                                        {get(education, `${this.state.education}.name`, null)}<br />
                                    </strong>
                                    {get(education, `${this.state.education}.desc`, null)}
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
        let nextRegion = null
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
    calculateRanks (data) {
        let regionsNew = Object.keys(data)
            .filter(d => Object.keys(regions).indexOf(d) !== -1)
        let pumas = Object.keys(data)
            .filter(d => !Object.keys(regions).indexOf(d) !== -1 && d.indexOf('PUMA') !== -1)
        let getData = function (reg, cat) {
            return isNaN(+data[reg][cat].Score) ? -4 : +data[reg][cat].Score
        }
        Object.keys(cats).forEach(cat => {
            let catSort = regionsNew.sort((a, b) => {
                return getData(b, cat) - getData(a, cat)
            })

            catSort.forEach((reg, i) => {
                data[reg][cat].Rank = i + 1
            })

            catSort = pumas.sort((a, b) => {
                return getData(b, cat) - getData(a, cat)
            })

            catSort.forEach((reg, i) => {
                let rank = data[reg][cat].Score.indexOf('#') !== -1 ? 'N/A' : i + 1
                data[reg][cat].Rank = rank
            })
        })
        return data
    }
    renderMap () {
        if (!get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null) ||
            !this.state.regionGeo || !this.state.measure) {
            return <div style={{ minHeight:'100vh' }}> Loading ... {this.state.indicator}</div>
        }

        let data = jsonData[this.state.year][
            get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null)
            ];
        if (!data) return <div style={{ minHeight:'100vh' }}> Data not available for {this.state.indicator}</div>;
        this.calculateRanks(data);
        let regionGeo = {
            'type': 'FeatureCollection',
            'features': []
        }
        regionGeo.features = this.state.regionGeo.features
            .sort((a, b) => data[a.properties.region][this.state.measure].Rank - data[b.properties.region][this.state.measure].Rank)
            .map((d,i) => {
                let regionGrade = data[d.properties.region] &&
                data[d.properties.region][this.state.measure] &&
                data[d.properties.region][this.state.measure].Grade
                    ? data[d.properties.region][this.state.measure].Grade : 'E';

                // regionGrade = gradeScale.domain().indexOf(regionGrade) !== -1 ? regionGrade : 'E-'
                d.properties.fillColor = regionGrade.includes('#') ? 'url(#crosshatch) #fff' : gradeScale(regionGrade);
                d.properties.grade = this.gradeFormat(regionGrade);
                d.properties.rank = this.gradeFormat(regionGrade) === 'N/A' ? 'N/A' : (i+1);
                return d
            });

        let childGeo = {
            'type': 'FeatureCollection',
            'features': []
        }
        if (this.state.activeRegion) {
            childGeo.features = this.state.childGeo.features
                .filter(puma => regions[this.state.activeRegion] &&
                    regions[this.state.activeRegion].includes(puma.properties.NAMELSAD10))
                .map(d => {
                    let region = d.properties.NAMELSAD10
                    let regionGrade = data[region] &&
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
                    activeAnalysis={this.state.indicator}
                    educationLevel={this.state.education}
                    year={this.state.year}
                    nativity={this.state.nativity}
                    childGeo={childGeo}
                />
            </div>
        )
    }

    setStateOnChange(state){
        this.setState(Object.assign(this.state, state, {}))
    }
    render() {
        return (
            <div className='row' style={{marginTop:'15px'}}>
                <div className='col-sm-12'>
                    <DROPDOWN
                        {...this.state}
                        setState={this.setStateOnChange.bind(this)}
                        onDownloadClick={this.makePDF.bind(this)}
                        showChartMeasure={false}
                    />
                    <div id='DataViewerMain'>
                        <div className='row'>
                            <ElementBox>
                                <div style={{display: 'flex',width: '100vw', justifyContent: 'center'}} id='DataViewer1'>
                                    {
                                        (!get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null) ||
                                            !this.state.measure) ?
                                            <TEXT style={{color:'black', textTransform: 'uppercase'}}> Please make Selection to veiw report. </TEXT> :
                                            <div style={{display:'flex'}}>
                                                <TEXT style={{color:'black', textTransform: 'uppercase'}}>
                                                    {get(config, `${this.state.year}.${this.state.indicator}.info`, null)}
                                                </TEXT>
                                            </div>

                                    }

                                </div>
                            </ElementBox>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <ElementBox style={{height:'100%'}}>
                                    {
                                        (!get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null) ||
                                            !this.state.regionGeo || !this.state.measure) ?
                                            <div> Loading ... {this.state.indicator}</div> : (
                                                <div id='DataViewer2' style={{height:'100%', padding:5}}>
                                                    {this.renderLegend(gradeScale)}
                                                    {this.renderMap()}
                                                </div>
                                            )

                                    }
                                </ElementBox>
                            </div>

                            <div className='col-sm-6'>
                                <ElementBox style={{height:'100%'}}>
                                    {
                                        (!get(config, `${this.state.year}.${this.state.indicator}.${this.state.nativity}.${this.state.education}`, null) ||
                                            !this.state.regionGeo || !this.state.measure) ?
                                            <div> Loading ... {this.state.indicator}</div> : (
                                                <div id='DataViewer3'>
                                                    {this.dataTable()}
                                                </div>
                                            )
                                    }
                                </ElementBox>
                            </div>
                        </div>
                    </div>
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


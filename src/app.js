import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';

import ControlPanel from './control-panel';
import CityPin from './city-pin';
import CityInfo from './city-info';
//import LeftTimeseries from './timeseries_reactvis';
import LeftTimeseries from './timeseries_plotly';
//import RightTimeseries from './timeseries_multipleyears';
import StackedAreaChart from './timeseries_stackedareachart';
import HeatmapTimeseries from './heatmap_timeseries';
import { fullscreenControlStyle,navStyle, wholeViewStyle,firstRow,secondRow,firstRowfirstCol,firstRowSecondCol
,firstRowSecondColFirstRow,firstRowSecondColSecondRow} from './style';
import { Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../node_modules/react-vis/dist/style.css';
import CITIES from '../data/dengue_br_cities.json';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: -14.2350,
        longitude: -51.9253,
        zoom: 3,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      dengueInfo:null
    };
  }

   componentDidMount() {
    this.setState({dengueInfo: CITIES});
  }

  _onMouseover(mouseoverIndex) {
  this.setState({mouseoverIndex});
}

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _renderCityMarker = (city, index) => {
    
    return (
      <Marker 
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude} >
        <CityPin size={20} onClick={() => this.setState({popupInfo: city})} />
      </Marker>
    );
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({popupInfo: null})} >
        <CityInfo info={popupInfo} />
      </Popup>
    );
  }

    _renderLeftTimeseries() {
    const {popupInfo} = this.state;

    return popupInfo && (
    <LeftTimeseries info={popupInfo} 
     mouseover={index => this._onMouseover(index)}
    />
    );
  }

    _renderRightTimeseries() {
      const {popupInfo} = this.state;

      return popupInfo && (
      <StackedAreaChart info={popupInfo} />
      );
    }

    _renderHeatMapseries() {
      const {popupInfo} = this.state;

      return popupInfo && (
      <HeatmapTimeseries info={popupInfo} />
      );
    }

  render() {

    const {viewport} = this.state;
    

    return (

      <div className="wholeView" style={wholeViewStyle}>
        <Row className="firstRow" style={firstRow} noGutters="true">
          <Col className="firstRowfirstCol" style={firstRowfirstCol}>
            <MapGL
              {...viewport}
              width="100%"
              height="100%"
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={this._updateViewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} >

              { CITIES.map(this._renderCityMarker) }

              <div className="nav" style={navStyle}>
                <NavigationControl onViewportChange={this._updateViewport} />
              </div>

              <ControlPanel containerComponent={this.props.containerComponent} />
            </MapGL>
          </Col>
          <Col className="firstRowSecondCol" style={firstRowSecondCol}>
            <Row className="firstRowSecondColFirstRow" style={firstRowSecondColFirstRow}>
               {this._renderRightTimeseries()}
            </Row>

            <Row className="firstRowSecondColSecondRow" style={firstRowSecondColSecondRow}>
               {this._renderHeatMapseries()}
            </Row>
          </Col>
        </Row>
        <Row className="secondRow" style={secondRow} noGutters="true">
              {this._renderLeftTimeseries()}          
        </Row>
      </div>
    );
  }

}

export function renderToDom(container) {
  render(<App/>, container);
}

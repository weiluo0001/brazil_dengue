import React from 'react';
import Plot from 'react-plotly.js';
import { SingletimeseriesStyle } from './style';

export default function LeftTimeseries(props) {

  const {info} = props;

  return (
    <div style={SingletimeseriesStyle}>
      <Plot
        data={[
          {
            x: info.cases.date,
            y: info.cases.num,
            type: 'scatter',
            mode: 'lines+points',
          }
        ]}
        layout={ {width: "100%", 
                  height: "100%",
                  autosize: true,
                  margin: {t: 30, b: 70, l: 50, r: 10},
                  font: {color: '#5072a8', size:'10'}, 
                  plot_bgcolor: '#000000',
                  paper_bgcolor:'#000000',
                  title: "Dengue Infections in " + info.city} }
      />
      </div>
    );
}
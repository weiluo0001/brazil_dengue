import React from 'react';
import Plot from 'react-plotly.js';
import { HeatmaptimeseriesStyle } from './style';

export default function HeatmapTimeseries(props) {

  const {info} = props;

// heat map data processing for different years over one location
  var epi_week = info.cases.week;
  var epi_year = info.cases.year;
  var epi_cases = info.cases.num;

  var multiple_years = [];
  var weeks = [...new Set(epi_week)];
  var values = [];
  var years = [];
  var dif_years = [...new Set(epi_year)];



  for (let i=0; i<epi_week.length;i++){

    if(i==0){
      values.push(epi_cases[i]);
      years.push(epi_year[i]);
    }

    else{

      if(years[0] == epi_year[i]){
        values.push(epi_cases[i]);
        years.push(epi_year[i]);
      }
      else{
        multiple_years.push(values);
        values = [];
        years = [];
        values.push(epi_cases[i]);
        years.push(epi_year[i]);
      }
    }
  }

  multiple_years.push(values);



  return (
    <div style={HeatmaptimeseriesStyle}>
      <Plot
        data={[
          {
          z: multiple_years,
          x: weeks,
          y: dif_years,
          type: 'heatmap',
          }
        ]}
        layout={ {width: "100%", 
                  height: "100%",
                  autosize: true,
                  margin: {t: 30, b: 30, l: 50, r: 10},
                  font: {color: '#5072a8'}, 
                  plot_bgcolor: '#000000',
                  paper_bgcolor:'#000000',
                  title: "Heat Map for Yearly Aggregated Data"} }
      />
      </div>
    );
}
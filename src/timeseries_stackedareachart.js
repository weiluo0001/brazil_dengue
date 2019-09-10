import React from 'react';
import Plot from 'react-plotly.js';
import { StackedAreaChartStyle } from './style';

export default function StackedAreaChart(props) {

  const {info} = props;

  //console.log(dataArr);

// data processing for different years over one location
  var epi_week = info.cases.week;
  var epi_date = info.cases.date;
  var epi_year = info.cases.year;
  var epi_cases = info.cases.num;

  var multiple_years = [];

  var dates = [];
  var weeks = [];
  var values = [];
  var years = [];


  for (let i=0; i<epi_week.length;i++){

    if(i==0){
      dates.push(epi_date[i]);
      values.push(epi_cases[i]);
      weeks.push(epi_week[i]);
      years.push(epi_year[i]);
    }

    else{

      if(years[0] == epi_year[i]){
        dates.push(epi_date[i]);
        values.push(epi_cases[i]);
        weeks.push(epi_week[i]);
        years.push(epi_year[i]);
      }
      else{

      var data_oneyear = 
        {
          x: weeks,
          y: values,
          stackgroup: 'one',
          name: years[0]
        };
        multiple_years.push(data_oneyear);      
        dates = [];
        weeks = [];
        values = [];
        years = [];
        data_oneyear ={};
        dates.push(epi_date[i]);
        values.push(epi_cases[i]);
        weeks.push(epi_week[i]);
        years.push(epi_year[i]);
      }
    }
  }

        var data_oneyear = 
        {
          x: weeks,
          y: values,
          stackgroup: 'one',
          name: years[0]
        };
        multiple_years.push(data_oneyear); 

  return (
    <div style={StackedAreaChartStyle}>
      <Plot
        data={multiple_years}
        layout={ {width: "100%", 
                  height: "100%",
                  autosize: true,
                  margin: {t: 30, b: 20, l: 50, r: 10},
                  font: {color: '#5072a8'}, 
                  plot_bgcolor: '#000000',
                  paper_bgcolor:'#000000',
                  title: "Yearly Aggregated Dengue Incidence"} }
      />
      </div>
    );
}
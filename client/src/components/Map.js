import React from 'react';
import axios from 'axios';
import { Typography } from 'antd';

const { Title } = Typography;

class Map extends React.Component {
  componentDidMount() {
    let am4core = window.am4core;
    let am4themes_dataviz = window.am4themes_dataviz;
    let am4themes_animated = window.am4themes_animated;
    let am4maps = window.am4maps;
    let am4geodata_usaLow = window.am4geodata_usaLow;

    axios
      .get('../locations.json')
      .then((res) => {
        am4core.ready(function () {

          // Themes
          am4core.useTheme(am4themes_dataviz);
          am4core.useTheme(am4themes_animated);

          // Create map instance
          var chart = am4core.create("map", am4maps.MapChart);

          // Set map definition
          chart.geodata = am4geodata_usaLow;

          // Set projection
          chart.projection = new am4maps.projections.AlbersUsa();

          // Create map polygon series
          var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

          //Set min/max fill color for each area
          polygonSeries.heatRules.push({
            property: "fill",
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(1).brighten(1),
            max: chart.colors.getIndex(1).brighten(-0.3)
          });

          // Make map load polygon data (state shapes and names) from GeoJSON
          polygonSeries.useGeodata = true;

          // Set heatmap values for each state
          polygonSeries.data = res.data;

          // Set up heat legend
          let heatLegend = chart.createChild(am4maps.HeatLegend);
          heatLegend.series = polygonSeries;
          heatLegend.align = "right";
          heatLegend.valign = "bottom";
          heatLegend.width = am4core.percent(20);
          heatLegend.marginRight = am4core.percent(4);
          heatLegend.minValue = 10;
          heatLegend.maxValue = 270;

          // Set up custom heat map legend labels using axis ranges
          var minRange = heatLegend.valueAxis.axisRanges.create();
          minRange.value = heatLegend.minValue;
          minRange.label.text = "0";
          var maxRange = heatLegend.valueAxis.axisRanges.create();
          maxRange.value = heatLegend.maxValue;
          maxRange.label.text = "140";

          // Blank out internal heat legend value axis labels
          heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function (labelText) {
            return "";
          });

          // Configure series tooltip
          var polygonTemplate = polygonSeries.mapPolygons.template;
          polygonTemplate.tooltipText = "{name}: {value}";
          polygonTemplate.nonScalingStroke = true;
          polygonTemplate.strokeWidth = 0.5;

          // Create hover state and set alternative fill color
          var hs = polygonTemplate.states.create("hover");
          hs.properties.fill = am4core.color("#3c5bdc");

        }); // end am4core.ready()

      }).catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <React.Fragment>
        <Title level={3}>Number of vacancies in different states</Title>
        <div id="map" style={{ height: "calc(100vh - 200px)" }} ref={el => this.mapRef = el}></div>
      </React.Fragment>
    )
  };
}

export default Map;
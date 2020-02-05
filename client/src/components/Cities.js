import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { Row, Col, Typography } from 'antd';
import 'chartjs-plugin-colorschemes';

const { Title } = Typography;

class Cities extends React.Component {
  componentDidMount() {
    let chartCanvasCities = this.refs.chartCities;
    let chartCanvasAll = this.refs.chartAll;
    let citiesArray = [];
    let citiesValues = [];
    let allCitiesSumm = 0;
    let remoteSumm = 0;

    axios.get('../cities.json')
      .then((res) => {
        res.data.forEach(el => {
          if (el.city !== "Not set") {
            citiesArray.push(el.city + " (" + el.state + ")");
            citiesValues.push(el.value);
            allCitiesSumm = allCitiesSumm + parseInt(el.value);
          } else {
            remoteSumm = remoteSumm + parseInt(el.value);
          }
        })

        let mychartCities = new Chart(chartCanvasCities, {
          type: 'horizontalBar',
          data: {
            labels: citiesArray.slice(0, 20),
            datasets: [{
              label: 'Cities',
              data: citiesValues.slice(0, 20),
              backgroundColor: Chart['colorschemes'].tableau.Tableau20,
              borderWidth: 1,
            }]
          }
        });

        let mychartAll = new Chart(chartCanvasAll, {
          type: 'pie',
          data: {
            labels: ["Remote", "All other cities"],
            datasets: [{
              label: 'Remote VS Cities',
              data: [remoteSumm, allCitiesSumm],
              backgroundColor: Chart['colorschemes'].tableau.ClassicGreenOrange12,
              borderWidth: 1,
            }]
          }
        });

        this.setState({
          chartCities: mychartCities,
          chartAll: mychartAll
        });
      }).catch((err) => console.log(err))
  }

  componentDidUpdate() {
    let chartCities = this.state.chartCities;
    let chartAll = this.state.chartAll;

    chartCities.update();
    chartAll.update();
  }

  render() {
    return (
      <React.Fragment>
        <Title level={3} style={{ textAlign: "center" }}>Cities</Title>
        <Row>
          <Col span={12} offset={6}>
            <canvas ref={'chartCities'}></canvas>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <canvas ref={'chartAll'}></canvas>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Cities;
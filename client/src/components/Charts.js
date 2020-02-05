import React from 'react';
import Chart from 'chart.js';
import axios from 'axios';
import { Row, Col, Typography } from 'antd';
import exports from "../key_words";
import 'chartjs-plugin-colorschemes';

const { Title } = Typography;

class Charts extends React.Component {
  componentDidMount() {
    const { frameworks, js, css, other } = exports;
    let frameworksValues = [];
    let jsValues = [];
    let cssValues = [];
    let otherValues = [];

    let chartCanvasFrameworks = this.refs.chartFrameworks;
    let chartCanvasJs = this.refs.chartJs;
    let chartCanvasCss = this.refs.chartCss;
    let chartCanvasOther = this.refs.chartOther;

    axios.get('../words_split.json')
      .then((res) => {
        res.data.forEach(el => {
          if (frameworks.includes(el.word)) frameworksValues.push(el.number)
          if (js.includes(el.word)) jsValues.push(el.number)
          if (css.includes(el.word)) cssValues.push(el.number)
          if (other.includes(el.word)) otherValues.push(el.number)
        });

        let myChartFrameworks = new Chart(chartCanvasFrameworks, {
          type: 'horizontalBar',
          data: {
            labels: frameworks,
            datasets: [{
              label: 'Frameworks mentioned in vacancies',
              data: frameworksValues,
              backgroundColor: Chart['colorschemes'].office.Spectrum6,
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
          }
        });

        let myChartJs = new Chart(chartCanvasJs, {
          type: 'horizontalBar',
          data: {
            labels: js,
            datasets: [{
              label: 'JS stuff mentioned in vacancies',
              data: jsValues,
              backgroundColor: Chart['colorschemes'].office.Story6,
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
          }
        });

        let myChartCss = new Chart(chartCanvasCss, {
          type: 'horizontalBar',
          data: {
            labels: css,
            datasets: [{
              label: 'CSS stuff mentioned in vacancies',
              data: cssValues,
              backgroundColor: Chart['colorschemes'].office.Summer6,
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
          }
        });

        let myChartOther = new Chart(chartCanvasOther, {
          type: 'horizontalBar',
          data: {
            labels: other,
            datasets: [{
              label: 'Other technologies mentioned in vacancies',
              data: otherValues,
              backgroundColor: Chart['colorschemes'].tableau.ClassicCyclic13,
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
          }
        });

        this.setState({
          chartFrameworks: myChartFrameworks,
          chartJs: myChartJs,
          chartCss: myChartCss,
          chartOther: myChartOther
        });
      }).catch((err) => console.log(err))
  }

  componentDidUpdate() {
    let chartFrameworks = this.state.chartFrameworks;
    let chartJs = this.state.chartJs;
    let chartCss = this.state.chartCss;
    let chartOther = this.state.chartOther;

    chartFrameworks.update();
    chartJs.update();
    chartCss.update();
    chartOther.update();
  }

  render() {
    return (
      <React.Fragment>
        <Title level={3} style={{ textAlign: "center" }}>Words</Title>
        <Row>
          <Col span={12} offset={6}>
            <canvas ref={'chartFrameworks'}></canvas>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <canvas ref={'chartJs'}></canvas>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <canvas ref={'chartCss'}></canvas>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <canvas ref={'chartOther'}></canvas>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Charts;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import exports from "../key_words";
import { Radio, Icon, List, Spin, Popover, Typography, Input } from 'antd';

const { Title } = Typography;
const { Search } = Input;

function Words() {
  const { frameworks, js, css, other } = exports;

  const [state, setState] = useState({
    words: [],
    filter: [],
    search: "",
    filterTab: "frameworks",
    loading: true
  });

  const mapper = {
    'frameworks': frameworks,
    'js': js,
    'css': css,
    'other': other
  }

  useEffect(() => {
    axios.get('../words_split.json')
      .then((res) => {
        let filter = res.data.filter(el => frameworks.includes(el.word));
        setState({
          words: res.data,
          filter,
          loading: false
        })
      }).catch((err) => {
        console.log(err);
      })
  }, [frameworks]);

  const handleSubmit = (value) => {
    setState(state => ({ ...state, loading: true }));
    let filter = value.length ? state.words.filter(el => el.word.includes(value)) : state.words;
    finishedFiltering(filter)
  }

  const filter = (e) => {
    const { value } = e.target;
    setState(state => ({ ...state, loading: true }));
    let filter = (value === "all") ? state.words : state.words.filter(el => mapper[value].includes(el.word));
    setState(state => ({ ...state, filterTab: value }));
    finishedFiltering(filter)
  }

  const finishedFiltering = (filter) => {
    setTimeout(() => {
      setState(state => ({ ...state, filter, loading: false }));
    }, 0);
  }

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  return (
    <React.Fragment>
      <Title level={3}>Fast filters</Title>
      <Radio.Group defaultValue="frameworks" onChange={filter}>
        <Radio.Button value="all">Show all words
          <Popover content={"Please note, that list is very long"}>
            <Icon type="info-circle" style={{ marginLeft: "10px" }} />
          </Popover>
        </Radio.Button>
        <Radio.Button value="frameworks">Show only frameworks
          <Popover content={"You can expand list by adding your own words in array frameworks inside key_words.js file"}>
            <Icon type="info-circle" style={{ marginLeft: "10px" }} />
          </Popover>
        </Radio.Button>
        <Radio.Button value="css">Show only css stuff
          <Popover content={"You can expand list by adding your own words in array css inside key_words.js file"}>
            <Icon type="info-circle" style={{ marginLeft: "10px" }} />
          </Popover>
        </Radio.Button>
        <Radio.Button value="js">Show only js stuff
          <Popover content={"You can expand list by adding your own words in array js inside key_words.js file"}>
            <Icon type="info-circle" style={{ marginLeft: "10px" }} />
          </Popover>
        </Radio.Button>
        <Radio.Button value="other">Show other technologies
          <Popover content={"You can expand list by adding your own words in array other inside key_words.js file"}>
            <Icon type="info-circle" style={{ marginLeft: "10px" }} />
          </Popover>
        </Radio.Button>
      </Radio.Group>
      <Title level={3} style={{ marginTop: "20px" }}>Search box</Title>
      <Search
        placeholder="input search text"
        onSearch={(e) => handleSubmit(e)}
        enterButton="Search"
      />
      <Title level={3} style={{ marginTop: "20px" }}>List of words</Title>
      {state.loading ?
        <Spin indicator={antIcon} /> :
        <List
          size="small"
          bordered
          dataSource={state.filter}
          renderItem={item => <List.Item><Link to={"word/" + item.word}>{item.word} - {item.number}</Link></List.Item>}
        />
      }
    </React.Fragment>
  );
}

export default Words;
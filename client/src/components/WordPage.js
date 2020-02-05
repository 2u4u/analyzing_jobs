import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WordPage(props) {
  const { handle } = props.match.params;

  const [state, setState] = useState({
    word: "",
    number: "",
    context: [],
    loading: true
  });

  useEffect(() => {
    axios.get('../words_split.json')
      .then((res) => {
        const filter = res.data.filter(el => el.word === handle)
        const { word, number, context } = filter[0];
        setState({
          word,
          number,
          context,
          loading: false
        })
      }).catch((err) => {
        console.log(err);
      })
  }, [handle]);

  const changeText = (text, index) => {
    const arrayOfWords = text.split(" ");
    let html = ""
    arrayOfWords.forEach((el, i) => {
      if (el.toLowerCase() !== state.word.toLowerCase()) {
        html = (i + 1 < arrayOfWords.length) ? (html + el + " ") : (html + el)
      } else {
        html = html + `<span style="background: #ffff00">${el}</span> `
      }
    });
    return <li key={index}><span dangerouslySetInnerHTML={{ __html: html }} /></li>
  }

  return (
    <React.Fragment>
      {state.loading ?
        "Loading..." :
        <div>
          <h1>{state.word} - {state.number}</h1>
          <ul>{state.context.map((el, i) => changeText(el, i))}</ul>
        </div>
      }
    </React.Fragment>
  );
}

export default WordPage;
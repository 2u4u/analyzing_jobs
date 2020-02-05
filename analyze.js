const fs = require("fs");
const vacancies = require("./client/public/list_of_vacancy_descriptions.json");
let totalWordsArray = [];
let totalLocationsArray = [];
let totalCitiesArray = [];

vacancies.forEach(vacancy => {
  if (vacancy.text) {
    let notFilterdVacancyWordsArray = vacancy.text.split(/[\s,.:\(\))\/]/);
    let vacancyWordsArray = notFilterdVacancyWordsArray.filter(word => word.length)

    for (let i = 0; i < vacancyWordsArray.length; i++) {
      newWord = vacancyWordsArray[i].toLowerCase().replace('%', 'percent');
      if (newWord.length != 0) {
        let newContext = `${vacancyWordsArray[i]}`;
        if (i > 2) newContext = `${vacancyWordsArray[i - 2]} ` + newContext;
        if (i > 1) newContext = `${vacancyWordsArray[i - 1]} ` + newContext;
        if (i < vacancyWordsArray.length - 1) newContext = newContext + ` ${vacancyWordsArray[i + 1]}`;
        if (i < vacancyWordsArray.length - 2) newContext = newContext + ` ${vacancyWordsArray[i + 2]}`;

        if (totalWordsArray.some(wordObj => wordObj.word === newWord)) {
          let oldWordIndex = totalWordsArray.findIndex((wordObj => wordObj.word === newWord));
          totalWordsArray[oldWordIndex].number = parseInt(totalWordsArray[oldWordIndex].number) + 1;
          totalWordsArray[oldWordIndex].context = totalWordsArray[oldWordIndex].context.concat([newContext]);
        } else {
          let newWordObj = {
            word: newWord,
            context: [newContext],
            number: 1
          }
          totalWordsArray.push(newWordObj);
        }
      }
    }
  }
  const location = vacancy.location;
  let state = "Remote";
  let orginalState = "Remote";
  let city = "Not set";
  if (location.includes(",")) {
    let commaIndex = location.indexOf(",");
    city = location.slice(0, commaIndex);
    state = "US-" + location.slice(commaIndex + 2, commaIndex + 4);
    orginalState = location.slice(commaIndex + 2, commaIndex + 4);
  }

  if (state !== "Remote") {
    if (totalLocationsArray.some(item => item.id === state)) {
      let stateIndex = totalLocationsArray.findIndex((obj => obj.id === state));
      totalLocationsArray[stateIndex].value = parseInt(totalLocationsArray[stateIndex].value) + 1;
    } else {
      totalLocationsArray.push({
        id: state,
        value: 1
      })
    }
  }

  if (totalCitiesArray.some(item => item.city === city)) {
    let cityIndex = totalCitiesArray.findIndex((obj => obj.city === city));
    totalCitiesArray[cityIndex].value = parseInt(totalCitiesArray[cityIndex].value) + 1;
  } else {
    totalCitiesArray.push({
      city,
      state: orginalState,
      value: 1
    })
  }
})

let sortedWordsArray = [...totalWordsArray].sort((word, nextWord) => nextWord.number - word.number);
let sortedLocationsArray = [...totalLocationsArray].sort((location, nextLocation) => nextLocation.value - location.value);
let sortedCitiesArray = [...totalCitiesArray].sort((city, nextCity) => nextCity.value - city.value);

fs.writeFileSync("./client/public/words_split.json", JSON.stringify(sortedWordsArray, null, 4))
fs.writeFileSync("./client/public/locations.json", JSON.stringify(sortedLocationsArray, null, 4))
fs.writeFileSync("./client/public/cities.json", JSON.stringify(sortedCitiesArray, null, 4))

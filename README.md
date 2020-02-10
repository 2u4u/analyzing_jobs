# Analyzing US vacancies for Front-end developers

Parsing code is adapted for front-end vacancies on one well known job resource. Please take note, that parsing might affect website stability. You can you preparsed data from public/folder.

## Installation

To install:

```bash
npm install
```

## Get data

You need to fill `BASIC_SEARCH_URL` in parse.js, and do some magic defining what part of pages to parse. After that run:

```bash
npm run parse
```

To analyze parsed data and make it pretty for React application in cliend folder you neew to run analyze: 

```bash
npm run analyze
```

## Usage

To see analytics in web you need to run React:

```bash
cd client
npm install
npm run start
```

Viola! Magic happens. Now you can see US map with states and number of vacancies, split of wording and most important technologies mentioned in vacancies.
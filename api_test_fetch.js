const fetch = require('node-fetch');

var options = {
    'method': 'GET',
    'url': 'https://catfact.ninja/facts?limit=10&max_length=140',
    'headers': {
      'Accept': 'application/json'
    }
  };

fetch('https://catfact.ninja/facts?limit=5&max_length=140')
.then(res => res.json())
.then(json => console.log(json));


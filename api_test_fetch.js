const fetch = require('node-fetch');

var options = {
    'method': 'GET',
    'headers': {
      'Accept': 'application/json'
    }
  };

async function getData(){
  const response = await fetch('https://catfact.ninja/facts?limit=5&max_length=140', options);
  return response.json();
}


getData().then(data => {
  parseData(data.data);
})

function parseData(data){
  data.forEach(element => {
    console.log(element.fact);
  });
}
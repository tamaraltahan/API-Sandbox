var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://catfact.ninja/facts?limit=10&max_length=140',
  'headers': {
    'Accept': 'application/json'
  }
};

function printJsonData(obj){
    var facts = [];
    Object.keys(obj.data).forEach(function(k){
        fact = obj.data[k]["fact"];
        facts.push(fact);

        //facts.push(obj.data[k]["fact"]);
    })
    console.log(facts);
}

request(options, function (error, response) {
  if (error) throw new Error(error);
  //console.log(response.body);
  printJsonData(JSON.parse(response.body));
});


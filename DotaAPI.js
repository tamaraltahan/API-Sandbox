//API: https://docs.opendota.com/#section/Introduction

const fetch = require('node-fetch');
var matchIDList = [];

var options = {
    'method': 'GET',
    'headers': {
      'Accept': 'application/json'
    }
  };

  //gets recent match history
async function GetMatchData(){
  const response = await fetch('https://api.opendota.com/api/players/1986753/recentMatches', options);
  return response.json();
}


function printData(data){
    console.log(data)
}

function printArray(arr){
    console.log("Array Length:" + arr.length)
    arr.forEach(function(entry) {
        console.log(entry);
      });
}

//get match IDs from recent matches
function parseMatchIDs(data){
    data.forEach(element => {
        matchIDList.push(element.match_id);
    });
}


function ParsePlayerIDs(data){

}

GetMatchData().then(data => {
    printData(data)
    parseMatchIDs(data)
    printArray(matchIDList)
})



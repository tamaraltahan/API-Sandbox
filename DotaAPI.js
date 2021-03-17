//API: https://docs.opendota.com/#section/Introduction
const myID = 1986753
const fetch = require('node-fetch');
var matchIDList = [];
var playerIDList = [];

var options = {
    'method': 'GET',
    'headers': {
      'Accept': 'application/json'
    }
  };

  //gets recent match history
  async function GetMatchData(){
    const response = await fetch('https://api.opendota.com/api/players/' + myID + '/recentMatches', options);
    return response.json();
  }
  
  //get details from a single match
  async function getMatchDetails(match_id){
    const response = await fetch('https://api.opendota.com/api/matches/' + match_id, options)
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
    })
}


//get player IDs from a match
function ParsePlayerIDs(){
  matchIDList.forEach(element => {
    getMatchDetails(element)
  }
    )
}

GetMatchData().then(data => {
    printData(data)
    parseMatchIDs(data)
    printArray(matchIDList)
})



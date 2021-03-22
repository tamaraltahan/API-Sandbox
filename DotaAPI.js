//API: https://docs.opendota.com/#section/Introduction
const myID = 1986753
const fetch = require('node-fetch');
let matchIDList = [];
let matchDetailsList = []
let playerIDList = [];
let WL = []

const options = {
    'method': 'GET',
    'headers': {
        'Accept': 'application/json'
    }
};

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

//gets recent match history
async function GetMatchData() {
    const response = await fetch('https://api.opendota.com/api/players/' + myID + '/recentMatches', options);
    return response.json();
}

//get details from a single match
async function getMatchDetails(match_id) {
    const response = await fetch('https://api.opendota.com/api/matches/' + match_id, options)
    return response.json();
}

async function getPlayerWinrate(){
    console.log("Sleeping for 15 sec...")
    await sleep(15000);
    console.log("15 seconds is over")
    for (const PID of playerIDList) {
        const response = await fetch(`https://api.opendota.com/api/players/${PID}/wl?lobby_type=7`, options)
        const data = await response.json()
        WL.push(data)
    }
    return WL
}

function printData(data) {
    console.log(data)
}

function printArray(arr) {
    console.log("Array Length:" + arr.length)
    arr.forEach(function(entry) {
        console.log(entry);
    });
}

//get match IDs from recent matches
function parseMatchIDs(data) {
    data.forEach(element => {
        matchIDList.push(element.match_id);
    })
}


//get player IDs from a match
async function ParsePlayerIDs() {
    for (const match of matchIDList) {
        const matchDetails = await getMatchDetails(match)
        matchDetailsList.push(matchDetails)
    }

    matchDetailsList.forEach(element => {
        const players = element.players
        players.forEach(player => {
            const pID = player.account_id
            if (pID && pID !== myID) playerIDList.push(pID);
        })
    })

    return playerIDList
}

GetMatchData().then(data => {
    //printData(data)
    parseMatchIDs(data)
    printArray(matchIDList)
    ParsePlayerIDs()
    .then(() => getPlayerWinrate())
    .then(() => console.log(WL))
})

//API: https://docs.opendota.com/#section/Introduction
const myID = 1986753
const fetch = require('node-fetch');
const Queue = require('./queue')

let matchIDList = [];
let matchDetailsList = []
let playerIDList = [];
let WL = []

let players = [];

let jobQueue = new Queue();
let blocks = 30;


let minGames = 1500;
let minWinRate = 0.6;
let smurfs = 0;

const options = {
    'method': 'GET',
    'headers': {
        'Accept': 'application/json'
    }
};

async function sleep(msec) {
    console.log("Sleeping for " + msec/1000 + " seconds")
    return new Promise(resolve => setTimeout(resolve, msec));
}

//gets recent match history
async function GetMatchData() {
    const response = await fetch(`https://api.opendota.com/api/players/${myID}/recentMatches`, options);
    return response.json();
}

//get details from a single match
async function getMatchDetails(match_id) {
    const response = await fetch(`https://api.opendota.com/api/matches/${match_id}`, options)
    return response.json();
}

async function enqueueAPI(data){
    queue.push(data);
}

async function getPlayerWinrate(){
    //await sleep(15000);
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



function combineData(){
    let playerInfo = [];

    for(const player of WL){
        let wins = WL.win;
        let losses = WL.lose;

        let curPlayer = {
            "Wins" : wins,
            "Losses" : losses,
            "Games" : wins + losses
        }
        playerInfo.push(curPlayer)
    }
    return playerInfo;
}

function judgePlayer(player){
    let winRate = player.wins/player.Matches
    if(player.Matches <= minGames && winRate >= minWinRate){
        smurfs++;
    }
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
    .then(sleep(6000))
    .then(() => getPlayerWinrate())
    .then(() => console.log(WL))
    
})

//API: https://docs.opendota.com/#section/Introduction
const myID = 1986753
const fetch = require('node-fetch');
const Queue = require('./queue')

let matchIDList = [];
let matchDetailsList = []
let playerIDList = [];
let WL = []
let Players = []

let jobQueue = new Queue();
let blocks = 30;


let minGames = 1500;
let minWinRate = 0.6;
let smurfs = 0;

let allWinRates = [];
let allGames = [];
let n = 0;

const options = {
    'method': 'GET',
    'headers': {
        'Accept': 'application/json'
    }
};

function printData(data) {
    console.log(data)
}

function printArray(arr) {
    console.log("Array Length:" + arr.length)
    arr.forEach(function(entry) {
        console.log(entry);
    });
}

async function sleep(msec) {
    console.log("Sleeping for " + msec/1000 + " seconds")
    return new Promise(resolve => setTimeout(resolve, msec));
}

//1
//gets recent match history
async function GetMatchData() {
    const response = await fetch(`https://api.opendota.com/api/players/${myID}/recentMatches`, options);
    return response.json();
}

//3.1
//get details from a single match
async function getMatchDetails(match_id) {
    const response = await fetch(`https://api.opendota.com/api/matches/${match_id}`, options)
    return response.json();
}

//no idea how to do this, actually.
async function enqueueAPI(data){
    queue.push(data);
}

//4
//Return array of players wins and losses
async function getPlayerWinrate(){
    //await sleep(15000);
    for (const PID of playerIDList) {
        const response = await fetch(`https://api.opendota.com/api/players/${PID}/wl?lobby_type=7`, options)
        const data = await response.json()
        if(!data.error)
        WL.push(data)
    }
    return WL
}

//2
//get match IDs from recent matches
function parseMatchIDs(data) {
    data.forEach(element => {
        matchIDList.push(element.match_id);
    })
}

function combineData(){
    for(const player of WL){
        //console.log(player)
        const wins = player.win;
        const losses = player.lose;

        const curPlayer = {
            games : wins + losses,
            wins : wins,
            losses : losses  
        }
        console.log(curPlayer)
        Players.push(curPlayer)
    }
}

function judgePlayers(){
    for(const player of Players){
        let w = player.wins;
        let l = player.losses;
        let g = l + w;

        let winrate = w/g;

        allWinRates.push(winrate);
        allGames.push(g);
        n++;

        //judge player, niave implementation
        if(winrate > minWinRate || g <= minGames){
            smurfs++;
        }
    }
}

function computeAverages(){
    let gamesSum = 0;
    let WRSum = 0;

    for(let i = 0; i < n; ++i){
        gamesSum += allGames[i];
        WRSum += allWinRates[i];
    }

    const avgGames = gamesSum / n;
    const avgWR = WRSum / n;

    const avgData = {
        games : avgGames,
        winrate : avgWR
    }

    console.log(avgData)
}

//3
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
    //.then(sleep(15000))
    .then(() => getPlayerWinrate())
    .then(() => console.log(WL))
    .then(() => combineData())
    .then(() => judgePlayers())
    .then(() => console.log("Suspected Smurfs: " + smurfs))
    .then(() => console.log(computeAverages()))
    
})

//Tamar Al-Tahan
//CSE 4500 - Spring 20201



//let's start with constructing a json object
var jsonObj = {
    "manufacturer" : "intel",
    "model": "i7-8700k",
    "clockSpeed" : 4.7
}

//Next, we showcase JSON.stringify
//this method will turn a JS object into a JSON stylized text, and store it in a string

const jsonStr = JSON.stringify(jsonObj)
console.log(jsonStr)


//JSON.parse will do the opposite, and convert a json string into a JS object type


const jsonParsed = JSON.parse(jsonStr)

console.log(jsonParsed.manufacturer + " " + jsonParsed.model + " " + jsonParsed.clockSpeed)

//we've just done the same thing as before, but we can actually modify these values

jsonParsed.clockSpeed = 4.8

console.log(jsonParsed.clockSpeed)

//and checking on the data types of our variables

console.log(typeof(jsonStr))
console.log(typeof(jsonParsed))
console.log(typeof(jsonParsed.clockSpeed))


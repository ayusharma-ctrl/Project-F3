var w1 = document.getElementById("w1")
var w2 = document.getElementById("w2")
var w3 = document.getElementById("w3")
var w4 = document.getElementById("w4")
var w5 = document.getElementById("w5")
var w6 = document.getElementById("w6")
var w7 = document.getElementById("w7")
var w8 = document.getElementById("w8")
var w9 = document.getElementById("w9")
var w10 = document.getElementById("w10")
var m1 = document.getElementById("m1")
var m2 = document.getElementById("m2")
var m3 = document.getElementById("m3")
var m4 = document.getElementById("m4")
var m5 = document.getElementById("m5")
var m6 = document.getElementById("m6")
var m7 = document.getElementById("m7")
var m8 = document.getElementById("m8")
var m9 = document.getElementById("m9")
var m10 = document.getElementById("m10")
var input = document.getElementsByTagName('input')[0]
var button = document.getElementsByTagName('button')[0]

const urlLocation = "https://api.ipgeolocation.io/ipgeo?apiKey=7bf6f321bb3643b797fb0e912fab013b"
//using this function to fetch user location data
async function getLocation() {
    try {
        const getLocationData = await fetch(urlLocation)
        const getLocationJson = await getLocationData.json()
        const locationData = getLocationJson
        getTimeZone(locationData.latitude, locationData.longitude)
    }
    catch (e) {
        console.error("Unable to fetch IP", e)
    }
}

document.addEventListener('DOMContentLoaded', getLocation)

//latitude and longitude which we getting from user's lacation data, passing both to this function
//using this function to get Timezone data of a particular location
async function getTimeZone(lat, lon) {
    try {
        const request = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=d10cc5663af8499493057bf98ebd586c`)
        const response = await request.json()
        const timeZoneData = response;
        insertData(timeZoneData)
    }
    catch (e) {
        console.error("Unable to fetch IP Data", e)
    }
}

//using this function to get the Timezone data of a paricular address, we are passing an address entered by the user 
async function getUpdatedTimeZone(input) {
    try {
        const request = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${input}&format=json&apiKey=d10cc5663af8499493057bf98ebd586c`)
        const response = await request.json()
        const timeZoneData = response;
        insertDataUpdated(timeZoneData)
    }
    catch (e) {
        console.error("Unable to fetch IP Data", e)
        displayError()
    }
}

//using this function to add onclick functionality to the submit button
function getAddressTimezone() {
    const address = input.value //address entered by the user
    if (address == '') {
        document.getElementById('errorMsg').style.display = 'block'
        document.getElementById('errorMsg').textContent = 'Please Enter a valid Address!'
        document.getElementById('heading').style.display = 'none'
        document.getElementById('newComponent').style.display = 'none'
    }
    else {
        getUpdatedTimeZone(address)
        document.getElementById('errorMsg').style.display = 'none'
        document.getElementById('heading').style.display = 'block'
        document.getElementById('newComponent').style.display = 'block'
    }
}

button.addEventListener('click', getAddressTimezone)

//using this function to display the error msg on the screen in case we are unable to fetch the Timezone of an address
function displayError() {
    document.getElementById('heading').style.display = 'none'
    document.getElementById('newComponent').style.display = 'none'
    document.getElementById('errorMsg').style.display = 'block'
    document.getElementById('errorMsg').textContent = 'Timezone could not be found!'
}

//these are functions to display the received Timezone data from an API
function insertData(data) {
    w1.textContent = data.results[0].timezone.name
    w2.textContent = data.results[0].lat
    w3.textContent = data.results[0].timezone.offset_STD
    w4.textContent = data.results[0].timezone.offset_STD_seconds
    w5.textContent = data.results[0].timezone.offset_DST
    w6.textContent = data.results[0].timezone.offset_DST_seconds
    w7.textContent = data.results[0].country
    w8.textContent = data.results[0].postcode
    w9.textContent = data.results[0].city
    w10.textContent = data.results[0].lon
}

function insertDataUpdated(data) {
    m1.textContent = data.results[0].timezone.name
    m2.textContent = data.results[0].lat
    m3.textContent = data.results[0].timezone.offset_STD
    m4.textContent = data.results[0].timezone.offset_STD_seconds
    m5.textContent = data.results[0].timezone.offset_DST
    m6.textContent = data.results[0].timezone.offset_DST_seconds
    m7.textContent = data.results[0].country
    m8.textContent = data.results[0].postcode
    m9.textContent = data.results[0].city
    m10.textContent = data.results[0].lon
}
// declare variables
const boundaryLayer = "ca_zipcodes.geojson"
let boundary; // place holder for the data
let collected; // variable for turf.js collected points 
let allPoints = []; // array for all the data points

let mapOptions = {'center': [34.0631451,-118.4367551],'zoom':10, geojsonWidth:.2}

let highSupport = L.featureGroup();
let mediumSupport = L.featureGroup();
let lowSupport = L.featureGroup();
let noSupport = L.featureGroup();

let allsurveyData = L.featureGroup();

let layers = {
    "75%-100% Support <svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='green' /></svg>": highSupport,
    "50%-75% Support <svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='green' /></svg>": mediumSupport,
    "0%-50% Support <svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='green' /></svg>": lowSupport,
    "0% Support <svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='green' /></svg>": noSupport,
}

let circleOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8Sh69n_ecOrvOSlDuAiDsjz6kQQtNJMVsHogJn0NGh3Iy09aWuSWJnFVeDwlDsTFdSOPLshxPMgjg/pub?output=csv"

const highSupportLegendHTML = document.getElementById("highSupportCheckbox");
const mediumSupportLegendHTML = document.getElementById("mediumSupportCheckbox");
const lowSupportLegendHTML = document.getElementById("lowSupportCheckbox");
const noSupportLegendHTML = document.getElementById("noSupportCheckbox");

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// add layer control box
//L.control.layers(null,layers,{collapsed:false}).addTo(map)

let Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

Stamen_TonerLite.addTo(map)

//sidebar 
let sidebar = L.control.sidebar({
    autopan: false,       // whether to maintain the centered map point when opening the sidebar
    closeButton: true,    // whether t add a close button to the panes
    container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
    position: 'right',     // left or right
}).addTo(map);


let panelContent = {
    id: 'stories',                     // UID, used to access the panel
    tab: '<i class="fa fa-user"></i>',  // content can be passed as HTML string,
    pane: ':)',        // DOM elements can be passed, too
    title: 'T',              // an optional pane header
    position: 'top'                  // optional vertical alignment, defaults to 'top'
};

let panelContent2 = {
    id: 'info',                     // UID, used to access the panel
    tab: '<i class="fa fa-question"></i>',  // content can be passed as HTML string,
    pane: 'hello there!',        // DOM elements can be passed, too
    title: 'Reading The Testimonies',              // an optional pane header
    position: 'top'                  // optional vertical alignment, defaults to 'top'
};

sidebar.addPanel(panelContent);
sidebar.addPanel(panelContent2);

function getSupportColor(inputPercentage) {
    return inputPercentage > 0.75 ? '#C57601' : 
        inputPercentage > 0.5  ? '#FF9A00' :
        inputPercentage > 0  ? '#E5B263' : '#7BA0A4';
}

function addMarker(data, mainMode, support){
    // this is the value that will be incremented
    let supportStatus = data['Would you support similar transportation projects in Westwood Village as shown above?'];

    // create the turfJS point
    let thisPointHome = turf.point([Number(data.lngHome),Number(data.latHome)],{supportStatus})
    let thisPointBusiness

    // put all the turfJS points into `allPoints`
    allPoints.push(thisPointHome)

    if(data['What is your main connection to Westwood?'] == "UCLA student"){
        circleOptions.fillColor = "#336EFF"
        student.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> UCLA Student</h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])
    }
    else if(data['What is your main connection to Westwood?'] == "UCLA faculty or staff"){
        circleOptions.fillColor = "#336EFF"
        faculty.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> UCLA faculty/staff</h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])
    }
    else if(data['What is your main connection to Westwood?'] == "Business owner"){
        circleOptions.fillColor = "#0C4B19"
        owner.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<h2> <center>Westwood Business Owner Residence</center></h2> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])

        circleOptions.fillColor = "#5BE077"
        thisPointBusiness = turf.point([Number(data.lngBusiness),Number(data.latBusiness)],{supportStatus})
        allPoints.push(thisPointBusiness)
        owner.addLayer(L.circleMarker([data.latBusiness, data.lngBusiness], circleOptions).bindPopup(`<h2> <center>Westwood Business Owner Location</center></h2> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latBusiness,data.lngBusiness,data['What is your main connection to Westwood?'])
    }
    else if(data['What is your main connection to Westwood?'] == "Business employee"){
        circleOptions.fillColor = "#052E2C"
        employee.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> Westwood Business Employee Residence</h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])

        circleOptions.fillColor = "#0A5E5A"
        thisPointBusiness = turf.point([Number(data.lngBusiness),Number(data.latBusiness)],{supportStatus})
        allPoints.push(thisPointBusiness)
        employee.addLayer(L.circleMarker([data.latBusiness, data.lngBusiness], circleOptions).bindPopup(`<center><h2> Westwood Business Employee Location</h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latBusiness,data.lngBusiness,data['What is your main connection to Westwood?'])
    }
    else if(data['What is your main connection to Westwood?'] == 'Recreation (eat, shop, hang out in Westwood)'){
        circleOptions.fillColor = "#E6EC4A"
        recreation.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> Westwood Recreation Enthusiast </h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])
    }
    else{
        circleOptions.fillColor = "#9747DD"
        other.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> Other Westwood Enjoyer </h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])
    }
    return data;

}

function fillEmptyThoughts(thisData){
    if(thisData == ""){
        thisData = "N/A"
        console.log(thisData)
        return thisData
    }
}


function addStory(data){
    let thisStoryDiv = document.getElementById("stories")
    // 😡😡😡😡😡😡😡😡😡😡 pain-lContent lol
    let thoughtsData = data['Do you have any other thoughts on this proposal?']
    fillEmptyThoughts(thoughtsData)
    const newStory = document.createElement("story")
        newStory.innerHTML += `
        <div class="userStories">
        <h3>Transportation Issues</h3>${data['Please describe if you have experienced any transportation and/or transportation-related safety issues while visiting Westwood Village.']} <h3>Support</h3> ${data['Would you support similar transportation projects in Westwood Village as shown above?']}<h3>Support Reasoning</h3> ${data['Please explain your reasoning for the choice above.']} <h3>Other Thoughts</h3> ${thoughtsData}
        </div>
        `
    thisStoryDiv.appendChild(newStory)

}

function addZipcodeStory(values, zipcode){
    const panelContent = document.getElementById("stories")
    panelContent.innerHTML = ""
    populatePanel(zipcode)
    values.forEach(value =>{
        console.log(value.support)
        let thisStoryDiv = document.getElementById("stories")
        let thoughtsData = value.otherThoughts
        fillEmptyThoughts(thoughtsData)
        const newStory = document.createElement("story")
        newStory.innerHTML += `
        <div class="userStories">
        <h3>Transportation Issues</h3>${value.transpoIssues} <h3>Support</h3> ${value.support}  <h3>Support Reasoning</h3> ${value.supportReason} <h3>Other Thoughts</h3> ${thoughtsData}
        </div>
        `
        thisStoryDiv.appendChild(newStory)
    })
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function addAllMarkerLayersToMap(){
    student.addTo(map) 
    faculty.addTo(map) 
    owner.addTo(map)
    employee.addTo(map)
    recreation.addTo(map)
    other.addTo(map)
    let allLayers = L.featureGroup([student, faculty, owner, employee, recreation, other]);
    
}

function filterSurveyDataByZipcode(data){
    let supportStatus = data['Would you support similar transportation projects in Westwood Village as shown above?'];
    let supportStatusReason = data['Please explain your reasoning for the choice above.']
    let thoughts = data['Do you have any other thoughts on this proposal?']
    let businessFlag = data['What is your main connection to Westwood?']
    let mode = data['Which mode of transportation do you use most frequently when visiting Westwood Village?']
    let issues = data['Please describe if you have experienced any transportation and/or transportation-related safety issues while visiting Westwood Village.']

    let surveyData = {
        "support": supportStatus,
        "supportReason": supportStatusReason,
        "otherThoughts": thoughts,
        "business": businessFlag,
        "latHome": data.latHome,
        "lngHome": data.lngHome,
        "latBusiness": data.latBusiness,
        "lngBusiness": data.lngBusiness,
        "mode": mode,
        "transpoIssues": issues
    }

    // create the turfJS point
    let thisPointHome = turf.point([Number(data.lngHome),Number(data.latHome)],{surveyData})
    let thisPointBusiness

    // allsurveyData.addLayer(thisMarker)
    
    // put all the turfJS points into `allPoints`
    allPoints.push(thisPointHome)

    if(businessFlag == 'Business owner' || businessFlag == 'Business employee'){
        thisPointBusiness = turf.point([Number(data.lngBusiness),Number(data.latBusiness)],{surveyData})
        allPoints.push(thisPointBusiness)
    }
}

function populatePanel(zipcode){
    if(zipcode == undefined){
        const panelContent = document.getElementById("stories")
        panelContent.innerHTML = `<div><center><h1 style="font-size:24px;">Thoughts on Sustainable Transportation: Overview</h1></center></div>
        <div style="font-size:14px;"><center>We asked Westwood community members whether they would support sustainable transportation installments in Westwood Village. We'll highlight the five zipcodes with the highest proportion of support responses below! </center></div>`
        //sortTopFiveSupport()
    }
    else{
        const panelContent = document.getElementById("stories")
        panelContent.innerHTML = `<div><center><h1 style="font-size:24px;">Thoughts on Sustainable Transportation: ${zipcode}</h1></center></div>
        <div style="font-size:14px;"><center>Would you support sustainable transportation installments in Westwood Village?</center></div>`
    }
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        filterSurveyDataByZipcode(data)
        // addMarker(data, data['Which mode of transportation do you use most frequently when visiting Westwood Village?'], data['Would you support similar transportation projects in Westwood Village as shown above?'])
    })
    console.log('allPoints',allPoints)
    // addAllMarkerLayersToMap()

    console.log('allsurveyData',allsurveyData)

    thePoints = turf.featureCollection(allPoints)
    getBoundary(boundaryLayer)
    populatePanel(undefined)
    sidebar.open("stories")

}


let allZipCodeData = new L.geoJson()
// new function to get the boundary layer and add data to it with turf.js
function getBoundary(layer){
    fetch(layer)
    .then(response => {
        return response.json();
        })
    .then(data =>{
                //set the boundary to data
                boundary = data

                // run the turf collect geoprocessing
                collected = turf.collect(boundary, thePoints, 'surveyData', 'values');
                // just for fun, you can make buffers instead of the collect too:
                // collected = turf.buffer(thePoints, 50,{units:'miles'});
                console.log(collected.features)

                // here is the geoJson of the `collected` result:
                allZipCodeData = L.geoJson(collected,{filter: zipcodeFilter, onEachFeature: onEachFeature,style:function(feature)
                {
                    if (feature.properties.values.length > 0) {
                        let count = feature.properties.values.length
                        let supportCount = 0
                        //loop through the values array and count the number of yes's
                        feature.properties.values.forEach(value => {
                            if(value.support == "Support"){
                                supportCount++
                            }
                        })
                        let supportProportion = supportCount/count;
                        return {color: getSupportColor(supportProportion), weight:mapOptions.geojsonWidth, fillOpacity:0.7}
                    }
                    else{
                        // make the polygon gray and blend in with basemap if it doesn't have any values
                        return{opacity:0,color:"#efefef"}                        
                    }
                }
                // add the geojson to the map
                    }).addTo(map)
            // Code for padding taken from https://stackoverflow.com/questions/34137648/leaflet-bounds-with-padding
            map.fitBounds(allZipCodeData.getBounds().pad(Math.sqrt(1)))
        }
    )   
} 

loadData(dataUrl)

//function for clicking on polygons
function onEachFeature(feature, layer) {
    if (feature.properties.values.length > 0) {
        //count the values within the polygon by using .length on the values array created from turf.js collect
        let count = feature.properties.values.length
        let supportCount = 0
        let undecidedCount = 0
        let doNotSupportCount = 0
        //loop through the values array and count the number of each support response
        feature.properties.values.forEach(value => {
            if(value.support == "Support"){
                supportCount++
            }
            else if(value.support == "Undecided"){
                undecidedCount++
            }
            else if(value.support == "Do not support"){
                doNotSupportCount++
            }
        })
        console.log(supportCount) // see what the count is on click
        layer.bindPopup(`<center> <h3> Zipcode: ${feature.properties.zcta} </h3></center>`); //bind the pop up to the number
        layer.on('mouseover', function(e){
            this.openPopup();
            // anything else you want to happen on hover of the zipcodes
            highlightFeature(e)
        });
        layer.on('mouseout', function(e){
            this.closePopup();
            resetHighlight(e);
            // anything else you want to happen on hover out of the zipcodes
        });
        layer.on('click', function(e){
            console.log('You clicked on this Zipcode: '+feature.properties.zcta)
            console.log(e.target.feature.properties.values)
            // anything you wnat to on click of the zipcodes
            addZipcodeStory(e.target.feature.properties.values, feature.properties.zcta)
        });
    }
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3,
        dashArray: '',
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 0.2,
        dashArray: '',
    });

    layer.bringToFront();
}

function zipcodeFilter(feature){
    if (feature.properties.values.length > 0){
        console.log("This Zipcode has data: "+ feature.properties.zcta)
        console.log(feature.properties)
        return true
    }
}

// Get the modal
var modal2 = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
 

window.onload = function() {
    modal2.style.display = "block";
  };
  
window.onclick = function(event) {
if (event.target == modal2) {
    modal2.style.display = "none";
}
}

//window.addEventListener("resize", scroller.resize);


function closeModal(e){
    let parentDiv = e.target.parentElement.id
    console.log(parentDiv)
    if(parentDiv != "surveyBtn"){

        modal.style.display = "none";
    }
    if(parentDiv == "menuButtons"){

        modal.style.display = "none";
    }
}
document.body.addEventListener('click', function(e) {
    closeModal(e)
        // your code
    // console.log(e.target.id)
});
// document.iframe.addEventListener('click', closeModal, true); 


// Get the modal
var modal = document.getElementById("surveyModal");

// Get the button that opens the modal
var btn = document.getElementById("surveyBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "grid";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

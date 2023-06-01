// declare variables
let mapOptions = {'center': [34.0631451,-118.4367551],'zoom':2}

let student = L.featureGroup();
let faculty = L.featureGroup();
let business = L.featureGroup();
let employee = L.featureGroup();
let recreation = L.featureGroup();
let other = L.featureGroup();

let layers = {
    "UCLA student": student,
    "UCLA faculty/staff": faculty,
    "Business owner": business,
    "Business employee": employee,
    "Recreation": recreation,
    "Other": other
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

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// add layer control box
L.control.layers(null,layers).addTo(map)

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

function addMarker(data, mainMode, support){
    if(data['What is your main connection to Westwood?'] == "UCLA student"){
        circleOptions.fillColor = "#336EFF"
        student.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> UCLA Student</h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])
    }
    else if(data['What is your main connection to Westwood?'] == "Business owner"){
        circleOptions.fillColor = "#0C4B19"
        student.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<h2> <center>Westwood Business Owner Residence</center></h2> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])

        circleOptions.fillColor = "#5BE077"
        student.addLayer(L.circleMarker([data.latBusiness, data.lngBusiness], circleOptions).bindPopup(`<h2> <center>Westwood Business Owner Location</center></h2> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latBusiness,data.lngBusiness,data['What is your main connection to Westwood?'])
    }
    else if(data['What is your main connection to Westwood?'] == "Business employee"){
        circleOptions.fillColor = "#052E2C"
        student.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> Westwood Business Employee Residence</h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])

        circleOptions.fillColor = "#0A5E5A"
        student.addLayer(L.circleMarker([data.latBusiness, data.lngBusiness], circleOptions).bindPopup(`<center><h2> Westwood Business Employee Location</h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latBusiness,data.lngBusiness,data['What is your main connection to Westwood?'])
    }
    else if(data['What is your main connection to Westwood?'] == 'Recreation (eat, shop, hang out in Westwood)'){
        circleOptions.fillColor = "#E6EC4A"
        student.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> Westwood Recreation Enthusiast </h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])
    }
    else{
        circleOptions.fillColor = "#9747DD"
        student.addLayer(L.circleMarker([data.latHome, data.lngHome], circleOptions).bindPopup(`<center><h2> Other Westwood Enjoyer </h2></center> <h3>Main Mode of Transportation to Westwood</h3> <p>${mainMode}</p> <h3>Support for Proposal</h3><p>${support}</p>`))
        //createButtons(data.latHome,data.lngHome,data['What is your main connection to Westwood?'])
    }

}

function addStory(data){
    const newStory = document.createElement("div");
    newStory.id= "div"+data['What is your main connection to Westwood?'];
    newStory.innerHTML = `<h3>Transportation Issues</h3>${data['Please describe if you have experienced any transportation and/or transportation-related safety issues while visiting Westwood Village.']} <h3>Support</h3> ${data['Would you support similar transportation projects in Westwood Village as shown above?']}<h3>Support Reasoning</h3> ${data['Please explain your reasoning for the choice above.']} <h3>Other Thoughts</h3> ${data['Do you have any other thoughts on this proposal?']}`;
    newStory.className = "userStories";
    const spaceForStories = document.getElementById('placeForUserStoriesShow')
    spaceForStories.appendChild(newStory);
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

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data, data['Which mode of transportation do you use most frequently when visiting Westwood Village?'], data['Would you support similar transportation projects in Westwood Village as shown above?'])
        addStory(data)
    })
    student.addTo(map) 
    faculty.addTo(map) 
    business.addTo(map)
    employee.addTo(map)
    recreation.addTo(map)
    other.addTo(map)
    let allLayers = L.featureGroup([student, faculty, business, employee, recreation, other]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)

let legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Westwood Connections</h4>";
  div.innerHTML += '<i style="background: #336EFF"></i><span>UCLA student</span><br>';
  div.innerHTML += '<i style="background: #0C4B19"></i><span>Business Owner Residence><br>';
  div.innerHTML += '<i style="background: #5BE077"></i><span>Business Owner Location</span><br>';
  div.innerHTML += '<i style="background: #052E2C"></i><span>Business Employee Residence</span><br>';
  div.innerHTML += '<i style="background: #6BE5DF"></i><span>Business Employee Location</span><br>';
  div.innerHTML += '<i style="background: #E6EC4A"></i><span>Recreation</span><br>';
  div.innerHTML += '<i style="background: #9747DD"></i><span>Other</span><br>';
  //div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';
  return div;
};
legend.addTo(map);

    